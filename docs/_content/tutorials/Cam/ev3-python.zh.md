# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | LEGO® MINDSTORMS® EV3 |
| 感應器 | MBC 神攝手視覺感應器 (EV3 版) |
| 程式語言 | Pybricks Python / EV3 MicroPython v2 |

### ✔ 事前準備

::: warning ⚠️ 注意
MBC 神攝手視覺感應器在 Pybricks 上分成 `基礎控制`{.code-blue} 與 `進階控制`{.code-blue} 兩種使用方法：

- `基礎控制`{.code-blue}：透過原生感應器介面讀值，並在程式內解碼，不需外加函式庫。
- `進階控制`{.code-blue}：功能廣泛，需要額外匯入 `MBC 神攝手視覺感應器 Pybricks - EV3 函式庫`{.code-blue-text}。

請根據你的需求決定是否下載函式庫：

<DownloadButton href="/programs/Cam/ev3-pybricks/MBC_UniCam_EV3.py" download="MBC_UniCam_EV3.py" label="EV3 函式庫" />

:::


1. 啟動 EV3 與 Pybricks Code (v4) 或 VS Code 的 EV3 MicroPython v2 專案。
2. 確認主機、相機與程式環境運作正常。
3. 設定感應器模式，確認與程式設定模式相同。

## 02 / 基礎控制-前置作業與函數功能說明

### ✔ 數值解碼函數設定

1. 開啟你的 Pybricks 程式，輸入相機設定程式碼，如下。其餘底盤與馬達感應器初始化程式碼則接續放置。
2. 在相機機身選擇欲使用的 Mode ID。本節透過原生紅外線感應器介面讀值，不需外加函式庫。

```python
from pybricks.parameters import Port
try:
    from pybricks.iodevices import Ev3devSensor
except ImportError:
    from pybricks.iodevices import LUMPDevice
    cam = LUMPDevice(Port.S1)
    def readCamera(mode):
        return cam.read(mode)
else:
    cam = Ev3devSensor(Port.S1)
    def readCamera(mode):
        names = {0: "IR-PROX", 1: "IR-SEEK", 2: "IR-REMOTE", 5: "IR-CAL"}
        return cam.read(names[mode])
```

### ✔ 函數功能說明

`readCamera(mode)` 為上方自訂函數，Pybricks 使用原生 `LUMPDevice` 讀值，EV3 MicroPython 則使用 `Ev3devSensor` 的具名模式。先將一筆回傳資料存入變數，再拆解各欄位。

::: info ℹ️ 補充資訊
- 使用 LUMPDevice(Port.S1) 讀取相機。readCamera(0)[0] 是相機 Mode ID；readCamera(1) 回傳八個信標值，readCamera(2) 回傳四個遙控值。表格列出實際索引，迴圈內先讀入變數再取欄位。相機模式由機身選單設定。
- 表中的「 ÷ 」表示整數除法，「mod」表示取餘數。相機 Mode ID 與 EV3 紅外線通訊模式是兩件事：例如相機 13 的資料仍透過信標模式 1 讀取。
:::

::: warning ⚠️ 注意
- 一次只能使用一種相機子模式，請確認相機 Mode ID 與程式設定相同。
- 不同模式共用相同讀取指令，回傳內容須依該模式的表格解碼。
:::

<CamModeAccordion namespace="basic">

### ✔ 相機模式概覽

MBC 神攝手視覺感應器共有 5 大主模式，各主模式下還有細分多個子模式，請參考下表說明與 Mode ID 編號，查找程式說明。

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

