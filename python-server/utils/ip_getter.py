import socket    

class GetIP:
    def __init__(self):
        self.hostname = socket.gethostname()    
        self.IPAddr = socket.gethostbyname(self.hostname) 
        
    def ip(self):
        return self.IPAddr