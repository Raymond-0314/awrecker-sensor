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

## 02 / Basic control - Preparation and functions

### ✔ Preparation

1. No external library is required. Connect the camera to Port C and use the built-in Pybricks Color Sensor.
2. Select the Mode ID on the camera so it matches the reading table.
3. Configure a Color Sensor on Port C and use its reflection and ambient-light blocks.

::: info ℹ️ Reading notes
- Use the built-in Color Sensor blocks. Store reflection and ambient readings in variables and decode them for the selected camera mode. Select that mode on the camera.
- Here ÷ means integer division and mod means remainder. Ambient readings retain one decimal place: use floor(reading) for the integer and round(reading × 10) % 10 for the digit.
:::

::: warning ⚠️ Note
- Only one camera submode is active at a time. Make sure its Mode ID matches the program.
- Modes reuse the same read expressions; decode their results using the table for the selected mode.
:::

<CamModeAccordion namespace="basic">

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`Pybricks blocks provide: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Pybricks blocks provide: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Pybricks blocks provide: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Pybricks blocks provide: 1 color positions and sizes`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Color 1 W and Color 1 H | `0 ~ 8.6`<br>• Color 1 W range: `0, 1 ~ 8`{.code-green}.<br>• Color 1 W = floor(reading).<br>• Color 1 H range: `0, 1 ~ 6`{.code-green}.<br>• Color 1 H = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Pybricks blocks provide: 2 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Saturation retains tens only; the reconstructed value is approximate.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | S1 hue and S1 saturation | `0 ~ 2559`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading ÷ 10.<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading mod 10) × 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | S2 hue and S2 saturation (tens precision) | `0 ~ 255.9`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = floor(reading).<br>• S2 saturation (tens precision) range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (round(reading × 10) % 10) × 10. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Pybricks blocks provide: 2 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Saturation retains tens only; the reconstructed value is approximate.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | S1 hue and S1 saturation | `0 ~ 2559`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading ÷ 10.<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading mod 10) × 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | S2 hue and S2 saturation (tens precision) | `0 ~ 255.9`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = floor(reading).<br>• S2 saturation (tens precision) range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (round(reading × 10) % 10) × 10. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Pybricks blocks provide: 1 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | S1 saturation and S1 value (tens precision) | `0 ~ 100.9`<br>• S1 saturation range: `0 ~ 100`{.code-green}.<br>• S1 saturation = floor(reading).<br>• S1 value (tens precision) range: `0 ~ 90`{.code-green}.<br>• S1 value = (round(reading × 10) % 10) × 10. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`Pybricks blocks provide: the first 2 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
- 9 means 9 or more.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Block 2 hue from the left and Total color blocks | `0 ~ 255.9`<br>• Block 2 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 2 hue from the left = floor(reading).<br>• Total color blocks range: `0 ~ 9`{.code-green}.<br>• Total color blocks = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Pybricks blocks provide: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `-100 ~ 100`{.code-green}.<br>• Near offset = (reading ÷ 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading mod 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `-100 ~ 100`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Pybricks blocks provide: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `-100 ~ 100`{.code-green}.<br>• Near offset = (reading ÷ 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading mod 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `-100 ~ 100`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Pybricks blocks provide: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `-100 ~ 100`{.code-green}.<br>• Near offset = (reading ÷ 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading mod 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `-100 ~ 100`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Pybricks blocks provide: codes and positions of the first 1 objects, plus total count`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found. Ambient light provides object data, rather than a second position.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For a negative reflected-light position, add 6399 before decoding.
- For example, 13 means color 1 triangle; 0 means no object.
- 9 means 9 or more.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Object 1 X and Object 1 Y | `-3199 ~ 3199`<br>• Object 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Object 1 X = reading ÷ 100.<br>• Object 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Object 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Object 1 code and Object count | `0 ~ 89.9`<br>• Object 1 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 1 color ID = (floor(reading)) // 10.<br>• Object 1 shape code = (floor(reading)) % 10.<br>• Object count range: `0 ~ 9`{.code-green}.<br>• Object count = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Pybricks blocks provide: details of the first 1 objects`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found. Ambient light provides object data, rather than a second position.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For a negative reflected-light position, add 6399 before decoding.
- For example, 13 means color 1 triangle; 0 means no object.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Object 1 X and Object 1 Y | `-3199 ~ 3199`<br>• Object 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Object 1 X = reading ÷ 100.<br>• Object 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Object 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Object 1 code and Object 1 area (tens precision) | `0 ~ 89.9`<br>• Object 1 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 1 color ID = (floor(reading)) // 10.<br>• Object 1 shape code = (floor(reading)) % 10.<br>• Object 1 area (tens precision) range: `0 ~ 90`{.code-green}.<br>• Object 1 area = (round(reading × 10) % 10) × 10. |

