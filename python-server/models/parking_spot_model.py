from email.policy import default
from sqlalchemy import Boolean,Column,String,ARRAY,DECIMAL
from sqlalchemy.orm import relationship,backref
from config.database import Base
from .base import  BaseModel

class ParkingSpot(Base,BaseModel):
    __tablename__ = "ParkingSpots"

    spotCode=Column(String(100))
    isAvailable=Column(Boolean,default=True)
    active=Column(Boolean,default=False)
    
    parking = relationship("Parking", back_populates="parkingSpot",passive_deletes=True)
    
    def on_entry(self):
        self.isAvailable = False
    
    def on_exit(self):
        self.isAvailable = True
        
    