`EV3 Python可讀：12 色位置`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 由下往上增加，最下方的 Y 為 1。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
- 信標與遙控之間切換約需 1.1 秒。控制迴圈只讀需要的模式；不要為讀全部欄位反覆切換。相機模式仍由機身設定。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 顏色 1 位置 | `0, 11 ~ 86`<br>• 顏色 1 的 X = 讀取數值 ÷ 10。<br>• 顏色 1 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[1]` | 顏色 2 位置 | `0, 11 ~ 86`<br>• 顏色 2 的 X = 讀取數值 ÷ 10。<br>• 顏色 2 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[2]` | 顏色 3 位置 | `0, 11 ~ 86`<br>• 顏色 3 的 X = 讀取數值 ÷ 10。<br>• 顏色 3 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[3]` | 顏色 4 位置 | `0, 11 ~ 86`<br>• 顏色 4 的 X = 讀取數值 ÷ 10。<br>• 顏色 4 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[4]` | 顏色 5 位置 | `0, 11 ~ 86`<br>• 顏色 5 的 X = 讀取數值 ÷ 10。<br>• 顏色 5 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[5]` | 顏色 6 位置 | `0, 11 ~ 86`<br>• 顏色 6 的 X = 讀取數值 ÷ 10。<br>• 顏色 6 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[6]` | 顏色 7 位置 | `0, 11 ~ 86`<br>• 顏色 7 的 X = 讀取數值 ÷ 10。<br>• 顏色 7 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[7]` | 顏色 8 位置 | `0, 11 ~ 86`<br>• 顏色 8 的 X = 讀取數值 ÷ 10。<br>• 顏色 8 的 Y = 讀取數值 mod 10。 |
| `readCamera(2)[0]` | 顏色 9 位置 | `0, 11 ~ 86`<br>• 顏色 9 的 X = 讀取數值 ÷ 10。<br>• 顏色 9 的 Y = 讀取數值 mod 10。 |
| `readCamera(2)[1]` | 顏色 10 位置 | `0, 11 ~ 86`<br>• 顏色 10 的 X = 讀取數值 ÷ 10。<br>• 顏色 10 的 Y = 讀取數值 mod 10。 |
| `readCamera(2)[2]` | 顏色 11 位置 | `0, 11 ~ 86`<br>• 顏色 11 的 X = 讀取數值 ÷ 10。<br>• 顏色 11 的 Y = 讀取數值 mod 10。 |
| `readCamera(2)[3]` | 顏色 12 位置 | `0, 11 ~ 86`<br>• 顏色 12 的 X = 讀取數值 ÷ 10。<br>• 顏色 12 的 Y = 讀取數值 mod 10。 |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`EV3 Python可讀：8 色位置`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 由下往上增加，最下方的 Y 為 1。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 顏色 1 位置 | `0, 11 ~ 86`<br>• 顏色 1 的 X = 讀取數值 ÷ 10。<br>• 顏色 1 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[1]` | 顏色 2 位置 | `0, 11 ~ 86`<br>• 顏色 2 的 X = 讀取數值 ÷ 10。<br>• 顏色 2 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[2]` | 顏色 3 位置 | `0, 11 ~ 86`<br>• 顏色 3 的 X = 讀取數值 ÷ 10。<br>• 顏色 3 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[3]` | 顏色 4 位置 | `0, 11 ~ 86`<br>• 顏色 4 的 X = 讀取數值 ÷ 10。<br>• 顏色 4 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[4]` | 顏色 5 位置 | `0, 11 ~ 86`<br>• 顏色 5 的 X = 讀取數值 ÷ 10。<br>• 顏色 5 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[5]` | 顏色 6 位置 | `0, 11 ~ 86`<br>• 顏色 6 的 X = 讀取數值 ÷ 10。<br>• 顏色 6 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[6]` | 顏色 7 位置 | `0, 11 ~ 86`<br>• 顏色 7 的 X = 讀取數值 ÷ 10。<br>• 顏色 7 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[7]` | 顏色 8 位置 | `0, 11 ~ 86`<br>• 顏色 8 的 X = 讀取數值 ÷ 10。<br>• 顏色 8 的 Y = 讀取數值 mod 10。 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`EV3 Python可讀：4 色位置與面積`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 由下往上增加，最下方的 Y 為 1。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 顏色 1 位置 | `0, 11 ~ 86`<br>• 顏色 1 的 X = 讀取數值 ÷ 10。<br>• 顏色 1 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[1]` | 顏色 1 面積 | `0 ~ 100`<br>• 顏色 1 面積 = 讀取數值。 |
| `readCamera(1)[2]` | 顏色 2 位置 | `0, 11 ~ 86`<br>• 顏色 2 的 X = 讀取數值 ÷ 10。<br>• 顏色 2 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[3]` | 顏色 2 面積 | `0 ~ 100`<br>• 顏色 2 面積 = 讀取數值。 |
| `readCamera(1)[4]` | 顏色 3 位置 | `0, 11 ~ 86`<br>• 顏色 3 的 X = 讀取數值 ÷ 10。<br>• 顏色 3 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[5]` | 顏色 3 面積 | `0 ~ 100`<br>• 顏色 3 面積 = 讀取數值。 |
| `readCamera(1)[6]` | 顏色 4 位置 | `0, 11 ~ 86`<br>• 顏色 4 的 X = 讀取數值 ÷ 10。<br>• 顏色 4 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[7]` | 顏色 4 面積 | `0 ~ 100`<br>• 顏色 4 面積 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`EV3 Python可讀：2 色位置與寬高`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 由下往上增加，最下方的 Y 為 1。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 顏色 1 位置 | `0, 11 ~ 86`<br>• 顏色 1 的 X = 讀取數值 ÷ 10。<br>• 顏色 1 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[1]` | 顏色 1 寬高 | `0, 11 ~ 86`<br>• 顏色 1 的 W = 讀取數值 ÷ 10。<br>• 顏色 1 的 H = 讀取數值 mod 10。 |
| `readCamera(1)[2]` | 顏色 1 數量 | `0 ~ 15`<br>• 顏色 1 數量 = 讀取數值。 |
| `readCamera(1)[3]` | 顏色 1 面積 | `0 ~ 100`<br>• 顏色 1 面積 = 讀取數值。 |
| `readCamera(1)[4]` | 顏色 2 位置 | `0, 11 ~ 86`<br>• 顏色 2 的 X = 讀取數值 ÷ 10。<br>• 顏色 2 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[5]` | 顏色 2 寬高 | `0, 11 ~ 86`<br>• 顏色 2 的 W = 讀取數值 ÷ 10。<br>• 顏色 2 的 H = 讀取數值 mod 10。 |
| `readCamera(1)[6]` | 顏色 2 數量 | `0 ~ 15`<br>• 顏色 2 數量 = 讀取數值。 |
| `readCamera(1)[7]` | 顏色 2 面積 | `0 ~ 100`<br>• 顏色 2 面積 = 讀取數值。 |

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`EV3 Python可讀：12 點色相`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 信標與遙控之間切換約需 1.1 秒。控制迴圈只讀需要的模式；不要為讀全部欄位反覆切換。相機模式仍由機身設定。
- -1 ~ -8 表示白至灰，-9 ~ -15 表示黑色；負值不套用色相換算。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | S1 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[1]` | S2 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[2]` | S3 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[3]` | S4 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[4]` | S5 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[5]` | S6 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[6]` | S7 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[7]` | S8 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(2)[0]` | S9 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(2)[1]` | S10 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(2)[2]` | S11 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(2)[3]` | S12 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相 + 飽和">

`EV3 Python可讀：4 點色相與飽和度`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- -1 ~ -8 表示白至灰，-9 ~ -15 表示黑色；負值不套用色相換算。
- 兩者只保留十位，9 表示約 90 或以上。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | S1 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[1]` | S1 飽和度與明度 | `0 ~ 99`<br>• S1 飽和度 範圍：`0 ~ 90`{.code-green}。<br>• S1 飽和度為 (讀取數值 ÷ 10) × 10。<br>• S1 明度 範圍：`0 ~ 90`{.code-green}。<br>• S1 明度為 (讀取數值 mod 10) × 10。 |
| `readCamera(1)[2]` | S2 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[3]` | S2 飽和度與明度 | `0 ~ 99`<br>• S2 飽和度 範圍：`0 ~ 90`{.code-green}。<br>• S2 飽和度為 (讀取數值 ÷ 10) × 10。<br>• S2 明度 範圍：`0 ~ 90`{.code-green}。<br>• S2 明度為 (讀取數值 mod 10) × 10。 |
| `readCamera(1)[4]` | S3 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[5]` | S3 飽和度與明度 | `0 ~ 99`<br>• S3 飽和度 範圍：`0 ~ 90`{.code-green}。<br>• S3 飽和度為 (讀取數值 ÷ 10) × 10。<br>• S3 明度 範圍：`0 ~ 90`{.code-green}。<br>• S3 明度為 (讀取數值 mod 10) × 10。 |
| `readCamera(1)[6]` | S4 色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[7]` | S4 飽和度與明度 | `0 ~ 99`<br>• S4 飽和度 範圍：`0 ~ 90`{.code-green}。<br>• S4 飽和度為 (讀取數值 ÷ 10) × 10。<br>• S4 明度 範圍：`0 ~ 90`{.code-green}。<br>• S4 明度為 (讀取數值 mod 10) × 10。 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相 + 飽和 + 明度">

`EV3 Python可讀：2 點色相、飽和度與明度`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 同一取樣點的完整色相碼 = 百位讀值 × 100 + 低兩位讀值。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | S1 色相百位 | `0 ~ 2`<br>• S1 色相百位 = 讀取數值。 |
| `readCamera(1)[1]` | S1 色相低兩位 | `0 ~ 99`<br>• S1 色相低兩位 = 讀取數值。 |
| `readCamera(1)[2]` | S1 飽和度 | `0 ~ 100`<br>• S1 飽和度 = 讀取數值。 |
| `readCamera(1)[3]` | S1 明度 | `0 ~ 100`<br>• S1 明度 = 讀取數值。 |
| `readCamera(1)[4]` | S2 色相百位 | `0 ~ 2`<br>• S2 色相百位 = 讀取數值。 |
| `readCamera(1)[5]` | S2 色相低兩位 | `0 ~ 99`<br>• S2 色相低兩位 = 讀取數值。 |
| `readCamera(1)[6]` | S2 飽和度 | `0 ~ 100`<br>• S2 飽和度 = 讀取數值。 |
| `readCamera(1)[7]` | S2 明度 | `0 ~ 100`<br>• S2 明度 = 讀取數值。 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

`EV3 Python可讀：前 11 塊色相與總塊數`

::: info ℹ️ 補充資訊
- 色塊由左至右排列。請先讀總塊數，再使用前幾筆色相；色相 0 可以是紅色。
- 信標與遙控之間切換約需 1.1 秒。控制迴圈只讀需要的模式；不要為讀全部欄位反覆切換。相機模式仍由機身設定。
- -1 ~ -8 表示白至灰，-9 ~ -15 表示黑色；負值不套用色相換算。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 左起第 1 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[1]` | 左起第 2 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[2]` | 左起第 3 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[3]` | 左起第 4 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[4]` | 左起第 5 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[5]` | 左起第 6 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[6]` | 左起第 7 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(1)[7]` | 左起第 8 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(2)[0]` | 左起第 9 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(2)[1]` | 左起第 10 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(2)[2]` | 左起第 11 塊色相 | `-15 ~ 100`<br>• 讀取數值 ≥ 0 時，色相碼為 讀取數值 × 240 ÷ 100。 |
| `readCamera(2)[3]` | 色塊總數 | `0 ~ 18`<br>• 色塊總數 = 讀取數值。 |

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

`EV3 Python可讀：12 個循線讀值`

::: info ℹ️ 補充資訊
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標以近、中、遠的 1、2、4 相加。
- 本子模式辨識亮色地面上的黑線。
- 信標與遙控之間切換約需 1.1 秒。控制迴圈只讀需要的模式；不要為讀全部欄位反覆切換。相機模式仍由機身設定。
- 偏移負值表示線在左，正值表示線在右。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 近處偏移 | `-100 ~ 100`<br>• 近處偏移 = 讀取數值，保留正負號。 |
| `readCamera(1)[1]` | 中段偏移 | `-100 ~ 100`<br>• 中段偏移 = 讀取數值，保留正負號。 |
| `readCamera(1)[2]` | 遠處偏移 | `-100 ~ 100`<br>• 遠處偏移 = 讀取數值，保留正負號。 |
| `readCamera(1)[3]` | 線角度 | `-90 ~ 90°`<br>• 線角度 = 讀取數值，保留正負號。 |
| `readCamera(1)[4]` | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| `readCamera(1)[5]` | 路口類型與有線旗標 | `0 ~ 57`<br>• 路口類型 = 讀取數值 ÷ 10。<br>• 有線旗標 = 讀取數值 mod 10。 |
| `readCamera(1)[6]` | 路口距離 | `0 ~ 100`<br>• 路口距離 = 讀取數值。 |
| `readCamera(1)[7]` | 標記線色號 | `0 ~ 16`<br>• 標記線色號 = 讀取數值。 |
| `readCamera(2)[0]` | 近處線左緣 | `-100 ~ 100`<br>• 近處線左緣 = 讀取數值，保留正負號。 |
| `readCamera(2)[1]` | 近處線右緣 | `-100 ~ 100`<br>• 近處線右緣 = 讀取數值，保留正負號。 |
| `readCamera(2)[2]` | 遠處線寬 | `0 ~ 100`<br>• 遠處線寬 = 讀取數值。 |
| `readCamera(2)[3]` | 標記線累計條數 | `0 ~ 99`<br>• 標記線累計條數 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

`EV3 Python可讀：12 個循線讀值`

::: info ℹ️ 補充資訊
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標以近、中、遠的 1、2、4 相加。
- 本子模式辨識深色地面上的白線。
- 信標與遙控之間切換約需 1.1 秒。控制迴圈只讀需要的模式；不要為讀全部欄位反覆切換。相機模式仍由機身設定。
- 偏移負值表示線在左，正值表示線在右。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 近處偏移 | `-100 ~ 100`<br>• 近處偏移 = 讀取數值，保留正負號。 |
| `readCamera(1)[1]` | 中段偏移 | `-100 ~ 100`<br>• 中段偏移 = 讀取數值，保留正負號。 |
| `readCamera(1)[2]` | 遠處偏移 | `-100 ~ 100`<br>• 遠處偏移 = 讀取數值，保留正負號。 |
| `readCamera(1)[3]` | 線角度 | `-90 ~ 90°`<br>• 線角度 = 讀取數值，保留正負號。 |
| `readCamera(1)[4]` | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| `readCamera(1)[5]` | 路口類型與有線旗標 | `0 ~ 57`<br>• 路口類型 = 讀取數值 ÷ 10。<br>• 有線旗標 = 讀取數值 mod 10。 |
| `readCamera(1)[6]` | 路口距離 | `0 ~ 100`<br>• 路口距離 = 讀取數值。 |
| `readCamera(1)[7]` | 標記線色號 | `0 ~ 16`<br>• 標記線色號 = 讀取數值。 |
| `readCamera(2)[0]` | 近處線左緣 | `-100 ~ 100`<br>• 近處線左緣 = 讀取數值，保留正負號。 |
| `readCamera(2)[1]` | 近處線右緣 | `-100 ~ 100`<br>• 近處線右緣 = 讀取數值，保留正負號。 |
| `readCamera(2)[2]` | 遠處線寬 | `0 ~ 100`<br>• 遠處線寬 = 讀取數值。 |
| `readCamera(2)[3]` | 標記線累計條數 | `0 ~ 99`<br>• 標記線累計條數 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

`EV3 Python可讀：12 個循線讀值`

::: info ℹ️ 補充資訊
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標以近、中、遠的 1、2、4 相加。
- 使用色線前，先把線的顏色教成目標色 1。
- 信標與遙控之間切換約需 1.1 秒。控制迴圈只讀需要的模式；不要為讀全部欄位反覆切換。相機模式仍由機身設定。
- 偏移負值表示線在左，正值表示線在右。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 近處偏移 | `-100 ~ 100`<br>• 近處偏移 = 讀取數值，保留正負號。 |
| `readCamera(1)[1]` | 中段偏移 | `-100 ~ 100`<br>• 中段偏移 = 讀取數值，保留正負號。 |
| `readCamera(1)[2]` | 遠處偏移 | `-100 ~ 100`<br>• 遠處偏移 = 讀取數值，保留正負號。 |
| `readCamera(1)[3]` | 線角度 | `-90 ~ 90°`<br>• 線角度 = 讀取數值，保留正負號。 |
| `readCamera(1)[4]` | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| `readCamera(1)[5]` | 路口類型與有線旗標 | `0 ~ 57`<br>• 路口類型 = 讀取數值 ÷ 10。<br>• 有線旗標 = 讀取數值 mod 10。 |
| `readCamera(1)[6]` | 路口距離 | `0 ~ 100`<br>• 路口距離 = 讀取數值。 |
| `readCamera(1)[7]` | 標記線色號 | `0 ~ 16`<br>• 標記線色號 = 讀取數值。 |
| `readCamera(2)[0]` | 近處線左緣 | `-100 ~ 100`<br>• 近處線左緣 = 讀取數值，保留正負號。 |
| `readCamera(2)[1]` | 近處線右緣 | `-100 ~ 100`<br>• 近處線右緣 = 讀取數值，保留正負號。 |
| `readCamera(2)[2]` | 遠處線寬 | `0 ~ 100`<br>• 遠處線寬 = 讀取數值。 |
| `readCamera(2)[3]` | 標記線累計條數 | `0 ~ 99`<br>• 標記線累計條數 = 讀取數值。 |

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

`EV3 Python可讀：前 5 個物體的代碼、位置與物體總數`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 由下往上增加，最下方的 Y 為 1。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序，物體 1 最大。X、Y 是物體質心。形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 信標與遙控之間切換約需 1.1 秒。控制迴圈只讀需要的模式；不要為讀全部欄位反覆切換。相機模式仍由機身設定。
- 例如 13 = 色 1 的三角形；0 表示沒有物體。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 物體 1 代碼 | `0, 10 ~ 89`<br>• 物體 1 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 1 色號 = 讀取數值 ÷ 10。<br>• 物體 1 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 1 形狀碼 = 讀取數值 mod 10。 |
| `readCamera(1)[1]` | 物體 1 位置 | `0, 11 ~ 86`<br>• 物體 1 的 X = 讀取數值 ÷ 10。<br>• 物體 1 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[2]` | 物體 2 代碼 | `0, 10 ~ 89`<br>• 物體 2 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 2 色號 = 讀取數值 ÷ 10。<br>• 物體 2 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 2 形狀碼 = 讀取數值 mod 10。 |
| `readCamera(1)[3]` | 物體 2 位置 | `0, 11 ~ 86`<br>• 物體 2 的 X = 讀取數值 ÷ 10。<br>• 物體 2 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[4]` | 物體 3 代碼 | `0, 10 ~ 89`<br>• 物體 3 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 3 色號 = 讀取數值 ÷ 10。<br>• 物體 3 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 3 形狀碼 = 讀取數值 mod 10。 |
| `readCamera(1)[5]` | 物體 3 位置 | `0, 11 ~ 86`<br>• 物體 3 的 X = 讀取數值 ÷ 10。<br>• 物體 3 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[6]` | 物體 4 代碼 | `0, 10 ~ 89`<br>• 物體 4 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 4 色號 = 讀取數值 ÷ 10。<br>• 物體 4 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 4 形狀碼 = 讀取數值 mod 10。 |
| `readCamera(1)[7]` | 物體 4 位置 | `0, 11 ~ 86`<br>• 物體 4 的 X = 讀取數值 ÷ 10。<br>• 物體 4 的 Y = 讀取數值 mod 10。 |
| `readCamera(2)[0]` | 物體 5 代碼 | `0, 10 ~ 89`<br>• 物體 5 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 5 色號 = 讀取數值 ÷ 10。<br>• 物體 5 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 5 形狀碼 = 讀取數值 mod 10。 |
| `readCamera(2)[1]` | 物體 5 位置 | `0, 11 ~ 86`<br>• 物體 5 的 X = 讀取數值 ÷ 10。<br>• 物體 5 的 Y = 讀取數值 mod 10。 |
| `readCamera(2)[3]` | 物體總數 | `0 ~ 8`<br>• 物體總數 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

