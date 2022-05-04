import requests
import cv2
import os
from datetime import datetime



url = "http://localhost:8000/parker/"


if __name__ == "__main__":
    
    cap = cv2.VideoCapture(0)
    
    while (cap.isOpened()):
        ret, img = cap.read()
        
        if ret == True:
                        
            
            # TODO Add here the object detection algo
            
            imS = cv2.resize(img, (960, 540)) # Resize image            
            cv2.imshow("Video", imS) 
            
            if cv2.waitKey(25) == ord('a'):    
                current_time = datetime.now().strftime("%H-%M-%S")
                #TODO update filename change to plateNumber
                cv2.imwrite(f'data/{current_time}.png', img) #?Saving Image                
                files = {'file':(f'{current_time}.png', open(f'data/{current_time}.png', 'rb'), 'image/png')}

                r = requests.post(url, files=files)#? Sending Image to backend
                
                print(r.json())
                os.remove(f'data/{current_time}.png')
                
                
            if cv2.waitKey(25) == ord('q'):
                break


        else:
            break
    cap.release()
    cv2.destroyAllWindows()