# Tutorial

## 01 / Environment setup

### ✔ Check your hub, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Hub | LEGO® Education SPIKE™ Prime Set<br>LEGO® MINDSTORMS® Robot Inventor |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE version) |
| Programming environment | Pybricks Blocks |

### ✔ Before you begin

1. Check that the hub runs Pybricks firmware and create a project in Pybricks.
2. Connect the camera to port C and confirm the hub name on its display turns green. You can use any port A–F if you update the program to match.
3. Center the target, press `OK` to teach its color, and check for an outline around it in the preview.

::: info ℹ️ Note
Basic control uses the built-in Color Sensor. Advanced control reads the raw camera payload in a Python project.
:::

## 02 / Basic control setup and functions

### ✔ Set up value decoding

In the camera’s `MODE` menu, choose Color Tracking ③ Standard, then configure a Color Sensor on port C. Smaller Y values are higher in the image. X = 0 means the target was not detected.

*[Image placeholder — Color Sensor setup on port C]*

### ✔ Functions and data

| Block | Function | How to read the value |
| --- | --- | --- |
| *[Image placeholder — Reflected light block and negative-value correction]* | Target 1 position | 40×30 grid. Convert the reading to an integer and add 6399 if it is negative. Divide the corrected value by 100 for X (quotient) and Y (remainder). |
| *[Image placeholder — Ambient light block and decimal decoding]* | Target 2 position | 8×6 grid. The integer part is X and the first decimal digit is Y. For example, `4.3` means `(4, 3)`. |

Read reflected light and ambient light once per loop, storing each reading before decoding it. These fields also carry point sampling, color order, line, and object data. The decoding depends on the selected camera mode.

### ✔ Built-in sensor readings by mode

| Camera mode | Available data |
| --- | --- |
| 11 Tracking ① Most colors | Positions for targets 1 and 2 |
| 12 Tracking ② Multiple colors | Positions for targets 1 and 2 |
| 13 Tracking ③ Standard | Positions for targets 1 and 2 |
| 14 Tracking ④ Fine | Reflection gives target 1 position. Ambient gives width.height on an 8×6 grid. |
| 21 Sampling ① Hue | Reflection packs S1 hue and saturation tens in base 10. Ambient packs the same S2 fields as integer and tenths. |
| 22 Sampling ② Hue and saturation | Same layout as 21, with saturation in tens |
| 23 Sampling ③ HSV | Reflection is S1 hue. Ambient integer is saturation and its tenths digit is brightness in tens. |
| 30 Color order | Reflection is the first hue. Ambient gives the second hue and total, capped at 9. |
| 41–43 Black, white, or colored line | Reflection packs near offset +100 and junction in base 10. Ambient gives far offset +100 and line flags as integer and tenths. |
| 51 Object list | Reflection gives object 1 position. Ambient gives code and count. |
| 52 Object details | Reflection gives object 1 position. Ambient gives code and area in tens. |

Line example: reflection 802 splits into 80 and 2, so the near offset is −20 and the junction is a T. Round the scaled ambient value before taking the remainder to avoid floating-point rounding artifacts.

## 03 / Advanced control: read raw data

Use PUPDevice in a Pybricks Python project. Transport mode 9 returns seven int16 values. Split each into its low and high bytes to recover the 14-byte payload. Select the camera mode on the camera first. For example, mode 13 is Color Tracking ③ Standard.

### ✔ Decode the raw payload

Byte offsets below start at 0. Pixel coordinates start at the upper left, and X=0 means no target. For signed line offsets, angle, and edges, subtract 256 from byte values of 128 or more.

| Camera mode | Mode 9 payload |
| --- | --- |
| 11 | Bytes 0–13 give one 16×12 grid ID per color (1–192). Subtract 1, divide by 16, and add 1 to the remainder and quotient for X and Y. Grid ID 0 means no target. |
| 12/13/14 | Per target: X, Y (12); X, Y, area (13); X, Y, width, height, count, area (14). In 13, bytes 12 and 13 each pack two counts in base 16. In 14, byte 12 is the number of colors found. |
| 21/22/23 | Per sample: H; H, S; or H, S, V, respectively. |
| 30 | Bytes 0–12 hold hues from the left, and byte 13 gives the total. |
| 41–43 | Near, middle, and far offsets, angle, near width, flags, junction, junction distance, left edge, right edge, far width, marker hue, marker count, line-loss direction. |
| 51 | Byte 0 is the total. Each object then uses code, X, Y. |
| 52 | Each object uses color ID, shape, X, Y, width, height, area. |

In modes 11 and 12, use transport mode 6 for counts. Mode 11 packs fourteen 3-bit counts followed by a 4-bit detected-color count in a little-endian bit stream. Mode 12 packs counts for colors 1–7 and the detected-color count into the high and low nibbles of the first four bytes.

### ✔ Raw output by mode

| Camera mode | Available data |
| --- | --- |
| 11 Tracking ① Most colors | 14 grid positions, with counts in transport mode 6 |
| 12 Tracking ② Multiple colors | 7 pixel positions, with counts in transport mode 6 |
| 13 Tracking ③ Standard | 4 pixel positions, areas, and counts |
| 14 Tracking ④ Fine | 2 positions, sizes, counts, and areas |
| 21 Sampling ① Hue | 14 hues |
| 22 Sampling ② Hue and saturation | 7 hue/saturation pairs |
| 23 Sampling ③ HSV | 4 HSV triples |
| 30 Color order | 13 hues and a total |
| 41–43 Black, white, or colored line | 14 fields including three offsets, junction, markers, and line-loss direction |
| 51 Object list | 4 object codes and centroids, plus a total |
| 52 Object details | 2 objects with color, shape, centroid, size, and area |

## 04 / Example programs

### ✔ Basic control

Select Color Tracking ③ Standard and display the grid coordinates for targets 1 and 2.

In a loop, store the reflected and ambient readings, decode them using the table, and display the coordinates. Wait 100 ms before the next iteration.

*[Image placeholder — complete basic program with negative-value correction and coordinate display]*

### ✔ Advanced control

Select camera mode 13. This example prints target 1 X, Y, area, and blob count.

```python
from pybricks.iodevices import PUPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = PUPDevice(Port.C)

def read_payload():
    data = []
    for word in cam.read(9):
        data.extend((word & 255, (word >> 8) & 255))
    return data

while True:
    data = read_payload()
    x, y, area = data[:3]
    if x:
        print(x, y, area, data[12] >> 4)
    else:
        print("No target")
    wait(100)
```

## 05 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
