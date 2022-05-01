from email.policy import default
from sqlalchemy.schema import Column
from sqlalchemy.types import String,DateTime,Integer
from sqlalchemy.sql import func
from config.database import Base
from .base import  BaseModel


class ImageModel(BaseModel,Base):
    __tablename__ = "Images"

    plateNumber=Column(String(250))
    imageLink=Column(String(250))
    parkLocation=Column(Integer,default=None)    
    entered = Column(DateTime, default=func.now())
    exited = Column(DateTime, default=None)