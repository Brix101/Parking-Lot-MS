from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

class EntrySchema(BaseModel):
    spotCode : str
    blockCode: str
    parkerId: int

    class Config:
        orm_mode = True
                    
    def __iter__(self):            
        return iter(self)
    
    def toJson(self):
        return jsonable_encoder(self)
    

class ExitSchema(BaseModel):
    plateNumber : str
    
    class Config:
        orm_mode = True
                    
    def __iter__(self):            
        return iter(self)
    
    def toJson(self):
        return jsonable_encoder(self)