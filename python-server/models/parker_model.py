from sqlalchemy import Column, String, null
from sqlalchemy.orm import relationship
from config.database import Base
from .base import  BaseModel


class Parker(BaseModel,Base):
    __tablename__ = "Parkers"

    plateNumber=Column(String(100))
    note=Column(String(250),default=None)   
    
    parking = relationship("Parking",back_populates="parker")    
    parkerImages = relationship("ParkerImage",back_populates="parker")