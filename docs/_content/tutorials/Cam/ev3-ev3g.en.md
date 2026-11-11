# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® MINDSTORMS® EV3 |
| Sensor | MBC UniCam Vision Camera Sensor (EV3 edition) |
| Programming environment | EV3-G |

### ✔ Before you begin

1. Start your robot and open EV3-G.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Functions and data

::: info ℹ️ Note
In EV3-G, add an Infrared Sensor block on sensor port 1. Measure → Proximity reports camera Mode ID. Measure → Beacon provides Heading and Proximity outputs for the selected channel. Measure → Remote reads the selected channel. The tables use these EV3-G options.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

Read positions for up to 12 targets.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | P1 |
| Measure → Beacon (channel 1) → Proximity | P2 |
| Measure → Beacon (channel 2) → Heading | P3 |
| Measure → Beacon (channel 2) → Proximity | P4 |
| Measure → Beacon (channel 3) → Heading | P5 |
| Measure → Beacon (channel 3) → Proximity | P6 |
| Measure → Beacon (channel 4) → Heading | P7 |
| Measure → Beacon (channel 4) → Proximity | P8 |
| Measure → Remote (channel 1) | P9 |
| Measure → Remote (channel 2) | P10 |
| Measure → Remote (channel 3) | P11 |
| Measure → Remote (channel 4) | P12 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

Read positions for up to 8 targets.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | P1 |
| Measure → Beacon (channel 1) → Proximity | P2 |
| Measure → Beacon (channel 2) → Heading | P3 |
| Measure → Beacon (channel 2) → Proximity | P4 |
| Measure → Beacon (channel 3) → Heading | P5 |
| Measure → Beacon (channel 3) → Proximity | P6 |
| Measure → Beacon (channel 4) → Heading | P7 |
| Measure → Beacon (channel 4) → Proximity | P8 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

Read positions for up to 4 targets and areas.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | P1 |
| Measure → Beacon (channel 1) → Proximity | Area1 |
| Measure → Beacon (channel 2) → Heading | P2 |
| Measure → Beacon (channel 2) → Proximity | Area2 |
| Measure → Beacon (channel 3) → Heading | P3 |
| Measure → Beacon (channel 3) → Proximity | Area3 |
| Measure → Beacon (channel 4) → Heading | P4 |
| Measure → Beacon (channel 4) → Proximity | Area4 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

Read positions and sizes for up to 2 targets, with counts available and areas.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | P1 |
| Measure → Beacon (channel 1) → Proximity | W1×10+H1 |
| Measure → Beacon (channel 2) → Heading | Count1 |
| Measure → Beacon (channel 2) → Proximity | Area1 |
| Measure → Beacon (channel 3) → Heading | P2 |
| Measure → Beacon (channel 3) → Proximity | W2×10+H2 |
| Measure → Beacon (channel 4) → Heading | Count2 |
| Measure → Beacon (channel 4) → Proximity | Area2 |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

Read hue for up to 12 sample points, at the precision described below.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | Hue1 (EV3) |
| Measure → Beacon (channel 1) → Proximity | Hue2 (EV3) |
| Measure → Beacon (channel 2) → Heading | Hue3 (EV3) |
| Measure → Beacon (channel 2) → Proximity | Hue4 (EV3) |
| Measure → Beacon (channel 3) → Heading | Hue5 (EV3) |
| Measure → Beacon (channel 3) → Proximity | Hue6 (EV3) |
| Measure → Beacon (channel 4) → Heading | Hue7 (EV3) |
| Measure → Beacon (channel 4) → Proximity | Hue8 (EV3) |
| Measure → Remote (channel 1) | Hue9 (EV3) |
| Measure → Remote (channel 2) | Hue10 (EV3) |
| Measure → Remote (channel 3) | Hue11 (EV3) |
| Measure → Remote (channel 4) | Hue12 (EV3) |

