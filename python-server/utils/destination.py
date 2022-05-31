import os 
from datetime import date,datetime

class Destination:
    
    def __init__(self):
        self.destination = f"../data/{str(date.today())}/"
        self.timenow = datetime.now().strftime("%H-%M-%S")
        self.CHUNK_SIZE = 2 ** 20  # 1MB

    
    async def image_save(self,file,dst):
        if file.content_type not in ["image/png","image/jpg" ,"image/jpeg"]:
            return {"detail":"Invalid File type"}
        else:
            await file.seek(0)
            with open(dst, "wb") as file_object:
                while True:
                    contents = await file.read(self.CHUNK_SIZE)
                    if not contents:
                        break
                    file_object.write(contents)# Save Object    
    
    async def upload(self,file):
        # Create Folder W/ Date
        if not os.path.exists(self.destination):
            os.mkdir(self.destination)
            
            
        fullpath= os.path.join(self.destination, f"{self.timenow}-data-{file.filename}")
        err = await self.image_save(file,fullpath)      
                #TODO update localhost to own ip
        return err, f"http://localhost:8000/{fullpath}"