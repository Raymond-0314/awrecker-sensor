# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® MINDSTORMS® EV3 |
| Sensor | MBC UniCam Vision Camera Sensor (EV3 edition) |
| Programming environment | Pybricks Python / EV3 MicroPython v2 |

### ✔ Before you begin

1. Start your EV3 and open Pybricks Code (v4) or an EV3 MicroPython v2 project in VS Code.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Functions and data

::: info ℹ️ Reading notes
- Read the camera with LUMPDevice(Port.S1). cam.read(0)[0] reports camera Mode ID, cam.read(1) returns eight Beacon values, and cam.read(2) returns four Remote values. The tables show the exact indexes. Read once into a variable before extracting fields in a loop. Select the camera mode on the camera.
- Here ÷ means integer division and mod means remainder. Camera Mode ID differs from the infrared read mode: camera mode 13 still returns its data through beacon read mode 1.
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

`EV3 Python provides: 12 color positions`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| `cam.read(1)[1]` | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| `cam.read(1)[2]` | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading // 10.<br>• Color 3 Y = reading % 10. |
| `cam.read(1)[3]` | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading // 10.<br>• Color 4 Y = reading % 10. |
| `cam.read(1)[4]` | Color 5 position | `0, 11 ~ 86`<br>• Color 5 X = reading // 10.<br>• Color 5 Y = reading % 10. |
| `cam.read(1)[5]` | Color 6 position | `0, 11 ~ 86`<br>• Color 6 X = reading // 10.<br>• Color 6 Y = reading % 10. |
| `cam.read(1)[6]` | Color 7 position | `0, 11 ~ 86`<br>• Color 7 X = reading // 10.<br>• Color 7 Y = reading % 10. |
| `cam.read(1)[7]` | Color 8 position | `0, 11 ~ 86`<br>• Color 8 X = reading // 10.<br>• Color 8 Y = reading % 10. |
| `cam.read(2)[0]` | Color 9 position | `0, 11 ~ 86`<br>• Color 9 X = reading // 10.<br>• Color 9 Y = reading % 10. |
| `cam.read(2)[1]` | Color 10 position | `0, 11 ~ 86`<br>• Color 10 X = reading // 10.<br>• Color 10 Y = reading % 10. |
| `cam.read(2)[2]` | Color 11 position | `0, 11 ~ 86`<br>• Color 11 X = reading // 10.<br>• Color 11 Y = reading % 10. |
| `cam.read(2)[3]` | Color 12 position | `0, 11 ~ 86`<br>• Color 12 X = reading // 10.<br>• Color 12 Y = reading % 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`EV3 Python provides: 8 color positions`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| `cam.read(1)[1]` | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| `cam.read(1)[2]` | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading // 10.<br>• Color 3 Y = reading % 10. |
| `cam.read(1)[3]` | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading // 10.<br>• Color 4 Y = reading % 10. |
| `cam.read(1)[4]` | Color 5 position | `0, 11 ~ 86`<br>• Color 5 X = reading // 10.<br>• Color 5 Y = reading % 10. |
| `cam.read(1)[5]` | Color 6 position | `0, 11 ~ 86`<br>• Color 6 X = reading // 10.<br>• Color 6 Y = reading % 10. |
| `cam.read(1)[6]` | Color 7 position | `0, 11 ~ 86`<br>• Color 7 X = reading // 10.<br>• Color 7 Y = reading % 10. |
| `cam.read(1)[7]` | Color 8 position | `0, 11 ~ 86`<br>• Color 8 X = reading // 10.<br>• Color 8 Y = reading % 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`EV3 Python provides: 4 color positions and area`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| `cam.read(1)[1]` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `cam.read(1)[2]` | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| `cam.read(1)[3]` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `cam.read(1)[4]` | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading // 10.<br>• Color 3 Y = reading % 10. |
| `cam.read(1)[5]` | Color 3 area | `0 ~ 100`<br>• Color 3 area = reading. |
| `cam.read(1)[6]` | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading // 10.<br>• Color 4 Y = reading % 10. |
| `cam.read(1)[7]` | Color 4 area | `0 ~ 100`<br>• Color 4 area = reading. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`EV3 Python provides: 2 color positions and sizes`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| `cam.read(1)[1]` | Color 1 size | `0, 11 ~ 86`<br>• Color 1 W = reading // 10.<br>• Color 1 H = reading % 10. |
| `cam.read(1)[2]` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `cam.read(1)[3]` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `cam.read(1)[4]` | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| `cam.read(1)[5]` | Color 2 size | `0, 11 ~ 86`<br>• Color 2 W = reading // 10.<br>• Color 2 H = reading % 10. |
| `cam.read(1)[6]` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `cam.read(1)[7]` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`EV3 Python provides: 12 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- -1 ~ -8 represents white through gray; -9 ~ -15 represents black. Do not convert negative values to hue.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | S1 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[1]` | S2 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[2]` | S3 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[3]` | S4 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[4]` | S5 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[5]` | S6 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[6]` | S7 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[7]` | S8 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(2)[0]` | S9 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(2)[1]` | S10 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(2)[2]` | S11 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(2)[3]` | S12 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`EV3 Python provides: 4 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- -1 ~ -8 represents white through gray; -9 ~ -15 represents black. Do not convert negative values to hue.
- Both retain tens only; digit 9 means about 90 or higher.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | S1 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[1]` | S1 saturation and value | `0 ~ 99`<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading // 10) × 10.<br>• S1 value range: `0 ~ 90`{.code-green}.<br>• S1 value = (reading % 10) × 10. |
| `cam.read(1)[2]` | S2 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[3]` | S2 saturation and value | `0 ~ 99`<br>• S2 saturation range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (reading // 10) × 10.<br>• S2 value range: `0 ~ 90`{.code-green}.<br>• S2 value = (reading % 10) × 10. |
| `cam.read(1)[4]` | S3 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[5]` | S3 saturation and value | `0 ~ 99`<br>• S3 saturation range: `0 ~ 90`{.code-green}.<br>• S3 saturation = (reading // 10) × 10.<br>• S3 value range: `0 ~ 90`{.code-green}.<br>• S3 value = (reading % 10) × 10. |
| `cam.read(1)[6]` | S4 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[7]` | S4 saturation and value | `0 ~ 99`<br>• S4 saturation range: `0 ~ 90`{.code-green}.<br>• S4 saturation = (reading // 10) × 10.<br>• S4 value range: `0 ~ 90`{.code-green}.<br>• S4 value = (reading % 10) × 10. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`EV3 Python provides: 2 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Recombine the same point: hue = hundreds × 100 + remainder.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | S1 hue hundreds | `0 ~ 2`<br>• S1 hue hundreds = reading. |
| `cam.read(1)[1]` | S1 hue remainder | `0 ~ 99`<br>• S1 hue remainder = reading. |
| `cam.read(1)[2]` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `cam.read(1)[3]` | S1 value | `0 ~ 100`<br>• S1 value = reading. |
| `cam.read(1)[4]` | S2 hue hundreds | `0 ~ 2`<br>• S2 hue hundreds = reading. |
| `cam.read(1)[5]` | S2 hue remainder | `0 ~ 99`<br>• S2 hue remainder = reading. |
| `cam.read(1)[6]` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `cam.read(1)[7]` | S2 value | `0 ~ 100`<br>• S2 value = reading. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`EV3 Python provides: the first 11 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- -1 ~ -8 represents white through gray; -9 ~ -15 represents black. Do not convert negative values to hue.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Block 1 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[1]` | Block 2 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[2]` | Block 3 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[3]` | Block 4 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[4]` | Block 5 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[5]` | Block 6 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[6]` | Block 7 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(1)[7]` | Block 8 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(2)[0]` | Block 9 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(2)[1]` | Block 10 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(2)[2]` | Block 11 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `cam.read(2)[3]` | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`EV3 Python provides: 12 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `cam.read(1)[1]` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `cam.read(1)[2]` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `cam.read(1)[3]` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `cam.read(1)[4]` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `cam.read(1)[5]` | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading // 10.<br>• Line-found flags = reading % 10. |
| `cam.read(1)[6]` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `cam.read(1)[7]` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `cam.read(2)[0]` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `cam.read(2)[1]` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `cam.read(2)[2]` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `cam.read(2)[3]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`EV3 Python provides: 12 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `cam.read(1)[1]` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `cam.read(1)[2]` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `cam.read(1)[3]` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `cam.read(1)[4]` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `cam.read(1)[5]` | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading // 10.<br>• Line-found flags = reading % 10. |
| `cam.read(1)[6]` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `cam.read(1)[7]` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `cam.read(2)[0]` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `cam.read(2)[1]` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `cam.read(2)[2]` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `cam.read(2)[3]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`EV3 Python provides: 12 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `cam.read(1)[1]` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `cam.read(1)[2]` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `cam.read(1)[3]` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `cam.read(1)[4]` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `cam.read(1)[5]` | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading // 10.<br>• Line-found flags = reading % 10. |
| `cam.read(1)[6]` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `cam.read(1)[7]` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `cam.read(2)[0]` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `cam.read(2)[1]` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `cam.read(2)[2]` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `cam.read(2)[3]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`EV3 Python provides: codes and positions of the first 5 objects, plus total count`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- For example, 13 means color 1 triangle; 0 means no object.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| `cam.read(1)[1]` | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading // 10.<br>• Object 1 Y = reading % 10. |
| `cam.read(1)[2]` | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading // 10.<br>• Object 2 shape code = reading % 10. |
| `cam.read(1)[3]` | Object 2 position | `0, 11 ~ 86`<br>• Object 2 X = reading // 10.<br>• Object 2 Y = reading % 10. |
| `cam.read(1)[4]` | Object 3 code | `0, 10 ~ 89`<br>• Object 3 color ID = reading // 10.<br>• Object 3 shape code = reading % 10. |
| `cam.read(1)[5]` | Object 3 position | `0, 11 ~ 86`<br>• Object 3 X = reading // 10.<br>• Object 3 Y = reading % 10. |
| `cam.read(1)[6]` | Object 4 code | `0, 10 ~ 89`<br>• Object 4 color ID = reading // 10.<br>• Object 4 shape code = reading % 10. |
| `cam.read(1)[7]` | Object 4 position | `0, 11 ~ 86`<br>• Object 4 X = reading // 10.<br>• Object 4 Y = reading % 10. |
| `cam.read(2)[0]` | Object 5 code | `0, 10 ~ 89`<br>• Object 5 color ID = reading // 10.<br>• Object 5 shape code = reading % 10. |
| `cam.read(2)[1]` | Object 5 position | `0, 11 ~ 86`<br>• Object 5 X = reading // 10.<br>• Object 5 Y = reading % 10. |
| `cam.read(2)[3]` | Object count | `0 ~ 8`<br>• Object count = reading. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`EV3 Python provides: details of the first 2 objects`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For example, 13 means color 1 triangle; 0 means no object.
- This reduced field can differ by one unit after conversion.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `cam.read(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `cam.read(1)[0]` | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| `cam.read(1)[1]` | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading // 10.<br>• Object 1 Y = reading % 10. |
| `cam.read(1)[2]` | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| `cam.read(1)[3]` | Object 1 angle | `0 ~ 90`<br>• Object 1 angle = reading × 2, capped at 179°. |
| `cam.read(1)[4]` | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading // 10.<br>• Object 2 shape code = reading % 10. |
| `cam.read(1)[5]` | Object 2 position | `0, 11 ~ 86`<br>• Object 2 X = reading // 10.<br>• Object 2 Y = reading % 10. |
| `cam.read(1)[6]` | Object 2 area | `0 ~ 100`<br>• Object 2 area = reading. |
| `cam.read(1)[7]` | Object 2 angle | `0 ~ 90`<br>• Object 2 angle = reading × 2, capped at 179°. |

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Read target 1 position and area

Teach target color 1 and set the camera to mode 13 (Color Tracking - ③ Standard).

```python
#!/usr/bin/env pybricks-micropython
from pybricks.iodevices import LUMPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = LUMPDevice(Port.S1)
if cam.read(0)[0] != 13:
    raise RuntimeError("Select Color Tracking Standard (13)")

while True:
    position, area = cam.read(1)[:2]
    if position:
        x, y = divmod(position, 10)
        print(x, y, area)
    else:
        print("No target")
    wait(100)
```

For Object Details (52), change the startup mode check to 52. The first four Beacon slots are code, position, area, and half-angle. If code is nonzero, use divmod(code, 10) to split color and shape, and divmod(position, 10) to split the position.

### ✔ Read two objects in Object Details mode

Select camera Mode ID 52. This program calls cam.read(1) once per loop, with four slots per object.

```python
#!/usr/bin/env pybricks-micropython
from pybricks.iodevices import LUMPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = LUMPDevice(Port.S1)
if cam.read(0)[0] != 52:
    raise RuntimeError("Select Object Details (52)")

while True:
    values = cam.read(1)
    for index in range(2):
        start = index * 4
        code, position, area, half_angle = values[start:start + 4]
        if code == 0:
            print(index + 1, "No object")
            continue
        color, shape = divmod(code, 10)
        x, y = divmod(position, 10)
        angle = min(179, half_angle * 2)
        print(index + 1, color, shape, x, y, area, angle)
    wait(100)
```

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
