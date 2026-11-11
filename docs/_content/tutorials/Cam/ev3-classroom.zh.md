# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | LEGO® MINDSTORMS® EV3 |
| 感應器 | MBC 神攝手視覺感應器 (EV3 版) |
| 程式語言 | EV3 Classroom |

### ✔ 事前準備

1. 啟動你的機器人與 EV3 Classroom。
2. 確認主機、相機與程式環境運作正常。
3. 設定感應器模式，確認與程式設定模式相同。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
在 EV3 Classroom 選擇 Infrared Sensor 數值積木，感應器埠設為 1。proximity 對應相機 modeID；beacon heading 與 beacon distance 要選通道 1–4；remote 對應遙控欄位。下表直接列出各積木與通道。
:::

<CamModeAccordion>

### ✔ 相機模式概覽

MBC 神攝手視覺感應器共有 5 大主模式，各主模式下還有細分多個子模式，請參考下表說明與 modeID 編號，查找程式說明。

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

最多讀取 12 色的位置。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | P1 |
| `beacon distance` (channel 1) | P2 |
| `beacon heading` (channel 2) | P3 |
| `beacon distance` (channel 2) | P4 |
| `beacon heading` (channel 3) | P5 |
| `beacon distance` (channel 3) | P6 |
| `beacon heading` (channel 4) | P7 |
| `beacon distance` (channel 4) | P8 |
| `remote` (channel 1) | P9 |
| `remote` (channel 2) | P10 |
| `remote` (channel 3) | P11 |
| `remote` (channel 4) | P12 |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

最多讀取 8 色的位置。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | P1 |
| `beacon distance` (channel 1) | P2 |
| `beacon heading` (channel 2) | P3 |
| `beacon distance` (channel 2) | P4 |
| `beacon heading` (channel 3) | P5 |
| `beacon distance` (channel 3) | P6 |
| `beacon heading` (channel 4) | P7 |
| `beacon distance` (channel 4) | P8 |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

最多讀取 4 色的位置與面積。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | P1 |
| `beacon distance` (channel 1) | Area1 |
| `beacon heading` (channel 2) | P2 |
| `beacon distance` (channel 2) | Area2 |
| `beacon heading` (channel 3) | P3 |
| `beacon distance` (channel 3) | Area3 |
| `beacon heading` (channel 4) | P4 |
| `beacon distance` (channel 4) | Area4 |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

最多讀取 2 色的位置與寬高，另可讀取數量與面積。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | P1 |
| `beacon distance` (channel 1) | W1×10+H1 |
| `beacon heading` (channel 2) | Count1 |
| `beacon distance` (channel 2) | Area1 |
| `beacon heading` (channel 3) | P2 |
| `beacon distance` (channel 3) | W2×10+H2 |
| `beacon heading` (channel 4) | Count2 |
| `beacon distance` (channel 4) | Area2 |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

最多讀取 12 個取樣點的色相，精度依下方欄位格式。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | Hue1 (EV3) |
| `beacon distance` (channel 1) | Hue2 (EV3) |
| `beacon heading` (channel 2) | Hue3 (EV3) |
| `beacon distance` (channel 2) | Hue4 (EV3) |
| `beacon heading` (channel 3) | Hue5 (EV3) |
| `beacon distance` (channel 3) | Hue6 (EV3) |
| `beacon heading` (channel 4) | Hue7 (EV3) |
| `beacon distance` (channel 4) | Hue8 (EV3) |
| `remote` (channel 1) | Hue9 (EV3) |
| `remote` (channel 2) | Hue10 (EV3) |
| `remote` (channel 3) | Hue11 (EV3) |
| `remote` (channel 4) | Hue12 (EV3) |

Hue (EV3) 的非負值為 0–100，約以讀值×240÷100 還原色相。−1～−8 表示白到灰，−9～−15 為黑。

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相＋飽和">

最多讀取 4 個取樣點的色相與飽和，精度依下方欄位格式。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | Hue1 (EV3) |
| `beacon distance` (channel 1) | floor(Sat1÷10)×10+floor(Val1÷10) |
| `beacon heading` (channel 2) | Hue2 (EV3) |
| `beacon distance` (channel 2) | floor(Sat2÷10)×10+floor(Val2÷10) |
| `beacon heading` (channel 3) | Hue3 (EV3) |
| `beacon distance` (channel 3) | floor(Sat3÷10)×10+floor(Val3÷10) |
| `beacon heading` (channel 4) | Hue4 (EV3) |
| `beacon distance` (channel 4) | floor(Sat4÷10)×10+floor(Val4÷10) |

飽和與明度以十位數合併。讀值整除 10 和取餘數後，各乘以 10 為近似值。

Hue (EV3) 的非負值為 0–100，約以讀值×240÷100 還原色相。−1～−8 表示白到灰，−9～−15 為黑。

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相＋飽和＋明度">

最多讀取 2 個取樣點的色相、飽和與明度，精度依下方欄位格式。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | floor(Hue1÷100) |
| `beacon distance` (channel 1) | Hue1 % 100 |
| `beacon heading` (channel 2) | Sat1 |
| `beacon distance` (channel 2) | Val1 |
| `beacon heading` (channel 3) | floor(Hue2÷100) |
| `beacon distance` (channel 3) | Hue2 % 100 |
| `beacon heading` (channel 4) | Sat2 |
| `beacon distance` (channel 4) | Val2 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

