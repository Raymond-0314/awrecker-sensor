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

## 02 / Basic control - Preparation and functions

### ✔ Preparation

1. No external library is required. Connect the camera to Port C and use the built-in Pybricks Color Sensor.
2. Select the Mode ID on the camera so it matches the reading table.
3. Import `ColorSensor`, create `cam = ColorSensor(Port.C)`, and use `cam.reflection()` and `cam.ambient()`.

::: info ℹ️ Reading notes
- Use the built-in Color Sensor blocks. Store reflection and ambient readings in variables and decode them for the selected camera mode. Select that mode on the camera.
- Here // means integer division and % means remainder. Ambient readings retain one decimal place: use floor(reading) for the integer and round(reading × 10) % 10 for the digit.
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

`Built-in Color Sensor provides: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading // 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading % 100. |
| `cam.ambient()` | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Built-in Color Sensor provides: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading // 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading % 100. |
| `cam.ambient()` | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Built-in Color Sensor provides: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading // 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading % 100. |
| `cam.ambient()` | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Built-in Color Sensor provides: 1 color positions and sizes`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading // 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading % 100. |
| `cam.ambient()` | Color 1 W and Color 1 H | `0 ~ 8.6`<br>• Color 1 W range: `0, 1 ~ 8`{.code-green}.<br>• Color 1 W = floor(reading).<br>• Color 1 H range: `0, 1 ~ 6`{.code-green}.<br>• Color 1 H = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Built-in Color Sensor provides: 2 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Saturation retains tens only; the reconstructed value is approximate.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | S1 hue and S1 saturation | `0 ~ 2559`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading // 10.<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading % 10) × 10. |
| `cam.ambient()` | S2 hue and S2 saturation (tens precision) | `0 ~ 255.9`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = floor(reading).<br>• S2 saturation (tens precision) range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (round(reading × 10) % 10) × 10. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Built-in Color Sensor provides: 2 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Saturation retains tens only; the reconstructed value is approximate.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | S1 hue and S1 saturation | `0 ~ 2559`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading // 10.<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading % 10) × 10. |
| `cam.ambient()` | S2 hue and S2 saturation (tens precision) | `0 ~ 255.9`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = floor(reading).<br>• S2 saturation (tens precision) range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (round(reading × 10) % 10) × 10. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Built-in Color Sensor provides: 1 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `cam.ambient()` | S1 saturation and S1 value (tens precision) | `0 ~ 100.9`<br>• S1 saturation range: `0 ~ 100`{.code-green}.<br>• S1 saturation = floor(reading).<br>• S1 value (tens precision) range: `0 ~ 90`{.code-green}.<br>• S1 value = (round(reading × 10) % 10) × 10. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`Built-in Color Sensor provides: the first 2 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
- 9 means 9 or more.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| `cam.ambient()` | Block 2 hue from the left and Total color blocks | `0 ~ 255.9`<br>• Block 2 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 2 hue from the left = floor(reading).<br>• Total color blocks range: `0 ~ 9`{.code-green}.<br>• Total color blocks = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Built-in Color Sensor provides: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `-100 ~ 100`{.code-green}.<br>• Near offset = (reading // 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading % 10. |
| `cam.ambient()` | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `-100 ~ 100`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Built-in Color Sensor provides: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `-100 ~ 100`{.code-green}.<br>• Near offset = (reading // 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading % 10. |
| `cam.ambient()` | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `-100 ~ 100`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Built-in Color Sensor provides: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `-100 ~ 100`{.code-green}.<br>• Near offset = (reading // 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading % 10. |
| `cam.ambient()` | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `-100 ~ 100`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Built-in Color Sensor provides: codes and positions of the first 1 objects, plus total count`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found. Ambient light provides object data, rather than a second position.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For a negative reflected-light position, add 6399 before decoding.
- For example, 13 means color 1 triangle; 0 means no object.
- 9 means 9 or more.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Object 1 X and Object 1 Y | `-3199 ~ 3199`<br>• Object 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Object 1 X = reading // 100.<br>• Object 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Object 1 Y = reading % 100. |
| `cam.ambient()` | Object 1 code and Object count | `0 ~ 89.9`<br>• Object 1 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 1 color ID = (floor(reading)) // 10.<br>• Object 1 shape code = (floor(reading)) % 10.<br>• Object count range: `0 ~ 9`{.code-green}.<br>• Object count = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Built-in Color Sensor provides: details of the first 1 objects`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found. Ambient light provides object data, rather than a second position.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For a negative reflected-light position, add 6399 before decoding.
- For example, 13 means color 1 triangle; 0 means no object.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.reflection()` | Object 1 X and Object 1 Y | `-3199 ~ 3199`<br>• Object 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Object 1 X = reading // 100.<br>• Object 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Object 1 Y = reading % 100. |
| `cam.ambient()` | Object 1 code and Object 1 area (tens precision) | `0 ~ 89.9`<br>• Object 1 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 1 color ID = (floor(reading)) // 10.<br>• Object 1 shape code = (floor(reading)) % 10.<br>• Object 1 area (tens precision) range: `0 ~ 90`{.code-green}.<br>• Object 1 area = (round(reading × 10) % 10) × 10. |

</CamModeSection>

</CamModeAccordion>

### ✔ Basic control example

Select Mode ID 13 on the camera and teach target colors 1 and 2. Color 1 uses a 40 × 30 grid; color 2 uses an 8 × 6 grid. X = 0 means that color was not found.

```python
from pybricks.pupdevices import ColorSensor
from pybricks.parameters import Port
from pybricks.tools import wait
from math import floor

