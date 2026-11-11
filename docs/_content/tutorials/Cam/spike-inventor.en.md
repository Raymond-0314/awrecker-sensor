# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® MINDSTORMS® Robot Inventor |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE edition) |
| Programming environment | LEGO MINDSTORMS Inventor App / SPIKE App (Home) |

### ✔ Before you begin

1. Start your robot and open LEGO MINDSTORMS Inventor App / SPIKE App (Home).
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Functions and data

::: info ℹ️ Note
The Home app treats UniCam as a Color Sensor. The tables below describe its Color, Reflection, and Raw RGB blocks, mainly using an 8×6 position grid. Home Python switches to the Education layout and requires different decoding.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

Read positions for up to 4 targets.

| Block field | Reading |
| --- | --- |
| Color | X1 |
| Reflection | Y1 |
| Raw red | X2×10+Y2 |
| Raw green | X3×10+Y3 |
| Raw blue | X4×10+Y4 |

Positions and sizes use an 8×6 grid. P = X×10+Y, with Y increasing downward. Zero means no target.

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

Read positions for up to 4 targets.

| Block field | Reading |
| --- | --- |
| Color | X1 |
| Reflection | Y1 |
| Raw red | X2×10+Y2 |
| Raw green | X3×10+Y3 |
| Raw blue | X4×10+Y4 |

Positions and sizes use an 8×6 grid. P = X×10+Y, with Y increasing downward. Zero means no target.

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

Read positions for up to 4 targets.

| Block field | Reading |
| --- | --- |
| Color | X1 |
| Reflection | Y1 |
| Raw red | X2×10+Y2 |
| Raw green | X3×10+Y3 |
| Raw blue | X4×10+Y4 |

Positions and sizes use an 8×6 grid. P = X×10+Y, with Y increasing downward. Zero means no target.

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

Read positions and sizes for up to 2 targets.

| Block field | Reading |
| --- | --- |
| Color | X1 |
| Reflection | Y1 |
| Raw red | X2×10+Y2 |
| Raw green | W1×10+H1 |
| Raw blue | W2×10+H2 |

Positions and sizes use an 8×6 grid. P = X×10+Y, with Y increasing downward. Zero means no target.

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

Read hue for up to 4 sample points, at the precision described below.

| Block field | Reading |
| --- | --- |
| Color | 0 |
| Reflection | floor((Hue4+1)÷2) |
| Raw red | Hue1 |
| Raw green | Hue2 |
| Raw blue | Hue3 |

The fourth hue is transmitted divided by 2. Multiply the reading by 2 for an approximate hue.

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

Read hue and saturation for up to 2 sample points, at the precision described below.

| Block field | Reading |
| --- | --- |
| Color | 0 |
| Reflection | Sat2 |
| Raw red | Hue1 |
| Raw green | Sat1 |
| Raw blue | Hue2 |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

Read hue, saturation, and brightness for up to 2 sample points, at the precision described below.

| Block field | Reading |
| --- | --- |
| Color | 0 |
| Reflection | floor(Sat2÷10)×10+floor(Val2÷10) |
| Raw red | Hue1 |
| Raw green | floor(Sat1÷10)×10+floor(Val1÷10) |
| Raw blue | Hue2 |

Saturation and brightness are packed as their tens digits. Split the reading by 10, then multiply each part by 10 for approximate values.

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

Read the first 3 hues from left to right and the total block count.

| Block field | Reading |
| --- | --- |
| Color | 0 |
| Reflection | Total |
| Raw red | Hue1 |
| Raw green | Hue2 |
| Raw blue | Hue3 |

Hue 0 can represent red. Use the total block count to identify valid entries.

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

Blocks provide junction, near width, near offset, far offset, and angle: five values.

| Block field | Reading |
| --- | --- |
| Color | Junction |
| Reflection | Near width % |
| Raw red | Near offset+100 |
| Raw green | Far offset+100 |
| Raw blue | Angle+100 |

Subtract 100 from the near offset, far offset, and angle readings to restore signed values.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

Blocks provide junction, near width, near offset, far offset, and angle: five values.

| Block field | Reading |
| --- | --- |
| Color | Junction |
| Reflection | Near width % |
| Raw red | Near offset+100 |
| Raw green | Far offset+100 |
| Raw blue | Angle+100 |

Subtract 100 from the near offset, far offset, and angle readings to restore signed values.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

Blocks provide junction, near width, near offset, far offset, and angle: five values.

| Block field | Reading |
| --- | --- |
| Color | Junction |
| Reflection | Near width % |
| Raw red | Near offset+100 |
| Raw green | Far offset+100 |
| Raw blue | Angle+100 |

Subtract 100 from the near offset, far offset, and angle readings to restore signed values.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

Read codes and positions for the first 2 objects, plus the total count.

| Block field | Reading |
| --- | --- |
| Color | Total |
| Reflection | Code1 |
| Raw red | P1 |
| Raw green | Code2 |
| Raw blue | P2 |

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

Read detailed data for the first 1 objects using the fields below.

| Block field | Reading |
| --- | --- |
| Color | Total |
| Reflection | Code1 |
| Raw red | X1 |
| Raw green | Y1 |
| Raw blue | Area1 |

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Read target 2 with Home app blocks

Use the Robot Inventor hub and Home app, with the camera on port C. Teach target colors 1 and 2 on the camera and select Mode ID 13 (Color tracking - ③ Standard).

1. Add a forever loop. Read the Color Sensor Raw red value on port C and store it as position.
2. Use math blocks to calculate X = floor(position/10) and Y = position modulo 10.
3. Display “No target” when position = 0. Otherwise display X and Y. For example, 63 means X = 6 and Y = 3.
4. Wait 0.1 seconds and repeat. Move the target to check that X increases rightward and Y downward. The reading should return to 0 when the target leaves the image.

Split Home block Raw red positions in base 10. If you switch to Home Python device.get(), use the Education field layout in the [SPIKE App lesson](./spike-app.md).

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
