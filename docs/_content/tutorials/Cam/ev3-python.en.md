# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported equipment |
| --- | --- |
| Controller | LEGO® MINDSTORMS® EV3 brick |
| Sensor | MBC UniCam Vision Camera Sensor with EV3 firmware |
| Programming environment | Pybricks Python |

1. Connect the camera to sensor port 1 using an EV3 cable. If you use port 2–4, update the program as well.
2. Check that the host name on the camera display is green. The EV3 identifies the camera as an Infrared Sensor.
3. Use MODE on the camera to select the camera mode and submode. Teach colors and change camera modes on the camera. The EV3 connection is read-only.

Use Pybricks v4 in Pybricks Code, or LEGO EV3 MicroPython v2 with the microSD boot card and the LEGO MINDSTORMS EV3 MicroPython extension in VS Code.

## 02 / Functions and data

### ✔ Infrared readings

Use LUMPDevice for raw data. Beacon values alternate heading and distance for channels 1 through 4.

| EV3 read mode | Data |
| --- | --- |
| 0 Proximity | Camera mode number, for example 13. |
| 1 Beacon | Heading and distance for each of 4 channels, for 8 slots. |
| 2 Remote | One slot per channel, for 4 slots. |

Camera positions use an 8×6 grid. Split X×10+Y into quotient and remainder. Y=1 is at the bottom, and packed position 0 means no target. Changing EV3 read modes can take roughly half a second to over a second depending on the environment. Keep the control loop on one read mode when possible.

### ✔ Fields by camera mode

| Camera mode | Field order |
| --- | --- |
| 11 | 12 positions. Beacon holds targets 1–8 and Remote holds 9–12. |
| 12 | The 8 Beacon slots hold 8 positions in order. |
| 13 | One target per Beacon channel. Heading is packed position, distance is area %. |
| 14 | Four Beacon slots per target: position, W×10+H, count, area %. Two targets. |
| 21 | Beacon holds S1–S8 hue, Remote holds S9–S12. |
| 22 | One sample per Beacon channel. Heading is hue. Distance packs the tens digits of saturation and brightness. Four samples. |
| 23 | Four Beacon slots per point: hue hundreds, hue remainder, saturation, brightness. Two samples. |
| 30 | Beacon holds the first 8 hues from the left. Remote channels 1–3 hold hues 9–11, channel 4 holds the total. |
| 41–43 | Black, white, and colored lines share a layout. Beacon holds near, middle, and far offsets, angle, near width, junction×10+flags, junction distance, and marker hue. Remote holds left edge, right edge, far width, and marker count. |
| 51 | Beacon channels 1–4 hold code and position for objects 1–4. Remote channels 1 and 2 hold object 5 code and position, and channel 4 holds the total. |
| 52 | Four Beacon slots per object: code, position, area, and half-angle. Two objects. Double the half-angle and cap at 179°. |

Modes 21, 22, and 30 scale nonnegative hue to 0–100. Negative values represent grayscale (−1 to −8 for white to gray, −9 to −15 for black). In color order, 0 can mean red, so check the total first. Mode 23 gives raw hue as hundreds×100 plus the remainder.

## 03 / Example program

### ✔ Read target 1 position and area

Teach target color 1 and set the camera to mode 13 (Color Tracking ③ Standard).

```python
#!/usr/bin/env pybricks-micropython
from pybricks.iodevices import LUMPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = LUMPDevice(Port.S1)
if cam.read(0)[0] != 13:
    raise RuntimeError("Select Color Tracking Standard (13)")

while True:
    position, area = cam.read(1)[:2]
    if position:
        x, y = divmod(position, 10)
        print(x, y, area)
    else:
        print("No target")
    wait(100)
```

For Object Details (52), change the startup mode check to 52. The first four Beacon slots are code, position, area, and half-angle. If code is nonzero, use divmod(code, 10) to split color and shape, and divmod(position, 10) to split the position.

## 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />
