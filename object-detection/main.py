import requests
import cv2


url = "http://localhost:8000/image/uploadfile"

if __name__ == "__main__":
    
    cap = cv2.VideoCapture(0)
    
    while (cap.isOpened()):
        ret, img = cap.read()
        
        if ret == True:
            
            imS = cv2.resize(img, (960, 540)) # Resize image
            
            # open('file.txt', 'wb')  # create an empty demo file
            files = {'file':('img.png', open('img.png', 'rb'), 'image/png')}

            r = requests.post(url, files=files)

            cv2.imshow("Video", imS) 
            if cv2.waitKey(25) == ord('q'):
                break


        else:
            break
    cap.release()
    cv2.destroyAllWindows()