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
                    return {"detail":"File Empty"}
                file_object.write(contents)# Save Object
