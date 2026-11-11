# 使用教學

## 01 / 環境準備

使用通用 I²C 韌體的神攝手和 Arduino IDE。預設 7 位元位址為 0x4C。

::: warning 接線前先確認
v1 的讀值格式已確認，Arduino 實機驗證尚未完成。相機端 SDA＝IO3、SCL＝IO1 仍為暫定。請斷電後接線，並核對相機版本、主板邏輯電位及上拉是否相容。
:::

| 相機 | Arduino UNO／Nano | UNO R4／ESP32 等 |
| --- | --- | --- |
| 5V | 5V | 依板子及相機供電規格確認 5V |
| GND | GND | GND |
| SDA | A4 | 主板 SDA |
| SCL | A5 | 主板 SCL |

## 02 / 函數與功能說明

### ✔ 讀取流程

1. 向 0x4C 寫入 1 byte 的欄位編號並結束傳輸。
2. 等 2 ms，再讀 2×k bytes，一次最多 16 個值。
3. 每兩個 byte 是一個有號 int16，低位在前。−32768 表示目前模式沒有該欄位。

| 欄位 | 內容 |
| --- | --- |
| 0x01–0x04 | 相機模式、子選項、已教色數、輸出項數。 |
| 0xF0–0xF5 | 裝置 ID（0x034C）、協議版（2）、韌體版、狀態旗標、更新序號、開機秒數。 |

### ✔ 相機模式資料（從 0x10 起）

| 模式 | 欄位順序 |
| --- | --- |
| 11 | 16 色：X、Y |
| 12 | 16 色：X、Y、數量 |
| 13 | 16 色：X、Y、面積 %、數量 |
| 14 | 16 色：X、Y、寬、高、數量、面積 % |
| 21 | 16 點：H |
| 22 | 16 點：H、S |
| 23 | 16 點：H、S、V |
| 30 | 0x10–0x1F：左起 16 塊色相，0x20：總塊數 |
| 41–43 | 近／中／遠偏移、角度、近線寬、旗標、路口、路口距離、左緣、右緣、遠線寬、標記色號、標記累計、離線方向 |
| 51 | 8 個物體：色號、形狀、X、Y。總數在 0x30。 |
| 52 | 8 個物體：色號、形狀、X、Y、寬、高、面積 %、角度、頂點數、追蹤編號。總數在 0x60。 |

第 i 筆從 0x10＋每筆欄位數×(i−1) 開始。例：模式 13 的色 2 從 0x14 開始。座標為像素，Y 向下增加；X=0 表示未偵測。色相 0 可以是紅色，色序用總塊數判斷。物體由大到小排列，位置是質心，0xF3 的 bit 1 表示有物體。

### ✔ 寫入命令

| 傳送 bytes | 用途 |
| --- | --- |
| 0xE0, 模式, 子選項 | 切換並保存模式。例如 0xE0, 5, 2 選物體詳細。 |
| 0xE1, 點號, X, Y | 保存取樣位置。接受點號 1–20，X=0–159、Y=0–119。讀值提供 16 點。 |
| 0xF8, 新位址, 新位址逐位元取反 | 更換 I²C 位址。 |
| 0xEF, 0xA5 | 重新開機。 |

目標色在相機上教。

## 03 / 範例程式

在相機選模式 13（顏色追蹤 ③ 標準）並教色 1。序列監控設 115200 baud，輸出為 X、Y、面積 %、數量。讀物體詳細時改用模式 52，先讀 0x60 的物體數，再從 0x10 起每次讀 10 個值。

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

## 04 / 常見問題

- 沒有回應：確認韌體、共地、SDA／SCL、位址。
- 讀到 −32768：先確認 0x01 的模式，再查欄位表。

## 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />
