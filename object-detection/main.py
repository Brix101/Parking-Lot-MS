from urllib import response
import requests
import cv2
import os
from datetime import datetime


base_url = "http://localhost:8000/"
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

class Cookie:
    def __init__(self):
        session = requests.Session()
        response = session.get(base_url)
        self.cookie = response.cookies.get_dict()
   
    def get_cookie(self):
        return self.cookie
    

if __name__ == "__main__":
    
    cap = cv2.VideoCapture(0)
    idcatch = IdCatch()
    cookie = Cookie()
    
    
    while (cap.isOpened()):
        ret, img = cap.read()
        
        if ret == True:                        
            
            # TODO Add here the object detection algo
            
            imS = cv2.resize(img, (560, 240)) # Resize image            
            cv2.imshow("Video", imS) 
            
            #? Mock add new Parker
            if cv2.waitKey(25) == ord('1'):    
                current_time = datetime.now().strftime("%H-%M-%S")
                #TODO update filename change to plateNumber
                cv2.imwrite(f'data/{current_time}.png', img) #?Saving Image                
                files = {'file':(f'current_time.png', open(f'data/{current_time}.png', 'rb'), 'image/png')}

                res = requests.post(parker_url, files=files,cookies=cookie.get_cookie())#? Sending Image to backend
                
                data = res.json()
                if("parkerId" in data):                    
                    idcatch.set_id(data["parkerId"])
                    print(f"Set Id: {idcatch.get_id()}")
                else:
                    print(data)
                    
                os.remove(f'data/{current_time}.png')
                
            # TODO Add IR activation here
            #? Mock add parking Entry
            if cv2.waitKey(25) == ord('2'):
                #! change parkingSpotId to to dynamic id when IR activated
                data = {'parkingSpotId': 1,'parkerId': idcatch.get_id()}
                res = requests.post(parking_entry,json=data)
                print(res.json())
                
            # TODO Add Parker Exit here
            #? Mock add parking Exit
            if cv2.waitKey(25) == ord('3'):
                # 09-41-21.png
                data = {"plateNumber": "current_time.png" }
                res = requests.post(parking_exit,json=data)
                print(res.json())
            
            if cv2.waitKey(25) == ord('q'):
                break


        else:
            break
    cap.release()
    cv2.destroyAllWindows()