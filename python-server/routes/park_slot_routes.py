from fastapi import APIRouter,Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from config.database import get_db

from models.park_slot_model import ParkSlotModel

from schemas.park_slot_schema import ParkSlotSchema
        
router = APIRouter(
    prefix="/park-slot",
    tags=["ParkSlot"]
)

@router.get("/")
async def get_park_slot(db:Session = Depends(get_db)):
    data = db.query(ParkSlotModel).all()
    return data

@router.post("/")
async def add_park_slot(parkSpace:ParkSlotSchema,db:Session = Depends(get_db)):
    try:            
        # **obj will unpack dict object/ in JS ...data
        new_slot = ParkSlotModel(**parkSpace.toJson())
        db.add(new_slot)
        db.commit()
        return {"message": f"{new_slot.spaceNumber} is Added"}
    except:
        return

# TODO add delete & update