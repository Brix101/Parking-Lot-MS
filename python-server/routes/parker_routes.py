from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from config.database import get_db

from models.parker_model import Parker
from schemas.parker_schema import ParkerSchema

        
router = APIRouter(
    prefix="/parker",
    tags=["Parker"]
)

@router.get("/")
async def get_parker(db:Session = Depends(get_db)):
    data = db.query(Parker).all()
    return data

@router.post("/")
async def add_parker(parker:ParkerSchema,db:Session = Depends(get_db)):
    
    try:
        # **obj will unpack dict object/ in JS ...data
        new_parker = Parker(**parker.toJson())
        db.add(new_parker)
        db.commit()
        return {"message": f"{new_parker.plateNumber} is Added"}
    
    except Exception as e:
        raise HTTPException(500,e.__doc__ or e.message)

# TODO add delete & update