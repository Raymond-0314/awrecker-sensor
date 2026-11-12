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
The v1 data layout is defined, with Arduino hardware validation pending. Camera-side SDA = IO3 and SCL = IO1 are provisional. Verify your unit and compatible logic levels before wiring.
:::

| Camera | UNO / Nano | UNO R4 / ESP32 |
| --- | --- | --- |
| 5V | 5V | Verify a suitable 5V supply |
| GND | GND | GND |
| SDA | A4 | Board SDA |
| SCL | A5 | Board SCL |

## 02 / Functions and data

::: info ℹ️ Reading notes
- Use the general I²C firmware at device address `0x4C`. Data field numbers such as `0x10` select values inside the camera; they are not the I²C device address. E0 selects the camera mode and E1 sets sampling positions.
- Coordinates use `160 × 120` pixels. X increases rightward and Y downward. X = 0 means not found.
- To read over I²C, write the start field, wait 2 ms, then read low-byte-first int16 values, at most 16 values per request.
:::

::: warning ⚠️ Note
- Only one camera submode is active at a time. Make sure its Mode ID matches the program.
- Modes reuse the same read expressions; decode their results using the table for the selected mode.
:::

<CamModeAccordion>

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`I2C provides: 16 color positions`

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `0x11` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `0x12` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `0x13` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `0x14` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `0x15` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `0x16` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `0x17` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `0x18` | Color 5 X | `0 ~ 159`<br>• Color 5 X = reading. |
| `0x19` | Color 5 Y | `0 ~ 119`<br>• Color 5 Y = reading. |
| `0x1A` | Color 6 X | `0 ~ 159`<br>• Color 6 X = reading. |
| `0x1B` | Color 6 Y | `0 ~ 119`<br>• Color 6 Y = reading. |
| `0x1C` | Color 7 X | `0 ~ 159`<br>• Color 7 X = reading. |
| `0x1D` | Color 7 Y | `0 ~ 119`<br>• Color 7 Y = reading. |
| `0x1E` | Color 8 X | `0 ~ 159`<br>• Color 8 X = reading. |
| `0x1F` | Color 8 Y | `0 ~ 119`<br>• Color 8 Y = reading. |
| `0x20` | Color 9 X | `0 ~ 159`<br>• Color 9 X = reading. |
| `0x21` | Color 9 Y | `0 ~ 119`<br>• Color 9 Y = reading. |
| `0x22` | Color 10 X | `0 ~ 159`<br>• Color 10 X = reading. |
| `0x23` | Color 10 Y | `0 ~ 119`<br>• Color 10 Y = reading. |
| `0x24` | Color 11 X | `0 ~ 159`<br>• Color 11 X = reading. |
| `0x25` | Color 11 Y | `0 ~ 119`<br>• Color 11 Y = reading. |
| `0x26` | Color 12 X | `0 ~ 159`<br>• Color 12 X = reading. |
| `0x27` | Color 12 Y | `0 ~ 119`<br>• Color 12 Y = reading. |
| `0x28` | Color 13 X | `0 ~ 159`<br>• Color 13 X = reading. |
| `0x29` | Color 13 Y | `0 ~ 119`<br>• Color 13 Y = reading. |
| `0x2A` | Color 14 X | `0 ~ 159`<br>• Color 14 X = reading. |
| `0x2B` | Color 14 Y | `0 ~ 119`<br>• Color 14 Y = reading. |
| `0x2C` | Color 15 X | `0 ~ 159`<br>• Color 15 X = reading. |
| `0x2D` | Color 15 Y | `0 ~ 119`<br>• Color 15 Y = reading. |
| `0x2E` | Color 16 X | `0 ~ 159`<br>• Color 16 X = reading. |
| `0x2F` | Color 16 Y | `0 ~ 119`<br>• Color 16 Y = reading. |
| `0x30` | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`I2C provides: 16 color positions, counts`

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `0x11` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `0x12` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `0x13` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `0x14` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `0x15` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `0x16` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `0x17` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `0x18` | Color 3 count | `0 ~ 15`<br>• Color 3 count = reading. |
| `0x19` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `0x1A` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `0x1B` | Color 4 count | `0 ~ 15`<br>• Color 4 count = reading. |
| `0x1C` | Color 5 X | `0 ~ 159`<br>• Color 5 X = reading. |
| `0x1D` | Color 5 Y | `0 ~ 119`<br>• Color 5 Y = reading. |
| `0x1E` | Color 5 count | `0 ~ 15`<br>• Color 5 count = reading. |
| `0x1F` | Color 6 X | `0 ~ 159`<br>• Color 6 X = reading. |
| `0x20` | Color 6 Y | `0 ~ 119`<br>• Color 6 Y = reading. |
| `0x21` | Color 6 count | `0 ~ 15`<br>• Color 6 count = reading. |
| `0x22` | Color 7 X | `0 ~ 159`<br>• Color 7 X = reading. |
| `0x23` | Color 7 Y | `0 ~ 119`<br>• Color 7 Y = reading. |
| `0x24` | Color 7 count | `0 ~ 15`<br>• Color 7 count = reading. |
| `0x25` | Color 8 X | `0 ~ 159`<br>• Color 8 X = reading. |
| `0x26` | Color 8 Y | `0 ~ 119`<br>• Color 8 Y = reading. |
| `0x27` | Color 8 count | `0 ~ 15`<br>• Color 8 count = reading. |
| `0x28` | Color 9 X | `0 ~ 159`<br>• Color 9 X = reading. |
| `0x29` | Color 9 Y | `0 ~ 119`<br>• Color 9 Y = reading. |
| `0x2A` | Color 9 count | `0 ~ 15`<br>• Color 9 count = reading. |
| `0x2B` | Color 10 X | `0 ~ 159`<br>• Color 10 X = reading. |
| `0x2C` | Color 10 Y | `0 ~ 119`<br>• Color 10 Y = reading. |
| `0x2D` | Color 10 count | `0 ~ 15`<br>• Color 10 count = reading. |
| `0x2E` | Color 11 X | `0 ~ 159`<br>• Color 11 X = reading. |
| `0x2F` | Color 11 Y | `0 ~ 119`<br>• Color 11 Y = reading. |
| `0x30` | Color 11 count | `0 ~ 15`<br>• Color 11 count = reading. |
| `0x31` | Color 12 X | `0 ~ 159`<br>• Color 12 X = reading. |
| `0x32` | Color 12 Y | `0 ~ 119`<br>• Color 12 Y = reading. |
| `0x33` | Color 12 count | `0 ~ 15`<br>• Color 12 count = reading. |
| `0x34` | Color 13 X | `0 ~ 159`<br>• Color 13 X = reading. |
| `0x35` | Color 13 Y | `0 ~ 119`<br>• Color 13 Y = reading. |
| `0x36` | Color 13 count | `0 ~ 15`<br>• Color 13 count = reading. |
| `0x37` | Color 14 X | `0 ~ 159`<br>• Color 14 X = reading. |
| `0x38` | Color 14 Y | `0 ~ 119`<br>• Color 14 Y = reading. |
| `0x39` | Color 14 count | `0 ~ 15`<br>• Color 14 count = reading. |
| `0x3A` | Color 15 X | `0 ~ 159`<br>• Color 15 X = reading. |
| `0x3B` | Color 15 Y | `0 ~ 119`<br>• Color 15 Y = reading. |
| `0x3C` | Color 15 count | `0 ~ 15`<br>• Color 15 count = reading. |
| `0x3D` | Color 16 X | `0 ~ 159`<br>• Color 16 X = reading. |
| `0x3E` | Color 16 Y | `0 ~ 119`<br>• Color 16 Y = reading. |
| `0x3F` | Color 16 count | `0 ~ 15`<br>• Color 16 count = reading. |
| `0x40` | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`I2C provides: 16 color positions, counts and area`

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `0x11` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `0x12` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `0x13` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `0x14` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `0x15` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `0x16` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `0x17` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `0x18` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `0x19` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `0x1A` | Color 3 area | `0 ~ 100`<br>• Color 3 area = reading. |
| `0x1B` | Color 3 count | `0 ~ 15`<br>• Color 3 count = reading. |
| `0x1C` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `0x1D` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `0x1E` | Color 4 area | `0 ~ 100`<br>• Color 4 area = reading. |
| `0x1F` | Color 4 count | `0 ~ 15`<br>• Color 4 count = reading. |
| `0x20` | Color 5 X | `0 ~ 159`<br>• Color 5 X = reading. |
| `0x21` | Color 5 Y | `0 ~ 119`<br>• Color 5 Y = reading. |
| `0x22` | Color 5 area | `0 ~ 100`<br>• Color 5 area = reading. |
| `0x23` | Color 5 count | `0 ~ 15`<br>• Color 5 count = reading. |
| `0x24` | Color 6 X | `0 ~ 159`<br>• Color 6 X = reading. |
| `0x25` | Color 6 Y | `0 ~ 119`<br>• Color 6 Y = reading. |
| `0x26` | Color 6 area | `0 ~ 100`<br>• Color 6 area = reading. |
| `0x27` | Color 6 count | `0 ~ 15`<br>• Color 6 count = reading. |
| `0x28` | Color 7 X | `0 ~ 159`<br>• Color 7 X = reading. |
| `0x29` | Color 7 Y | `0 ~ 119`<br>• Color 7 Y = reading. |
| `0x2A` | Color 7 area | `0 ~ 100`<br>• Color 7 area = reading. |
| `0x2B` | Color 7 count | `0 ~ 15`<br>• Color 7 count = reading. |
| `0x2C` | Color 8 X | `0 ~ 159`<br>• Color 8 X = reading. |
| `0x2D` | Color 8 Y | `0 ~ 119`<br>• Color 8 Y = reading. |
| `0x2E` | Color 8 area | `0 ~ 100`<br>• Color 8 area = reading. |
| `0x2F` | Color 8 count | `0 ~ 15`<br>• Color 8 count = reading. |
| `0x30` | Color 9 X | `0 ~ 159`<br>• Color 9 X = reading. |
| `0x31` | Color 9 Y | `0 ~ 119`<br>• Color 9 Y = reading. |
| `0x32` | Color 9 area | `0 ~ 100`<br>• Color 9 area = reading. |
| `0x33` | Color 9 count | `0 ~ 15`<br>• Color 9 count = reading. |
| `0x34` | Color 10 X | `0 ~ 159`<br>• Color 10 X = reading. |
| `0x35` | Color 10 Y | `0 ~ 119`<br>• Color 10 Y = reading. |
| `0x36` | Color 10 area | `0 ~ 100`<br>• Color 10 area = reading. |
| `0x37` | Color 10 count | `0 ~ 15`<br>• Color 10 count = reading. |
| `0x38` | Color 11 X | `0 ~ 159`<br>• Color 11 X = reading. |
| `0x39` | Color 11 Y | `0 ~ 119`<br>• Color 11 Y = reading. |
| `0x3A` | Color 11 area | `0 ~ 100`<br>• Color 11 area = reading. |
| `0x3B` | Color 11 count | `0 ~ 15`<br>• Color 11 count = reading. |
| `0x3C` | Color 12 X | `0 ~ 159`<br>• Color 12 X = reading. |
| `0x3D` | Color 12 Y | `0 ~ 119`<br>• Color 12 Y = reading. |
| `0x3E` | Color 12 area | `0 ~ 100`<br>• Color 12 area = reading. |
| `0x3F` | Color 12 count | `0 ~ 15`<br>• Color 12 count = reading. |
| `0x40` | Color 13 X | `0 ~ 159`<br>• Color 13 X = reading. |
| `0x41` | Color 13 Y | `0 ~ 119`<br>• Color 13 Y = reading. |
| `0x42` | Color 13 area | `0 ~ 100`<br>• Color 13 area = reading. |
| `0x43` | Color 13 count | `0 ~ 15`<br>• Color 13 count = reading. |
| `0x44` | Color 14 X | `0 ~ 159`<br>• Color 14 X = reading. |
| `0x45` | Color 14 Y | `0 ~ 119`<br>• Color 14 Y = reading. |
| `0x46` | Color 14 area | `0 ~ 100`<br>• Color 14 area = reading. |
| `0x47` | Color 14 count | `0 ~ 15`<br>• Color 14 count = reading. |
| `0x48` | Color 15 X | `0 ~ 159`<br>• Color 15 X = reading. |
| `0x49` | Color 15 Y | `0 ~ 119`<br>• Color 15 Y = reading. |
| `0x4A` | Color 15 area | `0 ~ 100`<br>• Color 15 area = reading. |
| `0x4B` | Color 15 count | `0 ~ 15`<br>• Color 15 count = reading. |
| `0x4C` | Color 16 X | `0 ~ 159`<br>• Color 16 X = reading. |
| `0x4D` | Color 16 Y | `0 ~ 119`<br>• Color 16 Y = reading. |
| `0x4E` | Color 16 area | `0 ~ 100`<br>• Color 16 area = reading. |
| `0x4F` | Color 16 count | `0 ~ 15`<br>• Color 16 count = reading. |
| `0x50` | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`I2C provides: 16 color positions and sizes, counts and area`

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Color 1 X | `0 ~ 159`<br>• Color 1 X = reading. |
| `0x11` | Color 1 Y | `0 ~ 119`<br>• Color 1 Y = reading. |
| `0x12` | Color 1 W | `0 ~ 160`<br>• Color 1 W = reading. |
| `0x13` | Color 1 H | `0 ~ 120`<br>• Color 1 H = reading. |
| `0x14` | Color 1 count | `0 ~ 15`<br>• Color 1 count = reading. |
| `0x15` | Color 1 area | `0 ~ 100`<br>• Color 1 area = reading. |
| `0x16` | Color 2 X | `0 ~ 159`<br>• Color 2 X = reading. |
| `0x17` | Color 2 Y | `0 ~ 119`<br>• Color 2 Y = reading. |
| `0x18` | Color 2 W | `0 ~ 160`<br>• Color 2 W = reading. |
| `0x19` | Color 2 H | `0 ~ 120`<br>• Color 2 H = reading. |
| `0x1A` | Color 2 count | `0 ~ 15`<br>• Color 2 count = reading. |
| `0x1B` | Color 2 area | `0 ~ 100`<br>• Color 2 area = reading. |
| `0x1C` | Color 3 X | `0 ~ 159`<br>• Color 3 X = reading. |
| `0x1D` | Color 3 Y | `0 ~ 119`<br>• Color 3 Y = reading. |
| `0x1E` | Color 3 W | `0 ~ 160`<br>• Color 3 W = reading. |
| `0x1F` | Color 3 H | `0 ~ 120`<br>• Color 3 H = reading. |
| `0x20` | Color 3 count | `0 ~ 15`<br>• Color 3 count = reading. |
| `0x21` | Color 3 area | `0 ~ 100`<br>• Color 3 area = reading. |
| `0x22` | Color 4 X | `0 ~ 159`<br>• Color 4 X = reading. |
| `0x23` | Color 4 Y | `0 ~ 119`<br>• Color 4 Y = reading. |
| `0x24` | Color 4 W | `0 ~ 160`<br>• Color 4 W = reading. |
| `0x25` | Color 4 H | `0 ~ 120`<br>• Color 4 H = reading. |
| `0x26` | Color 4 count | `0 ~ 15`<br>• Color 4 count = reading. |
| `0x27` | Color 4 area | `0 ~ 100`<br>• Color 4 area = reading. |
| `0x28` | Color 5 X | `0 ~ 159`<br>• Color 5 X = reading. |
| `0x29` | Color 5 Y | `0 ~ 119`<br>• Color 5 Y = reading. |
| `0x2A` | Color 5 W | `0 ~ 160`<br>• Color 5 W = reading. |
| `0x2B` | Color 5 H | `0 ~ 120`<br>• Color 5 H = reading. |
| `0x2C` | Color 5 count | `0 ~ 15`<br>• Color 5 count = reading. |
| `0x2D` | Color 5 area | `0 ~ 100`<br>• Color 5 area = reading. |
| `0x2E` | Color 6 X | `0 ~ 159`<br>• Color 6 X = reading. |
| `0x2F` | Color 6 Y | `0 ~ 119`<br>• Color 6 Y = reading. |
| `0x30` | Color 6 W | `0 ~ 160`<br>• Color 6 W = reading. |
| `0x31` | Color 6 H | `0 ~ 120`<br>• Color 6 H = reading. |
| `0x32` | Color 6 count | `0 ~ 15`<br>• Color 6 count = reading. |
| `0x33` | Color 6 area | `0 ~ 100`<br>• Color 6 area = reading. |
| `0x34` | Color 7 X | `0 ~ 159`<br>• Color 7 X = reading. |
| `0x35` | Color 7 Y | `0 ~ 119`<br>• Color 7 Y = reading. |
| `0x36` | Color 7 W | `0 ~ 160`<br>• Color 7 W = reading. |
| `0x37` | Color 7 H | `0 ~ 120`<br>• Color 7 H = reading. |
| `0x38` | Color 7 count | `0 ~ 15`<br>• Color 7 count = reading. |
| `0x39` | Color 7 area | `0 ~ 100`<br>• Color 7 area = reading. |
| `0x3A` | Color 8 X | `0 ~ 159`<br>• Color 8 X = reading. |
| `0x3B` | Color 8 Y | `0 ~ 119`<br>• Color 8 Y = reading. |
| `0x3C` | Color 8 W | `0 ~ 160`<br>• Color 8 W = reading. |
| `0x3D` | Color 8 H | `0 ~ 120`<br>• Color 8 H = reading. |
| `0x3E` | Color 8 count | `0 ~ 15`<br>• Color 8 count = reading. |
| `0x3F` | Color 8 area | `0 ~ 100`<br>• Color 8 area = reading. |
| `0x40` | Color 9 X | `0 ~ 159`<br>• Color 9 X = reading. |
| `0x41` | Color 9 Y | `0 ~ 119`<br>• Color 9 Y = reading. |
| `0x42` | Color 9 W | `0 ~ 160`<br>• Color 9 W = reading. |
| `0x43` | Color 9 H | `0 ~ 120`<br>• Color 9 H = reading. |
| `0x44` | Color 9 count | `0 ~ 15`<br>• Color 9 count = reading. |
| `0x45` | Color 9 area | `0 ~ 100`<br>• Color 9 area = reading. |
| `0x46` | Color 10 X | `0 ~ 159`<br>• Color 10 X = reading. |
| `0x47` | Color 10 Y | `0 ~ 119`<br>• Color 10 Y = reading. |
| `0x48` | Color 10 W | `0 ~ 160`<br>• Color 10 W = reading. |
| `0x49` | Color 10 H | `0 ~ 120`<br>• Color 10 H = reading. |
| `0x4A` | Color 10 count | `0 ~ 15`<br>• Color 10 count = reading. |
| `0x4B` | Color 10 area | `0 ~ 100`<br>• Color 10 area = reading. |
| `0x4C` | Color 11 X | `0 ~ 159`<br>• Color 11 X = reading. |
| `0x4D` | Color 11 Y | `0 ~ 119`<br>• Color 11 Y = reading. |
| `0x4E` | Color 11 W | `0 ~ 160`<br>• Color 11 W = reading. |
| `0x4F` | Color 11 H | `0 ~ 120`<br>• Color 11 H = reading. |
| `0x50` | Color 11 count | `0 ~ 15`<br>• Color 11 count = reading. |
| `0x51` | Color 11 area | `0 ~ 100`<br>• Color 11 area = reading. |
| `0x52` | Color 12 X | `0 ~ 159`<br>• Color 12 X = reading. |
| `0x53` | Color 12 Y | `0 ~ 119`<br>• Color 12 Y = reading. |
| `0x54` | Color 12 W | `0 ~ 160`<br>• Color 12 W = reading. |
| `0x55` | Color 12 H | `0 ~ 120`<br>• Color 12 H = reading. |
| `0x56` | Color 12 count | `0 ~ 15`<br>• Color 12 count = reading. |
| `0x57` | Color 12 area | `0 ~ 100`<br>• Color 12 area = reading. |
| `0x58` | Color 13 X | `0 ~ 159`<br>• Color 13 X = reading. |
| `0x59` | Color 13 Y | `0 ~ 119`<br>• Color 13 Y = reading. |
| `0x5A` | Color 13 W | `0 ~ 160`<br>• Color 13 W = reading. |
| `0x5B` | Color 13 H | `0 ~ 120`<br>• Color 13 H = reading. |
| `0x5C` | Color 13 count | `0 ~ 15`<br>• Color 13 count = reading. |
| `0x5D` | Color 13 area | `0 ~ 100`<br>• Color 13 area = reading. |
| `0x5E` | Color 14 X | `0 ~ 159`<br>• Color 14 X = reading. |
| `0x5F` | Color 14 Y | `0 ~ 119`<br>• Color 14 Y = reading. |
| `0x60` | Color 14 W | `0 ~ 160`<br>• Color 14 W = reading. |
| `0x61` | Color 14 H | `0 ~ 120`<br>• Color 14 H = reading. |
| `0x62` | Color 14 count | `0 ~ 15`<br>• Color 14 count = reading. |
| `0x63` | Color 14 area | `0 ~ 100`<br>• Color 14 area = reading. |
| `0x64` | Color 15 X | `0 ~ 159`<br>• Color 15 X = reading. |
| `0x65` | Color 15 Y | `0 ~ 119`<br>• Color 15 Y = reading. |
| `0x66` | Color 15 W | `0 ~ 160`<br>• Color 15 W = reading. |
| `0x67` | Color 15 H | `0 ~ 120`<br>• Color 15 H = reading. |
| `0x68` | Color 15 count | `0 ~ 15`<br>• Color 15 count = reading. |
| `0x69` | Color 15 area | `0 ~ 100`<br>• Color 15 area = reading. |
| `0x6A` | Color 16 X | `0 ~ 159`<br>• Color 16 X = reading. |
| `0x6B` | Color 16 Y | `0 ~ 119`<br>• Color 16 Y = reading. |
| `0x6C` | Color 16 W | `0 ~ 160`<br>• Color 16 W = reading. |
| `0x6D` | Color 16 H | `0 ~ 120`<br>• Color 16 H = reading. |
| `0x6E` | Color 16 count | `0 ~ 15`<br>• Color 16 count = reading. |
| `0x6F` | Color 16 area | `0 ~ 100`<br>• Color 16 area = reading. |
| `0x70` | Colors found | `0 ~ 16`<br>• Colors found = reading.<br>• This is the total found, distinct from the number of positions available in this mode. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`I2C provides: 16 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `0x11` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `0x12` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `0x13` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `0x14` | S5 hue | `0 ~ 255`<br>• S5 hue = reading. |
| `0x15` | S6 hue | `0 ~ 255`<br>• S6 hue = reading. |
| `0x16` | S7 hue | `0 ~ 255`<br>• S7 hue = reading. |
| `0x17` | S8 hue | `0 ~ 255`<br>• S8 hue = reading. |
| `0x18` | S9 hue | `0 ~ 255`<br>• S9 hue = reading. |
| `0x19` | S10 hue | `0 ~ 255`<br>• S10 hue = reading. |
| `0x1A` | S11 hue | `0 ~ 255`<br>• S11 hue = reading. |
| `0x1B` | S12 hue | `0 ~ 255`<br>• S12 hue = reading. |
| `0x1C` | S13 hue | `0 ~ 255`<br>• S13 hue = reading. |
| `0x1D` | S14 hue | `0 ~ 255`<br>• S14 hue = reading. |
| `0x1E` | S15 hue | `0 ~ 255`<br>• S15 hue = reading. |
| `0x1F` | S16 hue | `0 ~ 255`<br>• S16 hue = reading. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`I2C provides: 16 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `0x11` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `0x12` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `0x13` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `0x14` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `0x15` | S3 saturation | `0 ~ 100`<br>• S3 saturation = reading. |
| `0x16` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `0x17` | S4 saturation | `0 ~ 100`<br>• S4 saturation = reading. |
| `0x18` | S5 hue | `0 ~ 255`<br>• S5 hue = reading. |
| `0x19` | S5 saturation | `0 ~ 100`<br>• S5 saturation = reading. |
| `0x1A` | S6 hue | `0 ~ 255`<br>• S6 hue = reading. |
| `0x1B` | S6 saturation | `0 ~ 100`<br>• S6 saturation = reading. |
| `0x1C` | S7 hue | `0 ~ 255`<br>• S7 hue = reading. |
| `0x1D` | S7 saturation | `0 ~ 100`<br>• S7 saturation = reading. |
| `0x1E` | S8 hue | `0 ~ 255`<br>• S8 hue = reading. |
| `0x1F` | S8 saturation | `0 ~ 100`<br>• S8 saturation = reading. |
| `0x20` | S9 hue | `0 ~ 255`<br>• S9 hue = reading. |
| `0x21` | S9 saturation | `0 ~ 100`<br>• S9 saturation = reading. |
| `0x22` | S10 hue | `0 ~ 255`<br>• S10 hue = reading. |
| `0x23` | S10 saturation | `0 ~ 100`<br>• S10 saturation = reading. |
| `0x24` | S11 hue | `0 ~ 255`<br>• S11 hue = reading. |
| `0x25` | S11 saturation | `0 ~ 100`<br>• S11 saturation = reading. |
| `0x26` | S12 hue | `0 ~ 255`<br>• S12 hue = reading. |
| `0x27` | S12 saturation | `0 ~ 100`<br>• S12 saturation = reading. |
| `0x28` | S13 hue | `0 ~ 255`<br>• S13 hue = reading. |
| `0x29` | S13 saturation | `0 ~ 100`<br>• S13 saturation = reading. |
| `0x2A` | S14 hue | `0 ~ 255`<br>• S14 hue = reading. |
| `0x2B` | S14 saturation | `0 ~ 100`<br>• S14 saturation = reading. |
| `0x2C` | S15 hue | `0 ~ 255`<br>• S15 hue = reading. |
| `0x2D` | S15 saturation | `0 ~ 100`<br>• S15 saturation = reading. |
| `0x2E` | S16 hue | `0 ~ 255`<br>• S16 hue = reading. |
| `0x2F` | S16 saturation | `0 ~ 100`<br>• S16 saturation = reading. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`I2C provides: 16 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| `0x11` | S1 saturation | `0 ~ 100`<br>• S1 saturation = reading. |
| `0x12` | S1 value | `0 ~ 100`<br>• S1 value = reading. |
| `0x13` | S2 hue | `0 ~ 255`<br>• S2 hue = reading. |
| `0x14` | S2 saturation | `0 ~ 100`<br>• S2 saturation = reading. |
| `0x15` | S2 value | `0 ~ 100`<br>• S2 value = reading. |
| `0x16` | S3 hue | `0 ~ 255`<br>• S3 hue = reading. |
| `0x17` | S3 saturation | `0 ~ 100`<br>• S3 saturation = reading. |
| `0x18` | S3 value | `0 ~ 100`<br>• S3 value = reading. |
| `0x19` | S4 hue | `0 ~ 255`<br>• S4 hue = reading. |
| `0x1A` | S4 saturation | `0 ~ 100`<br>• S4 saturation = reading. |
| `0x1B` | S4 value | `0 ~ 100`<br>• S4 value = reading. |
| `0x1C` | S5 hue | `0 ~ 255`<br>• S5 hue = reading. |
| `0x1D` | S5 saturation | `0 ~ 100`<br>• S5 saturation = reading. |
| `0x1E` | S5 value | `0 ~ 100`<br>• S5 value = reading. |
| `0x1F` | S6 hue | `0 ~ 255`<br>• S6 hue = reading. |
| `0x20` | S6 saturation | `0 ~ 100`<br>• S6 saturation = reading. |
| `0x21` | S6 value | `0 ~ 100`<br>• S6 value = reading. |
| `0x22` | S7 hue | `0 ~ 255`<br>• S7 hue = reading. |
| `0x23` | S7 saturation | `0 ~ 100`<br>• S7 saturation = reading. |
| `0x24` | S7 value | `0 ~ 100`<br>• S7 value = reading. |
| `0x25` | S8 hue | `0 ~ 255`<br>• S8 hue = reading. |
| `0x26` | S8 saturation | `0 ~ 100`<br>• S8 saturation = reading. |
| `0x27` | S8 value | `0 ~ 100`<br>• S8 value = reading. |
| `0x28` | S9 hue | `0 ~ 255`<br>• S9 hue = reading. |
| `0x29` | S9 saturation | `0 ~ 100`<br>• S9 saturation = reading. |
| `0x2A` | S9 value | `0 ~ 100`<br>• S9 value = reading. |
| `0x2B` | S10 hue | `0 ~ 255`<br>• S10 hue = reading. |
| `0x2C` | S10 saturation | `0 ~ 100`<br>• S10 saturation = reading. |
| `0x2D` | S10 value | `0 ~ 100`<br>• S10 value = reading. |
| `0x2E` | S11 hue | `0 ~ 255`<br>• S11 hue = reading. |
| `0x2F` | S11 saturation | `0 ~ 100`<br>• S11 saturation = reading. |
| `0x30` | S11 value | `0 ~ 100`<br>• S11 value = reading. |
| `0x31` | S12 hue | `0 ~ 255`<br>• S12 hue = reading. |
| `0x32` | S12 saturation | `0 ~ 100`<br>• S12 saturation = reading. |
| `0x33` | S12 value | `0 ~ 100`<br>• S12 value = reading. |
| `0x34` | S13 hue | `0 ~ 255`<br>• S13 hue = reading. |
| `0x35` | S13 saturation | `0 ~ 100`<br>• S13 saturation = reading. |
| `0x36` | S13 value | `0 ~ 100`<br>• S13 value = reading. |
| `0x37` | S14 hue | `0 ~ 255`<br>• S14 hue = reading. |
| `0x38` | S14 saturation | `0 ~ 100`<br>• S14 saturation = reading. |
| `0x39` | S14 value | `0 ~ 100`<br>• S14 value = reading. |
| `0x3A` | S15 hue | `0 ~ 255`<br>• S15 hue = reading. |
| `0x3B` | S15 saturation | `0 ~ 100`<br>• S15 saturation = reading. |
| `0x3C` | S15 value | `0 ~ 100`<br>• S15 value = reading. |
| `0x3D` | S16 hue | `0 ~ 255`<br>• S16 hue = reading. |
| `0x3E` | S16 saturation | `0 ~ 100`<br>• S16 saturation = reading. |
| `0x3F` | S16 value | `0 ~ 100`<br>• S16 value = reading. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`I2C provides: the first 16 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| `0x11` | Block 2 hue from the left | `0 ~ 255`<br>• Block 2 hue from the left = reading. |
| `0x12` | Block 3 hue from the left | `0 ~ 255`<br>• Block 3 hue from the left = reading. |
| `0x13` | Block 4 hue from the left | `0 ~ 255`<br>• Block 4 hue from the left = reading. |
| `0x14` | Block 5 hue from the left | `0 ~ 255`<br>• Block 5 hue from the left = reading. |
| `0x15` | Block 6 hue from the left | `0 ~ 255`<br>• Block 6 hue from the left = reading. |
| `0x16` | Block 7 hue from the left | `0 ~ 255`<br>• Block 7 hue from the left = reading. |
| `0x17` | Block 8 hue from the left | `0 ~ 255`<br>• Block 8 hue from the left = reading. |
| `0x18` | Block 9 hue from the left | `0 ~ 255`<br>• Block 9 hue from the left = reading. |
| `0x19` | Block 10 hue from the left | `0 ~ 255`<br>• Block 10 hue from the left = reading. |
| `0x1A` | Block 11 hue from the left | `0 ~ 255`<br>• Block 11 hue from the left = reading. |
| `0x1B` | Block 12 hue from the left | `0 ~ 255`<br>• Block 12 hue from the left = reading. |
| `0x1C` | Block 13 hue from the left | `0 ~ 255`<br>• Block 13 hue from the left = reading. |
| `0x1D` | Block 14 hue from the left | `0 ~ 255`<br>• Block 14 hue from the left = reading. |
| `0x1E` | Block 15 hue from the left | `0 ~ 255`<br>• Block 15 hue from the left = reading. |
| `0x1F` | Block 16 hue from the left | `0 ~ 255`<br>• Block 16 hue from the left = reading. |
| `0x20` | Total color blocks | `0 ~ 18`<br>• Total color blocks = reading. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`I2C provides: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `0x11` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `0x12` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `0x13` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `0x14` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `0x15` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `0x16` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `0x17` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `0x18` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `0x19` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `0x1A` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `0x1B` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `0x1C` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `0x1D` | Last lost-line direction | `0 ~ 2`<br>• Last lost-line direction = reading.<br>• 0 line present, 1 last lost to the left, 2 last lost to the right. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`I2C provides: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `0x11` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `0x12` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `0x13` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `0x14` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `0x15` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `0x16` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `0x17` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `0x18` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `0x19` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `0x1A` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `0x1B` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `0x1C` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `0x1D` | Last lost-line direction | `0 ~ 2`<br>• Last lost-line direction = reading.<br>• 0 line present, 1 last lost to the left, 2 last lost to the right. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`I2C provides: 14 line-following readings`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- Negative offsets place the line on the left; positive offsets place it on the right.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Near offset | `-100 ~ 100`<br>• Near offset = reading; preserve the sign. |
| `0x11` | Middle offset | `-100 ~ 100`<br>• Middle offset = reading; preserve the sign. |
| `0x12` | Far offset | `-100 ~ 100`<br>• Far offset = reading; preserve the sign. |
| `0x13` | Line angle | `-90 ~ 90°`<br>• Line angle = reading; preserve the sign. |
| `0x14` | Near line width | `0 ~ 100`<br>• Near line width = reading. |
| `0x15` | Line-found flags | `0 ~ 7`<br>• Line-found flags = reading. |
| `0x16` | Junction type | `0 ~ 5`<br>• Junction type = reading. |
| `0x17` | Junction distance | `0 ~ 100`<br>• Junction distance = reading. |
| `0x18` | Near left edge | `-100 ~ 100`<br>• Near left edge = reading; preserve the sign. |
| `0x19` | Near right edge | `-100 ~ 100`<br>• Near right edge = reading; preserve the sign. |
| `0x1A` | Far line width | `0 ~ 100`<br>• Far line width = reading. |
| `0x1B` | Marker color ID | `0 ~ 16`<br>• Marker color ID = reading. |
| `0x1C` | Marker count | `0 ~ 99`<br>• Marker count = reading. |
| `0x1D` | Last lost-line direction | `0 ~ 2`<br>• Last lost-line direction = reading.<br>• 0 line present, 1 last lost to the left, 2 last lost to the right. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`I2C provides: color IDs, shapes and positions of the first 8 objects, plus total count`

