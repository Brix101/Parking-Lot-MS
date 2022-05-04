from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from config.database import Base
from .base import  BaseModel


class ParkerImage(BaseModel,Base):
    __tablename__ = "ParkerImages"


    imageLink=Column(String(250))
    parkerId = Column(Integer, ForeignKey('Parkers.id'))
    
    parker = relationship("Parker", back_populates="parkerImages")