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


@router.get("/")
async def get_parker(db:Session = Depends(get_db)):
    data = db.query(Parker).all()
    return data

@router.post("/")
async def add_parker(res: Response,image : UploadFile = File(..., description="Select File to Upload"),db:Session = Depends(get_db)):
    try:
        err,link = await Destination().path(image)
        
        if err is not None:
            res.status_code = status.HTTP_400_BAD_REQUEST
            return err
        
        # **obj will unpack dict object/ in JS ...data
        # new_parker = Parker(**parker.toJson())
        # db.add(new_parker)
        # db.commit()
        # return {"message": f"{new_parker.plateNumber} is Added"}
        return link
    
    except Exception as e:
        raise HTTPException(500,e.__doc__ or e.message)

# TODO add delete & update