from jwt import encode,decode
from .ip_addr import IP

def get_jwt():
    return encode({"ip": IP().get_ip()}, "secret", algorithm="HS256")

def decode_jwt(encoded):
    return decode(encoded, "secret", algorithms=["HS256"])