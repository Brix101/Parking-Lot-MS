import os
from datetime import date
from fastapi import APIRouter,UploadFile,Depends
from sqlalchemy.orm import Session
from config.database import get_db

from utils.image_upload import image_save

from models.image_model import ImageModel

from schemas.image_schema import ImageSchema

router = APIRouter(
    prefix="/image",
    tags=["image"]
)

#year-month-date
DESTINATION = f"static/{str(date.today())}/"

# Create Folder W/ Date if does not excist
if not os.path.exists(DESTINATION):
	os.mkdir(DESTINATION)
 
@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile,db:Session = Depends(get_db)):
    fullpath = os.path.join(DESTINATION, file.filename)    
    await image_save(file, fullpath)
    
    link = f"http://localhost:8000/{fullpath}" #create Link
    new_image = ImageModel(name=file.filename,imageLink=link)
    db.add(new_image)
    db.commit()
    
    return {"File saved to disk at": link}
    