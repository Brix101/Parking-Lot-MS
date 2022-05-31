
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List, Optional

class BlockModel(BaseModel):
  block_code: str
  spot1: List[int]
  spot2: Optional[List[int]]
  spot3: Optional[List[int]]
  
  class Config:
      orm_mode = True
      
  def __iter__(self):            
      return iter(self)
  
  def toJson(self):
      return jsonable_encoder(self)
