from fastapi import APIRouter,Depends,HTTPException,UploadFile,File,Response,status
from sqlalchemy.orm import Session
from config.database import get_db

from models.parker_model import Parker

from utils.destination import Destination

        
router = APIRouter(
    prefix="/parker",
    tags=["Parker"]
)

destination = Destination()

# Todo move this function to Node Server
@router.get("/")
async def get_parker(db:Session = Depends(get_db)):
    data = db.query(Parker).all()
    return data

@router.post("/")
async def add_parker(res: Response,file : UploadFile = File(..., description="Select File to Upload"),db:Session = Depends(get_db)):
    try:
        err,link = await destination.upload(file)
        
        if err is not None:
            res.status_code = status.HTTP_400_BAD_REQUEST
            return err
        
        parker = Parker(plateNumber= file.filename,imageLink=link)
        
        db.add(parker)
        db.commit()
        
        return {"parkerId": f"{parker.id}"}
    
    except Exception as e:
        raise HTTPException(500,e.__doc__ or e.message)


# TODO update Delete