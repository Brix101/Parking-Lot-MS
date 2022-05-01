from fastapi import FastAPI
from config.database import engine,Base
from fastapi.staticfiles import StaticFiles

from routes import image_routes,location_routes,parker_routes


Base.metadata.create_all(engine)#Initialize Database
app = FastAPI(title="Parking Lot MS")

app.mount("/data", StaticFiles(directory="../data"), name="static")

app.include_router(image_routes.router)
app.include_router(location_routes.router)
app.include_router(parker_routes.router)

@app.get("/")
async def root():
    return {"message": "☁☁☁"}