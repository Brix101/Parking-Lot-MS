from fastapi import FastAPI
from config.database import engine,Base
from fastapi.staticfiles import StaticFiles

from routes import parking_spot_routes,parker_routes


Base.metadata.create_all(engine)#Initialize Database

app = FastAPI(title="Parking Lot MS")

app.mount("/data", StaticFiles(directory="../data"), name="static")# Static folder and routes

app.include_router(parking_spot_routes.router)
app.include_router(parker_routes.router)

@app.get("/")
async def root():
    return {"message": "☁☁☁"}