讀取由左至右前 11 塊色相與總塊數。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | Hue1 (EV3) |
| `beacon distance` (channel 1) | Hue2 (EV3) |
| `beacon heading` (channel 2) | Hue3 (EV3) |
| `beacon distance` (channel 2) | Hue4 (EV3) |
| `beacon heading` (channel 3) | Hue5 (EV3) |
| `beacon distance` (channel 3) | Hue6 (EV3) |
| `beacon heading` (channel 4) | Hue7 (EV3) |
| `beacon distance` (channel 4) | Hue8 (EV3) |
| `remote` (channel 1) | Hue9 (EV3) |
| `remote` (channel 2) | Hue10 (EV3) |
| `remote` (channel 3) | Hue11 (EV3) |
| `remote` (channel 4) | Total |

Hue (EV3) 的非負值為 0–100，約以讀值×240÷100 還原色相。−1～−8 表示白到灰，−9～−15 為黑。

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

色相 0 可以代表紅色，請以總塊數判斷前幾格有效。

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

信標與遙控模式合計提供 12 個循線值。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | Near offset |
| `beacon distance` (channel 1) | Middle offset |
| `beacon heading` (channel 2) | Far offset |
| `beacon distance` (channel 2) | Angle |
| `beacon heading` (channel 3) | Near width % |
| `beacon distance` (channel 3) | Junction×10+Flags |
| `beacon heading` (channel 4) | Junction distance % |
| `beacon distance` (channel 4) | Marker color |
| `remote` (channel 1) | Left edge |
| `remote` (channel 2) | Right edge |
| `remote` (channel 3) | Far width % |
| `remote` (channel 4) | Marker count |

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

信標與遙控模式合計提供 12 個循線值。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | Near offset |
| `beacon distance` (channel 1) | Middle offset |
| `beacon heading` (channel 2) | Far offset |
| `beacon distance` (channel 2) | Angle |
| `beacon heading` (channel 3) | Near width % |
| `beacon distance` (channel 3) | Junction×10+Flags |
| `beacon heading` (channel 4) | Junction distance % |
| `beacon distance` (channel 4) | Marker color |
| `remote` (channel 1) | Left edge |
| `remote` (channel 2) | Right edge |
| `remote` (channel 3) | Far width % |
| `remote` (channel 4) | Marker count |

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

信標與遙控模式合計提供 12 個循線值。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | Near offset |
| `beacon distance` (channel 1) | Middle offset |
| `beacon heading` (channel 2) | Far offset |
| `beacon distance` (channel 2) | Angle |
| `beacon heading` (channel 3) | Near width % |
| `beacon distance` (channel 3) | Junction×10+Flags |
| `beacon heading` (channel 4) | Junction distance % |
| `beacon distance` (channel 4) | Marker color |
| `remote` (channel 1) | Left edge |
| `remote` (channel 2) | Right edge |
| `remote` (channel 3) | Far width % |
| `remote` (channel 4) | Marker count |

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

偏移 −100～100，負值表示線在左；角度 −90～90°。Flags 以近、中、遠分別為 1、2、4 相加。Junction 0～5 為無、十字、T、左、右、盡頭。色線先教目標色 1。

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

讀取前 5 個物體的代碼與位置，另可讀物體總數。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | Code1 |
| `beacon distance` (channel 1) | P1 |
| `beacon heading` (channel 2) | Code2 |
| `beacon distance` (channel 2) | P2 |
| `beacon heading` (channel 3) | Code3 |
| `beacon distance` (channel 3) | P3 |
| `beacon heading` (channel 4) | Code4 |
| `beacon distance` (channel 4) | P4 |
| `remote` (channel 1) | Code5 |
| `remote` (channel 2) | P5 |
| `remote` (channel 4) | Total |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

此模式會用到信標與遙控資料，切換 EV3 讀值模式約需 1.1 秒。控制迴圈請選擇需要的欄位。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

讀取前 2 個物體的詳細資料，欄位如下。

| EV3 Classroom 積木 | 回傳值 |
| --- | --- |
| `proximity` (port 1) | modeID |
| `beacon heading` (channel 1) | Code1 |
| `beacon distance` (channel 1) | P1 |
| `beacon heading` (channel 2) | Area1 |
| `beacon distance` (channel 2) | floor((Angle1+1)÷2) |
| `beacon heading` (channel 3) | Code2 |
| `beacon distance` (channel 3) | P2 |
| `beacon heading` (channel 4) | Area2 |
| `beacon distance` (channel 4) | floor((Angle2+1)÷2) |

P＝X×10＋Y，位置與寬高使用 8×6 格。EV3 的 Y 向上增加，位置 0 表示未找到。

角度欄位讀值乘以 2 後最多取 179°，誤差約 1°。

只偵測目標色 1–8，物體按面積由大到小排列，位置是質心。Code＝色號×10＋形狀，0 代表無物體。形狀 0～9 為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。

</CamModeSection>

</CamModeAccordion>

## 03 / 範例程式

### ✔ 讀取目標色 1 的位置與面積

相機接感應器埠 1，先教目標色 1，再於相機選單選 modeID 13 (顏色追蹤 - ③ 標準)。

1. 在程式啟動時讀 Infrared Sensor 的 proximity，確認數值為 13。
2. 建立 position、area、X、Y 變數，新增重複執行迴圈。
3. 讀取 channel 1 的 beacon heading 存為 position，beacon distance 存為 area。
4. position＝0 時顯示「未找到」。其餘以數學積木計算 X＝向下取整(position÷10)、Y＝position 除以 10 的餘數。
5. 顯示 X、Y 和 area，等待 0.1 秒再重複。例：position＝43、area＝18，代表第 4 欄、第 3 列，面積 18%。EV3 的 Y＝1 在畫面底部。

迴圈只使用信標值。近接的 modeID 檢查放在啟動時執行一次，避免每輪切換紅外線模式造成約 1.1 秒等待。

## 04 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
