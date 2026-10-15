# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Types for This Tutorial |
| --- | --- |
| Controller | • Arduino<br>• ESP32<br>• Raspberry Pi<br>• Custom controller boards supporting a standard I2C interface |
| Sensor | • MBC 16-Channel Line-Following Sensor |
| Programming Environment | • The programming language supported by your controller board |

### ✔ Preparation

1. Turn on your robot.
2. Confirm that everything is working properly.
3. Calibrate the MBC 16-Channel Line-Following Sensor for the lighting conditions of your track.

## 02 / MBC General I2C Protocol Guidelines

### ✔ Wiring and Voltage

- Connect SCL, SDA, VCC, and GND according to the sensor’s pin labels.
- Supports 100 kHz and 400 kHz.
- Can connect directly to 5 V controllers, such as the Arduino UNO, without an additional logic-level converter.

### ✔ Reading Data (Module → Host)

1. The host writes one byte to the module: the register address to read.
2. The host calls `requestFrom(address, n)`, where n = 1–32.
3. The module prepares a fixed 32-byte response.
    - Valid data comes first, with the remaining bytes filled with zeros.
    - The host can read the required number of bytes. Reading beyond the valid data returns zeros and does not stall the bus.
    - All multibyte values use most-significant-byte-first order (MSB-first). Signed values use two’s complement.
    - Undefined registers return zeros.

### ✔ Writing Commands (Host → Module)

- Only registers marked Write or Read/Write accept write commands.
- Format: `[register address, value0, value1, ...]`.
- All multibyte values use most-significant-byte-first order.
- If the payload is too short, the entire command is ignored. Extra bytes are discarded.

::: warning ⚠️ Caution
For asynchronous operations, such as calibration or EEPROM writes, check the status flags or counters after sending the command to confirm successful completion. Do not assume that sending the command means the operation has completed successfully.
:::

### ✔ Register Groups

| Register Range | Description |
| --- | --- |
| `0x01` ~ `0x0F` | • Device information, common to all products. |
| `0x10` ~ `0x1F` | • Group 1: Primary data. |
| `0x20` ~ `0x2F` | • Group 2: Secondary data / calibration. |
| `0x30` ~ `0x3F` | • Group 3: System and status. |
| `0x40` and above | • Product-specific extensions: arrays, individual channels, and ports. |

::: info ℹ️ Additional Information
Register conventions within each group:

- `0xN0`: Command register for the group (write).
- `0xN1`: Reads all data in the group starting from `0xN2` in one transaction.
- `0xN2` onward: Individual data items.
:::

### ✔ Common Registers (Shared Across Products)

| Register | Access | Length | Description |
| --- | --- | --- | --- |
| `0x01` | Read | 17 bytes | • Reads the data from `0x02` through `0x07` in one transaction. |
| `0x02` | Read | 1 byte | • Device ID, corresponding to the product’s factory-default address.<br>• Can be used to identify the product. |
| `0x03` | Read | 1 byte | • I2C protocol version. |
| `0x04` | Read | 2 bytes | • Firmware version: major and minor. |
| `0x05` | Read | 3 bytes | • Firmware build date: last two digits of the year, month, and day. |
| `0x06` | Read | 2 bytes | • Hardware and variant information. |
| `0x07` | Read | 8 bytes | • Model string in ASCII, padded with zeros if shorter than eight bytes. |
| `0x30` | Write | 1 byte | • System command.<br>• `0x01` restarts the module. |
| `0x31` | Read | 9 bytes | • Reads the data from `0x32` through `0x07` in one transaction. |
| `0x32` | Read | 1 byte | • Status flags.<br>• `bit 0`{.code-green-text} indicates readiness. `bits 1–7`{.code-green-text} have product-specific definitions. |
| `0x33` | Read | 1 byte | • Update sequence number.<br>• Increments by 1 whenever the data is updated. An unchanged value indicates that the module is busy. |
| `0x34` ~ `0x36` | Read | 1 byte | • Product-specific definitions. |
| `0x37` | Read | 4 bytes | • Elapsed time since startup, in milliseconds.<br>• A decrease in this value indicates that the module has restarted. |

