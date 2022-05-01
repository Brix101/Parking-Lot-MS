from sqlalchemy import Column,String,DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from config.database import Base
from .base import  BaseModel


class Parker(BaseModel,Base):
    __tablename__ = "Parkers"

    plateNumber=Column(String(250))
    imageLink=Column(String(250)) 
    entered = Column(DateTime, default=func.now())
    exited = Column(DateTime, default=None)
    location = relationship("ParkSlot",back_populates="parker") 