cam = ColorSensor(Port.C)

while True:
    reflected = cam.reflection()
    ambient = cam.ambient()
    if reflected < 0:
        reflected += 6399
    x1 = reflected // 100
    y1 = reflected % 100
    x2 = floor(ambient)
    y2 = round(ambient * 10) % 10
    print("Color 1:", x1, y1, "Color 2:", x2, y2)
    wait(100)
```

For reflected = 2015 and ambient = 4.3, the grid positions are (20, 15) for color 1 and (4, 3) for color 2.

## 03 / Advanced control - Preparation and functions

### ✔ Preparation

<DownloadButton href="/programs/Cam/spike-pybricks/MBC_UniCam.py" download="MBC_UniCam.py" label="MBC_UniCam.py" />

1. Download `MBC_UniCam.py`, import it into Pybricks without renaming it, and keep it next to the main program.
2. Connect the camera to Port C, import `UniCam`, and create `cam = UniCam(Port.C, mode=13)`. Construction selects the camera mode; use `cam.set_mode(Mode ID)` to change it later.
3. Use the decoded library methods below; no manual byte decoding is needed.

::: info ℹ️ Reading notes
- Main data uses sensor mode 9. Counts in camera modes 11 and 12 use sensor mode 6; switching read modes adds delay, so request counts only when needed.
- Use one camera submode at a time. The program Mode ID must match the camera. The library handles packing, coordinates and signed line values; no extra 65536 adjustment is needed.
- Positions are pixels, with X increasing rightward and Y downward. Mode 11 also provides 16 × 12 grid cells; its pixel coordinates are cell centers rather than per-pixel measurements.
- A call can return `None` before the first successful read. Disconnection can retain an older reading. Check connection status before using results.
- `cam.sensor_ok()` reports connection status. For tuple indexing such as `cam.size(1)[0]`, check the tuple is not `None` first. Store a tuple once before accessing its components.
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
| `cam.x(1)` | Color 1 X | `0, 5 ~ 155`<br>• Color 1 X = reading. |
| `cam.y(1)` | Color 1 Y | `0, 5 ~ 115`<br>• Color 1 Y = reading. |
| `cam.cell(1)[0]` | Color 1 cell X | `0, 1 ~ 16`<br>• Color 1 cell X = reading. |
| `cam.cell(1)[1]` | Color 1 cell Y | `0, 1 ~ 12`<br>• Color 1 cell Y = reading. |
| `cam.count(1)` | Color 1 count | `0 ~ 7`<br>• Color 1 count = reading. |
| `cam.x(2)` | Color 2 X | `0, 5 ~ 155`<br>• Color 2 X = reading. |
| `cam.y(2)` | Color 2 Y | `0, 5 ~ 115`<br>• Color 2 Y = reading. |
| `cam.cell(2)[0]` | Color 2 cell X | `0, 1 ~ 16`<br>• Color 2 cell X = reading. |
| `cam.cell(2)[1]` | Color 2 cell Y | `0, 1 ~ 12`<br>• Color 2 cell Y = reading. |
| `cam.count(2)` | Color 2 count | `0 ~ 7`<br>• Color 2 count = reading. |
| `cam.x(3)` | Color 3 X | `0, 5 ~ 155`<br>• Color 3 X = reading. |
| `cam.y(3)` | Color 3 Y | `0, 5 ~ 115`<br>• Color 3 Y = reading. |
| `cam.cell(3)[0]` | Color 3 cell X | `0, 1 ~ 16`<br>• Color 3 cell X = reading. |
| `cam.cell(3)[1]` | Color 3 cell Y | `0, 1 ~ 12`<br>• Color 3 cell Y = reading. |
| `cam.count(3)` | Color 3 count | `0 ~ 7`<br>• Color 3 count = reading. |
| `cam.x(4)` | Color 4 X | `0, 5 ~ 155`<br>• Color 4 X = reading. |
| `cam.y(4)` | Color 4 Y | `0, 5 ~ 115`<br>• Color 4 Y = reading. |
| `cam.cell(4)[0]` | Color 4 cell X | `0, 1 ~ 16`<br>• Color 4 cell X = reading. |
| `cam.cell(4)[1]` | Color 4 cell Y | `0, 1 ~ 12`<br>• Color 4 cell Y = reading. |
| `cam.count(4)` | Color 4 count | `0 ~ 7`<br>• Color 4 count = reading. |
| `cam.x(5)` | Color 5 X | `0, 5 ~ 155`<br>• Color 5 X = reading. |
| `cam.y(5)` | Color 5 Y | `0, 5 ~ 115`<br>• Color 5 Y = reading. |
| `cam.cell(5)[0]` | Color 5 cell X | `0, 1 ~ 16`<br>• Color 5 cell X = reading. |
| `cam.cell(5)[1]` | Color 5 cell Y | `0, 1 ~ 12`<br>• Color 5 cell Y = reading. |
| `cam.count(5)` | Color 5 count | `0 ~ 7`<br>• Color 5 count = reading. |
| `cam.x(6)` | Color 6 X | `0, 5 ~ 155`<br>• Color 6 X = reading. |
| `cam.y(6)` | Color 6 Y | `0, 5 ~ 115`<br>• Color 6 Y = reading. |
| `cam.cell(6)[0]` | Color 6 cell X | `0, 1 ~ 16`<br>• Color 6 cell X = reading. |
| `cam.cell(6)[1]` | Color 6 cell Y | `0, 1 ~ 12`<br>• Color 6 cell Y = reading. |
| `cam.count(6)` | Color 6 count | `0 ~ 7`<br>• Color 6 count = reading. |
| `cam.x(7)` | Color 7 X | `0, 5 ~ 155`<br>• Color 7 X = reading. |
| `cam.y(7)` | Color 7 Y | `0, 5 ~ 115`<br>• Color 7 Y = reading. |
| `cam.cell(7)[0]` | Color 7 cell X | `0, 1 ~ 16`<br>• Color 7 cell X = reading. |
| `cam.cell(7)[1]` | Color 7 cell Y | `0, 1 ~ 12`<br>• Color 7 cell Y = reading. |
| `cam.count(7)` | Color 7 count | `0 ~ 7`<br>• Color 7 count = reading. |
| `cam.x(8)` | Color 8 X | `0, 5 ~ 155`<br>• Color 8 X = reading. |
| `cam.y(8)` | Color 8 Y | `0, 5 ~ 115`<br>• Color 8 Y = reading. |
| `cam.cell(8)[0]` | Color 8 cell X | `0, 1 ~ 16`<br>• Color 8 cell X = reading. |
| `cam.cell(8)[1]` | Color 8 cell Y | `0, 1 ~ 12`<br>• Color 8 cell Y = reading. |
| `cam.count(8)` | Color 8 count | `0 ~ 7`<br>• Color 8 count = reading. |
| `cam.x(9)` | Color 9 X | `0, 5 ~ 155`<br>• Color 9 X = reading. |
| `cam.y(9)` | Color 9 Y | `0, 5 ~ 115`<br>• Color 9 Y = reading. |
| `cam.cell(9)[0]` | Color 9 cell X | `0, 1 ~ 16`<br>• Color 9 cell X = reading. |
| `cam.cell(9)[1]` | Color 9 cell Y | `0, 1 ~ 12`<br>• Color 9 cell Y = reading. |
| `cam.count(9)` | Color 9 count | `0 ~ 7`<br>• Color 9 count = reading. |
| `cam.x(10)` | Color 10 X | `0, 5 ~ 155`<br>• Color 10 X = reading. |
| `cam.y(10)` | Color 10 Y | `0, 5 ~ 115`<br>• Color 10 Y = reading. |
| `cam.cell(10)[0]` | Color 10 cell X | `0, 1 ~ 16`<br>• Color 10 cell X = reading. |
| `cam.cell(10)[1]` | Color 10 cell Y | `0, 1 ~ 12`<br>• Color 10 cell Y = reading. |
| `cam.count(10)` | Color 10 count | `0 ~ 7`<br>• Color 10 count = reading. |
| `cam.x(11)` | Color 11 X | `0, 5 ~ 155`<br>• Color 11 X = reading. |
| `cam.y(11)` | Color 11 Y | `0, 5 ~ 115`<br>• Color 11 Y = reading. |
| `cam.cell(11)[0]` | Color 11 cell X | `0, 1 ~ 16`<br>• Color 11 cell X = reading. |
| `cam.cell(11)[1]` | Color 11 cell Y | `0, 1 ~ 12`<br>• Color 11 cell Y = reading. |
| `cam.count(11)` | Color 11 count | `0 ~ 7`<br>• Color 11 count = reading. |
| `cam.x(12)` | Color 12 X | `0, 5 ~ 155`<br>• Color 12 X = reading. |
| `cam.y(12)` | Color 12 Y | `0, 5 ~ 115`<br>• Color 12 Y = reading. |
| `cam.cell(12)[0]` | Color 12 cell X | `0, 1 ~ 16`<br>• Color 12 cell X = reading. |
| `cam.cell(12)[1]` | Color 12 cell Y | `0, 1 ~ 12`<br>• Color 12 cell Y = reading. |
| `cam.count(12)` | Color 12 count | `0 ~ 7`<br>• Color 12 count = reading. |
| `cam.x(13)` | Color 13 X | `0, 5 ~ 155`<br>• Color 13 X = reading. |
| `cam.y(13)` | Color 13 Y | `0, 5 ~ 115`<br>• Color 13 Y = reading. |
| `cam.cell(13)[0]` | Color 13 cell X | `0, 1 ~ 16`<br>• Color 13 cell X = reading. |
| `cam.cell(13)[1]` | Color 13 cell Y | `0, 1 ~ 12`<br>• Color 13 cell Y = reading. |
| `cam.count(13)` | Color 13 count | `0 ~ 7`<br>• Color 13 count = reading. |
| `cam.x(14)` | Color 14 X | `0, 5 ~ 155`<br>• Color 14 X = reading. |
| `cam.y(14)` | Color 14 Y | `0, 5 ~ 115`<br>• Color 14 Y = reading. |
| `cam.cell(14)[0]` | Color 14 cell X | `0, 1 ~ 16`<br>• Color 14 cell X = reading. |
| `cam.cell(14)[1]` | Color 14 cell Y | `0, 1 ~ 12`<br>• Color 14 cell Y = reading. |
| `cam.count(14)` | Color 14 count | `0 ~ 7`<br>• Color 14 count = reading. |
| `cam.colors_found()` | Colors found | `0 ~ 15`<br>• Colors found = reading. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Library provides: 7 color positions and counts`

