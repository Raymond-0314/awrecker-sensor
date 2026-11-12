# Tutorial

## 01 / Getting Started

### ✔ Confirm Your Controller, Sensor, and Programming Environment

| Requirement | Supported Hardware and Software |
| --- | --- |
| Controller | LEGO® MINDSTORMS® EV3 |
| Sensor | MBC Vision Sensor (EV3 Version) |
| Programming Environment | EV3 Classroom |

### ✔ Preparation

1. Turn on your robot and launch EV3 Classroom.

2. Make sure the controller, camera, and programming environment are working properly.

3. Set the sensor mode and make sure it matches the mode configured in your program.

## 02 / Functions and Features

::: info ℹ️ Additional Information

- In the tables, “÷” means integer division and “mod” means the remainder operation. The camera Mode ID and the EV3 infrared communication mode are separate settings. For example, data from camera Mode 13 is still read through Beacon mode 1.

:::

::: warning ⚠️ Note

- Only one camera submode can be used at a time. Make sure the camera Mode ID matches the mode configured in your program.

- Different modes share the same read commands. Decode the returned data using the table for the selected mode.

:::

<CamModeAccordion>

### ✔ Camera Mode Overview

The MBC Vision Sensor has five main modes, each with several submodes. Refer to the descriptions and Mode IDs in the table below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Readings and Decoding by Mode

#### Mode 1: Target Color Tracking

<CamModeSection mode="11" title="Color Tracking - ① Maximum Colors">

`EV3 Classroom reads: positions of 12 colors`

::: info ℹ️ Additional Information

- Coordinates use an `8 × 6` grid. X increases to the right, and Y increases from bottom to top, with Y = 1 at the bottom. Returned coordinates indicate grid cells rather than actual pixels. A position value of 0 means no target was found.

