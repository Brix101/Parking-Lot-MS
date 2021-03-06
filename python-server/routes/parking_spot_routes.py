from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from config.database import get_db

from models.parking_spot_model import ParkingSpot

from schemas.parking_spot_schema import ParkingSpotSchema
        
router = APIRouter(
    prefix="/parking-spot",
    tags=["ParkingSpot"]
)


@router.get("/")
async def get_parking_spot(db:Session = Depends(get_db)):
    data = db.query(ParkingSpot).all()
    return data

@router.post("/")
async def add_spot(parkingSpot:ParkingSpotSchema,db:Session = Depends(get_db)):
   
    try:            
        # **obj will unpack dict object/ in JS ...data
        spot = ParkingSpot(**parkingSpot.toJson())
        db.add(spot)
        db.commit()
                
        return {"message": f"{spot.spotCode} is Added"}
        
    except Exception as e:
       raise e
