# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | LEGO® Education SPIKE™ Prime Set<br>LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | MBC 神攝手視覺感應器 (SPIKE 版) |
| 程式語言 | Pybricks Python |

### ✔ 事前準備

::: warning ⚠️ 注意
MBC 神攝手視覺感應器在 Pybricks 上分成 `基礎控制`{.code-blue} 與 `進階控制`{.code-blue} 兩種使用方法：

- `基礎控制`{.code-blue}：透過原生感應器介面讀值，並在程式內解碼，不需外加函式庫。
- `進階控制`{.code-blue}：功能廣泛，需要額外匯入 `MBC 神攝手視覺感應器 Pybricks - SPIKE 函式庫`{.code-blue-text}。

請根據你的需求決定是否下載函式庫：

<DownloadButton href="/programs/Cam/spike-pybricks/MBC_UniCam.py" download="MBC_UniCam.py" label="v4.1 函式庫" />

:::


1. 啟動你的機器人與 Pybricks Python。
2. 確認主機已安裝 Pybricks 韌體，且相機與主機連線正常。
3. 設定感應器模式，確認與程式設定模式相同。

## 02 / 基礎控制-前置作業與函數功能說明

### ✔ 數值解碼函數設定

1. 開啟你的 Pybricks 程式，輸入相機設定程式碼，如下。其餘底盤與馬達感應器初始化程式碼則接續放置。
2. 匯入 `PUPDevice` 與 `Port`，建立 `cam = PUPDevice(Port.A)`，並將相機接到 A 埠。
3. 接下來設定數值解碼函數。`readCamera()` 負責讀取並拆出各 byte，`signedByte()` 負責循線有號數換算；兩者都是在本程式中定義的函數，不需外加函式庫。

```python
from pybricks.iodevices import PUPDevice
from pybricks.parameters import Port

cam = PUPDevice(Port.A)

def readCamera(mode=9):
    data = []
    for word in cam.read(mode):
        data.append(word & 255)
        data.append((word >> 8) & 255)
    return data

def signedByte(value):
    return value - 256 if value > 127 else value
```

### ✔ 函數功能說明

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam = PUPDevice(Port.A)`{.code-blue} | 相機設定 | `PUPDevice`<br>• 建立連接埠 A 的相機讀取物件，後續透過 `cam.read(mode)` 讀取原始資料。 |
| `readCamera()`{.code-blue} | 讀取模式資料 | `list[14]`<br>• 讀取通訊模式 9 的 7 個數值，依低位在前拆成 14 個 byte。各表格使用 `data = readCamera()` 取得資料。 |
| `signedByte(value)`{.code-blue} | 有號數解碼 | `-128 ~ 127`<br>• 讀取數值 > 127 時，回傳 讀取數值 - 256；其餘回傳原數值。 |

::: info ℹ️ 補充資訊
- 說明算式中的「 ÷ 」表示整數除法，「mod」表示取餘數；可執行的 Python 程式碼分別使用 `//` 與 `%`。每輪先將一筆資料存入 `data`，再拆解各欄位。
:::

<CamModeAccordion namespace="basic">

### ✔ 相機模式概覽

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

`原生介面可讀：14 色位置`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 位置碼使用 `16 × 12` 分格。讀取數值為 `0` 表示未找到，僅在非 0 時套用換算式；像素位置為分格中心。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `11`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 顏色 1 的位置 | `0 ~ 192`<br>• 顏色 1 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 1 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[1]`{.code-blue} | 顏色 2 的位置 | `0 ~ 192`<br>• 顏色 2 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 2 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[2]`{.code-blue} | 顏色 3 的位置 | `0 ~ 192`<br>• 顏色 3 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 3 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[3]`{.code-blue} | 顏色 4 的位置 | `0 ~ 192`<br>• 顏色 4 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 4 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[4]`{.code-blue} | 顏色 5 的位置 | `0 ~ 192`<br>• 顏色 5 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 5 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[5]`{.code-blue} | 顏色 6 的位置 | `0 ~ 192`<br>• 顏色 6 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 6 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[6]`{.code-blue} | 顏色 7 的位置 | `0 ~ 192`<br>• 顏色 7 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 7 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[7]`{.code-blue} | 顏色 8 的位置 | `0 ~ 192`<br>• 顏色 8 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 8 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[8]`{.code-blue} | 顏色 9 的位置 | `0 ~ 192`<br>• 顏色 9 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 9 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[9]`{.code-blue} | 顏色 10 的位置 | `0 ~ 192`<br>• 顏色 10 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 10 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[10]`{.code-blue} | 顏色 11 的位置 | `0 ~ 192`<br>• 顏色 11 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 11 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[11]`{.code-blue} | 顏色 12 的位置 | `0 ~ 192`<br>• 顏色 12 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 12 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[12]`{.code-blue} | 顏色 13 的位置 | `0 ~ 192`<br>• 顏色 13 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 13 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |
| `data[13]`{.code-blue} | 顏色 14 的位置 | `0 ~ 192`<br>• 顏色 14 的分格 X = (讀取數值 - 1) mod 16 + 1；分格 Y = (讀取數值 - 1) ÷ 16 + 1。<br>• 顏色 14 的像素 X = (分格 X - 1) × 10 + 5；像素 Y = (分格 Y - 1) × 10 + 5。 |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`原生介面可讀：7 色位置`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `12`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 顏色 1 的 X | `0 ~ 159`<br>• 顏色 1 的 X = 讀取數值。 |
| `data[1]`{.code-blue} | 顏色 1 的 Y | `0 ~ 119`<br>• 顏色 1 的 Y = 讀取數值。 |
| `data[2]`{.code-blue} | 顏色 2 的 X | `0 ~ 159`<br>• 顏色 2 的 X = 讀取數值。 |
| `data[3]`{.code-blue} | 顏色 2 的 Y | `0 ~ 119`<br>• 顏色 2 的 Y = 讀取數值。 |
| `data[4]`{.code-blue} | 顏色 3 的 X | `0 ~ 159`<br>• 顏色 3 的 X = 讀取數值。 |
| `data[5]`{.code-blue} | 顏色 3 的 Y | `0 ~ 119`<br>• 顏色 3 的 Y = 讀取數值。 |
| `data[6]`{.code-blue} | 顏色 4 的 X | `0 ~ 159`<br>• 顏色 4 的 X = 讀取數值。 |
| `data[7]`{.code-blue} | 顏色 4 的 Y | `0 ~ 119`<br>• 顏色 4 的 Y = 讀取數值。 |
| `data[8]`{.code-blue} | 顏色 5 的 X | `0 ~ 159`<br>• 顏色 5 的 X = 讀取數值。 |
| `data[9]`{.code-blue} | 顏色 5 的 Y | `0 ~ 119`<br>• 顏色 5 的 Y = 讀取數值。 |
| `data[10]`{.code-blue} | 顏色 6 的 X | `0 ~ 159`<br>• 顏色 6 的 X = 讀取數值。 |
| `data[11]`{.code-blue} | 顏色 6 的 Y | `0 ~ 119`<br>• 顏色 6 的 Y = 讀取數值。 |
| `data[12]`{.code-blue} | 顏色 7 的 X | `0 ~ 159`<br>• 顏色 7 的 X = 讀取數值。 |
| `data[13]`{.code-blue} | 顏色 7 的 Y | `0 ~ 119`<br>• 顏色 7 的 Y = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`原生介面可讀：4 色位置`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `13`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 顏色 1 的 X | `0 ~ 159`<br>• 顏色 1 的 X = 讀取數值。 |
| `data[1]`{.code-blue} | 顏色 1 的 Y | `0 ~ 119`<br>• 顏色 1 的 Y = 讀取數值。 |
| `data[2]`{.code-blue} | 顏色 1 的面積 | `0 ~ 100`<br>• 顏色 1 的面積 = 讀取數值。 |
| `data[3]`{.code-blue} | 顏色 2 的 X | `0 ~ 159`<br>• 顏色 2 的 X = 讀取數值。 |
| `data[4]`{.code-blue} | 顏色 2 的 Y | `0 ~ 119`<br>• 顏色 2 的 Y = 讀取數值。 |
| `data[5]`{.code-blue} | 顏色 2 的面積 | `0 ~ 100`<br>• 顏色 2 的面積 = 讀取數值。 |
| `data[6]`{.code-blue} | 顏色 3 的 X | `0 ~ 159`<br>• 顏色 3 的 X = 讀取數值。 |
| `data[7]`{.code-blue} | 顏色 3 的 Y | `0 ~ 119`<br>• 顏色 3 的 Y = 讀取數值。 |
| `data[8]`{.code-blue} | 顏色 3 的面積 | `0 ~ 100`<br>• 顏色 3 的面積 = 讀取數值。 |
| `data[9]`{.code-blue} | 顏色 4 的 X | `0 ~ 159`<br>• 顏色 4 的 X = 讀取數值。 |
| `data[10]`{.code-blue} | 顏色 4 的 Y | `0 ~ 119`<br>• 顏色 4 的 Y = 讀取數值。 |
| `data[11]`{.code-blue} | 顏色 4 的面積 | `0 ~ 100`<br>• 顏色 4 的面積 = 讀取數值。 |
| `data[12]`{.code-blue} | 顏色 1 的數量 | `0 ~ 255`<br>• 顏色 1 的數量 = 讀取數值 ÷ 16，範圍為 `0 ~ 15`{.code-green}。 |
| `data[12]`{.code-blue} | 顏色 2 的數量 | `0 ~ 255`<br>• 顏色 2 的數量 = 讀取數值 mod 16，範圍為 `0 ~ 15`{.code-green}。 |
| `data[13]`{.code-blue} | 顏色 3 的數量 | `0 ~ 255`<br>• 顏色 3 的數量 = 讀取數值 ÷ 16，範圍為 `0 ~ 15`{.code-green}。 |
| `data[13]`{.code-blue} | 顏色 4 的數量 | `0 ~ 255`<br>• 顏色 4 的數量 = 讀取數值 mod 16，範圍為 `0 ~ 15`{.code-green}。 |

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`原生介面可讀：2 色位置`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `14`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 顏色 1 的 X | `0 ~ 159`<br>• 顏色 1 的 X = 讀取數值。 |
| `data[1]`{.code-blue} | 顏色 1 的 Y | `0 ~ 119`<br>• 顏色 1 的 Y = 讀取數值。 |
| `data[2]`{.code-blue} | 顏色 1 的寬 | `0 ~ 160`<br>• 顏色 1 的寬 = 讀取數值。 |
| `data[3]`{.code-blue} | 顏色 1 的高 | `0 ~ 120`<br>• 顏色 1 的高 = 讀取數值。 |
| `data[4]`{.code-blue} | 顏色 1 的數量 | `0 ~ 15`<br>• 顏色 1 的數量 = 讀取數值。 |
| `data[5]`{.code-blue} | 顏色 1 的面積 | `0 ~ 100`<br>• 顏色 1 的面積 = 讀取數值。 |
| `data[6]`{.code-blue} | 顏色 2 的 X | `0 ~ 159`<br>• 顏色 2 的 X = 讀取數值。 |
| `data[7]`{.code-blue} | 顏色 2 的 Y | `0 ~ 119`<br>• 顏色 2 的 Y = 讀取數值。 |
| `data[8]`{.code-blue} | 顏色 2 的寬 | `0 ~ 160`<br>• 顏色 2 的寬 = 讀取數值。 |
| `data[9]`{.code-blue} | 顏色 2 的高 | `0 ~ 120`<br>• 顏色 2 的高 = 讀取數值。 |
| `data[10]`{.code-blue} | 顏色 2 的數量 | `0 ~ 15`<br>• 顏色 2 的數量 = 讀取數值。 |
| `data[11]`{.code-blue} | 顏色 2 的面積 | `0 ~ 100`<br>• 顏色 2 的面積 = 讀取數值。 |
| `data[12]`{.code-blue} | 找到顏色的色數 | `0 ~ 16`<br>• 找到顏色的色數 = 讀取數值。 |

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`原生介面可讀：14 個取樣點`

