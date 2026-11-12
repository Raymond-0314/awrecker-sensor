# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® Education SPIKE™ Prime Set<br>LEGO® MINDSTORMS® Robot Inventor |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE edition) |
| Programming environment | Pybricks Python |

### ✔ Before you begin

::: warning ⚠️ Caution
The MBC SharpShot Vision Camera Sensor supports two approaches: `Basic Control`{.code-blue} and `Advanced Control`{.code-blue}.

- `Basic Control`{.code-blue}: Read native sensor data and decode it in your program, without an external library.
- `Advanced Control`{.code-blue}: Import the `MBC SharpShot Vision Camera Sensor Pybricks - SPIKE Library`{.code-blue-text} and use its reading functions.

Download the library if needed:

<DownloadButton href="/programs/Cam/spike-pybricks/MBC_UniCam.py" download="MBC_UniCam.py" label="v4.1 Library" />

:::


1. Start your robot and open Pybricks Python.
2. Check that the hub runs Pybricks firmware and that the camera is connected.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Basic Control - Setup and Function Reference

### ✔ Setting Up the Decoding Functions

1. Open your Pybricks program and enter the camera setup code below. Place the remaining drivetrain, motor, and sensor initialization code after it.
2. Import `PUPDevice` and `Port`, then create `cam = PUPDevice(Port.A)`. Connect the camera to Port A.
3. Add the decoding functions below. `readCamera()` reads and unpacks bytes; `signedByte()` decodes signed line values. Both functions are defined in this program and do not require an external library.

```python
from pybricks.iodevices import PUPDevice
from pybricks.parameters import Port

cam = PUPDevice(Port.A)

def readCamera(mode=9):
    data = []
    for word in cam.read(mode):
        data.append(word & 255)
        data.append((word >> 8) & 255)
    return data

def signedByte(value):
    return value - 256 if value > 127 else value
```

### ✔ Function Reference

| Code | Function | Returned values |
| --- | --- | --- |
| `cam = PUPDevice(Port.A)`{.code-blue} | Camera setup | `PUPDevice`<br>• Creates the camera interface on Port A. Use `cam.read(mode)` for raw readings. |
| `readCamera()`{.code-blue} | Read mode data | `list[14]`<br>• Reads communication mode 9 and unpacks its 7 words into 14 bytes, low byte first. Each table uses `data = readCamera()`. |
| `signedByte(value)`{.code-blue} | Decode signed byte | `-128 ~ 127`<br>• Returns `value - 256` when `value > 127`; otherwise returns `value`. |

::: info ℹ️ Reading notes
- In formulas, `÷` means integer division and `mod` means remainder. Executable Python uses `//` and `%`. Store one reading in `data` before decoding its fields.
:::

<CamModeAccordion namespace="basic">

### ✔ Camera mode overview

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 - Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`Native interface provides: 14 color positions`

::: info ℹ️ Reading notes
- Positions use pixels; X increases rightward and Y downward. `(0, 0)` means no target.
- Position codes use a `16 × 12` grid. A code of `0` means not found; only apply the formulas to nonzero codes. Pixel positions are cell centers.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `11`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Position of color 1 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[1]`{.code-blue} | Position of color 2 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[2]`{.code-blue} | Position of color 3 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[3]`{.code-blue} | Position of color 4 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[4]`{.code-blue} | Position of color 5 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[5]`{.code-blue} | Position of color 6 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[6]`{.code-blue} | Position of color 7 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[7]`{.code-blue} | Position of color 8 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[8]`{.code-blue} | Position of color 9 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[9]`{.code-blue} | Position of color 10 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[10]`{.code-blue} | Position of color 11 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[11]`{.code-blue} | Position of color 12 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[12]`{.code-blue} | Position of color 13 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |
| `data[13]`{.code-blue} | Position of color 14 | `0 ~ 192`<br>• Grid X = (value - 1) mod 16 + 1; grid Y = (value - 1) ÷ 16 + 1.<br>• Pixel X = (grid X - 1) × 10 + 5; pixel Y = (grid Y - 1) × 10 + 5. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Native interface provides: 7 color positions`

::: info ℹ️ Reading notes
- Positions use pixels; X increases rightward and Y downward. `(0, 0)` means no target.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `12`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | X of color 1 | `0 ~ 159`<br>• X of color 1 = value. |
| `data[1]`{.code-blue} | Y of color 1 | `0 ~ 119`<br>• Y of color 1 = value. |
| `data[2]`{.code-blue} | X of color 2 | `0 ~ 159`<br>• X of color 2 = value. |
| `data[3]`{.code-blue} | Y of color 2 | `0 ~ 119`<br>• Y of color 2 = value. |
| `data[4]`{.code-blue} | X of color 3 | `0 ~ 159`<br>• X of color 3 = value. |
| `data[5]`{.code-blue} | Y of color 3 | `0 ~ 119`<br>• Y of color 3 = value. |
| `data[6]`{.code-blue} | X of color 4 | `0 ~ 159`<br>• X of color 4 = value. |
| `data[7]`{.code-blue} | Y of color 4 | `0 ~ 119`<br>• Y of color 4 = value. |
| `data[8]`{.code-blue} | X of color 5 | `0 ~ 159`<br>• X of color 5 = value. |
| `data[9]`{.code-blue} | Y of color 5 | `0 ~ 119`<br>• Y of color 5 = value. |
| `data[10]`{.code-blue} | X of color 6 | `0 ~ 159`<br>• X of color 6 = value. |
| `data[11]`{.code-blue} | Y of color 6 | `0 ~ 119`<br>• Y of color 6 = value. |
| `data[12]`{.code-blue} | X of color 7 | `0 ~ 159`<br>• X of color 7 = value. |
| `data[13]`{.code-blue} | Y of color 7 | `0 ~ 119`<br>• Y of color 7 = value. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Native interface provides: 4 color positions`

::: info ℹ️ Reading notes
- Positions use pixels; X increases rightward and Y downward. `(0, 0)` means no target.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `13`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | X of color 1 | `0 ~ 159`<br>• X of color 1 = value. |
| `data[1]`{.code-blue} | Y of color 1 | `0 ~ 119`<br>• Y of color 1 = value. |
| `data[2]`{.code-blue} | Area of color 1 | `0 ~ 100`<br>• Area of color 1 = value. |
| `data[3]`{.code-blue} | X of color 2 | `0 ~ 159`<br>• X of color 2 = value. |
| `data[4]`{.code-blue} | Y of color 2 | `0 ~ 119`<br>• Y of color 2 = value. |
| `data[5]`{.code-blue} | Area of color 2 | `0 ~ 100`<br>• Area of color 2 = value. |
| `data[6]`{.code-blue} | X of color 3 | `0 ~ 159`<br>• X of color 3 = value. |
| `data[7]`{.code-blue} | Y of color 3 | `0 ~ 119`<br>• Y of color 3 = value. |
| `data[8]`{.code-blue} | Area of color 3 | `0 ~ 100`<br>• Area of color 3 = value. |
| `data[9]`{.code-blue} | X of color 4 | `0 ~ 159`<br>• X of color 4 = value. |
| `data[10]`{.code-blue} | Y of color 4 | `0 ~ 119`<br>• Y of color 4 = value. |
| `data[11]`{.code-blue} | Area of color 4 | `0 ~ 100`<br>• Area of color 4 = value. |
| `data[12]`{.code-blue} | Blob count of color 1 | `0 ~ 255`<br>• Blob count of color 1 = value ÷ 16, range `0 ~ 15`{.code-green}. |
| `data[12]`{.code-blue} | Blob count of color 2 | `0 ~ 255`<br>• Blob count of color 2 = value mod 16, range `0 ~ 15`{.code-green}. |
| `data[13]`{.code-blue} | Blob count of color 3 | `0 ~ 255`<br>• Blob count of color 3 = value ÷ 16, range `0 ~ 15`{.code-green}. |
| `data[13]`{.code-blue} | Blob count of color 4 | `0 ~ 255`<br>• Blob count of color 4 = value mod 16, range `0 ~ 15`{.code-green}. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Native interface provides: 2 color positions`

::: info ℹ️ Reading notes
- Positions use pixels; X increases rightward and Y downward. `(0, 0)` means no target.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `14`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | X of color 1 | `0 ~ 159`<br>• X of color 1 = value. |
| `data[1]`{.code-blue} | Y of color 1 | `0 ~ 119`<br>• Y of color 1 = value. |
| `data[2]`{.code-blue} | Width of color 1 | `0 ~ 160`<br>• Width of color 1 = value. |
| `data[3]`{.code-blue} | Height of color 1 | `0 ~ 120`<br>• Height of color 1 = value. |
| `data[4]`{.code-blue} | Blob count of color 1 | `0 ~ 15`<br>• Blob count of color 1 = value. |
| `data[5]`{.code-blue} | Area of color 1 | `0 ~ 100`<br>• Area of color 1 = value. |
| `data[6]`{.code-blue} | X of color 2 | `0 ~ 159`<br>• X of color 2 = value. |
| `data[7]`{.code-blue} | Y of color 2 | `0 ~ 119`<br>• Y of color 2 = value. |
| `data[8]`{.code-blue} | Width of color 2 | `0 ~ 160`<br>• Width of color 2 = value. |
| `data[9]`{.code-blue} | Height of color 2 | `0 ~ 120`<br>• Height of color 2 = value. |
| `data[10]`{.code-blue} | Blob count of color 2 | `0 ~ 15`<br>• Blob count of color 2 = value. |
| `data[11]`{.code-blue} | Area of color 2 | `0 ~ 100`<br>• Area of color 2 = value. |
| `data[12]`{.code-blue} | Colors found | `0 ~ 16`<br>• Colors found = value. |

</CamModeSection>

#### Mode 2 - Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Native interface provides: 14 sampling points`

