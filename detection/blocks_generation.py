from glob import glob
import os
import xml.etree.ElementTree as ET
import xmltodict
import json
import json
import cv2 as cv
from lxml import etree

def generate_frames(blocks):
  for block in blocks:
    path = "http://192.168.1.36:8000/videos/"+block+".mp4"
    cap = cv.VideoCapture(path)
    ret, frame = cap.read()
    cv.imwrite("{}.png".format(block),frame)
  cap.release()
  cv.destroyAllWindows()

def get_data_of_annotations():
  directory = "frames"
  data = ""
  for filename in os.scandir(directory):
    if filename.is_file():
      path = filename.path
      if path.find(".xml") == -1:
        pass
      else:
        tree = ET.parse(path)
        root = tree.getroot()
        block_name = filename.path.split('.')
        block_name = block_name[0].split("\\")
        block_name = block_name[1]
        output = 'BlockModel(block_code="{}", '.format(block_name)
        for object in root.iter('object'):
          name = str(object.find('name').text)
          xmin = int(object.find('bndbox').find('xmin').text)
          ymin = int(object.find('bndbox').find('ymin').text)
          xmax = int(object.find('bndbox').find('xmax').text)
          ymax = int(object.find('bndbox').find('ymax').text)
          output += '{}=[{}, {}, {}, {}], '.format(name, xmin, xmax, ymin, ymax)
        output += ")"
        data += output + ",\n"
  return data