::: info ℹ️ Reading notes
- Position (0, 0) means no target. Check for a target before using coordinates.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.x(1)` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `cam.y(1)` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `cam.count(1)` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `cam.x(2)` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `cam.y(2)` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `cam.count(2)` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `cam.x(3)` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `cam.y(3)` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `cam.count(3)` | Color 3 count | `0 ~ 15`<br>• Color 3 count = reading. |
| `cam.x(4)` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `cam.y(4)` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `cam.count(4)` | Color 4 count | `0 ~ 15`<br>• Color 4 count = reading. |
| `cam.x(5)` | Color 5 X | `0 ~ 159`<br>• Color 5 X = reading. |
| `cam.y(5)` | Color 5 Y | `0 ~ 119`<br>• Color 5 Y = reading. |
| `cam.count(5)` | Color 5 count | `0 ~ 15`<br>• Color 5 count = reading. |
| `cam.x(6)` | Color 6 X | `0 ~ 159`<br>• Color 6 X = reading. |
| `cam.y(6)` | Color 6 Y | `0 ~ 119`<br>• Color 6 Y = reading. |
| `cam.count(6)` | Color 6 count | `0 ~ 15`<br>• Color 6 count = reading. |
| `cam.x(7)` | Color 7 X | `0 ~ 159`<br>• Color 7 X = reading. |
| `cam.y(7)` | Color 7 Y | `0 ~ 119`<br>• Color 7 Y = reading. |
| `cam.count(7)` | Color 7 count | `0 ~ 15`<br>• Color 7 count = reading. |
| `cam.colors_found()` | Colors found | `0 ~ 15`<br>• Colors found = reading. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Library provides: 4 color positions and counts, area`

::: info ℹ️ Reading notes
- Position (0, 0) means no target. Check for a target before using coordinates.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.x(1)` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `cam.y(1)` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `cam.count(1)` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `cam.area(1)` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `cam.x(2)` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `cam.y(2)` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `cam.count(2)` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `cam.area(2)` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `cam.x(3)` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `cam.y(3)` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `cam.count(3)` | Color 3 count | `0 ~ 15`<br>• Color 3 count = reading. |
| `cam.area(3)` | Color 3 area | `0 ~ 100`<br>• Color 3 area = reading. |
| `cam.x(4)` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `cam.y(4)` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `cam.count(4)` | Color 4 count | `0 ~ 15`<br>• Color 4 count = reading. |
| `cam.area(4)` | Color 4 area | `0 ~ 100`<br>• Color 4 area = reading. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Library provides: 2 color positions and counts, area and size`

::: info ℹ️ Reading notes
- Position (0, 0) means no target. Check for a target before using coordinates.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.x(1)` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `cam.y(1)` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `cam.size(1)[0]` | Color 1 W | `0 ~ 160`<br>• Color 1 W = reading. |
| `cam.size(1)[1]` | Color 1 H | `0 ~ 120`<br>• Color 1 H = reading. |
| `cam.count(1)` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `cam.area(1)` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `cam.x(2)` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `cam.y(2)` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `cam.size(2)[0]` | Color 2 W | `0 ~ 160`<br>• Color 2 W = reading. |
| `cam.size(2)[1]` | Color 2 H | `0 ~ 120`<br>• Color 2 H = reading. |
| `cam.count(2)` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `cam.area(2)` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `cam.colors_found()` | Colors found | `0 ~ 16`<br>• Colors found = reading. |

</CamModeSection>

#### Mode 2 - Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Library provides: 14 points: hue`

