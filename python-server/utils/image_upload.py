
import logging


log = logging.getLogger(__name__)
CHUNK_SIZE = 2 ** 20  # 1MB
 
async def image_save(src, dst):
    await src.seek(0)
    with open(dst, "wb") as file_object:
        while True:
            contents = await src.read(CHUNK_SIZE)
            if not contents:
                log.info(f"Src completely consumed\n")
                break
            log.info(f"Consumed {len(contents)} bytes from Src file\n")
            file_object.write(contents)# Save Object
