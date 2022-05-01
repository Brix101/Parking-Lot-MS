from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder

class LocationSchema(BaseModel):
    location : int
    availability : bool | None = True

    class Config:
        orm_mode = True
        
    def __iter__(self):            
        return iter(self)
    
    def toJson(self):
        return jsonable_encoder(self)