# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® Education SPIKE™ Prime Set<br>LEGO® MINDSTORMS® Robot Inventor |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE edition) |
| Programming environment | Pybricks Python |

### ✔ Before you begin

1. Start your robot and open Pybricks Python.
2. Check that the hub runs Pybricks firmware and that the camera is connected.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Functions and data

::: info ℹ️ Note
This lesson uses PUPDevice for raw readings. Select the camera mode on the camera, then use transport mode 9 for the main payload. Tracking modes 11 and 12 use transport mode 6 for counts.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

Read positions for up to 14 targets, with counts available.

| Read position | Reading |
| --- | --- |
| byte 0 | GridID1 |
| byte 1 | GridID2 |
| byte 2 | GridID3 |
| byte 3 | GridID4 |
| byte 4 | GridID5 |
| byte 5 | GridID6 |
| byte 6 | GridID7 |
| byte 7 | GridID8 |
| byte 8 | GridID9 |
| byte 9 | GridID10 |
| byte 10 | GridID11 |
| byte 11 | GridID12 |
| byte 12 | GridID13 |
| byte 13 | GridID14 |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

GridID uses a 16×12 grid. Zero means no target. Otherwise subtract 1, then take remainder modulo 16 plus 1 for X and quotient plus 1 for Y. Counts use transport mode 6: fourteen 3-bit counts followed by a 4-bit detected-color count in little-endian order. A count of 7 means seven or more.

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

Read positions for up to 7 targets, with counts available.

| Read position | Reading |
| --- | --- |
| byte 0 | X1 |
| byte 1 | Y1 |
| byte 2 | X2 |
| byte 3 | Y2 |
| byte 4 | X3 |
| byte 5 | Y3 |
| byte 6 | X4 |
| byte 7 | Y4 |
| byte 8 | X5 |
| byte 9 | Y5 |
| byte 10 | X6 |
| byte 11 | Y6 |
| byte 12 | X7 |
| byte 13 | Y7 |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

Read counts through transport mode 6. High and low nibbles of its first four bytes hold counts for targets 1–7 and the detected-color count, in order.

Coordinates use 160×120 pixels, with X increasing rightward and Y downward. X = 0 means no target.

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

Read positions for up to 4 targets, with counts available and areas.

| Read position | Reading |
| --- | --- |
| byte 0 | X1 |
| byte 1 | Y1 |
| byte 2 | Area1 |
| byte 3 | X2 |
| byte 4 | Y2 |
| byte 5 | Area2 |
| byte 6 | X3 |
| byte 7 | Y3 |
| byte 8 | Area3 |
| byte 9 | X4 |
| byte 10 | Y4 |
| byte 11 | Area4 |
| byte 12 | Count1×16+Count2 |
| byte 13 | Count3×16+Count4 |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

Coordinates use 160×120 pixels, with X increasing rightward and Y downward. X = 0 means no target.

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

Read positions and sizes for up to 2 targets, with counts available and areas.

| Read position | Reading |
| --- | --- |
| byte 0 | X1 |
| byte 1 | Y1 |
| byte 2 | W1 |
| byte 3 | H1 |
| byte 4 | Count1 |
| byte 5 | Area1 |
| byte 6 | X2 |
| byte 7 | Y2 |
| byte 8 | W2 |
| byte 9 | H2 |
| byte 10 | Count2 |
| byte 11 | Area2 |
| byte 12 | Found colors |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

Coordinates use 160×120 pixels, with X increasing rightward and Y downward. X = 0 means no target.

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

Read hue for up to 14 sample points, at the precision described below.

| Read position | Reading |
| --- | --- |
| byte 0 | Hue1 |
| byte 1 | Hue2 |
| byte 2 | Hue3 |
| byte 3 | Hue4 |
| byte 4 | Hue5 |
| byte 5 | Hue6 |
| byte 6 | Hue7 |
| byte 7 | Hue8 |
| byte 8 | Hue9 |
| byte 9 | Hue10 |
| byte 10 | Hue11 |
| byte 11 | Hue12 |
| byte 12 | Hue13 |
| byte 13 | Hue14 |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

Read hue and saturation for up to 7 sample points, at the precision described below.

| Read position | Reading |
| --- | --- |
| byte 0 | Hue1 |
| byte 1 | Sat1 |
| byte 2 | Hue2 |
| byte 3 | Sat2 |
| byte 4 | Hue3 |
| byte 5 | Sat3 |
| byte 6 | Hue4 |
| byte 7 | Sat4 |
| byte 8 | Hue5 |
| byte 9 | Sat5 |
| byte 10 | Hue6 |
| byte 11 | Sat6 |
| byte 12 | Hue7 |
| byte 13 | Sat7 |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

Read hue, saturation, and brightness for up to 4 sample points, at the precision described below.

| Read position | Reading |
| --- | --- |
| byte 0 | Hue1 |
| byte 1 | Sat1 |
| byte 2 | Val1 |
| byte 3 | Hue2 |
| byte 4 | Sat2 |
| byte 5 | Val2 |
| byte 6 | Hue3 |
| byte 7 | Sat3 |
| byte 8 | Val3 |
| byte 9 | Hue4 |
| byte 10 | Sat4 |
| byte 11 | Val4 |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

