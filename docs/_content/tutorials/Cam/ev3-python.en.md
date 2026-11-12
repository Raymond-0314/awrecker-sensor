# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® MINDSTORMS® EV3 |
| Sensor | MBC UniCam Vision Camera Sensor (EV3 edition) |
| Programming environment | Pybricks Python / EV3 MicroPython v2 |

### ✔ Before you begin

::: warning ⚠️ Caution
The MBC SharpShot Vision Camera Sensor supports two approaches: `Basic Control`{.code-blue} and `Advanced Control`{.code-blue}.

- `Basic Control`{.code-blue}: Read native sensor data and decode it in your program, without an external library.
- `Advanced Control`{.code-blue}: Import the `MBC SharpShot Vision Camera Sensor Pybricks - EV3 Library`{.code-blue-text} and use its reading functions.

Download the library if needed:

<DownloadButton href="/programs/Cam/ev3-pybricks/MBC_UniCam_EV3.py" download="MBC_UniCam_EV3.py" label="EV3 Library" />

:::


1. Start your EV3 and open Pybricks Code (v4) or an EV3 MicroPython v2 project in VS Code.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Basic Control - Setup and Function Reference

### ✔ Setting Up the Decoding Functions

1. Open your Pybricks program and enter the camera initialization code below. Place the remaining drivetrain, motor, and sensor initialization code after it.
2. Select the desired Mode ID on the camera. This section reads native infrared sensor data without an external library.

```python
from pybricks.parameters import Port
try:
    from pybricks.iodevices import Ev3devSensor
except ImportError:
    from pybricks.iodevices import LUMPDevice
    cam = LUMPDevice(Port.S1)
    def readCamera(mode):
        return cam.read(mode)
else:
    cam = Ev3devSensor(Port.S1)
    def readCamera(mode):
        names = {0: "IR-PROX", 1: "IR-SEEK", 2: "IR-REMOTE", 5: "IR-CAL"}
        return cam.read(names[mode])
```

### ✔ Function Reference

`readCamera(mode)` is defined above. It uses native `LUMPDevice` readings in Pybricks and named `Ev3devSensor` modes in EV3 MicroPython. Save each returned tuple before decoding it.

::: info ℹ️ Reading notes
- Read the camera with LUMPDevice(Port.S1). readCamera(0)[0] reports camera Mode ID, readCamera(1) returns eight Beacon values, and readCamera(2) returns four Remote values. The tables show the exact indexes. Read once into a variable before extracting fields in a loop. Select the camera mode on the camera.
- Here ÷ means integer division and mod means remainder. Camera Mode ID differs from the infrared read mode: camera mode 13 still returns its data through beacon read mode 1.
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

`EV3 Python provides: 12 color positions`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
- Switching between beacon and remote reads takes about 1.1 seconds. Read only the mode needed by the control loop. Camera modes are selected on the camera.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading ÷ 10.<br>• Color 1 Y = reading % 10. |
| `readCamera(1)[1]` | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y = reading % 10. |
| `readCamera(1)[2]` | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading ÷ 10.<br>• Color 3 Y = reading % 10. |
| `readCamera(1)[3]` | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading ÷ 10.<br>• Color 4 Y = reading % 10. |
| `readCamera(1)[4]` | Color 5 position | `0, 11 ~ 86`<br>• Color 5 X = reading ÷ 10.<br>• Color 5 Y = reading % 10. |
| `readCamera(1)[5]` | Color 6 position | `0, 11 ~ 86`<br>• Color 6 X = reading ÷ 10.<br>• Color 6 Y = reading % 10. |
| `readCamera(1)[6]` | Color 7 position | `0, 11 ~ 86`<br>• Color 7 X = reading ÷ 10.<br>• Color 7 Y = reading % 10. |
| `readCamera(1)[7]` | Color 8 position | `0, 11 ~ 86`<br>• Color 8 X = reading ÷ 10.<br>• Color 8 Y = reading % 10. |
| `readCamera(2)[0]` | Color 9 position | `0, 11 ~ 86`<br>• Color 9 X = reading ÷ 10.<br>• Color 9 Y = reading % 10. |
| `readCamera(2)[1]` | Color 10 position | `0, 11 ~ 86`<br>• Color 10 X = reading ÷ 10.<br>• Color 10 Y = reading % 10. |
| `readCamera(2)[2]` | Color 11 position | `0, 11 ~ 86`<br>• Color 11 X = reading ÷ 10.<br>• Color 11 Y = reading % 10. |
| `readCamera(2)[3]` | Color 12 position | `0, 11 ~ 86`<br>• Color 12 X = reading ÷ 10.<br>• Color 12 Y = reading % 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`EV3 Python provides: 8 color positions`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading ÷ 10.<br>• Color 1 Y = reading % 10. |
| `readCamera(1)[1]` | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y = reading % 10. |
| `readCamera(1)[2]` | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading ÷ 10.<br>• Color 3 Y = reading % 10. |
| `readCamera(1)[3]` | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading ÷ 10.<br>• Color 4 Y = reading % 10. |
| `readCamera(1)[4]` | Color 5 position | `0, 11 ~ 86`<br>• Color 5 X = reading ÷ 10.<br>• Color 5 Y = reading % 10. |
| `readCamera(1)[5]` | Color 6 position | `0, 11 ~ 86`<br>• Color 6 X = reading ÷ 10.<br>• Color 6 Y = reading % 10. |
| `readCamera(1)[6]` | Color 7 position | `0, 11 ~ 86`<br>• Color 7 X = reading ÷ 10.<br>• Color 7 Y = reading % 10. |
| `readCamera(1)[7]` | Color 8 position | `0, 11 ~ 86`<br>• Color 8 X = reading ÷ 10.<br>• Color 8 Y = reading % 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`EV3 Python provides: 4 color positions and area`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading ÷ 10.<br>• Color 1 Y = reading % 10. |
| `readCamera(1)[1]` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `readCamera(1)[2]` | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y = reading % 10. |
| `readCamera(1)[3]` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `readCamera(1)[4]` | Color 3 position | `0, 11 ~ 86`<br>• Color 3 X = reading ÷ 10.<br>• Color 3 Y = reading % 10. |
| `readCamera(1)[5]` | Color 3 area | `0 ~ 100`<br>• Color 3 area = reading. |
| `readCamera(1)[6]` | Color 4 position | `0, 11 ~ 86`<br>• Color 4 X = reading ÷ 10.<br>• Color 4 Y = reading % 10. |
| `readCamera(1)[7]` | Color 4 area | `0 ~ 100`<br>• Color 4 area = reading. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`EV3 Python provides: 2 color positions and sizes`