</CamModeSection>

</CamModeAccordion>

### ✔ Basic control example


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


*[Image pending: complete SPIKE Pybricks Blocks basic example or project]*

## 03 / Advanced control - Preparation and functions

### ✔ Preparation

<DownloadButton href="/programs/Cam/spike-pybricks/MBC_UniCam.py" download="MBC_UniCam.py" label="MBC_UniCam.py" />

<DownloadButton href="/programs/Cam/spike-pybricks/Cam_Blocks.py" download="Cam_Blocks.py" label="Cam_Blocks.py" />

1. Download `MBC_UniCam.py`, import it into Pybricks without renaming it, and keep it next to the main program.
2. Also download and import `Cam_Blocks.py`. It exposes scalar external tasks backed by the library. Connect the camera to Port C; change `Port.C` in this file for another port.
3. Import `camera_mode` and `camera_read` from `Cam_Blocks`. Call `camera_mode(13)` once and check for result 0 before entering the reading loop. Do not also initialize the basic Color Sensor blocks.

::: info ℹ️ Reading notes
- Main data uses sensor mode 9. Counts in camera modes 11 and 12 use sensor mode 6; switching read modes adds delay, so request counts only when needed.
- Use one camera submode at a time. The program Mode ID must match the camera. The library handles packing, coordinates and signed line values; no extra 65536 adjustment is needed.
- Positions are pixels, with X increasing rightward and Y downward. Mode 11 also provides 16 × 12 grid cells; its pixel coordinates are cell centers rather than per-pixel measurements.
- A call can return `None` before the first successful read. Disconnection can retain an older reading. Check connection status before using results.
- In `camera_read("field", index)`, index selects the color, point or object starting at 1. Pass 1 for fields without an index. Store each result in a variable. `camera_read("sensor_ok", 1)` reports connection status.
:::

<CamModeAccordion namespace="advanced">

### ✔ Camera mode overview

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 - Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`Library provides: 14 color positions and counts`

