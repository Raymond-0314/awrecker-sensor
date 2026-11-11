# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® Education SPIKE™ Prime Set |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE edition) |
| Programming environment | LEGO Education SPIKE 3 App |

### ✔ Before you begin

1. Start your robot and open LEGO Education SPIKE 3 App.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Functions and data

::: info ℹ️ Note
The official app shows UniCam as a Color Sensor. Use numeric reporter blocks under More Sensors. Select the camera mode on the camera.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

7 positions in blocks, 13 positions accessible in Python

| Block field | Reading |
| --- | --- |
| Color | Found colors |
| Reflection | P1 |
| Raw Red | P2×100+P3 |
| Raw Green | P4×100+P5 |
| Raw Blue | P6×100+P7 |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

7 positions in blocks, with counts in extra fields

| Block field | Reading |
| --- | --- |
| Color | Found colors |
| Reflection | P1 |
| Raw Red | P2×100+P3 |
| Raw Green | P4×100+P5 |
| Raw Blue | P6×100+P7 |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

4 positions in blocks, with areas in extra fields

| Block field | Reading |
| --- | --- |
| Color | X1 |
| Reflection | Y1 |
| Raw Red | X2+Y2×256 |
| Raw Green | X3+Y3×256 |
| Raw Blue | X4+Y4×256 |

In this mode, Education uses 16×12 grid coordinates and sizes; Home uses 8×6. Y increases downward.

::: warning ⚠️ Important
The Education Color block converts the camera’s `5` to `6`, so the block cannot distinguish them. In Education Python, use `device.data(port.C)[0]` for the raw value.
:::

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

2 positions and sizes. Raw green and blue carry sizes for targets 1 and 2.

| Block field | Reading |
| --- | --- |
| Color | X1 |
| Reflection | Y1 |
| Raw Red | X2+Y2×256 |
| Raw Green | W1+H1×256 |
| Raw Blue | W2+H2×256 |

In this mode, Education uses 16×12 grid coordinates and sizes; Home uses 8×6. Y increases downward.

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

Raw red, green, and blue carry two hues each, for 6 points

| Block field | Reading |
| --- | --- |
| Color | 0 |
| Reflection | 0 |
| Raw Red | Hue1+Hue2×256 |
| Raw Green | Hue3+Hue4×256 |
| Raw Blue | Hue5+Hue6×256 |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

Raw RGB carry H + S×256 for S1–S3

| Block field | Reading |
| --- | --- |
| Color | 0 |
| Reflection | Sat4 |
| Raw Red | Hue1+Sat1×256 |
| Raw Green | Hue2+Sat2×256 |
| Raw Blue | Hue3+Sat3×256 |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

Raw RGB as above, reflected light is S1 brightness

| Block field | Reading |
| --- | --- |
| Color | 0 |
| Reflection | Val1 |
| Raw Red | Hue1+Sat1×256 |
| Raw Green | Hue2+Sat2×256 |
| Raw Blue | Hue3+Sat3×256 |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

Color gives total. Each raw RGB field packs two hues.

| Block field | Reading |
| --- | --- |
| Color | Total |
| Reflection | 0 |
| Raw Red | Hue1+Hue2×256 |
| Raw Green | Hue3+Hue4×256 |
| Raw Blue | Hue5+Hue6×256 |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

Color gives junction, reflection gives near width, and raw RGB give near offset, far offset, and angle, each offset by 100

| Block field | Reading |
| --- | --- |
| Color | Junction |
| Reflection | Near width % |
| Raw Red | Near offset+100 |
| Raw Green | Far offset+100 |
| Raw Blue | Angle+100 |

Offsets run from −100 to 100 with negative values to the left. Angle is −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junctions 0–5 mean none, cross, T, left, right, and end. Teach target color 1 before using Colored Line mode.

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

Color gives junction, reflection gives near width, and raw RGB give near offset, far offset, and angle, each offset by 100

| Block field | Reading |
| --- | --- |
| Color | Junction |
| Reflection | Near width % |
| Raw Red | Near offset+100 |
| Raw Green | Far offset+100 |
| Raw Blue | Angle+100 |

Offsets run from −100 to 100 with negative values to the left. Angle is −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junctions 0–5 mean none, cross, T, left, right, and end. Teach target color 1 before using Colored Line mode.

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

Color gives junction, reflection gives near width, and raw RGB give near offset, far offset, and angle, each offset by 100

| Block field | Reading |
| --- | --- |
| Color | Junction |
| Reflection | Near width % |
| Raw Red | Near offset+100 |
| Raw Green | Far offset+100 |
| Raw Blue | Angle+100 |

Offsets run from −100 to 100 with negative values to the left. Angle is −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junctions 0–5 mean none, cross, T, left, right, and end. Teach target color 1 before using Colored Line mode.

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

First 3 objects in blocks, additional fields in Python

| Block field | Reading |
| --- | --- |
| Color | Total |
| Reflection | Code1 |
| Raw Red | P1 |
| Raw Green | Code2×100+P2 |
| Raw Blue | Code3×100+P3 |

Detection uses target colors 1–8. Objects are sorted largest first and positions are centroids. Shape codes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid. Code 0 means no object.

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

Object 1 position and size, plus object 2 code and area in blocks

| Block field | Reading |
| --- | --- |
| Color | Code1 |
| Reflection | Area1 % |
| Raw Red | X1+Y1×256 |
| Raw Green | W1+H1×256 |
| Raw Blue | Code2+Area2×256 |

Detection uses target colors 1–8. Objects are sorted largest first and positions are centroids. Shape codes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid. Code 0 means no object.

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Read target 2 position

1. Teach two different colors as targets 1 and 2. Confirm target 2 appears in the camera preview.
2. In a loop, read Raw red once, store it in a variable, and decode X and Y using the table.
3. Display X and Y. Move target 2 sideways and check that X changes. Move it out of frame and confirm X returns to 0.

*[Image placeholder — complete Raw red, coordinate decoding, and display blocks]*

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
