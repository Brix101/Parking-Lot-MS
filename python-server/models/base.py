from sqlalchemy.schema import Column
from sqlalchemy.types import Integer,DateTime
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declared_attr

class BaseModel(object):
    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()

    # __table_args__ = {'mysql_engine': 'InnoDB'}

    id =  Column(Integer, primary_key=True)
    createdAt = Column(DateTime, default=func.now())
    updatedAt = Column(DateTime, default=func.now())