from typing import Optional
from pydantic import BaseModel
from fastapi import UploadFile,File
from fastapi.encoders import jsonable_encoder

class ParkerSchema(BaseModel):
    plateNumber : str
    imageLink : str

    class Config:
        orm_mode = True
                    
    def __iter__(self):            
        return iter(self)
    
    def toJson(self):
        return jsonable_encoder(self)