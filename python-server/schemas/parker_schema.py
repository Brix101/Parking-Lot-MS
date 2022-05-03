from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

class ParkingSchema(BaseModel):
    plateNumber : str
    location: str

    class Config:
        orm_mode = True
                    
    def __iter__(self):            
        return iter(self)
    
    def toJson(self):
        return jsonable_encoder(self)
    