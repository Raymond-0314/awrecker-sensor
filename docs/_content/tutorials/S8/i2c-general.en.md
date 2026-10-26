# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Type for This Tutorial |
| --- | --- |
| Controller | • Arduino<br>• ESP32<br>• Raspberry Pi<br>• Other custom controllers supporting a standard I2C interface |
| Sensor | • MBC 8-Channel Line-Following Sensor |
| Programming Language | • The programming language supported by your controller |

### ✔ Preparation

1. Turn on your robot.
2. Confirm that everything is working properly.
3. Calibrate the MBC 8-Channel Line-Following Sensor for your track.

## 02 / MBC Common I2C Protocol Guidelines

### ✔ Wiring and Voltage

- Connect SCL, SDA, VCC, and GND according to the labels on the sensor's pin header.
- Supports 100 kHz and 400 kHz.
- Can connect directly to 5V controllers, such as the Arduino UNO, without an additional level shifter.

### ✔ Reading Data (Data Flow: Module → Controller)

1. The controller writes 1 byte to the module: the register number to read.
2. The controller calls `requestFrom(address, n)`, where n = 1–32.
3. The module always prepares 32 bytes of data.
    - Valid data comes first, and the remaining bytes are filled with zeros.
    - The controller can read the required number of bytes. Reading beyond the valid data returns zeros without locking up the bus.
    - Multi-byte values are always transmitted most significant byte first (MSB-first). Signed values use two's complement.
    - Undefined registers return zeros.

### ✔ Writing Commands (Data Flow: Controller → Module)

- Commands can be written only to registers marked Write or Read/Write.
- Format: `[register number, value0, value1, ...]`.
- Multi-byte values are always transmitted most significant byte first.
- If the data is too short, the entire command is ignored. Extra bytes are discarded.

::: warning ⚠️ Caution
For asynchronous operations, such as calibration or EEPROM writes, check the status flags or counters after issuing the command to confirm successful completion. Do not assume that sending a command guarantees that the operation has completed successfully.
:::

### ✔ Register Groups

| Register Range | Description |
| --- | --- |
| `0x01` ~ `0x0F` | • Device information, common to all products. |
| `0x10` ~ `0x1F` | • Group 1: Primary data. |
| `0x20` ~ `0x2F` | • Group 2: Secondary data / calibration. |
| `0x30` ~ `0x3F` | • Group 3: System and status. |
| `0x40` and above | • Product-specific extensions: arrays, channels, and ports. |

::: info ℹ️ Additional Information
Register rules for each group:

- `0xN0`: Command register for the group (write).
- `0xN1`: Reads all group data starting from `0xN2` in a single operation.
- `0xN2` onward: Individual functions.
:::

### ✔ Common Registers (Identical Across Products)