::: info ℹ️ Reading notes
- Configure sampling point positions on the camera first. Unconfigured points return 0; hue 0 can also mean red.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `21`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Hue of S1 | `0 ~ 255`<br>• Hue of S1 = value. |
| `data[1]`{.code-blue} | Hue of S2 | `0 ~ 255`<br>• Hue of S2 = value. |
| `data[2]`{.code-blue} | Hue of S3 | `0 ~ 255`<br>• Hue of S3 = value. |
| `data[3]`{.code-blue} | Hue of S4 | `0 ~ 255`<br>• Hue of S4 = value. |
| `data[4]`{.code-blue} | Hue of S5 | `0 ~ 255`<br>• Hue of S5 = value. |
| `data[5]`{.code-blue} | Hue of S6 | `0 ~ 255`<br>• Hue of S6 = value. |
| `data[6]`{.code-blue} | Hue of S7 | `0 ~ 255`<br>• Hue of S7 = value. |
| `data[7]`{.code-blue} | Hue of S8 | `0 ~ 255`<br>• Hue of S8 = value. |
| `data[8]`{.code-blue} | Hue of S9 | `0 ~ 255`<br>• Hue of S9 = value. |
| `data[9]`{.code-blue} | Hue of S10 | `0 ~ 255`<br>• Hue of S10 = value. |
| `data[10]`{.code-blue} | Hue of S11 | `0 ~ 255`<br>• Hue of S11 = value. |
| `data[11]`{.code-blue} | Hue of S12 | `0 ~ 255`<br>• Hue of S12 = value. |
| `data[12]`{.code-blue} | Hue of S13 | `0 ~ 255`<br>• Hue of S13 = value. |
| `data[13]`{.code-blue} | Hue of S14 | `0 ~ 255`<br>• Hue of S14 = value. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Native interface provides: 7 sampling points`

::: info ℹ️ Reading notes
- Configure sampling point positions on the camera first. Unconfigured points return 0; hue 0 can also mean red.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `22`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Hue of S1 | `0 ~ 255`<br>• Hue of S1 = value. |
| `data[1]`{.code-blue} | Saturation of S1 | `0 ~ 100`<br>• Saturation of S1 = value. |
| `data[2]`{.code-blue} | Hue of S2 | `0 ~ 255`<br>• Hue of S2 = value. |
| `data[3]`{.code-blue} | Saturation of S2 | `0 ~ 100`<br>• Saturation of S2 = value. |
| `data[4]`{.code-blue} | Hue of S3 | `0 ~ 255`<br>• Hue of S3 = value. |
| `data[5]`{.code-blue} | Saturation of S3 | `0 ~ 100`<br>• Saturation of S3 = value. |
| `data[6]`{.code-blue} | Hue of S4 | `0 ~ 255`<br>• Hue of S4 = value. |
| `data[7]`{.code-blue} | Saturation of S4 | `0 ~ 100`<br>• Saturation of S4 = value. |
| `data[8]`{.code-blue} | Hue of S5 | `0 ~ 255`<br>• Hue of S5 = value. |
| `data[9]`{.code-blue} | Saturation of S5 | `0 ~ 100`<br>• Saturation of S5 = value. |
| `data[10]`{.code-blue} | Hue of S6 | `0 ~ 255`<br>• Hue of S6 = value. |
| `data[11]`{.code-blue} | Saturation of S6 | `0 ~ 100`<br>• Saturation of S6 = value. |
| `data[12]`{.code-blue} | Hue of S7 | `0 ~ 255`<br>• Hue of S7 = value. |
| `data[13]`{.code-blue} | Saturation of S7 | `0 ~ 100`<br>• Saturation of S7 = value. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Native interface provides: 4 sampling points`

::: info ℹ️ Reading notes
- Configure sampling point positions on the camera first. Unconfigured points return 0; hue 0 can also mean red.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `23`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Hue of S1 | `0 ~ 255`<br>• Hue of S1 = value. |
| `data[1]`{.code-blue} | Saturation of S1 | `0 ~ 100`<br>• Saturation of S1 = value. |
| `data[2]`{.code-blue} | Value of S1 | `0 ~ 100`<br>• Value of S1 = value. |
| `data[3]`{.code-blue} | Hue of S2 | `0 ~ 255`<br>• Hue of S2 = value. |
| `data[4]`{.code-blue} | Saturation of S2 | `0 ~ 100`<br>• Saturation of S2 = value. |
| `data[5]`{.code-blue} | Value of S2 | `0 ~ 100`<br>• Value of S2 = value. |
| `data[6]`{.code-blue} | Hue of S3 | `0 ~ 255`<br>• Hue of S3 = value. |
| `data[7]`{.code-blue} | Saturation of S3 | `0 ~ 100`<br>• Saturation of S3 = value. |
| `data[8]`{.code-blue} | Value of S3 | `0 ~ 100`<br>• Value of S3 = value. |
| `data[9]`{.code-blue} | Hue of S4 | `0 ~ 255`<br>• Hue of S4 = value. |
| `data[10]`{.code-blue} | Saturation of S4 | `0 ~ 100`<br>• Saturation of S4 = value. |
| `data[11]`{.code-blue} | Value of S4 | `0 ~ 100`<br>• Value of S4 = value. |

</CamModeSection>

#### Mode 3 - Color order

<CamModeSection mode="30" title="Color order">

`Native interface provides: 13 ordered hue codes`

::: info ℹ️ Reading notes
- Color blocks are ordered left to right. Use the total count to determine valid entries; the data contains at most 13 hue codes. Hue 0 can mean red.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `30`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Hue of block 1 | `0 ~ 255`<br>• Hue of block 1 = value. |
| `data[1]`{.code-blue} | Hue of block 2 | `0 ~ 255`<br>• Hue of block 2 = value. |
| `data[2]`{.code-blue} | Hue of block 3 | `0 ~ 255`<br>• Hue of block 3 = value. |
| `data[3]`{.code-blue} | Hue of block 4 | `0 ~ 255`<br>• Hue of block 4 = value. |
| `data[4]`{.code-blue} | Hue of block 5 | `0 ~ 255`<br>• Hue of block 5 = value. |
| `data[5]`{.code-blue} | Hue of block 6 | `0 ~ 255`<br>• Hue of block 6 = value. |
| `data[6]`{.code-blue} | Hue of block 7 | `0 ~ 255`<br>• Hue of block 7 = value. |
| `data[7]`{.code-blue} | Hue of block 8 | `0 ~ 255`<br>• Hue of block 8 = value. |
| `data[8]`{.code-blue} | Hue of block 9 | `0 ~ 255`<br>• Hue of block 9 = value. |
| `data[9]`{.code-blue} | Hue of block 10 | `0 ~ 255`<br>• Hue of block 10 = value. |
| `data[10]`{.code-blue} | Hue of block 11 | `0 ~ 255`<br>• Hue of block 11 = value. |
| `data[11]`{.code-blue} | Hue of block 12 | `0 ~ 255`<br>• Hue of block 12 = value. |
| `data[12]`{.code-blue} | Hue of block 13 | `0 ~ 255`<br>• Hue of block 13 = value. |
| `data[13]`{.code-blue} | Total blocks | `0 ~ 18`<br>• Total blocks = value. |

</CamModeSection>

#### Mode 4 - Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Native interface provides: Line position, junction and marker data`

