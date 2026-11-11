# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | LEGO® MINDSTORMS® EV3 |
| 感應器 | MBC 神攝手視覺感應器 (EV3 版) |
| 程式語言 | Pybricks Python / EV3 MicroPython v2 |

### ✔ 事前準備

1. 啟動 EV3 與 Pybricks Code (v4) 或 VS Code 的 EV3 MicroPython v2 專案。
2. 確認主機、相機與程式環境運作正常。
3. 設定感應器模式，確認與程式設定模式相同。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
使用 LUMPDevice(Port.S1) 讀取相機。cam.read(0)[0] 是相機 modeID；cam.read(1) 回傳八個信標值，cam.read(2) 回傳四個遙控值。表格列出實際索引，迴圈內先讀入變數再取欄位。相機模式由機身選單設定。
:::

<CamModeAccordion>

### ✔ 相機模式概覽

MBC 神攝手視覺感應器共有 5 大主模式，各主模式下還有細分多個子模式，請參考下表說明與 modeID 編號，查找程式說明。

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

最多讀取 12 色的位置。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | P1 |
| `cam.read(1)[1]` | P2 |
| `cam.read(1)[2]` | P3 |
| `cam.read(1)[3]` | P4 |
| `cam.read(1)[4]` | P5 |
| `cam.read(1)[5]` | P6 |
| `cam.read(1)[6]` | P7 |
| `cam.read(1)[7]` | P8 |
| `cam.read(2)[0]` | P9 |
| `cam.read(2)[1]` | P10 |
| `cam.read(2)[2]` | P11 |
| `cam.read(2)[3]` | P12 |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

最多讀取 8 色的位置。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | P1 |
| `cam.read(1)[1]` | P2 |
| `cam.read(1)[2]` | P3 |
| `cam.read(1)[3]` | P4 |
| `cam.read(1)[4]` | P5 |
| `cam.read(1)[5]` | P6 |
| `cam.read(1)[6]` | P7 |
| `cam.read(1)[7]` | P8 |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

最多讀取 4 色的位置與面積。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | P1 |
| `cam.read(1)[1]` | Area1 |
| `cam.read(1)[2]` | P2 |
| `cam.read(1)[3]` | Area2 |
| `cam.read(1)[4]` | P3 |
| `cam.read(1)[5]` | Area3 |
| `cam.read(1)[6]` | P4 |
| `cam.read(1)[7]` | Area4 |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

最多讀取 2 色的位置與寬高，另可讀取數量與面積。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | P1 |
| `cam.read(1)[1]` | W1×10+H1 |
| `cam.read(1)[2]` | Count1 |
| `cam.read(1)[3]` | Area1 |
| `cam.read(1)[4]` | P2 |
| `cam.read(1)[5]` | W2×10+H2 |
| `cam.read(1)[6]` | Count2 |
| `cam.read(1)[7]` | Area2 |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

最多讀取 12 個取樣點的色相，精度依下方欄位格式。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Hue1 (EV3) |
| `cam.read(1)[1]` | Hue2 (EV3) |
| `cam.read(1)[2]` | Hue3 (EV3) |
| `cam.read(1)[3]` | Hue4 (EV3) |
| `cam.read(1)[4]` | Hue5 (EV3) |
| `cam.read(1)[5]` | Hue6 (EV3) |
| `cam.read(1)[6]` | Hue7 (EV3) |
| `cam.read(1)[7]` | Hue8 (EV3) |
| `cam.read(2)[0]` | Hue9 (EV3) |
| `cam.read(2)[1]` | Hue10 (EV3) |
| `cam.read(2)[2]` | Hue11 (EV3) |
| `cam.read(2)[3]` | Hue12 (EV3) |

Hue (EV3) 的非負值為 0–100，約以讀值×240÷100 還原色相。−1～−8 表示白到灰，−9～−15 為黑。

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相＋飽和">

最多讀取 4 個取樣點的色相與飽和，精度依下方欄位格式。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Hue1 (EV3) |
| `cam.read(1)[1]` | floor(Sat1÷10)×10+floor(Val1÷10) |
| `cam.read(1)[2]` | Hue2 (EV3) |
| `cam.read(1)[3]` | floor(Sat2÷10)×10+floor(Val2÷10) |
| `cam.read(1)[4]` | Hue3 (EV3) |
| `cam.read(1)[5]` | floor(Sat3÷10)×10+floor(Val3÷10) |
| `cam.read(1)[6]` | Hue4 (EV3) |
| `cam.read(1)[7]` | floor(Sat4÷10)×10+floor(Val4÷10) |

飽和與明度以十位數合併。讀值整除 10 和取餘數後，各乘以 10 為近似值。

Hue (EV3) 的非負值為 0–100，約以讀值×240÷100 還原色相。−1～−8 表示白到灰，−9～−15 為黑。

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相＋飽和＋明度">

最多讀取 2 個取樣點的色相、飽和與明度，精度依下方欄位格式。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | floor(Hue1÷100) |
| `cam.read(1)[1]` | Hue1 % 100 |
| `cam.read(1)[2]` | Sat1 |
| `cam.read(1)[3]` | Val1 |
| `cam.read(1)[4]` | floor(Hue2÷100) |
| `cam.read(1)[5]` | Hue2 % 100 |
| `cam.read(1)[6]` | Sat2 |
| `cam.read(1)[7]` | Val2 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