::: info ℹ️ Reading notes
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.hue(1)` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `cam.hue(2)` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `cam.hue(3)` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `cam.hue(4)` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `cam.hue(5)` | S5 hue | `0 ~ 255`<br>• S5 hue = reading. |
| `cam.hue(6)` | S6 hue | `0 ~ 255`<br>• S6 hue = reading. |
| `cam.hue(7)` | S7 hue | `0 ~ 255`<br>• S7 hue = reading. |
| `cam.hue(8)` | S8 hue | `0 ~ 255`<br>• S8 hue = reading. |
| `cam.hue(9)` | S9 hue | `0 ~ 255`<br>• S9 hue = reading. |
| `cam.hue(10)` | S10 hue | `0 ~ 255`<br>• S10 hue = reading. |
| `cam.hue(11)` | S11 hue | `0 ~ 255`<br>• S11 hue = reading. |
| `cam.hue(12)` | S12 hue | `0 ~ 255`<br>• S12 hue = reading. |
| `cam.hue(13)` | S13 hue | `0 ~ 255`<br>• S13 hue = reading. |
| `cam.hue(14)` | S14 hue | `0 ~ 255`<br>• S14 hue = reading. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Library provides: 7 points: hue, saturation`

::: info ℹ️ Reading notes
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.hue(1)` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `cam.sat(1)` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `cam.hue(2)` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `cam.sat(2)` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `cam.hue(3)` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `cam.sat(3)` | S3 saturation | `0 ~ 100`<br>• S3 saturation = reading. |
| `cam.hue(4)` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `cam.sat(4)` | S4 saturation | `0 ~ 100`<br>• S4 saturation = reading. |
| `cam.hue(5)` | S5 hue | `0 ~ 255`<br>• S5 hue = reading. |
| `cam.sat(5)` | S5 saturation | `0 ~ 100`<br>• S5 saturation = reading. |
| `cam.hue(6)` | S6 hue | `0 ~ 255`<br>• S6 hue = reading. |
| `cam.sat(6)` | S6 saturation | `0 ~ 100`<br>• S6 saturation = reading. |
| `cam.hue(7)` | S7 hue | `0 ~ 255`<br>• S7 hue = reading. |
| `cam.sat(7)` | S7 saturation | `0 ~ 100`<br>• S7 saturation = reading. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Library provides: 4 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.hue(1)` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `cam.sat(1)` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `cam.val(1)` | S1 value | `0 ~ 100`<br>• S1 value = reading. |
| `cam.hue(2)` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `cam.sat(2)` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `cam.val(2)` | S2 value | `0 ~ 100`<br>• S2 value = reading. |
| `cam.hue(3)` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `cam.sat(3)` | S3 saturation | `0 ~ 100`<br>• S3 saturation = reading. |
| `cam.val(3)` | S3 value | `0 ~ 100`<br>• S3 value = reading. |
| `cam.hue(4)` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `cam.sat(4)` | S4 saturation | `0 ~ 100`<br>• S4 saturation = reading. |
| `cam.val(4)` | S4 value | `0 ~ 100`<br>• S4 value = reading. |