::: info ℹ️ Reading notes
- Decode offsets, angles and edges with `signedByte()`; negative means left and positive means right.
- Junction: 0 = none, 1 = cross, 2 = T, 3 = left, 4 = right, 5 = dead end. Flags = near 1 + middle 2 + far 4. Last lost direction: 0 = line, 1 = left, 2 = right.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `41`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Near offset | `0 ~ 255`<br>• Near offset = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[1]`{.code-blue} | Middle offset | `0 ~ 255`<br>• Middle offset = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[2]`{.code-blue} | Far offset | `0 ~ 255`<br>• Far offset = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[3]`{.code-blue} | Angle | `0 ~ 255`<br>• Angle = signedByte(value).<br>• Decoded range: `-90 ~ 90`{.code-green}. |
| `data[4]`{.code-blue} | Near width | `0 ~ 100`<br>• Near width = value. |
| `data[5]`{.code-blue} | Line flags | `0 ~ 7`<br>• Line flags = value. |
| `data[6]`{.code-blue} | Junction type | `0 ~ 5`<br>• Junction type = value. |
| `data[7]`{.code-blue} | Junction distance | `0 ~ 100`<br>• Junction distance = value. |
| `data[8]`{.code-blue} | Left edge | `0 ~ 255`<br>• Left edge = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[9]`{.code-blue} | Right edge | `0 ~ 255`<br>• Right edge = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[10]`{.code-blue} | Far width | `0 ~ 100`<br>• Far width = value. |
| `data[11]`{.code-blue} | Marker color | `0 ~ 8`<br>• Marker color = value. |
| `data[12]`{.code-blue} | Marker count | `0 ~ 99`<br>• Marker count = value. |
| `data[13]`{.code-blue} | Last lost direction | `0 ~ 2`<br>• Last lost direction = value. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Native interface provides: Line position, junction and marker data`

::: info ℹ️ Reading notes
- Decode offsets, angles and edges with `signedByte()`; negative means left and positive means right.
- Junction: 0 = none, 1 = cross, 2 = T, 3 = left, 4 = right, 5 = dead end. Flags = near 1 + middle 2 + far 4. Last lost direction: 0 = line, 1 = left, 2 = right.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `42`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Near offset | `0 ~ 255`<br>• Near offset = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[1]`{.code-blue} | Middle offset | `0 ~ 255`<br>• Middle offset = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[2]`{.code-blue} | Far offset | `0 ~ 255`<br>• Far offset = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[3]`{.code-blue} | Angle | `0 ~ 255`<br>• Angle = signedByte(value).<br>• Decoded range: `-90 ~ 90`{.code-green}. |
| `data[4]`{.code-blue} | Near width | `0 ~ 100`<br>• Near width = value. |
| `data[5]`{.code-blue} | Line flags | `0 ~ 7`<br>• Line flags = value. |
| `data[6]`{.code-blue} | Junction type | `0 ~ 5`<br>• Junction type = value. |
| `data[7]`{.code-blue} | Junction distance | `0 ~ 100`<br>• Junction distance = value. |
| `data[8]`{.code-blue} | Left edge | `0 ~ 255`<br>• Left edge = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[9]`{.code-blue} | Right edge | `0 ~ 255`<br>• Right edge = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[10]`{.code-blue} | Far width | `0 ~ 100`<br>• Far width = value. |
| `data[11]`{.code-blue} | Marker color | `0 ~ 8`<br>• Marker color = value. |
| `data[12]`{.code-blue} | Marker count | `0 ~ 99`<br>• Marker count = value. |
| `data[13]`{.code-blue} | Last lost direction | `0 ~ 2`<br>• Last lost direction = value. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Native interface provides: Line position, junction and marker data`

::: info ℹ️ Reading notes
- Decode offsets, angles and edges with `signedByte()`; negative means left and positive means right.
- Junction: 0 = none, 1 = cross, 2 = T, 3 = left, 4 = right, 5 = dead end. Flags = near 1 + middle 2 + far 4. Last lost direction: 0 = line, 1 = left, 2 = right.
- Teach the line color as target color 1.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `43`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Near offset | `0 ~ 255`<br>• Near offset = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[1]`{.code-blue} | Middle offset | `0 ~ 255`<br>• Middle offset = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[2]`{.code-blue} | Far offset | `0 ~ 255`<br>• Far offset = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[3]`{.code-blue} | Angle | `0 ~ 255`<br>• Angle = signedByte(value).<br>• Decoded range: `-90 ~ 90`{.code-green}. |
| `data[4]`{.code-blue} | Near width | `0 ~ 100`<br>• Near width = value. |
| `data[5]`{.code-blue} | Line flags | `0 ~ 7`<br>• Line flags = value. |
| `data[6]`{.code-blue} | Junction type | `0 ~ 5`<br>• Junction type = value. |
| `data[7]`{.code-blue} | Junction distance | `0 ~ 100`<br>• Junction distance = value. |
| `data[8]`{.code-blue} | Left edge | `0 ~ 255`<br>• Left edge = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[9]`{.code-blue} | Right edge | `0 ~ 255`<br>• Right edge = signedByte(value).<br>• Decoded range: `-100 ~ 100`{.code-green}. |
| `data[10]`{.code-blue} | Far width | `0 ~ 100`<br>• Far width = value. |
| `data[11]`{.code-blue} | Marker color | `0 ~ 8`<br>• Marker color = value. |
| `data[12]`{.code-blue} | Marker count | `0 ~ 99`<br>• Marker count = value. |
| `data[13]`{.code-blue} | Last lost direction | `0 ~ 2`<br>• Last lost direction = value. |

</CamModeSection>

#### Mode 5 - Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Native interface provides: 4 objects`

::: info ℹ️ Reading notes
- Objects are sorted largest first. Only target colors 1 ~ 8 are detected. Code = color number × 10 + shape; 0 means no object.
- Positions are pixel centroids. X increases rightward and Y downward; `(0, 0)` means no object.
- Shape codes 0 ~ 9: Other, Circle, Ellipse, Triangle, Square, Rectangle, Pentagon, Hexagon, Star, Trapezoid.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `51`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Objects found | `0 ~ 8`<br>• Objects found = value. |
| `data[1]`{.code-blue} | Code of object 1 | `0, 10 ~ 89`<br>• Color number = value ÷ 10; shape = value mod 10. |
| `data[2]`{.code-blue} | X of object 1 | `0 ~ 159`<br>• X of object 1 = value. |
| `data[3]`{.code-blue} | Y of object 1 | `0 ~ 119`<br>• Y of object 1 = value. |
| `data[4]`{.code-blue} | Code of object 2 | `0, 10 ~ 89`<br>• Color number = value ÷ 10; shape = value mod 10. |
| `data[5]`{.code-blue} | X of object 2 | `0 ~ 159`<br>• X of object 2 = value. |
| `data[6]`{.code-blue} | Y of object 2 | `0 ~ 119`<br>• Y of object 2 = value. |
| `data[7]`{.code-blue} | Code of object 3 | `0, 10 ~ 89`<br>• Color number = value ÷ 10; shape = value mod 10. |
| `data[8]`{.code-blue} | X of object 3 | `0 ~ 159`<br>• X of object 3 = value. |
| `data[9]`{.code-blue} | Y of object 3 | `0 ~ 119`<br>• Y of object 3 = value. |
| `data[10]`{.code-blue} | Code of object 4 | `0, 10 ~ 89`<br>• Color number = value ÷ 10; shape = value mod 10. |
| `data[11]`{.code-blue} | X of object 4 | `0 ~ 159`<br>• X of object 4 = value. |
| `data[12]`{.code-blue} | Y of object 4 | `0 ~ 119`<br>• Y of object 4 = value. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Native interface provides: 2 objects`

::: info ℹ️ Reading notes
- Objects are sorted largest first. Only target colors 1 ~ 8 are detected. Code = color number × 10 + shape; 0 means no object.
- Positions are pixel centroids. X increases rightward and Y downward; `(0, 0)` means no object.
- Shape codes 0 ~ 9: Other, Circle, Ellipse, Triangle, Square, Rectangle, Pentagon, Hexagon, Star, Trapezoid.
- Read sensor communication mode `9` with `data = readCamera()` before using the table.
:::

**Mode ID setup**

Select Mode ID `52`{.code-green} on the camera. `PUPDevice` does not select the camera mode automatically.

**Submode function reference**

| Code | Function | Returned values |
| --- | --- | --- |
| `data[0]`{.code-blue} | Color number of object 1 | `0 ~ 8`<br>• Color number of object 1 = value. |
| `data[1]`{.code-blue} | Shape of object 1 | `0 ~ 9`<br>• Shape of object 1 = value. |
| `data[2]`{.code-blue} | X of object 1 | `0 ~ 159`<br>• X of object 1 = value. |
| `data[3]`{.code-blue} | Y of object 1 | `0 ~ 119`<br>• Y of object 1 = value. |
| `data[4]`{.code-blue} | Width of object 1 | `0 ~ 160`<br>• Width of object 1 = value. |
| `data[5]`{.code-blue} | Height of object 1 | `0 ~ 120`<br>• Height of object 1 = value. |
| `data[6]`{.code-blue} | Area of object 1 | `0 ~ 100`<br>• Area of object 1 = value. |
| `data[7]`{.code-blue} | Color number of object 2 | `0 ~ 8`<br>• Color number of object 2 = value. |
| `data[8]`{.code-blue} | Shape of object 2 | `0 ~ 9`<br>• Shape of object 2 = value. |
| `data[9]`{.code-blue} | X of object 2 | `0 ~ 159`<br>• X of object 2 = value. |
| `data[10]`{.code-blue} | Y of object 2 | `0 ~ 119`<br>• Y of object 2 = value. |
| `data[11]`{.code-blue} | Width of object 2 | `0 ~ 160`<br>• Width of object 2 = value. |
| `data[12]`{.code-blue} | Height of object 2 | `0 ~ 120`<br>• Height of object 2 = value. |
| `data[13]`{.code-blue} | Area of object 2 | `0 ~ 100`<br>• Area of object 2 = value. |

</CamModeSection>

</CamModeAccordion>

## 03 / Advanced Control - Setup and Function Reference

<DownloadButton href="/programs/Cam/spike-pybricks/MBC_UniCam.py" download="MBC_UniCam.py" label="v4.1 Library" />

### ✔ Function Setup

1. Click the <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>v4.1 Library</code> button above to download the `MBC SharpShot Vision Camera Sensor Pybricks - SPIKE Library`{.code-blue}.
2. Confirm that the library filename is `MBC_UniCam.py`{.code-blue}.
3. Return to Pybricks and click the `import a file`{.code-blue} button ![Import](/images/tutorials/S8/spike-block/pybricks-import.svg){style = "width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"} in the `file explorer`{.code-blue} workspace.
4. Select and import the `MBC_UniCam.py`{.code-blue} library.
5. Confirm that `MBC_UniCam.py`{.code-blue} appears in the `file explorer`{.code-blue} workspace. The library and your main program must be in the same project.
6. Open your Pybricks program and enter the library import and configuration code below. Place the remaining drivetrain, motor, and sensor initialization code after it.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam
cam = UniCam(Port.A, mode=11, multitask=False)
```

