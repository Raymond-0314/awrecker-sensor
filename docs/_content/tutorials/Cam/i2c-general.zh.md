# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | Arduino UNO / Nano / UNO R4 / ESP32 |
| 感應器 | MBC 神攝手視覺感應器 (通用 I²C 版) |
| 程式語言 | Arduino IDE (C++) |

### ✔ 事前準備

1. 啟動你的開發板與 Arduino IDE。
2. 確認主機、相機與程式環境運作正常。
3. 設定感應器模式，確認與程式設定模式相同。

::: warning ⚠️ 接線前先確認
v1 的資料格式已定案，Arduino 實機驗證尚未完成。相機端 SDA＝IO3、SCL＝IO1 仍為暫定。請核對實際版本與邏輯電位後接線。
:::

| 相機 | UNO / Nano | UNO R4 / ESP32 |
| --- | --- | --- |
| 5V | 5V | 確認合適的 5V 電源 |
| GND | GND | GND |
| SDA | A4 | 主板 SDA |
| SCL | A5 | 主板 SCL |

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
使用通用 I²C 韌體，預設位址 0x4C。下表的 values 索引對應範例 readCamera() 回傳的 int16 陣列；0x10 是第一筆資料的起始欄位。切換模式使用 E0 命令，取色點位置使用 E1 命令。
:::

<CamModeAccordion>

### ✔ 相機模式概覽

MBC 神攝手視覺感應器共有 5 大主模式，各主模式下還有細分多個子模式，請參考下表說明與 modeID 編號，查找程式說明。

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

最多讀取 16 色的位置。

| I²C 讀值 | 回傳值 |
| --- | --- |
| `values[0]` (0x10) | X1 |
| `values[1]` (0x11) | Y1 |
| `foundColors` (0x30, 另讀) | 找到色數 |

表格列出第 1 筆。共 16 筆，第 i 筆起始欄位＝0x10＋2×(i−1)。

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

座標使用 160×120 像素，Y 向下增加，X＝0 表示未找到。

先用 `readCamera(0x10, 2, values)` 讀取表格中的一筆資料，再依 values 索引取值。

先宣告 `int16_t foundColors;`，再以 `readCamera(0x30, 1, &foundColors)` 另行讀取。

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

最多讀取 16 色的位置，另可讀取數量。

| I²C 讀值 | 回傳值 |
| --- | --- |
| `values[0]` (0x10) | X1 |
| `values[1]` (0x11) | Y1 |
| `values[2]` (0x12) | Count1 |
| `foundColors` (0x40, 另讀) | 找到色數 |

表格列出第 1 筆。共 16 筆，第 i 筆起始欄位＝0x10＋3×(i−1)。

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

座標使用 160×120 像素，Y 向下增加，X＝0 表示未找到。

先用 `readCamera(0x10, 3, values)` 讀取表格中的一筆資料，再依 values 索引取值。

先宣告 `int16_t foundColors;`，再以 `readCamera(0x40, 1, &foundColors)` 另行讀取。

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

最多讀取 16 色的位置，另可讀取數量與面積。

| I²C 讀值 | 回傳值 |
| --- | --- |
| `values[0]` (0x10) | X1 |
| `values[1]` (0x11) | Y1 |
| `values[2]` (0x12) | Area1 |
| `values[3]` (0x13) | Count1 |
| `foundColors` (0x50, 另讀) | 找到色數 |

表格列出第 1 筆。共 16 筆，第 i 筆起始欄位＝0x10＋4×(i−1)。

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

座標使用 160×120 像素，Y 向下增加，X＝0 表示未找到。

先用 `readCamera(0x10, 4, values)` 讀取表格中的一筆資料，再依 values 索引取值。

先宣告 `int16_t foundColors;`，再以 `readCamera(0x50, 1, &foundColors)` 另行讀取。

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

最多讀取 16 色的位置與寬高，另可讀取數量與面積。

| I²C 讀值 | 回傳值 |
| --- | --- |
| `values[0]` (0x10) | X1 |
| `values[1]` (0x11) | Y1 |
| `values[2]` (0x12) | W1 |
| `values[3]` (0x13) | H1 |
| `values[4]` (0x14) | Count1 |
| `values[5]` (0x15) | Area1 |
| `foundColors` (0x70, 另讀) | 找到色數 |

表格列出第 1 筆。共 16 筆，第 i 筆起始欄位＝0x10＋6×(i−1)。

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

座標使用 160×120 像素，Y 向下增加，X＝0 表示未找到。

先用 `readCamera(0x10, 6, values)` 讀取表格中的一筆資料，再依 values 索引取值。

先宣告 `int16_t foundColors;`，再以 `readCamera(0x70, 1, &foundColors)` 另行讀取。

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

最多讀取 16 個取樣點的色相，精度依下方欄位格式。

