from fastapi import UploadFile
from pydantic import BaseModel

class ImageSchema(BaseModel):
    name : str
    file : UploadFile

    class Config:
        orm_mode = True