# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | MBC 神攝手視覺感應器 (SPIKE 版) |
| 程式語言 | Robot Inventer App |

### ✔ 事前準備

1. 啟動你的機器人與 Robot Inventer App。
2. 確認主機、相機與程式環境運作正常。
3. 設定感應器模式，確認與程式設定模式相同。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
- Robot Inventer App 將神攝手視為顏色感應器。以下表格對應積木模式的顏色、反射光與原始 RGB。若改用家用版 Python，主機會切成教育版排列，不能直接使用本頁積木的解碼方式。
- 表中的「 ÷ 」表示整數除法，「mod」表示取餘數。先將讀值存成變數，再拆解。此頁是Robot Inventer App 程式積木排列，請勿套用教育版的 256 打包方式。
:::

::: warning ⚠️ 注意
- 一次只能使用一種相機子模式，請確認相機 Mode ID 與程式設定相同。
- 不同模式共用相同讀取指令，回傳內容須依該模式的表格解碼。
:::

<CamModeAccordion>

### ✔ 相機模式概覽

MBC 神攝手視覺感應器共有 5 大主模式，各主模式下還有細分多個子模式，請參考下表說明與 Mode ID 編號，查找程式說明。

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

`Robot Inventer App 程式積木可讀：4 色位置`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 向下增加。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 顏色 1 的 X | `0, 1 ~ 8`<br>• 顏色 1 的 X = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 顏色 1 的 Y | `0, 1 ~ 6`<br>• 顏色 1 的 Y = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 顏色 2 的 X 與 顏色 2 的 Y | `0 ~ 86`<br>• 顏色 2 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 2 的 X = 讀取數值 ÷ 10。<br>• 顏色 2 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 2 的 Y = 讀取數值 mod 10。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 顏色 3 的 X 與 顏色 3 的 Y | `0 ~ 86`<br>• 顏色 3 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 3 的 X = 讀取數值 ÷ 10。<br>• 顏色 3 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 3 的 Y = 讀取數值 mod 10。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 顏色 4 的 X 與 顏色 4 的 Y | `0 ~ 86`<br>• 顏色 4 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 4 的 X = 讀取數值 ÷ 10。<br>• 顏色 4 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 4 的 Y = 讀取數值 mod 10。 |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`Robot Inventer App 程式積木可讀：4 色位置`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 向下增加。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 顏色 1 的 X | `0, 1 ~ 8`<br>• 顏色 1 的 X = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 顏色 1 的 Y | `0, 1 ~ 6`<br>• 顏色 1 的 Y = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 顏色 2 的 X 與 顏色 2 的 Y | `0 ~ 86`<br>• 顏色 2 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 2 的 X = 讀取數值 ÷ 10。<br>• 顏色 2 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 2 的 Y = 讀取數值 mod 10。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 顏色 3 的 X 與 顏色 3 的 Y | `0 ~ 86`<br>• 顏色 3 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 3 的 X = 讀取數值 ÷ 10。<br>• 顏色 3 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 3 的 Y = 讀取數值 mod 10。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 顏色 4 的 X 與 顏色 4 的 Y | `0 ~ 86`<br>• 顏色 4 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 4 的 X = 讀取數值 ÷ 10。<br>• 顏色 4 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 4 的 Y = 讀取數值 mod 10。 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`Robot Inventer App 程式積木可讀：4 色位置`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 向下增加。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 顏色 1 的 X | `0, 1 ~ 8`<br>• 顏色 1 的 X = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 顏色 1 的 Y | `0, 1 ~ 6`<br>• 顏色 1 的 Y = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 顏色 2 的 X 與 顏色 2 的 Y | `0 ~ 86`<br>• 顏色 2 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 2 的 X = 讀取數值 ÷ 10。<br>• 顏色 2 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 2 的 Y = 讀取數值 mod 10。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 顏色 3 的 X 與 顏色 3 的 Y | `0 ~ 86`<br>• 顏色 3 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 3 的 X = 讀取數值 ÷ 10。<br>• 顏色 3 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 3 的 Y = 讀取數值 mod 10。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 顏色 4 的 X 與 顏色 4 的 Y | `0 ~ 86`<br>• 顏色 4 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 4 的 X = 讀取數值 ÷ 10。<br>• 顏色 4 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 4 的 Y = 讀取數值 mod 10。 |

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`Robot Inventer App 程式積木可讀：2 色位置與寬高`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 向下增加。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 顏色 1 的 X | `0, 1 ~ 8`<br>• 顏色 1 的 X = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 顏色 1 的 Y | `0, 1 ~ 6`<br>• 顏色 1 的 Y = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 顏色 2 的 X 與 顏色 2 的 Y | `0 ~ 86`<br>• 顏色 2 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 2 的 X = 讀取數值 ÷ 10。<br>• 顏色 2 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 2 的 Y = 讀取數值 mod 10。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 顏色 1 的 W 與 顏色 1 的 H | `0 ~ 86`<br>• 顏色 1 的 W 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 1 的 W = 讀取數值 ÷ 10。<br>• 顏色 1 的 H 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 1 的 H = 讀取數值 mod 10。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 顏色 2 的 W 與 顏色 2 的 H | `0 ~ 86`<br>• 顏色 2 的 W 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 2 的 W = 讀取數值 ÷ 10。<br>• 顏色 2 的 H 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 2 的 H = 讀取數值 mod 10。 |

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`Robot Inventer App 程式積木可讀：4 點色相`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
- 此欄位經過縮減，換算後可能有 1 單位誤差。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | S4 色相 | `0 ~ 127`<br>• S4 色相為 讀取數值 × 2。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | S1 色相 | `0 ~ 255`<br>• S1 色相 = 讀取數值。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | S2 色相 | `0 ~ 255`<br>• S2 色相 = 讀取數值。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | S3 色相 | `0 ~ 255`<br>• S3 色相 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相 + 飽和">