- Switching between Beacon and Remote takes approximately 1.1 seconds. Read only the required communication mode in the control loop; avoid repeatedly switching modes to read every field. The camera mode is still configured on the camera itself.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Line Position](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Color 1 Position | `0, 11 ~ 86`<br>• Color 1 X = reading ÷ 10.<br>• Color 1 Y = reading mod 10. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Color 2 Position | `0, 11 ~ 86`<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y = reading mod 10. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Color 3 Position | `0, 11 ~ 86`<br>• Color 3 X = reading ÷ 10.<br>• Color 3 Y = reading mod 10. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Color 4 Position | `0, 11 ~ 86`<br>• Color 4 X = reading ÷ 10.<br>• Color 4 Y = reading mod 10. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Color 5 Position | `0, 11 ~ 86`<br>• Color 5 X = reading ÷ 10.<br>• Color 5 Y = reading mod 10. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Color 6 Position | `0, 11 ~ 86`<br>• Color 6 X = reading ÷ 10.<br>• Color 6 Y = reading mod 10. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Color 7 Position | `0, 11 ~ 86`<br>• Color 7 X = reading ÷ 10.<br>• Color 7 Y = reading mod 10. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Color 8 Position | `0, 11 ~ 86`<br>• Color 8 X = reading ÷ 10.<br>• Color 8 Y = reading mod 10. |
| ![Remote Channel 1](/images/tutorials/S16/ev3-classroom/beacon_btn_1.png) | Color 9 Position | `0, 11 ~ 86`<br>• Color 9 X = reading ÷ 10.<br>• Color 9 Y = reading mod 10. |
| ![Remote Channel 2](/images/tutorials/S16/ev3-classroom/beacon_btn_2.png) | Color 10 Position | `0, 11 ~ 86`<br>• Color 10 X = reading ÷ 10.<br>• Color 10 Y = reading mod 10. |
| ![Remote Channel 3](/images/tutorials/S16/ev3-classroom/beacon_btn_3.png) | Color 11 Position | `0, 11 ~ 86`<br>• Color 11 X = reading ÷ 10.<br>• Color 11 Y = reading mod 10. |
| ![Remote Channel 4](/images/tutorials/S16/ev3-classroom/beacon_btn_4.png) | Color 12 Position | `0, 11 ~ 86`<br>• Color 12 X = reading ÷ 10.<br>• Color 12 Y = reading mod 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color Tracking - ② Multiple Colors">

`EV3 Classroom reads: positions of 8 colors`

::: info ℹ️ Additional Information

- Coordinates use an `8 × 6` grid. X increases to the right, and Y increases from bottom to top, with Y = 1 at the bottom. Returned coordinates indicate grid cells rather than actual pixels. A position value of 0 means no target was found.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Color 1 Position | `0, 11 ~ 86`<br>• Color 1 X = reading ÷ 10.<br>• Color 1 Y = reading mod 10. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Color 2 Position | `0, 11 ~ 86`<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y = reading mod 10. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Color 3 Position | `0, 11 ~ 86`<br>• Color 3 X = reading ÷ 10.<br>• Color 3 Y = reading mod 10. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Color 4 Position | `0, 11 ~ 86`<br>• Color 4 X = reading ÷ 10.<br>• Color 4 Y = reading mod 10. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Color 5 Position | `0, 11 ~ 86`<br>• Color 5 X = reading ÷ 10.<br>• Color 5 Y = reading mod 10. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Color 6 Position | `0, 11 ~ 86`<br>• Color 6 X = reading ÷ 10.<br>• Color 6 Y = reading mod 10. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Color 7 Position | `0, 11 ~ 86`<br>• Color 7 X = reading ÷ 10.<br>• Color 7 Y = reading mod 10. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Color 8 Position | `0, 11 ~ 86`<br>• Color 8 X = reading ÷ 10.<br>• Color 8 Y = reading mod 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color Tracking - ③ Standard">

`EV3 Classroom reads: positions and areas of 4 colors`

::: info ℹ️ Additional Information

- Coordinates use an `8 × 6` grid. X increases to the right, and Y increases from bottom to top, with Y = 1 at the bottom. Returned coordinates indicate grid cells rather than actual pixels. A position value of 0 means no target was found.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Color 1 Position | `0, 11 ~ 86`<br>• Color 1 X = reading ÷ 10.<br>• Color 1 Y = reading mod 10. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Color 1 Area | `0 ~ 100`<br>• Color 1 Area = reading. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Color 2 Position | `0, 11 ~ 86`<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y = reading mod 10. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Color 2 Area | `0 ~ 100`<br>• Color 2 Area = reading. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Color 3 Position | `0, 11 ~ 86`<br>• Color 3 X = reading ÷ 10.<br>• Color 3 Y = reading mod 10. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Color 3 Area | `0 ~ 100`<br>• Color 3 Area = reading. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Color 4 Position | `0, 11 ~ 86`<br>• Color 4 X = reading ÷ 10.<br>• Color 4 Y = reading mod 10. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Color 4 Area | `0 ~ 100`<br>• Color 4 Area = reading. |

</CamModeSection>

<CamModeSection mode="14" title="Color Tracking - ④ Detailed">

`EV3 Classroom reads: positions, widths, and heights of 2 colors`

::: info ℹ️ Additional Information

- Coordinates use an `8 × 6` grid. X increases to the right, and Y increases from bottom to top, with Y = 1 at the bottom. Returned coordinates indicate grid cells rather than actual pixels. A position value of 0 means no target was found.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Color 1 Position | `0, 11 ~ 86`<br>• Color 1 X = reading ÷ 10.<br>• Color 1 Y = reading mod 10. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Color 1 Width and Height | `0, 11 ~ 86`<br>• Color 1 W = reading ÷ 10.<br>• Color 1 H = reading mod 10. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Color 1 Count | `0 ~ 15`<br>• Color 1 Count = reading. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Color 1 Area | `0 ~ 100`<br>• Color 1 Area = reading. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Color 2 Position | `0, 11 ~ 86`<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y = reading mod 10. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Color 2 Width and Height | `0, 11 ~ 86`<br>• Color 2 W = reading ÷ 10.<br>• Color 2 H = reading mod 10. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Color 2 Count | `0 ~ 15`<br>• Color 2 Count = reading. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Color 2 Area | `0 ~ 100`<br>• Color 2 Area = reading. |

</CamModeSection>

#### Mode 2: Color Sampling at Specified Coordinates

<CamModeSection mode="21" title="Coordinate Color Sampling - ① Hue">

`EV3 Classroom reads: hue at 12 sampling points`

::: info ℹ️ Additional Information

- Configure the sampling point positions first. Unconfigured sampling points are not displayed on the screen, and their H, S, and V values sent to the controller are 0. H = hue, S = saturation, and V = value (brightness).

- Switching between Beacon and Remote takes approximately 1.1 seconds. Read only the required communication mode in the control loop; avoid repeatedly switching modes to read every field. The camera mode is still configured on the camera itself.

- -1 ~ -8 indicate white through gray, and -9 ~ -15 indicate black. Do not apply the hue conversion formula to negative values.

- A hue of 0 can represent red. Confirm that the sampling point has been configured; a hue of 0 alone does not indicate that nothing was detected.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | S1 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | S2 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | S3 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | S4 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | S5 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | S6 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | S7 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | S8 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Remote Channel 1](/images/tutorials/S16/ev3-classroom/beacon_btn_1.png) | S9 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Remote Channel 2](/images/tutorials/S16/ev3-classroom/beacon_btn_2.png) | S10 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Remote Channel 3](/images/tutorials/S16/ev3-classroom/beacon_btn_3.png) | S11 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Remote Channel 4](/images/tutorials/S16/ev3-classroom/beacon_btn_4.png) | S12 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate Color Sampling - ② Hue + Saturation">