::: info ℹ️ Reading notes
- Position (0, 0) means no target. Check for a target before using coordinates.
- Pixel coordinates are cell centers: X = (cell X - 1) × 10 + 5 and Y = (cell Y - 1) × 10 + 5. Count 7 means 7 or more blobs.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("x", 1)` | Color 1 X | `0, 5 ~ 155`<br>• Color 1 X = reading. |
| `camera_read("y", 1)` | Color 1 Y | `0, 5 ~ 115`<br>• Color 1 Y = reading. |
| `camera_read("cell_x", 1)` | Color 1 cell X | `0, 1 ~ 16`<br>• Color 1 cell X = reading. |
| `camera_read("cell_y", 1)` | Color 1 cell Y | `0, 1 ~ 12`<br>• Color 1 cell Y = reading. |
| `camera_read("count", 1)` | Color 1 count | `0 ~ 7`<br>• Color 1 count = reading. |
| `camera_read("x", 2)` | Color 2 X | `0, 5 ~ 155`<br>• Color 2 X = reading. |
| `camera_read("y", 2)` | Color 2 Y | `0, 5 ~ 115`<br>• Color 2 Y = reading. |
| `camera_read("cell_x", 2)` | Color 2 cell X | `0, 1 ~ 16`<br>• Color 2 cell X = reading. |
| `camera_read("cell_y", 2)` | Color 2 cell Y | `0, 1 ~ 12`<br>• Color 2 cell Y = reading. |
| `camera_read("count", 2)` | Color 2 count | `0 ~ 7`<br>• Color 2 count = reading. |
| `camera_read("x", 3)` | Color 3 X | `0, 5 ~ 155`<br>• Color 3 X = reading. |
| `camera_read("y", 3)` | Color 3 Y | `0, 5 ~ 115`<br>• Color 3 Y = reading. |
| `camera_read("cell_x", 3)` | Color 3 cell X | `0, 1 ~ 16`<br>• Color 3 cell X = reading. |
| `camera_read("cell_y", 3)` | Color 3 cell Y | `0, 1 ~ 12`<br>• Color 3 cell Y = reading. |
| `camera_read("count", 3)` | Color 3 count | `0 ~ 7`<br>• Color 3 count = reading. |
| `camera_read("x", 4)` | Color 4 X | `0, 5 ~ 155`<br>• Color 4 X = reading. |
| `camera_read("y", 4)` | Color 4 Y | `0, 5 ~ 115`<br>• Color 4 Y = reading. |
| `camera_read("cell_x", 4)` | Color 4 cell X | `0, 1 ~ 16`<br>• Color 4 cell X = reading. |
| `camera_read("cell_y", 4)` | Color 4 cell Y | `0, 1 ~ 12`<br>• Color 4 cell Y = reading. |
| `camera_read("count", 4)` | Color 4 count | `0 ~ 7`<br>• Color 4 count = reading. |
| `camera_read("x", 5)` | Color 5 X | `0, 5 ~ 155`<br>• Color 5 X = reading. |
| `camera_read("y", 5)` | Color 5 Y | `0, 5 ~ 115`<br>• Color 5 Y = reading. |
| `camera_read("cell_x", 5)` | Color 5 cell X | `0, 1 ~ 16`<br>• Color 5 cell X = reading. |
| `camera_read("cell_y", 5)` | Color 5 cell Y | `0, 1 ~ 12`<br>• Color 5 cell Y = reading. |
| `camera_read("count", 5)` | Color 5 count | `0 ~ 7`<br>• Color 5 count = reading. |
| `camera_read("x", 6)` | Color 6 X | `0, 5 ~ 155`<br>• Color 6 X = reading. |
| `camera_read("y", 6)` | Color 6 Y | `0, 5 ~ 115`<br>• Color 6 Y = reading. |
| `camera_read("cell_x", 6)` | Color 6 cell X | `0, 1 ~ 16`<br>• Color 6 cell X = reading. |
| `camera_read("cell_y", 6)` | Color 6 cell Y | `0, 1 ~ 12`<br>• Color 6 cell Y = reading. |
| `camera_read("count", 6)` | Color 6 count | `0 ~ 7`<br>• Color 6 count = reading. |
| `camera_read("x", 7)` | Color 7 X | `0, 5 ~ 155`<br>• Color 7 X = reading. |
| `camera_read("y", 7)` | Color 7 Y | `0, 5 ~ 115`<br>• Color 7 Y = reading. |
| `camera_read("cell_x", 7)` | Color 7 cell X | `0, 1 ~ 16`<br>• Color 7 cell X = reading. |
| `camera_read("cell_y", 7)` | Color 7 cell Y | `0, 1 ~ 12`<br>• Color 7 cell Y = reading. |
| `camera_read("count", 7)` | Color 7 count | `0 ~ 7`<br>• Color 7 count = reading. |
| `camera_read("x", 8)` | Color 8 X | `0, 5 ~ 155`<br>• Color 8 X = reading. |
| `camera_read("y", 8)` | Color 8 Y | `0, 5 ~ 115`<br>• Color 8 Y = reading. |
| `camera_read("cell_x", 8)` | Color 8 cell X | `0, 1 ~ 16`<br>• Color 8 cell X = reading. |
| `camera_read("cell_y", 8)` | Color 8 cell Y | `0, 1 ~ 12`<br>• Color 8 cell Y = reading. |
| `camera_read("count", 8)` | Color 8 count | `0 ~ 7`<br>• Color 8 count = reading. |
| `camera_read("x", 9)` | Color 9 X | `0, 5 ~ 155`<br>• Color 9 X = reading. |
| `camera_read("y", 9)` | Color 9 Y | `0, 5 ~ 115`<br>• Color 9 Y = reading. |
| `camera_read("cell_x", 9)` | Color 9 cell X | `0, 1 ~ 16`<br>• Color 9 cell X = reading. |
| `camera_read("cell_y", 9)` | Color 9 cell Y | `0, 1 ~ 12`<br>• Color 9 cell Y = reading. |
| `camera_read("count", 9)` | Color 9 count | `0 ~ 7`<br>• Color 9 count = reading. |
| `camera_read("x", 10)` | Color 10 X | `0, 5 ~ 155`<br>• Color 10 X = reading. |
| `camera_read("y", 10)` | Color 10 Y | `0, 5 ~ 115`<br>• Color 10 Y = reading. |
| `camera_read("cell_x", 10)` | Color 10 cell X | `0, 1 ~ 16`<br>• Color 10 cell X = reading. |
| `camera_read("cell_y", 10)` | Color 10 cell Y | `0, 1 ~ 12`<br>• Color 10 cell Y = reading. |
| `camera_read("count", 10)` | Color 10 count | `0 ~ 7`<br>• Color 10 count = reading. |
| `camera_read("x", 11)` | Color 11 X | `0, 5 ~ 155`<br>• Color 11 X = reading. |
| `camera_read("y", 11)` | Color 11 Y | `0, 5 ~ 115`<br>• Color 11 Y = reading. |
| `camera_read("cell_x", 11)` | Color 11 cell X | `0, 1 ~ 16`<br>• Color 11 cell X = reading. |
| `camera_read("cell_y", 11)` | Color 11 cell Y | `0, 1 ~ 12`<br>• Color 11 cell Y = reading. |
| `camera_read("count", 11)` | Color 11 count | `0 ~ 7`<br>• Color 11 count = reading. |
| `camera_read("x", 12)` | Color 12 X | `0, 5 ~ 155`<br>• Color 12 X = reading. |
| `camera_read("y", 12)` | Color 12 Y | `0, 5 ~ 115`<br>• Color 12 Y = reading. |
| `camera_read("cell_x", 12)` | Color 12 cell X | `0, 1 ~ 16`<br>• Color 12 cell X = reading. |
| `camera_read("cell_y", 12)` | Color 12 cell Y | `0, 1 ~ 12`<br>• Color 12 cell Y = reading. |
| `camera_read("count", 12)` | Color 12 count | `0 ~ 7`<br>• Color 12 count = reading. |
| `camera_read("x", 13)` | Color 13 X | `0, 5 ~ 155`<br>• Color 13 X = reading. |
| `camera_read("y", 13)` | Color 13 Y | `0, 5 ~ 115`<br>• Color 13 Y = reading. |
| `camera_read("cell_x", 13)` | Color 13 cell X | `0, 1 ~ 16`<br>• Color 13 cell X = reading. |
| `camera_read("cell_y", 13)` | Color 13 cell Y | `0, 1 ~ 12`<br>• Color 13 cell Y = reading. |
| `camera_read("count", 13)` | Color 13 count | `0 ~ 7`<br>• Color 13 count = reading. |
| `camera_read("x", 14)` | Color 14 X | `0, 5 ~ 155`<br>• Color 14 X = reading. |
| `camera_read("y", 14)` | Color 14 Y | `0, 5 ~ 115`<br>• Color 14 Y = reading. |
| `camera_read("cell_x", 14)` | Color 14 cell X | `0, 1 ~ 16`<br>• Color 14 cell X = reading. |
| `camera_read("cell_y", 14)` | Color 14 cell Y | `0, 1 ~ 12`<br>• Color 14 cell Y = reading. |
| `camera_read("count", 14)` | Color 14 count | `0 ~ 7`<br>• Color 14 count = reading. |
| `camera_read("colors_found", 1)` | Colors found | `0 ~ 15`<br>• Colors found = reading. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Library provides: 7 color positions and counts`

