import os
import logging
from datetime import date
from fastapi import APIRouter,UploadFile,Depends
from sqlalchemy.orm import Session
from config.database import get_db

from models.image_model import ImageModel

from schemas.image_schema import ImageSchema

router = APIRouter(
    prefix="/image",
    tags=["image"]
)

log = logging.getLogger(__name__)
today = date.today()

#year-month-date
DESTINATION = f"static/{str(today)}/"
CHUNK_SIZE = 2 ** 20  # 1MB

# Create Folder W/ Date
if not os.path.exists(DESTINATION):
	os.mkdir(DESTINATION)
 
async def image_save(src, dst):
    await src.seek(0)
    with open(dst, "wb") as file_object:
        while True:
            contents = await src.read(CHUNK_SIZE)
            if not contents:
                log.info(f"Src completely consumed\n")
                break
            log.info(f"Consumed {len(contents)} bytes from Src file\n")
            file_object.write(contents)# Save Object

@router.post("/uploadfile/")
async def create_upload_file(file: UploadFile,db:Session = Depends(get_db)):
    fullpath = os.path.join(DESTINATION, file.filename)    
    await image_save(file, fullpath)
    
    link = f"http://localhost:8000/{fullpath}" #create Link
    new_image = ImageModel(name=file.filename,imageLink=link)
    db.add(new_image)
    db.commit()
    
    return {"File saved to disk at": link}
    