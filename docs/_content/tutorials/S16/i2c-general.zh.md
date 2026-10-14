
# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • Arduino<br>• ESP32<br>• 樹莓派<br>• 各式自主開發主控板 (支援標準 I2C 通訊介面即可) |
| 感應器 | • MBC 8 路巡跡板 |
| 程式語言 | • 各式自主開發主控板所屬程式語言 |

### ✔ 事前準備

1. 啟動你的機器人。
2. 確認一切運作正常。
3. MBC 8 路巡跡板的場地光值校正。

## 02 / MBC I2C 通用協議使用須知

### ✔ 接線與電壓
- 依感應器排針標示接 SCL、SDA、VCC、GND。
- 支援 100 kHz 與 400 kHz。
- 可直接接 5V 控制器 (Arduino UNO 等)，不需要另外加準位轉換。

### ✔ 讀取資料 (資料流：模組 → 主機)
1. 主機向模組寫入 1 byte 資料：要讀的暫存器編號。
2. 主機 `requestFrom(位址, n)`，n = 1~32。
3. 模組固定準備 32 bytes 資料。
    - 有效資料在前、其餘補 0。
    - 主機視需求讀取任意長度資料，多讀僅會獲取 0 的數值，不會卡住匯流排。
    - 多位元組數值一律高位元組在前 (MSB-first) ，有號數為二補數。
    - 未定義的暫存器讀回全 0。

### ✔ 寫入命令 (資料流：主機 → 模組)
- 僅標示 寫入 或 讀取/寫入 的暫存器可以寫入命令。
- 格式：`[暫存器編號, 值0, 值1, ...]`。
- 多位元組數值一律高位元組在前。
- 長度不足則整筆忽略，多出來的 bytes 丟棄。
::: warning ⚠️ 注意
若命令為非同步執行的功能 (例如校準、寫入 EEPROM)，請在寫入後透過狀態旗標或計數器確認已正確寫入，勿假設命令執行後會自動正確寫入。
:::

### ✔ 暫存器分區
| 暫存器範圍 | 說明 |
| --- | --- |
| `0x01` ~ `0x0F` | • 裝置資訊 (所有產品共通)。 |
| `0x10` ~ `0x1F` | • 第 1 組：主要資料。 |
| `0x20` ~ `0x2F` | • 第 2 組：次要資料/校準。 |
| `0x30` ~ `0x3F` | • 第 3 組：系統與狀態。 |
| `0x40` 以上 | • 產品擴充區：陣列、各通道、各埠。 |

::: info ℹ️ 補充資訊
各分組暫存器規則：
- `0xN0`：該組的命令暫存器 (寫入用)。
- `0xN1`：一次讀取該組自`0xN2`起的所有資料。
- `0xN2` 起：各單項功能。
:::

### ✔ 共通暫存器 (各產品皆相同)
| 暫存器 | 讀寫方向 | 長度 | 說明 |
| --- | --- | --- | --- |
| `0x01` | 讀取 | 17 bytes | • 一次讀取 `0x02` ~ `0x07` 的資料。 |
| `0x02` | 讀取 | 1 byte | • 裝置 ID (該產品出廠位址)。<br>• 可用於辨識產品。 |
| `0x03` | 讀取 | 1 byte | • I2C 協議版本 |
| `0x04` | 讀取 | 2 bytes | • 韌體版本 (主, 次)。 |
| `0x05` | 讀取 | 3 bytes | • 韌體編譯日期 (年份末兩位, 月, 日)。 |
| `0x06` | 讀取 | 2 bytes | • 硬體與款式。 |
| `0x07` | 讀取 | 8 bytes | • 型號字串 (ASCII，不足補 0)。 |
| `0x30` | 寫入 | 1 byte | • 系統命令。<br>• `0x01`表示重新開機 |
| `0x31` | 讀取 | 9 bytes | • 一次讀取 `0x32` ~ `0x07` 的資料。 |
| `0x32` | 讀取 | 1 byte | • 狀態旗標。<br>• bit 0 表示準備就緒，bit 1~7 根據各產品定義有不同內容。 |
| `0x33` | 讀取 | 1 byte | • 更新序號。<br>• 每次資料更新則數值 +1 (數字未更動表示模組忙碌中)。 |
| `0x34` ~ `0x36` | 讀取 | 1 byte | • 依照各產品定義有不同內容。 |
| `0x37` | 讀取 | 4 bytes | • 開機經過時間 (ms)。<br>• 數值變小表示模組曾重新開機。 |