::: info ℹ️ Reading notes
- Position (0, 0) means no target. Check for a target before using coordinates.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("x", 1)` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `camera_read("y", 1)` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `camera_read("count", 1)` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `camera_read("x", 2)` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `camera_read("y", 2)` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `camera_read("count", 2)` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `camera_read("x", 3)` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `camera_read("y", 3)` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `camera_read("count", 3)` | Color 3 count | `0 ~ 15`<br>• Color 3 count = reading. |
| `camera_read("x", 4)` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `camera_read("y", 4)` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `camera_read("count", 4)` | Color 4 count | `0 ~ 15`<br>• Color 4 count = reading. |
| `camera_read("x", 5)` | Color 5 X | `0 ~ 159`<br>• Color 5 X = reading. |
| `camera_read("y", 5)` | Color 5 Y | `0 ~ 119`<br>• Color 5 Y = reading. |
| `camera_read("count", 5)` | Color 5 count | `0 ~ 15`<br>• Color 5 count = reading. |
| `camera_read("x", 6)` | Color 6 X | `0 ~ 159`<br>• Color 6 X = reading. |
| `camera_read("y", 6)` | Color 6 Y | `0 ~ 119`<br>• Color 6 Y = reading. |
| `camera_read("count", 6)` | Color 6 count | `0 ~ 15`<br>• Color 6 count = reading. |
| `camera_read("x", 7)` | Color 7 X | `0 ~ 159`<br>• Color 7 X = reading. |
| `camera_read("y", 7)` | Color 7 Y | `0 ~ 119`<br>• Color 7 Y = reading. |
| `camera_read("count", 7)` | Color 7 count | `0 ~ 15`<br>• Color 7 count = reading. |
| `camera_read("colors_found", 1)` | Colors found | `0 ~ 15`<br>• Colors found = reading. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Library provides: 4 color positions and counts, area`