::: info ℹ️ Reading notes
- Coordinates use an `8 × 6` grid. X increases rightward; Y increases upward, with 1 at the bottom. Values are grid cells rather than pixels. Position 0 means not found.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Color 1 position | `0, 11 ~ 86`<br>• Color 1 X = reading ÷ 10.<br>• Color 1 Y = reading % 10. |
| `readCamera(1)[1]` | Color 1 size | `0, 11 ~ 86`<br>• Color 1 W = reading ÷ 10.<br>• Color 1 H = reading % 10. |
| `readCamera(1)[2]` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `readCamera(1)[3]` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `readCamera(1)[4]` | Color 2 position | `0, 11 ~ 86`<br>• Color 2 X = reading ÷ 10.<br>• Color 2 Y = reading % 10. |
| `readCamera(1)[5]` | Color 2 size | `0, 11 ~ 86`<br>• Color 2 W = reading ÷ 10.<br>• Color 2 H = reading % 10. |
| `readCamera(1)[6]` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `readCamera(1)[7]` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |

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
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | S1 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[1]` | S2 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[2]` | S3 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[3]` | S4 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[4]` | S5 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[5]` | S6 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[6]` | S7 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[7]` | S8 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(2)[0]` | S9 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(2)[1]` | S10 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(2)[2]` | S11 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(2)[3]` | S12 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |

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
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | S1 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[1]` | S1 saturation and value | `0 ~ 99`<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading ÷ 10) × 10.<br>• S1 value range: `0 ~ 90`{.code-green}.<br>• S1 value = (reading % 10) × 10. |
| `readCamera(1)[2]` | S2 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[3]` | S2 saturation and value | `0 ~ 99`<br>• S2 saturation range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (reading ÷ 10) × 10.<br>• S2 value range: `0 ~ 90`{.code-green}.<br>• S2 value = (reading % 10) × 10. |
| `readCamera(1)[4]` | S3 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[5]` | S3 saturation and value | `0 ~ 99`<br>• S3 saturation range: `0 ~ 90`{.code-green}.<br>• S3 saturation = (reading ÷ 10) × 10.<br>• S3 value range: `0 ~ 90`{.code-green}.<br>• S3 value = (reading % 10) × 10. |
| `readCamera(1)[6]` | S4 hue | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[7]` | S4 saturation and value | `0 ~ 99`<br>• S4 saturation range: `0 ~ 90`{.code-green}.<br>• S4 saturation = (reading ÷ 10) × 10.<br>• S4 value range: `0 ~ 90`{.code-green}.<br>• S4 value = (reading % 10) × 10. |

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
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | S1 hue hundreds | `0 ~ 2`<br>• S1 hue hundreds = reading. |
| `readCamera(1)[1]` | S1 hue remainder | `0 ~ 99`<br>• S1 hue remainder = reading. |
| `readCamera(1)[2]` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `readCamera(1)[3]` | S1 value | `0 ~ 100`<br>• S1 value = reading. |
| `readCamera(1)[4]` | S2 hue hundreds | `0 ~ 2`<br>• S2 hue hundreds = reading. |
| `readCamera(1)[5]` | S2 hue remainder | `0 ~ 99`<br>• S2 hue remainder = reading. |
| `readCamera(1)[6]` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `readCamera(1)[7]` | S2 value | `0 ~ 100`<br>• S2 value = reading. |

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
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Block 1 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[1]` | Block 2 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[2]` | Block 3 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[3]` | Block 4 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[4]` | Block 5 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[5]` | Block 6 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[6]` | Block 7 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(1)[7]` | Block 8 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(2)[0]` | Block 9 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(2)[1]` | Block 10 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(2)[2]` | Block 11 hue from the left | `-15 ~ 100`<br>• For reading ≥ 0, hue code = reading × 240 / 100. |
| `readCamera(2)[3]` | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |

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
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `readCamera(1)[1]` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `readCamera(1)[2]` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `readCamera(1)[3]` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `readCamera(1)[4]` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `readCamera(1)[5]` | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading ÷ 10.<br>• Line-found flags = reading % 10. |
| `readCamera(1)[6]` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `readCamera(1)[7]` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `readCamera(2)[0]` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `readCamera(2)[1]` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `readCamera(2)[2]` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `readCamera(2)[3]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |

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
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `readCamera(1)[1]` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `readCamera(1)[2]` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `readCamera(1)[3]` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `readCamera(1)[4]` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `readCamera(1)[5]` | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading ÷ 10.<br>• Line-found flags = reading % 10. |
| `readCamera(1)[6]` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `readCamera(1)[7]` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `readCamera(2)[0]` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `readCamera(2)[1]` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `readCamera(2)[2]` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `readCamera(2)[3]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |

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
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `readCamera(1)[1]` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `readCamera(1)[2]` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `readCamera(1)[3]` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `readCamera(1)[4]` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `readCamera(1)[5]` | Junction type and line-found flags | `0 ~ 57`<br>• Junction type = reading ÷ 10.<br>• Line-found flags = reading % 10. |
| `readCamera(1)[6]` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `readCamera(1)[7]` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `readCamera(2)[0]` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `readCamera(2)[1]` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `readCamera(2)[2]` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `readCamera(2)[3]` | Marker count | `0 ~ 99`<br>• Marker count = reading. |

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
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading ÷ 10.<br>• Object 1 shape code = reading % 10. |
| `readCamera(1)[1]` | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading ÷ 10.<br>• Object 1 Y = reading % 10. |
| `readCamera(1)[2]` | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading ÷ 10.<br>• Object 2 shape code = reading % 10. |
| `readCamera(1)[3]` | Object 2 position | `0, 11 ~ 86`<br>• Object 2 X = reading ÷ 10.<br>• Object 2 Y = reading % 10. |
| `readCamera(1)[4]` | Object 3 code | `0, 10 ~ 89`<br>• Object 3 color ID = reading ÷ 10.<br>• Object 3 shape code = reading % 10. |
| `readCamera(1)[5]` | Object 3 position | `0, 11 ~ 86`<br>• Object 3 X = reading ÷ 10.<br>• Object 3 Y = reading % 10. |
| `readCamera(1)[6]` | Object 4 code | `0, 10 ~ 89`<br>• Object 4 color ID = reading ÷ 10.<br>• Object 4 shape code = reading % 10. |
| `readCamera(1)[7]` | Object 4 position | `0, 11 ~ 86`<br>• Object 4 X = reading ÷ 10.<br>• Object 4 Y = reading % 10. |
| `readCamera(2)[0]` | Object 5 code | `0, 10 ~ 89`<br>• Object 5 color ID = reading ÷ 10.<br>• Object 5 shape code = reading % 10. |
| `readCamera(2)[1]` | Object 5 position | `0, 11 ~ 86`<br>• Object 5 X = reading ÷ 10.<br>• Object 5 Y = reading % 10. |
| `readCamera(2)[3]` | Object count | `0 ~ 8`<br>• Object count = reading. |

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
| `readCamera(0)[0]` | Camera Mode ID | `11 ~ 52`<br>• Camera Mode ID = reading.<br>• Check it matches this section’s Mode ID; reading this field does not switch the camera. |
| `readCamera(1)[0]` | Object 1 code | `0, 10 ~ 89`<br>• Object 1 color ID = reading ÷ 10.<br>• Object 1 shape code = reading % 10. |
| `readCamera(1)[1]` | Object 1 position | `0, 11 ~ 86`<br>• Object 1 X = reading ÷ 10.<br>• Object 1 Y = reading % 10. |
| `readCamera(1)[2]` | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| `readCamera(1)[3]` | Object 1 angle | `0 ~ 90`<br>• Object 1 angle = reading × 2, capped at 179°. |
| `readCamera(1)[4]` | Object 2 code | `0, 10 ~ 89`<br>• Object 2 color ID = reading ÷ 10.<br>• Object 2 shape code = reading % 10. |
| `readCamera(1)[5]` | Object 2 position | `0, 11 ~ 86`<br>• Object 2 X = reading ÷ 10.<br>• Object 2 Y = reading % 10. |
| `readCamera(1)[6]` | Object 2 area | `0 ~ 100`<br>• Object 2 area = reading. |
| `readCamera(1)[7]` | Object 2 angle | `0 ~ 90`<br>• Object 2 angle = reading × 2, capped at 179°. |

</CamModeSection>

</CamModeAccordion>

## 03 / Advanced Control - Setup and Function Reference

<DownloadButton href="/programs/Cam/ev3-pybricks/MBC_UniCam_EV3.py" download="MBC_UniCam_EV3.py" label="EV3 Library" />

### ✔ Function Setup

1. Click the <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>EV3 Library</code> button above to download the `MBC SharpShot Vision Camera Sensor Pybricks - EV3 Library`{.code-blue}.
2. Confirm that the library filename is `MBC_UniCam_EV3.py`{.code-blue}.
3. In Pybricks, use `file explorer → import a file` to import `MBC_UniCam_EV3.py`. In an EV3 MicroPython project, copy it into the project folder.
4. Keep `MBC_UniCam_EV3.py` and the main program in the same project folder.
5. Connect the camera to sensor port S1 and select the matching Mode ID on the camera.
6. Open your Pybricks program and enter the library import and configuration code below. Place the remaining drivetrain, motor, and sensor initialization code after it.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam
cam = UniCam(Port.S1, mode=11)
```

