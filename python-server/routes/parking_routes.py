from fastapi import APIRouter,Depends,Response, Request,Query, HTTPException, WebSocket
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
import time
import asyncio

from schemas.block_schema import BlockModel, AvailableModel

from utils.destination import Destination

        
router = APIRouter(
    prefix="/parking",
    tags=["Parking"]
)

destination = Destination()

frame_number = 0
current_seconds = 0
detection_started = False
@router.get("/detection-started")
def check_if_detection_started():
    detection_started = True
    return [frame_number, detection_started]

spaces = [
    {'block':"Entrance", 'spot':"sp1", "status":False},
    {'block':"Exit", 'spot':"sp1", "status":False},
    {'block':"B_1", 'spot':"sp1", "status":False},
    {'block':"B_2", 'spot':"sp1", "status":False},
    {'block':"B_2", 'spot':"sp2", "status":False},
    {'block':"B_2", 'spot':"sp3", "status":False},
    {'block':"B_3", 'spot':"sp1", "status":False},
    {'block':"B_3", 'spot':"sp2", "status":False},
    {'block':"B_3", 'spot':"sp3", "status":False},
    {'block':"B_4", 'spot':"sp1", "status":False},
    {'block':"B_4", 'spot':"sp2", "status":False},
    {'block':"B_4", 'spot':"sp3", "status":False},
    {'block':"B_5", 'spot':"sp1", "status":False},
    {'block':"B_5", 'spot':"sp2", "status":False},
    {'block':"B_5", 'spot':"sp3", "status":False},
    {'block':"B_6", 'spot':"sp1", "status":False},
    {'block':"B_7", 'spot':"sp1", "status":False},
    {'block':"B_8", 'spot':"sp1", "status":False},
    {'block':"B_8", 'spot':"sp2", "status":False},
    {'block':"B_8", 'spot':"sp3", "status":False},
    {'block':"B_9", 'spot':"sp1", "status":False},
    {'block':"B_9", 'spot':"sp2", "status":False},
    {'block':"B_9", 'spot':"sp3", "status":False},
    {'block':"B_10", 'spot':"sp1", "status":False},
    {'block':"B_10", 'spot':"sp2", "status":False},
    {'block':"B_10", 'spot':"sp3", "status":False},
    {'block':"B_11", 'spot':"sp1", "status":False},
    {'block':"B_11", 'spot':"sp2", "status":False},
    {'block':"B_11", 'spot':"sp3", "status":False},
    {'block':"B_12", 'spot':"sp1", "status":False},
    {'block':"B_13", 'spot':"sp1", "status":False},
    {'block':"B_14", 'spot':"sp1", "status":False},
    {'block':"B_14", 'spot':"sp2", "status":False},
    {'block':"B_14", 'spot':"sp3", "status":False},
    {'block':"B_15", 'spot':"sp1", "status":False},
    {'block':"B_15", 'spot':"sp2", "status":False},
    {'block':"B_15", 'spot':"sp3", "status":False},
    {'block':"B_16", 'spot':"sp2", "status":False},
    {'block':"B_17", 'spot':"sp3", "status":False},
    {'block':"B_18", 'spot':"sp1", "status":False},
    {'block':"B_18", 'spot':"sp2", "status":False},
    {'block':"B_18", 'spot':"sp3", "status":False},
    {'block':"B_19", 'spot':"sp1", "status":False},
    {'block':"B_19", 'spot':"sp2", "status":False},
    {'block':"B_19", 'spot':"sp3", "status":False},
    {'block':"B_20", 'spot':"sp1", "status":False},
    {'block': "B_20", 'spot':"sp2", "status":False},
    {'block':"B_20", 'spot':"sp3", "status":False},
    {'block':"B_21", 'spot':"sp1", "status":False},
    {'block':"B_21", 'spot':"sp2", "status":False},
    {'block':"B_21", 'spot':"sp3", "status":False},
    {'block':"B_22", 'spot':"sp1", "status":False},
    {'block':"B_22", 'spot':"sp2", "status":False},
    {'block':"B_22", 'spot':"sp3", "status":False},
    {'block':"B_23", 'spot':"sp1", "status":False},
    {'block':"B_23", 'spot':"sp2", "status":False},
    {'block':"B_23", 'spot':"sp3", "status":False},
    {'block':"B_24", 'spot':"sp1", "status":False},
    {'block':"B_25", 'spot':"sp1", "status":False},
    {'block':"B_25", 'spot':"sp2", "status":False},
    {'block':"B_25", 'spot':"sp3", "status":False},
    {'block':"B_26", 'spot':"sp1", "status":False},
    {'block':"B_26", 'spot':"sp2", "status":False},
    {'block':"B_27", 'spot':"sp3", "status":False},
    {'block':"B_28", 'spot':"sp1", "status":False},
    {'block':"B_28", 'spot':"sp2", "status":False},
    {'block':"B_28", 'spot':"sp3", "status":False},
    {'block':"B_29", 'spot':"sp1", "status":False},
    {'block':"B_29", 'spot':"sp2", "status":False},
    {'block':"B_29", 'spot':"sp3", "status":False},
    {'block':"B_30", 'spot':"sp1", "status":False},
    {'block':"B_30", 'spot':"sp2", "status":False},
    {'block':"B_30", 'spot':"sp3", "status":False},
]

