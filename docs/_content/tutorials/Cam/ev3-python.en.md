# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® MINDSTORMS® EV3 |
| Sensor | MBC UniCam Vision Camera Sensor (EV3 edition) |
| Programming environment | Pybricks Python / EV3 MicroPython v2 |

### ✔ Before you begin

1. Start your EV3 and open Pybricks Code (v4) or an EV3 MicroPython v2 project in VS Code.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Functions and data

::: info ℹ️ Note
Read the camera with LUMPDevice(Port.S1). cam.read(0)[0] reports camera modeID, cam.read(1) returns eight Beacon values, and cam.read(2) returns four Remote values. The tables show the exact indexes. Read once into a variable before extracting fields in a loop. Select the camera mode on the camera.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and modeID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

Read positions for up to 12 targets.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | P1 |
| `cam.read(1)[1]` | P2 |
| `cam.read(1)[2]` | P3 |
| `cam.read(1)[3]` | P4 |
| `cam.read(1)[4]` | P5 |
| `cam.read(1)[5]` | P6 |
| `cam.read(1)[6]` | P7 |
| `cam.read(1)[7]` | P8 |
| `cam.read(2)[0]` | P9 |
| `cam.read(2)[1]` | P10 |
| `cam.read(2)[2]` | P11 |
| `cam.read(2)[3]` | P12 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

Read positions for up to 8 targets.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | P1 |
| `cam.read(1)[1]` | P2 |
| `cam.read(1)[2]` | P3 |
| `cam.read(1)[3]` | P4 |
| `cam.read(1)[4]` | P5 |
| `cam.read(1)[5]` | P6 |
| `cam.read(1)[6]` | P7 |
| `cam.read(1)[7]` | P8 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

Read positions for up to 4 targets and areas.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | P1 |
| `cam.read(1)[1]` | Area1 |
| `cam.read(1)[2]` | P2 |
| `cam.read(1)[3]` | Area2 |
| `cam.read(1)[4]` | P3 |
| `cam.read(1)[5]` | Area3 |
| `cam.read(1)[6]` | P4 |
| `cam.read(1)[7]` | Area4 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

Read positions and sizes for up to 2 targets, with counts available and areas.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | P1 |
| `cam.read(1)[1]` | W1×10+H1 |
| `cam.read(1)[2]` | Count1 |
| `cam.read(1)[3]` | Area1 |
| `cam.read(1)[4]` | P2 |
| `cam.read(1)[5]` | W2×10+H2 |
| `cam.read(1)[6]` | Count2 |
| `cam.read(1)[7]` | Area2 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

Read hue for up to 12 sample points, at the precision described below.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Hue1 (EV3) |
| `cam.read(1)[1]` | Hue2 (EV3) |
| `cam.read(1)[2]` | Hue3 (EV3) |
| `cam.read(1)[3]` | Hue4 (EV3) |
| `cam.read(1)[4]` | Hue5 (EV3) |
| `cam.read(1)[5]` | Hue6 (EV3) |
| `cam.read(1)[6]` | Hue7 (EV3) |
| `cam.read(1)[7]` | Hue8 (EV3) |
| `cam.read(2)[0]` | Hue9 (EV3) |
| `cam.read(2)[1]` | Hue10 (EV3) |
| `cam.read(2)[2]` | Hue11 (EV3) |
| `cam.read(2)[3]` | Hue12 (EV3) |

Nonnegative Hue (EV3) values are 0–100; approximately recover hue as reading×240/100. −1 to −8 mean white to gray, and −9 to −15 mean black.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

Read hue and saturation for up to 4 sample points, at the precision described below.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Hue1 (EV3) |
| `cam.read(1)[1]` | floor(Sat1÷10)×10+floor(Val1÷10) |
| `cam.read(1)[2]` | Hue2 (EV3) |
| `cam.read(1)[3]` | floor(Sat2÷10)×10+floor(Val2÷10) |
| `cam.read(1)[4]` | Hue3 (EV3) |
| `cam.read(1)[5]` | floor(Sat3÷10)×10+floor(Val3÷10) |
| `cam.read(1)[6]` | Hue4 (EV3) |
| `cam.read(1)[7]` | floor(Sat4÷10)×10+floor(Val4÷10) |

Saturation and brightness are packed as their tens digits. Split the reading by 10, then multiply each part by 10 for approximate values.

Nonnegative Hue (EV3) values are 0–100; approximately recover hue as reading×240/100. −1 to −8 mean white to gray, and −9 to −15 mean black.

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

Read hue, saturation, and brightness for up to 2 sample points, at the precision described below.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | floor(Hue1÷100) |
| `cam.read(1)[1]` | Hue1 % 100 |
| `cam.read(1)[2]` | Sat1 |
| `cam.read(1)[3]` | Val1 |
| `cam.read(1)[4]` | floor(Hue2÷100) |
| `cam.read(1)[5]` | Hue2 % 100 |
| `cam.read(1)[6]` | Sat2 |
| `cam.read(1)[7]` | Val2 |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