`EV3 Python可讀：前 2 個物體的詳細資料`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 由下往上增加，最下方的 Y 為 1。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序，物體 1 最大。X、Y 是物體質心。形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 此欄位經過縮減，換算後可能有 1 單位誤差。
- 例如 13 = 色 1 的三角形；0 表示沒有物體。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `readCamera(0)[0]` | 相機 Mode ID | `11 ~ 52`<br>• 相機 Mode ID = 讀取數值。<br>• 確認此值與本欄的 Mode ID 相同；此欄只讀取，不會切換相機。 |
| `readCamera(1)[0]` | 物體 1 代碼 | `0, 10 ~ 89`<br>• 物體 1 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 1 色號 = 讀取數值 ÷ 10。<br>• 物體 1 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 1 形狀碼 = 讀取數值 mod 10。 |
| `readCamera(1)[1]` | 物體 1 位置 | `0, 11 ~ 86`<br>• 物體 1 的 X = 讀取數值 ÷ 10。<br>• 物體 1 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[2]` | 物體 1 面積 | `0 ~ 100`<br>• 物體 1 面積 = 讀取數值。 |
| `readCamera(1)[3]` | 物體 1 角度 | `0 ~ 90`<br>• 物體 1 角度為 讀取數值 × 2，最大取 179°。 |
| `readCamera(1)[4]` | 物體 2 代碼 | `0, 10 ~ 89`<br>• 物體 2 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 2 色號 = 讀取數值 ÷ 10。<br>• 物體 2 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 2 形狀碼 = 讀取數值 mod 10。 |
| `readCamera(1)[5]` | 物體 2 位置 | `0, 11 ~ 86`<br>• 物體 2 的 X = 讀取數值 ÷ 10。<br>• 物體 2 的 Y = 讀取數值 mod 10。 |
| `readCamera(1)[6]` | 物體 2 面積 | `0 ~ 100`<br>• 物體 2 面積 = 讀取數值。 |
| `readCamera(1)[7]` | 物體 2 角度 | `0 ~ 90`<br>• 物體 2 角度為 讀取數值 × 2，最大取 179°。 |

</CamModeSection>

</CamModeAccordion>

## 03 / 進階控制-前置作業與函數功能說明

<DownloadButton href="/programs/Cam/ev3-pybricks/MBC_UniCam_EV3.py" download="MBC_UniCam_EV3.py" label="EV3 函式庫" />

### ✔ 函數設定
1. 點選上方 <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>EV3 函式庫</code> 按鈕下載 `MBC 神攝手視覺感應器 Pybricks - EV3 函式庫`{.code-blue}。
2. 確認函式庫檔名為 `MBC_UniCam_EV3.py`{.code-blue}。
3. 使用 Pybricks 時，在 `file explorer` 工作區點選 `import a file` 匯入 `MBC_UniCam_EV3.py`；使用 EV3 MicroPython 專案時，將函式庫複製到專案資料夾。
4. 將 `MBC_UniCam_EV3.py` 與主程式放在同一個專案資料夾。
5. 將相機接到感應器連接埠 S1，並在相機機身選擇相同 Mode ID。
6. 開啟你的 Pybricks 程式，輸入函式庫匯入與設定程式碼，如下。其餘底盤與馬達感應器初始化程式碼則接續放置。
```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam
cam = UniCam(Port.S1, mode=11)
```

### ✔ 函數功能說明

#### set up
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `from MBC_UniCam_EV3 import UniCam`{.code-blue} | 導入函式庫 | `UniCam`<br>• 從 `MBC_UniCam_EV3.py` 匯入 `UniCam` 類別。檔名與類別名稱的大小寫必須完全相同。 |
| `cam = UniCam(Port.S1, mode=11)`{.code-blue} | 函式庫設定 | `UniCam`<br>• `cam` 為後續數值讀取時使用的名稱。`Port.S1` 為感應器連接埠 1。`mode=11` 為相機 Mode ID。請在相機機身選擇相同模式；此參數不會切換相機模式。 |

#### 感應器狀態與裝置資訊

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.mode_number()`{.code-blue} | 程式設定的 Mode ID | `11 ~ 52`<br>• 回傳設定的 Mode ID。建立物件時未指定 mode 才讀取通訊模式 0；指定 mode 時不會驗證機身選單。 |
| `cam.sensor_ok()`{.code-blue} | 讀取狀態 | `True / False`<br>• 回傳最近一次是否成功讀取。 |
| `cam.device_id()`{.code-blue} | 裝置資訊 | `tuple[3]`<br>• 使用通訊模式 5，回傳 `(裝置位址, 硬體代碼, 韌體版本字)`，例如 `(76, 3, 100)`。 |
| `cam.is_unicam()`{.code-blue} | 感應器識別 | `True / False`<br>• 依通訊模式 5 的裝置資訊判斷是否為神攝手。 |

