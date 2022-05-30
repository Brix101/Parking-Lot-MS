from fastapi import APIRouter, HTTPException, Header, WebSocket, Response
from fastapi.responses import FileResponse
from pathlib import Path
import cv2 as cv

# "FLOW"
# Setup raspi hardwares

# "ACTUAL"
# Setup raspi hardwares
# get per frame of video
# detect per frame

router = APIRouter(
  prefix="/videos",
  tags=["Videos"]
)

videos = [

]

CHUNK_SIZE = 1024*1024

@router.get("/{block}")
def get_video(block: str, range: str = Header(None)):
  path = "_videos/{}.mp4".format(block)
  return FileResponse(path, media_type="video/mp4")

def start_detection():
  print("Video captures and detection per frame started...")
  frame_no_exit = 0
  cap_exit = cv.VideoCapture("_videos/Exit.mp4")
  while(cap_exit.isOpened()):
    frame_exists, frame = cap_exit.read()
    if frame_exists:
      # request here from detection
      print("for frame: {}, the timestamp is {}.".format(str(frame_no_exit), str(cap_exit.get(cv.CAP_PROP_POS_MSEC))))
    else:
      break
    frame_no_exit += 1
  
  cap_exit.release()
