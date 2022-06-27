
import time
import cv2 as cv
import numpy as np
import json
import requests

from detected_vehicles import detected_vehicles_per_frame
from blocks_generation import generate_frames, get_data_of_annotations


base_url = "http://localhost:8000/"
parker_url = "http://localhost:8000/parker/"
parking_entry = 'http://localhost:8000/parking/entry'
parking_exit = 'http://localhost:8000/parking/exit'

ps_videos = 'http://localhost:8000/videos/change-availability-of-all-blocks'

def fetch_bounds(detected_vehicles, width, height):
    new_detected_vehicles_for_this_block = []
    for detected_vehicle in detected_vehicles:
        block = detected_vehicle['block']
        type = detected_vehicle['type']
        score = detected_vehicle['score']
        bounds = detected_vehicle['bounds']
        x_min = bounds[0]
        y_min = bounds[1]
        x_max = bounds[2]
        y_max = bounds[3]
        # NORMAL COORDINATES
        (left, right, top, bottom) = (str(int(x_min * width)), str(int(x_max * width)), str(int(y_min* height)), str(int(y_max * height)))
        detected_vehicle['score'] = str(int(score * 100))
        detected_vehicle['bounds'] = [left, right, top, bottom]
        new_detected_vehicles_for_this_block.append(detected_vehicle)
        # print(block)
        # print("Block: {}\n" \
        #     "Type: {}\n"\
        #     "Left: {}\tRight: {}\tTop: {}\tBottom: {}\n"\
        #     "Score: {}".format(block, type, score, left, right, top, bottom))
    return new_detected_vehicles_for_this_block

def compare_bounds(spot_bounds, detected_bounds):
    # print("Spot bounds: {}\tDetected bounds: {}".format(spot_bounds, detected_bounds))
    sl = spot_bounds[0]
    sr = spot_bounds[1]
    st = spot_bounds[2]
    sb = spot_bounds[3]
    dl = detected_bounds[0]
    dr = detected_bounds[1]
    dt = detected_bounds[2]
    db = detected_bounds[3]
    if sl >= dl and sr >= dr and st >= dt and sb >= db:
        print(f"Spot bounds: {spot_bounds}\tDetected bounds: {detected_bounds}")
        sp = (2 *(sl - sr)) + (2*(st - sb))
        dp = (2 *(dl - dr)) + (2*(dt - db))
        percent = int((dp/sp) * 100)
        if percent >= 80:
            return True
        else:
            return False
    else:
        return False

class CapturedModel:
    def __init__(self, block, frame, height, width):
        self.block = block
        self.frame = frame
        self.height = height
        self.width = width
    
    def get_block(self):
        return self.block

    def get_frame(self):
        return self.frame
        
    def get_height(self):
        return self.height

    def get_width(self):
        return self.width


import sched, time


#TODO: CHANGE IP TO RASPIS IP
def detect_all_blocks(blocks):
    url = "http://localhost:8000/parking/get-spots-location"
    req = requests.get(url)
    block_spots = json.loads(req.text)
    paths = []
    for block in blocks:
        path = "http://localhost:8000/videos/"+block+".mp4"
        paths.append(path)

    max_frames = 7450 # should be 9000
    
    captures = []
    frame_counts = []
    for p in paths:
        cap = cv.VideoCapture(p)
        if cap.isOpened():
            captures.append(cap)
            frame_count = int(cap.get(cv.CAP_PROP_FRAME_COUNT))
            
            frame_counts.append(frame_count)
            print("===== Frame count of {} is {}\nFPS: {} ".format(p, str(frame_count), cap.get(cv.CAP_PROP_FPS)))
        else:
            print("===== The block {} has no video.".format(block))
            

    
    # this is used to skip frames that are skipped by process time
    process_time = 0
    frame_no = 0
    # TODO TIME
    while(True):
        current_seconds = 0
        frames = []
        height = 1080
        width = 1020
        index = 0
        frame_no = int(24.93329747728922 * process_time)
        #time.sleep(3)
        time.sleep(2)
        for capture in captures:
            # delay capture
            # capture.set(current_frame_expected)
            _, frame = capture.read()
            current_seconds = capture.get(cv.CAP_PROP_POS_MSEC) * 1000
            block = blocks[index]
            index += 1
            captured = CapturedModel(block=block, frame=frame, height=height, width=width)
            frames.append(captured)

        result = []
        for captured in frames:
            start_time = time.time()
            detected_vehicles = detected_vehicles_per_frame(captured.block, captured.frame)
            fetched_vehicles_with_bounds = fetch_bounds(detected_vehicles=detected_vehicles, width=width, height=height)
            for fetched in fetched_vehicles_with_bounds:
                del fetched['frame']
                bounds = fetched['bounds']
                fetched_block = fetched['block']
                left = int(bounds[0])
                right = int(bounds[1])
                top = int(bounds[2])
                bottom = int(bounds[3])
                fetched_bounds = [left, right, top, bottom]
                for block_spot in block_spots:
                    block_code = block_spot['block_code']
                    spot1 = block_spot['spot1']
                    spot2 = block_spot['spot2']
                    spot3 = block_spot['spot3']
                    if block_code == fetched_block:
                        # compare all spots to 
                        if compare_bounds(spot1, fetched_bounds):
                            fetched['current_seconds'] = current_seconds
                            fetched['spot'] = "sp1"
                            fetched['frame_no'] = frame_no
                            result.append(fetched)
                        if spot2 is not None:
                            if compare_bounds(spot2, fetched_bounds):
                                fetched['current_seconds'] = current_seconds
                                fetched['spot'] = "sp2"
                                fetched['frame_no'] = frame_no
                                result.append(fetched)
                        if spot3 is not None:
                            if compare_bounds(spot3, fetched_bounds):
                                fetched['current_seconds'] = current_seconds
                                fetched['spot'] = "sp3"
                                fetched['frame_no'] = frame_no
                                result.append(fetched)
                    
        result = json.dumps(result)
        payload = {'data': result}
        headers = {'Content-type': 'application/json'}
        
        url = "http://localhost:8000/parking/modify-availability"
        r = requests.post(url=url, json=payload,  headers=headers)
        print(r.text)
        end_time = (time.time() - start_time)
        process_time += end_time
        print("=========PROCESS ENDED IN {} seconds".format(end_time))
        print("=========Total Process Time {} seconds".format(process_time))
        
