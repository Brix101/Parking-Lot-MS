from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

class ParkingSpotSchema(BaseModel):
    spot : str
    status : bool | None = True
    description: str | None = None
    active: bool | None = False

    class Config:
        orm_mode = True
        
    def __iter__(self):            
        return iter(self)
    
    def toJson(self):
        return jsonable_encoder(self)