::: info ℹ️ Reading notes
- Position (0, 0) means no target. Check for a target before using coordinates.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("x", 1)` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `camera_read("y", 1)` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `camera_read("count", 1)` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `camera_read("area", 1)` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `camera_read("x", 2)` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `camera_read("y", 2)` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `camera_read("count", 2)` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `camera_read("area", 2)` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `camera_read("x", 3)` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `camera_read("y", 3)` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `camera_read("count", 3)` | Color 3 count | `0 ~ 15`<br>• Color 3 count = reading. |
| `camera_read("area", 3)` | Color 3 area | `0 ~ 100`<br>• Color 3 area = reading. |
| `camera_read("x", 4)` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `camera_read("y", 4)` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `camera_read("count", 4)` | Color 4 count | `0 ~ 15`<br>• Color 4 count = reading. |
| `camera_read("area", 4)` | Color 4 area | `0 ~ 100`<br>• Color 4 area = reading. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Library provides: 2 color positions and counts, area and size`

::: info ℹ️ Reading notes
- Position (0, 0) means no target. Check for a target before using coordinates.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("x", 1)` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `camera_read("y", 1)` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `camera_read("w", 1)` | Color 1 W | `0 ~ 160`<br>• Color 1 W = reading. |
| `camera_read("h", 1)` | Color 1 H | `0 ~ 120`<br>• Color 1 H = reading. |
| `camera_read("count", 1)` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `camera_read("area", 1)` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `camera_read("x", 2)` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `camera_read("y", 2)` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `camera_read("w", 2)` | Color 2 W | `0 ~ 160`<br>• Color 2 W = reading. |
| `camera_read("h", 2)` | Color 2 H | `0 ~ 120`<br>• Color 2 H = reading. |
| `camera_read("count", 2)` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `camera_read("area", 2)` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `camera_read("colors_found", 1)` | Colors found | `0 ~ 16`<br>• Colors found = reading. |

</CamModeSection>

#### Mode 2 - Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Library provides: 14 points: hue`

::: info ℹ️ Reading notes
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("hue", 1)` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `camera_read("hue", 2)` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `camera_read("hue", 3)` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `camera_read("hue", 4)` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `camera_read("hue", 5)` | S5 hue | `0 ~ 255`<br>• S5 hue = reading. |
| `camera_read("hue", 6)` | S6 hue | `0 ~ 255`<br>• S6 hue = reading. |
| `camera_read("hue", 7)` | S7 hue | `0 ~ 255`<br>• S7 hue = reading. |
| `camera_read("hue", 8)` | S8 hue | `0 ~ 255`<br>• S8 hue = reading. |
| `camera_read("hue", 9)` | S9 hue | `0 ~ 255`<br>• S9 hue = reading. |
| `camera_read("hue", 10)` | S10 hue | `0 ~ 255`<br>• S10 hue = reading. |
| `camera_read("hue", 11)` | S11 hue | `0 ~ 255`<br>• S11 hue = reading. |
| `camera_read("hue", 12)` | S12 hue | `0 ~ 255`<br>• S12 hue = reading. |
| `camera_read("hue", 13)` | S13 hue | `0 ~ 255`<br>• S13 hue = reading. |
| `camera_read("hue", 14)` | S14 hue | `0 ~ 255`<br>• S14 hue = reading. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Library provides: 7 points: hue, saturation`