::: info ℹ️ Reading notes
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Object 1 color ID | `0 ~ 8`<br>• Object 1 color ID = reading. |
| `0x11` | Object 1 shape code | `0 ~ 9`<br>• Object 1 shape code = reading. |
| `0x12` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `0x13` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `0x14` | Object 2 color ID | `0 ~ 8`<br>• Object 2 color ID = reading. |
| `0x15` | Object 2 shape code | `0 ~ 9`<br>• Object 2 shape code = reading. |
| `0x16` | Object 2 X | `0 ~ 159`<br>• Object 2 X = reading. |
| `0x17` | Object 2 Y | `0 ~ 119`<br>• Object 2 Y = reading. |
| `0x18` | Object 3 color ID | `0 ~ 8`<br>• Object 3 color ID = reading. |
| `0x19` | Object 3 shape code | `0 ~ 9`<br>• Object 3 shape code = reading. |
| `0x1A` | Object 3 X | `0 ~ 159`<br>• Object 3 X = reading. |
| `0x1B` | Object 3 Y | `0 ~ 119`<br>• Object 3 Y = reading. |
| `0x1C` | Object 4 color ID | `0 ~ 8`<br>• Object 4 color ID = reading. |
| `0x1D` | Object 4 shape code | `0 ~ 9`<br>• Object 4 shape code = reading. |
| `0x1E` | Object 4 X | `0 ~ 159`<br>• Object 4 X = reading. |
| `0x1F` | Object 4 Y | `0 ~ 119`<br>• Object 4 Y = reading. |
| `0x20` | Object 5 color ID | `0 ~ 8`<br>• Object 5 color ID = reading. |
| `0x21` | Object 5 shape code | `0 ~ 9`<br>• Object 5 shape code = reading. |
| `0x22` | Object 5 X | `0 ~ 159`<br>• Object 5 X = reading. |
| `0x23` | Object 5 Y | `0 ~ 119`<br>• Object 5 Y = reading. |
| `0x24` | Object 6 color ID | `0 ~ 8`<br>• Object 6 color ID = reading. |
| `0x25` | Object 6 shape code | `0 ~ 9`<br>• Object 6 shape code = reading. |
| `0x26` | Object 6 X | `0 ~ 159`<br>• Object 6 X = reading. |
| `0x27` | Object 6 Y | `0 ~ 119`<br>• Object 6 Y = reading. |
| `0x28` | Object 7 color ID | `0 ~ 8`<br>• Object 7 color ID = reading. |
| `0x29` | Object 7 shape code | `0 ~ 9`<br>• Object 7 shape code = reading. |
| `0x2A` | Object 7 X | `0 ~ 159`<br>• Object 7 X = reading. |
| `0x2B` | Object 7 Y | `0 ~ 119`<br>• Object 7 Y = reading. |
| `0x2C` | Object 8 color ID | `0 ~ 8`<br>• Object 8 color ID = reading. |
| `0x2D` | Object 8 shape code | `0 ~ 9`<br>• Object 8 shape code = reading. |
| `0x2E` | Object 8 X | `0 ~ 159`<br>• Object 8 X = reading. |
| `0x2F` | Object 8 Y | `0 ~ 119`<br>• Object 8 Y = reading. |
| `0x30` | Object count | `0 ~ 8`<br>• Object count = reading. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`I2C provides: details of the first 8 objects`

