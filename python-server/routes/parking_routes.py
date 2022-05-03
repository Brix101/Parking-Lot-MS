from fastapi import APIRouter,Depends,HTTPException,UploadFile,File,Response,status
from sqlalchemy.orm import Session
from config.database import get_db

from models.parking_model import Parking
from schemas.parking_schema import EntrySchema

from utils.destination import Destination

        
router = APIRouter(
    prefix="/parker",
    tags=["Parker"]
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
        
        db.add(new_parker)
        db.commit()
        
        return "Hello Parker"
    
    except Exception as e:
        raise HTTPException(500,e.__doc__ or e.message)

@router.post("/exit")
async def parker_exit(res:Response,db:Session = Depends(get_db)):
    
    return "exit parker"

# TODO add update for exit