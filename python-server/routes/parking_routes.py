from fastapi import APIRouter,Depends,Response, Request,Query, HTTPException
from sqlalchemy import JSON
from sqlalchemy.orm import Session
from config.database import get_db
from middlewares.authentication import auth
from models.parker_model import Parker
from models.parking_model import Parking
from models.parking_spot_model import ParkingSpot
from schemas.parking_schema import EntrySchema,ExitSchema
from schemas.detection_schema import DetectionModel
from typing import List
import json

from schemas.block_schema import BlockModel

from utils.destination import Destination

        
router = APIRouter(
    prefix="/parking",
    tags=["Parking"]
)

destination = Destination()


current_msec = 0

blocks_and_bounds = [
    BlockModel(block_code="B_1", spot1=[648, 1431, 565, 1080], ),
    BlockModel(block_code="B_10", spot1=[190, 691, 364, 792], spot2=[736, 1175, 344, 788], spot3=[1131, 1734, 355, 784], ),
    BlockModel(block_code="B_11", spot1=[258, 815, 458, 900], spot2=[760, 1169, 452, 910], spot3=[1108, 1786, 452, 892], ),
    BlockModel(block_code="B_12", spot1=[646, 1165, 231, 726], ),
    BlockModel(block_code="B_13", spot1=[626, 1224, 608, 1026], ),
    BlockModel(block_code="B_14", spot1=[124, 708, 624, 1014], spot2=[708, 1112, 624, 1014], spot3=[1112, 1654, 624, 1014], ),
    BlockModel(block_code="B_15", spot1=[101, 714, 593, 1014], spot2=[714, 1165, 592, 1011], spot3=[1167, 1845, 593, 1009], ),
    BlockModel(block_code="B_16", spot1=[169, 735, 575, 1045], spot2=[735, 1226, 575, 1043], spot3=[1156, 1874, 572, 1047], ),
    BlockModel(block_code="B_17", spot1=[118, 713, 538, 1000], spot2=[653, 1095, 538, 1033], spot3=[1065, 1753, 534, 1028], ),
    BlockModel(block_code="B_18", spot1=[573, 1056, 599, 1054], ),
    BlockModel(block_code="B_19", spot1=[690, 1403, 522, 1043], ),
    BlockModel(block_code="B_2", spot1=[46, 824, 383, 910], spot2=[774, 1208, 415, 914], spot3=[1138, 1920, 419, 915], ),
    BlockModel(block_code="B_20", spot1=[136, 760, 574, 1021], spot2=[743, 1204, 549, 1020], spot3=[1185, 1809, 544, 1016], ),
    BlockModel(block_code="B_21", spot1=[248, 763, 649, 1080], spot2=[760, 1208, 642, 1077], spot3=[1212, 1782, 628, 1080], ),
    BlockModel(block_code="B_22", spot1=[119, 746, 378, 816], spot2=[701, 1109, 371, 813], spot3=[1069, 1802, 394, 808], ),
    BlockModel(block_code="B_23", spot1=[293, 831, 442, 878], spot2=[830, 1223, 443, 911], spot3=[1208, 1836, 439, 911], ),
    BlockModel(block_code="B_24", spot1=[237, 779, 250, 676], ),
    BlockModel(block_code="B_25", spot1=[274, 808, 420, 882], spot2=[775, 1221, 419, 883], spot3=[1125, 1679, 416, 883], ),
    BlockModel(block_code="B_4", spot1=[101, 868, 431, 1000], spot2=[807, 1329, 433, 1000], spot3=[1260, 1919, 419, 1052], ),
    BlockModel(block_code="B_5", spot1=[71, 720, 471, 1017], spot2=[719, 1246, 464, 1044], spot3=[1226, 1920, 453, 1033], ),
    BlockModel(block_code="B_6", spot1=[391, 1035, 420, 945], ),
    BlockModel(block_code="B_7", spot1=[680, 1381, 499, 1080], ),
    BlockModel(block_code="B_8", spot1=[125, 796, 344, 833], spot2=[759, 1246, 359, 841], spot3=[1186, 1913, 344, 844], ),
    BlockModel(block_code="B_9", spot1=[1, 570, 584, 1080], spot2=[567, 1054, 576, 1015], spot3=[1031, 1679, 584, 994], ),
    BlockModel(block_code="Entrance", spot1=[581, 1274, 497, 1047], ),
    BlockModel(block_code="Exit", spot1=[567, 1223, 314, 871], ),
]


@router.get("/get-spots-location")
def get_all_spots_location():
    return blocks_and_bounds

# TODO: GET THE TIME OF THESE FRAMES
@router.post("/modify-availability")
async def modify_availability(request: Request, db:Session = Depends(get_db)):
    body_bytes = await request.body()
    if body_bytes:
        obj_dict = json.loads(body_bytes)
        data = json.loads(obj_dict['data'])
        for detected in data:
            block = detected['block']
            type = detected['type']
            score = detected['score']
            park_spot = detected['spot']
            frame_no = detected['frame_no']
            bounds = detected['bounds']
            new_bounds = []
            for b in bounds:
                new_bounds.append(int(b))
            print("Block: {}\tType: {}\nParkingSpot: {}\tFrame Number: {}\nScore: {}".format(block, type, park_spot, frame_no, score))
            

    else: 
        print("LOL")
        
    # loop data
    # check the object data
    return "Server received request."


# Todo move this function to Node Server
@router.get("/", dependencies=[Depends(auth)])
async def get_parker(db:Session = Depends(get_db)):
    data = db.query(Parking).all()
    return data

@router.post("/entry", dependencies=[Depends(auth)])
async def parker_entry(entry: EntrySchema,db:Session = Depends(get_db)):
    try:
        # ? iterate
        new_parker = Parking(**entry.toJson())
        
        # ? Update parking spot status
        spot = db.query(ParkingSpot).get(new_parker.parkingSpotId)
        spot.on_entry()
        
        db.add(new_parker)
        db.commit()
        
        return {"message":f"{spot.spotCode} parked"}
    
    except Exception as e:
        raise e

@router.post("/exit", dependencies=[Depends(auth)])
async def parker_exit(res:Response,exit:ExitSchema ,db:Session = Depends(get_db)):
    try:
        #? get owner of plateNumber
        parker = db.query(Parker).filter_by(plateNumber=exit.plateNumber).one_or_none()
        if(parker is None):            
            res.status_code=404
            return {'detail':"Parker Not Found"}
        
        parkings = db.query(Parking).filter_by(parker=parker,exited=None).all()
    
        if( len(parkings) <= 0):            
            res.status_code=404
            return {'detail':"Parker is not Parked"}

        for parking in parkings:
            spot = db.query(ParkingSpot).get(parking.parkingSpotId)     
            spot.on_exit()    
            parking.on_exit()
            
        db.commit()
        return {"message": "Exited"}
    
    except Exception as e:
        raise e