::: info ℹ️ 補充資訊
- 請先在相機設定取樣點位置。未設定的點回傳 0；色相 0 也可以代表紅色。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `21`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | S1 的色相 | `0 ~ 255`<br>• S1 的色相 = 讀取數值。 |
| `data[1]`{.code-blue} | S2 的色相 | `0 ~ 255`<br>• S2 的色相 = 讀取數值。 |
| `data[2]`{.code-blue} | S3 的色相 | `0 ~ 255`<br>• S3 的色相 = 讀取數值。 |
| `data[3]`{.code-blue} | S4 的色相 | `0 ~ 255`<br>• S4 的色相 = 讀取數值。 |
| `data[4]`{.code-blue} | S5 的色相 | `0 ~ 255`<br>• S5 的色相 = 讀取數值。 |
| `data[5]`{.code-blue} | S6 的色相 | `0 ~ 255`<br>• S6 的色相 = 讀取數值。 |
| `data[6]`{.code-blue} | S7 的色相 | `0 ~ 255`<br>• S7 的色相 = 讀取數值。 |
| `data[7]`{.code-blue} | S8 的色相 | `0 ~ 255`<br>• S8 的色相 = 讀取數值。 |
| `data[8]`{.code-blue} | S9 的色相 | `0 ~ 255`<br>• S9 的色相 = 讀取數值。 |
| `data[9]`{.code-blue} | S10 的色相 | `0 ~ 255`<br>• S10 的色相 = 讀取數值。 |
| `data[10]`{.code-blue} | S11 的色相 | `0 ~ 255`<br>• S11 的色相 = 讀取數值。 |
| `data[11]`{.code-blue} | S12 的色相 | `0 ~ 255`<br>• S12 的色相 = 讀取數值。 |
| `data[12]`{.code-blue} | S13 的色相 | `0 ~ 255`<br>• S13 的色相 = 讀取數值。 |
| `data[13]`{.code-blue} | S14 的色相 | `0 ~ 255`<br>• S14 的色相 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相 + 飽和">

`原生介面可讀：7 個取樣點`

::: info ℹ️ 補充資訊
- 請先在相機設定取樣點位置。未設定的點回傳 0；色相 0 也可以代表紅色。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `22`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | S1 的色相 | `0 ~ 255`<br>• S1 的色相 = 讀取數值。 |
| `data[1]`{.code-blue} | S1 的飽和度 | `0 ~ 100`<br>• S1 的飽和度 = 讀取數值。 |
| `data[2]`{.code-blue} | S2 的色相 | `0 ~ 255`<br>• S2 的色相 = 讀取數值。 |
| `data[3]`{.code-blue} | S2 的飽和度 | `0 ~ 100`<br>• S2 的飽和度 = 讀取數值。 |
| `data[4]`{.code-blue} | S3 的色相 | `0 ~ 255`<br>• S3 的色相 = 讀取數值。 |
| `data[5]`{.code-blue} | S3 的飽和度 | `0 ~ 100`<br>• S3 的飽和度 = 讀取數值。 |
| `data[6]`{.code-blue} | S4 的色相 | `0 ~ 255`<br>• S4 的色相 = 讀取數值。 |
| `data[7]`{.code-blue} | S4 的飽和度 | `0 ~ 100`<br>• S4 的飽和度 = 讀取數值。 |
| `data[8]`{.code-blue} | S5 的色相 | `0 ~ 255`<br>• S5 的色相 = 讀取數值。 |
| `data[9]`{.code-blue} | S5 的飽和度 | `0 ~ 100`<br>• S5 的飽和度 = 讀取數值。 |
| `data[10]`{.code-blue} | S6 的色相 | `0 ~ 255`<br>• S6 的色相 = 讀取數值。 |
| `data[11]`{.code-blue} | S6 的飽和度 | `0 ~ 100`<br>• S6 的飽和度 = 讀取數值。 |
| `data[12]`{.code-blue} | S7 的色相 | `0 ~ 255`<br>• S7 的色相 = 讀取數值。 |
| `data[13]`{.code-blue} | S7 的飽和度 | `0 ~ 100`<br>• S7 的飽和度 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相 + 飽和 + 明度">

`原生介面可讀：4 個取樣點`

::: info ℹ️ 補充資訊
- 請先在相機設定取樣點位置。未設定的點回傳 0；色相 0 也可以代表紅色。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `23`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | S1 的色相 | `0 ~ 255`<br>• S1 的色相 = 讀取數值。 |
| `data[1]`{.code-blue} | S1 的飽和度 | `0 ~ 100`<br>• S1 的飽和度 = 讀取數值。 |
| `data[2]`{.code-blue} | S1 的明度 | `0 ~ 100`<br>• S1 的明度 = 讀取數值。 |
| `data[3]`{.code-blue} | S2 的色相 | `0 ~ 255`<br>• S2 的色相 = 讀取數值。 |
| `data[4]`{.code-blue} | S2 的飽和度 | `0 ~ 100`<br>• S2 的飽和度 = 讀取數值。 |
| `data[5]`{.code-blue} | S2 的明度 | `0 ~ 100`<br>• S2 的明度 = 讀取數值。 |
| `data[6]`{.code-blue} | S3 的色相 | `0 ~ 255`<br>• S3 的色相 = 讀取數值。 |
| `data[7]`{.code-blue} | S3 的飽和度 | `0 ~ 100`<br>• S3 的飽和度 = 讀取數值。 |
| `data[8]`{.code-blue} | S3 的明度 | `0 ~ 100`<br>• S3 的明度 = 讀取數值。 |
| `data[9]`{.code-blue} | S4 的色相 | `0 ~ 255`<br>• S4 的色相 = 讀取數值。 |
| `data[10]`{.code-blue} | S4 的飽和度 | `0 ~ 100`<br>• S4 的飽和度 = 讀取數值。 |
| `data[11]`{.code-blue} | S4 的明度 | `0 ~ 100`<br>• S4 的明度 = 讀取數值。 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

`原生介面可讀：13 塊色序`

::: info ℹ️ 補充資訊
- 色塊由左至右排序，依總塊數判斷有效資料，最多提供 13 塊的色相；色相 0 可以是紅色。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `30`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 色塊 1 的色相 | `0 ~ 255`<br>• 色塊 1 的色相 = 讀取數值。 |
| `data[1]`{.code-blue} | 色塊 2 的色相 | `0 ~ 255`<br>• 色塊 2 的色相 = 讀取數值。 |
| `data[2]`{.code-blue} | 色塊 3 的色相 | `0 ~ 255`<br>• 色塊 3 的色相 = 讀取數值。 |
| `data[3]`{.code-blue} | 色塊 4 的色相 | `0 ~ 255`<br>• 色塊 4 的色相 = 讀取數值。 |
| `data[4]`{.code-blue} | 色塊 5 的色相 | `0 ~ 255`<br>• 色塊 5 的色相 = 讀取數值。 |
| `data[5]`{.code-blue} | 色塊 6 的色相 | `0 ~ 255`<br>• 色塊 6 的色相 = 讀取數值。 |
| `data[6]`{.code-blue} | 色塊 7 的色相 | `0 ~ 255`<br>• 色塊 7 的色相 = 讀取數值。 |
| `data[7]`{.code-blue} | 色塊 8 的色相 | `0 ~ 255`<br>• 色塊 8 的色相 = 讀取數值。 |
| `data[8]`{.code-blue} | 色塊 9 的色相 | `0 ~ 255`<br>• 色塊 9 的色相 = 讀取數值。 |
| `data[9]`{.code-blue} | 色塊 10 的色相 | `0 ~ 255`<br>• 色塊 10 的色相 = 讀取數值。 |
| `data[10]`{.code-blue} | 色塊 11 的色相 | `0 ~ 255`<br>• 色塊 11 的色相 = 讀取數值。 |
| `data[11]`{.code-blue} | 色塊 12 的色相 | `0 ~ 255`<br>• 色塊 12 的色相 = 讀取數值。 |
| `data[12]`{.code-blue} | 色塊 13 的色相 | `0 ~ 255`<br>• 色塊 13 的色相 = 讀取數值。 |
| `data[13]`{.code-blue} | 總塊數 | `0 ~ 18`<br>• 總塊數 = 讀取數值。 |

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

