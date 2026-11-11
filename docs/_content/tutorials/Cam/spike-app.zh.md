# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | LEGO® Education SPIKE™ Prime Set |
| 感應器 | MBC 神攝手視覺感應器 (SPIKE 版) |
| 程式語言 | LEGO Education SPIKE 3 App |

### ✔ 事前準備

1. 啟動你的機器人與 LEGO Education SPIKE 3 App。
2. 確認一切運作正常。
3. 設定感應器模式，確認與程式設定模式相同。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
官方 App 會將神攝手顯示為「顏色感應器」，可直接透過原生顏色感應器做數值讀取。
:::
::: warning ⚠️ 注意
- 一次只能使用一種子模式，請確實將感應器模式進行正確設定。
- 不同子模式會使用相同的顏色感應器程式積木做數值讀取，因此選錯模式會得到錯誤數值。
:::

<CamModeAccordion>

### ✔ 相機模式概覽

MBC 神攝手視覺感應器共有 5 大主模式，各主模式下還有細分多個子模式，請參考下表說明與 Mode ID 編號，查找程式說明。

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

`最多回傳 7 色數據`
::: info ℹ️ 補充資訊
顏色位置回傳座標說明：
 - 7 種顏色的座標需再額外解碼，請查看下方數值意義說明。
 - 螢幕會被劃分為 `8 × 6` 區塊，`X 軸`被分為 `8` 區，`Y 軸`被分為 `6` 區，回傳座標是指這個區域，而非實際相素點。
 - 每個區域最多 `2` 色。
:::

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | 找到顏色的色數 | `0 ~ 7`<br>• 回傳鏡頭視野內追蹤到的顏色數量。 |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | 顏色 1 位置 | `0, 11 ~ 86`<br>• 回傳追蹤到的顏色 1 座標。<br>•  |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 顏色 2 與 3 位置 | --- |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 顏色 4 與 5 位置 | --- |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 顏色 6 與  位置 | --- |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`最多回傳 7 色數據`

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | 找到色數 |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | P1 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | P2×100+P3 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | P4×100+P5 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | P6×100+P7 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`最多回傳 4 色數據`

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | X1 |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | Y1 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | X2+Y2×256 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | X3+Y3×256 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | X4+Y4×256 |

本模式教育版位置／大小以 16×12 格表示，家用版以 8×6 格表示，Y 向下增加。

::: warning ⚠️ 注意
教育版的「顏色」積木會把相機送出的 `5` 轉成 `6`，因此這個欄位無法區分兩者。若使用教育版 Python，可用 `device.data(port.C)[0]` 讀原始值。
:::

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`最多回傳 2 色位置與寬高`

2 色位置和寬高，原始綠／藍為色 1／2 寬高

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | X1 |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | Y1 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | X2+Y2×256 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | W1+H1×256 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | W2+H2×256 |

本模式教育版位置／大小以 16×12 格表示，家用版以 8×6 格表示，Y 向下增加。

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`最多回傳 6 點色相`

原始紅／綠／藍各裝兩點色相，共 6 點

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | 0 |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | 0 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | Hue1+Hue2×256 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | Hue3+Hue4×256 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | Hue5+Hue6×256 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相＋飽和">

原始 RGB 依序為 S1–S3 的色相＋飽和×256

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | 0 |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | Sat4 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | Hue1+Sat1×256 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | Hue2+Sat2×256 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | Hue3+Sat3×256 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相＋飽和＋明度">

原始 RGB 同上，反射光為 S1 明度

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | 0 |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | Val1 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | Hue1+Sat1×256 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | Hue2+Sat2×256 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | Hue3+Sat3×256 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

顏色＝總塊數，原始 RGB 每格裝兩塊色相

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | Total |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | 0 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | Hue1+Hue2×256 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | Hue3+Hue4×256 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | Hue5+Hue6×256 |

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

顏色＝路口，反射光＝近線寬，原始 RGB＝近偏移、遠偏移、角度各＋100

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | Junction |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | Near width % |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | Near offset+100 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | Far offset+100 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | Angle+100 |

偏移 −100 ~ 100，負值表示線在左；角度 −90 ~ 90°。旗標以近、中、遠分別為 1、2、4 相加。路口 0 ~ 5 分別為無、十字、T、左、右、盡頭。色線模式先教目標色 1。

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

顏色＝路口，反射光＝近線寬，原始 RGB＝近偏移、遠偏移、角度各＋100

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | Junction |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | Near width % |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | Near offset+100 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | Far offset+100 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | Angle+100 |

偏移 −100 ~ 100，負值表示線在左；角度 −90 ~ 90°。旗標以近、中、遠分別為 1、2、4 相加。路口 0 ~ 5 分別為無、十字、T、左、右、盡頭。色線模式先教目標色 1。

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

顏色＝路口，反射光＝近線寬，原始 RGB＝近偏移、遠偏移、角度各＋100

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | Junction |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | Near width % |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | Near offset+100 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | Far offset+100 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | Angle+100 |

偏移 −100 ~ 100，負值表示線在左；角度 −90 ~ 90°。旗標以近、中、遠分別為 1、2、4 相加。路口 0 ~ 5 分別為無、十字、T、左、右、盡頭。色線模式先教目標色 1。

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

積木讀前 3 個，Python 有後續欄位

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | Total |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | Code1 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | P1 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | Code2×100+P2 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | Code3×100+P3 |

只偵測目標色 1–8，物體依面積由大到小排列，位置是質心。形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。代碼 0 表示沒有物體。

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

積木讀物體 1 的位置／寬高，另有物體 2 的代碼與面積

| 積木欄位 | 回傳值 |
| --- | --- |
| ![特徵線寬](/images/tutorials/S8/spike-app/color.png) | Code1 |
| ![線偏移](/images/tutorials/S8/spike-app/reflect.png) | Area1 % |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | X1+Y1×256 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | W1+H1×256 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | Code2+Area2×256 |

只偵測目標色 1–8，物體依面積由大到小排列，位置是質心。形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。代碼 0 表示沒有物體。

</CamModeSection>

</CamModeAccordion>

## 03 / 範例程式

### ✔ 讀取色 2 的位置

1. 將兩種顏色分別教成目標色 1 與 2。先確認即時畫面能找到色 2。
2. 在重複迴圈中讀取一次「原始紅」，存成變數，再用上表換算 X、Y。
3. 顯示 X、Y。左右移動色 2，觀察 X 是否跟著改變。移出畫面時，確認 X 回到 0。

*［圖片待補｜原始紅讀值、座標拆解與顯示的完整積木］*

## 04 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
