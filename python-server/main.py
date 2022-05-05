from urllib.request import Request
from fastapi import FastAPI,HTTPException
from config.database import engine,Base
from fastapi.staticfiles import StaticFiles

from fastapi.responses import JSONResponse

from utils.logger import logger

from routes import parker_routes, parking_routes,parking_spot_routes


Base.metadata.create_all(engine)#Initialize Database

app = FastAPI(title="Parking Lot MS")

app.mount("/data", StaticFiles(directory="../data"), name="static")# Static folder and routes

@app.middleware("http")
async def exception_handler(request: Request, next):
    try:
        return await next(request)
    except Exception as e:
        logger.error(e)    
        err_message = {
            "message":f"Failed to execute: {request.method}: {request.url}",
            "detail": f"{e}"
        }    
        return JSONResponse(status_code=400, content=err_message)

app.include_router(parker_routes.router)
app.include_router(parking_routes.router)
app.include_router(parking_spot_routes.router)

@app.get("/")
async def root(): 
    return {"message": "☁☁☁"}