`原生介面可讀：循線位置、路口與標記資料`

::: info ℹ️ 補充資訊
- 偏移、角度與左右緣使用 `signedByte()` 解碼；偏移負數在左、正數在右。
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。最後離線方向：0 = 有線、1 = 左、2 = 右。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `41`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 近處偏移 | `0 ~ 255`<br>• 近處偏移 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[1]`{.code-blue} | 中段偏移 | `0 ~ 255`<br>• 中段偏移 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[2]`{.code-blue} | 遠處偏移 | `0 ~ 255`<br>• 遠處偏移 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[3]`{.code-blue} | 角度 | `0 ~ 255`<br>• 角度 = signedByte(讀取數值)。<br>• 解碼後範圍：`-90 ~ 90`{.code-green}。 |
| `data[4]`{.code-blue} | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| `data[5]`{.code-blue} | 有線旗標 | `0 ~ 7`<br>• 有線旗標 = 讀取數值。 |
| `data[6]`{.code-blue} | 路口類型 | `0 ~ 5`<br>• 路口類型 = 讀取數值。 |
| `data[7]`{.code-blue} | 路口距離 | `0 ~ 100`<br>• 路口距離 = 讀取數值。 |
| `data[8]`{.code-blue} | 左緣 | `0 ~ 255`<br>• 左緣 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[9]`{.code-blue} | 右緣 | `0 ~ 255`<br>• 右緣 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[10]`{.code-blue} | 遠處線寬 | `0 ~ 100`<br>• 遠處線寬 = 讀取數值。 |
| `data[11]`{.code-blue} | 標記色號 | `0 ~ 8`<br>• 標記色號 = 讀取數值。 |
| `data[12]`{.code-blue} | 標記累計 | `0 ~ 99`<br>• 標記累計 = 讀取數值。 |
| `data[13]`{.code-blue} | 最後離線方向 | `0 ~ 2`<br>• 最後離線方向 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

`原生介面可讀：循線位置、路口與標記資料`

::: info ℹ️ 補充資訊
- 偏移、角度與左右緣使用 `signedByte()` 解碼；偏移負數在左、正數在右。
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。最後離線方向：0 = 有線、1 = 左、2 = 右。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `42`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 近處偏移 | `0 ~ 255`<br>• 近處偏移 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[1]`{.code-blue} | 中段偏移 | `0 ~ 255`<br>• 中段偏移 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[2]`{.code-blue} | 遠處偏移 | `0 ~ 255`<br>• 遠處偏移 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[3]`{.code-blue} | 角度 | `0 ~ 255`<br>• 角度 = signedByte(讀取數值)。<br>• 解碼後範圍：`-90 ~ 90`{.code-green}。 |
| `data[4]`{.code-blue} | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| `data[5]`{.code-blue} | 有線旗標 | `0 ~ 7`<br>• 有線旗標 = 讀取數值。 |
| `data[6]`{.code-blue} | 路口類型 | `0 ~ 5`<br>• 路口類型 = 讀取數值。 |
| `data[7]`{.code-blue} | 路口距離 | `0 ~ 100`<br>• 路口距離 = 讀取數值。 |
| `data[8]`{.code-blue} | 左緣 | `0 ~ 255`<br>• 左緣 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[9]`{.code-blue} | 右緣 | `0 ~ 255`<br>• 右緣 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[10]`{.code-blue} | 遠處線寬 | `0 ~ 100`<br>• 遠處線寬 = 讀取數值。 |
| `data[11]`{.code-blue} | 標記色號 | `0 ~ 8`<br>• 標記色號 = 讀取數值。 |
| `data[12]`{.code-blue} | 標記累計 | `0 ~ 99`<br>• 標記累計 = 讀取數值。 |
| `data[13]`{.code-blue} | 最後離線方向 | `0 ~ 2`<br>• 最後離線方向 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

`原生介面可讀：循線位置、路口與標記資料`

::: info ℹ️ 補充資訊
- 偏移、角度與左右緣使用 `signedByte()` 解碼；偏移負數在左、正數在右。
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。最後離線方向：0 = 有線、1 = 左、2 = 右。
- 請先將線的顏色教成目標色 1。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `43`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 近處偏移 | `0 ~ 255`<br>• 近處偏移 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[1]`{.code-blue} | 中段偏移 | `0 ~ 255`<br>• 中段偏移 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[2]`{.code-blue} | 遠處偏移 | `0 ~ 255`<br>• 遠處偏移 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[3]`{.code-blue} | 角度 | `0 ~ 255`<br>• 角度 = signedByte(讀取數值)。<br>• 解碼後範圍：`-90 ~ 90`{.code-green}。 |
| `data[4]`{.code-blue} | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| `data[5]`{.code-blue} | 有線旗標 | `0 ~ 7`<br>• 有線旗標 = 讀取數值。 |
| `data[6]`{.code-blue} | 路口類型 | `0 ~ 5`<br>• 路口類型 = 讀取數值。 |
| `data[7]`{.code-blue} | 路口距離 | `0 ~ 100`<br>• 路口距離 = 讀取數值。 |
| `data[8]`{.code-blue} | 左緣 | `0 ~ 255`<br>• 左緣 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[9]`{.code-blue} | 右緣 | `0 ~ 255`<br>• 右緣 = signedByte(讀取數值)。<br>• 解碼後範圍：`-100 ~ 100`{.code-green}。 |
| `data[10]`{.code-blue} | 遠處線寬 | `0 ~ 100`<br>• 遠處線寬 = 讀取數值。 |
| `data[11]`{.code-blue} | 標記色號 | `0 ~ 8`<br>• 標記色號 = 讀取數值。 |
| `data[12]`{.code-blue} | 標記累計 | `0 ~ 99`<br>• 標記累計 = 讀取數值。 |
| `data[13]`{.code-blue} | 最後離線方向 | `0 ~ 2`<br>• 最後離線方向 = 讀取數值。 |

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

`原生介面可讀：4 個物體`

::: info ℹ️ 補充資訊
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序。代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。
- 位置為像素質心座標，X 向右、Y 向下增加；`(0, 0)` 表示沒有物體。
- 形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `51`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 物體總數 | `0 ~ 8`<br>• 物體總數 = 讀取數值。 |
| `data[1]`{.code-blue} | 物體 1 的代碼 | `0, 10 ~ 89`<br>• 物體 1 的色號 = 讀取數值 ÷ 10；形狀碼 = 讀取數值 mod 10。 |
| `data[2]`{.code-blue} | 物體 1 的 X | `0 ~ 159`<br>• 物體 1 的 X = 讀取數值。 |
| `data[3]`{.code-blue} | 物體 1 的 Y | `0 ~ 119`<br>• 物體 1 的 Y = 讀取數值。 |
| `data[4]`{.code-blue} | 物體 2 的代碼 | `0, 10 ~ 89`<br>• 物體 2 的色號 = 讀取數值 ÷ 10；形狀碼 = 讀取數值 mod 10。 |
| `data[5]`{.code-blue} | 物體 2 的 X | `0 ~ 159`<br>• 物體 2 的 X = 讀取數值。 |
| `data[6]`{.code-blue} | 物體 2 的 Y | `0 ~ 119`<br>• 物體 2 的 Y = 讀取數值。 |
| `data[7]`{.code-blue} | 物體 3 的代碼 | `0, 10 ~ 89`<br>• 物體 3 的色號 = 讀取數值 ÷ 10；形狀碼 = 讀取數值 mod 10。 |
| `data[8]`{.code-blue} | 物體 3 的 X | `0 ~ 159`<br>• 物體 3 的 X = 讀取數值。 |
| `data[9]`{.code-blue} | 物體 3 的 Y | `0 ~ 119`<br>• 物體 3 的 Y = 讀取數值。 |
| `data[10]`{.code-blue} | 物體 4 的代碼 | `0, 10 ~ 89`<br>• 物體 4 的色號 = 讀取數值 ÷ 10；形狀碼 = 讀取數值 mod 10。 |
| `data[11]`{.code-blue} | 物體 4 的 X | `0 ~ 159`<br>• 物體 4 的 X = 讀取數值。 |
| `data[12]`{.code-blue} | 物體 4 的 Y | `0 ~ 119`<br>• 物體 4 的 Y = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

`原生介面可讀：2 個物體`

::: info ℹ️ 補充資訊
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序。代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。
- 位置為像素質心座標，X 向右、Y 向下增加；`(0, 0)` 表示沒有物體。
- 形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 使用表格前，先以 `data = readCamera()` 讀取感應器通訊模式 `9`。
:::

**Mode ID 設定**

請在相機機身選單設為 Mode ID `52`{.code-green}。`PUPDevice` 不會自動切換相機模式。

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `data[0]`{.code-blue} | 物體 1 的色號 | `0 ~ 8`<br>• 物體 1 的色號 = 讀取數值。 |
| `data[1]`{.code-blue} | 物體 1 的形狀碼 | `0 ~ 9`<br>• 物體 1 的形狀碼 = 讀取數值。 |
| `data[2]`{.code-blue} | 物體 1 的X | `0 ~ 159`<br>• 物體 1 的X = 讀取數值。 |
| `data[3]`{.code-blue} | 物體 1 的Y | `0 ~ 119`<br>• 物體 1 的Y = 讀取數值。 |
| `data[4]`{.code-blue} | 物體 1 的寬 | `0 ~ 160`<br>• 物體 1 的寬 = 讀取數值。 |
| `data[5]`{.code-blue} | 物體 1 的高 | `0 ~ 120`<br>• 物體 1 的高 = 讀取數值。 |
| `data[6]`{.code-blue} | 物體 1 的面積 | `0 ~ 100`<br>• 物體 1 的面積 = 讀取數值。 |
| `data[7]`{.code-blue} | 物體 2 的色號 | `0 ~ 8`<br>• 物體 2 的色號 = 讀取數值。 |
| `data[8]`{.code-blue} | 物體 2 的形狀碼 | `0 ~ 9`<br>• 物體 2 的形狀碼 = 讀取數值。 |
| `data[9]`{.code-blue} | 物體 2 的X | `0 ~ 159`<br>• 物體 2 的X = 讀取數值。 |
| `data[10]`{.code-blue} | 物體 2 的Y | `0 ~ 119`<br>• 物體 2 的Y = 讀取數值。 |
| `data[11]`{.code-blue} | 物體 2 的寬 | `0 ~ 160`<br>• 物體 2 的寬 = 讀取數值。 |
| `data[12]`{.code-blue} | 物體 2 的高 | `0 ~ 120`<br>• 物體 2 的高 = 讀取數值。 |
| `data[13]`{.code-blue} | 物體 2 的面積 | `0 ~ 100`<br>• 物體 2 的面積 = 讀取數值。 |

