from fastapi import HTTPException
from .logger import log
CHUNK_SIZE = 2 ** 20  # 1MB
 
async def image_save(file, dst):
    print(file.content_type)
    if file.content_type not in ["image/png","image/jpg" ,"image/jpeg"]:
        return {"detail":"Invalid File type"}
    else:
        await file.seek(0)
        with open(dst, "wb") as file_object:
            while True:
                contents = await file.read(CHUNK_SIZE)
                if not contents:
                    log.info(f"Src completely consumed\n")
                    break
                log.info(f"Consumed {len(contents)} bytes from Src file\n")
                file_object.write(contents)# Save Object