| Register | Access | Length | Description |
| --- | --- | --- | --- |
| `0x01` | Read | 17 bytes | • Reads the data from `0x02` ~ `0x07` in a single operation. |
| `0x02` | Read | 1 byte | • Device ID (the product's factory-default address).<br>• Can be used to identify the product. |
| `0x03` | Read | 1 byte | • I2C protocol version. |
| `0x04` | Read | 2 bytes | • Firmware version (major, minor). |
| `0x05` | Read | 3 bytes | • Firmware build date (last two digits of the year, month, day). |
| `0x06` | Read | 2 bytes | • Hardware and variant information. |
| `0x07` | Read | 8 bytes | • Model string (ASCII, padded with zeros). |
| `0x30` | Write | 1 byte | • System command.<br>• `0x01` restarts the module. |
| `0x31` | Read | 9 bytes | • Reads the data from `0x32` ~ `0x07` in a single operation. |
| `0x32` | Read | 1 byte | • Status flags.<br>• Bit 0 indicates readiness. Bits 1–7 have product-specific definitions. |
| `0x33` | Read | 1 byte | • Update sequence number.<br>• Increments by 1 whenever the data is updated. An unchanged value indicates that the module is busy. |
| `0x34` ~ `0x36` | Read | 1 byte | • Product-specific definitions. |
| `0x37` | Read | 4 bytes | • Time since startup (ms).<br>• A decrease in this value indicates that the module has restarted. |

::: info ℹ️ Additional Information
Recommended procedure:

1. After startup, read register `0x01` to check the device information.
2. Read `0x32` and wait until bit 0 = 1, indicating that the module is ready.
3. Begin reading the remaining data.
:::

## 03 / Function Reference

### ✔ Basic Information

| Item | Description |
| --- | --- |
| I2C Address | `0x16` |
| Model String `0x07` | `LINE8` |
| Variant `0x06` | `[8, PCB revision]` (the first byte indicates the number of sensor channels) |
| Channel Order | CH0 ~ CH7, from right to left |
| Line Position Direction | • 0 indicates that the line is centered.<br>• Negative values indicate that the line is to the right.<br>• Positive values indicate that the line is to the left. |

### ✔ Line-Following Results

| Register | Access | Length | Description |
| --- | --- | --- | --- |
| `0x10` | Write | 1 byte | • Sets the line-following target.<br>• 0 selects a black line on a white background. 1 selects a white line on a black background.<br>• Reverts to the button-selected setting after a restart. |
| `0x11` | Read | 7 bytes | • Reads the data from `0x12` ~ `0x17` in a single operation. |
| `0x12` | Read | 1 byte | `int8` `-8 ~ +8`<br>• Line position. |
| `0x13` | Read | 1 byte | `int8` `-100 ~ +100`<br>• High-resolution line position. |
| `0x14` | Read | 1 byte | • Line width: the number of sensing elements detecting the line simultaneously. |
| `0x15` | Read | 1 byte | • Number of line groups.<br>• 0 indicates line loss, 1 indicates a single line, and 2 or more indicates a branch or crossroads. |
| `0x16` | Read | 2 bytes | `uint16`<br>• Binary optical status: classifies each sensing element as “on the line” or “off the line” based on its raw value.<br>• Bit i indicates whether sensing element i is on the line. |
| `0x17` | Read | 1 byte | `int8`<br>• The direction in which the line was last lost.<br>• Can be used to detect line loss and steer back toward the line. |

### ✔ Calibration

| Register | Access | Length | Description |
| --- | --- | --- | --- |
| `0x20` | Write | 1 byte | • Sets the calibration mode.<br>• 1 starts a 5-second dynamic calibration. 2 records the current readings as white. 3 records the current readings as black.<br>• Results are saved to EEPROM. |
| `0x21` | Read | 2 bytes | • Reads the data from `0x22` ~ `0x23` in a single operation. |
| `0x22` | Read/Write | 1 byte | `1 ~ 99`<br>• Reads or sets the detection threshold used by `0x16`.<br>• Defaults to 50 and resets to the default after a restart.<br>• Example: with a threshold of 30, an optical value below 30 is classified as “on the line,” while a value above 30 is classified as “off the line.” |
| `0x23` | Read | 1 byte | • Calibration completion counter (increments by 1 after each completed calibration).<br>• Can be used to confirm that calibration has finished. |

### ✔ Status Flags `0x32`

| Bit | Description |
| --- | --- |
| bit 0 | • Sensor ready. |
| bit 1 | • 0 indicates a black line on a white background. 1 indicates a white line on a black background. |
| bit 2 | • Calibration in progress.<br>• During the 5-second calibration, the update sequence number `0x33` stops changing. This is normal. |
| bit 3 | • Line lost. |
| bit 4 | • Junction or branch detected; line group count ≥ 2. |

### ✔ Individual Channel Values

| Register | Access | Length | Description |
| --- | --- | --- | --- |
| `0x40` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value of channel 1. |
| `0x41` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value of channel 2. |
| `0x42` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value of channel 3. |
| `0x43` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value of channel 4. |
| `0x44` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value of channel 5. |
| `0x45` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value of channel 6. |
| `0x46` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value of channel 7. |
| `0x47` | Read | 1 byte | `0 ~ 100`<br>• Calibrated optical value of channel 8. |
| `0x50` | Read | 8 bytes | • Reads the data from `0x40` ~ `0x47` in a single operation. |
| `0x51` | Read | 8 bytes | • White reference values (EEPROM). |
| `0x52` | Read | 8 bytes | • Black reference values (EEPROM). |
| `0x53` | Read | 8 bytes | `8-bit`<br>• Raw ADC values. |

## 04 / Arduino Example Code

### ✔ Reading Module Data

```c++
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
  iicWrite(LINE_ADDR, 0x10, 0);     // 0 = follow black line, 1 = follow white line
}

void loop() {
  uint8_t d[7];
  if (iicRead(LINE_ADDR, 0x11, d, 7)) {
    int8_t   pos    = (int8_t)d[0];        // -8 ~ +8
    int8_t   posHi  = (int8_t)d[1];        // -100 ~ +100; use this for PID
    uint8_t  width  = d[2];                // Line width
    uint8_t  groups = d[3];                // 0 = line lost / 1 = single line / 2+ = branch
    uint16_t bin    = (d[4] << 8) | d[5];  // One bit per channel

    Serial.print("Position ");       Serial.print(pos);
    Serial.print("  High-res ");     Serial.print(posHi);
    Serial.print("  Width ");        Serial.print(width);
    Serial.print("  Groups ");       Serial.print(groups);
    Serial.print("  Binary ");       Serial.println(bin, BIN);
  }
  delay(10);
}
```

### ✔ A Starting Point for PID Line Following

```c++
// posHi: negative = line on the right, positive = line on the left.
// When the line is on the right, turn right:
// speed up the left wheel and slow down the right wheel.
float Kp = 0.6;
int base = 120;                        // Base speed; adjust for your motor driver
int turn = Kp * posHi;
int leftSpeed  = base - turn;
int rightSpeed = base + turn;
```

### ✔ Triggering Calibration in Code

```c++
uint8_t before[2], after[2];
iicRead(LINE_ADDR, 0x21, before, 2);   // [Threshold, calibration completion counter]
iicWrite(LINE_ADDR, 0x20, 1);          // Start 5-second dynamic calibration; move the robot left and right across the line
do {
  delay(200);
  iicRead(LINE_ADDR, 0x21, after, 2);
} while (after[1] == before[1]);       // Counter +1 = calibration complete
```

## 05 / 【Lego】 Lau Xiao Demonstration Videos

<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin: 24px auto;">

  <iframe
    src="https://www.youtube.com/embed/WgacdWLatbk"
    title="MBC S8 Demonstration Video 1"
    style="width: 315px; max-width: 100%; aspect-ratio: 9 / 16; border: none; border-radius: 12px; display: block;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

  <iframe
    src="https://www.youtube.com/embed/Y2evkfTkOO4"
    title="MBC S8 Demonstration Video 2"
    style="width: 315px; max-width: 100%; aspect-ratio: 9 / 16; border: none; border-radius: 12px; display: block;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

</div>

[Return to the homepage to choose another tutorial](/en/)