# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® MINDSTORMS® Robot Inventor |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE edition) |
| Programming environment | Robot Inventer App |

### ✔ Before you begin

1. Start your robot and open Robot Inventer App.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Functions and data

::: info ℹ️ Reading notes
- The Robot Inventer App treats UniCam as a Color Sensor. The tables below describe its Color, Reflection, and Raw RGB blocks, mainly using an 8 × 6 position grid. Home Python switches to the Education layout and requires different decoding.
- Here ÷ means integer division and mod means remainder. Store readings before decoding. These are Robot Inventer App block layouts; do not apply Education App 256-based packing.
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

`Robot Inventer App blocks provide: 4 color positions`

::: info ℹ️ Reading notes
- Coordinates use a `8 × 6` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
- Positions/sizes use an `8 × 6` grid; X increases rightward and Y downward. 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Color 1 X | `0, 1 ~ 8`<br>• Color 1 X = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Color 1 Y | `0, 1 ~ 6`<br>• Color 1 Y = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Color 2 X and Color 2 Y | `0 ~ 86`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = reading mod 10. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Color 3 X and Color 3 Y | `0 ~ 86`<br>• Color 3 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 3 X = reading ÷ 10.<br>• Color 3 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 3 Y = reading mod 10. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Color 4 X and Color 4 Y | `0 ~ 86`<br>• Color 4 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 4 X = reading ÷ 10.<br>• Color 4 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 4 Y = reading mod 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Robot Inventer App blocks provide: 4 color positions`

::: info ℹ️ Reading notes
- Coordinates use a `8 × 6` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
- Positions/sizes use an `8 × 6` grid; X increases rightward and Y downward. 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Color 1 X | `0, 1 ~ 8`<br>• Color 1 X = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Color 1 Y | `0, 1 ~ 6`<br>• Color 1 Y = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Color 2 X and Color 2 Y | `0 ~ 86`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = reading mod 10. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Color 3 X and Color 3 Y | `0 ~ 86`<br>• Color 3 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 3 X = reading ÷ 10.<br>• Color 3 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 3 Y = reading mod 10. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Color 4 X and Color 4 Y | `0 ~ 86`<br>• Color 4 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 4 X = reading ÷ 10.<br>• Color 4 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 4 Y = reading mod 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Robot Inventer App blocks provide: 4 color positions`

::: info ℹ️ Reading notes
- Coordinates use a `8 × 6` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
- Positions/sizes use an `8 × 6` grid; X increases rightward and Y downward. 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Color 1 X | `0, 1 ~ 8`<br>• Color 1 X = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Color 1 Y | `0, 1 ~ 6`<br>• Color 1 Y = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Color 2 X and Color 2 Y | `0 ~ 86`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = reading mod 10. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Color 3 X and Color 3 Y | `0 ~ 86`<br>• Color 3 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 3 X = reading ÷ 10.<br>• Color 3 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 3 Y = reading mod 10. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Color 4 X and Color 4 Y | `0 ~ 86`<br>• Color 4 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 4 X = reading ÷ 10.<br>• Color 4 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 4 Y = reading mod 10. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Robot Inventer App blocks provide: 2 color positions and sizes`

::: info ℹ️ Reading notes
- Coordinates use a `8 × 6` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
- Positions/sizes use an `8 × 6` grid; X increases rightward and Y downward. 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Color 1 X | `0, 1 ~ 8`<br>• Color 1 X = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Color 1 Y | `0, 1 ~ 6`<br>• Color 1 Y = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Color 2 X and Color 2 Y | `0 ~ 86`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = reading mod 10. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Color 1 W and Color 1 H | `0 ~ 86`<br>• Color 1 W range: `0, 1 ~ 8`{.code-green}.<br>• Color 1 W = reading ÷ 10.<br>• Color 1 H range: `0, 1 ~ 6`{.code-green}.<br>• Color 1 H = reading mod 10. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Color 2 W and Color 2 H | `0 ~ 86`<br>• Color 2 W range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 W = reading ÷ 10.<br>• Color 2 H range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 H = reading mod 10. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Robot Inventer App blocks provide: 4 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- This reduced field can differ by one unit after conversion.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | S4 hue | `0 ~ 127`<br>• S4 hue = reading × 2. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Robot Inventer App blocks provide: 2 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Robot Inventer App blocks provide: 2 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Both retain tens only; digit 9 means about 90 or higher.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | S2 saturation and value | `0 ~ 99`<br>• S2 saturation range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (reading // 10) × 10.<br>• S2 value range: `0 ~ 90`{.code-green}.<br>• S2 value = (reading % 10) × 10. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | S1 saturation and value | `0 ~ 99`<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading // 10) × 10.<br>• S1 value range: `0 ~ 90`{.code-green}.<br>• S1 value = (reading % 10) × 10. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`Robot Inventer App blocks provide: the first 3 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Block 2 hue from the left | `0 ~ 255`<br>• Block 2 hue from the left = reading. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Block 3 hue from the left | `0 ~ 255`<br>• Block 3 hue from the left = reading. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Robot Inventer App blocks provide: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Near offset | `0 ~ 200`<br>• Near offset = reading - 100. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Far offset | `0 ~ 200`<br>• Far offset = reading - 100. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Line angle | `10 ~ 190`<br>• Line angle = reading - 100. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Robot Inventer App blocks provide: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Near offset | `0 ~ 200`<br>• Near offset = reading - 100. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Far offset | `0 ~ 200`<br>• Far offset = reading - 100. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Line angle | `10 ~ 190`<br>• Line angle = reading - 100. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Robot Inventer App blocks provide: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Near offset | `0 ~ 200`<br>• Near offset = reading - 100. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Far offset | `0 ~ 200`<br>• Far offset = reading - 100. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Line angle | `10 ~ 190`<br>• Line angle = reading - 100. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Robot Inventer App blocks provide: codes and positions of the first 2 objects, plus total count`

::: info ℹ️ Reading notes
- Coordinates use a `8 × 6` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
- Positions/sizes use an `8 × 6` grid; X increases rightward and Y downward. 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For example, 13 means color 1 triangle; 0 means no object.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Object count | `0 ~ 8`<br>• Object count = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading // 10.<br>• Object 1 Y = reading % 10. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading // 10.<br>• Object 2 shape code = reading % 10. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Object 2 position | `0, 11 ~ 86`<br>• Object 2 X = reading // 10.<br>• Object 2 Y = reading % 10. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Robot Inventer App blocks provide: details of the first 1 objects`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For example, 13 means color 1 triangle; 0 means no object.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Object count | `0 ~ 8`<br>• Object count = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |

</CamModeSection>

</CamModeAccordion>


## 03 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
