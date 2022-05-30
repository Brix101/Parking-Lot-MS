from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

class ParkingSpotSchema(BaseModel):
    spotCode : str
    isAvailable : bool or None = True
    active: bool or None = True

    class Config:
        orm_mode = True
        
    def __iter__(self):            
        return iter(self)
    
    def toJson(self):
        return jsonable_encoder(self)