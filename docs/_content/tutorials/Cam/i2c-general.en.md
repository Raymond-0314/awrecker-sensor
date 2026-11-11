# Tutorial

## 01 / Environment setup

Use UniCam with the general I²C firmware and the Arduino IDE. The default 7-bit address is 0x4C.

::: warning Before wiring
The v1 data layout is defined, with Arduino hardware validation pending. Camera-side SDA=IO3 and SCL=IO1 are provisional. Disconnect power before wiring, and verify the camera version, host logic levels, and pull-ups.
:::

| Camera | Arduino UNO/Nano | UNO R4, ESP32, and others |
| --- | --- | --- |
| 5V | 5V | Verify a suitable 5V supply |
| GND | GND | GND |
| SDA | A4 | Board SDA |
| SCL | A5 | Board SCL |

## 02 / Functions and data

### ✔ Read sequence

1. Write a one-byte field ID to 0x4C and end the transmission.
2. Wait 2 ms and read 2×k bytes, up to 16 values per transfer.
3. Decode each pair as signed little-endian int16. −32768 means the field is undefined in the current mode.

| Field | Meaning |
| --- | --- |
| 0x01–0x04 | Camera mode, submode, taught color count, output item count. |
| 0xF0–0xF5 | Device ID (0x034C), protocol version (2), firmware version, status flags, update sequence, uptime in seconds. |

### ✔ Camera mode data starting at 0x10

| Mode | Field order |
| --- | --- |
| 11 | 16 colors: X, Y |
| 12 | 16 colors: X, Y, count |
| 13 | 16 colors: X, Y, area %, count |
| 14 | 16 colors: X, Y, width, height, count, area % |
| 21 | 16 points: H |
| 22 | 16 points: H, S |
| 23 | 16 points: H, S, V |
| 30 | 0x10–0x1F: 16 hues from the left. 0x20: total. |
| 41–43 | Near/middle/far offsets, angle, near width, flags, junction, junction distance, left edge, right edge, far width, marker hue, marker count, line-loss direction |
| 51 | 8 objects: color ID, shape, X, Y. Total at 0x30. |
| 52 | 8 objects: color ID, shape, X, Y, width, height, area %, angle, vertex count, tracking ID. Total at 0x60. |

Record i starts at 0x10 + fields per record × (i−1). In mode 13, target 2 starts at 0x14. Positions are pixels with Y increasing downward. X=0 means no detection. Hue 0 can be red, so use the color-order total. Objects are sorted largest first and positions are centroids. Bit 1 of 0xF3 indicates an object is present in object modes.

### ✔ Write commands

| Bytes to send | Purpose |
| --- | --- |
| 0xE0, mode, submode | Select and save a mode. For Object Details, send 0xE0, 5, 2. |
| 0xE1, point, X, Y | Save a sample location. Accepts points 1–20, X=0–159, Y=0–119. Readout provides 16 points. |
| 0xF8, new address, bitwise complement | Change the I²C address. |
| 0xEF, 0xA5 | Reboot. |

Teach target colors on the camera.

## 03 / Example program

Select mode 13 (Color Tracking ③ Standard) and teach target 1. Set the serial monitor to 115200 baud. Output is X, Y, area %, count. For Object Details, select mode 52, read the count at 0x60, then read groups of 10 values starting at 0x10.

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

void setup() {
  Serial.begin(115200);
  Wire.begin();
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

## 04 / Troubleshooting

- No response: check firmware, shared ground, SDA/SCL, and address.
- Reading −32768: check the mode at 0x01 before looking up the field.

## 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />
