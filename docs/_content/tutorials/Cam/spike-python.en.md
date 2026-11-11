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

## 02 / Functions and data

::: info ℹ️ Reading notes
- Use `PUPDevice(Port.C)`. Select the camera mode on the camera. Transport mode 9 provides the main data; tracking modes 11 and 12 use transport mode 6 for counts.
- In the tables, `data = read_payload()` unpacks mode 9 into 14 bytes; `counts = read_payload(6)` unpacks mode 6 into six bytes. Unpack each int16 low byte first; indices start at 0.
- “reading” means the result of the expression in the first column. `signed_byte()` handles signed bytes and `count_mode11()` handles mode 11 counts. The complete helpers appear once in section 03; no additional library is required.
- Here ÷ means integer division and mod means remainder. Read the data once into a variable, then decode its fields.
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

`Pybricks Python provides: 14 color positions, counts`

::: info ℹ️ Reading notes
- Coordinates use a `16 × 12` grid. X increases rightward and Y downward. Values are grid cells rather than pixels. Position 0 means not found.
- Positions are grid IDs 1 ~ 192. Check for 0 before calculating X and Y; 0 means not found.
- Use `data = read_payload()` for positions and `counts = read_payload(6)` for counts. Each color count occupies three bits; 7 means seven or more. Section 03’s `count_mode11()` combines only the required two bytes, rather than building a 48-bit integer.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | Color 1 position | `0, 1 ~ 192`<br>• Color 1 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 1 X = ((reading - 1) % 16) + 1.<br>• Color 1 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 1 Y = ((reading - 1) // 16) + 1. |
| `data[1]` | Color 2 position | `0, 1 ~ 192`<br>• Color 2 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 2 X = ((reading - 1) % 16) + 1.<br>• Color 2 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 2 Y = ((reading - 1) // 16) + 1. |
| `data[2]` | Color 3 position | `0, 1 ~ 192`<br>• Color 3 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 3 X = ((reading - 1) % 16) + 1.<br>• Color 3 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 3 Y = ((reading - 1) // 16) + 1. |
| `data[3]` | Color 4 position | `0, 1 ~ 192`<br>• Color 4 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 4 X = ((reading - 1) % 16) + 1.<br>• Color 4 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 4 Y = ((reading - 1) // 16) + 1. |
| `data[4]` | Color 5 position | `0, 1 ~ 192`<br>• Color 5 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 5 X = ((reading - 1) % 16) + 1.<br>• Color 5 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 5 Y = ((reading - 1) // 16) + 1. |
| `data[5]` | Color 6 position | `0, 1 ~ 192`<br>• Color 6 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 6 X = ((reading - 1) % 16) + 1.<br>• Color 6 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 6 Y = ((reading - 1) // 16) + 1. |
| `data[6]` | Color 7 position | `0, 1 ~ 192`<br>• Color 7 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 7 X = ((reading - 1) % 16) + 1.<br>• Color 7 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 7 Y = ((reading - 1) // 16) + 1. |
| `data[7]` | Color 8 position | `0, 1 ~ 192`<br>• Color 8 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 8 X = ((reading - 1) % 16) + 1.<br>• Color 8 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 8 Y = ((reading - 1) // 16) + 1. |
| `data[8]` | Color 9 position | `0, 1 ~ 192`<br>• Color 9 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 9 X = ((reading - 1) % 16) + 1.<br>• Color 9 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 9 Y = ((reading - 1) // 16) + 1. |
| `data[9]` | Color 10 position | `0, 1 ~ 192`<br>• Color 10 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 10 X = ((reading - 1) % 16) + 1.<br>• Color 10 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 10 Y = ((reading - 1) // 16) + 1. |
| `data[10]` | Color 11 position | `0, 1 ~ 192`<br>• Color 11 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 11 X = ((reading - 1) % 16) + 1.<br>• Color 11 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 11 Y = ((reading - 1) // 16) + 1. |
| `data[11]` | Color 12 position | `0, 1 ~ 192`<br>• Color 12 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 12 X = ((reading - 1) % 16) + 1.<br>• Color 12 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 12 Y = ((reading - 1) // 16) + 1. |
| `data[12]` | Color 13 position | `0, 1 ~ 192`<br>• Color 13 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 13 X = ((reading - 1) % 16) + 1.<br>• Color 13 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 13 Y = ((reading - 1) // 16) + 1. |
| `data[13]` | Color 14 position | `0, 1 ~ 192`<br>• Color 14 X range: `0, 1 ~ 16`{.code-green}.<br>• Color 14 X = ((reading - 1) % 16) + 1.<br>• Color 14 Y range: `0, 1 ~ 12`{.code-green}.<br>• Color 14 Y = ((reading - 1) // 16) + 1. |
| `count_mode11(counts, 1)` | Color 1 count | `0 ~ 7`<br>• Color 1 count = reading. |
| `count_mode11(counts, 2)` | Color 2 count | `0 ~ 7`<br>• Color 2 count = reading. |
| `count_mode11(counts, 3)` | Color 3 count | `0 ~ 7`<br>• Color 3 count = reading. |
| `count_mode11(counts, 4)` | Color 4 count | `0 ~ 7`<br>• Color 4 count = reading. |
| `count_mode11(counts, 5)` | Color 5 count | `0 ~ 7`<br>• Color 5 count = reading. |
| `count_mode11(counts, 6)` | Color 6 count | `0 ~ 7`<br>• Color 6 count = reading. |
| `count_mode11(counts, 7)` | Color 7 count | `0 ~ 7`<br>• Color 7 count = reading. |
| `count_mode11(counts, 8)` | Color 8 count | `0 ~ 7`<br>• Color 8 count = reading. |
| `count_mode11(counts, 9)` | Color 9 count | `0 ~ 7`<br>• Color 9 count = reading. |
| `count_mode11(counts, 10)` | Color 10 count | `0 ~ 7`<br>• Color 10 count = reading. |
| `count_mode11(counts, 11)` | Color 11 count | `0 ~ 7`<br>• Color 11 count = reading. |
| `count_mode11(counts, 12)` | Color 12 count | `0 ~ 7`<br>• Color 12 count = reading. |
| `count_mode11(counts, 13)` | Color 13 count | `0 ~ 7`<br>• Color 13 count = reading. |
| `count_mode11(counts, 14)` | Color 14 count | `0 ~ 7`<br>• Color 14 count = reading. |
| `count_mode11(counts, 0)` | Colors found | `0 ~ 15`<br>• Colors found = reading. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Pybricks Python provides: 7 color positions, counts`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- Each nibble can represent at most 15.
- Use `data = read_payload()` for positions and `counts = read_payload(6)` for counts. Split each counts byte into high and low four-bit nibbles with division and remainder by 16, as shown below.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `data[1]` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `data[2]` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `data[3]` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `data[4]` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `data[5]` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `data[6]` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `data[7]` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `data[8]` | Color 5 X | `0 ~ 159`<br>• Color 5 X = reading. |
| `data[9]` | Color 5 Y | `0 ~ 119`<br>• Color 5 Y = reading. |
| `data[10]` | Color 6 X | `0 ~ 159`<br>• Color 6 X = reading. |
| `data[11]` | Color 6 Y | `0 ~ 119`<br>• Color 6 Y = reading. |
| `data[12]` | Color 7 X | `0 ~ 159`<br>• Color 7 X = reading. |
| `data[13]` | Color 7 Y | `0 ~ 119`<br>• Color 7 Y = reading. |
| `counts[0]` | Color 1 count and Color 2 count | `0 ~ 255`<br>• Color 1 count = reading // 16.<br>• Color 2 count = reading % 16. |
| `counts[1]` | Color 3 count and Color 4 count | `0 ~ 255`<br>• Color 3 count = reading // 16.<br>• Color 4 count = reading % 16. |
| `counts[2]` | Color 5 count and Color 6 count | `0 ~ 255`<br>• Color 5 count = reading // 16.<br>• Color 6 count = reading % 16. |
| `counts[3]` | Color 7 count and Colors found | `0 ~ 255`<br>• Color 7 count = reading // 16.<br>• Colors found = reading % 16. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Pybricks Python provides: 4 color positions, counts and area`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- Each nibble can represent at most 15.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `data[1]` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `data[2]` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `data[3]` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `data[4]` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `data[5]` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `data[6]` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `data[7]` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `data[8]` | Color 3 area | `0 ~ 100`<br>• Color 3 area = reading. |
| `data[9]` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `data[10]` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `data[11]` | Color 4 area | `0 ~ 100`<br>• Color 4 area = reading. |
| `data[12]` | Color 1 count and Color 2 count | `0 ~ 255`<br>• Color 1 count = reading // 16.<br>• Color 2 count = reading % 16. |
| `data[13]` | Color 3 count and Color 4 count | `0 ~ 255`<br>• Color 3 count = reading // 16.<br>• Color 4 count = reading % 16. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Pybricks Python provides: 2 color positions and sizes, counts and area`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `data[1]` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `data[2]` | Color 1 W | `0 ~ 160`<br>• Color 1 W = reading. |
| `data[3]` | Color 1 H | `0 ~ 120`<br>• Color 1 H = reading. |
| `data[4]` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `data[5]` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `data[6]` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `data[7]` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `data[8]` | Color 2 W | `0 ~ 160`<br>• Color 2 W = reading. |
| `data[9]` | Color 2 H | `0 ~ 120`<br>• Color 2 H = reading. |
| `data[10]` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `data[11]` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `data[12]` | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Pybricks Python provides: 14 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `data[1]` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `data[2]` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `data[3]` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `data[4]` | S5 hue | `0 ~ 255`<br>• S5 hue = reading. |
| `data[5]` | S6 hue | `0 ~ 255`<br>• S6 hue = reading. |
| `data[6]` | S7 hue | `0 ~ 255`<br>• S7 hue = reading. |
| `data[7]` | S8 hue | `0 ~ 255`<br>• S8 hue = reading. |
| `data[8]` | S9 hue | `0 ~ 255`<br>• S9 hue = reading. |
| `data[9]` | S10 hue | `0 ~ 255`<br>• S10 hue = reading. |
| `data[10]` | S11 hue | `0 ~ 255`<br>• S11 hue = reading. |
| `data[11]` | S12 hue | `0 ~ 255`<br>• S12 hue = reading. |
| `data[12]` | S13 hue | `0 ~ 255`<br>• S13 hue = reading. |
| `data[13]` | S14 hue | `0 ~ 255`<br>• S14 hue = reading. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Pybricks Python provides: 7 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `data[1]` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `data[2]` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `data[3]` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `data[4]` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `data[5]` | S3 saturation | `0 ~ 100`<br>• S3 saturation = reading. |
| `data[6]` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `data[7]` | S4 saturation | `0 ~ 100`<br>• S4 saturation = reading. |
| `data[8]` | S5 hue | `0 ~ 255`<br>• S5 hue = reading. |
| `data[9]` | S5 saturation | `0 ~ 100`<br>• S5 saturation = reading. |
| `data[10]` | S6 hue | `0 ~ 255`<br>• S6 hue = reading. |
| `data[11]` | S6 saturation | `0 ~ 100`<br>• S6 saturation = reading. |
| `data[12]` | S7 hue | `0 ~ 255`<br>• S7 hue = reading. |
| `data[13]` | S7 saturation | `0 ~ 100`<br>• S7 saturation = reading. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Pybricks Python provides: 4 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `data[1]` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `data[2]` | S1 value | `0 ~ 100`<br>• S1 value = reading. |
| `data[3]` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `data[4]` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `data[5]` | S2 value | `0 ~ 100`<br>• S2 value = reading. |
| `data[6]` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `data[7]` | S3 saturation | `0 ~ 100`<br>• S3 saturation = reading. |
| `data[8]` | S3 value | `0 ~ 100`<br>• S3 value = reading. |
| `data[9]` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `data[10]` | S4 saturation | `0 ~ 100`<br>• S4 saturation = reading. |
| `data[11]` | S4 value | `0 ~ 100`<br>• S4 value = reading. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`Pybricks Python provides: the first 13 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| `data[1]` | Block 2 hue from the left | `0 ~ 255`<br>• Block 2 hue from the left = reading. |
| `data[2]` | Block 3 hue from the left | `0 ~ 255`<br>• Block 3 hue from the left = reading. |
| `data[3]` | Block 4 hue from the left | `0 ~ 255`<br>• Block 4 hue from the left = reading. |
| `data[4]` | Block 5 hue from the left | `0 ~ 255`<br>• Block 5 hue from the left = reading. |
| `data[5]` | Block 6 hue from the left | `0 ~ 255`<br>• Block 6 hue from the left = reading. |
| `data[6]` | Block 7 hue from the left | `0 ~ 255`<br>• Block 7 hue from the left = reading. |
| `data[7]` | Block 8 hue from the left | `0 ~ 255`<br>• Block 8 hue from the left = reading. |
| `data[8]` | Block 9 hue from the left | `0 ~ 255`<br>• Block 9 hue from the left = reading. |
| `data[9]` | Block 10 hue from the left | `0 ~ 255`<br>• Block 10 hue from the left = reading. |
| `data[10]` | Block 11 hue from the left | `0 ~ 255`<br>• Block 11 hue from the left = reading. |
| `data[11]` | Block 12 hue from the left | `0 ~ 255`<br>• Block 12 hue from the left = reading. |
| `data[12]` | Block 13 hue from the left | `0 ~ 255`<br>• Block 13 hue from the left = reading. |
| `data[13]` | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Pybricks Python provides: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- Negative offsets place the line on the left; positive offsets place it on the right.
- Offsets, angle and left/right edges use `signed_byte()` to restore signed values. Negative values retain directional meaning. The helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `signed_byte(data[0])` | Near offset | `-100 ~ 100`<br>• Near offset = reading. |
| `signed_byte(data[1])` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading. |
| `signed_byte(data[2])` | Far offset | `-100 ~ 100`<br>• Far offset = reading. |
| `signed_byte(data[3])` | Line angle | `-90 ~ 90`<br>• Line angle = reading. |
| `data[4]` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `data[5]` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `data[6]` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `data[7]` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `signed_byte(data[8])` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading. |
| `signed_byte(data[9])` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading. |
| `data[10]` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `data[11]` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `data[12]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `data[13]` | Last lost-line direction | `0 ~ 2`<br>• Last lost-line direction = reading.<br>• 0 line present, 1 last lost to the left, 2 last lost to the right. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Pybricks Python provides: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- Negative offsets place the line on the left; positive offsets place it on the right.
- Offsets, angle and left/right edges use `signed_byte()` to restore signed values. Negative values retain directional meaning. The helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `signed_byte(data[0])` | Near offset | `-100 ~ 100`<br>• Near offset = reading. |
| `signed_byte(data[1])` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading. |
| `signed_byte(data[2])` | Far offset | `-100 ~ 100`<br>• Far offset = reading. |
| `signed_byte(data[3])` | Line angle | `-90 ~ 90`<br>• Line angle = reading. |
| `data[4]` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `data[5]` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `data[6]` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `data[7]` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `signed_byte(data[8])` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading. |
| `signed_byte(data[9])` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading. |
| `data[10]` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `data[11]` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `data[12]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `data[13]` | Last lost-line direction | `0 ~ 2`<br>• Last lost-line direction = reading.<br>• 0 line present, 1 last lost to the left, 2 last lost to the right. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Pybricks Python provides: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- Negative offsets place the line on the left; positive offsets place it on the right.
- Offsets, angle and left/right edges use `signed_byte()` to restore signed values. Negative values retain directional meaning. The helper appears in section 03.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `signed_byte(data[0])` | Near offset | `-100 ~ 100`<br>• Near offset = reading. |
| `signed_byte(data[1])` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading. |
| `signed_byte(data[2])` | Far offset | `-100 ~ 100`<br>• Far offset = reading. |
| `signed_byte(data[3])` | Line angle | `-90 ~ 90`<br>• Line angle = reading. |
| `data[4]` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `data[5]` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `data[6]` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `data[7]` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `signed_byte(data[8])` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading. |
| `signed_byte(data[9])` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading. |
| `data[10]` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `data[11]` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `data[12]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `data[13]` | Last lost-line direction | `0 ~ 2`<br>• Last lost-line direction = reading.<br>• 0 line present, 1 last lost to the left, 2 last lost to the right. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Pybricks Python provides: codes and positions of the first 4 objects, plus total count`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For example, 13 means color 1 triangle; 0 means no object.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | Object count | `0 ~ 8`<br>• Object count = reading. |
| `data[1]` | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| `data[2]` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `data[3]` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `data[4]` | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading // 10.<br>• Object 2 shape code = reading % 10. |
| `data[5]` | Object 2 X | `0 ~ 159`<br>• Object 2 X = reading. |
| `data[6]` | Object 2 Y | `0 ~ 119`<br>• Object 2 Y = reading. |
| `data[7]` | Object 3 code | `0, 10 ~ 89`<br>• Object 3 color ID = reading // 10.<br>• Object 3 shape code = reading % 10. |
| `data[8]` | Object 3 X | `0 ~ 159`<br>• Object 3 X = reading. |
| `data[9]` | Object 3 Y | `0 ~ 119`<br>• Object 3 Y = reading. |
| `data[10]` | Object 4 code | `0, 10 ~ 89`<br>• Object 4 color ID = reading // 10.<br>• Object 4 shape code = reading % 10. |
| `data[11]` | Object 4 X | `0 ~ 159`<br>• Object 4 X = reading. |
| `data[12]` | Object 4 Y | `0 ~ 119`<br>• Object 4 Y = reading. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Pybricks Python provides: details of the first 2 objects`

::: info ℹ️ Reading notes
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- This readout provides color ID, shape, position, size and area for the first two objects. It does not provide object count, angle or vertex count.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `data[0]` | Object 1 color ID | `0 ~ 8`<br>• Object 1 color ID = reading. |
| `data[1]` | Object 1 shape code | `0 ~ 9`<br>• Object 1 shape code = reading. |
| `data[2]` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `data[3]` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `data[4]` | Object 1 W | `0 ~ 160`<br>• Object 1 W = reading. |
| `data[5]` | Object 1 H | `0 ~ 120`<br>• Object 1 H = reading. |
| `data[6]` | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| `data[7]` | Object 2 color ID | `0 ~ 8`<br>• Object 2 color ID = reading. |
| `data[8]` | Object 2 shape code | `0 ~ 9`<br>• Object 2 shape code = reading. |
| `data[9]` | Object 2 X | `0 ~ 159`<br>• Object 2 X = reading. |
| `data[10]` | Object 2 Y | `0 ~ 119`<br>• Object 2 Y = reading. |
| `data[11]` | Object 2 W | `0 ~ 160`<br>• Object 2 W = reading. |
| `data[12]` | Object 2 H | `0 ~ 120`<br>• Object 2 H = reading. |
| `data[13]` | Object 2 area | `0 ~ 100`<br>• Object 2 area = reading. |

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Read color 1 position, area and count

1. Connect the camera to port C, teach target color 1 and select Mode ID 13 (Color tracking - ③ Standard) on the camera.
2. Run the complete program below. Each iteration calls `read_payload()` once and reads `data[0]`, `data[1]`, `data[2]` and `data[12]`.
3. Move the target to check that X increases rightward and Y downward. Moving it out of view displays “No target”.

```python
from pybricks.iodevices import PUPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = PUPDevice(Port.C)


def read_payload(read_mode=9):
    words = cam.read(read_mode)
    if read_mode == 6:
        wait(30)
        words = cam.read(read_mode)
    payload = []
    for word in words:
        payload.extend((word & 255, (word >> 8) & 255))
    return payload


def signed_byte(value):
    return value - 256 if value >= 128 else value


def count_mode11(counts, color):
    if not 0 <= color <= 14:
        raise ValueError("Color index must be 0 ~ 14")
    offset = 3 * (color - 1) if color else 42
    index, shift = divmod(offset, 8)
    pair = counts[index]
    if index + 1 < len(counts):
        pair |= counts[index + 1] << 8
    return (pair >> shift) & (7 if color else 15)


while True:
    data = read_payload()
    if data[0]:
        x, y, area = data[0], data[1], data[2]
        count = data[12] // 16
        print("Color 1:", x, y, "Area:", area, "Count:", count)
    else:
        print("No target")
    wait(100)
```

### ✔ Mode 11: read positions and counts

Select Mode ID 11 on the camera. Keep the imports, camera declaration and three helpers above; replace only the final `while True` block with the following. Count decoding combines at most two bytes at a time to fit the hub’s integer capacity.

```python
while True:
    data = read_payload()
    counts = read_payload(6)
    print("Colors found:", count_mode11(counts, 0))
    for color in range(1, 15):
        grid_id = data[color - 1]
        if grid_id == 0:
            continue
        x = (grid_id - 1) % 16 + 1
        y = (grid_id - 1) // 16 + 1
        print(color, x, y, count_mode11(counts, color))
    wait(100)
```

### ✔ Line mode: read offsets and angle

Select Mode ID 41, 42 or 43 on the camera. Keep the same imports, camera declaration and helpers; replace only the final loop. Offsets and angle follow the signed-byte layout and are not increased by 100.

```python
while True:
    data = read_payload()
    near = signed_byte(data[0])
    far = signed_byte(data[2])
    angle = signed_byte(data[3])
    junction = data[6]
    print(near, far, angle, junction)
    wait(100)
```

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
