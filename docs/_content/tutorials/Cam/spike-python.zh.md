# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | LEGO® Education SPIKE™ Prime Set<br>LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | MBC 神攝手視覺感應器 (SPIKE 版) |
| 程式語言 | Pybricks Python |

### ✔ 事前準備

1. 啟動你的機器人與 Pybricks Python。
2. 確認主機已安裝 Pybricks 韌體，且相機與主機連線正常。
3. 設定感應器模式，確認與程式設定模式相同。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
本教學使用 PUPDevice 直接讀取原始資料。先在相機設定模式，再以通訊模式 9 讀主要資料；模式 11、12 的數量另讀通訊模式 6。
:::

<CamModeAccordion>

### ✔ 相機模式概覽

MBC 神攝手視覺感應器共有 5 大主模式，各主模式下還有細分多個子模式，請參考下表說明與 modeID 編號，查找程式說明。

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

最多讀取 14 色的位置，另可讀取數量。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | GridID1 |
| byte 1 | GridID2 |
| byte 2 | GridID3 |
| byte 3 | GridID4 |
| byte 4 | GridID5 |
| byte 5 | GridID6 |
| byte 6 | GridID7 |
| byte 7 | GridID8 |
| byte 8 | GridID9 |
| byte 9 | GridID10 |
| byte 10 | GridID11 |
| byte 11 | GridID12 |
| byte 12 | GridID13 |
| byte 13 | GridID14 |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

GridID 使用 16×12 格。0 代表未找到；其餘先減 1，再以 16 的餘數加 1 得 X、商加 1 得 Y。數量另讀通訊模式 6，小端位元串每色 3 bits，14 色後接 4 bits 找到色數；數量 7 表示 7 塊以上。

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

最多讀取 7 色的位置，另可讀取數量。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | X1 |
| byte 1 | Y1 |
| byte 2 | X2 |
| byte 3 | Y2 |
| byte 4 | X3 |
| byte 5 | Y3 |
| byte 6 | X4 |
| byte 7 | Y4 |
| byte 8 | X5 |
| byte 9 | Y5 |
| byte 10 | X6 |
| byte 11 | Y6 |
| byte 12 | X7 |
| byte 13 | Y7 |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

數量另讀通訊模式 6。前四個 byte 的高、低半位元組依序為色 1–7 數量與找到色數。

座標為 160×120 像素，X 向右、Y 向下增加；X＝0 表示未找到。

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

最多讀取 4 色的位置，另可讀取數量與面積。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | X1 |
| byte 1 | Y1 |
| byte 2 | Area1 |
| byte 3 | X2 |
| byte 4 | Y2 |
| byte 5 | Area2 |
| byte 6 | X3 |
| byte 7 | Y3 |
| byte 8 | Area3 |
| byte 9 | X4 |
| byte 10 | Y4 |
| byte 11 | Area4 |
| byte 12 | Count1×16+Count2 |
| byte 13 | Count3×16+Count4 |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

座標為 160×120 像素，X 向右、Y 向下增加；X＝0 表示未找到。

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

最多讀取 2 色的位置與寬高，另可讀取數量與面積。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | X1 |
| byte 1 | Y1 |
| byte 2 | W1 |
| byte 3 | H1 |
| byte 4 | Count1 |
| byte 5 | Area1 |
| byte 6 | X2 |
| byte 7 | Y2 |
| byte 8 | W2 |
| byte 9 | H2 |
| byte 10 | Count2 |
| byte 11 | Area2 |
| byte 12 | 找到色數 |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

座標為 160×120 像素，X 向右、Y 向下增加；X＝0 表示未找到。

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

最多讀取 14 個取樣點的色相，精度依下方欄位格式。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | Hue1 |
| byte 1 | Hue2 |
| byte 2 | Hue3 |
| byte 3 | Hue4 |
| byte 4 | Hue5 |
| byte 5 | Hue6 |
| byte 6 | Hue7 |
| byte 7 | Hue8 |
| byte 8 | Hue9 |
| byte 9 | Hue10 |
| byte 10 | Hue11 |
| byte 11 | Hue12 |
| byte 12 | Hue13 |
| byte 13 | Hue14 |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相＋飽和">

最多讀取 7 個取樣點的色相與飽和，精度依下方欄位格式。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | Hue1 |
| byte 1 | Sat1 |
| byte 2 | Hue2 |
| byte 3 | Sat2 |
| byte 4 | Hue3 |
| byte 5 | Sat3 |
| byte 6 | Hue4 |
| byte 7 | Sat4 |
| byte 8 | Hue5 |
| byte 9 | Sat5 |
| byte 10 | Hue6 |
| byte 11 | Sat6 |
| byte 12 | Hue7 |
| byte 13 | Sat7 |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相＋飽和＋明度">

最多讀取 4 個取樣點的色相、飽和與明度，精度依下方欄位格式。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | Hue1 |
| byte 1 | Sat1 |
| byte 2 | Val1 |
| byte 3 | Hue2 |
| byte 4 | Sat2 |
| byte 5 | Val2 |
| byte 6 | Hue3 |
| byte 7 | Sat3 |
| byte 8 | Val3 |
| byte 9 | Hue4 |
| byte 10 | Sat4 |
| byte 11 | Val4 |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

