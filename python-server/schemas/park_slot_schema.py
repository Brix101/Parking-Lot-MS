from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

class ParkSlotSchema(BaseModel):
    spaceNumber : int
    availability : bool | None = True
    plateNumber : str | None = None

    class Config:
        orm_mode = True
        
    def __iter__(self):            
        return iter(self)
    
    def toJson(self):
        return jsonable_encoder(self)