#TODO: USE THIS AS THE NEW PARKING SPOT VACANCY ARRAY ( JUST ADD ELEMENT IN BASE MODEL CALLED is_available)
blocks_and_bounds = [
    BlockModel(block_code="B_1", spot1=[648, 1431, 565, 1080]),
    BlockModel(block_code="B_10", spot1=[190, 691, 364, 792], spot2=[736, 1175, 344, 788], spot3=[1131, 1734, 355, 784]),
    BlockModel(block_code="B_11", spot1=[258, 815, 458, 900], spot2=[760, 1169, 452, 910], spot3=[1108, 1786, 452, 892]),
    BlockModel(block_code="B_12", spot1=[646, 1165, 231, 726]),
    BlockModel(block_code="B_13", spot1=[626, 1224, 608, 1026]),
    BlockModel(block_code="B_14", spot1=[124, 708, 624, 1014], spot2=[708, 1112, 624, 1014], spot3=[1112, 1654, 624, 1014]),
    BlockModel(block_code="B_15", spot1=[101, 714, 593, 1014], spot2=[714, 1165, 592, 1011], spot3=[1167, 1845, 593, 1009]),
    BlockModel(block_code="B_16", spot1=[169, 735, 575, 1045], spot2=[735, 1226, 575, 1043], spot3=[1156, 1874, 572, 1047]),
    BlockModel(block_code="B_17", spot1=[118, 713, 538, 1000], spot2=[653, 1095, 538, 1033], spot3=[1065, 1753, 534, 1028]),
    BlockModel(block_code="B_18", spot1=[573, 1056, 599, 1054]),
    BlockModel(block_code="B_19", spot1=[690, 1403, 522, 1043]),
    BlockModel(block_code="B_2", spot1=[46, 824, 383, 910], spot2=[774, 1208, 415, 914], spot3=[1138, 1920, 419, 915]),
    BlockModel(block_code="B_20", spot1=[136, 760, 574, 1021], spot2=[743, 1204, 549, 1020], spot3=[1185, 1809, 544, 1016]),
    BlockModel(block_code="B_21", spot1=[248, 763, 649, 1080], spot2=[760, 1208, 642, 1077], spot3=[1212, 1782, 628, 1080]),
    BlockModel(block_code="B_22", spot1=[119, 746, 378, 816], spot2=[701, 1109, 371, 813], spot3=[1069, 1802, 394, 808]),
    BlockModel(block_code="B_23", spot1=[293, 831, 442, 878], spot2=[830, 1223, 443, 911], spot3=[1208, 1836, 439, 911]),
    BlockModel(block_code="B_24", spot1=[237, 779, 250, 676]),
    BlockModel(block_code="B_25", spot1=[274, 808, 420, 882], spot2=[775, 1221, 419, 883], spot3=[1125, 1679, 416, 883]),
    BlockModel(block_code="B_4", spot1=[101, 868, 431, 1000], spot2=[807, 1329, 433, 1000], spot3=[1260, 1919, 419, 1052]),
    BlockModel(block_code="B_5", spot1=[71, 720, 471, 1017], spot2=[719, 1246, 464, 1044], spot3=[1226, 1920, 453, 1033]),
    BlockModel(block_code="B_6", spot1=[391, 1035, 420, 945]),
    BlockModel(block_code="B_7", spot1=[680, 1381, 499, 1080]),
    BlockModel(block_code="B_8", spot1=[125, 796, 344, 833], spot2=[759, 1246, 359, 841], spot3=[1186, 1913, 344, 844]),
    BlockModel(block_code="B_9", spot1=[1, 570, 584, 1080], spot2=[567, 1054, 576, 1015], spot3=[1031, 1679, 584, 994]),
    BlockModel(block_code="Entrance", spot1=[581, 1274, 497, 1047]),
    BlockModel(block_code="Exit", spot1=[567, 1223, 314, 871]),
]