::: info ℹ️ Reading notes
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("hue", 1)` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `camera_read("sat", 1)` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `camera_read("hue", 2)` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `camera_read("sat", 2)` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `camera_read("hue", 3)` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `camera_read("sat", 3)` | S3 saturation | `0 ~ 100`<br>• S3 saturation = reading. |
| `camera_read("hue", 4)` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `camera_read("sat", 4)` | S4 saturation | `0 ~ 100`<br>• S4 saturation = reading. |
| `camera_read("hue", 5)` | S5 hue | `0 ~ 255`<br>• S5 hue = reading. |
| `camera_read("sat", 5)` | S5 saturation | `0 ~ 100`<br>• S5 saturation = reading. |
| `camera_read("hue", 6)` | S6 hue | `0 ~ 255`<br>• S6 hue = reading. |
| `camera_read("sat", 6)` | S6 saturation | `0 ~ 100`<br>• S6 saturation = reading. |
| `camera_read("hue", 7)` | S7 hue | `0 ~ 255`<br>• S7 hue = reading. |
| `camera_read("sat", 7)` | S7 saturation | `0 ~ 100`<br>• S7 saturation = reading. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Library provides: 4 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("hue", 1)` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `camera_read("sat", 1)` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `camera_read("val", 1)` | S1 value | `0 ~ 100`<br>• S1 value = reading. |
| `camera_read("hue", 2)` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `camera_read("sat", 2)` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `camera_read("val", 2)` | S2 value | `0 ~ 100`<br>• S2 value = reading. |
| `camera_read("hue", 3)` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `camera_read("sat", 3)` | S3 saturation | `0 ~ 100`<br>• S3 saturation = reading. |
| `camera_read("val", 3)` | S3 value | `0 ~ 100`<br>• S3 value = reading. |
| `camera_read("hue", 4)` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `camera_read("sat", 4)` | S4 saturation | `0 ~ 100`<br>• S4 saturation = reading. |
| `camera_read("val", 4)` | S4 value | `0 ~ 100`<br>• S4 value = reading. |

</CamModeSection>

#### Mode 3 - Color order

<CamModeSection mode="30" title="Color order">

`Library provides: the first 13 hues and total block count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Total count can exceed 13, but the list contains at most 13 blocks. Check its length before indexing. Hue 0 can mean red.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("order", 1)` | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| `camera_read("order", 2)` | Block 2 hue from the left | `0 ~ 255`<br>• Block 2 hue from the left = reading. |
| `camera_read("order", 3)` | Block 3 hue from the left | `0 ~ 255`<br>• Block 3 hue from the left = reading. |
| `camera_read("order", 4)` | Block 4 hue from the left | `0 ~ 255`<br>• Block 4 hue from the left = reading. |
| `camera_read("order", 5)` | Block 5 hue from the left | `0 ~ 255`<br>• Block 5 hue from the left = reading. |
| `camera_read("order", 6)` | Block 6 hue from the left | `0 ~ 255`<br>• Block 6 hue from the left = reading. |
| `camera_read("order", 7)` | Block 7 hue from the left | `0 ~ 255`<br>• Block 7 hue from the left = reading. |
| `camera_read("order", 8)` | Block 8 hue from the left | `0 ~ 255`<br>• Block 8 hue from the left = reading. |
| `camera_read("order", 9)` | Block 9 hue from the left | `0 ~ 255`<br>• Block 9 hue from the left = reading. |
| `camera_read("order", 10)` | Block 10 hue from the left | `0 ~ 255`<br>• Block 10 hue from the left = reading. |
| `camera_read("order", 11)` | Block 11 hue from the left | `0 ~ 255`<br>• Block 11 hue from the left = reading. |
| `camera_read("order", 12)` | Block 12 hue from the left | `0 ~ 255`<br>• Block 12 hue from the left = reading. |
| `camera_read("order", 13)` | Block 13 hue from the left | `0 ~ 255`<br>• Block 13 hue from the left = reading. |
| `camera_read("total", 1)` | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |

</CamModeSection>