::: info ℹ️ Additional Information
Recommended startup procedure:

1. Read register `0x01` after startup to check the device status.
2. Read `0x32` and wait until bit 0 equals 1, indicating that the module is ready.
3. Begin reading the remaining data.
:::

## 03 / Features

### ✔ Basic Information

| Item | Description |
| --- | --- |
| I2C Address | `0x16` |
| Model String at `0x07` | `LINE16` |
| Variant Information at `0x06` | `[16, PCB revision]` (the first byte indicates the number of sensor channels) |
| Channel Order | `CH0 ~ CH15`{.code-green-text}, from right to left |
| Line Position Direction | • `0`{.code-green-text} indicates that the line is centered.<br>• Negative values indicate that the line is to the right.<br>• Positive values indicate that the line is to the left. |

### ✔ Line-Following Results

| Register | Access | Length | Description |
| --- | --- | --- | --- |
| `0x10` | Write | 1 byte | • Sets the target line color.<br>• `0`{.code-green-text} selects a black line; `1`{.code-green-text} selects a white line.<br>• After a restart, the module returns to the button-selected setting. |
| `0x11` | Read | 7 bytes | • Reads the data from `0x12` through `0x17` in one transaction. |
| `0x12` | Read | 1 byte | `int8` `-16 ~ +16`<br>• Line position. |
| `0x13` | Read | 1 byte | `int8` `-100 ~ +100`<br>• High-resolution line position. |
| `0x14` | Read | 1 byte | • Line width: the number of sensing elements simultaneously detecting the line. |
| `0x15` | Read | 1 byte | • Number of line groups.<br>• `0`{.code-green-text} indicates a lost line, `1`{.code-green-text} indicates a single line, and `2`{.code-green-text} or more indicates a junction or crossroads. |
| `0x16` | Read | 2 bytes | `uint16`<br>• Binary classification of optical readings: each sensing element is classified as either `on the line`{.code-green} or `off the line`{.code-green} based on its raw value.<br>• `bit i`{.code-green-text} indicates whether sensing element `i`{.code-green-text} is on the line. |
| `0x17` | Read | 1 byte | `int8`<br>• Last direction in which the line was lost.<br>• Can be used to detect line loss and steer back toward the line. |

### ✔ Calibration

| Register | Access | Length | Description |
| --- | --- | --- | --- |
| `0x20` | Write | 1 byte | • Sets the calibration mode.<br>• `1`{.code-green-text} starts a 5-second dynamic calibration; `2`{.code-green-text} records the current readings as white; `3`{.code-green-text} records the current readings as black.<br>• The results are stored in EEPROM. |
| `0x21` | Read | 2 bytes | • Reads the data from `0x22` through `0x23` in one transaction. |
| `0x22` | Read/Write | 1 byte | `1 ~ 99`<br>• Reads or sets the classification threshold used by `0x16`.<br>• The default is `50`{.code-green-text}. Restarting the module restores the default.<br>• Example: With a threshold of 30, optical values below 30 are classified as “on the line,” while values above 30 are classified as “off the line.” |
| `0x23` | Read | 1 byte | • Calibration completion counter, incremented by 1 after each completed calibration.<br>• Can be used to confirm that calibration has finished. |

### ✔ Status Flags at `0x32`

| Bit | Description |
| --- | --- |
| bit 0 | • The sensor is ready. |
| bit 1 | • `0`{.code-green-text} indicates black-line mode; `1`{.code-green-text} indicates white-line mode. |
| bit 2 | • Calibration is in progress.<br>• During the 5-second calibration, the update sequence number at `0x33` stops changing. This is normal. |
| bit 3 | • The line is lost. |
| bit 4 | • A junction has been detected, with two or more line groups. |

### ✔ Individual Channel Values