讀取由左至右前 13 塊色相與總塊數。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | Hue1 |
| byte 1 | Hue2 |
| byte 2 | Hue3 |
| byte 3 | Hue4 |
| byte 4 | Hue5 |
| byte 5 | Hue6 |
| byte 6 | Hue7 |
| byte 7 | Hue8 |
| byte 8 | Hue9 |
| byte 9 | Hue10 |
| byte 10 | Hue11 |
| byte 11 | Hue12 |
| byte 12 | Hue13 |
| byte 13 | Total |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

色相 0 可以代表紅色，請以總塊數判斷前幾格有效。

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

提供近、中、遠偏移、路口、標記線等 14 個循線值。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | Near offset |
| byte 1 | Middle offset |
| byte 2 | Far offset |
| byte 3 | Angle |
| byte 4 | Near width % |
| byte 5 | Flags |
| byte 6 | Junction |
| byte 7 | Junction distance % |
| byte 8 | Left edge |
| byte 9 | Right edge |
| byte 10 | Far width % |
| byte 11 | Marker color |
| byte 12 | Marker count |
| byte 13 | Lost direction |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

偏移、角度及左右緣為有號 byte，原始值 ≥128 時減 256。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

提供近、中、遠偏移、路口、標記線等 14 個循線值。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | Near offset |
| byte 1 | Middle offset |
| byte 2 | Far offset |
| byte 3 | Angle |
| byte 4 | Near width % |
| byte 5 | Flags |
| byte 6 | Junction |
| byte 7 | Junction distance % |
| byte 8 | Left edge |
| byte 9 | Right edge |
| byte 10 | Far width % |
| byte 11 | Marker color |
| byte 12 | Marker count |
| byte 13 | Lost direction |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

偏移、角度及左右緣為有號 byte，原始值 ≥128 時減 256。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

提供近、中、遠偏移、路口、標記線等 14 個循線值。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | Near offset |
| byte 1 | Middle offset |
| byte 2 | Far offset |
| byte 3 | Angle |
| byte 4 | Near width % |
| byte 5 | Flags |
| byte 6 | Junction |
| byte 7 | Junction distance % |
| byte 8 | Left edge |
| byte 9 | Right edge |
| byte 10 | Far width % |
| byte 11 | Marker color |
| byte 12 | Marker count |
| byte 13 | Lost direction |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

偏移、角度及左右緣為有號 byte，原始值 ≥128 時減 256。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

讀取前 4 個物體的代碼與位置，另可讀物體總數。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | Total |
| byte 1 | Code1 |
| byte 2 | X1 |
| byte 3 | Y1 |
| byte 4 | Code2 |
| byte 5 | X2 |
| byte 6 | Y2 |
| byte 7 | Code3 |
| byte 8 | X3 |
| byte 9 | Y3 |
| byte 10 | Code4 |
| byte 11 | X4 |
| byte 12 | Y4 |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

座標為 160×120 像素，X 向右、Y 向下增加；X＝0 表示未找到。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

讀取前 2 個物體的詳細資料，欄位如下。

| 讀值位置 | 回傳值 |
| --- | --- |
| byte 0 | Color1 |
| byte 1 | Shape1 |
| byte 2 | X1 |
| byte 3 | Y1 |
| byte 4 | W1 |
| byte 5 | H1 |
| byte 6 | Area1 |
| byte 7 | Color2 |
| byte 8 | Shape2 |
| byte 9 | X2 |
| byte 10 | Y2 |
| byte 11 | W2 |
| byte 12 | H2 |
| byte 13 | Area2 |

通訊模式 9 一次回傳 7 個 int16。每個 int16 拆成低位、高位兩個 byte，再依表格取值。

座標為 160×120 像素，X 向右、Y 向下增加；X＝0 表示未找到。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

</CamModeSection>

</CamModeAccordion>

## 03 / 範例程式

### ✔ 基礎控制

將相機切到顏色追蹤 - ③ 標準，讀取並顯示色 1、色 2 的格座標。

```python
from pybricks.parameters import Port
from pybricks.pupdevices import ColorSensor
from pybricks.tools import wait

cam = ColorSensor(Port.C)

while True:
    reflected = int(cam.reflection())
    if reflected < 0:
        reflected += 6399
    x1, y1 = divmod(reflected, 100)

    ambient = cam.ambient()
    x2 = int(ambient)
    y2 = round(ambient * 10) % 10
    print((x1, y1), (x2, y2))
    wait(100)
```

### ✔ 進階控制

把相機切到模式 13。以下範例印出色 1 的 X、Y、面積與色塊數量。

```python
from pybricks.iodevices import PUPDevice
from pybricks.parameters import Port
from pybricks.tools import wait

cam = PUPDevice(Port.C)

def read_payload():
    data = []
    for word in cam.read(9):
        data.extend((word & 255, (word >> 8) & 255))
    return data

while True:
    data = read_payload()
    x, y, area = data[:3]
    if x:
        print(x, y, area, data[12] >> 4)
    else:
        print("No target")
    wait(100)
```

## 04 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