::: info ℹ️ 補充資訊
建議流程：
1. 開機後先讀取暫存器 `0x01` 確認產品狀態。
2. 讀取 `0x32`，等到其中的 bit 0 = 1，表示模組準備就緒。
3. 開始讀取其餘資料。
:::


## 03 / 功能說明

### ✔ 基本資訊
| 項目 | 說明 |
| --- | --- |
| I2C 位址 | `0x16` |
| 型號字串 `0x07` | `LINE8` |
| 款式 `0x06` | `[8, PCB 版次]` (第 1 byte 表示感應器通道數) |
| 通道順序 | 右至左為 CH0 ~ CH7 |
| 線位置方向 | • 0 表示線在正中央。<br>• 負數表示線偏右。<br>• 正數表示線偏左。 |

### ✔ 循線結果
| 暫存器 | 讀寫方向 | 長度 | 說明 |
| --- | --- | --- | --- |
| `0x10` | 寫入 | 1 byte | • 設定循線目標。<br>• 0 表示黑線，1 表示白線。<br>• 重開機後回到按鈕設定。 |
| `0x11` | 讀取 | 7 bytes | • 一次讀取 `0x12` ~ `0x17` 的數據。 |
| `0x12` | 讀取 | 1 byte | `int8` `-8 ~ +8`<br>• 線位置。 |
| `0x13` | 讀取 | 1 byte | `int8` `-100 ~ +100`<br>• 高解析度線位置。 |
| `0x14` | 讀取 | 1 byte | • 線寬 (同時偵測到黑線的光電數量)。 |
| `0x15` | 讀取 | 1 byte | • 線群組數。<br>• 0 表示丟線，1 表示單線，2 以上表示分岔或十字路口。 |
| `0x16` | 讀取 | 2 bytes | `uint16`<br>• 光電光值二值化：根據原始數值分類光電「在線上」與「不在線上」兩種狀態。<br>• bit i 表示編號 i 的光電是否在線上。 |
| `0x17` | 讀取 | 1 byte | `int8`<br>• 最後離開線方向。<br>• 可用於丟線的判斷與修正回線。 |

### ✔ 校準
| 暫存器 | 讀寫方向 | 長度 | 說明 |
| --- | --- | --- | --- |
| `0x20` | 寫入 | 1 byte | • 設定校準模式。<br>• 1 表示進行 5 秒動態校準，2 表示目前讀值記為白，3 表示目前讀值記為黑。<br>• 結果存入 EEPROM。 |
| `0x21` | 讀取 | 2 bytes | • 一次讀取 `0x22` ~ `0x23` 的數據。 |
| `0x22` | 讀取/寫入 | 1 byte | `1 ~ 99`<br>• `0x16` 判斷閾值的讀取/設定。<br>• 預設為 50，重開機將回到預設狀態。 <br>• 舉例：閥值設定為 30，表示光電光值小於 30 時將被判斷為「在線上」，大於 30 時將被判斷為「不在線上」。 |
| `0x23` | 讀取 | 1 byte | • 校準完成次數 (每完成一次 +1)。<br>• 可用於確認校準流程是否執行完成。 |

### ✔ 狀態旗標 `0x32`
| 位元 | 說明 |
| --- |--- |
| bit 0 | • 感應器準備就緒。 |
| bit 1 | • 0 表示為黑線模式，1 表示白線模式。 |
| bit 2 | • 表示正在校準中。<br>• 5 秒校準期間，更新序號 `0x33` 將會停住，此為正常狀況。 |
| bit 3 | • 丟線。 |
| bit 4 | • 遇到路口分岔，群組數 ≥ 2。 |