| Register | Access | Length | Description |
| --- | --- | --- | --- |
| `0x40` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 1`{.code-green-text}. |
| `0x41` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 2`{.code-green-text}. |
| `0x42` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 3`{.code-green-text}. |
| `0x43` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 4`{.code-green-text}. |
| `0x44` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 5`{.code-green-text}. |
| `0x45` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 6`{.code-green-text}. |
| `0x46` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 7`{.code-green-text}. |
| `0x47` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 8`{.code-green-text}. |
| `0x48` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 9`{.code-green-text}. |
| `0x49` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 10`{.code-green-text}. |
| `0x4A` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 11`{.code-green-text}. |
| `0x4B` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 12`{.code-green-text}. |
| `0x4C` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 13`{.code-green-text}. |
| `0x4D` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 14`{.code-green-text}. |
| `0x4E` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 15`{.code-green-text}. |
| `0x4F` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value for `channel 16`{.code-green-text}. |
| `0x50` | Read | 16 bytes | • Reads the data from `0x40` through `0x4F` in one transaction. |
| `0x51` | Read | 16 bytes | • White reference values stored in EEPROM. |
| `0x52` | Read | 16 bytes | • Black reference values stored in EEPROM. |
| `0x53` | Read | 16 bytes | `8-bit`<br>• Raw ADC values. |

## 04 / Arduino Example Programs

### ✔ Reading Module Data

```cpp
#include <Wire.h>

const uint8_t LINE_ADDR = 0x16;

bool iicRead(uint8_t addr, uint8_t reg, uint8_t *buf, uint8_t n) {
  Wire.beginTransmission(addr);
  Wire.write(reg);
  if (Wire.endTransmission() != 0) return false;
  if (Wire.requestFrom(addr, n) != n) return false;
  for (uint8_t i = 0; i < n; i++) buf[i] = Wire.read();
  return true;
}

void iicWrite(uint8_t addr, uint8_t reg, uint8_t v) {
  Wire.beginTransmission(addr);
  Wire.write(reg);
  Wire.write(v);
  Wire.endTransmission();
}

void setup() {
  Serial.begin(115200);
  Wire.begin();
  iicWrite(LINE_ADDR, 0x10, 0);     // 0 = follow a black line; 1 = follow a white line
}

void loop() {
  uint8_t d[7];
  if (iicRead(LINE_ADDR, 0x11, d, 7)) {
    int8_t   pos    = (int8_t)d[0];        // -16 to +16
    int8_t   posHi  = (int8_t)d[1];        // -100 to +100; use this for PID
    uint8_t  width  = d[2];                // Line width
    uint8_t  groups = d[3];                // 0 = lost / 1 = single line / 2+ = junction
    uint16_t bin    = (d[4] << 8) | d[5];  // One bit per channel

    Serial.print("Position ");          Serial.print(pos);
    Serial.print("  High-resolution "); Serial.print(posHi);
    Serial.print("  Width ");           Serial.print(width);
    Serial.print("  Groups ");          Serial.print(groups);
    Serial.print("  Binary ");          Serial.println(bin, BIN);
  }
  delay(10);
}
```

### ✔ A Starting Point for PID Line Following

```cpp
// posHi: negative = line on the right; positive = line on the left.
// To turn right, increase the left wheel speed and decrease the right wheel speed.
float Kp = 0.6;
int base = 120;                        // Base speed; adjust for your motor driver
int turn = Kp * posHi;
int leftSpeed  = base - turn;
int rightSpeed = base + turn;
```

### ✔ Triggering Calibration Programmatically

```cpp
uint8_t before[2], after[2];
iicRead(LINE_ADDR, 0x21, before, 2);   // [Threshold, calibration completion counter]
iicWrite(LINE_ADDR, 0x20, 1);          // Start 5-second dynamic calibration:
                                     // move the robot left and right across the black line
do {
  delay(200);
  iicRead(LINE_ADDR, 0x21, after, 2);
} while (after[1] == before[1]);       // Counter increments by 1 when calibration finishes
```

## 05 / 【Lego】 Lau Xiao Demonstration Video

<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin: 24px auto;">

  <iframe
    src="https://www.youtube.com/embed/kH8V2Pri37o?si=Zuk9fKAEN3bwXD7x"
    title="MBC S16 Demonstration Video 1"
    style="
      width: 800px;
      max-width: 100%;
      aspect-ratio: 16 / 9;
      border: none;
      border-radius: 12px;
      display: block;
    "
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

</div>

[Return to the homepage to choose another tutorial](/en/)