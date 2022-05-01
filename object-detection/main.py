import requests
import cv2
from datetime import datetime



url = "http://localhost:8000/image/uploadfile"


now = datetime.now()


if __name__ == "__main__":
    
    cap = cv2.VideoCapture(0)
    
    while (cap.isOpened()):
        ret, img = cap.read()
        
        if ret == True:
            
            imS = cv2.resize(img, (960, 540)) # Resize image
            
            current_time = now.strftime("%H-%M-%S")
            cv2.imwrite(f'data/{current_time}.png', img)
            
            
            files = {'file':(f'{current_time}.png', open(f'{current_time}.png', 'rb'), 'image/png')}

            r = requests.post(url, files=files)

            cv2.imshow("Video", imS) 
            if cv2.waitKey(25) == ord('q'):
                break


        else:
            break
    cap.release()
    cv2.destroyAllWindows()