`EV3 Classroom reads: hue and saturation at 4 sampling points`

::: info ℹ️ Additional Information

- Configure the sampling point positions first. Unconfigured sampling points are not displayed on the screen, and their H, S, and V values sent to the controller are 0. H = hue, S = saturation, and V = value (brightness).

- -1 ~ -8 indicate white through gray, and -9 ~ -15 indicate black. Do not apply the hue conversion formula to negative values.

- Only the tens digit is retained for both values. A digit of 9 represents approximately 90 or higher.

- A hue of 0 can represent red. Confirm that the sampling point has been configured; a hue of 0 alone does not indicate that nothing was detected.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | S1 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | S1 Saturation and Value | `0 ~ 99`<br>• S1 Saturation range: `0 ~ 90`{.code-green}.<br>• S1 Saturation = (reading ÷ 10) × 10.<br>• S1 Value range: `0 ~ 90`{.code-green}.<br>• S1 Value = (reading mod 10) × 10. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | S2 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | S2 Saturation and Value | `0 ~ 99`<br>• S2 Saturation range: `0 ~ 90`{.code-green}.<br>• S2 Saturation = (reading ÷ 10) × 10.<br>• S2 Value range: `0 ~ 90`{.code-green}.<br>• S2 Value = (reading mod 10) × 10. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | S3 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | S3 Saturation and Value | `0 ~ 99`<br>• S3 Saturation range: `0 ~ 90`{.code-green}.<br>• S3 Saturation = (reading ÷ 10) × 10.<br>• S3 Value range: `0 ~ 90`{.code-green}.<br>• S3 Value = (reading mod 10) × 10. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | S4 Hue | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | S4 Saturation and Value | `0 ~ 99`<br>• S4 Saturation range: `0 ~ 90`{.code-green}.<br>• S4 Saturation = (reading ÷ 10) × 10.<br>• S4 Value range: `0 ~ 90`{.code-green}.<br>• S4 Value = (reading mod 10) × 10. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate Color Sampling - ③ Hue + Saturation + Value">

`EV3 Classroom reads: hue, saturation, and value at 2 sampling points`

::: info ℹ️ Additional Information

- Configure the sampling point positions first. Unconfigured sampling points are not displayed on the screen, and their H, S, and V values sent to the controller are 0. H = hue, S = saturation, and V = value (brightness).

- For each sampling point, the complete hue code = hundreds-digit reading × 100 + last-two-digits reading.