</CamModeSection>

#### Mode 3 - Color order

<CamModeSection mode="30" title="Color order">

`Library provides: the first 13 hues and total block count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Total count can exceed 13, but the list contains at most 13 blocks. Check its length before indexing. Hue 0 can mean red.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.order()[0]` | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| `cam.order()[1]` | Block 2 hue from the left | `0 ~ 255`<br>• Block 2 hue from the left = reading. |
| `cam.order()[2]` | Block 3 hue from the left | `0 ~ 255`<br>• Block 3 hue from the left = reading. |
| `cam.order()[3]` | Block 4 hue from the left | `0 ~ 255`<br>• Block 4 hue from the left = reading. |
| `cam.order()[4]` | Block 5 hue from the left | `0 ~ 255`<br>• Block 5 hue from the left = reading. |
| `cam.order()[5]` | Block 6 hue from the left | `0 ~ 255`<br>• Block 6 hue from the left = reading. |
| `cam.order()[6]` | Block 7 hue from the left | `0 ~ 255`<br>• Block 7 hue from the left = reading. |
| `cam.order()[7]` | Block 8 hue from the left | `0 ~ 255`<br>• Block 8 hue from the left = reading. |
| `cam.order()[8]` | Block 9 hue from the left | `0 ~ 255`<br>• Block 9 hue from the left = reading. |
| `cam.order()[9]` | Block 10 hue from the left | `0 ~ 255`<br>• Block 10 hue from the left = reading. |
| `cam.order()[10]` | Block 11 hue from the left | `0 ~ 255`<br>• Block 11 hue from the left = reading. |
| `cam.order()[11]` | Block 12 hue from the left | `0 ~ 255`<br>• Block 12 hue from the left = reading. |
| `cam.order()[12]` | Block 13 hue from the left | `0 ~ 255`<br>• Block 13 hue from the left = reading. |
| `cam.total()` | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |

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
| `cam.near()` | Near offset | `-100 ~ 100`<br>• Near offset = reading. |
| `cam.mid()` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading. |
| `cam.far()` | Far offset | `-100 ~ 100`<br>• Far offset = reading. |
| `cam.angle()` | Line angle | `-90 ~ 90`<br>• Line angle = reading. |
| `cam.width()` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `cam.flags()` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `cam.junction()` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `cam.junction_dist()` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `cam.edges()[0]` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading. |
| `cam.edges()[1]` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading. |
| `cam.far_width()` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `cam.marker()[0]` | Marker color | `0 ~ 8`<br>• Marker color = reading. |
| `cam.marker()[1]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `cam.lost()` | Last lost side | `0 ~ 2`<br>• Last lost side = reading. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Last lost side: 0 on line, 1 left, 2 right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.near()` | Near offset | `-100 ~ 100`<br>• Near offset = reading. |
| `cam.mid()` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading. |
| `cam.far()` | Far offset | `-100 ~ 100`<br>• Far offset = reading. |
| `cam.angle()` | Line angle | `-90 ~ 90`<br>• Line angle = reading. |
| `cam.width()` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `cam.flags()` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `cam.junction()` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `cam.junction_dist()` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `cam.edges()[0]` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading. |
| `cam.edges()[1]` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading. |
| `cam.far_width()` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `cam.marker()[0]` | Marker color | `0 ~ 8`<br>• Marker color = reading. |
| `cam.marker()[1]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `cam.lost()` | Last lost side | `0 ~ 2`<br>• Last lost side = reading. |

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
| `cam.near()` | Near offset | `-100 ~ 100`<br>• Near offset = reading. |
| `cam.mid()` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading. |
| `cam.far()` | Far offset | `-100 ~ 100`<br>• Far offset = reading. |
| `cam.angle()` | Line angle | `-90 ~ 90`<br>• Line angle = reading. |
| `cam.width()` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `cam.flags()` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `cam.junction()` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `cam.junction_dist()` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `cam.edges()[0]` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading. |
| `cam.edges()[1]` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading. |
| `cam.far_width()` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `cam.marker()[0]` | Marker color | `0 ~ 8`<br>• Marker color = reading. |
| `cam.marker()[1]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `cam.lost()` | Last lost side | `0 ~ 2`<br>• Last lost side = reading. |

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
| `cam.object_count()` | Object count | `0 ~ 8`<br>• Object count = reading. |
| `cam.object(1)` | Object 1 code | `0, 10 ~ 89`<br>• Object 1 code = reading. |
| `cam.object_color(1)` | Object 1 color ID | `0 ~ 8`<br>• Object 1 color ID = reading. |
| `cam.object_shape(1)` | Object 1 shape code | `0 ~ 9`<br>• Object 1 shape code = reading. |
| `cam.object_xy(1)[0]` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `cam.object_xy(1)[1]` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `cam.object(2)` | Object 2 code | `0, 10 ~ 89`<br>• Object 2 code = reading. |
| `cam.object_color(2)` | Object 2 color ID | `0 ~ 8`<br>• Object 2 color ID = reading. |
| `cam.object_shape(2)` | Object 2 shape code | `0 ~ 9`<br>• Object 2 shape code = reading. |
| `cam.object_xy(2)[0]` | Object 2 X | `0 ~ 159`<br>• Object 2 X = reading. |
| `cam.object_xy(2)[1]` | Object 2 Y | `0 ~ 119`<br>• Object 2 Y = reading. |
| `cam.object(3)` | Object 3 code | `0, 10 ~ 89`<br>• Object 3 code = reading. |
| `cam.object_color(3)` | Object 3 color ID | `0 ~ 8`<br>• Object 3 color ID = reading. |
| `cam.object_shape(3)` | Object 3 shape code | `0 ~ 9`<br>• Object 3 shape code = reading. |
| `cam.object_xy(3)[0]` | Object 3 X | `0 ~ 159`<br>• Object 3 X = reading. |
| `cam.object_xy(3)[1]` | Object 3 Y | `0 ~ 119`<br>• Object 3 Y = reading. |
| `cam.object(4)` | Object 4 code | `0, 10 ~ 89`<br>• Object 4 code = reading. |
| `cam.object_color(4)` | Object 4 color ID | `0 ~ 8`<br>• Object 4 color ID = reading. |
| `cam.object_shape(4)` | Object 4 shape code | `0 ~ 9`<br>• Object 4 shape code = reading. |
| `cam.object_xy(4)[0]` | Object 4 X | `0 ~ 159`<br>• Object 4 X = reading. |
| `cam.object_xy(4)[1]` | Object 4 Y | `0 ~ 119`<br>• Object 4 Y = reading. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Library provides: the first 2 objects: position, size and area`

::: info ℹ️ Reading notes
- Only target colors 1 ~ 8 are used. Objects are sorted by decreasing area. Code = color ID × 10 + shape code; 0 means no object. Check for an object before using its data.
- Shape codes 0 ~ 9: other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star, trapezoid.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.object(1)` | Object 1 code | `0, 10 ~ 89`<br>• Object 1 code = reading. |
| `cam.object_color(1)` | Object 1 color ID | `0 ~ 8`<br>• Object 1 color ID = reading. |
| `cam.object_shape(1)` | Object 1 shape code | `0 ~ 9`<br>• Object 1 shape code = reading. |
| `cam.object_xy(1)[0]` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `cam.object_xy(1)[1]` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `cam.object_size(1)[0]` | Object 1 W | `0 ~ 160`<br>• Object 1 W = reading. |
| `cam.object_size(1)[1]` | Object 1 H | `0 ~ 120`<br>• Object 1 H = reading. |
| `cam.object_area(1)` | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| `cam.object(2)` | Object 2 code | `0, 10 ~ 89`<br>• Object 2 code = reading. |
| `cam.object_color(2)` | Object 2 color ID | `0 ~ 8`<br>• Object 2 color ID = reading. |
| `cam.object_shape(2)` | Object 2 shape code | `0 ~ 9`<br>• Object 2 shape code = reading. |
| `cam.object_xy(2)[0]` | Object 2 X | `0 ~ 159`<br>• Object 2 X = reading. |
| `cam.object_xy(2)[1]` | Object 2 Y | `0 ~ 119`<br>• Object 2 Y = reading. |
| `cam.object_size(2)[0]` | Object 2 W | `0 ~ 160`<br>• Object 2 W = reading. |
| `cam.object_size(2)[1]` | Object 2 H | `0 ~ 120`<br>• Object 2 H = reading. |
| `cam.object_area(2)` | Object 2 area | `0 ~ 100`<br>• Object 2 area = reading. |

