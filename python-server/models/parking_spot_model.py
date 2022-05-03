from sqlalchemy import Boolean,Column,String, null
from sqlalchemy.orm import relationship
from config.database import Base
from .base import  BaseModel

class ParkingSpot(Base,BaseModel):
    __tablename__ = "ParkingSpots"

    spot=Column(String(100))
    status=Column(Boolean,default=True)
    description=Column(String(250))
    active=Column(Boolean,default=False)
    
    parking = relationship("Parking",back_populates="parkingSpot")
    
    def update(self):
        if(self.parking != null):
            self.status = False
        else:
            self.status = True
    
    def on_exit(self):
        self.parking = 1        
        self.update()
    