<CamModeAccordion namespace="advanced">

### ✔ 相機模式概覽

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

`函式庫可讀：12 色位置`

::: info ℹ️ 補充資訊
- `xy()`、`x()`、`y()` 使用像素分格中心，X 向右、Y 向下增加；`(0, 0)` 表示未找到。`grid()` 回傳 `8 × 6` 分格，Y 由下往上增加。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
- 部分欄位另使用通訊模式 `2` (遙控)。切換讀取模式需要約 1.1 秒，請依程式需要查詢。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `11`{.code-green}，再將程式的 `mode=11` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=11)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | 指定顏色的位置 X、Y | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• 回傳 `(X, Y)`，單位為像素。<br>• 參數範圍 `1 ~ 12`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.x(1)`{.code-blue} | 指定顏色的 X | `0, 10 ~ 150`<br>• 回傳指定顏色的像素 X。<br>• 參數範圍 `1 ~ 12`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.y(1)`{.code-blue} | 指定顏色的 Y | `0, 9 ~ 109`<br>• 回傳指定顏色的像素 Y。<br>• 參數範圍 `1 ~ 12`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.found(1)`{.code-blue} | 是否找到指定顏色 | `True / False`<br>• `True` 表示找到，`False` 表示未找到。<br>• 參數範圍 `1 ~ 12`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.grid(1)`{.code-blue} | 指定顏色的分格位置 | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• 回傳原始 `(X, Y)` 分格位置，Y 由下往上增加。<br>• 參數範圍 `1 ~ 12`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.max_color()`{.code-blue} | 可讀取的顏色數 | `12`<br>• 回傳本模式可讀取位置的顏色數。 |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`函式庫可讀：8 色位置`

::: info ℹ️ 補充資訊
- `xy()`、`x()`、`y()` 使用像素分格中心，X 向右、Y 向下增加；`(0, 0)` 表示未找到。`grid()` 回傳 `8 × 6` 分格，Y 由下往上增加。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `12`{.code-green}，再將程式的 `mode=12` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=12)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | 指定顏色的位置 X、Y | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• 回傳 `(X, Y)`，單位為像素。<br>• 參數範圍 `1 ~ 8`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.x(1)`{.code-blue} | 指定顏色的 X | `0, 10 ~ 150`<br>• 回傳指定顏色的像素 X。<br>• 參數範圍 `1 ~ 8`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.y(1)`{.code-blue} | 指定顏色的 Y | `0, 9 ~ 109`<br>• 回傳指定顏色的像素 Y。<br>• 參數範圍 `1 ~ 8`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.found(1)`{.code-blue} | 是否找到指定顏色 | `True / False`<br>• `True` 表示找到，`False` 表示未找到。<br>• 參數範圍 `1 ~ 8`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.grid(1)`{.code-blue} | 指定顏色的分格位置 | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• 回傳原始 `(X, Y)` 分格位置，Y 由下往上增加。<br>• 參數範圍 `1 ~ 8`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.max_color()`{.code-blue} | 可讀取的顏色數 | `8`<br>• 回傳本模式可讀取位置的顏色數。 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`函式庫可讀：4 色位置`