### ✔ Function Reference

#### set up

| Code | Function | Description |
| --- | --- | --- |
| `from MBC_UniCam_EV3 import UniCam`{.code-blue} | Import library | `UniCam`<br>• Imports the `UniCam` class from `MBC_UniCam_EV3.py`. The filename and class name must match exactly. |
| `cam = UniCam(Port.S1, mode=11)`{.code-blue} | Library configuration | `UniCam`<br>• `cam` is the name used for subsequent readings. `Port.S1` selects sensor port 1. `mode=11` selects camera Mode ID 11. Select the same mode on the camera; EV3 cannot switch it through this argument. |

#### Sensor status and device information

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.mode_number()`{.code-blue} | Configured Mode ID | `11 ~ 52`<br>• Returns the configured Mode ID. With no mode argument, it reads communication mode 0; an explicit mode argument does not verify the camera setting. |
| `cam.sensor_ok()`{.code-blue} | Reading status | `True / False`<br>• Reports whether the most recent read succeeded. |
| `cam.device_id()`{.code-blue} | Device information | `tuple[3]`<br>• Reads communication mode 5 and returns `(address, hardware code, firmware word)`, for example `(76, 3, 100)`. |
| `cam.is_unicam()`{.code-blue} | Camera identification | `True / False`<br>• Checks device information from communication mode 5. |

<CamModeAccordion namespace="advanced">

### ✔ Camera mode overview

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 - Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`Library provides: 12 color positions`

::: info ℹ️ Reading notes
- `xy()`, `x()` and `y()` use pixel cell centers: X increases rightward and Y downward. `(0, 0)` means not found. `grid()` returns an `8 × 6` grid with Y increasing upward.
- Main readings use EV3 infrared communication mode `1` (Beacon).
- Additional fields also use communication mode `2` (Remote). Switching read modes takes about 1.1 seconds; read only the fields needed by the program.
:::

**Mode ID setup**

Select Mode ID `11`{.code-green} on the camera, then set `mode=11` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=11)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | Position X/Y of a selected color | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• Returns `(X, Y)` in pixels.<br>• Argument range: `1 ~ 12`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.x(1)`{.code-blue} | X of a selected color | `0, 10 ~ 150`<br>• Returns the pixel X coordinate.<br>• Argument range: `1 ~ 12`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.y(1)`{.code-blue} | Y of a selected color | `0, 9 ~ 109`<br>• Returns the pixel Y coordinate.<br>• Argument range: `1 ~ 12`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.found(1)`{.code-blue} | Whether a selected color was found | `True / False`<br>• `True` means found; `False` means not found.<br>• Argument range: `1 ~ 12`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.grid(1)`{.code-blue} | Grid position of a selected color | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• Returns raw grid `(X, Y)`; Y increases upward.<br>• Argument range: `1 ~ 12`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.max_color()`{.code-blue} | Color capacity | `12`<br>• Returns the number of color positions available in this mode. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Library provides: 8 color positions`

::: info ℹ️ Reading notes
- `xy()`, `x()` and `y()` use pixel cell centers: X increases rightward and Y downward. `(0, 0)` means not found. `grid()` returns an `8 × 6` grid with Y increasing upward.
- Main readings use EV3 infrared communication mode `1` (Beacon).
:::

**Mode ID setup**

Select Mode ID `12`{.code-green} on the camera, then set `mode=12` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=12)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | Position X/Y of a selected color | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• Returns `(X, Y)` in pixels.<br>• Argument range: `1 ~ 8`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.x(1)`{.code-blue} | X of a selected color | `0, 10 ~ 150`<br>• Returns the pixel X coordinate.<br>• Argument range: `1 ~ 8`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.y(1)`{.code-blue} | Y of a selected color | `0, 9 ~ 109`<br>• Returns the pixel Y coordinate.<br>• Argument range: `1 ~ 8`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.found(1)`{.code-blue} | Whether a selected color was found | `True / False`<br>• `True` means found; `False` means not found.<br>• Argument range: `1 ~ 8`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.grid(1)`{.code-blue} | Grid position of a selected color | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• Returns raw grid `(X, Y)`; Y increases upward.<br>• Argument range: `1 ~ 8`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.max_color()`{.code-blue} | Color capacity | `8`<br>• Returns the number of color positions available in this mode. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Library provides: 4 color positions`

::: info ℹ️ Reading notes
- `xy()`, `x()` and `y()` use pixel cell centers: X increases rightward and Y downward. `(0, 0)` means not found. `grid()` returns an `8 × 6` grid with Y increasing upward.
- Main readings use EV3 infrared communication mode `1` (Beacon).
:::

**Mode ID setup**

Select Mode ID `13`{.code-green} on the camera, then set `mode=13` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=13)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | Position X/Y of a selected color | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• Returns `(X, Y)` in pixels.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.x(1)`{.code-blue} | X of a selected color | `0, 10 ~ 150`<br>• Returns the pixel X coordinate.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.y(1)`{.code-blue} | Y of a selected color | `0, 9 ~ 109`<br>• Returns the pixel Y coordinate.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.found(1)`{.code-blue} | Whether a selected color was found | `True / False`<br>• `True` means found; `False` means not found.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.grid(1)`{.code-blue} | Grid position of a selected color | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• Returns raw grid `(X, Y)`; Y increases upward.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.area(1)`{.code-blue} | Area of a selected color | `0 ~ 100`<br>• Returns the selected color’s area.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.max_color()`{.code-blue} | Color capacity | `4`<br>• Returns the number of color positions available in this mode. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Library provides: 2 color positions`

::: info ℹ️ Reading notes
- `xy()`, `x()` and `y()` use pixel cell centers: X increases rightward and Y downward. `(0, 0)` means not found. `grid()` returns an `8 × 6` grid with Y increasing upward.
- Main readings use EV3 infrared communication mode `1` (Beacon).
:::

**Mode ID setup**

Select Mode ID `14`{.code-green} on the camera, then set `mode=14` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=14)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | Position X/Y of a selected color | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• Returns `(X, Y)` in pixels.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.x(1)`{.code-blue} | X of a selected color | `0, 10 ~ 150`<br>• Returns the pixel X coordinate.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.y(1)`{.code-blue} | Y of a selected color | `0, 9 ~ 109`<br>• Returns the pixel Y coordinate.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.found(1)`{.code-blue} | Whether a selected color was found | `True / False`<br>• `True` means found; `False` means not found.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.grid(1)`{.code-blue} | Grid position of a selected color | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• Returns raw grid `(X, Y)`; Y increases upward.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.area(1)`{.code-blue} | Area of a selected color | `0 ~ 100`<br>• Returns the selected color’s area.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.size(1)`{.code-blue} | Width/height of a selected color | `W: 0, 10 ~ 150 / H: 0, 10 ~ 110`<br>• Returns `(width, height)` in pixels, converted from coarse grid values.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.count(1)`{.code-blue} | Blob count of a selected color | `0 ~ 15`<br>• Returns the blob count for that target color.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the color index. Example `1` selects the first. |
| `cam.max_color()`{.code-blue} | Color capacity | `2`<br>• Returns the number of color positions available in this mode. |

</CamModeSection>

#### Mode 2 - Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Library provides: 12 sampling points`

