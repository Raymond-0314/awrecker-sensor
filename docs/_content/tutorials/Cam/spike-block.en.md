# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® Education SPIKE™ Prime Set<br>LEGO® MINDSTORMS® Robot Inventor |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE edition) |
| Programming environment | Pybricks Blocks |

### ✔ Before you begin

1. Start your robot and open Pybricks Blocks.
2. Check that the hub runs Pybricks firmware and that the camera is connected.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Functions and data

::: info ℹ️ Note
Use the built-in Color Sensor blocks. Store reflection and ambient readings in variables and decode them for the selected camera mode. Select that mode on the camera.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

Read positions for up to 2 targets.

| Block field | Reading |
| --- | --- |
| Reflection | X1×100+Y1 |
| Ambient light | X2 . Y2 |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

The reflection position uses a 40×30 grid. Add 6399 to a negative reading before splitting X and Y by 100. Ambient positions or sizes use an 8×6 grid. Y increases downward and position 0 means no target.

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

Read positions for up to 2 targets.

| Block field | Reading |
| --- | --- |
| Reflection | X1×100+Y1 |
| Ambient light | X2 . Y2 |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

The reflection position uses a 40×30 grid. Add 6399 to a negative reading before splitting X and Y by 100. Ambient positions or sizes use an 8×6 grid. Y increases downward and position 0 means no target.

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

Read positions for up to 2 targets.

| Block field | Reading |
| --- | --- |
| Reflection | X1×100+Y1 |
| Ambient light | X2 . Y2 |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

The reflection position uses a 40×30 grid. Add 6399 to a negative reading before splitting X and Y by 100. Ambient positions or sizes use an 8×6 grid. Y increases downward and position 0 means no target.

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

Read positions and sizes for up to 1 targets.

| Block field | Reading |
| --- | --- |
| Reflection | X1×100+Y1 |
| Ambient light | W1 . H1 |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

The reflection position uses a 40×30 grid. Add 6399 to a negative reading before splitting X and Y by 100. Ambient positions or sizes use an 8×6 grid. Y increases downward and position 0 means no target.

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

Read hue for up to 2 sample points, at the precision described below.

| Block field | Reading |
| --- | --- |
| Reflection | Hue1×10+floor(Sat1÷10) |
| Ambient light | Hue2 . min(9,floor(Sat2÷10)) |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

Fields divided by 10 retain only tens information. Multiply by 10 for an approximate value, capped at 90.

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

Read hue and saturation for up to 2 sample points, at the precision described below.

| Block field | Reading |
| --- | --- |
| Reflection | Hue1×10+floor(Sat1÷10) |
| Ambient light | Hue2 . min(9,floor(Sat2÷10)) |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

Fields divided by 10 retain only tens information. Multiply by 10 for an approximate value, capped at 90.

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

Read hue, saturation, and brightness for up to 1 sample points, at the precision described below.

| Block field | Reading |
| --- | --- |
| Reflection | Hue1 |
| Ambient light | Sat1 . min(9,floor(Val1÷10)) |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

Fields divided by 10 retain only tens information. Multiply by 10 for an approximate value, capped at 90.

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

Read the first 2 hues from left to right and the total block count.

| Block field | Reading |
| --- | --- |
| Reflection | Hue1 |
| Ambient light | Hue2 . min(Total,9) |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

The count digit is capped at 9, meaning nine or more.

Hue 0 can represent red. Use the total block count to identify valid entries.

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

Read near and far offsets, junction type, and line flags: four values.

| Block field | Reading |
| --- | --- |
| Reflection | (Near offset+100)×10+Junction |
| Ambient light | Far offset+100 . Flags |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

Read near and far offsets, junction type, and line flags: four values.

| Block field | Reading |
| --- | --- |
| Reflection | (Near offset+100)×10+Junction |
| Ambient light | Far offset+100 . Flags |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

Read near and far offsets, junction type, and line flags: four values.

| Block field | Reading |
| --- | --- |
| Reflection | (Near offset+100)×10+Junction |
| Ambient light | Far offset+100 . Flags |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

Read codes and positions for the first 1 objects, plus the total count.

| Block field | Reading |
| --- | --- |
| Reflection | X1×100+Y1 |
| Ambient light | Code1 . min(Total,9) |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

The reflection position uses a 40×30 grid. Add 6399 to a negative reading before splitting X and Y by 100. Ambient positions or sizes use an 8×6 grid. Y increases downward and position 0 means no target.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

Read detailed data for the first 1 objects using the fields below.

| Block field | Reading |
| --- | --- |
| Reflection | X1×100+Y1 |
| Ambient light | Code1 . min(9,floor(Area1÷10)) |

reflection() is the reflected-light reporter and ambient() is ambient light. A . B denotes the integer part and first decimal digit. Decode A with floor(ambient) and B with round(ambient×10) % 10.

The reflection position uses a 40×30 grid. Add 6399 to a negative reading before splitting X and Y by 100. Ambient positions or sizes use an 8×6 grid. Y increases downward and position 0 means no target.

Fields divided by 10 retain only tens information. Multiply by 10 for an approximate value, capped at 90.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

Select camera mode 13 (Color Tracking - ③ Standard) and teach target colors 1 and 2. Create reflected, ambient, X1, Y1, X2, and Y2 variables. Add the following operations inside a forever loop.

| Step | Block operation |
| --- | --- |
| 1 | Set reflected to the reflected light reading and ambient to the ambient light reading. Read each once per loop. |
| 2 | If reflected < 0, increase reflected by 6399. |
| 3 | X1 = floor(reflected / 100). Y1 = the remainder after dividing reflected by 100. |
| 4 | X2 = floor(ambient). Y2 = round(ambient × 10) modulo 10. |
| 5 | If X1 or X2 is 0, display “No target” for that color. Otherwise display its X and Y. |
| 6 | Wait 0.1 seconds before the next iteration. |

For example, reflected = 2015 and ambient = 4.3 decode to target 1 grid position (20,15) and target 2 grid position (4,3). The grids have different resolutions: 40×30 for target 1 and 8×6 for target 2.

### ✔ Decode line-following readings

For camera modes 41, 42, and 43: near offset = floor(reflected / 10) − 100; junction = reflected modulo 10; far offset = floor(ambient) − 100; flags = round(ambient × 10) modulo 10. For example, 802 and 115.5 mean near offset −20, a T junction, far offset +15, and a line detected in the near and far rows.

### ✔ Further reading

For more targets, pixel positions, areas, or raw data, see the [Pybricks Python lesson](./spike-python.md), which includes the transport mode 9 field map and a complete program.

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