#### Mode 4 - Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Last lost side: 0 on line, 1 left, 2 right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("near", 1)` | Near offset | `-100 ~ 100`<br>• Near offset = reading. |
| `camera_read("mid", 1)` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading. |
| `camera_read("far", 1)` | Far offset | `-100 ~ 100`<br>• Far offset = reading. |
| `camera_read("angle", 1)` | Line angle | `-90 ~ 90`<br>• Line angle = reading. |
| `camera_read("width", 1)` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `camera_read("flags", 1)` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `camera_read("junction", 1)` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `camera_read("junction_dist", 1)` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `camera_read("left", 1)` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading. |
| `camera_read("right", 1)` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading. |
| `camera_read("far_width", 1)` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `camera_read("marker_color", 1)` | Marker color | `0 ~ 8`<br>• Marker color = reading. |
| `camera_read("marker_count", 1)` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `camera_read("lost", 1)` | Last lost side | `0 ~ 2`<br>• Last lost side = reading. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Last lost side: 0 on line, 1 left, 2 right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("near", 1)` | Near offset | `-100 ~ 100`<br>• Near offset = reading. |
| `camera_read("mid", 1)` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading. |
| `camera_read("far", 1)` | Far offset | `-100 ~ 100`<br>• Far offset = reading. |
| `camera_read("angle", 1)` | Line angle | `-90 ~ 90`<br>• Line angle = reading. |
| `camera_read("width", 1)` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `camera_read("flags", 1)` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `camera_read("junction", 1)` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `camera_read("junction_dist", 1)` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `camera_read("left", 1)` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading. |
| `camera_read("right", 1)` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading. |
| `camera_read("far_width", 1)` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `camera_read("marker_color", 1)` | Marker color | `0 ~ 8`<br>• Marker color = reading. |
| `camera_read("marker_count", 1)` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `camera_read("lost", 1)` | Last lost side | `0 ~ 2`<br>• Last lost side = reading. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Teach the line color as target color 1 first.
- Last lost side: 0 on line, 1 left, 2 right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("near", 1)` | Near offset | `-100 ~ 100`<br>• Near offset = reading. |
| `camera_read("mid", 1)` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading. |
| `camera_read("far", 1)` | Far offset | `-100 ~ 100`<br>• Far offset = reading. |
| `camera_read("angle", 1)` | Line angle | `-90 ~ 90`<br>• Line angle = reading. |
| `camera_read("width", 1)` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `camera_read("flags", 1)` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `camera_read("junction", 1)` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `camera_read("junction_dist", 1)` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `camera_read("left", 1)` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading. |
| `camera_read("right", 1)` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading. |
| `camera_read("far_width", 1)` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `camera_read("marker_color", 1)` | Marker color | `0 ~ 8`<br>• Marker color = reading. |
| `camera_read("marker_count", 1)` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `camera_read("lost", 1)` | Last lost side | `0 ~ 2`<br>• Last lost side = reading. |

</CamModeSection>

#### Mode 5 - Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Library provides: the first 4 objects and total count`

::: info ℹ️ Reading notes
- Only target colors 1 ~ 8 are used. Objects are sorted by decreasing area. Code = color ID × 10 + shape code; 0 means no object. Check for an object before using its data.
- Shape codes 0 ~ 9: other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star, trapezoid.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("object_count", 1)` | Object count | `0 ~ 8`<br>• Object count = reading. |
| `camera_read("object", 1)` | Object 1 code | `0, 10 ~ 89`<br>• Object 1 code = reading. |
| `camera_read("object_color", 1)` | Object 1 color ID | `0 ~ 8`<br>• Object 1 color ID = reading. |
| `camera_read("object_shape", 1)` | Object 1 shape code | `0 ~ 9`<br>• Object 1 shape code = reading. |
| `camera_read("object_x", 1)` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `camera_read("object_y", 1)` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `camera_read("object", 2)` | Object 2 code | `0, 10 ~ 89`<br>• Object 2 code = reading. |
| `camera_read("object_color", 2)` | Object 2 color ID | `0 ~ 8`<br>• Object 2 color ID = reading. |
| `camera_read("object_shape", 2)` | Object 2 shape code | `0 ~ 9`<br>• Object 2 shape code = reading. |
| `camera_read("object_x", 2)` | Object 2 X | `0 ~ 159`<br>• Object 2 X = reading. |
| `camera_read("object_y", 2)` | Object 2 Y | `0 ~ 119`<br>• Object 2 Y = reading. |
| `camera_read("object", 3)` | Object 3 code | `0, 10 ~ 89`<br>• Object 3 code = reading. |
| `camera_read("object_color", 3)` | Object 3 color ID | `0 ~ 8`<br>• Object 3 color ID = reading. |
| `camera_read("object_shape", 3)` | Object 3 shape code | `0 ~ 9`<br>• Object 3 shape code = reading. |
| `camera_read("object_x", 3)` | Object 3 X | `0 ~ 159`<br>• Object 3 X = reading. |
| `camera_read("object_y", 3)` | Object 3 Y | `0 ~ 119`<br>• Object 3 Y = reading. |
| `camera_read("object", 4)` | Object 4 code | `0, 10 ~ 89`<br>• Object 4 code = reading. |
| `camera_read("object_color", 4)` | Object 4 color ID | `0 ~ 8`<br>• Object 4 color ID = reading. |
| `camera_read("object_shape", 4)` | Object 4 shape code | `0 ~ 9`<br>• Object 4 shape code = reading. |
| `camera_read("object_x", 4)` | Object 4 X | `0 ~ 159`<br>• Object 4 X = reading. |
| `camera_read("object_y", 4)` | Object 4 Y | `0 ~ 119`<br>• Object 4 Y = reading. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Library provides: the first 2 objects: position, size and area`