::: info ℹ️ 補充資訊
- `xy()`、`x()`、`y()` 使用像素分格中心，X 向右、Y 向下增加；`(0, 0)` 表示未找到。`grid()` 回傳 `8 × 6` 分格，Y 由下往上增加。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `13`{.code-green}，再將程式的 `mode=13` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=13)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | 指定顏色的位置 X、Y | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• 回傳 `(X, Y)`，單位為像素。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.x(1)`{.code-blue} | 指定顏色的 X | `0, 10 ~ 150`<br>• 回傳指定顏色的像素 X。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.y(1)`{.code-blue} | 指定顏色的 Y | `0, 9 ~ 109`<br>• 回傳指定顏色的像素 Y。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.found(1)`{.code-blue} | 是否找到指定顏色 | `True / False`<br>• `True` 表示找到，`False` 表示未找到。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.grid(1)`{.code-blue} | 指定顏色的分格位置 | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• 回傳原始 `(X, Y)` 分格位置，Y 由下往上增加。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.area(1)`{.code-blue} | 指定顏色的面積 | `0 ~ 100`<br>• 回傳指定顏色的面積。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.max_color()`{.code-blue} | 可讀取的顏色數 | `4`<br>• 回傳本模式可讀取位置的顏色數。 |

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`函式庫可讀：2 色位置`

