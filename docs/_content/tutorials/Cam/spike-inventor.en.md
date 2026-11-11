# Tutorial

## 01 / Environment setup

### ✔ Check your hub, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Hub | LEGO® MINDSTORMS® Robot Inventor |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE version) |
| Programming environment | LEGO MINDSTORMS Inventor App / SPIKE App (Home) |

### ✔ Before you begin

1. Connect UniCam to any hub port A–F. The examples use port C, and the hub powers the camera.
2. Confirm the hub name at the top left of the camera display is green. If it is red, check the cable or try another port.
3. In the camera’s `MODE` menu, select Color Tracking ③ Standard. Center the target, press `OK` to teach its color, and confirm the preview outlines it.

## 02 / Functions and data

::: info ℹ️ Note
The official app shows UniCam as a Color Sensor. Use the numeric reporter blocks under More Sensors. Switch camera modes on the camera itself.
:::

### ✔ Color Tracking ③ Standard

Read up to four targets on a 8×6 grid. Smaller Y values are closer to the top of the image. X = 0 means no target was detected.

| Official block | Function | How to read the value |
| --- | --- | --- |
| *[Image placeholder — Color block]* | Target 1 X | Read directly `1–8` |
| *[Image placeholder — Reflected light block]* | Target 1 Y | Read directly `1–6` |
| *[Image placeholder — Raw red block]* | Target 2 X / Y | Divide by 10 for X (integer quotient) and Y (remainder). |
| *[Image placeholder — Raw green block]* | Target 3 X / Y | Divide by 10 for X (integer quotient) and Y (remainder). |
| *[Image placeholder — Raw blue block]* | Target 4 X / Y | Divide by 10 for X (integer quotient) and Y (remainder). |

Home app blocks report up to four targets in each of tracking modes ①, ②, and ③. In Home Python, use `hub.port.C.device.get()` to read six values and decode them using the Education layout.

### ✔ Object detection

The camera sorts objects by size. Divide a code by 10 for the target color number and take the remainder for the shape. For example, `13` means a triangle in target color 1, and `0` means no object. Positions packed as X×10+Y use an 8×6 grid.

| Block | ① Object list (51) | ② Object details (52) |
| --- | --- | --- |
| Color | Object count | Object count |
| Reflected light | Object 1 code | Object 1 code |
| Raw red | Object 1 position (X×10+Y) | Object 1 X pixel |
| Raw green | Object 2 code | Object 1 Y pixel |
| Raw blue | Object 2 position (X×10+Y) | Object 1 area % |

### ✔ Camera modes and available fields

| Camera mode | Available data |
| --- | --- |
| 11 Tracking ① Most colors | 4 positions |
| 12 Tracking ② Multiple colors | 4 positions |
| 13 Tracking ③ Standard | 4 positions on an 8×6 grid |
| 14 Tracking ④ Fine | 2 positions and sizes. Raw green and blue pack W×10+H for targets 1 and 2. |
| 21 Sampling ① Hue | Raw RGB are hues for S1–S3, reflected light is S4 hue divided by 2 |
| 22 Sampling ② Hue and saturation | Raw RGB are S1 hue, S1 saturation, S2 hue. Reflection is S2 saturation. |
| 23 Sampling ③ HSV | Raw red and blue give S1 and S2 hue. Raw green and reflection pack the tens digits of saturation and brightness. |
| 30 Color order | Reflection is total. Raw RGB give the first three hues. |
| 41–43 Black, white, or colored line | Color gives junction, reflection gives near width, and raw RGB give near offset, far offset, and angle, each offset by 100 |
| 51 Object list | Code and position of the first 2 objects |
| 52 Object details | Code, pixel position, and area of the first object |

For fields packed in base 256, first convert the raw reading to unsigned 16-bit (add 65536 to a negative reading), then take the remainder and quotient. Hue 0 can mean red, so use the total to validate color-order entries. Subtract 100 from each raw RGB line field. For example, raw red 80 means a near offset of −20.

The first five Home Python device.get() values are the Education layout’s color, reflection, raw red, green, and blue. The sixth value packs Education bytes 8 and 9, low byte first. In mode 13 these are the counts for targets 1 and 2. See the [SPIKE App lesson](./spike-app.md) for the layout, limited to the six values this API returns.

## 03 / Example program

### ✔ Read target 2 position

1. Teach two different colors as targets 1 and 2. Confirm target 2 appears in the camera preview.
2. In a loop, read Raw red once, store it in a variable, and decode X and Y using the table.
3. Display X and Y. Move target 2 sideways and check that X changes. Move it out of frame and confirm X returns to 0.

*[Image placeholder — complete Raw red, coordinate decoding, and display blocks]*

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
