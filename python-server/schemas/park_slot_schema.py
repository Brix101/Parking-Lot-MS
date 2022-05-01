from pydantic import BaseModel

class ParkSlotSchema(BaseModel):
    spaceNumber : int
    availability : bool | None = True
    plateNumber : str | None = None

    class Config:
        orm_mode = True