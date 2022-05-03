from fastapi import APIRouter,Depends,HTTPException,UploadFile,File,Response,status
from sqlalchemy.orm import Session
from config.database import get_db

from models.parker_model import Parker
from schemas.parker_schema import ParkerSchema

from utils.destination_generator import Destination

        
router = APIRouter(
    prefix="/parker",
    tags=["Parker"]
)

# Todo move this function to Node Server
@router.get("/")
async def get_parker(db:Session = Depends(get_db)):
    data = db.query(Parker).all()
    return data

@router.post("/entry")
async def parker_entry(res: Response,file : UploadFile = File(..., description="Select File to Upload"),db:Session = Depends(get_db)):
    try:
        err,link = await Destination().path(file)
        
        if err is not None:
            res.status_code = status.HTTP_400_BAD_REQUEST
            return err
        # TODO add parker location
        new_parker = Parker(plateNumber= file.filename,imageLink=link)
        db.add(new_parker)
        db.commit()
        return {"message": f"{new_parker.plateNumber} is Added"}
    
    except Exception as e:
        raise HTTPException(500,e.__doc__ or e.message)

@router.post("/exit")
async def parker_exit():
    return "exit"

# TODO add update for exit