</CamModeSection>

</CamModeAccordion>

## 03 / 進階控制-前置作業與函數功能說明

<DownloadButton href="/programs/Cam/spike-pybricks/MBC_UniCam.py" download="MBC_UniCam.py" label="v4.1 函式庫" />

### ✔ 函數設定
1. 點選上方 <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>v4.1 函式庫</code> 按鈕下載 `MBC 神攝手視覺感應器 Pybricks - SPIKE 函式庫`{.code-blue}。
2. 確認函式庫檔名為 `MBC_UniCam.py`{.code-blue}。
3. 回到 Pybricks，在 `file explorer`{.code-blue} 工作區中點選 `import a file`{.code-blue} 按鈕 ![匯入](/images/tutorials/S8/spike-block/pybricks-import.svg){style = "width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"}。
4. 選擇 `MBC_UniCam.py`{.code-blue} 函式庫並匯入。
5. 確認 `file explorer`{.code-blue} 工作區中出現 `MBC_UniCam.py`{.code-blue}。`MBC_UniCam.py`{.code-blue} 與你的主程式必須放在同一個專案列表下。
6. 開啟你的 Pybricks 程式，輸入函式庫匯入與設定程式碼，如下。其餘底盤與馬達感應器初始化程式碼則接續放置。
```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam
cam = UniCam(Port.A, mode=11, multitask=False)
```

### ✔ 函數功能說明

#### set up
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `from MBC_UniCam import UniCam`{.code-blue} | 導入函式庫 | `UniCam`<br>• 從 `MBC_UniCam.py` 匯入 `UniCam` 類別。檔名與類別名稱的大小寫必須完全相同。 |
| `cam = UniCam(Port.A, mode=11, multitask=False)`{.code-blue} | 函式庫設定 | `UniCam`<br>• `cam` 為後續數值讀取時使用的名稱。`Port.A` 為連接埠 A。`mode=11` 為相機 Mode ID。`multitask=False` 為同步設定；改為 `True` 時使用非同步模式。 |

::: info ℹ️ 補充資訊


| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam = UniCam(Port.A, mode=11, multitask=True)`{.code-blue} | 非同步模式 | `True`<br>• 呼叫讀值函數時搭配 `await`，例如 `await cam.xy(1)`。若要透過程式切換相機模式，在非同步任務中使用 `await cam.set_mode(11)`。 |
| `cam = UniCam(Port.A, mode=11, multitask=False)`{.code-blue} | 同步模式 | `False`<br>• 呼叫讀值函數時使用 `cam.xy(1)`。建立物件時會將相機切換為設定的 Mode ID。 |

:::

<CamModeAccordion namespace="advanced">

### ✔ 相機模式概覽

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

`函式庫可讀：14 色位置與數量`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- `cell()` 使用 `16 × 12` 分格，像素位置為分格中心。
- 主要資料使用感應器通訊模式 `9`。
- 數量使用感應器通訊模式 `6`，換讀取模式需要等待，只在需要時查詢。
- 像素座標是分格中心：X = (格子 X - 1) × 10 + 5，Y = (格子 Y - 1) × 10 + 5。每色數量最多回傳 7，7 表示 7 塊或以上。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=11`{.code-green}。下列同步設定會將相機切到 Mode ID `11`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=11, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | 指定顏色的位置 X、Y | `X: 0, 5 ~ 155 / Y: 0, 5 ~ 115`<br>• 回傳 `(X, Y)`{.code-green}，單位為像素。<br>• 參數範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.x(1)`{.code-blue} | 指定顏色的 X | `0, 5 ~ 155`<br>• 回傳指定顏色的 X，向右增加。<br>• 參數範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.y(1)`{.code-blue} | 指定顏色的 Y | `0, 5 ~ 115`<br>• 回傳指定顏色的 Y，向下增加。<br>• 參數範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.found(1)`{.code-blue} | 是否找到指定顏色 | `True / False`<br>• `True`{.code-green} 表示找到目標，`False`{.code-green} 表示未找到。<br>• 參數範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.cell(1)`{.code-blue} | 指定顏色的分格位置 | `X: 0 ~ 16 / Y: 0 ~ 12`<br>• 回傳 `(X, Y)`{.code-green}，使用 `16 × 12`{.code-green} 格，並非像素；`(0, 0)`{.code-green} 表示未找到。<br>• 參數範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.count(1)`{.code-blue} | 指定顏色的色塊數量 | `0 ~ 7`<br>• 回傳該目標色的色塊數量，不是找到的總色數。<br>• 參數範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.colors_found()`{.code-blue} | 找到顏色的色數 | `0 ~ 15`<br>• 回傳相機找到的總色數，不等於本模式提供位置的顏色數量上限。 |
| `cam.max_color()`{.code-blue} | 可讀顏色數量上限 | `14`<br>• 本模式最多提供 `14`{.code-green} 色的資料；可用來決定讀取迴圈的上限。 |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`函式庫可讀：7 色位置與數量`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 主要資料使用感應器通訊模式 `9`。
- 數量使用感應器通訊模式 `6`，換讀取模式需要等待，只在需要時查詢。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=12`{.code-green}。下列同步設定會將相機切到 Mode ID `12`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=12, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | 指定顏色的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳 `(X, Y)`{.code-green}，單位為像素。<br>• 參數範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.x(1)`{.code-blue} | 指定顏色的 X | `0 ~ 159`<br>• 回傳指定顏色的 X，向右增加。<br>• 參數範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.y(1)`{.code-blue} | 指定顏色的 Y | `0 ~ 119`<br>• 回傳指定顏色的 Y，向下增加。<br>• 參數範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.found(1)`{.code-blue} | 是否找到指定顏色 | `True / False`<br>• `True`{.code-green} 表示找到目標，`False`{.code-green} 表示未找到。<br>• 參數範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.count(1)`{.code-blue} | 指定顏色的色塊數量 | `0 ~ 15`<br>• 回傳該目標色的色塊數量，不是找到的總色數。<br>• 參數範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.colors_found()`{.code-blue} | 找到顏色的色數 | `0 ~ 15`<br>• 回傳相機找到的總色數，不等於本模式提供位置的顏色數量上限。 |
| `cam.max_color()`{.code-blue} | 可讀顏色數量上限 | `7`<br>• 本模式最多提供 `7`{.code-green} 色的資料；可用來決定讀取迴圈的上限。 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`函式庫可讀：4 色位置與數量、面積`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 主要資料使用感應器通訊模式 `9`。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=13`{.code-green}。下列同步設定會將相機切到 Mode ID `13`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=13, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | 指定顏色的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳 `(X, Y)`{.code-green}，單位為像素。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.x(1)`{.code-blue} | 指定顏色的 X | `0 ~ 159`<br>• 回傳指定顏色的 X，向右增加。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.y(1)`{.code-blue} | 指定顏色的 Y | `0 ~ 119`<br>• 回傳指定顏色的 Y，向下增加。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.found(1)`{.code-blue} | 是否找到指定顏色 | `True / False`<br>• `True`{.code-green} 表示找到目標，`False`{.code-green} 表示未找到。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.count(1)`{.code-blue} | 指定顏色的色塊數量 | `0 ~ 15`<br>• 回傳該目標色的色塊數量，不是找到的總色數。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.area(1)`{.code-blue} | 指定顏色的面積 | `0 ~ 100`<br>• 回傳該色塊占畫面的面積百分比；`0`{.code-green} 表示未找到。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.max_color()`{.code-blue} | 可讀顏色數量上限 | `4`<br>• 本模式最多提供 `4`{.code-green} 色的資料；可用來決定讀取迴圈的上限。 |

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`函式庫可讀：2 色位置與數量、面積與寬高`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 主要資料使用感應器通訊模式 `9`。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=14`{.code-green}。下列同步設定會將相機切到 Mode ID `14`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=14, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | 指定顏色的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳 `(X, Y)`{.code-green}，單位為像素。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.x(1)`{.code-blue} | 指定顏色的 X | `0 ~ 159`<br>• 回傳指定顏色的 X，向右增加。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.y(1)`{.code-blue} | 指定顏色的 Y | `0 ~ 119`<br>• 回傳指定顏色的 Y，向下增加。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.found(1)`{.code-blue} | 是否找到指定顏色 | `True / False`<br>• `True`{.code-green} 表示找到目標，`False`{.code-green} 表示未找到。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.size(1)`{.code-blue} | 指定顏色的寬、高 | `W: 0 ~ 160 / H: 0 ~ 120`<br>• 回傳 `(W, H)`{.code-green}，單位為像素。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.count(1)`{.code-blue} | 指定顏色的色塊數量 | `0 ~ 15`<br>• 回傳該目標色的色塊數量，不是找到的總色數。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.area(1)`{.code-blue} | 指定顏色的面積 | `0 ~ 100`<br>• 回傳該色塊占畫面的面積百分比；`0`{.code-green} 表示未找到。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。範例中的 `1`{.code-green} 表示顏色 1。 |
| `cam.colors_found()`{.code-blue} | 找到顏色的色數 | `0 ~ 16`<br>• 回傳相機找到的總色數，不等於本模式提供位置的顏色數量上限。 |
| `cam.max_color()`{.code-blue} | 可讀顏色數量上限 | `2`<br>• 本模式最多提供 `2`{.code-green} 色的資料；可用來決定讀取迴圈的上限。 |

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`函式庫可讀：14 點色相`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 取樣點須先在相機上設定。未設定的取樣點回傳 0；色相 0 也可以是紅色，不能單靠色相 0 判斷未設定。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=21`{.code-green}。下列同步設定會將相機切到 Mode ID `21`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=21, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | 指定取樣點的色相 | `0 ~ 255`<br>• 回傳取樣點的色相碼；`0`{.code-green} 可以代表紅色。<br>• 參數範圍 `1 ~ 14`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.hsv(1)`{.code-blue} | 指定取樣點的 HSV | `H: 0 ~ 255 / S: None / V: None`<br>• 回傳 `(H, S, V)`{.code-green}，依序為色相、飽和度、明度。本模式未提供的項目為 `None`{.code-green}。<br>• 參數範圍 `1 ~ 14`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.color(1)`{.code-blue} | 指定取樣點的顏色名稱 | `str`<br>• 將色相轉為顏色名稱：`red`、`orange`、`yellow`、`green`、`cyan`、`blue`、`purple`、`white`、`black`。<br>• 參數範圍 `1 ~ 14`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.max_point()`{.code-blue} | 可讀取樣點數量上限 | `14`<br>• 本模式最多提供 `14`{.code-green} 個取樣點。 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相 + 飽和">

