from pydantic import BaseModel

class SampleSchema(BaseModel):
    name : str

    class Config:
        orm_mode = True