::: info ℹ️ Reading notes
- Set sampling point positions on the camera before reading. Unconfigured points return 0; hue 0 can also mean red.
- `hsv()` returns `(H, None, None)`.
- Main readings use EV3 infrared communication mode `1` (Beacon).
- Additional fields also use communication mode `2` (Remote). Switching read modes takes about 1.1 seconds; read only the fields needed by the program.
:::

**Mode ID setup**

Select Mode ID `21`{.code-green} on the camera, then set `mode=21` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=21)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | Hue at a sampling point | `0 ~ 255`<br>• Returns the hue at the selected point.<br>• Argument range: `1 ~ 12`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.hsv(1)`{.code-blue} | HSV at a sampling point | `tuple[3]`<br>• Returns `(H, S, V)`.<br>• Argument range: `1 ~ 12`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.color(1)`{.code-blue} | Color name at a sampling point | `str`<br>• Returns `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `white`, or `black`.<br>• Argument range: `1 ~ 12`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.max_point()`{.code-blue} | Sampling point capacity | `12`<br>• Returns the sampling point capacity. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Library provides: 4 sampling points`

::: info ℹ️ Reading notes
- Set sampling point positions on the camera before reading. Unconfigured points return 0; hue 0 can also mean red.
- Saturation and value are multiples of 10 in `0 ~ 90`; the library has already unpacked both components.
- Main readings use EV3 infrared communication mode `1` (Beacon).
:::

**Mode ID setup**

Select Mode ID `22`{.code-green} on the camera, then set `mode=22` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=22)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | Hue at a sampling point | `0 ~ 255`<br>• Returns the hue at the selected point.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.sat(1)`{.code-blue} | Saturation at a sampling point | `0 ~ 90`<br>• Returns the saturation at the selected point.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.val(1)`{.code-blue} | Value at a sampling point | `0 ~ 90`<br>• Returns the value at the selected point.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.hsv(1)`{.code-blue} | HSV at a sampling point | `tuple[3]`<br>• Returns `(H, S, V)`.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.color(1)`{.code-blue} | Color name at a sampling point | `str`<br>• Returns `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `white`, or `black`.<br>• Argument range: `1 ~ 4`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.max_point()`{.code-blue} | Sampling point capacity | `4`<br>• Returns the sampling point capacity. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Library provides: 2 sampling points`

