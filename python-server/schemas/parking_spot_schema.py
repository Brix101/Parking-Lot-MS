from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

class ParkingSpotSchema(BaseModel):
    spotCode : str
    status : bool or None = True
    description: str or None = None
    active: bool or None = False

    class Config:
        orm_mode = True
        
    def __iter__(self):            
        return iter(self)
    
    def toJson(self):
        return jsonable_encoder(self)