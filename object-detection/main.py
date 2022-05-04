import requests
import cv2
import os
from datetime import datetime



parker_url = "http://localhost:8000/parker/"
parking_entry = 'http://localhost:8000/parking/entry'
parking_exit = 'http://localhost:8000/parking/exit'

class IdCatch:
    def __init__(self):
        self.id = 0
    
    def set_id(self,id):
        self.id = id
    
    def get_id(self):
        return self.id
    

if __name__ == "__main__":
    
    cap = cv2.VideoCapture(0)
    idcatch = IdCatch()
    
    while (cap.isOpened()):
        ret, img = cap.read()
        
        if ret == True:
                        
            
            # TODO Add here the object detection algo
            
            imS = cv2.resize(img, (560, 240)) # Resize image            
            cv2.imshow("Video", imS) 
            
            #? Mock new Parker
            if cv2.waitKey(25) == ord('1'):    
                current_time = datetime.now().strftime("%H-%M-%S")
                #TODO update filename change to plateNumber
                cv2.imwrite(f'data/{current_time}.png', img) #?Saving Image                
                files = {'file':(f'asd123.png', open(f'data/{current_time}.png', 'rb'), 'image/png')}

                res = requests.post(parker_url, files=files)#? Sending Image to backend
                
                data = res.json()
                # if(data["parkerId"] in data ):                    
                #     idcatch.set_id(data["parkerId"])
                #     print(f"Set Id: {idcatch.get_id()}")
                # else:
                #     print(data)
                print(data)
                os.remove(f'data/{current_time}.png')
            
            #? Mock parking Entry
            if cv2.waitKey(25) == ord('2'):
                data = {'parkingSpotId': 4,'parkerId': idcatch.get_id()}
                res = requests.post(parking_entry,json=data)
                print(res.json())
            
            #? Mock parking Exit
            if cv2.waitKey(25) == ord('3'):
                # 09-41-21.png
                data = {"plateNumber": "09-41-21.png" }
                res = requests.post(parking_exit,json=data)
                print(res.json())
                
            if cv2.waitKey(25) == ord('q'):
                break


        else:
            break
    cap.release()
    cv2.destroyAllWindows()