### ✔ Function Reference

#### set up

| Code | Function | Description |
| --- | --- | --- |
| `from MBC_UniCam import UniCam`{.code-blue} | Import library | `UniCam`<br>• Imports the `UniCam` class from `MBC_UniCam.py`. The filename and class name must match exactly. |
| `cam = UniCam(Port.A, mode=11, multitask=False)`{.code-blue} | Library configuration | `UniCam`<br>• `cam` is the name used for subsequent readings. `Port.A` selects Port A. `mode=11` selects camera Mode ID 11. The third argument selects synchronous or asynchronous operation. |

::: info ℹ️ Reading notes


| Code | Function | Returned values |
| --- | --- | --- |
| `cam = UniCam(Port.A, mode=11, multitask=True)`{.code-blue} | Asynchronous mode | `True`<br>• Call reading methods with `await`, for example `await cam.xy(1)`. Use `await cam.set_mode(11)` inside the async task to switch the camera mode. |
| `cam = UniCam(Port.A, mode=11, multitask=False)`{.code-blue} | Synchronous mode | `False`<br>• Call reading methods as `cam.xy(1)`. The constructor switches the camera to the selected Mode ID. |

:::

<CamModeAccordion namespace="advanced">

### ✔ Camera mode overview

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 - Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`Library provides: 14 color positions and counts`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- `cell()` uses a `16 × 12` grid. Pixel coordinates represent cell centers.
- Main data uses sensor communication mode `9`.
- Counts use sensor communication mode `6`. Request them only when needed because switching read modes adds a delay.
- Pixel coordinates are cell centers: X = (cell X - 1) × 10 + 5 and Y = (cell Y - 1) × 10 + 5. Count 7 means 7 or more blobs.
:::

**Mode ID setup**

Set the initialization argument to `mode=11`{.code-green}. This synchronous setup selects camera Mode ID `11`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=11, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | Position X/Y of a selected color | `X: 0, 5 ~ 155 / Y: 0, 5 ~ 115`<br>• Returns `(X, Y)`{.code-green} in pixels.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.x(1)`{.code-blue} | X of a selected color | `0, 5 ~ 155`<br>• Returns X, increasing rightward.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.y(1)`{.code-blue} | Y of a selected color | `0, 5 ~ 115`<br>• Returns Y, increasing downward.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.found(1)`{.code-blue} | Whether a selected color was found | `True / False`<br>• `True`{.code-green} means found; `False`{.code-green} means not found.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.cell(1)`{.code-blue} | Grid position of a selected color | `X: 0 ~ 16 / Y: 0 ~ 12`<br>• Returns `(X, Y)`{.code-green} on a `16 × 12`{.code-green} grid rather than pixels; `(0, 0)`{.code-green} means not found.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.count(1)`{.code-blue} | Blob count of a selected color | `0 ~ 7`<br>• Returns the blob count for that target color, not the total number of colors found.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.colors_found()`{.code-blue} | Colors found | `0 ~ 15`<br>• Returns the reported total colors found, distinct from this mode’s position capacity. |
| `cam.max_color()`{.code-blue} | Maximum readable colors | `14`<br>• This mode provides data for up to `14`{.code-green} colors; use it as the read-loop limit. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Library provides: 7 color positions and counts`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
- Counts use sensor communication mode `6`. Request them only when needed because switching read modes adds a delay.
:::

**Mode ID setup**

Set the initialization argument to `mode=12`{.code-green}. This synchronous setup selects camera Mode ID `12`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=12, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | Position X/Y of a selected color | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns `(X, Y)`{.code-green} in pixels.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.x(1)`{.code-blue} | X of a selected color | `0 ~ 159`<br>• Returns X, increasing rightward.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.y(1)`{.code-blue} | Y of a selected color | `0 ~ 119`<br>• Returns Y, increasing downward.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.found(1)`{.code-blue} | Whether a selected color was found | `True / False`<br>• `True`{.code-green} means found; `False`{.code-green} means not found.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.count(1)`{.code-blue} | Blob count of a selected color | `0 ~ 15`<br>• Returns the blob count for that target color, not the total number of colors found.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.colors_found()`{.code-blue} | Colors found | `0 ~ 15`<br>• Returns the reported total colors found, distinct from this mode’s position capacity. |
| `cam.max_color()`{.code-blue} | Maximum readable colors | `7`<br>• This mode provides data for up to `7`{.code-green} colors; use it as the read-loop limit. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Library provides: 4 color positions and counts, area`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
:::

**Mode ID setup**

Set the initialization argument to `mode=13`{.code-green}. This synchronous setup selects camera Mode ID `13`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=13, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | Position X/Y of a selected color | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns `(X, Y)`{.code-green} in pixels.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.x(1)`{.code-blue} | X of a selected color | `0 ~ 159`<br>• Returns X, increasing rightward.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.y(1)`{.code-blue} | Y of a selected color | `0 ~ 119`<br>• Returns Y, increasing downward.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.found(1)`{.code-blue} | Whether a selected color was found | `True / False`<br>• `True`{.code-green} means found; `False`{.code-green} means not found.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.count(1)`{.code-blue} | Blob count of a selected color | `0 ~ 15`<br>• Returns the blob count for that target color, not the total number of colors found.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.area(1)`{.code-blue} | Area of a selected color | `0 ~ 100`<br>• Returns blob area as a percentage of the image; `0`{.code-green} means not found.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.max_color()`{.code-blue} | Maximum readable colors | `4`<br>• This mode provides data for up to `4`{.code-green} colors; use it as the read-loop limit. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Library provides: 2 color positions and counts, area and size`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
:::

**Mode ID setup**

Set the initialization argument to `mode=14`{.code-green}. This synchronous setup selects camera Mode ID `14`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=14, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | Position X/Y of a selected color | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns `(X, Y)`{.code-green} in pixels.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.x(1)`{.code-blue} | X of a selected color | `0 ~ 159`<br>• Returns X, increasing rightward.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.y(1)`{.code-blue} | Y of a selected color | `0 ~ 119`<br>• Returns Y, increasing downward.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.found(1)`{.code-blue} | Whether a selected color was found | `True / False`<br>• `True`{.code-green} means found; `False`{.code-green} means not found.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.size(1)`{.code-blue} | Width/height of a selected color | `W: 0 ~ 160 / H: 0 ~ 120`<br>• Returns `(W, H)`{.code-green} in pixels.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.count(1)`{.code-blue} | Blob count of a selected color | `0 ~ 15`<br>• Returns the blob count for that target color, not the total number of colors found.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.area(1)`{.code-blue} | Area of a selected color | `0 ~ 100`<br>• Returns blob area as a percentage of the image; `0`{.code-green} means not found.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The example argument `1`{.code-green} selects color 1. |
| `cam.colors_found()`{.code-blue} | Colors found | `0 ~ 16`<br>• Returns the reported total colors found, distinct from this mode’s position capacity. |
| `cam.max_color()`{.code-blue} | Maximum readable colors | `2`<br>• This mode provides data for up to `2`{.code-green} colors; use it as the read-loop limit. |

</CamModeSection>

#### Mode 2 - Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Library provides: 14 points: hue`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

**Mode ID setup**

