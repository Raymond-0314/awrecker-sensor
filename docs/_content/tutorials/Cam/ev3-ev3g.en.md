# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® MINDSTORMS® EV3 |
| Sensor | MBC UniCam Vision Camera Sensor (EV3 edition) |
| Programming environment | EV3-G |

### ✔ Before you begin

1. Start your robot and open EV3-G.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Functions and data

::: info ℹ️ Reading notes
- In EV3-G, add an Infrared Sensor block on sensor port 1. Measure → Proximity reports camera Mode ID. Measure → Beacon provides Heading and Proximity outputs for the selected channel. Measure → Remote reads the selected channel. The tables use these EV3-G options.
- Here ÷ means integer division and mod means remainder. Camera Mode ID differs from the infrared read mode: camera mode 13 still returns its data through beacon read mode 1.
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

`EV3-G provides: 12 color positions`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading // 10.<br>• Color 3 Y = reading % 10. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading // 10.<br>• Color 4 Y = reading % 10. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 5 position | `0, 11 ~ 86`<br>• Color 5 X = reading // 10.<br>• Color 5 Y = reading % 10. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 6 position | `0, 11 ~ 86`<br>• Color 6 X = reading // 10.<br>• Color 6 Y = reading % 10. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 7 position | `0, 11 ~ 86`<br>• Color 7 X = reading // 10.<br>• Color 7 Y = reading % 10. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 8 position | `0, 11 ~ 86`<br>• Color 8 X = reading // 10.<br>• Color 8 Y = reading % 10. |
| Measure → Remote channel 1<br>[Image pending: EV3-G remote measurement block] | Color 9 position | `0, 11 ~ 86`<br>• Color 9 X = reading // 10.<br>• Color 9 Y = reading % 10. |
| Measure → Remote channel 2<br>[Image pending: EV3-G remote measurement block] | Color 10 position | `0, 11 ~ 86`<br>• Color 10 X = reading // 10.<br>• Color 10 Y = reading % 10. |
| Measure → Remote channel 3<br>[Image pending: EV3-G remote measurement block] | Color 11 position | `0, 11 ~ 86`<br>• Color 11 X = reading // 10.<br>• Color 11 Y = reading % 10. |
| Measure → Remote channel 4<br>[Image pending: EV3-G remote measurement block] | Color 12 position | `0, 11 ~ 86`<br>• Color 12 X = reading // 10.<br>• Color 12 Y = reading % 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`EV3-G provides: 8 color positions`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading // 10.<br>• Color 3 Y = reading % 10. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading // 10.<br>• Color 4 Y = reading % 10. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 5 position | `0, 11 ~ 86`<br>• Color 5 X = reading // 10.<br>• Color 5 Y = reading % 10. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 6 position | `0, 11 ~ 86`<br>• Color 6 X = reading // 10.<br>• Color 6 Y = reading % 10. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 7 position | `0, 11 ~ 86`<br>• Color 7 X = reading // 10.<br>• Color 7 Y = reading % 10. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 8 position | `0, 11 ~ 86`<br>• Color 8 X = reading // 10.<br>• Color 8 Y = reading % 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`EV3-G provides: 4 color positions and area`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading // 10.<br>• Color 3 Y = reading % 10. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 3 area | `0 ~ 100`<br>• Color 3 area = reading. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading // 10.<br>• Color 4 Y = reading % 10. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 4 area | `0 ~ 100`<br>• Color 4 area = reading. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`EV3-G provides: 2 color positions and sizes`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading // 10.<br>• Color 1 Y = reading % 10. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 1 size | `0, 11 ~ 86`<br>• Color 1 W = reading // 10.<br>• Color 1 H = reading % 10. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading // 10.<br>• Color 2 Y = reading % 10. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 2 size | `0, 11 ~ 86`<br>• Color 2 W = reading // 10.<br>• Color 2 H = reading % 10. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`EV3-G provides: 12 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- -1 ~ -8 represents white through gray; -9 ~ -15 represents black. Do not convert negative values to hue.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | S1 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S2 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | S3 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S4 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | S5 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S6 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | S7 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S8 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Remote channel 1<br>[Image pending: EV3-G remote measurement block] | S9 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Remote channel 2<br>[Image pending: EV3-G remote measurement block] | S10 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Remote channel 3<br>[Image pending: EV3-G remote measurement block] | S11 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Remote channel 4<br>[Image pending: EV3-G remote measurement block] | S12 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`EV3-G provides: 4 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- -1 ~ -8 represents white through gray; -9 ~ -15 represents black. Do not convert negative values to hue.
- Both retain tens only; digit 9 means about 90 or higher.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | S1 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S1 saturation and value | `0 ~ 99`<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading // 10) × 10.<br>• S1 value range: `0 ~ 90`{.code-green}.<br>• S1 value = (reading % 10) × 10. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | S2 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S2 saturation and value | `0 ~ 99`<br>• S2 saturation range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (reading // 10) × 10.<br>• S2 value range: `0 ~ 90`{.code-green}.<br>• S2 value = (reading % 10) × 10. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | S3 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S3 saturation and value | `0 ~ 99`<br>• S3 saturation range: `0 ~ 90`{.code-green}.<br>• S3 saturation = (reading // 10) × 10.<br>• S3 value range: `0 ~ 90`{.code-green}.<br>• S3 value = (reading % 10) × 10. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | S4 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S4 saturation and value | `0 ~ 99`<br>• S4 saturation range: `0 ~ 90`{.code-green}.<br>• S4 saturation = (reading // 10) × 10.<br>• S4 value range: `0 ~ 90`{.code-green}.<br>• S4 value = (reading % 10) × 10. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`EV3-G provides: 2 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Recombine the same point: hue = hundreds × 100 + remainder.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | S1 hue hundreds | `0 ~ 2`<br>• S1 hue hundreds = reading. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S1 hue remainder | `0 ~ 99`<br>• S1 hue remainder = reading. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S1 value | `0 ~ 100`<br>• S1 value = reading. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | S2 hue hundreds | `0 ~ 2`<br>• S2 hue hundreds = reading. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S2 hue remainder | `0 ~ 99`<br>• S2 hue remainder = reading. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | S2 value | `0 ~ 100`<br>• S2 value = reading. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`EV3-G provides: the first 11 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- -1 ~ -8 represents white through gray; -9 ~ -15 represents black. Do not convert negative values to hue.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Block 1 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Block 2 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Block 3 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Block 4 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Block 5 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Block 6 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Block 7 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Block 8 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Remote channel 1<br>[Image pending: EV3-G remote measurement block] | Block 9 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Remote channel 2<br>[Image pending: EV3-G remote measurement block] | Block 10 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Remote channel 3<br>[Image pending: EV3-G remote measurement block] | Block 11 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| Measure → Remote channel 4<br>[Image pending: EV3-G remote measurement block] | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`EV3-G provides: 12 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading // 10.<br>• Line-found flags = reading % 10. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| Measure → Remote channel 1<br>[Image pending: EV3-G remote measurement block] | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| Measure → Remote channel 2<br>[Image pending: EV3-G remote measurement block] | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| Measure → Remote channel 3<br>[Image pending: EV3-G remote measurement block] | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| Measure → Remote channel 4<br>[Image pending: EV3-G remote measurement block] | Marker count | `0 ~ 99`<br>• Marker count = reading. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`EV3-G provides: 12 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading // 10.<br>• Line-found flags = reading % 10. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| Measure → Remote channel 1<br>[Image pending: EV3-G remote measurement block] | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| Measure → Remote channel 2<br>[Image pending: EV3-G remote measurement block] | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| Measure → Remote channel 3<br>[Image pending: EV3-G remote measurement block] | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| Measure → Remote channel 4<br>[Image pending: EV3-G remote measurement block] | Marker count | `0 ~ 99`<br>• Marker count = reading. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`EV3-G provides: 12 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading // 10.<br>• Line-found flags = reading % 10. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| Measure → Remote channel 1<br>[Image pending: EV3-G remote measurement block] | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| Measure → Remote channel 2<br>[Image pending: EV3-G remote measurement block] | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| Measure → Remote channel 3<br>[Image pending: EV3-G remote measurement block] | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| Measure → Remote channel 4<br>[Image pending: EV3-G remote measurement block] | Marker count | `0 ~ 99`<br>• Marker count = reading. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`EV3-G provides: codes and positions of the first 5 objects, plus total count`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
- For example, 13 means color 1 triangle; 0 means no object.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading // 10.<br>• Object 1 Y = reading % 10. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading // 10.<br>• Object 2 shape code = reading % 10. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Object 2 position | `0, 11 ~ 86`<br>• Object 2 X = reading // 10.<br>• Object 2 Y = reading % 10. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Object 3 code | `0, 10 ~ 89`<br>• Object 3 color ID = reading // 10.<br>• Object 3 shape code = reading % 10. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Object 3 position | `0, 11 ~ 86`<br>• Object 3 X = reading // 10.<br>• Object 3 Y = reading % 10. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Object 4 code | `0, 10 ~ 89`<br>• Object 4 color ID = reading // 10.<br>• Object 4 shape code = reading % 10. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Object 4 position | `0, 11 ~ 86`<br>• Object 4 X = reading // 10.<br>• Object 4 Y = reading % 10. |
| Measure → Remote channel 1<br>[Image pending: EV3-G remote measurement block] | Object 5 code | `0, 10 ~ 89`<br>• Object 5 color ID = reading // 10.<br>• Object 5 shape code = reading % 10. |
| Measure → Remote channel 2<br>[Image pending: EV3-G remote measurement block] | Object 5 position | `0, 11 ~ 86`<br>• Object 5 X = reading // 10.<br>• Object 5 Y = reading % 10. |
| Measure → Remote channel 4<br>[Image pending: EV3-G remote measurement block] | Object count | `0 ~ 8`<br>• Object count = reading. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`EV3-G provides: details of the first 2 objects`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For example, 13 means color 1 triangle; 0 means no object.
- This reduced field can differ by one unit after conversion.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| Measure → Proximity (port 1)<br>[Image pending: EV3-G proximity measurement block] | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| Measure → Beacon (channel 1) → Heading<br>[Image pending: EV3-G beacon measurement block] | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading // 10.<br>• Object 1 shape code = reading % 10. |
| Measure → Beacon (channel 1) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading // 10.<br>• Object 1 Y = reading % 10. |
| Measure → Beacon (channel 2) → Heading<br>[Image pending: EV3-G beacon measurement block] | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| Measure → Beacon (channel 2) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Object 1 angle | `0 ~ 90`<br>• Object 1 angle = reading × 2, capped at 179°. |
| Measure → Beacon (channel 3) → Heading<br>[Image pending: EV3-G beacon measurement block] | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading // 10.<br>• Object 2 shape code = reading % 10. |
| Measure → Beacon (channel 3) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Object 2 position | `0, 11 ~ 86`<br>• Object 2 X = reading // 10.<br>• Object 2 Y = reading % 10. |
| Measure → Beacon (channel 4) → Heading<br>[Image pending: EV3-G beacon measurement block] | Object 2 area | `0 ~ 100`<br>• Object 2 area = reading. |
| Measure → Beacon (channel 4) → Proximity<br>[Image pending: EV3-G beacon measurement block] | Object 2 angle | `0 ~ 90`<br>• Object 2 angle = reading × 2, capped at 179°. |

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

### ✔ Read target 1 position and area

Connect the camera to sensor port 1, teach target color 1, and select Mode ID 13 (Color tracking - ③ Standard) on the camera.

1. Add an Infrared Sensor block, select Measure → Proximity on port 1, and check for output 13.
2. Create position, area, X, and Y variables and add a forever loop.
3. Use Measure → Beacon on channel 1. Wire Heading to position and Proximity to area.
4. Display “No target” when position = 0. Otherwise use math blocks to calculate X = floor(position/10) and Y = position modulo 10.
5. Display X, Y, and area, wait 0.1 seconds, and repeat. For example, position = 43 and area = 18 mean column 4, row 3, and 18% area. EV3 Y = 1 is at the bottom.

Keep the loop on Beacon readings. Check Mode ID with Proximity once at startup to avoid switching infrared modes every iteration and adding about 1.1 seconds of delay.

*[Image pending: complete EV3-G block program or project file; the steps above describe the reads and calculations.]*

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
