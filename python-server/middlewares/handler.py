from fastapi import Request
from fastapi.responses import JSONResponse
from utils.logger import logger


async def exception_handler(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        logger.error(e)  
          
        err_message = {
            "message":f"Failed to execute: {request.method} method on {request.url}",
            "detail": f"{e}"
        }    
        return JSONResponse(status_code=400, content=err_message)