Nonnegative Hue (EV3) values are 0–100; approximately recover hue as reading×240/100. −1 to −8 mean white to gray, and −9 to −15 mean black.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

Read hue and saturation for up to 4 sample points, at the precision described below.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | Hue1 (EV3) |
| Measure → Beacon (channel 1) → Proximity | floor(Sat1÷10)×10+floor(Val1÷10) |
| Measure → Beacon (channel 2) → Heading | Hue2 (EV3) |
| Measure → Beacon (channel 2) → Proximity | floor(Sat2÷10)×10+floor(Val2÷10) |
| Measure → Beacon (channel 3) → Heading | Hue3 (EV3) |
| Measure → Beacon (channel 3) → Proximity | floor(Sat3÷10)×10+floor(Val3÷10) |
| Measure → Beacon (channel 4) → Heading | Hue4 (EV3) |
| Measure → Beacon (channel 4) → Proximity | floor(Sat4÷10)×10+floor(Val4÷10) |

Saturation and brightness are packed as their tens digits. Split the reading by 10, then multiply each part by 10 for approximate values.

Nonnegative Hue (EV3) values are 0–100; approximately recover hue as reading×240/100. −1 to −8 mean white to gray, and −9 to −15 mean black.

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

Read hue, saturation, and brightness for up to 2 sample points, at the precision described below.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | floor(Hue1÷100) |
| Measure → Beacon (channel 1) → Proximity | Hue1 % 100 |
| Measure → Beacon (channel 2) → Heading | Sat1 |
| Measure → Beacon (channel 2) → Proximity | Val1 |
| Measure → Beacon (channel 3) → Heading | floor(Hue2÷100) |
| Measure → Beacon (channel 3) → Proximity | Hue2 % 100 |
| Measure → Beacon (channel 4) → Heading | Sat2 |
| Measure → Beacon (channel 4) → Proximity | Val2 |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

Read the first 11 hues from left to right and the total block count.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | Hue1 (EV3) |
| Measure → Beacon (channel 1) → Proximity | Hue2 (EV3) |
| Measure → Beacon (channel 2) → Heading | Hue3 (EV3) |
| Measure → Beacon (channel 2) → Proximity | Hue4 (EV3) |
| Measure → Beacon (channel 3) → Heading | Hue5 (EV3) |
| Measure → Beacon (channel 3) → Proximity | Hue6 (EV3) |
| Measure → Beacon (channel 4) → Heading | Hue7 (EV3) |
| Measure → Beacon (channel 4) → Proximity | Hue8 (EV3) |
| Measure → Remote (channel 1) | Hue9 (EV3) |
| Measure → Remote (channel 2) | Hue10 (EV3) |
| Measure → Remote (channel 3) | Hue11 (EV3) |
| Measure → Remote (channel 4) | Total |

Nonnegative Hue (EV3) values are 0–100; approximately recover hue as reading×240/100. −1 to −8 mean white to gray, and −9 to −15 mean black.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Hue 0 can represent red. Use the total block count to identify valid entries.

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

Beacon and Remote together provide 12 line-following values.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | Near offset |
| Measure → Beacon (channel 1) → Proximity | Middle offset |
| Measure → Beacon (channel 2) → Heading | Far offset |
| Measure → Beacon (channel 2) → Proximity | Angle |
| Measure → Beacon (channel 3) → Heading | Near width % |
| Measure → Beacon (channel 3) → Proximity | Junction×10+Flags |
| Measure → Beacon (channel 4) → Heading | Junction distance % |
| Measure → Beacon (channel 4) → Proximity | Marker color |
| Measure → Remote (channel 1) | Left edge |
| Measure → Remote (channel 2) | Right edge |
| Measure → Remote (channel 3) | Far width % |
| Measure → Remote (channel 4) | Marker count |

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

