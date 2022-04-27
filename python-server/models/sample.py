from sqlalchemy.schema import Column
from sqlalchemy.types import String,Integer
from config.database import Base,engine
from .base import  BaseModel


class SampleModel(BaseModel,Base):
    __tablename__ = "Samples"

    name=Column(String(250))
    # complete=Column(Boolean,default=False)