::: info ℹ️ 補充資訊
- `xy()`、`x()`、`y()` 使用像素分格中心，X 向右、Y 向下增加；`(0, 0)` 表示未找到。`grid()` 回傳 `8 × 6` 分格，Y 由下往上增加。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `14`{.code-green}，再將程式的 `mode=14` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=14)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.xy(1)`{.code-blue} | 指定顏色的位置 X、Y | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• 回傳 `(X, Y)`，單位為像素。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.x(1)`{.code-blue} | 指定顏色的 X | `0, 10 ~ 150`<br>• 回傳指定顏色的像素 X。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.y(1)`{.code-blue} | 指定顏色的 Y | `0, 9 ~ 109`<br>• 回傳指定顏色的像素 Y。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.found(1)`{.code-blue} | 是否找到指定顏色 | `True / False`<br>• `True` 表示找到，`False` 表示未找到。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.grid(1)`{.code-blue} | 指定顏色的分格位置 | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• 回傳原始 `(X, Y)` 分格位置，Y 由下往上增加。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.area(1)`{.code-blue} | 指定顏色的面積 | `0 ~ 100`<br>• 回傳指定顏色的面積。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.size(1)`{.code-blue} | 指定顏色的寬、高 | `W: 0, 10 ~ 150 / H: 0, 10 ~ 110`<br>• 回傳 `(寬, 高)`，為原始分格換算的像素大小。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.count(1)`{.code-blue} | 指定顏色的色塊數量 | `0 ~ 15`<br>• 回傳該目標色的色塊數量。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號；範例中的 `1` 表示第 1 個。 |
| `cam.max_color()`{.code-blue} | 可讀取的顏色數 | `2`<br>• 回傳本模式可讀取位置的顏色數。 |

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`函式庫可讀：12 個取樣點`

::: info ℹ️ 補充資訊
- 請先在相機設定取樣點位置。未設定的點回傳 0；色相 0 也可以代表紅色。
- `hsv()` 回傳 `(H, None, None)`。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
- 部分欄位另使用通訊模式 `2` (遙控)。切換讀取模式需要約 1.1 秒，請依程式需要查詢。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `21`{.code-green}，再將程式的 `mode=21` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=21)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | 指定取樣點的色相 | `0 ~ 255`<br>• 回傳指定取樣點的色相。<br>• 參數範圍 `1 ~ 12`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.hsv(1)`{.code-blue} | 指定取樣點的 HSV | `tuple[3]`<br>• 回傳 `(H, S, V)`。<br>• 參數範圍 `1 ~ 12`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.color(1)`{.code-blue} | 指定取樣點的顏色名稱 | `str`<br>• 回傳 `red`、`orange`、`yellow`、`green`、`cyan`、`blue`、`purple`、`white` 或 `black`。<br>• 參數範圍 `1 ~ 12`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.max_point()`{.code-blue} | 可讀取的取樣點數 | `12`<br>• 回傳本模式可讀取的取樣點數。 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相 + 飽和">

`函式庫可讀：4 個取樣點`

::: info ℹ️ 補充資訊
- 請先在相機設定取樣點位置。未設定的點回傳 0；色相 0 也可以代表紅色。
- 飽和度與明度以 10 為間隔，範圍為 `0 ~ 90`；函式庫已完成各分量拆解。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `22`{.code-green}，再將程式的 `mode=22` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=22)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | 指定取樣點的色相 | `0 ~ 255`<br>• 回傳指定取樣點的色相。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.sat(1)`{.code-blue} | 指定取樣點的飽和度 | `0 ~ 90`<br>• 回傳指定取樣點的飽和度。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.val(1)`{.code-blue} | 指定取樣點的明度 | `0 ~ 90`<br>• 回傳指定取樣點的明度。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.hsv(1)`{.code-blue} | 指定取樣點的 HSV | `tuple[3]`<br>• 回傳 `(H, S, V)`。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.color(1)`{.code-blue} | 指定取樣點的顏色名稱 | `str`<br>• 回傳 `red`、`orange`、`yellow`、`green`、`cyan`、`blue`、`purple`、`white` 或 `black`。<br>• 參數範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.max_point()`{.code-blue} | 可讀取的取樣點數 | `4`<br>• 回傳本模式可讀取的取樣點數。 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相 + 飽和 + 明度">

`函式庫可讀：2 個取樣點`

::: info ℹ️ 補充資訊
- 請先在相機設定取樣點位置。未設定的點回傳 0；色相 0 也可以代表紅色。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `23`{.code-green}，再將程式的 `mode=23` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=23)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.hue(1)`{.code-blue} | 指定取樣點的色相 | `0 ~ 255`<br>• 回傳指定取樣點的色相。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.sat(1)`{.code-blue} | 指定取樣點的飽和度 | `0 ~ 100`<br>• 回傳指定取樣點的飽和度。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.val(1)`{.code-blue} | 指定取樣點的明度 | `0 ~ 100`<br>• 回傳指定取樣點的明度。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.hsv(1)`{.code-blue} | 指定取樣點的 HSV | `tuple[3]`<br>• 回傳 `(H, S, V)`。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.color(1)`{.code-blue} | 指定取樣點的顏色名稱 | `str`<br>• 回傳 `red`、`orange`、`yellow`、`green`、`cyan`、`blue`、`purple`、`white` 或 `black`。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的取樣點編號；範例中的 `1` 表示第 1 個。 |
| `cam.max_point()`{.code-blue} | 可讀取的取樣點數 | `2`<br>• 回傳本模式可讀取的取樣點數。 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

`函式庫可讀：11 塊色序`

::: info ℹ️ 補充資訊
- 色塊由左至右排序；色相 0 可以代表紅色，請依清單長度判斷有效資料。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
- 部分欄位另使用通訊模式 `2` (遙控)。切換讀取模式需要約 1.1 秒，請依程式需要查詢。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `30`{.code-green}，再將程式的 `mode=30` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=30)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.order()`{.code-blue} | 由左至右的色序 | `list[0 ~ 11]`<br>• 回傳由左至右的色相清單，各色相範圍為 `0 ~ 255`。 |
| `cam.total()`{.code-blue} | 色塊總數 | `0 ~ 18`<br>• 回傳畫面中的總塊數，可能多於色序清單可讀取的 11 塊。 |

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

`函式庫可讀：循線與路口資料`