Set the initialization argument to `mode=21`{.code-green}. This synchronous setup selects camera Mode ID `21`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=21, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | Hue of a selected sampling point | `0 ~ 255`<br>• Returns the sampling point’s hue code; `0`{.code-green} can mean red.<br>• Input range: `1 ~ 14`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.hsv(1)`{.code-blue} | HSV of a selected sampling point | `H: 0 ~ 255 / S: None / V: None`<br>• Returns `(H, S, V)`{.code-green}: hue, saturation and value. Components unavailable in this mode are `None`{.code-green}.<br>• Input range: `1 ~ 14`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.color(1)`{.code-blue} | Color name at a selected sampling point | `str`<br>• Converts hue to one of: `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `white`, `black`.<br>• Input range: `1 ~ 14`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.max_point()`{.code-blue} | Maximum readable sampling points | `14`<br>• This mode provides up to `14`{.code-green} sampling points. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Library provides: 7 points: hue, saturation`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

**Mode ID setup**

Set the initialization argument to `mode=22`{.code-green}. This synchronous setup selects camera Mode ID `22`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=22, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | Hue of a selected sampling point | `0 ~ 255`<br>• Returns the sampling point’s hue code; `0`{.code-green} can mean red.<br>• Input range: `1 ~ 7`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.sat(1)`{.code-blue} | Saturation of a selected sampling point | `0 ~ 100`<br>• Returns saturation at the selected sampling point.<br>• Input range: `1 ~ 7`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.hsv(1)`{.code-blue} | HSV of a selected sampling point | `H: 0 ~ 255 / S: 0 ~ 100 / V: None`<br>• Returns `(H, S, V)`{.code-green}: hue, saturation and value. Components unavailable in this mode are `None`{.code-green}.<br>• Input range: `1 ~ 7`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.color(1)`{.code-blue} | Color name at a selected sampling point | `str`<br>• Converts hue to one of: `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `white`, `black`.<br>• Input range: `1 ~ 7`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.max_point()`{.code-blue} | Maximum readable sampling points | `7`<br>• This mode provides up to `7`{.code-green} sampling points. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Library provides: 4 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

**Mode ID setup**

Set the initialization argument to `mode=23`{.code-green}. This synchronous setup selects camera Mode ID `23`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=23, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | Hue of a selected sampling point | `0 ~ 255`<br>• Returns the sampling point’s hue code; `0`{.code-green} can mean red.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.sat(1)`{.code-blue} | Saturation of a selected sampling point | `0 ~ 100`<br>• Returns saturation at the selected sampling point.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.val(1)`{.code-blue} | Value of a selected sampling point | `0 ~ 100`<br>• Returns value at the selected sampling point.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.hsv(1)`{.code-blue} | HSV of a selected sampling point | `H: 0 ~ 255 / S: 0 ~ 100 / V: 0 ~ 100`<br>• Returns `(H, S, V)`{.code-green}: hue, saturation and value. Components unavailable in this mode are `None`{.code-green}.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.color(1)`{.code-blue} | Color name at a selected sampling point | `str`<br>• Converts hue to one of: `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `white`, `black`.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The example argument `1`{.code-green} selects sampling point S1. |
| `cam.max_point()`{.code-blue} | Maximum readable sampling points | `4`<br>• This mode provides up to `4`{.code-green} sampling points. |

</CamModeSection>

#### Mode 3 - Color order

<CamModeSection mode="30" title="Color order">

`Library provides: the first 13 hues and total block count`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Blocks are ordered left to right. Total count can exceed 13, but the list contains at most 13 blocks. Check its length before indexing. Hue 0 can mean red.
:::

**Mode ID setup**

Set the initialization argument to `mode=30`{.code-green}. This synchronous setup selects camera Mode ID `30`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=30, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.order()`{.code-blue} | Hue list from left to right | `list[int]`<br>• Returns hues ordered left to right, up to 13 blocks; each hue is `0 ~ 255`{.code-green}.<br>• The list length is the number of entries provided; hue 0 can mean red. |
| `cam.total()`{.code-blue} | Total color blocks | `0 ~ 18`<br>• Returns the total blocks in view, which can exceed the list capacity of 13. |

</CamModeSection>

#### Mode 4 - Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Last lost side: 0 on line, 1 left, 2 right.
:::

**Mode ID setup**

Set the initialization argument to `mode=41`{.code-green}. This synchronous setup selects camera Mode ID `41`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=41, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.near()`{.code-blue} | Near offset | `-100 ~ 100`<br>• Returns near offset. |
| `cam.mid()`{.code-blue} | Middle offset | `-100 ~ 100`<br>• Returns middle offset. |
| `cam.far()`{.code-blue} | Far offset | `-100 ~ 100`<br>• Returns far offset. |
| `cam.angle()`{.code-blue} | Line angle | `-90 ~ 90`<br>• Returns line angle. Unit: degrees. |
| `cam.width()`{.code-blue} | Near line width | `0 ~ 100`<br>• Returns near line width. Unit: percent. |
| `cam.flags()`{.code-blue} | Line-found flags | `0 ~ 7`<br>• Returns line-found flags. |
| `cam.junction()`{.code-blue} | Junction type | `0 ~ 5`<br>• Returns junction type. |
| `cam.junction_dist()`{.code-blue} | Junction distance | `0 ~ 100`<br>• Returns junction distance. Unit: percent. |
| `cam.edges()`{.code-blue} | Near left/right edges | `left: -100 ~ 100 / right: -100 ~ 100`<br>• Returns `(left, right)`{.code-green}; negative is left of the image center and positive is right. |
| `cam.far_width()`{.code-blue} | Far line width | `0 ~ 100`<br>• Returns far line width. Unit: percent. |
| `cam.marker()`{.code-blue} | Marker color and count | `color: 0 ~ 8 / count: 0 ~ 99`<br>• Returns `(color, count)`{.code-green}, not a scalar. |
| `cam.lost()`{.code-blue} | Last lost side | `0 ~ 2`<br>• Returns last lost side. |
| `cam.line_all()`{.code-blue} | Read all line data at once | `tuple[14]`<br>• Returns, in order: near offset, middle offset, far offset, angle, near width, flags, junction, junction distance, left edge, right edge, far width, marker color, marker count, lost side.<br>• Each component has the range shown above. Use this when several line values are needed in one pass. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Last lost side: 0 on line, 1 left, 2 right.
:::

**Mode ID setup**

Set the initialization argument to `mode=42`{.code-green}. This synchronous setup selects camera Mode ID `42`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=42, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.near()`{.code-blue} | Near offset | `-100 ~ 100`<br>• Returns near offset. |
| `cam.mid()`{.code-blue} | Middle offset | `-100 ~ 100`<br>• Returns middle offset. |
| `cam.far()`{.code-blue} | Far offset | `-100 ~ 100`<br>• Returns far offset. |
| `cam.angle()`{.code-blue} | Line angle | `-90 ~ 90`<br>• Returns line angle. Unit: degrees. |
| `cam.width()`{.code-blue} | Near line width | `0 ~ 100`<br>• Returns near line width. Unit: percent. |
| `cam.flags()`{.code-blue} | Line-found flags | `0 ~ 7`<br>• Returns line-found flags. |
| `cam.junction()`{.code-blue} | Junction type | `0 ~ 5`<br>• Returns junction type. |
| `cam.junction_dist()`{.code-blue} | Junction distance | `0 ~ 100`<br>• Returns junction distance. Unit: percent. |
| `cam.edges()`{.code-blue} | Near left/right edges | `left: -100 ~ 100 / right: -100 ~ 100`<br>• Returns `(left, right)`{.code-green}; negative is left of the image center and positive is right. |
| `cam.far_width()`{.code-blue} | Far line width | `0 ~ 100`<br>• Returns far line width. Unit: percent. |
| `cam.marker()`{.code-blue} | Marker color and count | `color: 0 ~ 8 / count: 0 ~ 99`<br>• Returns `(color, count)`{.code-green}, not a scalar. |
| `cam.lost()`{.code-blue} | Last lost side | `0 ~ 2`<br>• Returns last lost side. |
| `cam.line_all()`{.code-blue} | Read all line data at once | `tuple[14]`<br>• Returns, in order: near offset, middle offset, far offset, angle, near width, flags, junction, junction distance, left edge, right edge, far width, marker color, marker count, lost side.<br>• Each component has the range shown above. Use this when several line values are needed in one pass. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Teach the line color as target color 1 first.
- Last lost side: 0 on line, 1 left, 2 right.
:::

**Mode ID setup**

