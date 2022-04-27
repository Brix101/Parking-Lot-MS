import socket    

def ip():
    hostname = socket.gethostname()    
    IPAddr = socket.gethostbyname(hostname) 
    
    return IPAddr