讀取由左至右前 11 塊色相與總塊數。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Hue1 (EV3) |
| `cam.read(1)[1]` | Hue2 (EV3) |
| `cam.read(1)[2]` | Hue3 (EV3) |
| `cam.read(1)[3]` | Hue4 (EV3) |
| `cam.read(1)[4]` | Hue5 (EV3) |
| `cam.read(1)[5]` | Hue6 (EV3) |
| `cam.read(1)[6]` | Hue7 (EV3) |
| `cam.read(1)[7]` | Hue8 (EV3) |
| `cam.read(2)[0]` | Hue9 (EV3) |
| `cam.read(2)[1]` | Hue10 (EV3) |
| `cam.read(2)[2]` | Hue11 (EV3) |
| `cam.read(2)[3]` | Total |

Hue (EV3) 的非負值為 0–100，約以讀值×240÷100 還原色相。−1～−8 表示白到灰，−9～−15 為黑。

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

色相 0 可以代表紅色，請以總塊數判斷前幾格有效。

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

信標與遙控模式合計提供 12 個循線值。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Near offset |
| `cam.read(1)[1]` | Middle offset |
| `cam.read(1)[2]` | Far offset |
| `cam.read(1)[3]` | Angle |
| `cam.read(1)[4]` | Near width % |
| `cam.read(1)[5]` | Junction×10+Flags |
| `cam.read(1)[6]` | Junction distance % |
| `cam.read(1)[7]` | Marker color |
| `cam.read(2)[0]` | Left edge |
| `cam.read(2)[1]` | Right edge |
| `cam.read(2)[2]` | Far width % |
| `cam.read(2)[3]` | Marker count |

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

信標與遙控模式合計提供 12 個循線值。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Near offset |
| `cam.read(1)[1]` | Middle offset |
| `cam.read(1)[2]` | Far offset |
| `cam.read(1)[3]` | Angle |
| `cam.read(1)[4]` | Near width % |
| `cam.read(1)[5]` | Junction×10+Flags |
| `cam.read(1)[6]` | Junction distance % |
| `cam.read(1)[7]` | Marker color |
| `cam.read(2)[0]` | Left edge |
| `cam.read(2)[1]` | Right edge |
| `cam.read(2)[2]` | Far width % |
| `cam.read(2)[3]` | Marker count |

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

信標與遙控模式合計提供 12 個循線值。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Near offset |
| `cam.read(1)[1]` | Middle offset |
| `cam.read(1)[2]` | Far offset |
| `cam.read(1)[3]` | Angle |
| `cam.read(1)[4]` | Near width % |
| `cam.read(1)[5]` | Junction×10+Flags |
| `cam.read(1)[6]` | Junction distance % |
| `cam.read(1)[7]` | Marker color |
| `cam.read(2)[0]` | Left edge |
| `cam.read(2)[1]` | Right edge |
| `cam.read(2)[2]` | Far width % |
| `cam.read(2)[3]` | Marker count |

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

讀取前 5 個物體的代碼與位置，另可讀物體總數。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Code1 |
| `cam.read(1)[1]` | P1 |
| `cam.read(1)[2]` | Code2 |
| `cam.read(1)[3]` | P2 |
| `cam.read(1)[4]` | Code3 |
| `cam.read(1)[5]` | P3 |
| `cam.read(1)[6]` | Code4 |
| `cam.read(1)[7]` | P4 |
| `cam.read(2)[0]` | Code5 |
| `cam.read(2)[1]` | P5 |
| `cam.read(2)[3]` | Total |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

讀取前 2 個物體的詳細資料，欄位如下。

| Pybricks Python | 回傳值 |
| --- | --- |
| `cam.read(0)[0]` | modeID |
| `cam.read(1)[0]` | Code1 |
| `cam.read(1)[1]` | P1 |
| `cam.read(1)[2]` | Area1 |
| `cam.read(1)[3]` | floor((Angle1+1)÷2) |
| `cam.read(1)[4]` | Code2 |
| `cam.read(1)[5]` | P2 |
| `cam.read(1)[6]` | Area2 |
| `cam.read(1)[7]` | floor((Angle2+1)÷2) |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

角度欄位讀值乘以 2 後最多取 179°，誤差約 1°。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

</CamModeSection>

</CamModeAccordion>

## 03 / 範例程式

### ✔ 讀取目標色 1 的位置與面積

先教目標色 1，再把相機切到 13 (顏色追蹤 - ③ 標準)。

```python
#!/usr/bin/env pybricks-micropython
from pybricks.iodevices import LUMPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = LUMPDevice(Port.S1)
if cam.read(0)[0] != 13:
    raise RuntimeError("Select Color Tracking Standard (13)")

while True:
    position, area = cam.read(1)[:2]
    if position:
        x, y = divmod(position, 10)
        print(x, y, area)
    else:
        print("No target")
    wait(100)
```

改讀物體詳細 (52)時，將開頭的模式檢查改成 52。信標前四格依序為代碼、位置、面積、半角度。代碼非 0 時，用 divmod(code, 10) 取得色號與形狀，位置也用 divmod(position, 10) 拆開。

### ✔ 物體詳細模式讀取兩個物體

在相機選 modeID 52。此程式每輪只呼叫一次 cam.read(1)，兩個物體各占四格。

```python
#!/usr/bin/env pybricks-micropython
from pybricks.iodevices import LUMPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = LUMPDevice(Port.S1)
if cam.read(0)[0] != 52:
    raise RuntimeError("Select Object Details (52)")

while True:
    values = cam.read(1)
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

## 04 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