Set the initialization argument to `mode=43`{.code-green}. This synchronous setup selects camera Mode ID `43`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=43, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.near()`{.code-blue} | Near offset | `-100 ~ 100`<br>• Returns near offset. |
| `cam.mid()`{.code-blue} | Middle offset | `-100 ~ 100`<br>• Returns middle offset. |
| `cam.far()`{.code-blue} | Far offset | `-100 ~ 100`<br>• Returns far offset. |
| `cam.angle()`{.code-blue} | Line angle | `-90 ~ 90`<br>• Returns line angle. Unit: degrees. |
| `cam.width()`{.code-blue} | Near line width | `0 ~ 100`<br>• Returns near line width. Unit: percent. |
| `cam.flags()`{.code-blue} | Line-found flags | `0 ~ 7`<br>• Returns line-found flags. |
| `cam.junction()`{.code-blue} | Junction type | `0 ~ 5`<br>• Returns junction type. |
| `cam.junction_dist()`{.code-blue} | Junction distance | `0 ~ 100`<br>• Returns junction distance. Unit: percent. |
| `cam.edges()`{.code-blue} | Near left/right edges | `left: -100 ~ 100 / right: -100 ~ 100`<br>• Returns `(left, right)`{.code-green}; negative is left of the image center and positive is right. |
| `cam.far_width()`{.code-blue} | Far line width | `0 ~ 100`<br>• Returns far line width. Unit: percent. |
| `cam.marker()`{.code-blue} | Marker color and count | `color: 0 ~ 8 / count: 0 ~ 99`<br>• Returns `(color, count)`{.code-green}, not a scalar. |
| `cam.lost()`{.code-blue} | Last lost side | `0 ~ 2`<br>• Returns last lost side. |
| `cam.line_all()`{.code-blue} | Read all line data at once | `tuple[14]`<br>• Returns, in order: near offset, middle offset, far offset, angle, near width, flags, junction, junction distance, left edge, right edge, far width, marker color, marker count, lost side.<br>• Each component has the range shown above. Use this when several line values are needed in one pass. |

</CamModeSection>

#### Mode 5 - Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Library provides: the first 4 objects and total count`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
- Only target colors 1 ~ 8 are used. Objects are sorted by decreasing area. Code = color ID × 10 + shape code; 0 means no object. Check for an object before using its data.
- Shape codes 0 ~ 9: other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star, trapezoid.
:::

**Mode ID setup**

Set the initialization argument to `mode=51`{.code-green}. This synchronous setup selects camera Mode ID `51`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=51, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.max_object()`{.code-blue} | Maximum readable objects | `4`<br>• This mode provides the first `4`{.code-green} objects, sorted by decreasing area. |
| `cam.object_count()`{.code-blue} | Object count | `0 ~ 8`<br>• Returns the total objects in view, which can exceed the readable object limit. |
| `cam.object(1)`{.code-blue} | Code of a selected object | `0, 10 ~ 89`<br>• Object code = color ID × 10 + shape code. For example, `13`{.code-green} is a target-color-1 triangle; `0`{.code-green} means no object.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_found(1)`{.code-blue} | Whether a selected object exists | `True / False`<br>• `True`{.code-green} means the object exists; `False`{.code-green} means absent. Check this before using shape and position.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_color(1)`{.code-blue} | Color ID of a selected object | `0 ~ 8`<br>• Returns the target-color index; `0`{.code-green} means no object.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_shape(1)`{.code-blue} | Shape code of a selected object | `0 ~ 9`<br>• Returns the shape code. No object can also yield 0, so check object presence first.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_xy(1)`{.code-blue} | Position X/Y of a selected object | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns centroid `(X, Y)`{.code-green} in pixels; `(0, 0)`{.code-green} means no object.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Library provides: the first 2 objects: position, size and area`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
- Only target colors 1 ~ 8 are used. Objects are sorted by decreasing area. Code = color ID × 10 + shape code; 0 means no object. Check for an object before using its data.
- Shape codes 0 ~ 9: other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star, trapezoid.
:::

**Mode ID setup**

Set the initialization argument to `mode=52`{.code-green}. This synchronous setup selects camera Mode ID `52`{.code-green}. Match the port to the wiring.

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=52, multitask=False)
```

**Submode function reference**

| Code | Function | Description |
| --- | --- | --- |
| `cam.max_object()`{.code-blue} | Maximum readable objects | `2`<br>• This mode provides the first `2`{.code-green} objects, sorted by decreasing area. |
| `cam.object(1)`{.code-blue} | Code of a selected object | `0, 10 ~ 89`<br>• Object code = color ID × 10 + shape code. For example, `13`{.code-green} is a target-color-1 triangle; `0`{.code-green} means no object.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_found(1)`{.code-blue} | Whether a selected object exists | `True / False`<br>• `True`{.code-green} means the object exists; `False`{.code-green} means absent. Check this before using shape and position.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_color(1)`{.code-blue} | Color ID of a selected object | `0 ~ 8`<br>• Returns the target-color index; `0`{.code-green} means no object.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_shape(1)`{.code-blue} | Shape code of a selected object | `0 ~ 9`<br>• Returns the shape code. No object can also yield 0, so check object presence first.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_xy(1)`{.code-blue} | Position X/Y of a selected object | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns centroid `(X, Y)`{.code-green} in pixels; `(0, 0)`{.code-green} means no object.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_size(1)`{.code-blue} | Width/height of a selected object | `W: 0 ~ 160 / H: 0 ~ 120`<br>• Returns bounding-box `(W, H)`{.code-green} in pixels.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |
| `cam.object_area(1)`{.code-blue} | Area of a selected object | `0 ~ 100`<br>• Returns object area as a percentage of the image.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The example argument `1`{.code-green} selects object 1. |

</CamModeSection>

</CamModeAccordion>

### ✔ Library control and status

| Method | Purpose |
| --- | --- |
| `cam.set_mode(13)` | Select the requested Mode ID. |
| `cam.sensor_ok()` | Check whether the most recent read succeeded. |
| `cam.mode_number()` | Get the configured Mode ID. |
| `cam.device_id()` | Read address, hardware code and firmware word. Uses sensor communication mode `8`. |
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

## 04 / Example programs

### ▸ Basic control

Select camera Mode ID 13, then run this standalone program.

```python
from pybricks.iodevices import PUPDevice
from pybricks.parameters import Port

cam = PUPDevice(Port.A)

def readCamera(mode=9):
    data = []
    for word in cam.read(mode):
        data.append(word & 255)
        data.append((word >> 8) & 255)
    return data

def signedByte(value):
    return value - 256 if value > 127 else value

from pybricks.tools import wait

# Select camera Mode ID 13 before running.
while True:
    data = readCamera()
    x, y, area = data[0], data[1], data[2]
    print(x, y, area) if x else print("No target")
    wait(100)
```

### ▸ Advanced control

#### ▸ Example overview