- A hue of 0 can represent red. Confirm that the sampling point has been configured; a hue of 0 alone does not indicate that nothing was detected.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | S1 Hue Hundreds Digit | `0 ~ 2`<br>• S1 Hue Hundreds Digit = reading. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | S1 Hue Last Two Digits | `0 ~ 99`<br>• S1 Hue Last Two Digits = reading. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | S1 Saturation | `0 ~ 100`<br>• S1 Saturation = reading. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | S1 Value | `0 ~ 100`<br>• S1 Value = reading. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | S2 Hue Hundreds Digit | `0 ~ 2`<br>• S2 Hue Hundreds Digit = reading. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | S2 Hue Last Two Digits | `0 ~ 99`<br>• S2 Hue Last Two Digits = reading. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | S2 Saturation | `0 ~ 100`<br>• S2 Saturation = reading. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | S2 Value | `0 ~ 100`<br>• S2 Value = reading. |

</CamModeSection>

#### Mode 3: Sequential Color Reading

<CamModeSection mode="30" title="Sequential Color Reading">

`EV3 Classroom reads: hues of the first 11 blocks and the total block count`

::: info ℹ️ Additional Information

- Color blocks are ordered from left to right. Read the total block count first, then use the corresponding initial hue entries. A hue of 0 can represent red.

- Switching between Beacon and Remote takes approximately 1.1 seconds. Read only the required communication mode in the control loop; avoid repeatedly switching modes to read every field. The camera mode is still configured on the camera itself.

- -1 ~ -8 indicate white through gray, and -9 ~ -15 indicate black. Do not apply the hue conversion formula to negative values.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Hue of Block 1 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Hue of Block 2 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Hue of Block 3 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Hue of Block 4 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Hue of Block 5 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Hue of Block 6 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Hue of Block 7 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Hue of Block 8 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Remote Channel 1](/images/tutorials/S16/ev3-classroom/beacon_btn_1.png) | Hue of Block 9 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Remote Channel 2](/images/tutorials/S16/ev3-classroom/beacon_btn_2.png) | Hue of Block 10 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Remote Channel 3](/images/tutorials/S16/ev3-classroom/beacon_btn_3.png) | Hue of Block 11 from the Left | `-15 ~ 100`<br>• When the reading ≥ 0, hue code = reading × 240 ÷ 100. |
| ![Remote Channel 4](/images/tutorials/S16/ev3-classroom/beacon_btn_4.png) | Total Color Block Count | `0 ~ 18`<br>• Total Color Block Count = reading. |

</CamModeSection>

#### Mode 4: Line Following

<CamModeSection mode="41" title="Line Following - ① Black Line">

`EV3 Classroom reads: 12 line-following values`

::: info ℹ️ Additional Information

- Junction types: 0 = none, 1 = crossroads, 2 = T-junction, 3 = left junction, 4 = right junction, and 5 = dead end. Line detection flags are the sum of 1, 2, and 4 for the near, middle, and far regions, respectively.

- This submode detects black lines on a light background.

- Switching between Beacon and Remote takes approximately 1.1 seconds. Read only the required communication mode in the control loop; avoid repeatedly switching modes to read every field. The camera mode is still configured on the camera itself.

- A negative offset means the line is to the left; a positive offset means it is to the right.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Near Offset | `-100 ~ 100`<br>• Near Offset = reading; preserve the sign. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Middle Offset | `-100 ~ 100`<br>• Middle Offset = reading; preserve the sign. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Far Offset | `-100 ~ 100`<br>• Far Offset = reading; preserve the sign. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Line Angle | `-90 ~ 90°`<br>• Line Angle = reading; preserve the sign. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Near Line Width | `0 ~ 100`<br>• Near Line Width = reading. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Junction Type and Line Detection Flags | `0 ~ 57`<br>• Junction Type = reading ÷ 10.<br>• Line Detection Flags = reading mod 10. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Junction Distance | `0 ~ 100`<br>• Junction Distance = reading. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Marker Line Color ID | `0 ~ 16`<br>• Marker Line Color ID = reading. |
| ![Remote Channel 1](/images/tutorials/S16/ev3-classroom/beacon_btn_1.png) | Near Line Left Edge | `-100 ~ 100`<br>• Near Line Left Edge = reading; preserve the sign. |
| ![Remote Channel 2](/images/tutorials/S16/ev3-classroom/beacon_btn_2.png) | Near Line Right Edge | `-100 ~ 100`<br>• Near Line Right Edge = reading; preserve the sign. |
| ![Remote Channel 3](/images/tutorials/S16/ev3-classroom/beacon_btn_3.png) | Far Line Width | `0 ~ 100`<br>• Far Line Width = reading. |
| ![Remote Channel 4](/images/tutorials/S16/ev3-classroom/beacon_btn_4.png) | Cumulative Marker Line Count | `0 ~ 99`<br>• Cumulative Marker Line Count = reading. |

