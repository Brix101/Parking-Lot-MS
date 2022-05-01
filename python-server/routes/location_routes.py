from fastapi import APIRouter,Depends
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from config.database import get_db

from models.location_model import Location

from schemas.location_schema import LocationSchema
        
router = APIRouter(
    prefix="/location",
    tags=["Location"]
)

@router.get("/")
async def get_park_slot(db:Session = Depends(get_db)):
    data = db.query(Location).all()
    return data

@router.post("/")
async def add_park_slot(location:LocationSchema,db:Session = Depends(get_db)):
    try:            
        # **obj will unpack dict object/ in JS ...data
        new_location = Location(**location.toJson())
        db.add(new_location)
        db.commit()
        return {"message": f"{new_location.location} is Added"}
    except:
        return

# TODO add delete & update