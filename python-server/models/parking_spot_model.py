from sqlalchemy import Boolean,Column,String
from sqlalchemy.orm import relationship,backref
from config.database import Base
from .base import  BaseModel

class ParkingSpot(Base,BaseModel):
    __tablename__ = "ParkingSpots"

    spotCode=Column(String(100))
    status=Column(Boolean,default=True)
    description=Column(String(250))
    active=Column(Boolean,default=False)
    
    parking = relationship("Parking", back_populates="parkingSpot",passive_deletes=True)
    
    def on_entry(self):
        self.status = False
    
    def on_exit(self):
        self.status = True
        
    