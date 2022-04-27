from sqlalchemy.schema import Column
from sqlalchemy.types import String,Integer
from config.database import Base,engine
from .base import  BaseModel


class ImageModel(BaseModel,Base):
    __tablename__ = "Images"

    name=Column(String(250))
    imageLink=Column(String(250))
    # complete=Column(Boolean,default=False)