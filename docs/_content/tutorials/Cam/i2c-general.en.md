# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | Arduino UNO / Nano / UNO R4 / ESP32 |
| Sensor | MBC UniCam Vision Camera Sensor (General I²C edition) |
| Programming environment | Arduino IDE (C++) |

### ✔ Before you begin

1. Start your development board and open Arduino IDE.
2. Check that the controller, camera, and programming environment work correctly.
3. Set the camera mode and make sure it matches the mode used by the program.

::: warning ⚠️ Before wiring
The v1 data layout is defined, with Arduino hardware validation pending. Camera-side SDA=IO3 and SCL=IO1 are provisional. Verify your unit and compatible logic levels before wiring.
:::

| Camera | UNO / Nano | UNO R4 / ESP32 |
| --- | --- | --- |
| 5V | 5V | Verify a suitable 5V supply |
| GND | GND | GND |
| SDA | A4 | Board SDA |
| SCL | A5 | Board SCL |

## 02 / Functions and data

::: info ℹ️ Note
Use the general I²C firmware at default address 0x4C. The values indexes below refer to the int16 array returned by readCamera() in the example. Field 0x10 starts the first record. Use command E0 to select a mode and E1 to set sample positions.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and modeID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

Read positions for up to 16 targets.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | X1 |
| `values[1]` (0x11) | Y1 |
| `foundColors` (0x30, read separately) | Detected color count |

The table shows record 1. There are 16 records; record i starts at 0x10 + 2×(i−1).

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Coordinates use 160×120 pixels, with Y increasing downward. X = 0 means no target.

Use `readCamera(0x10, 2, values)` to read the record, then access its fields by values index.

Declare `int16_t foundColors;`, then read the detected-color count separately with `readCamera(0x30, 1, &foundColors)`.

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

Read positions for up to 16 targets, with counts available.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | X1 |
| `values[1]` (0x11) | Y1 |
| `values[2]` (0x12) | Count1 |
| `foundColors` (0x40, read separately) | Detected color count |

The table shows record 1. There are 16 records; record i starts at 0x10 + 3×(i−1).

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Coordinates use 160×120 pixels, with Y increasing downward. X = 0 means no target.

Use `readCamera(0x10, 3, values)` to read the record, then access its fields by values index.

Declare `int16_t foundColors;`, then read the detected-color count separately with `readCamera(0x40, 1, &foundColors)`.

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

Read positions for up to 16 targets, with counts available and areas.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | X1 |
| `values[1]` (0x11) | Y1 |
| `values[2]` (0x12) | Area1 |
| `values[3]` (0x13) | Count1 |
| `foundColors` (0x50, read separately) | Detected color count |

The table shows record 1. There are 16 records; record i starts at 0x10 + 4×(i−1).

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Coordinates use 160×120 pixels, with Y increasing downward. X = 0 means no target.

Use `readCamera(0x10, 4, values)` to read the record, then access its fields by values index.

Declare `int16_t foundColors;`, then read the detected-color count separately with `readCamera(0x50, 1, &foundColors)`.

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

Read positions and sizes for up to 16 targets, with counts available and areas.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | X1 |
| `values[1]` (0x11) | Y1 |
| `values[2]` (0x12) | W1 |
| `values[3]` (0x13) | H1 |
| `values[4]` (0x14) | Count1 |
| `values[5]` (0x15) | Area1 |
| `foundColors` (0x70, read separately) | Detected color count |

The table shows record 1. There are 16 records; record i starts at 0x10 + 6×(i−1).

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Coordinates use 160×120 pixels, with Y increasing downward. X = 0 means no target.

Use `readCamera(0x10, 6, values)` to read the record, then access its fields by values index.

Declare `int16_t foundColors;`, then read the detected-color count separately with `readCamera(0x70, 1, &foundColors)`.

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

Read hue for up to 16 sample points, at the precision described below.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | Hue1 |

The table shows record 1. There are 16 records; record i starts at 0x10 + 1×(i−1).

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Use `readCamera(0x10, 1, values)` to read the record, then access its fields by values index.

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

Read hue and saturation for up to 16 sample points, at the precision described below.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | Hue1 |
| `values[1]` (0x11) | Sat1 |

The table shows record 1. There are 16 records; record i starts at 0x10 + 2×(i−1).

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Use `readCamera(0x10, 2, values)` to read the record, then access its fields by values index.

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

