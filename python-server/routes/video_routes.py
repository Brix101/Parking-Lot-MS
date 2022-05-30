import base64
from email import header
from fastapi import APIRouter, HTTPException, Header, WebSocket, Response
from fastapi.responses import FileResponse
from pkg_resources import yield_lines
import requests
from pathlib import Path
import cv2 as cv
import websockets
import asyncio


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


#TODO: change to absolute path for video when in raspi
@router.get("/video/{block}")
def get_video(block: str):
  path = "_videos/{}.mp4".format(block)
  #TODO: get current Time
  response = FileResponse(path, media_type="video/mp4")
  return response

#TODO: set current time from detection
@router.get("/current-time/{block}")
def get_current_time(block: str):
  current_time = 5
  return current_time
