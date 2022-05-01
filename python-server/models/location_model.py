from email.policy import default
from sqlalchemy import Column,Integer,Boolean,ForeignKey
from sqlalchemy.orm import relationship
from config.database import Base
from .base import  BaseModel


class Location(BaseModel,Base):
    __tablename__ = "Locations"

    location=Column(Integer)
    availability=Column(Boolean,default=True)
    parker_id = Column(Integer, ForeignKey('Parkers.id'))
    
    parker = relationship("Parker", back_populates="location")