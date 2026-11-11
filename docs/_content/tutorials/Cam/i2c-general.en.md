# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | Arduino UNO / Nano / UNO R4 / ESP32 |
| Sensor | MBC UniCam Vision Camera Sensor (General I²C edition) |
| Programming environment | Arduino IDE (C++) |

### ✔ Before you begin

1. Start your development board and open Arduino IDE.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

::: warning ⚠️ Before wiring
The v1 data layout is defined, with Arduino hardware validation pending. Camera-side SDA = IO3 and SCL = IO1 are provisional. Verify your unit and compatible logic levels before wiring.
:::

| Camera | UNO / Nano | UNO R4 / ESP32 |
| --- | --- | --- |
| 5V | 5V | Verify a suitable 5V supply |
| GND | GND | GND |
| SDA | A4 | Board SDA |
| SCL | A5 | Board SCL |

## 02 / Functions and data

::: info ℹ️ Reading notes
- Use the general I²C firmware at default address 0x4C. The values indexes below refer to the int16 array returned by readCamera() in the example. Field 0x10 starts the first record. Use command E0 to select a mode and E1 to set sample positions.
- values is the int16 array returned by readCamera(). Values such as 0x10 identify data fields. Each field sends two bytes, low byte first. Preserve signed line values without adding or subtracting 100.
- Write the start field, wait 2 ms, then read low-byte-first int16 values. Read at most 16 values per request. `-32768` means the field is unavailable in the current mode.
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

