from typing import List, Optional
from fastapi import APIRouter
from fastapi.responses import FileResponse
from schemas.block_schema import BlockModel
from fastapi import APIRouter
from fastapi.responses import FileResponse


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
blocks_and_bounds = [
  BlockModel(block_code="Entrance", spot1=[581, 497, 1274, 1047], ),
  BlockModel(block_code="Exit", spot1=[567, 314, 1223, 871], ),
  BlockModel(block_code="B_1", spot1=[648, 565, 1431, 1080], ),
  BlockModel(block_code="B_10", spot1=[190, 364, 691, 792], spot2=[736, 344, 1175, 788], spot3=[1131, 355, 1734, 784], ),
  BlockModel(block_code="B_11", spot1=[258, 458, 815, 900], spot2=[760, 452, 1169, 910], spot3=[1108, 452, 1786, 892], ),
  BlockModel(block_code="B_12", spot1=[646, 231, 1165, 726], ),
  BlockModel(block_code="B_13", spot1=[626, 608, 1224, 1026], ),
  BlockModel(block_code="B_14", spot1=[124, 624, 708, 1014], spot2=[708, 624, 1112, 1014], spot3=[1112, 624, 1654, 1014], ),
  BlockModel(block_code="B_15", spot1=[101, 593, 714, 1014], spot2=[714, 592, 1165, 1011], spot3=[1167, 593, 1845, 1009], ),
  BlockModel(block_code="B_16", spot1=[169, 575, 735, 1045], spot2=[735, 575, 1226, 1043], spot3=[1156, 572, 1874, 1047], ),
  BlockModel(block_code="B_17", spot1=[118, 538, 713, 1000], spot2=[653, 538, 1095, 1033], spot3=[1065, 534, 1753, 1028], ),
  BlockModel(block_code="B_18", spot1=[573, 599, 1056, 1054], ),
  BlockModel(block_code="B_19", spot1=[690, 522, 1403, 1043], ),
  BlockModel(block_code="B_2", spot1=[46, 383, 824, 910], spot2=[774, 415, 1208, 914], spot3=[1138, 419, 1920, 915], ),
  BlockModel(block_code="B_20", spot1=[136, 574, 760, 1021], spot2=[743, 549, 1204, 1020], spot3=[1185, 544, 1809, 1016], ),
  BlockModel(block_code="B_21", spot1=[248, 649, 763, 1080], spot2=[760, 642, 1208, 1077], spot3=[1212, 628, 1782, 1080], ),
  BlockModel(block_code="B_22", spot1=[119, 378, 746, 816], spot2=[701, 371, 1109, 813], spot3=[1069, 394, 1802, 808], ),
  BlockModel(block_code="B_23", spot1=[293, 442, 831, 878], spot2=[830, 443, 1223, 911], spot3=[1208, 439, 1836, 911], ),
  BlockModel(block_code="B_24", spot1=[237, 250, 779, 676], ),
  BlockModel(block_code="B_25", spot1=[274, 420, 808, 882], spot2=[775, 419, 1221, 883], spot3=[1125, 416, 1679, 883], ),
  BlockModel(block_code="B_26", spot1=[177, 499, 782, 1002], spot2=[743, 494, 1138, 1007], spot3=[1120, 491, 1717, 1006], ),
  BlockModel(block_code="B_27", spot1=[210, 234, 773, 806], spot2=[736, 265, 1167, 821], spot3=[1130, 264, 1823, 821], ),
  BlockModel(block_code="B_28", spot1=[176, 315, 732, 849], spot2=[693, 314, 1113, 856], spot3=[1073, 317, 1670, 845], ),
  BlockModel(block_code="B_29", spot1=[92, 337, 763, 800], spot2=[736, 337, 1199, 822], spot3=[1173, 336, 1904, 822], ),
  BlockModel(block_code="B_3", spot1=[1, 419, 647, 995], spot2=[608, 456, 1176, 997], spot3=[1117, 472, 1920, 998], ),
  BlockModel(block_code="B_4", spot1=[101, 431, 868, 1000], spot2=[807, 433, 1329, 1000], spot3=[1260, 419, 1919, 1052], ),
  BlockModel(block_code="B_5", spot1=[71, 471, 720, 1017], spot2=[719, 464, 1246, 1044], spot3=[1226, 453, 1920, 1033], ),
  BlockModel(block_code="B_6", spot1=[391, 420, 1035, 945], ),
  BlockModel(block_code="B_7", spot1=[680, 499, 1381, 1080], ),
  BlockModel(block_code="B_8", spot1=[125, 344, 796, 833], spot2=[759, 359, 1246, 841], spot3=[1186, 344, 1913, 844], ),
  BlockModel(block_code="B_9", spot1=[1, 584, 570, 1080], spot2=[567, 576, 1054, 1015], spot3=[1031, 584, 1679, 994], ),
]

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