blocks = [
        "Entrance",
        "Exit",
        "B_1",
        "B_2",
        "B_3",
        "B_4",
        "B_5",
        "B_6",
        "B_7",
        "B_8",
        "B_9",
        "B_10",
        "B_11",
        "B_12",
        "B_13",
        "B_14",
        "B_15",
        "B_16",
        "B_17",
        "B_18",
        "B_19",
        "B_20",
        "B_21",
        "B_22",
        "B_23",
        "B_24",
        "B_25",
        "B_26",
        "B_27",
        "B_28",
        "B_29",
        "B_30"
    ]

if __name__ == "__main__":
    detect_all_blocks(blocks)
    # generate_frames(blocks)
    # data = get_data_of_annotations()
    # print(data)

# asyncio.run(main())


# class IdCatch:
#     def __init__(self):
#         self.id = 0
    
#     def set_id(self,id):
#         self.id = id
    
#     def get_id(self):
#         return self.id

# class Cookie:
#     def __init__(self):
#         session = requests.Session()
#         response = session.get(base_url)
#         self.cookie = response.cookies.get_dict()
   
#     def get_cookie(self):
#         return self.cookie
    

# if __name__ == "__main__":
    
    # cap = cv2.VideoCapture(exit_video)
    # idcatch = IdCatch()
    # cookie = Cookie()# initialize to get Cookie
    
    
    # while (cap.isOpened()):
    #     ret, img = cap.read()
        
    #     if ret == True:                        
            
    #         # TODO Add here the object detection algo
            
    #         imS = cv2.resize(img, (560, 240)) # Resize image            
    #         cv2.imshow("Video", imS) 
            
    #         #? Mock add new Parker
    #         if cv2.waitKey(25) == ord('1'):    
    #             current_time = datetime.now().strftime("%H-%M-%S")
    #             #TODO update filename change to plateNumber
    #             cv2.imwrite(f'data/{current_time}.png', img) #?Saving Image                
    #             files = {'file':(f'current_time.png', open(f'data/{current_time}.png', 'rb'), 'image/png')}

    #             res = requests.post(parker_url, files=files,cookies=cookie.get_cookie())#? Sending Image to backend
                
    #             data = res.json()
    #             if("parkerId" in data):                    
    #                 idcatch.set_id(data["parkerId"])
    #                 print(f"Set Id: {idcatch.get_id()}")
    #             else:
    #                 print(data)
                    
    #             os.remove(f'data/{current_time}.png')
                
    #         # TODO Add IR activation here
    #         #? Mock add parking Entry
    #         if cv2.waitKey(25) == ord('2'):
    #             #! change parkingSpotId to to dynamic id when IR activated
    #             data = {'parkingSpotId': 1,'parkerId': idcatch.get_id()}
    #             res = requests.post(parking_entry,json=data,cookies=cookie.get_cookie())
    #             print(res.json())
                
    #         # TODO Add Parker Exit here
    #         #? Mock add parking Exit
    #         if cv2.waitKey(25) == ord('3'):
    #             # 09-41-21.png
    #             data = {"plateNumber": "current_time.png" }
    #             res = requests.post(parking_exit,json=data,cookies=cookie.get_cookie())
    #             print(res.json())
            
    #         if cv2.waitKey(25) == ord('q'):
    #             break


    #     else:
    #         break
    # cap.release()
    # cv2.destroyAllWindows()