`I2C provides: 16 color positions`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- The table shows record 1 of 16. Record i begins at `0x10 + 2 × (i - 1)`. Read 2 int16 values per record; the values indices restart at 0 for each read.
- Read the count separately: declare `int16_t total;`, then call `readCamera(0x30, 1, &total)`.
- Read the main fields with `readCamera(0x10, 2, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `values[1]`<br>`0x11` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `0x30` (read separately) | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`I2C provides: 16 color positions, counts`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- The table shows record 1 of 16. Record i begins at `0x10 + 3 × (i - 1)`. Read 3 int16 values per record; the values indices restart at 0 for each read.
- Read the count separately: declare `int16_t total;`, then call `readCamera(0x40, 1, &total)`.
- Read the main fields with `readCamera(0x10, 3, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `values[1]`<br>`0x11` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `values[2]`<br>`0x12` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `0x40` (read separately) | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`I2C provides: 16 color positions, counts and area`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- The table shows record 1 of 16. Record i begins at `0x10 + 4 × (i - 1)`. Read 4 int16 values per record; the values indices restart at 0 for each read.
- Read the count separately: declare `int16_t total;`, then call `readCamera(0x50, 1, &total)`.
- Read the main fields with `readCamera(0x10, 4, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `values[1]`<br>`0x11` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `values[2]`<br>`0x12` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `values[3]`<br>`0x13` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `0x50` (read separately) | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`I2C provides: 16 color positions and sizes, counts and area`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- The table shows record 1 of 16. Record i begins at `0x10 + 6 × (i - 1)`. Read 6 int16 values per record; the values indices restart at 0 for each read.
- Read the count separately: declare `int16_t total;`, then call `readCamera(0x70, 1, &total)`.
- Read the main fields with `readCamera(0x10, 6, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `values[1]`<br>`0x11` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `values[2]`<br>`0x12` | Color 1 W | `0 ~ 160`<br>• Color 1 W = reading. |
| `values[3]`<br>`0x13` | Color 1 H | `0 ~ 120`<br>• Color 1 H = reading. |
| `values[4]`<br>`0x14` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `values[5]`<br>`0x15` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `0x70` (read separately) | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`I2C provides: 16 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- The table shows record 1 of 16. Record i begins at `0x10 + 1 × (i - 1)`. Read 1 int16 values per record; the values indices restart at 0 for each read.
- Read the main fields with `readCamera(0x10, 1, values)`. The shared read helper appears in section 03.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`I2C provides: 16 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- The table shows record 1 of 16. Record i begins at `0x10 + 2 × (i - 1)`. Read 2 int16 values per record; the values indices restart at 0 for each read.
- Read the main fields with `readCamera(0x10, 2, values)`. The shared read helper appears in section 03.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `values[1]`<br>`0x11` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`I2C provides: 16 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- The table shows record 1 of 16. Record i begins at `0x10 + 3 × (i - 1)`. Read 3 int16 values per record; the values indices restart at 0 for each read.
- Read the main fields with `readCamera(0x10, 3, values)`. The shared read helper appears in section 03.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `values[1]`<br>`0x11` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `values[2]`<br>`0x12` | S1 value | `0 ~ 100`<br>• S1 value = reading. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`I2C provides: the first 16 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
- Read the count separately: declare `int16_t total;`, then call `readCamera(0x20, 1, &total)`.
- Read the main fields with `readCamera(0x10, 16, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| `values[1]`<br>`0x11` | Block 2 hue from the left | `0 ~ 255`<br>• Block 2 hue from the left = reading. |
| `values[2]`<br>`0x12` | Block 3 hue from the left | `0 ~ 255`<br>• Block 3 hue from the left = reading. |
| `values[3]`<br>`0x13` | Block 4 hue from the left | `0 ~ 255`<br>• Block 4 hue from the left = reading. |
| `values[4]`<br>`0x14` | Block 5 hue from the left | `0 ~ 255`<br>• Block 5 hue from the left = reading. |
| `values[5]`<br>`0x15` | Block 6 hue from the left | `0 ~ 255`<br>• Block 6 hue from the left = reading. |
| `values[6]`<br>`0x16` | Block 7 hue from the left | `0 ~ 255`<br>• Block 7 hue from the left = reading. |
| `values[7]`<br>`0x17` | Block 8 hue from the left | `0 ~ 255`<br>• Block 8 hue from the left = reading. |
| `values[8]`<br>`0x18` | Block 9 hue from the left | `0 ~ 255`<br>• Block 9 hue from the left = reading. |
| `values[9]`<br>`0x19` | Block 10 hue from the left | `0 ~ 255`<br>• Block 10 hue from the left = reading. |
| `values[10]`<br>`0x1A` | Block 11 hue from the left | `0 ~ 255`<br>• Block 11 hue from the left = reading. |
| `values[11]`<br>`0x1B` | Block 12 hue from the left | `0 ~ 255`<br>• Block 12 hue from the left = reading. |
| `values[12]`<br>`0x1C` | Block 13 hue from the left | `0 ~ 255`<br>• Block 13 hue from the left = reading. |
| `values[13]`<br>`0x1D` | Block 14 hue from the left | `0 ~ 255`<br>• Block 14 hue from the left = reading. |
| `values[14]`<br>`0x1E` | Block 15 hue from the left | `0 ~ 255`<br>• Block 15 hue from the left = reading. |
| `values[15]`<br>`0x1F` | Block 16 hue from the left | `0 ~ 255`<br>• Block 16 hue from the left = reading. |
| `0x20` (read separately) | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`I2C provides: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- Negative offsets place the line on the left; positive offsets place it on the right.
- Read the main fields with `readCamera(0x10, 14, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `values[1]`<br>`0x11` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `values[2]`<br>`0x12` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `values[3]`<br>`0x13` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `values[4]`<br>`0x14` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `values[5]`<br>`0x15` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `values[6]`<br>`0x16` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `values[7]`<br>`0x17` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `values[8]`<br>`0x18` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `values[9]`<br>`0x19` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `values[10]`<br>`0x1A` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `values[11]`<br>`0x1B` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `values[12]`<br>`0x1C` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `values[13]`<br>`0x1D` | Last lost-line direction | `0 ~ 2`<br>• Last lost-line direction = reading.<br>• 0 line present, 1 last lost to the left, 2 last lost to the right. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`I2C provides: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- Negative offsets place the line on the left; positive offsets place it on the right.
- Read the main fields with `readCamera(0x10, 14, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `values[1]`<br>`0x11` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `values[2]`<br>`0x12` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `values[3]`<br>`0x13` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `values[4]`<br>`0x14` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `values[5]`<br>`0x15` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `values[6]`<br>`0x16` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `values[7]`<br>`0x17` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `values[8]`<br>`0x18` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `values[9]`<br>`0x19` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `values[10]`<br>`0x1A` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `values[11]`<br>`0x1B` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `values[12]`<br>`0x1C` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `values[13]`<br>`0x1D` | Last lost-line direction | `0 ~ 2`<br>• Last lost-line direction = reading.<br>• 0 line present, 1 last lost to the left, 2 last lost to the right. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`I2C provides: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- Negative offsets place the line on the left; positive offsets place it on the right.
- Read the main fields with `readCamera(0x10, 14, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `values[1]`<br>`0x11` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `values[2]`<br>`0x12` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `values[3]`<br>`0x13` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `values[4]`<br>`0x14` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `values[5]`<br>`0x15` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `values[6]`<br>`0x16` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `values[7]`<br>`0x17` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `values[8]`<br>`0x18` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `values[9]`<br>`0x19` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `values[10]`<br>`0x1A` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `values[11]`<br>`0x1B` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `values[12]`<br>`0x1C` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `values[13]`<br>`0x1D` | Last lost-line direction | `0 ~ 2`<br>• Last lost-line direction = reading.<br>• 0 line present, 1 last lost to the left, 2 last lost to the right. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`I2C provides: color IDs, shapes and positions of the first 8 objects, plus total count`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- The table shows record 1 of 8. Record i begins at `0x10 + 4 × (i - 1)`. Read 4 int16 values per record; the values indices restart at 0 for each read.
- Read the count separately: declare `int16_t total;`, then call `readCamera(0x30, 1, &total)`.
- Read the main fields with `readCamera(0x10, 4, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Object 1 color ID | `0 ~ 8`<br>• Object 1 color ID = reading. |
| `values[1]`<br>`0x11` | Object 1 shape code | `0 ~ 9`<br>• Object 1 shape code = reading. |
| `values[2]`<br>`0x12` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `values[3]`<br>`0x13` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `0x30` (read separately) | Object count | `0 ~ 8`<br>• Object count = reading. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`I2C provides: details of the first 8 objects`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- The table shows record 1 of 8. Record i begins at `0x10 + 10 × (i - 1)`. Read 10 int16 values per record; the values indices restart at 0 for each read.
- Read the count separately: declare `int16_t total;`, then call `readCamera(0x60, 1, &total)`.
- Read the main fields with `readCamera(0x10, 10, values)`. The shared read helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `values[0]`<br>`0x10` | Object 1 color ID | `0 ~ 8`<br>• Object 1 color ID = reading. |
| `values[1]`<br>`0x11` | Object 1 shape code | `0 ~ 9`<br>• Object 1 shape code = reading. |
| `values[2]`<br>`0x12` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `values[3]`<br>`0x13` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `values[4]`<br>`0x14` | Object 1 W | `0 ~ 160`<br>• Object 1 W = reading. |
| `values[5]`<br>`0x15` | Object 1 H | `0 ~ 120`<br>• Object 1 H = reading. |
| `values[6]`<br>`0x16` | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| `values[7]`<br>`0x17` | Object 1 angle | `0 ~ 179°`<br>• Object 1 angle = reading. |
| `values[8]`<br>`0x18` | Object 1 vertex count | `0 ~ 10`<br>• Object 1 vertex count = reading.<br>• Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, star 10, circle and ellipse 0. |
| `values[9]`<br>`0x19` | Object 1 tracking ID | `0 ~ 255`<br>• Object 1 tracking ID = reading.<br>• The same object retains its ID across frames; 0 means no object. |
| `0x60` (read separately) | Object count | `0 ~ 8`<br>• Object count = reading. |

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

Teach target color 1 on the camera. The program sends E0 [1, 3] once in setup() to select Mode ID 13 (Color tracking - ③ Standard). Set the serial monitor to 115200 baud. Output is X, Y, area %, and count, in that order.

```cpp
#include <Wire.h>
const uint8_t CAMERA = 0x4C;

bool readCamera(uint8_t first, uint8_t count, int16_t *values) {
  if (count == 0 || count > 16) return false;
  Wire.beginTransmission(CAMERA);
  Wire.write(first);
  if (Wire.endTransmission() != 0) return false;
  delay(2);
  uint8_t bytes = 2 * count;
  if (Wire.requestFrom(CAMERA, bytes) != bytes) return false;
  for (uint8_t i = 0; i < count; ++i) {
    uint16_t low = Wire.read();
    uint16_t high = Wire.read();
    uint16_t raw = low | (high << 8);
    values[i] = static_cast<int16_t>(raw);
  }
  return true;
}

bool setCameraMode(uint8_t mode, uint8_t submode) {
  Wire.beginTransmission(CAMERA);
  Wire.write(0xE0);
  Wire.write(mode);
  Wire.write(submode);
  return Wire.endTransmission() == 0;
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  if (!setCameraMode(1, 3)) {
    Serial.println("Camera mode command failed");
  }
  delay(100);
}

void loop() {
  int16_t mode, target[4];
  if (!readCamera(0x01, 1, &mode)) {
    Serial.println("Check camera wiring and address");
  } else if (mode != 13) {
    Serial.println("Select camera mode 13");
  } else if (!readCamera(0x10, 4, target) || target[0] == -32768) {
    Serial.println("Target data unavailable");
  } else if (target[0] == 0) {
    Serial.println("No target");
  } else {
    for (uint8_t i = 0; i < 4; ++i) {
      Serial.print(target[i]);
      Serial.print(' ');
    }
    Serial.println();
  }
  delay(100);
}
```

### ✔ Troubleshooting

- No response: check firmware, shared ground, SDA/SCL, and address.
- Reading - 32768: check the mode at 0x01 before looking up the field.

### ✔ Write commands

| Bytes to send | Purpose |
| --- | --- |
| 0xE0, mode, submode | Select and save a mode. For Object Details, send 0xE0, 5, 2. |
| 0xE1, point, X, Y | Save a sample location. Accepts points 1 ~ 20, X = 0 ~ 159, Y = 0–119. Readout provides 16 points. |
| 0xF8, new address, bitwise complement | Change the I²C address. |
| 0xEF, 0xA5 | Reboot. |

Teach target colors on the camera.

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