</CamModeSection>

</CamModeAccordion>

### ✔ Advanced control example

Teach target color 1 and run this complete mode 13 example. The library decodes position, area and count.

```python
from pybricks.parameters import Port
from pybricks.tools import wait
from MBC_UniCam import UniCam

cam = UniCam(Port.C, mode=13)

while True:
    position = cam.xy(1)
    if not cam.sensor_ok() or position is None:
        print("Camera not connected")
    elif position == (0, 0):
        print("No target")
    else:
        print("Color 1:", position, "Area:", cam.area(1), "Count:", cam.count(1))
    wait(100)
```

### ✔ Switching modes and reading other data

Use each snippet as an alternative reading flow. Select a mode before entering its loop and keep each loop consistent with that mode.

```python
cam.set_mode(11)
position = cam.xy(1)
cell = cam.cell(1)
count = cam.count(1)
print(position, cell, count)

cam.set_mode(23)
print(cam.hsv(1))

cam.set_mode(41)
print(cam.near(), cam.far(), cam.angle(), cam.junction())

cam.set_mode(52)
if cam.object_found(1):
    print(cam.object(1), cam.object_xy(1), cam.object_size(1), cam.object_area(1))
```

### ✔ Library control and status

| Method | Purpose |
| --- | --- |
| `cam.set_mode(13)` | Select the requested Mode ID. |
| `cam.sensor_ok()` | Check whether the most recent read succeeded. |
| `cam.mode_number()` | Get the configured Mode ID. |
| `cam.device_id()` | Read address, hardware code and firmware word. |
| `cam.is_unicam()` | Check the camera identity. |
| `cam.firmware_version()` | Read (major, minor) firmware version. |
| `cam.max_color() / cam.max_point() / cam.max_object()` | Read the supported color, point or object count for the selected mode. |
| `cam.light(50)` | Lamp level 0 ~ 100; light(None) uses the camera menu setting. |
| `cam.teach(1) / cam.clear(1)` | Teach from the image center or clear a target, index 1 ~ 16. |
| `cam.target_range(1, hue=20, sat=10, size=10, search=2)` | Set hue tolerance 1 ~ 119, saturation tolerance 0 ~ 31, minimum area 4 ~ 254 and search behavior of a taught target. 255 keeps a value; search 0 keeps, 1 locks, 2 selects the largest blob. |
| `cam.shape_tolerance(3) / cam.target_shape(1, 3)` | Shape tolerance 1 ~ 5; expected shape 0 ~ 9 for target 1 ~ 8, with 0 meaning any. |
| `cam.camera_setting(item, value)` | Setup item 0 ~ 12 follows camera menu order; a setting can be negative. |
| `cam.white_cal()` | Fill the image center with white paper before calibrating white. |
| `cam.power(0)` | 0 full speed, 1 power saving, 2 standby; waking takes 1 ~ 2.5 seconds. |
| `cam.cmd(code, *parameters) / cam.busy() / cam.wait_done()` | Send a command, check busy status or wait for completion. Avoid repeated status checks inside the reading loop. |

Command completion: 0 done, 2 failed, 3 rejected, `None` no completion result. `cmd()` returns a sequence number and `busy()` returns a boolean.

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
