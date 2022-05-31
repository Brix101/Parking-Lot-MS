
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List, Optional

class DetectionModel(BaseModel):
  block: str
  type: str
  score: float
  bounds: List[int]
  
  class Config:
      orm_mode = True
      
  def __iter__(self):            
      return iter(self)
  
  def toJson(self):
      return jsonable_encoder(self)
