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

::: info ℹ️ Reading notes
- Use the built-in Color Sensor blocks. Store reflection and ambient readings in variables and decode them for the selected camera mode. Select that mode on the camera.
- Here ÷ means integer division and mod means remainder. Ambient readings retain one decimal place: use floor(reading) for the integer and round(reading × 10) % 10 for the digit.
- Area, saturation, value, line width and junction distance are percentages. Their range labels omit the percent sign.
:::

::: warning ⚠️ Note
- Only one camera submode is active at a time. Make sure its Mode ID matches the program.
- Modes reuse the same read expressions; decode their results using the table for the selected mode.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`Pybricks blocks provides: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Pybricks blocks provides: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Pybricks blocks provides: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Pybricks blocks provides: 1 color positions and sizes`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Color 1 W and Color 1 H | `0 ~ 8.6`<br>• Color 1 W range: `0, 1 ~ 8`{.code-green}.<br>• Color 1 W = floor(reading).<br>• Color 1 H range: `0, 1 ~ 6`{.code-green}.<br>• Color 1 H = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Pybricks blocks provides: 2 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Saturation retains tens only; the reconstructed value is approximate.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | S1 hue and S1 saturation | `0 ~ 2560`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading ÷ 10.<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading mod 10) × 10. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | S2 hue and S2 saturation (tens precision) | `0 ~ 255.9`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = floor(reading).<br>• S2 saturation (tens precision) range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (round(reading × 10) % 10) × 10. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Pybricks blocks provides: 2 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Saturation retains tens only; the reconstructed value is approximate.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | S1 hue and S1 saturation | `0 ~ 2560`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading ÷ 10.<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading mod 10) × 10. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | S2 hue and S2 saturation (tens precision) | `0 ~ 255.9`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = floor(reading).<br>• S2 saturation (tens precision) range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (round(reading × 10) % 10) × 10. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Pybricks blocks provides: 1 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | S1 saturation and S1 value (tens precision) | `0 ~ 100.9`<br>• S1 saturation range: `0 ~ 100`{.code-green}.<br>• S1 saturation = floor(reading).<br>• S1 value (tens precision) range: `0 ~ 90`{.code-green}.<br>• S1 value = (round(reading × 10) % 10) × 10. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`Pybricks blocks provides: the first 2 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
- 9 means 9 or more.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Block 2 hue from the left and Total color blocks | `0 ~ 255.9`<br>• Block 2 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 2 hue from the left = floor(reading).<br>• Total color blocks range: `0 ~ 9`{.code-green}.<br>• Total color blocks = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Pybricks blocks provides: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `0 ~ 200`{.code-green}.<br>• Near offset = (reading ÷ 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading mod 10. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `0 ~ 200`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Pybricks blocks provides: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `0 ~ 200`{.code-green}.<br>• Near offset = (reading ÷ 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading mod 10. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `0 ~ 200`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Pybricks blocks provides: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `0 ~ 200`{.code-green}.<br>• Near offset = (reading ÷ 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading mod 10. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `0 ~ 200`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Pybricks blocks provides: codes and positions of the first 1 objects, plus total count`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found. Ambient light provides object data, rather than a second position.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For a negative reflected-light position, add 6399 before decoding.
- For example, 13 means color 1 triangle; 0 means no object.
- 9 means 9 or more.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Object 1 X and Object 1 Y | `-3199 ~ 3199`<br>• Object 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Object 1 X = reading ÷ 100.<br>• Object 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Object 1 Y = reading mod 100. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Object 1 code and Object count | `0 ~ 89.9`<br>• Object 1 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 1 color ID = (floor(reading)) // 10.<br>• Object 1 shape code = (floor(reading)) % 10.<br>• Object count range: `0 ~ 9`{.code-green}.<br>• Object count = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Pybricks blocks provides: details of the first 1 objects`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found. Ambient light provides object data, rather than a second position.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For a negative reflected-light position, add 6399 before decoding.
- For example, 13 means color 1 triangle; 0 means no object.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `reflection()`<br>[Image pending: Pybricks reflected-light block] | Object 1 X and Object 1 Y | `-3199 ~ 3199`<br>• Object 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Object 1 X = reading ÷ 100.<br>• Object 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Object 1 Y = reading mod 100. |
| `ambient()`<br>[Image pending: Pybricks ambient-light block] | Object 1 code and Object 1 area (tens precision) | `0 ~ 89.9`<br>• Object 1 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 1 color ID = (floor(reading)) // 10.<br>• Object 1 shape code = (floor(reading)) % 10.<br>• Object 1 area (tens precision) range: `0 ~ 90`{.code-green}.<br>• Object 1 area = (round(reading × 10) % 10) × 10. |

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

For example, reflected = 2015 and ambient = 4.3 decode to target 1 grid position (20,15) and target 2 grid position (4,3). The grids have different resolutions: 40 × 30 for target 1 and 8 × 6 for target 2.

### ✔ Decode line-following readings

For camera modes 41, 42, and 43: near offset = floor(reflected / 10) - 100; junction = reflected modulo 10; far offset = floor(ambient) - 100; flags = round(ambient × 10) modulo 10. For example, 802 and 115.5 mean near offset -20, a T junction, far offset +15, and a line detected in the near and far rows.

### ✔ Further reading

For more targets, pixel positions, areas, or raw data, see the [Pybricks Python lesson](./spike-python.md), which includes the transport mode 9 field map and a complete program.

*[Image pending: complete SPIKE Pybricks Blocks block program or project file; the steps above describe the reads and calculations.]*

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
