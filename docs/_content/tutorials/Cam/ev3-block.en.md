# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® MINDSTORMS® EV3 |
| Sensor | MBC UniCam Vision Camera Sensor (EV3 edition) |
| Programming environment | Pybricks Blocks |

### ✔ Before you begin

1. Start your robot and open Pybricks Blocks.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

::: warning ⚠️ Block readout support
Check that your Pybricks EV3 blocks expose numeric beacon readings. The tables show raw camera fields. See the [Pybricks Python lesson](./ev3-python.md) for full raw readings.
:::

## 02 / Functions and data

::: info ℹ️ Note
UniCam appears as an Infrared Sensor. Proximity (0) reports camera Mode ID; Beacon (1) has eight slots and Remote (2) has four. Select the camera mode on the camera. The EV3 connection reads data only.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

Read positions for up to 12 targets.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | P1 |
| Beacon (1) channel 1 distance | P2 |
| Beacon (1) channel 2 heading | P3 |
| Beacon (1) channel 2 distance | P4 |
| Beacon (1) channel 3 heading | P5 |
| Beacon (1) channel 3 distance | P6 |
| Beacon (1) channel 4 heading | P7 |
| Beacon (1) channel 4 distance | P8 |
| Remote (2) channel 1 | P9 |
| Remote (2) channel 2 | P10 |
| Remote (2) channel 3 | P11 |
| Remote (2) channel 4 | P12 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

Read positions for up to 8 targets.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | P1 |
| Beacon (1) channel 1 distance | P2 |
| Beacon (1) channel 2 heading | P3 |
| Beacon (1) channel 2 distance | P4 |
| Beacon (1) channel 3 heading | P5 |
| Beacon (1) channel 3 distance | P6 |
| Beacon (1) channel 4 heading | P7 |
| Beacon (1) channel 4 distance | P8 |
| Remote (2) channel 1 | 0 |
| Remote (2) channel 2 | 0 |
| Remote (2) channel 3 | 0 |
| Remote (2) channel 4 | 0 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

Read positions for up to 4 targets and areas.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | P1 |
| Beacon (1) channel 1 distance | Area1 |
| Beacon (1) channel 2 heading | P2 |
| Beacon (1) channel 2 distance | Area2 |
| Beacon (1) channel 3 heading | P3 |
| Beacon (1) channel 3 distance | Area3 |
| Beacon (1) channel 4 heading | P4 |
| Beacon (1) channel 4 distance | Area4 |
| Remote (2) channel 1 | 0 |
| Remote (2) channel 2 | 0 |
| Remote (2) channel 3 | 0 |
| Remote (2) channel 4 | 0 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

Read positions and sizes for up to 2 targets, with counts available and areas.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | P1 |
| Beacon (1) channel 1 distance | W1×10+H1 |
| Beacon (1) channel 2 heading | Count1 |
| Beacon (1) channel 2 distance | Area1 |
| Beacon (1) channel 3 heading | P2 |
| Beacon (1) channel 3 distance | W2×10+H2 |
| Beacon (1) channel 4 heading | Count2 |
| Beacon (1) channel 4 distance | Area2 |
| Remote (2) channel 1 | 0 |
| Remote (2) channel 2 | 0 |
| Remote (2) channel 3 | 0 |
| Remote (2) channel 4 | 0 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

Read hue for up to 12 sample points, at the precision described below.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | Hue1 (EV3) |
| Beacon (1) channel 1 distance | Hue2 (EV3) |
| Beacon (1) channel 2 heading | Hue3 (EV3) |
| Beacon (1) channel 2 distance | Hue4 (EV3) |
| Beacon (1) channel 3 heading | Hue5 (EV3) |
| Beacon (1) channel 3 distance | Hue6 (EV3) |
| Beacon (1) channel 4 heading | Hue7 (EV3) |
| Beacon (1) channel 4 distance | Hue8 (EV3) |
| Remote (2) channel 1 | Hue9 (EV3) |
| Remote (2) channel 2 | Hue10 (EV3) |
| Remote (2) channel 3 | Hue11 (EV3) |
| Remote (2) channel 4 | Hue12 (EV3) |

Nonnegative Hue (EV3) values are 0–100; approximately recover hue as reading×240/100. −1 to −8 mean white to gray, and −9 to −15 mean black.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

Read hue and saturation for up to 4 sample points, at the precision described below.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | Hue1 (EV3) |
| Beacon (1) channel 1 distance | floor(Sat1÷10)×10+floor(Val1÷10) |
| Beacon (1) channel 2 heading | Hue2 (EV3) |
| Beacon (1) channel 2 distance | floor(Sat2÷10)×10+floor(Val2÷10) |
| Beacon (1) channel 3 heading | Hue3 (EV3) |
| Beacon (1) channel 3 distance | floor(Sat3÷10)×10+floor(Val3÷10) |
| Beacon (1) channel 4 heading | Hue4 (EV3) |
| Beacon (1) channel 4 distance | floor(Sat4÷10)×10+floor(Val4÷10) |
| Remote (2) channel 1 | 0 |
| Remote (2) channel 2 | 0 |
| Remote (2) channel 3 | 0 |
| Remote (2) channel 4 | 0 |

Saturation and brightness are packed as their tens digits. Split the reading by 10, then multiply each part by 10 for approximate values.

Nonnegative Hue (EV3) values are 0–100; approximately recover hue as reading×240/100. −1 to −8 mean white to gray, and −9 to −15 mean black.

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