</CamModeSection>

<CamModeSection mode="42" title="Line Following - ② White Line">

`EV3 Classroom reads: 12 line-following values`

::: info ℹ️ Additional Information

- Junction types: 0 = none, 1 = crossroads, 2 = T-junction, 3 = left junction, 4 = right junction, and 5 = dead end. Line detection flags are the sum of 1, 2, and 4 for the near, middle, and far regions, respectively.

- This submode detects white lines on a dark background.

- Switching between Beacon and Remote takes approximately 1.1 seconds. Read only the required communication mode in the control loop; avoid repeatedly switching modes to read every field. The camera mode is still configured on the camera itself.

- A negative offset means the line is to the left; a positive offset means it is to the right.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Near Offset | `-100 ~ 100`<br>• Near Offset = reading; preserve the sign. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Middle Offset | `-100 ~ 100`<br>• Middle Offset = reading; preserve the sign. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Far Offset | `-100 ~ 100`<br>• Far Offset = reading; preserve the sign. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Line Angle | `-90 ~ 90°`<br>• Line Angle = reading; preserve the sign. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Near Line Width | `0 ~ 100`<br>• Near Line Width = reading. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Junction Type and Line Detection Flags | `0 ~ 57`<br>• Junction Type = reading ÷ 10.<br>• Line Detection Flags = reading mod 10. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Junction Distance | `0 ~ 100`<br>• Junction Distance = reading. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Marker Line Color ID | `0 ~ 16`<br>• Marker Line Color ID = reading. |
| ![Remote Channel 1](/images/tutorials/S16/ev3-classroom/beacon_btn_1.png) | Near Line Left Edge | `-100 ~ 100`<br>• Near Line Left Edge = reading; preserve the sign. |
| ![Remote Channel 2](/images/tutorials/S16/ev3-classroom/beacon_btn_2.png) | Near Line Right Edge | `-100 ~ 100`<br>• Near Line Right Edge = reading; preserve the sign. |
| ![Remote Channel 3](/images/tutorials/S16/ev3-classroom/beacon_btn_3.png) | Far Line Width | `0 ~ 100`<br>• Far Line Width = reading. |
| ![Remote Channel 4](/images/tutorials/S16/ev3-classroom/beacon_btn_4.png) | Cumulative Marker Line Count | `0 ~ 99`<br>• Cumulative Marker Line Count = reading. |

</CamModeSection>

<CamModeSection mode="43" title="Line Following - ③ Colored Line">

`EV3 Classroom reads: 12 line-following values`

::: info ℹ️ Additional Information

- Junction types: 0 = none, 1 = crossroads, 2 = T-junction, 3 = left junction, 4 = right junction, and 5 = dead end. Line detection flags are the sum of 1, 2, and 4 for the near, middle, and far regions, respectively.

- Before following a colored line, teach its color as target color 1.

- Switching between Beacon and Remote takes approximately 1.1 seconds. Read only the required communication mode in the control loop; avoid repeatedly switching modes to read every field. The camera mode is still configured on the camera itself.

