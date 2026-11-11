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

::: info ℹ️ Reading notes
- The official app shows UniCam as a Color Sensor. Use numeric reporter blocks under More Sensors. Select the camera mode on the camera.
- In these tables, ÷ means integer division with the fraction discarded, and mod means remainder. Store each reading before decoding so its fields come from the same frame.
- Area, saturation, value, line width and junction distance are percentages. Their range labels omit the percent sign.
:::

::: warning ⚠️ Note
- Only one camera submode can be active at a time. Set the camera to match your program.
- Different submodes reuse the same sensor blocks; a mismatched mode gives incorrectly interpreted values.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`Stock blocks provide: 7 color positions`

::: info ℹ️ Reading notes
- Coordinates use a `8 × 6` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
- Two color positions share each packed field; this does not limit an image cell to two colors.
- For example, raw green `2634` gives color 4 at X = 2, Y = 6 and color 5 at X = 3, Y = 4. Two colors share a data field; this does not limit each image cell to two colors.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Color 2 position and Color 3 position | `0 ~ 8686`<br>• Color 2 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 2 X = (reading ÷ 100) // 10.<br>• Color 2 Y = (reading ÷ 100) % 10.<br>• Color 3 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 3 X = (reading mod 100) // 10.<br>• Color 3 Y = (reading mod 100) % 10. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Color 4 position and Color 5 position | `0 ~ 8686`<br>• Color 4 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 4 X = (reading ÷ 100) // 10.<br>• Color 4 Y = (reading ÷ 100) % 10.<br>• Color 5 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 5 X = (reading mod 100) // 10.<br>• Color 5 Y = (reading mod 100) % 10. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Color 6 position and Color 7 position | `0 ~ 8686`<br>• Color 6 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 6 X = (reading ÷ 100) // 10.<br>• Color 6 Y = (reading ÷ 100) % 10.<br>• Color 7 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 7 X = (reading mod 100) // 10.<br>• Color 7 Y = (reading mod 100) % 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Stock blocks provide: 7 color positions`

::: info ℹ️ Reading notes
- Coordinates use a `8 × 6` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
- Two color positions share each packed field; this does not limit an image cell to two colors.
- For example, raw green `2634` gives color 4 at X = 2, Y = 6 and color 5 at X = 3, Y = 4. Two colors share a data field; this does not limit each image cell to two colors.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Color 2 position and Color 3 position | `0 ~ 8686`<br>• Color 2 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 2 X = (reading ÷ 100) // 10.<br>• Color 2 Y = (reading ÷ 100) % 10.<br>• Color 3 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 3 X = (reading mod 100) // 10.<br>• Color 3 Y = (reading mod 100) % 10. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Color 4 position and Color 5 position | `0 ~ 8686`<br>• Color 4 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 4 X = (reading ÷ 100) // 10.<br>• Color 4 Y = (reading ÷ 100) % 10.<br>• Color 5 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 5 X = (reading mod 100) // 10.<br>• Color 5 Y = (reading mod 100) % 10. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Color 6 position and Color 7 position | `0 ~ 8686`<br>• Color 6 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 6 X = (reading ÷ 100) // 10.<br>• Color 6 Y = (reading ÷ 100) % 10.<br>• Color 7 position range: `0, 11 ~ 86`{.code-green}.<br>• Color 7 X = (reading mod 100) // 10.<br>• Color 7 Y = (reading mod 100) % 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Stock blocks provide: 4 color positions`