::: info ℹ️ Reading notes
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| `0x10` | Object 1 color ID | `0 ~ 8`<br>• Object 1 color ID = reading. |
| `0x11` | Object 1 shape code | `0 ~ 9`<br>• Object 1 shape code = reading. |
| `0x12` | Object 1 X | `0 ~ 159`<br>• Object 1 X = reading. |
| `0x13` | Object 1 Y | `0 ~ 119`<br>• Object 1 Y = reading. |
| `0x14` | Object 1 W | `0 ~ 160`<br>• Object 1 W = reading. |
| `0x15` | Object 1 H | `0 ~ 120`<br>• Object 1 H = reading. |
| `0x16` | Object 1 area | `0 ~ 100`<br>• Object 1 area = reading. |
| `0x17` | Object 1 angle | `0 ~ 179°`<br>• Object 1 angle = reading. |
| `0x18` | Object 1 vertex count | `0 ~ 10`<br>• Object 1 vertex count = reading.<br>• Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, star 10, circle and ellipse 0. |
| `0x19` | Object 1 tracking ID | `0 ~ 255`<br>• Object 1 tracking ID = reading.<br>• The same object retains its ID across frames; 0 means no object. |
| `0x1A` | Object 2 color ID | `0 ~ 8`<br>• Object 2 color ID = reading. |
| `0x1B` | Object 2 shape code | `0 ~ 9`<br>• Object 2 shape code = reading. |
| `0x1C` | Object 2 X | `0 ~ 159`<br>• Object 2 X = reading. |
| `0x1D` | Object 2 Y | `0 ~ 119`<br>• Object 2 Y = reading. |
| `0x1E` | Object 2 W | `0 ~ 160`<br>• Object 2 W = reading. |
| `0x1F` | Object 2 H | `0 ~ 120`<br>• Object 2 H = reading. |
| `0x20` | Object 2 area | `0 ~ 100`<br>• Object 2 area = reading. |
| `0x21` | Object 2 angle | `0 ~ 179°`<br>• Object 2 angle = reading. |
| `0x22` | Object 2 vertex count | `0 ~ 10`<br>• Object 2 vertex count = reading.<br>• Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, star 10, circle and ellipse 0. |
| `0x23` | Object 2 tracking ID | `0 ~ 255`<br>• Object 2 tracking ID = reading.<br>• The same object retains its ID across frames; 0 means no object. |
| `0x24` | Object 3 color ID | `0 ~ 8`<br>• Object 3 color ID = reading. |
| `0x25` | Object 3 shape code | `0 ~ 9`<br>• Object 3 shape code = reading. |
| `0x26` | Object 3 X | `0 ~ 159`<br>• Object 3 X = reading. |
| `0x27` | Object 3 Y | `0 ~ 119`<br>• Object 3 Y = reading. |
| `0x28` | Object 3 W | `0 ~ 160`<br>• Object 3 W = reading. |
| `0x29` | Object 3 H | `0 ~ 120`<br>• Object 3 H = reading. |
| `0x2A` | Object 3 area | `0 ~ 100`<br>• Object 3 area = reading. |
| `0x2B` | Object 3 angle | `0 ~ 179°`<br>• Object 3 angle = reading. |
| `0x2C` | Object 3 vertex count | `0 ~ 10`<br>• Object 3 vertex count = reading.<br>• Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, star 10, circle and ellipse 0. |
| `0x2D` | Object 3 tracking ID | `0 ~ 255`<br>• Object 3 tracking ID = reading.<br>• The same object retains its ID across frames; 0 means no object. |
| `0x2E` | Object 4 color ID | `0 ~ 8`<br>• Object 4 color ID = reading. |
| `0x2F` | Object 4 shape code | `0 ~ 9`<br>• Object 4 shape code = reading. |
| `0x30` | Object 4 X | `0 ~ 159`<br>• Object 4 X = reading. |
| `0x31` | Object 4 Y | `0 ~ 119`<br>• Object 4 Y = reading. |
| `0x32` | Object 4 W | `0 ~ 160`<br>• Object 4 W = reading. |
| `0x33` | Object 4 H | `0 ~ 120`<br>• Object 4 H = reading. |
| `0x34` | Object 4 area | `0 ~ 100`<br>• Object 4 area = reading. |
| `0x35` | Object 4 angle | `0 ~ 179°`<br>• Object 4 angle = reading. |
| `0x36` | Object 4 vertex count | `0 ~ 10`<br>• Object 4 vertex count = reading.<br>• Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, star 10, circle and ellipse 0. |
| `0x37` | Object 4 tracking ID | `0 ~ 255`<br>• Object 4 tracking ID = reading.<br>• The same object retains its ID across frames; 0 means no object. |
| `0x38` | Object 5 color ID | `0 ~ 8`<br>• Object 5 color ID = reading. |
| `0x39` | Object 5 shape code | `0 ~ 9`<br>• Object 5 shape code = reading. |
| `0x3A` | Object 5 X | `0 ~ 159`<br>• Object 5 X = reading. |
| `0x3B` | Object 5 Y | `0 ~ 119`<br>• Object 5 Y = reading. |
| `0x3C` | Object 5 W | `0 ~ 160`<br>• Object 5 W = reading. |
| `0x3D` | Object 5 H | `0 ~ 120`<br>• Object 5 H = reading. |
| `0x3E` | Object 5 area | `0 ~ 100`<br>• Object 5 area = reading. |
| `0x3F` | Object 5 angle | `0 ~ 179°`<br>• Object 5 angle = reading. |
| `0x40` | Object 5 vertex count | `0 ~ 10`<br>• Object 5 vertex count = reading.<br>• Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, star 10, circle and ellipse 0. |
| `0x41` | Object 5 tracking ID | `0 ~ 255`<br>• Object 5 tracking ID = reading.<br>• The same object retains its ID across frames; 0 means no object. |
| `0x42` | Object 6 color ID | `0 ~ 8`<br>• Object 6 color ID = reading. |
| `0x43` | Object 6 shape code | `0 ~ 9`<br>• Object 6 shape code = reading. |
| `0x44` | Object 6 X | `0 ~ 159`<br>• Object 6 X = reading. |
| `0x45` | Object 6 Y | `0 ~ 119`<br>• Object 6 Y = reading. |
| `0x46` | Object 6 W | `0 ~ 160`<br>• Object 6 W = reading. |
| `0x47` | Object 6 H | `0 ~ 120`<br>• Object 6 H = reading. |
| `0x48` | Object 6 area | `0 ~ 100`<br>• Object 6 area = reading. |
| `0x49` | Object 6 angle | `0 ~ 179°`<br>• Object 6 angle = reading. |
| `0x4A` | Object 6 vertex count | `0 ~ 10`<br>• Object 6 vertex count = reading.<br>• Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, star 10, circle and ellipse 0. |
| `0x4B` | Object 6 tracking ID | `0 ~ 255`<br>• Object 6 tracking ID = reading.<br>• The same object retains its ID across frames; 0 means no object. |
| `0x4C` | Object 7 color ID | `0 ~ 8`<br>• Object 7 color ID = reading. |
| `0x4D` | Object 7 shape code | `0 ~ 9`<br>• Object 7 shape code = reading. |
| `0x4E` | Object 7 X | `0 ~ 159`<br>• Object 7 X = reading. |
| `0x4F` | Object 7 Y | `0 ~ 119`<br>• Object 7 Y = reading. |
| `0x50` | Object 7 W | `0 ~ 160`<br>• Object 7 W = reading. |
| `0x51` | Object 7 H | `0 ~ 120`<br>• Object 7 H = reading. |
| `0x52` | Object 7 area | `0 ~ 100`<br>• Object 7 area = reading. |
| `0x53` | Object 7 angle | `0 ~ 179°`<br>• Object 7 angle = reading. |
| `0x54` | Object 7 vertex count | `0 ~ 10`<br>• Object 7 vertex count = reading.<br>• Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, star 10, circle and ellipse 0. |
| `0x55` | Object 7 tracking ID | `0 ~ 255`<br>• Object 7 tracking ID = reading.<br>• The same object retains its ID across frames; 0 means no object. |
| `0x56` | Object 8 color ID | `0 ~ 8`<br>• Object 8 color ID = reading. |
| `0x57` | Object 8 shape code | `0 ~ 9`<br>• Object 8 shape code = reading. |
| `0x58` | Object 8 X | `0 ~ 159`<br>• Object 8 X = reading. |
| `0x59` | Object 8 Y | `0 ~ 119`<br>• Object 8 Y = reading. |
| `0x5A` | Object 8 W | `0 ~ 160`<br>• Object 8 W = reading. |
| `0x5B` | Object 8 H | `0 ~ 120`<br>• Object 8 H = reading. |
| `0x5C` | Object 8 area | `0 ~ 100`<br>• Object 8 area = reading. |
| `0x5D` | Object 8 angle | `0 ~ 179°`<br>• Object 8 angle = reading. |
| `0x5E` | Object 8 vertex count | `0 ~ 10`<br>• Object 8 vertex count = reading.<br>• Triangle 3, quadrilateral 4, pentagon 5, hexagon 6, star 10, circle and ellipse 0. |
| `0x5F` | Object 8 tracking ID | `0 ~ 255`<br>• Object 8 tracking ID = reading.<br>• The same object retains its ID across frames; 0 means no object. |
| `0x60` | Object count | `0 ~ 8`<br>• Object count = reading. |