::: info ℹ️ 補充資訊
- 偏移左負右正，角度保留正負號。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
- 部分欄位另使用通訊模式 `2` (遙控)。切換讀取模式需要約 1.1 秒，請依程式需要查詢。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `41`{.code-green}，再將程式的 `mode=41` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=41)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.near()`{.code-blue} | 近處偏移 | `-100 ~ 100`<br>• 回傳近處線條偏移。 |
| `cam.mid()`{.code-blue} | 中段偏移 | `-100 ~ 100`<br>• 回傳中段線條偏移。 |
| `cam.far()`{.code-blue} | 遠處偏移 | `-100 ~ 100`<br>• 回傳遠處線條偏移。 |
| `cam.angle()`{.code-blue} | 循線角度 | `-90 ~ 90`<br>• 回傳線條角度。 |
| `cam.width()`{.code-blue} | 近處線寬 | `0 ~ 100`<br>• 回傳近處線寬。 |
| `cam.flags()`{.code-blue} | 有線旗標 | `0 ~ 7`<br>• 有線旗標 = 近 1 + 中 2 + 遠 4。 |
| `cam.junction()`{.code-blue} | 路口類型 | `0 ~ 5`<br>• 0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。 |
| `cam.junction_dist()`{.code-blue} | 路口距離 | `0 ~ 100`<br>• 回傳路口距離。 |
| `cam.edges()`{.code-blue} | 線條左緣、右緣 | `-100 ~ 100`<br>• 回傳 `(左緣, 右緣)`。 |
| `cam.far_width()`{.code-blue} | 遠處線寬 | `0 ~ 100`<br>• 回傳遠處線寬。 |
| `cam.marker()`{.code-blue} | 標記色號與累計 | `Color: 0 ~ 16 / Count: 0 ~ 99`<br>• 回傳 `(標記色號, 累計條數)`。 |
| `cam.line_all()`{.code-blue} | 全部循線資料 | `tuple[13]`<br>• 依序回傳近、中、遠偏移、角度、近線寬、旗標、路口類型、路口距離、左緣、右緣、遠線寬、標記色號、標記累計。 |

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

`函式庫可讀：循線與路口資料`

::: info ℹ️ 補充資訊
- 偏移左負右正，角度保留正負號。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
- 部分欄位另使用通訊模式 `2` (遙控)。切換讀取模式需要約 1.1 秒，請依程式需要查詢。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `42`{.code-green}，再將程式的 `mode=42` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=42)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.near()`{.code-blue} | 近處偏移 | `-100 ~ 100`<br>• 回傳近處線條偏移。 |
| `cam.mid()`{.code-blue} | 中段偏移 | `-100 ~ 100`<br>• 回傳中段線條偏移。 |
| `cam.far()`{.code-blue} | 遠處偏移 | `-100 ~ 100`<br>• 回傳遠處線條偏移。 |
| `cam.angle()`{.code-blue} | 循線角度 | `-90 ~ 90`<br>• 回傳線條角度。 |
| `cam.width()`{.code-blue} | 近處線寬 | `0 ~ 100`<br>• 回傳近處線寬。 |
| `cam.flags()`{.code-blue} | 有線旗標 | `0 ~ 7`<br>• 有線旗標 = 近 1 + 中 2 + 遠 4。 |
| `cam.junction()`{.code-blue} | 路口類型 | `0 ~ 5`<br>• 0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。 |
| `cam.junction_dist()`{.code-blue} | 路口距離 | `0 ~ 100`<br>• 回傳路口距離。 |
| `cam.edges()`{.code-blue} | 線條左緣、右緣 | `-100 ~ 100`<br>• 回傳 `(左緣, 右緣)`。 |
| `cam.far_width()`{.code-blue} | 遠處線寬 | `0 ~ 100`<br>• 回傳遠處線寬。 |
| `cam.marker()`{.code-blue} | 標記色號與累計 | `Color: 0 ~ 16 / Count: 0 ~ 99`<br>• 回傳 `(標記色號, 累計條數)`。 |
| `cam.line_all()`{.code-blue} | 全部循線資料 | `tuple[13]`<br>• 依序回傳近、中、遠偏移、角度、近線寬、旗標、路口類型、路口距離、左緣、右緣、遠線寬、標記色號、標記累計。 |

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

`函式庫可讀：循線與路口資料`

::: info ℹ️ 補充資訊
- 偏移左負右正，角度保留正負號。
- 請先將線的顏色教成目標色 1。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
- 部分欄位另使用通訊模式 `2` (遙控)。切換讀取模式需要約 1.1 秒，請依程式需要查詢。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `43`{.code-green}，再將程式的 `mode=43` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=43)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.near()`{.code-blue} | 近處偏移 | `-100 ~ 100`<br>• 回傳近處線條偏移。 |
| `cam.mid()`{.code-blue} | 中段偏移 | `-100 ~ 100`<br>• 回傳中段線條偏移。 |
| `cam.far()`{.code-blue} | 遠處偏移 | `-100 ~ 100`<br>• 回傳遠處線條偏移。 |
| `cam.angle()`{.code-blue} | 循線角度 | `-90 ~ 90`<br>• 回傳線條角度。 |
| `cam.width()`{.code-blue} | 近處線寬 | `0 ~ 100`<br>• 回傳近處線寬。 |
| `cam.flags()`{.code-blue} | 有線旗標 | `0 ~ 7`<br>• 有線旗標 = 近 1 + 中 2 + 遠 4。 |
| `cam.junction()`{.code-blue} | 路口類型 | `0 ~ 5`<br>• 0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。 |
| `cam.junction_dist()`{.code-blue} | 路口距離 | `0 ~ 100`<br>• 回傳路口距離。 |
| `cam.edges()`{.code-blue} | 線條左緣、右緣 | `-100 ~ 100`<br>• 回傳 `(左緣, 右緣)`。 |
| `cam.far_width()`{.code-blue} | 遠處線寬 | `0 ~ 100`<br>• 回傳遠處線寬。 |
| `cam.marker()`{.code-blue} | 標記色號與累計 | `Color: 0 ~ 16 / Count: 0 ~ 99`<br>• 回傳 `(標記色號, 累計條數)`。 |
| `cam.line_all()`{.code-blue} | 全部循線資料 | `tuple[13]`<br>• 依序回傳近、中、遠偏移、角度、近線寬、旗標、路口類型、路口距離、左緣、右緣、遠線寬、標記色號、標記累計。 |

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

`函式庫可讀：5 個物體`

::: info ℹ️ 補充資訊
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序。代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。
- `object_xy()` 使用像素分格中心，Y 向下增加；`object_grid()` 回傳 `8 × 6` 分格，Y 由下往上增加。`(0, 0)` 表示沒有物體。
- 形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
- 部分欄位另使用通訊模式 `2` (遙控)。切換讀取模式需要約 1.1 秒，請依程式需要查詢。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `51`{.code-green}，再將程式的 `mode=51` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=51)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.max_object()`{.code-blue} | 可讀取的物體數 | `5`<br>• 回傳本模式可讀取的物體數。 |
| `cam.object_count()`{.code-blue} | 物體總數 | `0 ~ 8`<br>• 回傳畫面中的物體總數。 |
| `cam.object(1)`{.code-blue} | 指定物體的代碼 | `0, 10 ~ 89`<br>• 代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。<br>• 參數範圍 `1 ~ 5`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_found(1)`{.code-blue} | 是否找到指定物體 | `True / False`<br>• `True` 表示找到，`False` 表示未找到。<br>• 參數範圍 `1 ~ 5`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_color(1)`{.code-blue} | 指定物體的色號 | `0 ~ 8`<br>• 回傳目標色號；0 表示沒有物體。<br>• 參數範圍 `1 ~ 5`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_shape(1)`{.code-blue} | 指定物體的形狀 | `0 ~ 9`<br>• 回傳形狀碼；先以 `object_found()` 判斷是否有物體。<br>• 參數範圍 `1 ~ 5`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_grid(1)`{.code-blue} | 指定物體的分格位置 | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• 回傳原始 `(X, Y)` 分格質心，Y 由下往上增加。<br>• 參數範圍 `1 ~ 5`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_xy(1)`{.code-blue} | 指定物體的像素位置 | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• 回傳 `(X, Y)` 像素質心。<br>• 參數範圍 `1 ~ 5`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

`函式庫可讀：2 個物體`

::: info ℹ️ 補充資訊
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序。代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。
- `object_xy()` 使用像素分格中心，Y 向下增加；`object_grid()` 回傳 `8 × 6` 分格，Y 由下往上增加。`(0, 0)` 表示沒有物體。
- 形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 主要資料使用 EV3 紅外線通訊模式 `1` (信標)。
:::

**Mode ID 設定**

請先將相機機身選單設為 Mode ID `52`{.code-green}，再將程式的 `mode=52` 設為相同編號。EV3 的此參數只選擇資料解碼方式，不會切換相機模式。

```python
from pybricks.parameters import Port
from MBC_UniCam_EV3 import UniCam

