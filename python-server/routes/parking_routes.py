from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy import desc
from sqlalchemy.orm import Session
from config.database import get_db

from models.parker_model import Parker
from models.parking_model import Parking
from models.parking_spot_model import ParkingSpot
from schemas.parking_schema import EntrySchema,ExitSchema

from utils.destination import Destination

        
router = APIRouter(
    prefix="/parking",
    tags=["Parking"]
)

destination = Destination()

# Todo move this function to Node Server
@router.get("/")
async def get_parker(db:Session = Depends(get_db)):
    data = db.query(Parking).all()
    return data

@router.post("/entry")
async def parker_entry(entry: EntrySchema,db:Session = Depends(get_db)):
    try:
        
        new_parker = Parking(**entry.toJson())
        
        # ? Update parking spot status
        spot = db.query(ParkingSpot).get(new_parker.parkingSpotId)
        spot.on_entry()
        
        db.add(new_parker)
        db.commit()
        
        return {"message":f"{spot.spotCode} parked"}
    
    except Exception as e:
        print(e)
        raise HTTPException(500,e.__doc__ or e.args[0])

@router.post("/exit")
async def parker_exit(exit:ExitSchema ,db:Session = Depends(get_db)):
    try:
        # TODO !!! Update Exception Catcher
        #? get owner of plateNumber
        parker = db.query(Parker).filter_by(plateNumber=exit.plateNumber).one_or_none()
        parking = db.query(Parking).filter_by(parker=parker,exited=None).one_or_none()
        spot = db.query(ParkingSpot).get(parking.parkingSpotId)
        
        spot.on_exit()
        parking.on_exit()
        db.commit()
        return {"message": "Exited"}
    
    except Exception as e:
        raise HTTPException(500,e.__doc__ or e.args[0])

# TODO add update for exit