::: info ℹ️ Reading notes
- Set sampling point positions on the camera before reading. Unconfigured points return 0; hue 0 can also mean red.
- Main readings use EV3 infrared communication mode `1` (Beacon).
:::

**Mode ID setup**

Select Mode ID `23`{.code-green} on the camera, then set `mode=23` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=23)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | Hue at a sampling point | `0 ~ 255`<br>• Returns the hue at the selected point.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.sat(1)`{.code-blue} | Saturation at a sampling point | `0 ~ 100`<br>• Returns the saturation at the selected point.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.val(1)`{.code-blue} | Value at a sampling point | `0 ~ 100`<br>• Returns the value at the selected point.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.hsv(1)`{.code-blue} | HSV at a sampling point | `tuple[3]`<br>• Returns `(H, S, V)`.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.color(1)`{.code-blue} | Color name at a sampling point | `str`<br>• Returns `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `white`, or `black`.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the sampling point index. Example `1` selects the first. |
| `cam.max_point()`{.code-blue} | Sampling point capacity | `2`<br>• Returns the sampling point capacity. |

</CamModeSection>

#### Mode 3 - Color order

<CamModeSection mode="30" title="Color order">

`Library provides: 11 ordered hue codes`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Hue 0 can mean red; use the list length rather than hue to determine valid entries.
- Main readings use EV3 infrared communication mode `1` (Beacon).
- Additional fields also use communication mode `2` (Remote). Switching read modes takes about 1.1 seconds; read only the fields needed by the program.
:::

**Mode ID setup**

Select Mode ID `30`{.code-green} on the camera, then set `mode=30` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=30)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.order()`{.code-blue} | Color order from left to right | `list[0 ~ 11]`<br>• Returns hue codes left to right; each hue is `0 ~ 255`. |
| `cam.total()`{.code-blue} | Total blocks | `0 ~ 18`<br>• Returns the total blocks, which can exceed the list capacity of 11. |

</CamModeSection>

#### Mode 4 - Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Library provides: Line and junction data`

::: info ℹ️ Reading notes
- Offsets are negative on the left and positive on the right. Angles retain their signs.
- Main readings use EV3 infrared communication mode `1` (Beacon).
- Additional fields also use communication mode `2` (Remote). Switching read modes takes about 1.1 seconds; read only the fields needed by the program.
:::

**Mode ID setup**

Select Mode ID `41`{.code-green} on the camera, then set `mode=41` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=41)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.near()`{.code-blue} | Near offset | `-100 ~ 100`<br>• Returns the near line offset. |
| `cam.mid()`{.code-blue} | Middle offset | `-100 ~ 100`<br>• Returns the middle line offset. |
| `cam.far()`{.code-blue} | Far offset | `-100 ~ 100`<br>• Returns the far line offset. |
| `cam.angle()`{.code-blue} | Line angle | `-90 ~ 90`<br>• Returns the line angle. |
| `cam.width()`{.code-blue} | Near line width | `0 ~ 100`<br>• Returns the near line width. |
| `cam.flags()`{.code-blue} | Line flags | `0 ~ 7`<br>• Flags = near 1 + middle 2 + far 4. |
| `cam.junction()`{.code-blue} | Junction type | `0 ~ 5`<br>• 0 = none, 1 = cross, 2 = T, 3 = left, 4 = right, 5 = dead end. |
| `cam.junction_dist()`{.code-blue} | Junction distance | `0 ~ 100`<br>• Returns the junction distance. |
| `cam.edges()`{.code-blue} | Left/right edges | `-100 ~ 100`<br>• Returns `(left, right)` edges. |
| `cam.far_width()`{.code-blue} | Far line width | `0 ~ 100`<br>• Returns the far line width. |
| `cam.marker()`{.code-blue} | Marker color/count | `Color: 0 ~ 16 / Count: 0 ~ 99`<br>• Returns `(marker color, accumulated count)`. |
| `cam.line_all()`{.code-blue} | All line data | `tuple[13]`<br>• Returns near/middle/far offsets, angle, near width, flags, junction, junction distance, left/right edges, far width, marker color, and marker count. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Library provides: Line and junction data`

::: info ℹ️ Reading notes
- Offsets are negative on the left and positive on the right. Angles retain their signs.
- Main readings use EV3 infrared communication mode `1` (Beacon).
- Additional fields also use communication mode `2` (Remote). Switching read modes takes about 1.1 seconds; read only the fields needed by the program.
:::

**Mode ID setup**