| I²C 讀值 | 回傳值 |
| --- | --- |
| `values[0]` (0x10) | Hue1 |

表格列出第 1 筆。共 16 筆，第 i 筆起始欄位＝0x10＋1×(i−1)。

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

先用 `readCamera(0x10, 1, values)` 讀取表格中的一筆資料，再依 values 索引取值。

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相＋飽和">

最多讀取 16 個取樣點的色相與飽和，精度依下方欄位格式。

| I²C 讀值 | 回傳值 |
| --- | --- |
| `values[0]` (0x10) | Hue1 |
| `values[1]` (0x11) | Sat1 |

表格列出第 1 筆。共 16 筆，第 i 筆起始欄位＝0x10＋2×(i−1)。

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

先用 `readCamera(0x10, 2, values)` 讀取表格中的一筆資料，再依 values 索引取值。

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相＋飽和＋明度">

最多讀取 16 個取樣點的色相、飽和與明度，精度依下方欄位格式。

| I²C 讀值 | 回傳值 |
| --- | --- |
| `values[0]` (0x10) | Hue1 |
| `values[1]` (0x11) | Sat1 |
| `values[2]` (0x12) | Val1 |

表格列出第 1 筆。共 16 筆，第 i 筆起始欄位＝0x10＋3×(i−1)。

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

先用 `readCamera(0x10, 3, values)` 讀取表格中的一筆資料，再依 values 索引取值。

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

讀取由左至右前 16 塊色相與總塊數。

| I²C 讀值 | 回傳值 |
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
| 另讀 0x20 | Total |

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

色相 0 可以代表紅色，請以總塊數判斷前幾格有效。

先用 `readCamera(0x10, 16, values)` 讀取表格中的一筆資料，再依 values 索引取值。

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

提供近、中、遠偏移、路口、標記線等 14 個循線值。

| I²C 讀值 | 回傳值 |
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

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

先用 `readCamera(0x10, 14, values)` 讀取表格中的一筆資料，再依 values 索引取值。

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

提供近、中、遠偏移、路口、標記線等 14 個循線值。

| I²C 讀值 | 回傳值 |
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

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

先用 `readCamera(0x10, 14, values)` 讀取表格中的一筆資料，再依 values 索引取值。

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

提供近、中、遠偏移、路口、標記線等 14 個循線值。

| I²C 讀值 | 回傳值 |
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

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

先用 `readCamera(0x10, 14, values)` 讀取表格中的一筆資料，再依 values 索引取值。

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

讀取前 8 個物體的代碼與位置，另可讀物體總數。

| I²C 讀值 | 回傳值 |
| --- | --- |
| `values[0]` (0x10) | Color1 |
| `values[1]` (0x11) | Shape1 |
| `values[2]` (0x12) | X1 |
| `values[3]` (0x13) | Y1 |
| 另讀 0x30 | Total |

表格列出第 1 筆。共 8 筆，第 i 筆起始欄位＝0x10＋4×(i−1)。

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

座標使用 160×120 像素，Y 向下增加，X＝0 表示未找到。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

先用 `readCamera(0x10, 4, values)` 讀取表格中的一筆資料，再依 values 索引取值。

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

讀取前 8 個物體的詳細資料，欄位如下。

| I²C 讀值 | 回傳值 |
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
| 另讀 0x60 | Total |

表格列出第 1 筆。共 8 筆，第 i 筆起始欄位＝0x10＋10×(i−1)。

先寫起始欄位，等 2 ms，再讀低位在前的 int16，一次最多 16 個值。−32768 表示目前模式沒有該欄位。

座標使用 160×120 像素，Y 向下增加，X＝0 表示未找到。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

先用 `readCamera(0x10, 10, values)` 讀取表格中的一筆資料，再依 values 索引取值。

</CamModeSection>

</CamModeAccordion>

## 03 / 範例程式

先在相機教目標色 1。程式在 setup() 傳送 E0 [1, 3]，選擇 modeID 13 (顏色追蹤 - ③ 標準)。序列監控設 115200 baud，輸出依序為 X、Y、面積 %、數量。

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

### ✔ 常見問題

- 沒有回應：確認韌體、共地、SDA／SCL、位址。
- 讀到 −32768：先確認 0x01 的模式，再查欄位表。

### ✔ 寫入命令

| 傳送 bytes | 用途 |
| --- | --- |
| 0xE0, 模式, 子選項 | 切換並保存模式。例如 0xE0, 5, 2 選物體詳細。 |
| 0xE1, 點號, X, Y | 保存取樣位置。接受點號 1–20，X=0–159、Y=0–119。讀值提供 16 點。 |
| 0xF8, 新位址, 新位址逐位元取反 | 更換 I²C 位址。 |
| 0xEF, 0xA5 | 重新開機。 |

目標色在相機上教。

## 04 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