`函式庫可讀：7 點色相、飽和度`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 取樣點須先在相機上設定。未設定的取樣點回傳 0；色相 0 也可以是紅色，不能單靠色相 0 判斷未設定。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=22`{.code-green}。下列同步設定會將相機切到 Mode ID `22`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=22, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | 指定取樣點的色相 | `0 ~ 255`<br>• 回傳取樣點的色相碼；`0`{.code-green} 可以代表紅色。<br>• 參數範圍 `1 ~ 7`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.sat(1)`{.code-blue} | 指定取樣點的飽和度 | `0 ~ 100`<br>• 回傳指定取樣點的飽和度。<br>• 參數範圍 `1 ~ 7`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.hsv(1)`{.code-blue} | 指定取樣點的 HSV | `H: 0 ~ 255 / S: 0 ~ 100 / V: None`<br>• 回傳 `(H, S, V)`{.code-green}，依序為色相、飽和度、明度。本模式未提供的項目為 `None`{.code-green}。<br>• 參數範圍 `1 ~ 7`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.color(1)`{.code-blue} | 指定取樣點的顏色名稱 | `str`<br>• 將色相轉為顏色名稱：`red`、`orange`、`yellow`、`green`、`cyan`、`blue`、`purple`、`white`、`black`。<br>• 參數範圍 `1 ~ 7`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.max_point()`{.code-blue} | 可讀取樣點數量上限 | `7`<br>• 本模式最多提供 `7`{.code-green} 個取樣點。 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相 + 飽和 + 明度">

`函式庫可讀：4 點色相、飽和度與明度`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 取樣點須先在相機上設定。未設定的取樣點回傳 0；色相 0 也可以是紅色，不能單靠色相 0 判斷未設定。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=23`{.code-green}。下列同步設定會將相機切到 Mode ID `23`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=23, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | 指定取樣點的色相 | `0 ~ 255`<br>• 回傳取樣點的色相碼；`0`{.code-green} 可以代表紅色。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.sat(1)`{.code-blue} | 指定取樣點的飽和度 | `0 ~ 100`<br>• 回傳指定取樣點的飽和度。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.val(1)`{.code-blue} | 指定取樣點的明度 | `0 ~ 100`<br>• 回傳指定取樣點的明度。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.hsv(1)`{.code-blue} | 指定取樣點的 HSV | `H: 0 ~ 255 / S: 0 ~ 100 / V: 0 ~ 100`<br>• 回傳 `(H, S, V)`{.code-green}，依序為色相、飽和度、明度。本模式未提供的項目為 `None`{.code-green}。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.color(1)`{.code-blue} | 指定取樣點的顏色名稱 | `str`<br>• 將色相轉為顏色名稱：`red`、`orange`、`yellow`、`green`、`cyan`、`blue`、`purple`、`white`、`black`。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。範例中的 `1`{.code-green} 表示取樣點 S1。 |
| `cam.max_point()`{.code-blue} | 可讀取樣點數量上限 | `4`<br>• 本模式最多提供 `4`{.code-green} 個取樣點。 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

`函式庫可讀：前 13 塊色相與總塊數`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 色塊由左到右排序。總塊數可能超過 13，但清單最多提供 13 塊；先確認清單長度再取指定索引。色相 0 可以是紅色。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=30`{.code-green}。下列同步設定會將相機切到 Mode ID `30`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=30, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.order()`{.code-blue} | 由左至右的色相清單 | `list[int]`<br>• 回傳由左到右排列的色相清單，最多 13 塊；每筆色相範圍為 `0 ~ 255`{.code-green}。<br>• 清單長度就是本次實際提供的筆數；紅色色相也可以是 0。 |
| `cam.total()`{.code-blue} | 色塊總數 | `0 ~ 18`<br>• 回傳畫面中的總塊數，可能大於清單可提供的 13 塊。 |

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

`函式庫可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 偏移左負右正；角度為有號值。路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。
- 最後離線方向：0 = 有線、1 = 左、2 = 右。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=41`{.code-green}。下列同步設定會將相機切到 Mode ID `41`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=41, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.near()`{.code-blue} | 近處偏移 | `-100 ~ 100`<br>• 回傳近處偏移。 |
| `cam.mid()`{.code-blue} | 中段偏移 | `-100 ~ 100`<br>• 回傳中段偏移。 |
| `cam.far()`{.code-blue} | 遠處偏移 | `-100 ~ 100`<br>• 回傳遠處偏移。 |
| `cam.angle()`{.code-blue} | 線角度 | `-90 ~ 90`<br>• 回傳線角度。 單位為度。 |
| `cam.width()`{.code-blue} | 近處線寬 | `0 ~ 100`<br>• 回傳近處線寬。 單位為百分比。 |
| `cam.flags()`{.code-blue} | 有線旗標 | `0 ~ 7`<br>• 回傳有線旗標。 |
| `cam.junction()`{.code-blue} | 路口類型 | `0 ~ 5`<br>• 回傳路口類型。 |
| `cam.junction_dist()`{.code-blue} | 路口距離 | `0 ~ 100`<br>• 回傳路口距離。 單位為百分比。 |
| `cam.edges()`{.code-blue} | 近處線左、右緣 | `left: -100 ~ 100 / right: -100 ~ 100`<br>• 回傳 `(左緣, 右緣)`{.code-green}；負值在畫面左側，正值在右側。 |
| `cam.far_width()`{.code-blue} | 遠處線寬 | `0 ~ 100`<br>• 回傳遠處線寬。 單位為百分比。 |
| `cam.marker()`{.code-blue} | 標記線色號與累計條數 | `color: 0 ~ 8 / count: 0 ~ 99`<br>• 回傳 `(色號, 累計條數)`{.code-green}，不是單一數值。 |
| `cam.lost()`{.code-blue} | 最後離線方向 | `0 ~ 2`<br>• 回傳最後離線方向。 |
| `cam.line_all()`{.code-blue} | 一次讀取完整循線資料 | `tuple[14]`<br>• 依序回傳：近處偏移、中段偏移、遠處偏移、角度、近處線寬、有線旗標、路口類型、路口距離、左緣、右緣、遠處線寬、標記色號、標記累計、最後離線方向。<br>• 各項數值範圍與上方對應積木相同，適合同一輪需要多個循線值時使用。 |

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

`函式庫可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 偏移左負右正；角度為有號值。路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。
- 最後離線方向：0 = 有線、1 = 左、2 = 右。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=42`{.code-green}。下列同步設定會將相機切到 Mode ID `42`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=42, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.near()`{.code-blue} | 近處偏移 | `-100 ~ 100`<br>• 回傳近處偏移。 |
| `cam.mid()`{.code-blue} | 中段偏移 | `-100 ~ 100`<br>• 回傳中段偏移。 |
| `cam.far()`{.code-blue} | 遠處偏移 | `-100 ~ 100`<br>• 回傳遠處偏移。 |
| `cam.angle()`{.code-blue} | 線角度 | `-90 ~ 90`<br>• 回傳線角度。 單位為度。 |
| `cam.width()`{.code-blue} | 近處線寬 | `0 ~ 100`<br>• 回傳近處線寬。 單位為百分比。 |
| `cam.flags()`{.code-blue} | 有線旗標 | `0 ~ 7`<br>• 回傳有線旗標。 |
| `cam.junction()`{.code-blue} | 路口類型 | `0 ~ 5`<br>• 回傳路口類型。 |
| `cam.junction_dist()`{.code-blue} | 路口距離 | `0 ~ 100`<br>• 回傳路口距離。 單位為百分比。 |
| `cam.edges()`{.code-blue} | 近處線左、右緣 | `left: -100 ~ 100 / right: -100 ~ 100`<br>• 回傳 `(左緣, 右緣)`{.code-green}；負值在畫面左側，正值在右側。 |
| `cam.far_width()`{.code-blue} | 遠處線寬 | `0 ~ 100`<br>• 回傳遠處線寬。 單位為百分比。 |
| `cam.marker()`{.code-blue} | 標記線色號與累計條數 | `color: 0 ~ 8 / count: 0 ~ 99`<br>• 回傳 `(色號, 累計條數)`{.code-green}，不是單一數值。 |
| `cam.lost()`{.code-blue} | 最後離線方向 | `0 ~ 2`<br>• 回傳最後離線方向。 |
| `cam.line_all()`{.code-blue} | 一次讀取完整循線資料 | `tuple[14]`<br>• 依序回傳：近處偏移、中段偏移、遠處偏移、角度、近處線寬、有線旗標、路口類型、路口距離、左緣、右緣、遠處線寬、標記色號、標記累計、最後離線方向。<br>• 各項數值範圍與上方對應積木相同，適合同一輪需要多個循線值時使用。 |

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

