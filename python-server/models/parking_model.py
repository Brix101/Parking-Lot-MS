from sqlalchemy import Column, DateTime, ForeignKey, Integer, null
from sqlalchemy.orm import relationship
from config.database import Base
from .base import  BaseModel

from sqlalchemy.sql import func

class Parking(Base,BaseModel):
    __tablename__ = "Parkings"

    entered = Column(DateTime, default=func.now())
    exited = Column(DateTime, default=None)  
    parkingSpotId = Column(Integer, ForeignKey('ParkingSpots.id',ondelete='CASCADE'))
    parkerId = Column(Integer, ForeignKey('Parkers.id',ondelete='CASCADE'))
    
    parkingSpot = relationship("ParkingSpot", back_populates="parking")
    parker = relationship("Parker",cascade="all,delete", back_populates="parking")
    
    
    def on_exit(self):
        self.exited = func.now()
        