`Robot Inventer App 程式積木可讀：2 點色相與飽和度`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | S2 飽和度 | `0 ~ 100`<br>• S2 飽和度 = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | S1 色相 | `0 ~ 255`<br>• S1 色相 = 讀取數值。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | S1 飽和度 | `0 ~ 100`<br>• S1 飽和度 = 讀取數值。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | S2 色相 | `0 ~ 255`<br>• S2 色相 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相 + 飽和 + 明度">

`Robot Inventer App 程式積木可讀：2 點色相、飽和度與明度`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 兩者只保留十位，9 表示約 90 或以上。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | S2 飽和度與明度 | `0 ~ 99`<br>• S2 飽和度 範圍：`0 ~ 90`{.code-green}。<br>• S2 飽和度為 (讀取數值 ÷ 10) × 10。<br>• S2 明度 範圍：`0 ~ 90`{.code-green}。<br>• S2 明度為 (讀取數值 mod 10) × 10。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | S1 色相 | `0 ~ 255`<br>• S1 色相 = 讀取數值。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | S1 飽和度與明度 | `0 ~ 99`<br>• S1 飽和度 範圍：`0 ~ 90`{.code-green}。<br>• S1 飽和度為 (讀取數值 ÷ 10) × 10。<br>• S1 明度 範圍：`0 ~ 90`{.code-green}。<br>• S1 明度為 (讀取數值 mod 10) × 10。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | S2 色相 | `0 ~ 255`<br>• S2 色相 = 讀取數值。 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

`Robot Inventer App 程式積木可讀：前 3 塊色相與總塊數`

::: info ℹ️ 補充資訊
- 色塊由左至右排列。請先讀總塊數，再使用前幾筆色相；色相 0 可以是紅色。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 色塊總數 | `0 ~ 18`<br>• 色塊總數 = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 左起第 1 塊色相 | `0 ~ 255`<br>• 左起第 1 塊色相 = 讀取數值。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 左起第 2 塊色相 | `0 ~ 255`<br>• 左起第 2 塊色相 = 讀取數值。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 左起第 3 塊色相 | `0 ~ 255`<br>• 左起第 3 塊色相 = 讀取數值。 |

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

