from fastapi import FastAPI,Request,Response
from config.database import engine,Base
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from utils.jwt_utils import get_jwt
from utils.logger import logger

# butang daan dre ang mga routes kay para ma create ang table
from routes import parker_routes, parking_routes,parking_spot_routes

Base.metadata.create_all(engine,checkfirst=True)#Initialize Database

app = FastAPI(title="Parking Lot MS")

app.mount("/data", StaticFiles(directory="../data"), name="static")# Static folder and routes

@app.middleware("http")
async def exception_handler(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        logger.error(e)    
        err_message = {
            "message":f"Failed to execute: {request.method} method on {request.url}",
            "detail": f"{e}"
        }    
        return JSONResponse(status_code=501, content=err_message)
    

app.include_router(parker_routes.router)
app.include_router(parking_routes.router)
app.include_router(parking_spot_routes.router)


@app.get("/")
async def root(response: Response): 
    response.set_cookie(key="session", value=get_jwt())
    
    return {"message": "☁☁☁"}