import os
from fastapi import APIRouter,UploadFile,Depends,HTTPException,Response,status,File
from sqlalchemy.orm import Session
from datetime import date,datetime
from config.database import get_db

from utils.image_upload import image_save

from models.image_model import ImageModel

from schemas.image_schema import ImageSchema

router = APIRouter(
    prefix="/image",
    tags=["image"]
)
now = datetime.now()

current_time = now.strftime("%H-%M-%S")
#year-month-date
DESTINATION = f"../data/{str(date.today())}/"

# Create Folder W/ Date if does not excist
if not os.path.exists(DESTINATION):
	os.mkdir(DESTINATION)
 
@router.post("/uploadfile")
async def upload_file(res: Response,file: UploadFile = File(..., description="A file read as UploadFile"),db:Session = Depends(get_db)):
    try:
        fullpath = os.path.join(DESTINATION, f"{current_time}-data-{file.filename}") 
        link = f"http://localhost:8000/{fullpath}" #create Link   
        
        err = await image_save(file, fullpath)
        
        if err is not None:
            res.status_code = status.HTTP_400_BAD_REQUEST
            return err
        
        new_image = ImageModel(name=file.filename,imageLink=link)
        db.add(new_image)
        db.commit()
        
        return {"detail": f"{file.filename} saved to disk"}
        
    except Exception as e:
        raise HTTPException(400,e)
        