Select Mode ID `42`{.code-green} on the camera, then set `mode=42` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=42)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.near()`{.code-blue} | Near offset | `-100 ~ 100`<br>• Returns the near line offset. |
| `cam.mid()`{.code-blue} | Middle offset | `-100 ~ 100`<br>• Returns the middle line offset. |
| `cam.far()`{.code-blue} | Far offset | `-100 ~ 100`<br>• Returns the far line offset. |
| `cam.angle()`{.code-blue} | Line angle | `-90 ~ 90`<br>• Returns the line angle. |
| `cam.width()`{.code-blue} | Near line width | `0 ~ 100`<br>• Returns the near line width. |
| `cam.flags()`{.code-blue} | Line flags | `0 ~ 7`<br>• Flags = near 1 + middle 2 + far 4. |
| `cam.junction()`{.code-blue} | Junction type | `0 ~ 5`<br>• 0 = none, 1 = cross, 2 = T, 3 = left, 4 = right, 5 = dead end. |
| `cam.junction_dist()`{.code-blue} | Junction distance | `0 ~ 100`<br>• Returns the junction distance. |
| `cam.edges()`{.code-blue} | Left/right edges | `-100 ~ 100`<br>• Returns `(left, right)` edges. |
| `cam.far_width()`{.code-blue} | Far line width | `0 ~ 100`<br>• Returns the far line width. |
| `cam.marker()`{.code-blue} | Marker color/count | `Color: 0 ~ 16 / Count: 0 ~ 99`<br>• Returns `(marker color, accumulated count)`. |
| `cam.line_all()`{.code-blue} | All line data | `tuple[13]`<br>• Returns near/middle/far offsets, angle, near width, flags, junction, junction distance, left/right edges, far width, marker color, and marker count. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Library provides: Line and junction data`

::: info ℹ️ Reading notes
- Offsets are negative on the left and positive on the right. Angles retain their signs.
- Teach the line color as target color 1.
- Main readings use EV3 infrared communication mode `1` (Beacon).
- Additional fields also use communication mode `2` (Remote). Switching read modes takes about 1.1 seconds; read only the fields needed by the program.
:::

**Mode ID setup**

Select Mode ID `43`{.code-green} on the camera, then set `mode=43` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=43)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.near()`{.code-blue} | Near offset | `-100 ~ 100`<br>• Returns the near line offset. |
| `cam.mid()`{.code-blue} | Middle offset | `-100 ~ 100`<br>• Returns the middle line offset. |
| `cam.far()`{.code-blue} | Far offset | `-100 ~ 100`<br>• Returns the far line offset. |
| `cam.angle()`{.code-blue} | Line angle | `-90 ~ 90`<br>• Returns the line angle. |
| `cam.width()`{.code-blue} | Near line width | `0 ~ 100`<br>• Returns the near line width. |
| `cam.flags()`{.code-blue} | Line flags | `0 ~ 7`<br>• Flags = near 1 + middle 2 + far 4. |
| `cam.junction()`{.code-blue} | Junction type | `0 ~ 5`<br>• 0 = none, 1 = cross, 2 = T, 3 = left, 4 = right, 5 = dead end. |
| `cam.junction_dist()`{.code-blue} | Junction distance | `0 ~ 100`<br>• Returns the junction distance. |
| `cam.edges()`{.code-blue} | Left/right edges | `-100 ~ 100`<br>• Returns `(left, right)` edges. |
| `cam.far_width()`{.code-blue} | Far line width | `0 ~ 100`<br>• Returns the far line width. |
| `cam.marker()`{.code-blue} | Marker color/count | `Color: 0 ~ 16 / Count: 0 ~ 99`<br>• Returns `(marker color, accumulated count)`. |
| `cam.line_all()`{.code-blue} | All line data | `tuple[13]`<br>• Returns near/middle/far offsets, angle, near width, flags, junction, junction distance, left/right edges, far width, marker color, and marker count. |

</CamModeSection>

#### Mode 5 - Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Library provides: 5 objects`

::: info ℹ️ Reading notes
- Objects are sorted largest first; only target colors 1 ~ 8 are detected. Code = color number × 10 + shape; 0 means no object.
- `object_xy()` uses pixel cell centers with Y increasing downward. `object_grid()` returns an `8 × 6` grid with Y increasing upward. `(0, 0)` means no object.
- Shape codes 0 ~ 9: Other, Circle, Ellipse, Triangle, Square, Rectangle, Pentagon, Hexagon, Star, Trapezoid.
- Main readings use EV3 infrared communication mode `1` (Beacon).
- Additional fields also use communication mode `2` (Remote). Switching read modes takes about 1.1 seconds; read only the fields needed by the program.
:::

**Mode ID setup**