Read hue, saturation, and brightness for up to 16 sample points, at the precision described below.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | Hue1 |
| `values[1]` (0x11) | Sat1 |
| `values[2]` (0x12) | Val1 |

The table shows record 1. There are 16 records; record i starts at 0x10 + 3×(i−1).

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Use `readCamera(0x10, 3, values)` to read the record, then access its fields by values index.

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

Read the first 16 hues from left to right and the total block count.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | Hue1 |
| `values[1]` (0x11) | Hue2 |
| `values[2]` (0x12) | Hue3 |
| `values[3]` (0x13) | Hue4 |
| `values[4]` (0x14) | Hue5 |
| `values[5]` (0x15) | Hue6 |
| `values[6]` (0x16) | Hue7 |
| `values[7]` (0x17) | Hue8 |
| `values[8]` (0x18) | Hue9 |
| `values[9]` (0x19) | Hue10 |
| `values[10]` (0x1A) | Hue11 |
| `values[11]` (0x1B) | Hue12 |
| `values[12]` (0x1C) | Hue13 |
| `values[13]` (0x1D) | Hue14 |
| `values[14]` (0x1E) | Hue15 |
| `values[15]` (0x1F) | Hue16 |
| Read separately 0x20 | Total |

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Hue 0 can represent red. Use the total block count to identify valid entries.

Use `readCamera(0x10, 16, values)` to read the record, then access its fields by values index.

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

Read 14 line-following values including three offsets, junctions, and markers.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | Near offset |
| `values[1]` (0x11) | Middle offset |
| `values[2]` (0x12) | Far offset |
| `values[3]` (0x13) | Angle |
| `values[4]` (0x14) | Near width % |
| `values[5]` (0x15) | Flags |
| `values[6]` (0x16) | Junction |
| `values[7]` (0x17) | Junction distance % |
| `values[8]` (0x18) | Left edge |
| `values[9]` (0x19) | Right edge |
| `values[10]` (0x1A) | Far width % |
| `values[11]` (0x1B) | Marker color |
| `values[12]` (0x1C) | Marker count |
| `values[13]` (0x1D) | Lost direction |

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

Use `readCamera(0x10, 14, values)` to read the record, then access its fields by values index.

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

Read 14 line-following values including three offsets, junctions, and markers.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | Near offset |
| `values[1]` (0x11) | Middle offset |
| `values[2]` (0x12) | Far offset |
| `values[3]` (0x13) | Angle |
| `values[4]` (0x14) | Near width % |
| `values[5]` (0x15) | Flags |
| `values[6]` (0x16) | Junction |
| `values[7]` (0x17) | Junction distance % |
| `values[8]` (0x18) | Left edge |
| `values[9]` (0x19) | Right edge |
| `values[10]` (0x1A) | Far width % |
| `values[11]` (0x1B) | Marker color |
| `values[12]` (0x1C) | Marker count |
| `values[13]` (0x1D) | Lost direction |

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

Use `readCamera(0x10, 14, values)` to read the record, then access its fields by values index.

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

Read 14 line-following values including three offsets, junctions, and markers.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | Near offset |
| `values[1]` (0x11) | Middle offset |
| `values[2]` (0x12) | Far offset |
| `values[3]` (0x13) | Angle |
| `values[4]` (0x14) | Near width % |
| `values[5]` (0x15) | Flags |
| `values[6]` (0x16) | Junction |
| `values[7]` (0x17) | Junction distance % |
| `values[8]` (0x18) | Left edge |
| `values[9]` (0x19) | Right edge |
| `values[10]` (0x1A) | Far width % |
| `values[11]` (0x1B) | Marker color |
| `values[12]` (0x1C) | Marker count |
| `values[13]` (0x1D) | Lost direction |

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Offsets run from −100 to 100, negative to the left; angles run from −90 to 90°. Flags add 1 for near, 2 for middle, and 4 for far. Junction values 0–5 mean none, cross, T, left, right, and end. Teach target color 1 for colored lines.

Use `readCamera(0x10, 14, values)` to read the record, then access its fields by values index.

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

Read codes and positions for the first 8 objects, plus the total count.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | Color1 |
| `values[1]` (0x11) | Shape1 |
| `values[2]` (0x12) | X1 |
| `values[3]` (0x13) | Y1 |
| Read separately 0x30 | Total |