cam = UniCam(Port.S1, mode=52)
```

**子模式函式功能說明**

| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `cam.max_object()`{.code-blue} | 可讀取的物體數 | `2`<br>• 回傳本模式可讀取的物體數。 |
| `cam.object(1)`{.code-blue} | 指定物體的代碼 | `0, 10 ~ 89`<br>• 代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_found(1)`{.code-blue} | 是否找到指定物體 | `True / False`<br>• `True` 表示找到，`False` 表示未找到。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_color(1)`{.code-blue} | 指定物體的色號 | `0 ~ 8`<br>• 回傳目標色號；0 表示沒有物體。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_shape(1)`{.code-blue} | 指定物體的形狀 | `0 ~ 9`<br>• 回傳形狀碼；先以 `object_found()` 判斷是否有物體。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_grid(1)`{.code-blue} | 指定物體的分格位置 | `X: 0 ~ 8 / Y: 0 ~ 6`<br>• 回傳原始 `(X, Y)` 分格質心，Y 由下往上增加。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_xy(1)`{.code-blue} | 指定物體的像素位置 | `X: 0, 10 ~ 150 / Y: 0, 9 ~ 109`<br>• 回傳 `(X, Y)` 像素質心。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_area(1)`{.code-blue} | 指定物體的面積 | `0 ~ 100`<br>• 回傳指定物體的面積。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |
| `cam.object_angle(1)`{.code-blue} | 指定物體的角度 | `0 ~ 179`<br>• 回傳長邊角度；向右為 0，向畫面下方旋轉為正。函式庫已完成兩倍換算。<br>• 參數範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號；範例中的 `1` 表示第 1 個。 |

</CamModeSection>

</CamModeAccordion>

## 04 / 範例程式

### ▸ 基礎控制

#### ▸ 讀取目標色 1 的位置與面積

先教目標色 1，再把相機切到 13 (顏色追蹤 - ③ 標準)。

```python
#!/usr/bin/env pybricks-micropython
from pybricks.parameters import Port
try:
    from pybricks.iodevices import Ev3devSensor
except ImportError:
    from pybricks.iodevices import LUMPDevice
    cam = LUMPDevice(Port.S1)
    def readCamera(mode):
        return cam.read(mode)
else:
    cam = Ev3devSensor(Port.S1)
    def readCamera(mode):
        names = {0: "IR-PROX", 1: "IR-SEEK", 2: "IR-REMOTE", 5: "IR-CAL"}
        return cam.read(names[mode])

from pybricks.tools import wait
if readCamera(0)[0] != 13:
    raise RuntimeError("Select Color Tracking Standard (13)")

while True:
    position, area = readCamera(1)[:2]
    if position:
        x, y = divmod(position, 10)
        print(x, y, area)
    else:
        print("No target")
    wait(100)
```

改讀物體詳細 (52)時，將開頭的模式檢查改成 52。信標前四格依序為代碼、位置、面積、半角度。代碼非 0 時，用 divmod(code, 10) 取得色號與形狀，位置也用 divmod(position, 10) 拆開。

#### ▸ 物體詳細模式讀取兩個物體

在相機選 Mode ID 52。此程式每輪只呼叫一次 readCamera(1)，兩個物體各占四格。

```python
#!/usr/bin/env pybricks-micropython
from pybricks.parameters import Port
try:
    from pybricks.iodevices import Ev3devSensor
except ImportError:
    from pybricks.iodevices import LUMPDevice
    cam = LUMPDevice(Port.S1)
    def readCamera(mode):
        return cam.read(mode)
else:
    cam = Ev3devSensor(Port.S1)
    def readCamera(mode):
        names = {0: "IR-PROX", 1: "IR-SEEK", 2: "IR-REMOTE", 5: "IR-CAL"}
        return cam.read(names[mode])

from pybricks.tools import wait
if readCamera(0)[0] != 52:
    raise RuntimeError("Select Object Details (52)")

while True:
    values = readCamera(1)
    for index in range(2):
        start = index * 4
        code, position, area, half_angle = values[start:start + 4]
        if code == 0:
            print(index + 1, "No object")
            continue
        color, shape = divmod(code, 10)
        x, y = divmod(position, 10)
        angle = min(179, half_angle * 2)
        print(index + 1, color, shape, x, y, area, angle)
    wait(100)
```

## 05 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