Read the first 11 hues from left to right and the total block count.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Hue1 (EV3) |
| `cam.read(1)[1]` | Hue2 (EV3) |
| `cam.read(1)[2]` | Hue3 (EV3) |
| `cam.read(1)[3]` | Hue4 (EV3) |
| `cam.read(1)[4]` | Hue5 (EV3) |
| `cam.read(1)[5]` | Hue6 (EV3) |
| `cam.read(1)[6]` | Hue7 (EV3) |
| `cam.read(1)[7]` | Hue8 (EV3) |
| `cam.read(2)[0]` | Hue9 (EV3) |
| `cam.read(2)[1]` | Hue10 (EV3) |
| `cam.read(2)[2]` | Hue11 (EV3) |
| `cam.read(2)[3]` | Total |

Nonnegative Hue (EV3) values are 0–100; approximately recover hue as reading×240/100. −1 to −8 mean white to gray, and −9 to −15 mean black.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Hue 0 can represent red. Use the total block count to identify valid entries.

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

Beacon and Remote together provide 12 line-following values.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Near offset |
| `cam.read(1)[1]` | Middle offset |
| `cam.read(1)[2]` | Far offset |
| `cam.read(1)[3]` | Angle |
| `cam.read(1)[4]` | Near width % |
| `cam.read(1)[5]` | Junction×10+Flags |
| `cam.read(1)[6]` | Junction distance % |
| `cam.read(1)[7]` | Marker color |
| `cam.read(2)[0]` | Left edge |
| `cam.read(2)[1]` | Right edge |
| `cam.read(2)[2]` | Far width % |
| `cam.read(2)[3]` | Marker count |

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

Beacon and Remote together provide 12 line-following values.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Near offset |
| `cam.read(1)[1]` | Middle offset |
| `cam.read(1)[2]` | Far offset |
| `cam.read(1)[3]` | Angle |
| `cam.read(1)[4]` | Near width % |
| `cam.read(1)[5]` | Junction×10+Flags |
| `cam.read(1)[6]` | Junction distance % |
| `cam.read(1)[7]` | Marker color |
| `cam.read(2)[0]` | Left edge |
| `cam.read(2)[1]` | Right edge |
| `cam.read(2)[2]` | Far width % |
| `cam.read(2)[3]` | Marker count |

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

Beacon and Remote together provide 12 line-following values.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Near offset |
| `cam.read(1)[1]` | Middle offset |
| `cam.read(1)[2]` | Far offset |
| `cam.read(1)[3]` | Angle |
| `cam.read(1)[4]` | Near width % |
| `cam.read(1)[5]` | Junction×10+Flags |
| `cam.read(1)[6]` | Junction distance % |
| `cam.read(1)[7]` | Marker color |
| `cam.read(2)[0]` | Left edge |
| `cam.read(2)[1]` | Right edge |
| `cam.read(2)[2]` | Far width % |
| `cam.read(2)[3]` | Marker count |

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

Read codes and positions for the first 5 objects, plus the total count.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Code1 |
| `cam.read(1)[1]` | P1 |
| `cam.read(1)[2]` | Code2 |
| `cam.read(1)[3]` | P2 |
| `cam.read(1)[4]` | Code3 |
| `cam.read(1)[5]` | P3 |
| `cam.read(1)[6]` | Code4 |
| `cam.read(1)[7]` | P4 |
| `cam.read(2)[0]` | Code5 |
| `cam.read(2)[1]` | P5 |
| `cam.read(2)[3]` | Total |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

Read detailed data for the first 2 objects using the fields below.

| Pybricks Python | Reading |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Code1 |
| `cam.read(1)[1]` | P1 |
| `cam.read(1)[2]` | Area1 |
| `cam.read(1)[3]` | floor((Angle1+1)÷2) |
| `cam.read(1)[4]` | Code2 |
| `cam.read(1)[5]` | P2 |
| `cam.read(1)[6]` | Area2 |
| `cam.read(1)[7]` | floor((Angle2+1)÷2) |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

Double the angle field and cap it at 179°, with an error of about 1°.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Read target 1 position and area

Teach target color 1 and set the camera to mode 13 (Color Tracking - ③ Standard).

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

### ✔ Read two objects in Object Details mode

Select camera modeID 52. This program calls cam.read(1) once per loop, with four slots per object.

```python
#!/usr/bin/env pybricks-micropython
from pybricks.iodevices import LUMPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = LUMPDevice(Port.S1)
if cam.read(0)[0] != 52:
    raise RuntimeError("Select Object Details (52)")

while True:
    values = cam.read(1)
    for index in range(2):
        start = index * 4
        code, position, area, half_angle = values[start:start + 4]
        if code == 0:
            print(index + 1, "No object")
            continue
        color, shape = divmod(code, 10)
        x, y = divmod(position, 10)
        angle = min(179, half_angle * 2)
        print(index + 1, color, shape, x, y, area, angle)
    wait(100)
```

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