Read hue, saturation, and brightness for up to 2 sample points, at the precision described below.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | floor(Hue1÷100) |
| Beacon (1) channel 1 distance | Hue1 % 100 |
| Beacon (1) channel 2 heading | Sat1 |
| Beacon (1) channel 2 distance | Val1 |
| Beacon (1) channel 3 heading | floor(Hue2÷100) |
| Beacon (1) channel 3 distance | Hue2 % 100 |
| Beacon (1) channel 4 heading | Sat2 |
| Beacon (1) channel 4 distance | Val2 |
| Remote (2) channel 1 | 0 |
| Remote (2) channel 2 | 0 |
| Remote (2) channel 3 | 0 |
| Remote (2) channel 4 | 0 |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

Read the first 11 hues from left to right and the total block count.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | Hue1 (EV3) |
| Beacon (1) channel 1 distance | Hue2 (EV3) |
| Beacon (1) channel 2 heading | Hue3 (EV3) |
| Beacon (1) channel 2 distance | Hue4 (EV3) |
| Beacon (1) channel 3 heading | Hue5 (EV3) |
| Beacon (1) channel 3 distance | Hue6 (EV3) |
| Beacon (1) channel 4 heading | Hue7 (EV3) |
| Beacon (1) channel 4 distance | Hue8 (EV3) |
| Remote (2) channel 1 | Hue9 (EV3) |
| Remote (2) channel 2 | Hue10 (EV3) |
| Remote (2) channel 3 | Hue11 (EV3) |
| Remote (2) channel 4 | Total |

Nonnegative Hue (EV3) values are 0–100; approximately recover hue as reading×240/100. −1 to −8 mean white to gray, and −9 to −15 mean black.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Hue 0 can represent red. Use the total block count to identify valid entries.

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

Beacon and Remote together provide 12 line-following values.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | Near offset |
| Beacon (1) channel 1 distance | Middle offset |
| Beacon (1) channel 2 heading | Far offset |
| Beacon (1) channel 2 distance | Angle |
| Beacon (1) channel 3 heading | Near width % |
| Beacon (1) channel 3 distance | Junction×10+Flags |
| Beacon (1) channel 4 heading | Junction distance % |
| Beacon (1) channel 4 distance | Marker color |
| Remote (2) channel 1 | Left edge |
| Remote (2) channel 2 | Right edge |
| Remote (2) channel 3 | Far width % |
| Remote (2) channel 4 | Marker count |

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

Beacon and Remote together provide 12 line-following values.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | Near offset |
| Beacon (1) channel 1 distance | Middle offset |
| Beacon (1) channel 2 heading | Far offset |
| Beacon (1) channel 2 distance | Angle |
| Beacon (1) channel 3 heading | Near width % |
| Beacon (1) channel 3 distance | Junction×10+Flags |
| Beacon (1) channel 4 heading | Junction distance % |
| Beacon (1) channel 4 distance | Marker color |
| Remote (2) channel 1 | Left edge |
| Remote (2) channel 2 | Right edge |
| Remote (2) channel 3 | Far width % |
| Remote (2) channel 4 | Marker count |

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

Beacon and Remote together provide 12 line-following values.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | Near offset |
| Beacon (1) channel 1 distance | Middle offset |
| Beacon (1) channel 2 heading | Far offset |
| Beacon (1) channel 2 distance | Angle |
| Beacon (1) channel 3 heading | Near width % |
| Beacon (1) channel 3 distance | Junction×10+Flags |
| Beacon (1) channel 4 heading | Junction distance % |
| Beacon (1) channel 4 distance | Marker color |
| Remote (2) channel 1 | Left edge |
| Remote (2) channel 2 | Right edge |
| Remote (2) channel 3 | Far width % |
| Remote (2) channel 4 | Marker count |

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

Read codes and positions for the first 5 objects, plus the total count.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | Code1 |
| Beacon (1) channel 1 distance | P1 |
| Beacon (1) channel 2 heading | Code2 |
| Beacon (1) channel 2 distance | P2 |
| Beacon (1) channel 3 heading | Code3 |
| Beacon (1) channel 3 distance | P3 |
| Beacon (1) channel 4 heading | Code4 |
| Beacon (1) channel 4 distance | P4 |
| Remote (2) channel 1 | Code5 |
| Remote (2) channel 2 | P5 |
| Remote (2) channel 3 | 0 |
| Remote (2) channel 4 | Total |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

Read detailed data for the first 2 objects using the fields below.

| Read position | Reading |
| --- | --- |
| Proximity (0) value | Mode ID |
| Beacon (1) channel 1 heading | Code1 |
| Beacon (1) channel 1 distance | P1 |
| Beacon (1) channel 2 heading | Area1 |
| Beacon (1) channel 2 distance | floor((Angle1+1)÷2) |
| Beacon (1) channel 3 heading | Code2 |
| Beacon (1) channel 3 distance | P2 |
| Beacon (1) channel 4 heading | Area2 |
| Beacon (1) channel 4 distance | floor((Angle2+1)÷2) |
| Remote (2) channel 1 | 0 |
| Remote (2) channel 2 | 0 |
| Remote (2) channel 3 | 0 |
| Remote (2) channel 4 | 0 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

Double the angle field and cap it at 179°, with an error of about 1°.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Read target 1 position and area

Teach target color 1 and set the camera to mode 13 (Color Tracking - ③ Standard).

1. Read proximity once at startup and check for 13.
2. In the loop, read Beacon channel 1. Store heading as position and distance as area.
3. If position is 0, display “No target”. Otherwise, split it with integer division and remainder, then display X, Y, and area. For example, 43 and 18 mean X=4, Y=3, area 18%.

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