### ✔ 各通道數值
| 暫存器 | 讀寫方向 | 長度 | 說明 |
| --- | --- | --- | --- |
| `0x40` | 讀取 | 1 byte | `0 ~ 100`<br>• 1 號通道光電校準後數值。 |
| `0x41` | 讀取 | 1 byte | `0 ~ 100`<br>• 2 號通道光電校準後數值。 |
| `0x42` | 讀取 | 1 byte | `0 ~ 100`<br>• 3 號通道光電校準後數值。 |
| `0x43` | 讀取 | 1 byte | `0 ~ 100`<br>• 4 號通道光電校準後數值。 |
| `0x44` | 讀取 | 1 byte | `0 ~ 100`<br>• 5 號通道光電校準後數值。 |
| `0x45` | 讀取 | 1 byte | `0 ~ 100`<br>• 6 號通道光電校準後數值。 |
| `0x46` | 讀取 | 1 byte | `0 ~ 100`<br>• 7 號通道光電校準後數值。 |
| `0x47` | 讀取 | 1 byte | `0 ~ 100`<br>• 8 號通道光電校準後數值。 |
| `0x50` | 讀取 | 8 bytes | • 一次讀取 `0x40` ~ `0x47` 的數據。 |
| `0x51` | 讀取 | 8 bytes | • 白色參考值 (EEPROM )。 |
| `0x52` | 讀取 | 8 bytes | • 黑色參考值 (EEPROM )。 |
| `0x53` | 讀取 | 8 bytes | `8-bit`<br>• 原始 ADC 值。 |


## 04 / Arduino 範例程式
### ✔ 讀取模組資料

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
  iicWrite(LINE_ADDR, 0x10, 0);     // 0 = 循黑線、1 = 循白線
}

void loop() {
  uint8_t d[7];
  if (iicRead(LINE_ADDR, 0x11, d, 7)) {
    int8_t   pos    = (int8_t)d[0];        // -8 ~ +8
    int8_t   posHi  = (int8_t)d[1];        // -100 ~ +100，PID 用這個
    uint8_t  width  = d[2];                // 線寬
    uint8_t  groups = d[3];                // 0 丟線 / 1 單線 / 2+ 分岔
    uint16_t bin    = (d[4] << 8) | d[5];  // 每個 bit 一個通道

    Serial.print("位置 ");     Serial.print(pos);
    Serial.print("  高解析 "); Serial.print(posHi);
    Serial.print("  線寬 ");   Serial.print(width);
    Serial.print("  群組 ");   Serial.print(groups);
    Serial.print("  二值 ");   Serial.println(bin, BIN);
  }
  delay(10);
}
```


### ✔ PID 循線的起點
```c++
// posHi：負 = 線在右、正 = 線在左。線在右邊時要右轉 → 左輪加速、右輪減速
float Kp = 0.6;
int base = 120;                        // 基本速度（依你的馬達驅動調整）
int turn = Kp * posHi;
int leftSpeed  = base - turn;
int rightSpeed = base + turn;
```

### ✔ 用程式觸發校準
```c++
uint8_t before[2], after[2];
iicRead(LINE_ADDR, 0x21, before, 2);   // [閾值, 校準完成次數]
iicWrite(LINE_ADDR, 0x20, 1);          // 開始 5 秒動態校準：這段時間左右移動車體掃過黑線
do {
  delay(200);
  iicRead(LINE_ADDR, 0x21, after, 2);
} while (after[1] == before[1]);       // 次數 +1 = 校準完成
```

## 05 / 【Lego】 Lau Xiao 示範影片

<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin: 24px auto;">

  <iframe
    src="https://www.youtube.com/embed/WgacdWLatbk"
    title="MBC S8 示範影片 1"
    style="width: 315px; max-width: 100%; aspect-ratio: 9 / 16; border: none; border-radius: 12px; display: block;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

  <iframe
    src="https://www.youtube.com/embed/Y2evkfTkOO4"
    title="MBC S8 示範影片 2"
    style="width: 315px; max-width: 100%; aspect-ratio: 9 / 16; border: none; border-radius: 12px; display: block;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

</div>

[回首頁選擇其他教學](/)
