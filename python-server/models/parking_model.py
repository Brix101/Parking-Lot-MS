from sqlalchemy import Column, DateTime, ForeignKey, Integer
from sqlalchemy.orm import relationship
from config.database import Base
from .base import  BaseModel

from sqlalchemy.sql import func

class Parking(Base,BaseModel):
    __tablename__ = "ParkingSpots"

    entered = Column(DateTime, default=func.now())
    exited = Column(DateTime, default=None)  
    parkingSpotId = Column(Integer, ForeignKey('ParkingSpots.id'))
    parkerId = Column(Integer, ForeignKey('Parkers.id'))
    
    parkingSpot = relationship("ParkingSpot", back_populates="location")
    parker = relationship("Parker", back_populates="location")