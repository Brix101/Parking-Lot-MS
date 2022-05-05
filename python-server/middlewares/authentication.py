from fastapi import Cookie, HTTPException


async def auth(session: str | None = Cookie(None)):
    if(session is None):
        raise HTTPException(403, "Unauthorized")