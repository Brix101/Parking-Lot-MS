from email import message
from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy import null
from sqlalchemy.orm import Session
from config.database import get_db

from models.location_model import Location

from schemas.location_schema import LocationSchema
        
router = APIRouter(
    prefix="/location",
    tags=["Location"]
)

@router.get("/")
async def get_location(db:Session = Depends(get_db)):
    data = db.query(Location).all()
    return data

@router.post("/")
async def add_location(location:LocationSchema,db:Session = Depends(get_db)):
   
    try:            
        # **obj will unpack dict object/ in JS ...data
        new_location = Location(**location.toJson())
        db.add(new_location)
        db.commit()
                
        return {"message": f"{new_location.location} is Added"}
        
    except Exception as e:
        raise HTTPException(500,e.__doc__ or e.message)

# TODO add delete & update