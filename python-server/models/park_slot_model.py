from email.policy import default
from sqlalchemy.schema import Column
from sqlalchemy.types import String,Integer,Boolean
from config.database import Base
from .base import  BaseModel


class ParkSlotModel(BaseModel,Base):
    __tablename__ = "ParkSlots"

    spaceNumber=Column(Integer)
    availability=Column(Boolean,default=True)
    plateNumber=Column(String(100),default=None)