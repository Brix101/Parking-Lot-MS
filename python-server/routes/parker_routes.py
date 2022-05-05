from fastapi import APIRouter,Depends,HTTPException,UploadFile,File,Response,status
from sqlalchemy.orm import Session
from config.database import get_db

from models.parker_model import Parker
from models.parker_image_model import ParkerImage

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
        
        parker = db.query(Parker).filter_by(plateNumber= file.filename).first()
        
        if(parker is None):      
            new_parker = Parker(plateNumber= file.filename)
            new_image = ParkerImage(imageLink=link,parker=new_parker)            
            db.add(new_parker)
        else:
            new_image = ParkerImage(imageLink=link,parker=parker)
               
               
        db.add(new_image)
        db.commit()
        
        id = new_parker.id if (parker is None ) else parker.id        
        return {"parkerId": f"{id}"}
    
    except Exception as e:
        raise e


# TODO update Delete