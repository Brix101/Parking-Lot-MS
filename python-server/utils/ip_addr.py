import socket    

class IP:
    def __init__(self):
        self.hostname = socket.gethostname()    
        self.IPAddr = socket.gethostbyname(self.hostname) 
        
    def get_ip(self):
        return self.IPAddr