`Robot Inventer App 程式積木可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標以近、中、遠的 1、2、4 相加。
- 本子模式辨識亮色地面上的黑線。
- 例如讀到 80，還原後為 -20。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 路口類型 | `0 ~ 5`<br>• 路口類型 = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 近處偏移 | `0 ~ 200`<br>• 近處偏移 = 讀取數值 - 100。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 遠處偏移 | `0 ~ 200`<br>• 遠處偏移 = 讀取數值 - 100。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 線角度 | `10 ~ 190`<br>• 線角度 = 讀取數值 - 100。 |

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

`Robot Inventer App 程式積木可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標以近、中、遠的 1、2、4 相加。
- 本子模式辨識深色地面上的白線。
- 例如讀到 80，還原後為 -20。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 路口類型 | `0 ~ 5`<br>• 路口類型 = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 近處偏移 | `0 ~ 200`<br>• 近處偏移 = 讀取數值 - 100。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 遠處偏移 | `0 ~ 200`<br>• 遠處偏移 = 讀取數值 - 100。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 線角度 | `10 ~ 190`<br>• 線角度 = 讀取數值 - 100。 |

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

`Robot Inventer App 程式積木可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標以近、中、遠的 1、2、4 相加。
- 使用色線前，先把線的顏色教成目標色 1。
- 例如讀到 80，還原後為 -20。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 路口類型 | `0 ~ 5`<br>• 路口類型 = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 近處偏移 | `0 ~ 200`<br>• 近處偏移 = 讀取數值 - 100。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 遠處偏移 | `0 ~ 200`<br>• 遠處偏移 = 讀取數值 - 100。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 線角度 | `10 ~ 190`<br>• 線角度 = 讀取數值 - 100。 |

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

`Robot Inventer App 程式積木可讀：前 2 個物體的代碼、位置與物體總數`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 向下增加。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序，物體 1 最大。X、Y 是物體質心。形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 例如 13 = 色 1 的三角形；0 表示沒有物體。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 物體總數 | `0 ~ 8`<br>• 物體總數 = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 物體 1 代碼 | `0, 10 ~ 89`<br>• 物體 1 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 1 色號 = 讀取數值 ÷ 10。<br>• 物體 1 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 1 形狀碼 = 讀取數值 mod 10。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 物體 1 位置 | `0, 11 ~ 86`<br>• 物體 1 的 X = 讀取數值 ÷ 10。<br>• 物體 1 的 Y = 讀取數值 mod 10。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 物體 2 代碼 | `0, 10 ~ 89`<br>• 物體 2 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 2 色號 = 讀取數值 ÷ 10。<br>• 物體 2 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 2 形狀碼 = 讀取數值 mod 10。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 物體 2 位置 | `0, 11 ~ 86`<br>• 物體 2 的 X = 讀取數值 ÷ 10。<br>• 物體 2 的 Y = 讀取數值 mod 10。 |

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

`Robot Inventer App 程式積木可讀：前 1 個物體的詳細資料`

::: info ℹ️ 補充資訊
- 座標使用 `160 × 120` 像素，X 向右、Y 向下增加。若 X 回傳 0 表示未找到。
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序，物體 1 最大。X、Y 是物體質心。形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 例如 13 = 色 1 的三角形；0 表示沒有物體。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 物體總數 | `0 ~ 8`<br>• 物體總數 = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 物體 1 代碼 | `0, 10 ~ 89`<br>• 物體 1 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 1 色號 = 讀取數值 ÷ 10。<br>• 物體 1 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 1 形狀碼 = 讀取數值 mod 10。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 物體 1 的 X | `0 ~ 159`<br>• 物體 1 的 X = 讀取數值。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 物體 1 的 Y | `0 ~ 119`<br>• 物體 1 的 Y = 讀取數值。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 物體 1 面積 | `0 ~ 100`<br>• 物體 1 面積 = 讀取數值。 |

</CamModeSection>

</CamModeAccordion>


## 03 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