Beacon and Remote together provide 12 line-following values.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | Near offset |
| Measure → Beacon (channel 1) → Proximity | Middle offset |
| Measure → Beacon (channel 2) → Heading | Far offset |
| Measure → Beacon (channel 2) → Proximity | Angle |
| Measure → Beacon (channel 3) → Heading | Near width % |
| Measure → Beacon (channel 3) → Proximity | Junction×10+Flags |
| Measure → Beacon (channel 4) → Heading | Junction distance % |
| Measure → Beacon (channel 4) → Proximity | Marker color |
| Measure → Remote (channel 1) | Left edge |
| Measure → Remote (channel 2) | Right edge |
| Measure → Remote (channel 3) | Far width % |
| Measure → Remote (channel 4) | Marker count |

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

Beacon and Remote together provide 12 line-following values.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | Near offset |
| Measure → Beacon (channel 1) → Proximity | Middle offset |
| Measure → Beacon (channel 2) → Heading | Far offset |
| Measure → Beacon (channel 2) → Proximity | Angle |
| Measure → Beacon (channel 3) → Heading | Near width % |
| Measure → Beacon (channel 3) → Proximity | Junction×10+Flags |
| Measure → Beacon (channel 4) → Heading | Junction distance % |
| Measure → Beacon (channel 4) → Proximity | Marker color |
| Measure → Remote (channel 1) | Left edge |
| Measure → Remote (channel 2) | Right edge |
| Measure → Remote (channel 3) | Far width % |
| Measure → Remote (channel 4) | Marker count |

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

Read codes and positions for the first 5 objects, plus the total count.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | Code1 |
| Measure → Beacon (channel 1) → Proximity | P1 |
| Measure → Beacon (channel 2) → Heading | Code2 |
| Measure → Beacon (channel 2) → Proximity | P2 |
| Measure → Beacon (channel 3) → Heading | Code3 |
| Measure → Beacon (channel 3) → Proximity | P3 |
| Measure → Beacon (channel 4) → Heading | Code4 |
| Measure → Beacon (channel 4) → Proximity | P4 |
| Measure → Remote (channel 1) | Code5 |
| Measure → Remote (channel 2) | P5 |
| Measure → Remote (channel 4) | Total |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

This mode uses both Beacon and Remote data. Switching EV3 read modes takes about 1.1 seconds. Choose the fields needed by your control loop.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

Read detailed data for the first 2 objects using the fields below.

| EV3-G block option | Reading |
| --- | --- |
| Measure → Proximity (port 1) | Mode ID |
| Measure → Beacon (channel 1) → Heading | Code1 |
| Measure → Beacon (channel 1) → Proximity | P1 |
| Measure → Beacon (channel 2) → Heading | Area1 |
| Measure → Beacon (channel 2) → Proximity | floor((Angle1+1)÷2) |
| Measure → Beacon (channel 3) → Heading | Code2 |
| Measure → Beacon (channel 3) → Proximity | P2 |
| Measure → Beacon (channel 4) → Heading | Area2 |
| Measure → Beacon (channel 4) → Proximity | floor((Angle2+1)÷2) |

P = X×10+Y. Positions and sizes use an 8×6 grid. EV3 Y increases upward, and position 0 means no target.

Double the angle field and cap it at 179°, with an error of about 1°.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Read target 1 position and area

Connect the camera to sensor port 1, teach target color 1, and select Mode ID 13 (Color tracking - ③ Standard) on the camera.

1. Add an Infrared Sensor block, select Measure → Proximity on port 1, and check for output 13.
2. Create position, area, X, and Y variables and add a forever loop.
3. Use Measure → Beacon on channel 1. Wire Heading to position and Proximity to area.
4. Display “No target” when position = 0. Otherwise use math blocks to calculate X = floor(position/10) and Y = position modulo 10.
5. Display X, Y, and area, wait 0.1 seconds, and repeat. For example, position = 43 and area = 18 mean column 4, row 3, and 18% area. EV3 Y = 1 is at the bottom.

Keep the loop on Beacon readings. Check Mode ID with Proximity once at startup to avoid switching infrared modes every iteration and adding about 1.1 seconds of delay.

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
