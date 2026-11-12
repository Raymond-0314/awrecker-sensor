# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® MINDSTORMS® EV3 |
| Sensor | MBC UniCam Vision Camera Sensor (EV3 edition) |
| Programming environment | Pybricks Blocks |

### ✔ Before you begin

1. Start your robot and open Pybricks Blocks.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

::: warning ⚠️ Block readout support
Check that your Pybricks EV3 blocks expose numeric beacon readings. The tables show raw camera fields. See the [Pybricks Python lesson](./ev3-python.md) for full raw readings.
:::

## 02 / Functions and data

::: info ℹ️ Reading notes
- UniCam appears as an Infrared Sensor. Proximity (0) reports camera Mode ID; Beacon (1) has eight slots and Remote (2) has four. Select the camera mode on the camera. The EV3 connection reads data only.
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

`EV3 Pybricks blocks provides: 12 color positions`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading // 10.<br>• Color 3 Y = reading % 10. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading // 10.<br>• Color 4 Y = reading % 10. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 5 position | `0, 11 ~ 86`<br>• Color 5 X = reading // 10.<br>• Color 5 Y = reading % 10. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 6 position | `0, 11 ~ 86`<br>• Color 6 X = reading // 10.<br>• Color 6 Y = reading % 10. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 7 position | `0, 11 ~ 86`<br>• Color 7 X = reading // 10.<br>• Color 7 Y = reading % 10. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 8 position | `0, 11 ~ 86`<br>• Color 8 X = reading // 10.<br>• Color 8 Y = reading % 10. |
| Remote channel 1<br>[Image pending: Pybricks EV3 remote block] | Color 9 position | `0, 11 ~ 86`<br>• Color 9 X = reading // 10.<br>• Color 9 Y = reading % 10. |
| Remote channel 2<br>[Image pending: Pybricks EV3 remote block] | Color 10 position | `0, 11 ~ 86`<br>• Color 10 X = reading // 10.<br>• Color 10 Y = reading % 10. |
| Remote channel 3<br>[Image pending: Pybricks EV3 remote block] | Color 11 position | `0, 11 ~ 86`<br>• Color 11 X = reading // 10.<br>• Color 11 Y = reading % 10. |
| Remote channel 4<br>[Image pending: Pybricks EV3 remote block] | Color 12 position | `0, 11 ~ 86`<br>• Color 12 X = reading // 10.<br>• Color 12 Y = reading % 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`EV3 Pybricks blocks provides: 8 color positions`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading // 10.<br>• Color 3 Y = reading % 10. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading // 10.<br>• Color 4 Y = reading % 10. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 5 position | `0, 11 ~ 86`<br>• Color 5 X = reading // 10.<br>• Color 5 Y = reading % 10. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 6 position | `0, 11 ~ 86`<br>• Color 6 X = reading // 10.<br>• Color 6 Y = reading % 10. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 7 position | `0, 11 ~ 86`<br>• Color 7 X = reading // 10.<br>• Color 7 Y = reading % 10. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 8 position | `0, 11 ~ 86`<br>• Color 8 X = reading // 10.<br>• Color 8 Y = reading % 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`EV3 Pybricks blocks provides: 4 color positions and area`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading // 10.<br>• Color 3 Y = reading % 10. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 3 area | `0 ~ 100`<br>• Color 3 area = reading. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading // 10.<br>• Color 4 Y = reading % 10. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 4 area | `0 ~ 100`<br>• Color 4 area = reading. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`EV3 Pybricks blocks provides: 2 color positions and sizes`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 1 size | `0, 11 ~ 86`<br>• Color 1 W = reading // 10.<br>• Color 1 H = reading % 10. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 2 size | `0, 11 ~ 86`<br>• Color 2 W = reading // 10.<br>• Color 2 H = reading % 10. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`EV3 Pybricks blocks provides: 12 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- -1 ~ -8 represents white through gray; -9 ~ -15 represents black. Do not convert negative values to hue.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S1 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S2 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S3 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S4 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S5 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S6 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S7 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S8 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Remote channel 1<br>[Image pending: Pybricks EV3 remote block] | S9 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Remote channel 2<br>[Image pending: Pybricks EV3 remote block] | S10 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Remote channel 3<br>[Image pending: Pybricks EV3 remote block] | S11 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Remote channel 4<br>[Image pending: Pybricks EV3 remote block] | S12 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`EV3 Pybricks blocks provides: 4 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- -1 ~ -8 represents white through gray; -9 ~ -15 represents black. Do not convert negative values to hue.
- Both retain tens only; digit 9 means about 90 or higher.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S1 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S1 saturation and value | `0 ~ 99`<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading // 10) × 10.<br>• S1 value range: `0 ~ 90`{.code-green}.<br>• S1 value = (reading % 10) × 10. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S2 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S2 saturation and value | `0 ~ 99`<br>• S2 saturation range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (reading // 10) × 10.<br>• S2 value range: `0 ~ 90`{.code-green}.<br>• S2 value = (reading % 10) × 10. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S3 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S3 saturation and value | `0 ~ 99`<br>• S3 saturation range: `0 ~ 90`{.code-green}.<br>• S3 saturation = (reading // 10) × 10.<br>• S3 value range: `0 ~ 90`{.code-green}.<br>• S3 value = (reading % 10) × 10. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S4 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S4 saturation and value | `0 ~ 99`<br>• S4 saturation range: `0 ~ 90`{.code-green}.<br>• S4 saturation = (reading // 10) × 10.<br>• S4 value range: `0 ~ 90`{.code-green}.<br>• S4 value = (reading % 10) × 10. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`EV3 Pybricks blocks provides: 2 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Recombine the same point: hue = hundreds × 100 + remainder.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S1 hue hundreds | `0 ~ 2`<br>• S1 hue hundreds = reading. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S1 hue remainder | `0 ~ 99`<br>• S1 hue remainder = reading. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S1 value | `0 ~ 100`<br>• S1 value = reading. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S2 hue hundreds | `0 ~ 2`<br>• S2 hue hundreds = reading. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S2 hue remainder | `0 ~ 99`<br>• S2 hue remainder = reading. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | S2 value | `0 ~ 100`<br>• S2 value = reading. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`EV3 Pybricks blocks provides: the first 11 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- -1 ~ -8 represents white through gray; -9 ~ -15 represents black. Do not convert negative values to hue.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Block 1 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Block 2 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Block 3 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Block 4 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Block 5 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Block 6 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Block 7 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Block 8 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Remote channel 1<br>[Image pending: Pybricks EV3 remote block] | Block 9 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Remote channel 2<br>[Image pending: Pybricks EV3 remote block] | Block 10 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Remote channel 3<br>[Image pending: Pybricks EV3 remote block] | Block 11 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Remote channel 4<br>[Image pending: Pybricks EV3 remote block] | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`EV3 Pybricks blocks provides: 12 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading // 10.<br>• Line-found flags = reading % 10. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| Remote channel 1<br>[Image pending: Pybricks EV3 remote block] | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| Remote channel 2<br>[Image pending: Pybricks EV3 remote block] | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| Remote channel 3<br>[Image pending: Pybricks EV3 remote block] | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| Remote channel 4<br>[Image pending: Pybricks EV3 remote block] | Marker count | `0 ~ 99`<br>• Marker count = reading. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`EV3 Pybricks blocks provides: 12 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading // 10.<br>• Line-found flags = reading % 10. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| Remote channel 1<br>[Image pending: Pybricks EV3 remote block] | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| Remote channel 2<br>[Image pending: Pybricks EV3 remote block] | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| Remote channel 3<br>[Image pending: Pybricks EV3 remote block] | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| Remote channel 4<br>[Image pending: Pybricks EV3 remote block] | Marker count | `0 ~ 99`<br>• Marker count = reading. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`EV3 Pybricks blocks provides: 12 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading // 10.<br>• Line-found flags = reading % 10. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| Remote channel 1<br>[Image pending: Pybricks EV3 remote block] | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| Remote channel 2<br>[Image pending: Pybricks EV3 remote block] | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| Remote channel 3<br>[Image pending: Pybricks EV3 remote block] | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| Remote channel 4<br>[Image pending: Pybricks EV3 remote block] | Marker count | `0 ~ 99`<br>• Marker count = reading. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`EV3 Pybricks blocks provides: codes and positions of the first 5 objects, plus total count`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- For example, 13 means color 1 triangle; 0 means no object.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading // 10.<br>• Object 1 Y = reading % 10. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading // 10.<br>• Object 2 shape code = reading % 10. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 2 position | `0, 11 ~ 86`<br>• Object 2 X = reading // 10.<br>• Object 2 Y = reading % 10. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 3 code | `0, 10 ~ 89`<br>• Object 3 color ID = reading // 10.<br>• Object 3 shape code = reading % 10. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 3 position | `0, 11 ~ 86`<br>• Object 3 X = reading // 10.<br>• Object 3 Y = reading % 10. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 4 code | `0, 10 ~ 89`<br>• Object 4 color ID = reading // 10.<br>• Object 4 shape code = reading % 10. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 4 position | `0, 11 ~ 86`<br>• Object 4 X = reading // 10.<br>• Object 4 Y = reading % 10. |
| Remote channel 1<br>[Image pending: Pybricks EV3 remote block] | Object 5 code | `0, 10 ~ 89`<br>• Object 5 color ID = reading // 10.<br>• Object 5 shape code = reading % 10. |
| Remote channel 2<br>[Image pending: Pybricks EV3 remote block] | Object 5 position | `0, 11 ~ 86`<br>• Object 5 X = reading // 10.<br>• Object 5 Y = reading % 10. |
| Remote channel 4<br>[Image pending: Pybricks EV3 remote block] | Object count | `0 ~ 8`<br>• Object count = reading. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`EV3 Pybricks blocks provides: details of the first 2 objects`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For example, 13 means color 1 triangle; 0 means no object.
- This reduced field can differ by one unit after conversion.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Proximity (port 1)<br>[Image pending: Pybricks EV3 proximity block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Beacon channel 1 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| Beacon channel 1 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading // 10.<br>• Object 1 Y = reading % 10. |
| Beacon channel 2 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| Beacon channel 2 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 1 angle | `0 ~ 90`<br>• Object 1 angle = reading × 2, capped at 179°. |
| Beacon channel 3 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading // 10.<br>• Object 2 shape code = reading % 10. |
| Beacon channel 3 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 2 position | `0, 11 ~ 86`<br>• Object 2 X = reading // 10.<br>• Object 2 Y = reading % 10. |
| Beacon channel 4 heading<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 2 area | `0 ~ 100`<br>• Object 2 area = reading. |
| Beacon channel 4 distance<br>[Image pending: Pybricks EV3 beacon heading/distance block] | Object 2 angle | `0 ~ 90`<br>• Object 2 angle = reading × 2, capped at 179°. |

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Read target 1 position and area

Teach target color 1 and set the camera to mode 13 (Color Tracking - ③ Standard).

1. Read proximity once at startup and check for 13.
2. In the loop, read Beacon channel 1. Store heading as position and distance as area.
3. If position is 0, display “No target”. Otherwise, split it with integer division and remainder, then display X, Y, and area. For example, 43 and 18 mean X = 4, Y = 3, area 18%.

*[Image pending: complete EV3 Pybricks Blocks block program or project file; the steps above describe the reads and calculations.]*

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