`函式庫可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 偏移左負右正；角度為有號值。路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。
- 先將線的顏色教成目標色 1。
- 最後離線方向：0 = 有線、1 = 左、2 = 右。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=43`{.code-green}。下列同步設定會將相機切到 Mode ID `43`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=43, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.near()`{.code-blue} | 近處偏移 | `-100 ~ 100`<br>• 回傳近處偏移。 |
| `cam.mid()`{.code-blue} | 中段偏移 | `-100 ~ 100`<br>• 回傳中段偏移。 |
| `cam.far()`{.code-blue} | 遠處偏移 | `-100 ~ 100`<br>• 回傳遠處偏移。 |
| `cam.angle()`{.code-blue} | 線角度 | `-90 ~ 90`<br>• 回傳線角度。 單位為度。 |
| `cam.width()`{.code-blue} | 近處線寬 | `0 ~ 100`<br>• 回傳近處線寬。 單位為百分比。 |
| `cam.flags()`{.code-blue} | 有線旗標 | `0 ~ 7`<br>• 回傳有線旗標。 |
| `cam.junction()`{.code-blue} | 路口類型 | `0 ~ 5`<br>• 回傳路口類型。 |
| `cam.junction_dist()`{.code-blue} | 路口距離 | `0 ~ 100`<br>• 回傳路口距離。 單位為百分比。 |
| `cam.edges()`{.code-blue} | 近處線左、右緣 | `left: -100 ~ 100 / right: -100 ~ 100`<br>• 回傳 `(左緣, 右緣)`{.code-green}；負值在畫面左側，正值在右側。 |
| `cam.far_width()`{.code-blue} | 遠處線寬 | `0 ~ 100`<br>• 回傳遠處線寬。 單位為百分比。 |
| `cam.marker()`{.code-blue} | 標記線色號與累計條數 | `color: 0 ~ 8 / count: 0 ~ 99`<br>• 回傳 `(色號, 累計條數)`{.code-green}，不是單一數值。 |
| `cam.lost()`{.code-blue} | 最後離線方向 | `0 ~ 2`<br>• 回傳最後離線方向。 |
| `cam.line_all()`{.code-blue} | 一次讀取完整循線資料 | `tuple[14]`<br>• 依序回傳：近處偏移、中段偏移、遠處偏移、角度、近處線寬、有線旗標、路口類型、路口距離、左緣、右緣、遠處線寬、標記色號、標記累計、最後離線方向。<br>• 各項數值範圍與上方對應積木相同，適合同一輪需要多個循線值時使用。 |

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

`函式庫可讀：前 4 個物體與物體總數`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 主要資料使用感應器通訊模式 `9`。
- 只辨識目標色 1 ~ 8；物體依面積由大到小排序。代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。先判斷物體是否存在再使用資料。
- 形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=51`{.code-green}。下列同步設定會將相機切到 Mode ID `51`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=51, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.max_object()`{.code-blue} | 可讀物體數量上限 | `4`<br>• 本模式最多提供前 `4`{.code-green} 個物體，依面積由大到小排序。 |
| `cam.object_count()`{.code-blue} | 物體總數 | `0 ~ 8`<br>• 回傳畫面物體總數，可能多於本模式可讀物體數量上限。 |
| `cam.object(1)`{.code-blue} | 指定物體的代碼 | `0, 10 ~ 89`<br>• 物體代碼 = 色號 × 10 + 形狀碼；例如 `13`{.code-green} 表示目標色 1 的三角形，`0`{.code-green} 表示沒有物體。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_found(1)`{.code-blue} | 是否找到指定物體 | `True / False`<br>• `True`{.code-green} 表示有該物體，`False`{.code-green} 表示沒有；先判斷再使用形狀與位置。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_color(1)`{.code-blue} | 指定物體的色號 | `0 ~ 8`<br>• 回傳物體對應的目標色編號；`0`{.code-green} 表示沒有物體。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_shape(1)`{.code-blue} | 指定物體的形狀碼 | `0 ~ 9`<br>• 回傳形狀碼。沒有物體時也可能回傳 0，先使用「是否找到指定物體」判斷。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_xy(1)`{.code-blue} | 指定物體的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳質心 `(X, Y)`{.code-green}，單位為像素；`(0, 0)`{.code-green} 表示沒有物體。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

`函式庫可讀：前 2 個物體的位置、寬高與面積`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 主要資料使用感應器通訊模式 `9`。
- 只辨識目標色 1 ~ 8；物體依面積由大到小排序。代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。先判斷物體是否存在再使用資料。
- 形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
:::

**Mode ID 設定**

請將初始化的 Mode ID 設為 `mode=52`{.code-green}。下列同步設定會將相機切到 Mode ID `52`{.code-green}；連接埠請依實際接線調整。

```python
from pybricks.parameters import Port
from MBC_UniCam import UniCam

cam = UniCam(Port.A, mode=52, multitask=False)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.max_object()`{.code-blue} | 可讀物體數量上限 | `2`<br>• 本模式最多提供前 `2`{.code-green} 個物體，依面積由大到小排序。 |
| `cam.object(1)`{.code-blue} | 指定物體的代碼 | `0, 10 ~ 89`<br>• 物體代碼 = 色號 × 10 + 形狀碼；例如 `13`{.code-green} 表示目標色 1 的三角形，`0`{.code-green} 表示沒有物體。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_found(1)`{.code-blue} | 是否找到指定物體 | `True / False`<br>• `True`{.code-green} 表示有該物體，`False`{.code-green} 表示沒有；先判斷再使用形狀與位置。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_color(1)`{.code-blue} | 指定物體的色號 | `0 ~ 8`<br>• 回傳物體對應的目標色編號；`0`{.code-green} 表示沒有物體。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_shape(1)`{.code-blue} | 指定物體的形狀碼 | `0 ~ 9`<br>• 回傳形狀碼。沒有物體時也可能回傳 0，先使用「是否找到指定物體」判斷。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_xy(1)`{.code-blue} | 指定物體的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳質心 `(X, Y)`{.code-green}，單位為像素；`(0, 0)`{.code-green} 表示沒有物體。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_size(1)`{.code-blue} | 指定物體的寬、高 | `W: 0 ~ 160 / H: 0 ~ 120`<br>• 回傳外框 `(W, H)`{.code-green}，單位為像素。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |
| `cam.object_area(1)`{.code-blue} | 指定物體的面積 | `0 ~ 100`<br>• 回傳物體占畫面的面積百分比。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。範例中的 `1`{.code-green} 表示物體 1。 |

</CamModeSection>

</CamModeAccordion>

### ✔ 函式庫控制與狀態

| 指令 | 用途 |
| --- | --- |
| `cam.set_mode(13)` | 切換到指定 Mode ID。 |
| `cam.sensor_ok()` | 檢查最近一次讀取是否成功。 |
| `cam.mode_number()` | 取得程式設定的 Mode ID。 |
| `cam.device_id()` | 取得裝置位址、硬體代碼與韌體版本字。 使用感應器通訊模式 `8`。 |
| `cam.is_unicam()` | 檢查是否為神攝手。 |
| `cam.firmware_version()` | 取得 (主版, 次版)。 |
| `cam.max_color() / cam.max_point() / cam.max_object()` | 依目前模式取得可讀顏色、取樣點或物體數量上限。 |
| `cam.light(50)` | 補光亮度 0 ~ 100；light(None) 回到相機選單設定。 |
| `cam.teach(1) / cam.clear(1)` | 用畫面中央教目標色，或清除指定目標，編號 1 ~ 16。 |
| `cam.target_range(1, hue=20, sat=10, size=10, search=2)` | 調整已教目標的色相容許、飽和容許、最小面積與搜尋方式；255 = 保留，search 0 = 保留、1 = 鎖定、2 = 最大塊。Hue 1 ~ 119、Sta 0 ~ 31、Size 4 ~ 254。 |
| `cam.shape_tolerance(3) / cam.target_shape(1, 3)` | 形狀寬鬆度 1 ~ 5；目標 1 ~ 8 的指定形狀 0 ~ 9，0 = 不指定。 |
| `cam.camera_setting(item, value)` | Setup 項目 0 ~ 12，順序與相機選單相同，設定值可為負數。 |
| `cam.white_cal()` | 白紙先覆蓋畫面中央，再執行白色校正。 |
| `cam.power(0)` | 0 = 全速、1 = 省電、2 = 待機；待機喚醒需要 1 ~ 2.5 秒。 |
| `cam.cmd(code, *parameters) / cam.busy() / cam.wait_done()` | 傳送自訂命令、查忙碌狀態與等待完成。不要在讀值迴圈頻繁查命令狀態。 |

控制命令的完成狀態：0 = 完成、2 = 失敗、3 = 拒絕、`None` = 未取得完成結果。`cmd()` 回傳序號，`busy()` 回傳布林值。

## 04 / 範例程式

### ▸ 基礎控制

先在相機機身選擇 Mode ID 13，再執行以下獨立程式。

```python
from pybricks.iodevices import PUPDevice
from pybricks.parameters import Port

cam = PUPDevice(Port.A)

def readCamera(mode=9):
    data = []
    for word in cam.read(mode):
        data.append(word & 255)
        data.append((word >> 8) & 255)
    return data

def signedByte(value):
    return value - 256 if value > 127 else value

from pybricks.tools import wait

# Select camera Mode ID 13 before running.
while True:
    data = readCamera()
    x, y, area = data[0], data[1], data[2]
    print(x, y, area) if x else print("No target")
    wait(100)
```

### ▸ 進階控制

#### ▸ 範例總覽

