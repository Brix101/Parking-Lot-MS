from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from config.database import get_db

from models.sample import SampleModel

from schemas.sample_schema import SampleSchema
        
router = APIRouter(
    prefix="/sample",
    tags=["Sample"]
)

@router.get("/")
async def get_todos(db:Session = Depends(get_db)):
    name = db.query(SampleModel).all()
    return name

@router.post("/")
async def add_todo(sample:SampleSchema,db:Session = Depends(get_db)):
    new_name = SampleModel(name=sample.name)
    db.add(new_name)
    db.commit()
    return {"message": "{} is Added".format(new_name.name)}