- A negative offset means the line is to the left; a positive offset means it is to the right.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Near Offset | `-100 ~ 100`<br>• Near Offset = reading; preserve the sign. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Middle Offset | `-100 ~ 100`<br>• Middle Offset = reading; preserve the sign. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Far Offset | `-100 ~ 100`<br>• Far Offset = reading; preserve the sign. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Line Angle | `-90 ~ 90°`<br>• Line Angle = reading; preserve the sign. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Near Line Width | `0 ~ 100`<br>• Near Line Width = reading. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Junction Type and Line Detection Flags | `0 ~ 57`<br>• Junction Type = reading ÷ 10.<br>• Line Detection Flags = reading mod 10. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Junction Distance | `0 ~ 100`<br>• Junction Distance = reading. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Marker Line Color ID | `0 ~ 16`<br>• Marker Line Color ID = reading. |
| ![Remote Channel 1](/images/tutorials/S16/ev3-classroom/beacon_btn_1.png) | Near Line Left Edge | `-100 ~ 100`<br>• Near Line Left Edge = reading; preserve the sign. |
| ![Remote Channel 2](/images/tutorials/S16/ev3-classroom/beacon_btn_2.png) | Near Line Right Edge | `-100 ~ 100`<br>• Near Line Right Edge = reading; preserve the sign. |
| ![Remote Channel 3](/images/tutorials/S16/ev3-classroom/beacon_btn_3.png) | Far Line Width | `0 ~ 100`<br>• Far Line Width = reading. |
| ![Remote Channel 4](/images/tutorials/S16/ev3-classroom/beacon_btn_4.png) | Cumulative Marker Line Count | `0 ~ 99`<br>• Cumulative Marker Line Count = reading. |

</CamModeSection>

#### Mode 5: Object Detection

<CamModeSection mode="51" title="Object Detection - ① Object List">

`EV3 Classroom reads: codes and positions of the first 5 objects and the total object count`

::: info ℹ️ Additional Information

- Coordinates use an `8 × 6` grid. X increases to the right, and Y increases from bottom to top, with Y = 1 at the bottom. Returned coordinates indicate grid cells rather than actual pixels. A position value of 0 means no target was found.

- Only target colors 1 ~ 8 are detected. Objects are sorted by area in descending order, with Object 1 being the largest. X and Y indicate the object centroid. Shape codes 0 ~ 9 represent Other, Circle, Ellipse, Triangle, Square, Rectangle, Pentagon, Hexagon, Star, and Trapezoid, respectively.

- Switching between Beacon and Remote takes approximately 1.1 seconds. Read only the required communication mode in the control loop; avoid repeatedly switching modes to read every field. The camera mode is still configured on the camera itself.

- For example, 13 represents a triangle of color 1; 0 means no object was detected.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Object 1 Code | `0, 10 ~ 89`<br>• Object 1 Color ID range: `0, 1 ~ 8`{.code-green}.<br>• Object 1 Color ID = reading ÷ 10.<br>• Object 1 Shape Code range: `0 ~ 9`{.code-green}.<br>• Object 1 Shape Code = reading mod 10. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Object 1 Position | `0, 11 ~ 86`<br>• Object 1 X = reading ÷ 10.<br>• Object 1 Y = reading mod 10. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Object 2 Code | `0, 10 ~ 89`<br>• Object 2 Color ID range: `0, 1 ~ 8`{.code-green}.<br>• Object 2 Color ID = reading ÷ 10.<br>• Object 2 Shape Code range: `0 ~ 9`{.code-green}.<br>• Object 2 Shape Code = reading mod 10. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Object 2 Position | `0, 11 ~ 86`<br>• Object 2 X = reading ÷ 10.<br>• Object 2 Y = reading mod 10. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Object 3 Code | `0, 10 ~ 89`<br>• Object 3 Color ID range: `0, 1 ~ 8`{.code-green}.<br>• Object 3 Color ID = reading ÷ 10.<br>• Object 3 Shape Code range: `0 ~ 9`{.code-green}.<br>• Object 3 Shape Code = reading mod 10. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Object 3 Position | `0, 11 ~ 86`<br>• Object 3 X = reading ÷ 10.<br>• Object 3 Y = reading mod 10. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Object 4 Code | `0, 10 ~ 89`<br>• Object 4 Color ID range: `0, 1 ~ 8`{.code-green}.<br>• Object 4 Color ID = reading ÷ 10.<br>• Object 4 Shape Code range: `0 ~ 9`{.code-green}.<br>• Object 4 Shape Code = reading mod 10. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Object 4 Position | `0, 11 ~ 86`<br>• Object 4 X = reading ÷ 10.<br>• Object 4 Y = reading mod 10. |
| ![Remote Channel 1](/images/tutorials/S16/ev3-classroom/beacon_btn_1.png) | Object 5 Code | `0, 10 ~ 89`<br>• Object 5 Color ID range: `0, 1 ~ 8`{.code-green}.<br>• Object 5 Color ID = reading ÷ 10.<br>• Object 5 Shape Code range: `0 ~ 9`{.code-green}.<br>• Object 5 Shape Code = reading mod 10. |
| ![Remote Channel 2](/images/tutorials/S16/ev3-classroom/beacon_btn_2.png) | Object 5 Position | `0, 11 ~ 86`<br>• Object 5 X = reading ÷ 10.<br>• Object 5 Y = reading mod 10. |
| ![Remote Channel 4](/images/tutorials/S16/ev3-classroom/beacon_btn_4.png) | Total Object Count | `0 ~ 8`<br>• Total Object Count = reading. |