| 範例 | Mode ID | 用途 |
| --- | --- | --- |
| [1. 跟著色塊轉](#cam-pybricks-example-1) | 13 | 讓車頭跟著目標色 1 轉向；目標較遠時前進，面積達門檻後只轉向、不前進，未看到目標時原地搜尋。 |
| [2. 多色找位置](#cam-pybricks-example-2) | 12 | 讀取顏色 1 ~ 7 的位置，轉成左、中、右及上、中、下的文字；按主機左鍵時才額外查詢數量。 |
| [3. 座標取色判斷顏色](#cam-pybricks-example-3) | 22 | 讀取 S1 的色相與飽和度，以主機燈號和電腦文字顯示判斷結果。 |
| [4. 依序取色號](#cam-pybricks-example-4) | 30 | 取得由左到右的顏色排列，連續比較到相同順序後，以字母顯示結果。 |
| [5. PD 循線與路口停車](#cam-pybricks-example-5) | 41 | 用近、遠處偏移控制轉向，遇到十字或 T 字路口停車，失去線時依最後離線方向搜尋。 |
| [6. 尋找最大的紅色三角形](#cam-pybricks-example-6) | 51 | 在已讀到的物體中找代碼 13 的最大物體，朝它前進，Y 到達門檻後停車。 |

每個範例皆提供完整程式，可複製下方程式碼並獨立執行。程式內使用的函式可回上方模式表查讀值意義。

#### ▸ 範例 1：跟著色塊轉 {#cam-pybricks-example-1}

讓車頭跟著目標色 1 轉向；目標較遠時前進，面積達門檻後只轉向、不前進，未看到目標時原地搜尋。


```python
# 神攝手 × Pybricks (SPIKE)範例 1：跟著色塊轉
# SharpShot × Pybricks (SPIKE) example 1: turn to follow a colour blob
# Camera Mode ID = 13; UniCam selects this mode when the program starts.
# Camera Mode ID = 13; UniCam selects this mode when the program starts.
# 準備：先在相機上教「目標 1」的顏色 / Teach "target 1" on the camera first
# 接線 Wiring：相機 → C 孔 / camera → port C；左輪 E、右輪 F / left wheel E, right wheel F
# 同一個資料夾要有 MBC_UniCam.py / MBC_UniCam.py must be imported too
from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction, Color
from pybricks.robotics import DriveBase
from pybricks.tools import wait
from MBC_UniCam import UniCam

hub = PrimeHub()
cam = UniCam(Port.C, mode=13)                    # 函式庫會自動把相機切到這個模式 / the library switches the camera to this mode
left = Motor(Port.E, Direction.COUNTERCLOCKWISE)
right = Motor(Port.F)
robot = DriveBase(left, right, 56, 112)          # 輪徑 56 mm、輪距 112 mm / wheel 56 mm, axle 112 mm

KP = 3            # 👉 可以改：偏 1 像素就多轉幾度 / 秒 / you can change: turn rate per pixel of error
STOP_AREA = 20    # 👉 可以改：面積 ≥ 20 % 就算很近 / area (%) that counts as "close"

while True:
    p = cam.xy(1)                                # 色 1 的 (X, Y) 像素；(0, 0) = 沒看到 / (0, 0) = not seen
    if p is None:                                # 從來沒讀到相機 / camera never answered
        robot.stop()
        hub.light.on(Color.RED)
    elif p[0] == 0:                              # 沒看到色 1：原地慢慢轉著找 / not seen: spin slowly to search
        robot.drive(0, 60)
        hub.light.on(Color.ORANGE)
    else:
        error = p[0] - 80                        # 畫面中間 X = 80；色塊在右 → 正 / centre is X = 80; right = positive
        if cam.area(1) >= STOP_AREA:             # 很近了：只轉不前進 / close: turn only
            robot.drive(0, error * KP)
        else:                                    # 還遠：邊前進邊轉 / far: drive and turn
            robot.drive(80, error * KP)
        hub.light.on(Color.GREEN)
    wait(20)
```

- **程式說明**

  1. `cam.xy(1)` 取得顏色 1 的像素位置；`None` 表示尚未成功讀取，X = 0 表示未找到目標。
  2. `error = X - 80`。目標在右側時為正值，`robot.drive(速度, error × KP)` 讓車頭往右轉。
  3. `cam.area(1)` 達 `STOP_AREA` 時，前進速度改為 0，繼續轉向對準目標。

| 可調整項目 | 範例值 | 用途 |
| --- | --- | --- |
| `KP` | 3 | 每偏 1 像素的轉向增益；左右晃動時先調小。 |
| `STOP_AREA` | 20 | 停止前進的面積門檻。 |

- **執行結果**：目標在左，車頭左轉；在右，車頭右轉。目標變大後停在原地對準，拿走後橘燈亮起並慢慢旋轉搜尋。


#### ▸ 範例 2：多色找位置 {#cam-pybricks-example-2}

讀取顏色 1 ~ 7 的位置，轉成左、中、右及上、中、下的文字；按主機左鍵時才額外查詢數量。


```python
# 神攝手 × Pybricks (SPIKE)範例 2：多色找位置
# SharpShot × Pybricks (SPIKE) example 2: where are my colours?
# Camera Mode ID = 12; UniCam selects this mode when the program starts.
# Camera Mode ID = 12; UniCam selects this mode when the program starts.
# 準備：在相機上教目標 1 ~ 7 的顏色 (教幾色都可以)/ teach targets 1 ~ 7 (any number)
# 接線 Wiring：相機 → C 孔 / camera → port C
from pybricks.hubs import PrimeHub
from pybricks.parameters import Port, Button
from pybricks.tools import wait
from MBC_UniCam import UniCam

hub = PrimeHub()
cam = UniCam(Port.C, mode=12)


def where(x, y):
    # 像素 → 文字：左 / 中 / 右 + 上 / 中 / 下 / pixels -> words
    h = '左 left' if x < 54 else ('右 right' if x > 106 else '中 middle')
    v = '上 top' if y < 40 else ('下 bottom' if y > 80 else '中 middle')
    return h + ', ' + v


while True:
    seen = 0
    for c in range(1, cam.max_color() + 1):      # 色 1 ~ 7 / colours 1 ~ 7
        p = cam.xy(c)
        if p and p[0]:                           # X = 0 表示沒找到 / X = 0 means not found
            seen += 1
            print('色 colour', c, ':', p[0], p[1], where(p[0], p[1]))
    hub.display.number(seen)                     # 主機螢幕顯示看到幾色 / show how many colours are seen
    if Button.LEFT in hub.buttons.pressed():
        # 數量放在模式 6，要多等約 30 ms，所以按鍵才讀 / counts are in mode 6 (30 ms slower): read on demand
        print('16 色裡找到', cam.colors_found(), '色 / colours found;  色 1 有', cam.count(1), '塊 / blobs of colour 1')
    print('---')
    wait(500)
```

- **程式說明**

  1. `cam.max_color()` 在模式 12 回傳 7，程式依序讀取各色 `cam.xy(c)`。
  2. 只顯示已找到的目標；`where()` 將 X、Y 分成左中右與上中下，主機顯示本輪看到的色數。
  3. 按左鍵才讀 `cam.colors_found()`、`cam.count(1)`，避免每輪都切到通訊模式 6。

| 可調整項目 | 範例值 | 用途 |
| --- | --- | --- |
| `wait(500)` | 500 ms | 每輪顯示的間隔。 |
| `X / Y 分界` | 54、106 / 40、80 | 調整文字區域的分界，不會改變相機座標。 |

- **執行結果**：電腦持續顯示各色的位置文字，主機數字是本輪找到的目標數；按左鍵才印出總色數與顏色 1 的色塊數量。


#### ▸ 範例 3：座標取色判斷顏色 {#cam-pybricks-example-3}

讀取 S1 的色相與飽和度，以主機燈號和電腦文字顯示判斷結果。


```python
# 神攝手 × Pybricks (SPIKE)範例 3：座標取色判斷顏色
# SharpShot × Pybricks (SPIKE) example 3: what colour is at the spot?
# Camera Mode ID = 22; UniCam selects this mode when the program starts.
# Camera Mode ID = 22; UniCam selects this mode when the program starts.
# 準備：取樣點 S1 的位置看相機螢幕上標 1 的十字 / spot S1 is the cross marked 1 on the camera screen
# 接線 Wiring：相機 → C 孔 / camera → port C
from pybricks.hubs import PrimeHub
from pybricks.parameters import Port, Color
from pybricks.tools import wait
from MBC_UniCam import UniCam, color_name

hub = PrimeHub()
cam = UniCam(Port.C, mode=22)

# 顏色名稱 → 主機燈號 / colour name -> hub light
LIGHT = {'red': Color.RED, 'orange': Color.ORANGE, 'yellow': Color.YELLOW, 'green': Color.GREEN,
         'cyan': Color.CYAN, 'blue': Color.BLUE, 'purple': Color.VIOLET, 'white': Color.WHITE, 'black': Color.NONE}
NAME = {'red': '紅', 'orange': '橙', 'yellow': '黃', 'green': '綠', 'cyan': '青',
        'blue': '藍', 'purple': '紫', 'white': '白／灰', 'black': '黑'}
LOW_SAT = 15      # 👉 可以改：飽和度比這低就當成白 / 灰 / below this saturation = white / grey

while True:
    p = cam.hsv(1)                               # 取樣點 S1 的 (色相碼, 飽和度, None) / (hue, sat, None)
    if p is None:                                # 讀不到相機 / no camera
        hub.light.on(Color.NONE)
        wait(200)
        continue
    h, s = p[0], p[1]
    name = color_name(h)
    if s < LOW_SAT and name != 'black':
        name = 'white'                           # 顏色很淡：當成白 / 灰 / very pale: white / grey
    hub.light.on(LIGHT[name])
    print('S1 色相碼 hue', h, ' 飽和度 sat', s, ' →', NAME[name], name)
    wait(200)
```

- **程式說明**

  1. `cam.hsv(1)` 在模式 22 回傳 `(色相, 飽和度, None)`；明度要使用模式 23。
  2. `color_name(h)` 將色相碼換成顏色名稱，再對應到主機燈號。
  3. 飽和度低於 `LOW_SAT`，且不是黑色時，判斷為白或灰。

| 可調整項目 | 範例值 | 用途 |
| --- | --- | --- |
| `LOW_SAT` | 15 | 低飽和度的判斷門檻。 |

- **執行結果**：紅色物品顯示紅燈、白紙顯示白燈、黑色關燈；電腦同時印出 S1 的數值與顏色名稱。


#### ▸ 範例 4：依序取色號 {#cam-pybricks-example-4}

取得由左到右的顏色排列，連續比較到相同順序後，以字母顯示結果。


```python
# 神攝手 × Pybricks (SPIKE)範例 4：照順序給色號 (WRO 任務：記下積木的顏色順序)
# SharpShot × Pybricks (SPIKE) example 4: colour order (WRO: remember the order)
# Camera Mode ID = 30; UniCam selects this mode when the program starts.
# Camera Mode ID = 30; UniCam selects this mode when the program starts.
# 準備：在相機上教會場地上會出現的每一種顏色 / teach every colour that can appear on the field
# 接線 Wiring：相機 → C 孔 / camera → port C
from pybricks.hubs import PrimeHub
from pybricks.parameters import Port
from pybricks.tools import wait
from MBC_UniCam import UniCam, color_name

hub = PrimeHub()
cam = UniCam(Port.C, mode=30)

WANT = 4          # 👉 可以改：場地上有幾塊 / how many blocks to expect
LETTER = {'red': 'R', 'orange': 'O', 'yellow': 'Y', 'green': 'G', 'cyan': 'C',
          'blue': 'B', 'purple': 'P', 'white': 'W', 'black': 'K'}

# 連續 5 次讀到一樣的順序才算數 (避免剛好有手經過)/ same answer 5 times in a row = stable
last = None
same = 0
names = []
while same < 5:
    hues = cam.order()                           # 由左到右每塊的色相碼 / hue codes from left to right
    names = [color_name(h) for h in hues] if hues else []
    if len(names) == WANT and names == last:
        same += 1
    else:
        same = 0
    last = names
    wait(50)

print('順序 order:', names)
hub.speaker.beep()
for n in names:                                  # 一個字母一個字母顯示 / show one letter at a time
    hub.display.char(LETTER[n])
    wait(700)
hub.display.off()
```

- **程式說明**

  1. `cam.order()` 取得左至右的色相清單，`color_name()` 換成顏色名稱。
  2. 只有數量等於 `WANT`，且本輪順序與上一輪相同時，才增加一致次數；其他情況歸零。
  3. 累積 5 次一致比較後，發出提示音，再依序顯示 R、G、B、Y 等顏色字母。

| 可調整項目 | 範例值 | 用途 |
| --- | --- | --- |
| `WANT` | 4 | 預期要辨識的色塊數量。 |
| `same < 5` | 5 | 一致比較的累積門檻。 |

- **執行結果**：順序穩定後嗶一聲，再依照實際由左至右的排列顯示顏色字母。


#### ▸ 範例 5：PD 循線與路口停車 {#cam-pybricks-example-5}

用近、遠處偏移控制轉向，遇到十字或 T 字路口停車，失去線時依最後離線方向搜尋。


```python
# 神攝手 × Pybricks (SPIKE)範例 5：PD 循線 + 路口停車
# SharpShot × Pybricks (SPIKE) example 5: PD line following + stop at a junction
# Camera Mode ID = 41; UniCam selects this mode when the program starts.
# Camera Mode ID = 41; UniCam selects this mode when the program starts.
# 準備：相機裝在車頭、斜斜往前下方看線 / mount the camera at the front, looking down and forward
# 接線 Wiring：相機 → C 孔；左輪 E、右輪 F / camera → port C; left wheel E, right wheel F
# 方向：站在車後往前看，線在左 = 負 / standing behind the robot: line on the left = negative
from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction
from pybricks.robotics import DriveBase
from pybricks.tools import wait
from MBC_UniCam import UniCam

hub = PrimeHub()
cam = UniCam(Port.C, mode=41)
left = Motor(Port.E, Direction.COUNTERCLOCKWISE)
right = Motor(Port.F)
robot = DriveBase(left, right, 56, 112)

SPEED = 120       # 👉 可以改：前進速度 mm/s / forward speed
KP = 1.5          # 👉 可以改：偏多少就轉多少 / proportional gain
KD = 4.0          # 👉 可以改：偏移變快時多修一點 / derivative gain
last_error = 0

while True:
    v = cam.line_all()                           # 14 個值一次讀 / all 14 line values at once
    if v is None:                                # 讀不到相機：停車 / no camera: stop
        robot.stop()
        wait(50)
        continue
    near, far, flags, junction, lost = v[0], v[2], v[5], v[6], v[13]
    if junction in (1, 2):                       # 1 十字、2 T 字路口：停車嗶一聲 / cross or T junction: stop
        robot.stop()
        hub.speaker.beep()
        break
    if flags == 0:                               # 近中遠都沒看到線：往最後離線那一邊找 / line lost: search
        robot.drive(0, -120 if lost == 1 else 120)
        wait(10)
        continue
    error = 0.7 * near + 0.3 * far               # 近處為主、遠處提早轉彎 / mostly near, a bit of far
    turn = KP * error + KD * (error - last_error)
    last_error = error
    robot.drive(SPEED, turn)                     # 線在左 (負)→ 往左轉 / line on the left → turn left
    wait(10)
```

- **程式說明**

  1. `cam.line_all()` 一次取得 14 個循線值，取出近處偏移、遠處偏移、有線旗標、路口類型與離線方向。
  2. `error = 0.7 × near + 0.3 × far`，再用 `KP × error + KD × (error - last_error)` 計算轉向。
  3. 路口類型為 1 或 2 時停車；旗標為 0 時，不沿用一般循線轉向，改為原地搜尋。

| 可調整項目 | 範例值 | 用途 |
| --- | --- | --- |
| `SPEED` | 120 | 前進速度，單位 mm/s。 |
| `KP` | 1.5 | 比例增益。 |
| `KD` | 4.0 | 偏移變化的修正增益。 |

- **執行結果**：車子沿線前進，遇到十字或 T 字路口停車並提示；看不到線時朝最後離線的一側找線。


#### ▸ 範例 6：尋找最大的紅色三角形 {#cam-pybricks-example-6}

在已讀到的物體中找代碼 13 的最大物體，朝它前進，Y 到達門檻後停車。


```python
# 神攝手 × Pybricks (SPIKE)範例 6：找最大的紅色三角形、轉過去
# SharpShot × Pybricks (SPIKE) example 6: find the biggest red triangle and drive to it
# Camera Mode ID = 51; UniCam selects this mode when the program starts.
# Camera Mode ID = 51; UniCam selects this mode when the program starts.
# 準備：用要找的物體本身 (紅色三角形)教「目標 1」，並指定形狀 Tri (相機選單 Target 1 shape，或 cam.target_shape(1, 3))
# teach "target 1" with the red triangle itself and set its shape to Tri (camera menu, or cam.target_shape(1, 3))
# 接線 Wiring：相機 → C 孔 / camera → port C；左輪 E、右輪 F / left wheel E, right wheel F
# 同一個資料夾要有 MBC_UniCam.py / MBC_UniCam.py must be imported too
#
# 物體代碼 = 色號×10 + 形狀：目標 1 的三角形 = 1×10 + 3 = 13。物體 1、2、3、4 是面積由大到小，
# 所以從物體 1 往下找，第一個代碼是 13 的就是「最大的紅色三角形」。
# Object code = colour × 10 + shape: target 1 triangle = 13. Objects 1 ~ 4 are sorted largest first,
# so the first object with code 13 is the biggest red triangle.
from pybricks.hubs import PrimeHub
from pybricks.pupdevices import Motor
from pybricks.parameters import Port, Direction, Color
from pybricks.robotics import DriveBase
from pybricks.tools import wait
from MBC_UniCam import UniCam, shape_name

hub = PrimeHub()
cam = UniCam(Port.C, mode=51)                    # 函式庫會自動把相機切到這個模式 / the library switches the camera to this mode
left = Motor(Port.E, Direction.COUNTERCLOCKWISE)
right = Motor(Port.F)
robot = DriveBase(left, right, 56, 112)          # 輪徑 56 mm、輪距 112 mm / wheel 56 mm, axle 112 mm

WANT = 1 * 10 + 3  # 👉 可以改：目標 1 × 10  +  形狀 3 (三角)；正方形改成 14、圓改成 11 / square 14, circle 11
KP = 3             # 👉 可以改：偏 1 像素就多轉幾度 / 秒 / turn rate per pixel of error
NEAR_Y = 100       # 👉 可以改：物體的 Y ≥ 100 (畫面最下面)就算到了 / Y at the bottom of the picture = arrived


def find(want):
    # 從最大的物體往下找代碼 = want 的，回傳它的 (X, Y)；找不到 (0, 0) / largest first; (0, 0) = not found
    for i in range(1, cam.max_object() + 1):     # SPIKE 模式 51 給 4 個物體 / 4 objects on SPIKE
        if cam.object(i) == want:
            return cam.object_xy(i)
    return (0, 0)


print('要找 looking for: 目標 target', WANT // 10, shape_name(WANT % 10, True), shape_name(WANT % 10))
while True:
    n = cam.object_count()                       # 畫面裡有幾個物體 0 ~ 8 / objects in view
    if n is None:                                # 從來沒讀到相機 / camera never answered
        robot.stop()
        hub.light.on(Color.RED)
        wait(100)
        continue
    hub.display.number(n)
    x, y = find(WANT)
    if x == 0:                                   # 沒看到紅色三角形：原地慢慢轉著找 / not seen: spin to search
        robot.drive(0, 60)
        hub.light.on(Color.ORANGE)
    elif y >= NEAR_Y:                            # 到了：停車、嗶一聲 / arrived: stop and beep
        robot.stop()
        hub.light.on(Color.GREEN)
        hub.speaker.beep()
        break
    else:
        error = x - 80                           # 畫面中間 X = 80；在右 → 正 → 右轉 / right of centre = positive
        robot.drive(80, error * KP)
        hub.light.on(Color.BLUE)
    wait(20)
```

- **程式說明**

  1. 模式 51 在 SPIKE 提供前 4 個物體，已依面積由大到小排序。`find()` 從第 1 個往後找，第一個代碼符合的就是已讀資料中最大的目標。
  2. `cam.object_xy(i)` 取得質心位置；找不到時回傳 `(0, 0)`，車子原地搜尋。
  3. 用 `X - 80` 修正轉向；Y 達 `NEAR_Y` 時停車。這是畫面位置門檻，不是實際距離。

| 可調整項目 | 範例值 | 用途 |
| --- | --- | --- |
| `WANT` | 13 | 要尋找的物體代碼；目標色 1 的正方形為 14、圓形為 11。 |
| `KP` | 3 | 轉向增益。 |
| `NEAR_Y` | 100 | 停止前進的畫面 Y 門檻，須配合安裝角度調整。 |

- **執行結果**：看不到目標時橘燈搜尋；找到後藍燈前進並對準；達 Y 門檻後停車、綠燈亮起並提示。



## 05 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