The table shows record 1. There are 8 records; record i starts at 0x10 + 4×(i−1).

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Coordinates use 160×120 pixels, with Y increasing downward. X = 0 means no target.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

Use `readCamera(0x10, 4, values)` to read the record, then access its fields by values index.

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

Read detailed data for the first 8 objects using the fields below.

| I²C reading | Reading |
| --- | --- |
| `values[0]` (0x10) | Color1 |
| `values[1]` (0x11) | Shape1 |
| `values[2]` (0x12) | X1 |
| `values[3]` (0x13) | Y1 |
| `values[4]` (0x14) | W1 |
| `values[5]` (0x15) | H1 |
| `values[6]` (0x16) | Area1 |
| `values[7]` (0x17) | Angle1 |
| `values[8]` (0x18) | Vertices1 |
| `values[9]` (0x19) | TrackID1 |
| Read separately 0x60 | Total |

The table shows record 1. There are 8 records; record i starts at 0x10 + 10×(i−1).

Write the starting field ID, wait 2 ms, then read little-endian int16 values, up to 16 per transfer. −32768 means the field is undefined in this mode.

Coordinates use 160×120 pixels, with Y increasing downward. X = 0 means no target.

Detection uses target colors 1–8. Objects are ordered largest first and positions are centroids. Code = color ID×10+shape; 0 means no object. Shapes 0–9 mean other, circle, oval, triangle, square, rectangle, pentagon, hexagon, star, and trapezoid.

Use `readCamera(0x10, 10, values)` to read the record, then access its fields by values index.

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

Teach target color 1 on the camera. The program sends E0 [1, 3] once in setup() to select modeID 13 (Color tracking - ③ Standard). Set the serial monitor to 115200 baud. Output is X, Y, area %, and count, in that order.

```cpp
#include <Wire.h>
const uint8_t CAMERA = 0x4C;

bool readCamera(uint8_t first, uint8_t count, int16_t *values) {
  if (count == 0 || count > 16) return false;
  Wire.beginTransmission(CAMERA);
  Wire.write(first);
  if (Wire.endTransmission() != 0) return false;
  delay(2);
  uint8_t bytes = 2 * count;
  if (Wire.requestFrom(CAMERA, bytes) != bytes) return false;
  for (uint8_t i = 0; i < count; ++i) {
    uint16_t low = Wire.read();
    uint16_t high = Wire.read();
    uint16_t raw = low | (high << 8);
    values[i] = raw < 0x8000 ? raw : static_cast<int32_t>(raw) - 65536;
  }
  return true;
}

bool setCameraMode(uint8_t mode, uint8_t submode) {
  Wire.beginTransmission(CAMERA);
  Wire.write(0xE0);
  Wire.write(mode);
  Wire.write(submode);
  return Wire.endTransmission() == 0;
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  if (!setCameraMode(1, 3)) {
    Serial.println("Camera mode command failed");
  }
  delay(100);
}

void loop() {
  int16_t mode, target[4];
  if (!readCamera(0x01, 1, &mode)) {
    Serial.println("Check camera wiring and address");
  } else if (mode != 13) {
    Serial.println("Select camera mode 13");
  } else if (!readCamera(0x10, 4, target) || target[0] == -32768) {
    Serial.println("Target data unavailable");
  } else if (target[0] == 0) {
    Serial.println("No target");
  } else {
    for (uint8_t i = 0; i < 4; ++i) {
      Serial.print(target[i]);
      Serial.print(' ');
    }
    Serial.println();
  }
  delay(100);
}
```

### ✔ Troubleshooting

- No response: check firmware, shared ground, SDA/SCL, and address.
- Reading −32768: check the mode at 0x01 before looking up the field.

### ✔ Write commands

| Bytes to send | Purpose |
| --- | --- |
| 0xE0, mode, submode | Select and save a mode. For Object Details, send 0xE0, 5, 2. |
| 0xE1, point, X, Y | Save a sample location. Accepts points 1–20, X=0–159, Y=0–119. Readout provides 16 points. |
| 0xF8, new address, bitwise complement | Change the I²C address. |
| 0xEF, 0xA5 | Reboot. |

Teach target colors on the camera.

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