</CamModeSection>

</CamModeAccordion>

## 03 / Example programs

Teach target color 1 on the camera. The program sends E0 [1, 3] once in setup() to select Mode ID 13 (Color tracking - ③ Standard). Set the serial monitor to 115200 baud. The program reads all 65 fields of mode 13 in five explicit batches. It prints the total found, then X, Y, area and count for each detected color. The print loop only displays the array; every field is listed in the mode 13 table.

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
    values[i] = static_cast<int16_t>(raw);
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
  int16_t mode, values[65];
  if (!readCamera(0x01, 1, &mode)) {
    Serial.println("Check camera wiring and address");
  } else if (mode != 13) {
    Serial.println("Select camera mode 13");
  } else if (!readCamera(0x10, 16, values) ||
             !readCamera(0x20, 16, values + 16) ||
             !readCamera(0x30, 16, values + 32) ||
             !readCamera(0x40, 16, values + 48) ||
             !readCamera(0x50, 1, values + 64)) {
    Serial.println("Camera data read failed");
  } else if (values[0] == -32768) {
    Serial.println("Target data unavailable");
  } else {
    Serial.print("Colors found: ");
    Serial.println(values[64]);
    for (uint8_t color = 1; color <= 16; ++color) {
      uint8_t offset = (color - 1) * 4;
      if (values[offset] == 0) continue;
      Serial.print("Color ");
      Serial.print(color);
      Serial.print(": ");
      for (uint8_t field = 0; field < 4; ++field) {
        Serial.print(values[offset + field]);
        Serial.print(' ');
      }
      Serial.println();
    }
  }
  delay(100);
}
```

### ✔ Troubleshooting

- No response: check firmware, shared ground, SDA/SCL, and address.
- Reading -32768: check the mode at 0x01 before looking up the field.

### ✔ Write commands

| Bytes to send | Purpose |
| --- | --- |
| 0xE0, mode, submode | Select and save a mode. For Object Details, send 0xE0, 5, 2. |
| 0xE1, point, X, Y | Save a sample location. Accepts points 1 ~ 20, X = 0 ~ 159, Y = 0 ~ 119. Readout provides 16 points. |
| 0xF8, new address, bitwise complement | Change the I²C address. |
| 0xEF, 0xA5 | Reboot. |

Teach target colors on the camera.

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