</CamModeSection>

<CamModeSection mode="52" title="Object Detection - ② Object Details">

`EV3 Classroom reads: details of the first 2 objects`

::: info ℹ️ Additional Information

- Coordinates use an `8 × 6` grid. X increases to the right, and Y increases from bottom to top, with Y = 1 at the bottom. Returned coordinates indicate grid cells rather than actual pixels. A position value of 0 means no target was found.

- Only target colors 1 ~ 8 are detected. Objects are sorted by area in descending order, with Object 1 being the largest. X and Y indicate the object centroid. Shape codes 0 ~ 9 represent Other, Circle, Ellipse, Triangle, Square, Rectangle, Pentagon, Hexagon, Star, and Trapezoid, respectively.

- This field uses reduced precision, so the converted value may have an error of 1 unit.

- For example, 13 represents a triangle of color 1; 0 means no object was detected.

:::

| Programming Block / Readout | Function | Returned Values |
| --- | --- | --- |
| ![Camera Mode ID](/images/tutorials/S16/ev3-classroom/proximity.png) | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Make sure this value matches the Mode ID for this section. This field only reads the ID; it does not switch the camera mode. |
| ![Channel 1 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Object 1 Code | `0, 10 ~ 89`<br>• Object 1 Color ID range: `0, 1 ~ 8`{.code-green}.<br>• Object 1 Color ID = reading ÷ 10.<br>• Object 1 Shape Code range: `0 ~ 9`{.code-green}.<br>• Object 1 Shape Code = reading mod 10. |
| ![Channel 1 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Object 1 Position | `0, 11 ~ 86`<br>• Object 1 X = reading ÷ 10.<br>• Object 1 Y = reading mod 10. |
| ![Channel 2 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Object 1 Area | `0 ~ 100`<br>• Object 1 Area = reading. |
| ![Channel 2 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Object 1 Angle | `0 ~ 90`<br>• Object 1 Angle = reading × 2; capped at 179°. |
| ![Channel 3 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Object 2 Code | `0, 10 ~ 89`<br>• Object 2 Color ID range: `0, 1 ~ 8`{.code-green}.<br>• Object 2 Color ID = reading ÷ 10.<br>• Object 2 Shape Code range: `0 ~ 9`{.code-green}.<br>• Object 2 Shape Code = reading mod 10. |
| ![Channel 3 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Object 2 Position | `0, 11 ~ 86`<br>• Object 2 X = reading ÷ 10.<br>• Object 2 Y = reading mod 10. |
| ![Channel 4 Heading](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Object 2 Area | `0 ~ 100`<br>• Object 2 Area = reading. |
| ![Channel 4 Distance](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Object 2 Angle | `0 ~ 90`<br>• Object 2 Angle = reading × 2; capped at 179°. |

</CamModeSection>

</CamModeAccordion>

## 03 / 【Lego】 Lau Xiao Demonstration Videos

<CamDemoVideos />

[Return to the Home Page for Other Tutorials](/en/)