::: info ℹ️ Reading notes
- Only target colors 1 ~ 8 are used. Objects are sorted by decreasing area. Code = color ID × 10 + shape code; 0 means no object. Check for an object before using its data.
- Shape codes 0 ~ 9: other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star, trapezoid.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `camera_read("object", 1)` | Object 1 code | `0, 10 ~ 89`<br>• Object 1 code = reading. |
| `camera_read("object_color", 1)` | Object 1 color ID | `0 ~ 8`<br>• Object 1 color ID = reading. |
| `camera_read("object_shape", 1)` | Object 1 shape code | `0 ~ 9`<br>• Object 1 shape code = reading. |
| `camera_read("object_x", 1)` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `camera_read("object_y", 1)` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `camera_read("object_w", 1)` | Object 1 W | `0 ~ 160`<br>• Object 1 W = reading. |
| `camera_read("object_h", 1)` | Object 1 H | `0 ~ 120`<br>• Object 1 H = reading. |
| `camera_read("object_area", 1)` | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| `camera_read("object", 2)` | Object 2 code | `0, 10 ~ 89`<br>• Object 2 code = reading. |
| `camera_read("object_color", 2)` | Object 2 color ID | `0 ~ 8`<br>• Object 2 color ID = reading. |
| `camera_read("object_shape", 2)` | Object 2 shape code | `0 ~ 9`<br>• Object 2 shape code = reading. |
| `camera_read("object_x", 2)` | Object 2 X | `0 ~ 159`<br>• Object 2 X = reading. |
| `camera_read("object_y", 2)` | Object 2 Y | `0 ~ 119`<br>• Object 2 Y = reading. |
| `camera_read("object_w", 2)` | Object 2 W | `0 ~ 160`<br>• Object 2 W = reading. |
| `camera_read("object_h", 2)` | Object 2 H | `0 ~ 120`<br>• Object 2 H = reading. |
| `camera_read("object_area", 2)` | Object 2 area | `0 ~ 100`<br>• Object 2 area = reading. |

</CamModeSection>

</CamModeAccordion>

### ✔ Advanced control example

Teach target color 1, then import the two external tasks and build the steps below. The function names refer to external tasks, not native Color Sensor blocks.

| Step | Block operation |
| --- | --- |
| 1 | Call `camera_mode(13)` once before the loop and check for result 0. |
| 2 | Repeat: store `camera_read("x", 1)`, `camera_read("y", 1)`, `camera_read("area", 1)` and `camera_read("count", 1)` in X, Y, area and count. |
| 3 | Check `camera_read("sensor_ok", 1)` is true and X is not `None`. X = 0 means not found; otherwise show X, Y, area and count. |
| 4 | Wait 0.1 seconds and repeat. |

*[Image pending: Cam Pybricks Blocks external-task imports, camera_mode and camera_read configuration, and the full advanced example]*

### ✔ Library control and status

`camera_mode(Mode ID)` selects a camera mode; `camera_read("mode_number", 1)` reports the configured mode. Use the field tables above for readings. For lamp control, remote teaching and camera settings, see the [local Pybricks Python advanced section](./spike-python.md#_03-advanced-control-preparation-and-functions).

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
