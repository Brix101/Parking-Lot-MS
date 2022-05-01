from fastapi import APIRouter,Depends
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
    name = db.query(ParkSlotModel).all()
    return name

@router.post("/")
async def add_park_slot(sample:ParkSlotSchema,db:Session = Depends(get_db)):
    new_slot = ParkSlotModel(name=sample.name)
    db.add(new_slot)
    db.commit()
    return {"message": f"{new_slot.spaceNumber} is Added"}

# TODO add delete & update