| Example | Mode ID | Purpose |
| --- | --- | --- |
| [1. Follow a color target](#cam-pybricks-example-1) | 13 | Turn toward target color 1. Drive forward while it is farther away, turn without advancing once its area reaches the threshold, and rotate to search when it is not visible. |
| [2. Locate multiple colors](#cam-pybricks-example-2) | 12 | Read positions for colors 1 ~ 7 and classify them as left/middle/right and top/middle/bottom. Read additional counts only when the hub’s left button is pressed. |
| [3. Identify color at a sampling point](#cam-pybricks-example-3) | 22 | Read hue and saturation at S1 and display the interpreted color with the hub light and console output. |
| [4. Read color order](#cam-pybricks-example-4) | 30 | Read colors from left to right, compare successive results for a stable order, and display their initials. |
| [5. PD line following and junction stop](#cam-pybricks-example-5) | 41 | Steer using near/far offsets, stop at a cross or T junction, and search toward the last lost side when no line is visible. |
| [6. Find the largest red triangle](#cam-pybricks-example-6) | 51 | Among the reported objects, find the largest one with code 13, drive toward it, and stop when Y reaches a threshold. |

Each example is complete. Copy the code below and run it independently. Use the mode tables above for field meanings.

#### ▸ Example 1: Follow a color target {#cam-pybricks-example-1}

Turn toward target color 1. Drive forward while it is farther away, turn without advancing once its area reaches the threshold, and rotate to search when it is not visible.


```python
# 神攝手 × Pybricks (SPIKE)範例 1：跟著色塊轉
# SharpShot × Pybricks (SPIKE) example 1: turn to follow a colour blob
# Camera Mode ID = 13; UniCam selects this mode when the program starts.
# Camera Mode ID = 13; UniCam selects this mode when the program starts.
# 準備：先在相機上教「目標 1」的顏色 / Teach "target 1" on the camera first
# 接線 Wiring：相機 → C 孔 / camera → port C；左輪 E、右輪 F / left wheel E, right wheel F
# 同一個資料夾要有 MBC_UniCam.py / MBC_UniCam.py must be imported too
from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction, Color
from pybricks.robotics import DriveBase
from pybricks.tools import wait
from MBC_UniCam import UniCam

hub = PrimeHub()
cam = UniCam(Port.C, mode=13)                    # 函式庫會自動把相機切到這個模式 / the library switches the camera to this mode
left = Motor(Port.E, Direction.COUNTERCLOCKWISE)
right = Motor(Port.F)
robot = DriveBase(left, right, 56, 112)          # 輪徑 56 mm、輪距 112 mm / wheel 56 mm, axle 112 mm

KP = 3            # 👉 可以改：偏 1 像素就多轉幾度 / 秒 / you can change: turn rate per pixel of error
STOP_AREA = 20    # 👉 可以改：面積 ≥ 20 % 就算很近 / area (%) that counts as "close"

while True:
    p = cam.xy(1)                                # 色 1 的 (X, Y) 像素；(0, 0) = 沒看到 / (0, 0) = not seen
    if p is None:                                # 從來沒讀到相機 / camera never answered
        robot.stop()
        hub.light.on(Color.RED)
    elif p[0] == 0:                              # 沒看到色 1：原地慢慢轉著找 / not seen: spin slowly to search
        robot.drive(0, 60)
        hub.light.on(Color.ORANGE)
    else:
        error = p[0] - 80                        # 畫面中間 X = 80；色塊在右 → 正 / centre is X = 80; right = positive
        if cam.area(1) >= STOP_AREA:             # 很近了：只轉不前進 / close: turn only
            robot.drive(0, error * KP)
        else:                                    # 還遠：邊前進邊轉 / far: drive and turn
            robot.drive(80, error * KP)
        hub.light.on(Color.GREEN)
    wait(20)
```

- **How it works**

  1. `cam.xy(1)` reads the pixel position of color 1. `None` means no successful reading yet; X = 0 means no target.
  2. `error = X - 80`. A target to the right gives a positive error, so `robot.drive(speed, error × KP)` turns right.
  3. When `cam.area(1)` reaches `STOP_AREA`, forward speed becomes 0 while turning continues.

| Adjustable setting | Example value | Purpose |
| --- | --- | --- |
| `KP` | 3 | Turn gain per pixel; reduce it if the robot oscillates. |
| `STOP_AREA` | 20 | Area threshold for stopping forward motion. |

- **Expected result**：A target to the left turns the robot left, and one to the right turns it right. A large target makes it align in place; removing it produces an orange light and a slow search turn.


#### ▸ Example 2: Locate multiple colors {#cam-pybricks-example-2}

Read positions for colors 1 ~ 7 and classify them as left/middle/right and top/middle/bottom. Read additional counts only when the hub’s left button is pressed.


```python
# 神攝手 × Pybricks (SPIKE)範例 2：多色找位置
# SharpShot × Pybricks (SPIKE) example 2: where are my colours?
# Camera Mode ID = 12; UniCam selects this mode when the program starts.
# Camera Mode ID = 12; UniCam selects this mode when the program starts.
# 準備：在相機上教目標 1 ~ 7 的顏色 (教幾色都可以)/ teach targets 1 ~ 7 (any number)
# 接線 Wiring：相機 → C 孔 / camera → port C
from pybricks.hubs import PrimeHub
from pybricks.parameters import Port, Button
from pybricks.tools import wait
from MBC_UniCam import UniCam

hub = PrimeHub()
cam = UniCam(Port.C, mode=12)


def where(x, y):
    # 像素 → 文字：左 / 中 / 右 + 上 / 中 / 下 / pixels -> words
    h = '左 left' if x < 54 else ('右 right' if x > 106 else '中 middle')
    v = '上 top' if y < 40 else ('下 bottom' if y > 80 else '中 middle')
    return h + ', ' + v


while True:
    seen = 0
    for c in range(1, cam.max_color() + 1):      # 色 1 ~ 7 / colours 1 ~ 7
        p = cam.xy(c)
        if p and p[0]:                           # X = 0 表示沒找到 / X = 0 means not found
            seen += 1
            print('色 colour', c, ':', p[0], p[1], where(p[0], p[1]))
    hub.display.number(seen)                     # 主機螢幕顯示看到幾色 / show how many colours are seen
    if Button.LEFT in hub.buttons.pressed():
        # 數量放在模式 6，要多等約 30 ms，所以按鍵才讀 / counts are in mode 6 (30 ms slower): read on demand
        print('16 色裡找到', cam.colors_found(), '色 / colours found;  色 1 有', cam.count(1), '塊 / blobs of colour 1')
    print('---')
    wait(500)
```

- **How it works**

  1. `cam.max_color()` returns 7 in mode 12, so the loop checks each `cam.xy(c)`.
  2. Only detected targets are printed. `where()` divides X/Y into horizontal and vertical regions, and the hub shows how many targets were seen in this pass.
  3. Pressing the left button reads `cam.colors_found()` and `cam.count(1)` without switching to sensor mode 6 on every pass.

| Adjustable setting | Example value | Purpose |
| --- | --- | --- |
| `wait(500)` | 500 ms | Delay between display updates. |
| `X / Y boundaries` | 54, 106 / 40, 80 | Region boundaries change the descriptive labels, not the camera coordinates. |

- **Expected result**：The computer prints target positions, while the hub shows the number detected in this pass. Pressing left prints the reported total and the blob count for color 1.


#### ▸ Example 3: Identify color at a sampling point {#cam-pybricks-example-3}

Read hue and saturation at S1 and display the interpreted color with the hub light and console output.


```python
# 神攝手 × Pybricks (SPIKE)範例 3：座標取色判斷顏色
# SharpShot × Pybricks (SPIKE) example 3: what colour is at the spot?
# Camera Mode ID = 22; UniCam selects this mode when the program starts.
# Camera Mode ID = 22; UniCam selects this mode when the program starts.
# 準備：取樣點 S1 的位置看相機螢幕上標 1 的十字 / spot S1 is the cross marked 1 on the camera screen
# 接線 Wiring：相機 → C 孔 / camera → port C
from pybricks.hubs import PrimeHub
from pybricks.parameters import Port, Color
from pybricks.tools import wait
from MBC_UniCam import UniCam, color_name

hub = PrimeHub()
cam = UniCam(Port.C, mode=22)

# 顏色名稱 → 主機燈號 / colour name -> hub light
LIGHT = {'red': Color.RED, 'orange': Color.ORANGE, 'yellow': Color.YELLOW, 'green': Color.GREEN,
         'cyan': Color.CYAN, 'blue': Color.BLUE, 'purple': Color.VIOLET, 'white': Color.WHITE, 'black': Color.NONE}
NAME = {'red': '紅', 'orange': '橙', 'yellow': '黃', 'green': '綠', 'cyan': '青',
        'blue': '藍', 'purple': '紫', 'white': '白／灰', 'black': '黑'}
LOW_SAT = 15      # 👉 可以改：飽和度比這低就當成白 / 灰 / below this saturation = white / grey

while True:
    p = cam.hsv(1)                               # 取樣點 S1 的 (色相碼, 飽和度, None) / (hue, sat, None)
    if p is None:                                # 讀不到相機 / no camera
        hub.light.on(Color.NONE)
        wait(200)
        continue
    h, s = p[0], p[1]
    name = color_name(h)
    if s < LOW_SAT and name != 'black':
        name = 'white'                           # 顏色很淡：當成白 / 灰 / very pale: white / grey
    hub.light.on(LIGHT[name])
    print('S1 色相碼 hue', h, ' 飽和度 sat', s, ' →', NAME[name], name)
    wait(200)
```

- **How it works**

  1. `cam.hsv(1)` returns `(hue, saturation, None)` in mode 22; value requires mode 23.
  2. `color_name(h)` converts the hue code to a color name, which selects the hub light.
  3. If saturation is below `LOW_SAT` and the color is not black, classify it as white/grey.

| Adjustable setting | Example value | Purpose |
| --- | --- | --- |
| `LOW_SAT` | 15 | Low-saturation threshold. |

- **Expected result**：A red sample gives a red light, white paper a white light, and black turns it off. The console prints S1 values and the color name.


#### ▸ Example 4: Read color order {#cam-pybricks-example-4}

Read colors from left to right, compare successive results for a stable order, and display their initials.


```python
# 神攝手 × Pybricks (SPIKE)範例 4：照順序給色號 (WRO 任務：記下積木的顏色順序)
# SharpShot × Pybricks (SPIKE) example 4: colour order (WRO: remember the order)
# Camera Mode ID = 30; UniCam selects this mode when the program starts.
# Camera Mode ID = 30; UniCam selects this mode when the program starts.
# 準備：在相機上教會場地上會出現的每一種顏色 / teach every colour that can appear on the field
# 接線 Wiring：相機 → C 孔 / camera → port C
from pybricks.hubs import PrimeHub
from pybricks.parameters import Port
from pybricks.tools import wait
from MBC_UniCam import UniCam, color_name

hub = PrimeHub()
cam = UniCam(Port.C, mode=30)

WANT = 4          # 👉 可以改：場地上有幾塊 / how many blocks to expect
LETTER = {'red': 'R', 'orange': 'O', 'yellow': 'Y', 'green': 'G', 'cyan': 'C',
          'blue': 'B', 'purple': 'P', 'white': 'W', 'black': 'K'}

# 連續 5 次讀到一樣的順序才算數 (避免剛好有手經過)/ same answer 5 times in a row = stable
last = None
same = 0
names = []
while same < 5:
    hues = cam.order()                           # 由左到右每塊的色相碼 / hue codes from left to right
    names = [color_name(h) for h in hues] if hues else []
    if len(names) == WANT and names == last:
        same += 1
    else:
        same = 0
    last = names
    wait(50)

print('順序 order:', names)
hub.speaker.beep()
for n in names:                                  # 一個字母一個字母顯示 / show one letter at a time
    hub.display.char(LETTER[n])
    wait(700)
hub.display.off()
```

- **How it works**

  1. `cam.order()` returns hue codes from left to right; `color_name()` converts them to names.
  2. Increment the stability counter only when the list length equals `WANT` and matches the previous result; otherwise reset it.
  3. After five matching comparisons, beep and show initials such as R, G, B and Y in sequence.

| Adjustable setting | Example value | Purpose |
| --- | --- | --- |
| `WANT` | 4 | Expected number of blocks. |
| `same < 5` | 5 | Required number of matching comparisons. |

- **Expected result**：Once stable, the hub beeps and displays color initials in the observed left-to-right order.


#### ▸ Example 5: PD line following and junction stop {#cam-pybricks-example-5}

Steer using near/far offsets, stop at a cross or T junction, and search toward the last lost side when no line is visible.


```python
# 神攝手 × Pybricks (SPIKE)範例 5：PD 循線 + 路口停車
# SharpShot × Pybricks (SPIKE) example 5: PD line following + stop at a junction
# Camera Mode ID = 41; UniCam selects this mode when the program starts.
# Camera Mode ID = 41; UniCam selects this mode when the program starts.
# 準備：相機裝在車頭、斜斜往前下方看線 / mount the camera at the front, looking down and forward
# 接線 Wiring：相機 → C 孔；左輪 E、右輪 F / camera → port C; left wheel E, right wheel F
# 方向：站在車後往前看，線在左 = 負 / standing behind the robot: line on the left = negative
from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction
from pybricks.robotics import DriveBase
from pybricks.tools import wait
from MBC_UniCam import UniCam

hub = PrimeHub()
cam = UniCam(Port.C, mode=41)
left = Motor(Port.E, Direction.COUNTERCLOCKWISE)
right = Motor(Port.F)
robot = DriveBase(left, right, 56, 112)

SPEED = 120       # 👉 可以改：前進速度 mm/s / forward speed
KP = 1.5          # 👉 可以改：偏多少就轉多少 / proportional gain
KD = 4.0          # 👉 可以改：偏移變快時多修一點 / derivative gain
last_error = 0

while True:
    v = cam.line_all()                           # 14 個值一次讀 / all 14 line values at once
    if v is None:                                # 讀不到相機：停車 / no camera: stop
        robot.stop()
        wait(50)
        continue
    near, far, flags, junction, lost = v[0], v[2], v[5], v[6], v[13]
    if junction in (1, 2):                       # 1 十字、2 T 字路口：停車嗶一聲 / cross or T junction: stop
        robot.stop()
        hub.speaker.beep()
        break
    if flags == 0:                               # 近中遠都沒看到線：往最後離線那一邊找 / line lost: search
        robot.drive(0, -120 if lost == 1 else 120)
        wait(10)
        continue
    error = 0.7 * near + 0.3 * far               # 近處為主、遠處提早轉彎 / mostly near, a bit of far
    turn = KP * error + KD * (error - last_error)
    last_error = error
    robot.drive(SPEED, turn)                     # 線在左 (負)→ 往左轉 / line on the left → turn left
    wait(10)
```

- **How it works**

  1. `cam.line_all()` returns all 14 line values; extract near/far offsets, flags, junction and lost side.
  2. Compute `error = 0.7 × near + 0.3 × far`, then turn with `KP × error + KD × (error - last_error)`.
  3. Stop for junction types 1 or 2. If flags = 0, switch from normal following to a search turn.

| Adjustable setting | Example value | Purpose |
| --- | --- | --- |
| `SPEED` | 120 | Forward speed in mm/s. |
| `KP` | 1.5 | Proportional gain. |
| `KD` | 4.0 | Gain for changes in error. |

- **Expected result**：The robot follows the line, stops and beeps at a cross or T junction, and searches toward the last lost side when the line disappears.


#### ▸ Example 6: Find the largest red triangle {#cam-pybricks-example-6}

Among the reported objects, find the largest one with code 13, drive toward it, and stop when Y reaches a threshold.


```python
# 神攝手 × Pybricks (SPIKE)範例 6：找最大的紅色三角形、轉過去
# SharpShot × Pybricks (SPIKE) example 6: find the biggest red triangle and drive to it
# Camera Mode ID = 51; UniCam selects this mode when the program starts.
# Camera Mode ID = 51; UniCam selects this mode when the program starts.
# 準備：用要找的物體本身 (紅色三角形)教「目標 1」，並指定形狀 Tri (相機選單 Target 1 shape，或 cam.target_shape(1, 3))
# teach "target 1" with the red triangle itself and set its shape to Tri (camera menu, or cam.target_shape(1, 3))
# 接線 Wiring：相機 → C 孔 / camera → port C；左輪 E、右輪 F / left wheel E, right wheel F
# 同一個資料夾要有 MBC_UniCam.py / MBC_UniCam.py must be imported too
#
# 物體代碼 = 色號×10 + 形狀：目標 1 的三角形 = 1×10 + 3 = 13。物體 1、2、3、4 是面積由大到小，
# 所以從物體 1 往下找，第一個代碼是 13 的就是「最大的紅色三角形」。
# Object code = colour × 10 + shape: target 1 triangle = 13. Objects 1 ~ 4 are sorted largest first,
# so the first object with code 13 is the biggest red triangle.
from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction, Color
from pybricks.robotics import DriveBase
from pybricks.tools import wait
from MBC_UniCam import UniCam, shape_name

hub = PrimeHub()
cam = UniCam(Port.C, mode=51)                    # 函式庫會自動把相機切到這個模式 / the library switches the camera to this mode
left = Motor(Port.E, Direction.COUNTERCLOCKWISE)
right = Motor(Port.F)
robot = DriveBase(left, right, 56, 112)          # 輪徑 56 mm、輪距 112 mm / wheel 56 mm, axle 112 mm

WANT = 1 * 10 + 3  # 👉 可以改：目標 1 × 10  +  形狀 3 (三角)；正方形改成 14、圓改成 11 / square 14, circle 11
KP = 3             # 👉 可以改：偏 1 像素就多轉幾度 / 秒 / turn rate per pixel of error
NEAR_Y = 100       # 👉 可以改：物體的 Y ≥ 100 (畫面最下面)就算到了 / Y at the bottom of the picture = arrived


def find(want):
    # 從最大的物體往下找代碼 = want 的，回傳它的 (X, Y)；找不到 (0, 0) / largest first; (0, 0) = not found
    for i in range(1, cam.max_object() + 1):     # SPIKE 模式 51 給 4 個物體 / 4 objects on SPIKE
        if cam.object(i) == want:
            return cam.object_xy(i)
    return (0, 0)


print('要找 looking for: 目標 target', WANT // 10, shape_name(WANT % 10, True), shape_name(WANT % 10))
while True:
    n = cam.object_count()                       # 畫面裡有幾個物體 0 ~ 8 / objects in view
    if n is None:                                # 從來沒讀到相機 / camera never answered
        robot.stop()
        hub.light.on(Color.RED)
        wait(100)
        continue
    hub.display.number(n)
    x, y = find(WANT)
    if x == 0:                                   # 沒看到紅色三角形：原地慢慢轉著找 / not seen: spin to search
        robot.drive(0, 60)
        hub.light.on(Color.ORANGE)
    elif y >= NEAR_Y:                            # 到了：停車、嗶一聲 / arrived: stop and beep
        robot.stop()
        hub.light.on(Color.GREEN)
        hub.speaker.beep()
        break
    else:
        error = x - 80                           # 畫面中間 X = 80；在右 → 正 → 右轉 / right of centre = positive
        robot.drive(80, error * KP)
        hub.light.on(Color.BLUE)
    wait(20)
```

- **How it works**

  1. Mode 51 reports the first four objects on SPIKE, sorted by descending area. `find()` checks from object 1 onward, so the first matching code is the largest match in the reported data.
  2. `cam.object_xy(i)` gives the centroid. No match returns `(0, 0)`, triggering a search turn.
  3. Steer with `X - 80` and stop when Y reaches `NEAR_Y`. This is an image-position threshold, not a measured distance.

| Adjustable setting | Example value | Purpose |
| --- | --- | --- |
| `WANT` | 13 | Desired object code: target-1 square = 14, circle = 11. |
| `KP` | 3 | Steering gain. |
| `NEAR_Y` | 100 | Image Y threshold for stopping; adjust for camera mounting. |

- **Expected result**：No target produces an orange search turn; a match produces blue-light approach and alignment; reaching the Y threshold stops, lights green and beeps.



## 05 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
