from pybricks.iodevices import PUPDevice
from pybricks.parameters import Port

cam = PUPDevice(Port.A)

def readCamera(mode=9):
    data = []
    for word in cam.read(mode):
        data.append(word & 255)
        data.append((word >> 8) & 255)
    return data

def signedByte(value):
    return value - 256 if value > 127 else value

from pybricks.tools import wait

# Select camera Mode ID 13 before running.
while True:
    data = readCamera()
    x, y, area = data[0], data[1], data[2]
    print(x, y, area) if x else print("No target")
    wait(100)
