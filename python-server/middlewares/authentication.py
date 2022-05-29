from fastapi import Cookie, HTTPException
from utils.jwt_utils import decode_jwt

async def auth(session: str or None = Cookie(None)):
    if(session is None):
        raise HTTPException(403, "Unauthorized")
    
    print(decode_jwt(session))