Select Mode ID `51`{.code-green} on the camera, then set `mode=51` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=51)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.max_object()`{.code-blue} | Object capacity | `5`<br>• Returns the number of available objects. |
| `cam.object_count()`{.code-blue} | Objects found | `0 ~ 8`<br>• Returns the total objects in view. |
| `cam.object(1)`{.code-blue} | Code of a selected object | `0, 10 ~ 89`<br>• Code = color number × 10 + shape; 0 means no object.<br>• Argument range: `1 ~ 5`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_found(1)`{.code-blue} | Whether a selected object was found | `True / False`<br>• `True` means found; `False` means not found.<br>• Argument range: `1 ~ 5`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_color(1)`{.code-blue} | Color of a selected object | `0 ~ 8`<br>• Returns the target color number; 0 means no object.<br>• Argument range: `1 ~ 5`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_shape(1)`{.code-blue} | Shape of a selected object | `0 ~ 9`<br>• Returns the shape code; check `object_found()` first.<br>• Argument range: `1 ~ 5`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_grid(1)`{.code-blue} | Grid position of a selected object | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• Returns raw grid centroid `(X, Y)`; Y increases upward.<br>• Argument range: `1 ~ 5`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_xy(1)`{.code-blue} | Pixel position of a selected object | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• Returns pixel centroid `(X, Y)`.<br>• Argument range: `1 ~ 5`{.code-green}, selecting the object index. Example `1` selects the first. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Library provides: 2 objects`

::: info ℹ️ Reading notes
- Objects are sorted largest first; only target colors 1 ~ 8 are detected. Code = color number × 10 + shape; 0 means no object.
- `object_xy()` uses pixel cell centers with Y increasing downward. `object_grid()` returns an `8 × 6` grid with Y increasing upward. `(0, 0)` means no object.
- Shape codes 0 ~ 9: Other, Circle, Ellipse, Triangle, Square, Rectangle, Pentagon, Hexagon, Star, Trapezoid.
- Main readings use EV3 infrared communication mode `1` (Beacon).
:::

**Mode ID setup**

Select Mode ID `52`{.code-green} on the camera, then set `mode=52` in the program. This EV3 argument selects decoding and does not switch the camera mode.

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=52)
```

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `cam.max_object()`{.code-blue} | Object capacity | `2`<br>• Returns the number of available objects. |
| `cam.object(1)`{.code-blue} | Code of a selected object | `0, 10 ~ 89`<br>• Code = color number × 10 + shape; 0 means no object.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_found(1)`{.code-blue} | Whether a selected object was found | `True / False`<br>• `True` means found; `False` means not found.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_color(1)`{.code-blue} | Color of a selected object | `0 ~ 8`<br>• Returns the target color number; 0 means no object.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_shape(1)`{.code-blue} | Shape of a selected object | `0 ~ 9`<br>• Returns the shape code; check `object_found()` first.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_grid(1)`{.code-blue} | Grid position of a selected object | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• Returns raw grid centroid `(X, Y)`; Y increases upward.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_xy(1)`{.code-blue} | Pixel position of a selected object | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• Returns pixel centroid `(X, Y)`.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_area(1)`{.code-blue} | Area of a selected object | `0 ~ 100`<br>• Returns the selected object’s area.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the object index. Example `1` selects the first. |
| `cam.object_angle(1)`{.code-blue} | Angle of a selected object | `0 ~ 179`<br>• Returns the long-side angle: right = 0, clockwise on screen = positive. The library applies the factor of two.<br>• Argument range: `1 ~ 2`{.code-green}, selecting the object index. Example `1` selects the first. |

</CamModeSection>

</CamModeAccordion>

## 04 / Example programs

### ▸ Basic control

#### ▸ Read target 1 position and area

Teach target color 1 and set the camera to mode 13 (Color Tracking - ③ Standard).

```python
#!/usr/bin/env pybricks-micropython
from pybricks.parameters import Port
try:
    from pybricks.iodevices import Ev3devSensor
except ImportError:
    from pybricks.iodevices import LUMPDevice
    cam = LUMPDevice(Port.S1)
    def readCamera(mode):
        return cam.read(mode)
else:
    cam = Ev3devSensor(Port.S1)
    def readCamera(mode):
        names = {0: "IR-PROX", 1: "IR-SEEK", 2: "IR-REMOTE", 5: "IR-CAL"}
        return cam.read(names[mode])

from pybricks.tools import wait
if readCamera(0)[0] != 13:
    raise RuntimeError("Select Color Tracking Standard (13)")

while True:
    position, area = readCamera(1)[:2]
    if position:
        x, y = divmod(position, 10)
        print(x, y, area)
    else:
        print("No target")
    wait(100)
```

For Object Details (52), change the startup mode check to 52. The first four Beacon slots are code, position, area, and half-angle. If code is nonzero, use divmod(code, 10) to split color and shape, and divmod(position, 10) to split the position.

#### ▸ Read two objects in Object Details mode

Select camera Mode ID 52. This program calls readCamera(1) once per loop, with four slots per object.

```python
#!/usr/bin/env pybricks-micropython
from pybricks.parameters import Port
try:
    from pybricks.iodevices import Ev3devSensor
except ImportError:
    from pybricks.iodevices import LUMPDevice
    cam = LUMPDevice(Port.S1)
    def readCamera(mode):
        return cam.read(mode)
else:
    cam = Ev3devSensor(Port.S1)
    def readCamera(mode):
        names = {0: "IR-PROX", 1: "IR-SEEK", 2: "IR-REMOTE", 5: "IR-CAL"}
        return cam.read(names[mode])

from pybricks.tools import wait
if readCamera(0)[0] != 52:
    raise RuntimeError("Select Object Details (52)")

while True:
    values = readCamera(1)
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

## 05 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