@router.get("/get-spots-location")
def get_all_spots_location():
    return blocks_and_bounds

@router.get("/get-frame-number")
def get_frame_number():
    return frame_number

# TODO: GET THE TIME OF THESE FRAMES
@router.post("/modify-availability")
async def modify_availability(request: Request, db:Session = Depends(get_db)):
    detection_started = True
    body_bytes = await request.body()
    if body_bytes:
        obj_dict = json.loads(body_bytes)
        data = json.loads(obj_dict['data'])
        count = 0
        all = db.query(ParkingSpot).all()
        for a in all:
            a.isAvailable = True
            db.add(a)
            db.commit()
        for detected in data:
            block = detected['block']
            type = detected['type']
            score = detected['score']
            park_spot = detected['spot']
            frame_no = detected['frame_no']
            bounds = detected['bounds']
            current_seconds = detected['current_seconds']
            new_bounds = []
            count += 1
            for b in bounds:
                new_bounds.append(int(b))
            
            # set frame number for client display vide
            frame_number = frame_no

            spot_detected = db.query(ParkingSpot).filter(ParkingSpot.blockCode == block, ParkingSpot.spotCode == park_spot).first()
            if spot_detected:
                spot_detected.isAvailable = False
                db.add(spot_detected)
                db.commit()
                
            

    # else: 
    #     print("LOL")
        
    # loop data
    # check the object data
    return "Server received request."


# Todo move this function to Node Server
@router.get("/", dependencies=[Depends(auth)])
async def get_parker(db:Session = Depends(get_db)):
    data = db.query(Parking).all()
    return data



def create_parker(db, file):
    parker = db.query(Parker).filter_by(plateNumber= file).first()
    
    #TODO: check this later
    if(parker is None):      
        new_parker = Parker(plateNumber= file)
        db.add(new_parker)
        db.commit()
    id = new_parker.id if (parker is None ) else parker.id        
    return id



@router.post("/entry")
async def parker_entry(entry: EntrySchema,db:Session = Depends(get_db)):
    try:
        spot = db.query(ParkingSpot).filter_by(blockCode=entry.blockCode, spotCode=entry.spotCode).first()
        # ? iterate
        new_parker = Parking(parkingSpotId=spot.id, parkerId=entry.parkerId)

        # ? Update parking spot status
        spot = db.query(ParkingSpot).get(new_parker.parkingSpotId)
        spot.on_entry()
        db.add(new_parker)
        db.commit()
        
        return {"message":f"{spot.blockCode, spot.spotCode} parked"}
    
    except Exception as e:
        raise e

@router.post("/exit")
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