::: info ℹ️ Reading notes
- Coordinates use a `16 × 12` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Color 1 X | `0, 1 ~ 16`<br>• Color 1 X = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Color 1 Y | `0, 1 ~ 12`<br>• Color 1 Y = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Color 2 X and Color 2 Y | `0 ~ 3088`<br>• Color 2 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 2 X = reading mod 256.<br>• Color 2 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 2 Y = reading ÷ 256. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Color 3 X and Color 3 Y | `0 ~ 3088`<br>• Color 3 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 3 X = reading mod 256.<br>• Color 3 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 3 Y = reading ÷ 256. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Color 4 X and Color 4 Y | `0 ~ 3088`<br>• Color 4 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 4 X = reading mod 256.<br>• Color 4 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 4 Y = reading ÷ 256. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Stock blocks provide: 2 color positions and sizes`

::: info ℹ️ Reading notes
- Coordinates use a `16 × 12` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Color 1 X | `0, 1 ~ 16`<br>• Color 1 X = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Color 1 Y | `0, 1 ~ 12`<br>• Color 1 Y = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Color 2 X and Color 2 Y | `0 ~ 3088`<br>• Color 2 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 2 X = reading mod 256.<br>• Color 2 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 2 Y = reading ÷ 256. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Color 1 W and Color 1 H | `0 ~ 3088`<br>• Color 1 W range: `0, 1 ~ 16`{.code-green}.<br>• Color 1 W = reading mod 256.<br>• Color 1 H range: `0, 1 ~ 12`{.code-green}.<br>• Color 1 H = reading ÷ 256. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Color 2 W and Color 2 H | `0 ~ 3088`<br>• Color 2 W range: `0, 1 ~ 16`{.code-green}.<br>• Color 2 W = reading mod 256.<br>• Color 2 H range: `0, 1 ~ 12`{.code-green}.<br>• Color 2 H = reading ÷ 256. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Stock blocks provide: 6 sample hues`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | S1 hue and S2 hue | `0 ~ 65535`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading mod 256.<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = reading ÷ 256. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | S3 hue and S4 hue | `0 ~ 65535`<br>• S3 hue range: `0 ~ 255`{.code-green}.<br>• S3 hue = reading mod 256.<br>• S4 hue range: `0 ~ 255`{.code-green}.<br>• S4 hue = reading ÷ 256. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | S5 hue and S6 hue | `0 ~ 65535`<br>• S5 hue range: `0 ~ 255`{.code-green}.<br>• S5 hue = reading mod 256.<br>• S6 hue range: `0 ~ 255`{.code-green}.<br>• S6 hue = reading ÷ 256. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Stock blocks provide: 3 complete hue/saturation pairs, plus S4 saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | S4 saturation | `0 ~ 100`<br>• S4 saturation = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | S1 hue and S1 saturation | `0 ~ 25855`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading mod 256.<br>• S1 saturation range: `0 ~ 100`{.code-green}.<br>• S1 saturation = reading ÷ 256. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | S2 hue and S2 saturation | `0 ~ 25855`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = reading mod 256.<br>• S2 saturation range: `0 ~ 100`{.code-green}.<br>• S2 saturation = reading ÷ 256. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | S3 hue and S3 saturation | `0 ~ 25855`<br>• S3 hue range: `0 ~ 255`{.code-green}.<br>• S3 hue = reading mod 256.<br>• S3 saturation range: `0 ~ 100`{.code-green}.<br>• S3 saturation = reading ÷ 256. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Stock blocks provide: 3 hue/saturation pairs, plus S1 value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | S1 value | `0 ~ 100`<br>• S1 value = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | S1 hue and S1 saturation | `0 ~ 25855`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading mod 256.<br>• S1 saturation range: `0 ~ 100`{.code-green}.<br>• S1 saturation = reading ÷ 256. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | S2 hue and S2 saturation | `0 ~ 25855`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = reading mod 256.<br>• S2 saturation range: `0 ~ 100`{.code-green}.<br>• S2 saturation = reading ÷ 256. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | S3 hue and S3 saturation | `0 ~ 25855`<br>• S3 hue range: `0 ~ 255`{.code-green}.<br>• S3 hue = reading mod 256.<br>• S3 saturation range: `0 ~ 100`{.code-green}.<br>• S3 saturation = reading ÷ 256. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`Stock blocks provide: the first 6 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Block 1 hue from the left and Block 2 hue from the left | `0 ~ 65535`<br>• Block 1 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 1 hue from the left = reading mod 256.<br>• Block 2 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 2 hue from the left = reading ÷ 256. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Block 3 hue from the left and Block 4 hue from the left | `0 ~ 65535`<br>• Block 3 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 3 hue from the left = reading mod 256.<br>• Block 4 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 4 hue from the left = reading ÷ 256. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Block 5 hue from the left and Block 6 hue from the left | `0 ~ 65535`<br>• Block 5 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 5 hue from the left = reading mod 256.<br>• Block 6 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 6 hue from the left = reading ÷ 256. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Stock blocks provide: 5 line-following fields`

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

`Stock blocks provide: 5 line-following fields`

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

`Stock blocks provide: 5 line-following fields`

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

`Stock blocks provide: codes and positions of the first 3 objects`

::: info ℹ️ Reading notes
- Coordinates use a `8 × 6` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For example, 13 means color 1 triangle; 0 means no object.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Object count | `0 ~ 8`<br>• Object count = reading. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading // 10.<br>• Object 1 Y = reading % 10. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Object 2 code and Object 2 position | `0 ~ 8986`<br>• Object 2 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 2 position range: `0, 11 ~ 86`{.code-green}.<br>• Object 2 color ID = (reading ÷ 100) // 10.<br>• Object 2 shape code = (reading ÷ 100) % 10.<br>• Object 2 X = (reading mod 100) // 10.<br>• Object 2 Y = (reading mod 100) % 10. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Object 3 code and Object 3 position | `0 ~ 8986`<br>• Object 3 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 3 position range: `0, 11 ~ 86`{.code-green}.<br>• Object 3 color ID = (reading ÷ 100) // 10.<br>• Object 3 shape code = (reading ÷ 100) % 10.<br>• Object 3 X = (reading mod 100) // 10.<br>• Object 3 Y = (reading mod 100) % 10. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Stock blocks provide: object 1 position, size and area, plus object 2 code and area`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For example, 13 means color 1 triangle; 0 means no object.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Color value](/images/tutorials/S8/spike-app/color.png) | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| ![Reflected-light value](/images/tutorials/S8/spike-app/reflect.png) | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| ![Raw red](/images/tutorials/S8/spike-app/red.png) | Object 1 X and Object 1 Y | `0 ~ 30623`<br>• Object 1 X range: `0 ~ 159`{.code-green}.<br>• Object 1 X = reading mod 256.<br>• Object 1 Y range: `0 ~ 119`{.code-green}.<br>• Object 1 Y = reading ÷ 256. |
| ![Raw green](/images/tutorials/S8/spike-app/green.png) | Object 1 W and Object 1 H | `0 ~ 30880`<br>• Object 1 W range: `0 ~ 160`{.code-green}.<br>• Object 1 W = reading mod 256.<br>• Object 1 H range: `0 ~ 120`{.code-green}.<br>• Object 1 H = reading ÷ 256. |
| ![Raw blue](/images/tutorials/S8/spike-app/blue.png) | Object 2 code and Object 2 area | `0 ~ 25689`<br>• Object 2 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 2 color ID = (reading mod 256) // 10.<br>• Object 2 shape code = (reading mod 256) % 10.<br>• Object 2 area range: `0 ~ 100`{.code-green}.<br>• Object 2 area = reading ÷ 256. |

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
