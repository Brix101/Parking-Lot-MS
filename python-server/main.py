from fastapi import FastAPI
from config.database import engine,Base
from routes import sample_routes


Base.metadata.create_all(engine)#Initialize Database
app = FastAPI(title="Parking Lot MS")


app.include_router(sample_routes.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}