# Tutorial

## 01 / Environment setup

### ✔ Check your hub, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Hub | LEGO® Education SPIKE™ Prime Set |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE version) |
| Programming environment | LEGO Education SPIKE 3 App |

### ✔ Before you begin

1. Connect UniCam to any hub port A–F. The examples use port C, and the hub powers the camera.
2. Confirm the hub name at the top left of the camera display is green. If it is red, check the cable or try another port.
3. In the camera’s `MODE` menu, select Color Tracking ③ Standard. Center the target, press `OK` to teach its color, and confirm the preview outlines it.

## 02 / Functions and data

::: info ℹ️ Note
The official app shows UniCam as a Color Sensor. Use the numeric reporter blocks under More Sensors. Switch camera modes on the camera itself.
:::

### ✔ Color Tracking ③ Standard

Read positions for up to four targets on a 16×12 grid. Smaller Y values are closer to the top of the image. X = 0 means no target was detected.

| Official block | Function | How to read the value |
| --- | --- | --- |
| *[Image placeholder — Color block]* | Target 1 X | Read directly `1–16` |
| *[Image placeholder — Reflected light block]* | Target 1 Y | Read directly `1–12` |
| *[Image placeholder — Raw red block]* | Target 2 X / Y | Divide by 256 for Y (integer quotient) and X (remainder). |
| *[Image placeholder — Raw green block]* | Target 3 X / Y | Divide by 256 for Y (integer quotient) and X (remainder). |
| *[Image placeholder — Raw blue block]* | Target 4 X / Y | Divide by 256 for Y (integer quotient) and X (remainder). |

Tracking modes ① and ② report up to seven targets on an 8×6 grid. Color reports the number found, and Reflected light gives X×10+Y for target 1. Each raw RGB reporter packs two targets. Divide by 100 to separate them, then divide each by 10 to recover X and Y.

::: warning ⚠️ Important
The Education Color block converts the camera’s `5` to `6`, so the block cannot distinguish them. In Education Python, use `device.data(port.C)[0]` for the raw value.
:::

### ✔ Object detection

The camera sorts objects by size. Divide a code by 10 for the target color number and take the remainder for the shape. For example, `13` means a triangle in target color 1, and `0` means no object. Positions packed as X×10+Y use an 8×6 grid.

| Block | ① Object list (51) | ② Object details (52) |
| --- | --- | --- |
| Color | Object count | Object 1 code |
| Reflected light | Object 1 code | Object 1 area % |
| Raw red | Object 1 position (X×10+Y) | Object 1 X and Y, packed in base 256 |
| Raw green | Divide by 100 for object 2 code and position | Object 1 width and height, packed in base 256 |
| Raw blue | Same as raw green, for object 3 | Object 2 code and area %, packed in base 256 |

### ✔ Camera modes and available fields

| Camera mode | Available data |
| --- | --- |
| 11 Tracking ① Most colors | 7 positions in blocks, 13 positions accessible in Python |
| 12 Tracking ② Multiple colors | 7 positions in blocks, with counts in extra fields |
| 13 Tracking ③ Standard | 4 positions in blocks, with areas in extra fields |
| 14 Tracking ④ Fine | 2 positions and sizes. Raw green and blue carry sizes for targets 1 and 2. |
| 21 Sampling ① Hue | Raw red, green, and blue carry two hues each, for 6 points |
| 22 Sampling ② Hue and saturation | Raw RGB carry H + S×256 for S1–S3 |
| 23 Sampling ③ HSV | Raw RGB as above, reflected light is S1 brightness |
| 30 Color order | Color gives total. Each raw RGB field packs two hues. |
| 41–43 Black, white, or colored line | Color gives junction, reflection gives near width, and raw RGB give near offset, far offset, and angle, each offset by 100 |
| 51 Object list | First 3 objects in blocks, additional fields in Python |
| 52 Object details | Object 1 position and size, plus object 2 code and area in blocks |

For fields packed in base 256, first convert the raw reading to unsigned 16-bit (add 65536 to a negative reading), then take the remainder and quotient. Hue 0 can mean red, so use the total to validate color-order entries. Subtract 100 from each raw RGB line field. For example, raw red 80 means a near offset of −20.

### ✔ Extra fields in SPIKE App Python

In device.data(port.C), the first two elements are bytes 0 and 1. Each later element holds two bytes, low byte first. The API exposes bytes 0–13. Camera bytes 14 and 15 are outside this API’s readout.

```python
from hub import port
import device

values = device.data(port.C)
data = [value & 255 for value in values[:2]]
for word in values[2:]:
    data.extend((word & 255, (word >> 8) & 255))
```

| Camera mode | Accessible extra bytes |
| --- | --- |
| 11 | 8–13: positions for targets 8–13 (8×6 grid) |
| 12 | 8–13: counts for targets 1–6 |
| 13 | 8–11: counts for targets 1–4. 12–13: areas for targets 1–2. |
| 14 | 8–9: counts for targets 1–2. 10–11: areas for targets 1–2. |
| 21 | 8–13: hues for S7–S12 |
| 22 | 8: S4 hue. 9–12: H and S for S5 and S6. 13: S7 hue. |
| 23 | 8–9: brightness for S2 and S3. 10–12: S4 H, S, V. |
| 30 | 8–13: hues for blocks 7–12 from the left |
| 41–43 | 8–13: middle offset +100, flags, junction distance, marker hue, marker count, far width |
| 51 | 8–13: code and position for objects 4–6 |
| 52 | 8: object 1 angle. 9–13: object 2 X, Y, width, height, angle. |

## 03 / Example program

### ✔ Read target 2 position

1. Teach two different colors as targets 1 and 2. Confirm target 2 appears in the camera preview.
2. In a loop, read Raw red once, store it in a variable, and decode X and Y using the table.
3. Display X and Y. Move target 2 sideways and check that X changes. Move it out of frame and confirm X returns to 0.

*[Image placeholder — complete Raw red, coordinate decoding, and display blocks]*

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