Read the first 13 hues from left to right and the total block count.

| Read position | Reading |
| --- | --- |
| byte 0 | Hue1 |
| byte 1 | Hue2 |
| byte 2 | Hue3 |
| byte 3 | Hue4 |
| byte 4 | Hue5 |
| byte 5 | Hue6 |
| byte 6 | Hue7 |
| byte 7 | Hue8 |
| byte 8 | Hue9 |
| byte 9 | Hue10 |
| byte 10 | Hue11 |
| byte 11 | Hue12 |
| byte 12 | Hue13 |
| byte 13 | Total |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

Hue 0 can represent red. Use the total block count to identify valid entries.

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

Read 14 line-following values including three offsets, junctions, and markers.

| Read position | Reading |
| --- | --- |
| byte 0 | Near offset |
| byte 1 | Middle offset |
| byte 2 | Far offset |
| byte 3 | Angle |
| byte 4 | Near width % |
| byte 5 | Flags |
| byte 6 | Junction |
| byte 7 | Junction distance % |
| byte 8 | Left edge |
| byte 9 | Right edge |
| byte 10 | Far width % |
| byte 11 | Marker color |
| byte 12 | Marker count |
| byte 13 | Lost direction |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

Offsets, angle, and edges are signed bytes. Subtract 256 from raw values ≥128.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

Read 14 line-following values including three offsets, junctions, and markers.

| Read position | Reading |
| --- | --- |
| byte 0 | Near offset |
| byte 1 | Middle offset |
| byte 2 | Far offset |
| byte 3 | Angle |
| byte 4 | Near width % |
| byte 5 | Flags |
| byte 6 | Junction |
| byte 7 | Junction distance % |
| byte 8 | Left edge |
| byte 9 | Right edge |
| byte 10 | Far width % |
| byte 11 | Marker color |
| byte 12 | Marker count |
| byte 13 | Lost direction |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

Offsets, angle, and edges are signed bytes. Subtract 256 from raw values ≥128.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

Read 14 line-following values including three offsets, junctions, and markers.

| Read position | Reading |
| --- | --- |
| byte 0 | Near offset |
| byte 1 | Middle offset |
| byte 2 | Far offset |
| byte 3 | Angle |
| byte 4 | Near width % |
| byte 5 | Flags |
| byte 6 | Junction |
| byte 7 | Junction distance % |
| byte 8 | Left edge |
| byte 9 | Right edge |
| byte 10 | Far width % |
| byte 11 | Marker color |
| byte 12 | Marker count |
| byte 13 | Lost direction |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

Offsets, angle, and edges are signed bytes. Subtract 256 from raw values ≥128.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

Read codes and positions for the first 4 objects, plus the total count.

| Read position | Reading |
| --- | --- |
| byte 0 | Total |
| byte 1 | Code1 |
| byte 2 | X1 |
| byte 3 | Y1 |
| byte 4 | Code2 |
| byte 5 | X2 |
| byte 6 | Y2 |
| byte 7 | Code3 |
| byte 8 | X3 |
| byte 9 | Y3 |
| byte 10 | Code4 |
| byte 11 | X4 |
| byte 12 | Y4 |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

Coordinates use 160×120 pixels, with X increasing rightward and Y downward. X = 0 means no target.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

Read detailed data for the first 2 objects using the fields below.

| Read position | Reading |
| --- | --- |
| byte 0 | Color1 |
| byte 1 | Shape1 |
| byte 2 | X1 |
| byte 3 | Y1 |
| byte 4 | W1 |
| byte 5 | H1 |
| byte 6 | Area1 |
| byte 7 | Color2 |
| byte 8 | Shape2 |
| byte 9 | X2 |
| byte 10 | Y2 |
| byte 11 | W2 |
| byte 12 | H2 |
| byte 13 | Area2 |

Transport mode 9 returns seven int16 values. Split each into low and high bytes, then read the fields in the table.

Coordinates use 160×120 pixels, with X increasing rightward and Y downward. X = 0 means no target.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Basic control

Select Color Tracking - ③ Standard and display the grid coordinates for targets 1 and 2.

```python
from pybricks.parameters import Port
from pybricks.pupdevices import ColorSensor
from pybricks.tools import wait

cam = ColorSensor(Port.C)

while True:
    reflected = int(cam.reflection())
    if reflected < 0:
        reflected += 6399
    x1, y1 = divmod(reflected, 100)

    ambient = cam.ambient()
    x2 = int(ambient)
    y2 = round(ambient * 10) % 10
    print((x1, y1), (x2, y2))
    wait(100)
```

### ✔ Advanced control

Select camera mode 13. This example prints target 1 X, Y, area, and blob count.

```python
from pybricks.iodevices import PUPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = PUPDevice(Port.C)

def read_payload():
    data = []
    for word in cam.read(9):
        data.extend((word & 255, (word >> 8) & 255))
    return data

while True:
    data = read_payload()
    x, y, area = data[:3]
    if x:
        print(x, y, area, data[12] >> 4)
    else:
        print("No target")
    wait(100)
```

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
