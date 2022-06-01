from typing import List, Optional
from fastapi import APIRouter
from fastapi.responses import FileResponse
from fastapi import APIRouter
from fastapi.responses import FileResponse
from routes.parking_routes import current_seconds


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
#TODO ADD BOUNDS FROM DETECTION

@router.post("/change-availability-of-all-blocks")
def change_availability_of_all_blocks():
  pass


@router.get("/get-current-seconds")
def get_current_seconds():
  return current_seconds
#TODO: change to absolute path for video when in raspi
@router.get("/video/{block}")
def get_video(block: str):
  path = "_videos/{}.mp4".format(block)
  #TODO: get current Time
  response = FileResponse(path, media_type="video/mp4")
  return response
