# 使用教學

## 01 / 環境準備

### ✔ 請確認控制器、感應器與程式環境

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | LEGO® Education SPIKE™ Prime Set<br>LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | MBC 神攝手視覺感應器 (SPIKE 版) |
| 程式語言 | Pybricks Blocks |

### ✔ 事前準備

1. 啟動你的機器人與 Pybricks Blocks。
2. 確認主機已安裝 Pybricks 韌體，且相機與主機連線正常。
3. 設定感應器模式，確認與程式設定模式相同。

## 02 / 基礎控制-前置作業與函數功能說明

::: info ℹ️ 補充資訊
- 感應器將被模擬成顏色感應器。相機模式由機身切換。
- 表中的「 ÷ 」表示整數除法，「mod」表示取餘數。環境光只保留小數第一位：整數部分無條件捨去小數，小數位用 round(讀值 × 10) mod 10 取得。
:::

### ✔ 前置作業

1. 不需匯入外加函式庫，使用 Pybricks 內建顏色感應器。
2. 在相機機身選單選擇 Mode ID，讓讀值表與相機模式一致。
3. 開啟你的 Pybricks 程式，在 `set up`{.code-blue} 積木下放入顏色感應器設定積木，如下圖。其餘底盤與馬達感應器初始化則接續放置於`set up`{.code-blue} 積木下。
![顏色感應器設定](/images/tutorials/Cam/spike-block/basic_setup.png){style = "display: block; width: 250px; max-width: 100%; height: auto; margin: 10px auto;"}


<CamModeAccordion namespace="basic">

### ✔ 相機模式概覽

MBC 神攝手視覺感應器共有 5 大主模式，各主模式下還有細分多個子模式，請參考下表說明與 Mode ID 編號，查找程式說明。

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

`Pybricks 積木可讀：2 色位置`

::: info ℹ️ 補充資訊
- 反射光的位置使用 `40 × 30` 格；環境光的位置或寬高使用 `8 × 6` 格。X 向右、Y 向下增加，非實際像素；位置 0 表示未找到。
- 反射光位置若讀到負值，先加 6399，再進行以下換算。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射](/images/tutorials/Cam/spike-block/reflected.png) | 顏色 1 的 X 與 顏色 1 的 Y | `-3199 ~ 3199`<br>• 顏色 1 的 X 範圍：`0, 1 ~ 40`{.code-green}。<br>• 顏色 1 的 X = 讀取數值 ÷ 100。<br>• 顏色 1 的 Y 範圍：`0, 1 ~ 30`{.code-green}。<br>• 顏色 1 的 Y = 讀取數值 mod 100。 |
| ![反射](/images/tutorials/Cam/spike-block/ambient.png) | 顏色 2 的 X 與 顏色 2 的 Y | `0 ~ 8.6`<br>• 顏色 2 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 2 的 X = 無條件捨去小數 (讀取數值)。<br>• 顏色 2 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 2 的 Y = round(讀取數值 × 10) mod 10。 |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`Pybricks 積木可讀：2 色位置`

::: info ℹ️ 補充資訊
- 反射光的位置使用 `40 × 30` 格；環境光的位置或寬高使用 `8 × 6` 格。X 向右、Y 向下增加，非實際像素；位置 0 表示未找到。
- 反射光位置若讀到負值，先加 6399，再進行以下換算。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | 顏色 1 的 X 與 顏色 1 的 Y | `-3199 ~ 3199`<br>• 顏色 1 的 X 範圍：`0, 1 ~ 40`{.code-green}。<br>• 顏色 1 的 X = 讀取數值 ÷ 100。<br>• 顏色 1 的 Y 範圍：`0, 1 ~ 30`{.code-green}。<br>• 顏色 1 的 Y = 讀取數值 mod 100。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | 顏色 2 的 X 與 顏色 2 的 Y | `0 ~ 8.6`<br>• 顏色 2 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 2 的 X = 無條件捨去小數 (讀取數值)。<br>• 顏色 2 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 2 的 Y = round(讀取數值 × 10) mod 10。 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`Pybricks 積木可讀：2 色位置`

::: info ℹ️ 補充資訊
- 反射光的位置使用 `40 × 30` 格；環境光的位置或寬高使用 `8 × 6` 格。X 向右、Y 向下增加，非實際像素；位置 0 表示未找到。
- 反射光位置若讀到負值，先加 6399，再進行以下換算。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | 顏色 1 的 X 與 顏色 1 的 Y | `-3199 ~ 3199`<br>• 顏色 1 的 X 範圍：`0, 1 ~ 40`{.code-green}。<br>• 顏色 1 的 X = 讀取數值 ÷ 100。<br>• 顏色 1 的 Y 範圍：`0, 1 ~ 30`{.code-green}。<br>• 顏色 1 的 Y = 讀取數值 mod 100。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | 顏色 2 的 X 與 顏色 2 的 Y | `0 ~ 8.6`<br>• 顏色 2 的 X 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 2 的 X = 無條件捨去小數 (讀取數值)。<br>• 顏色 2 的 Y 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 2 的 Y = round(讀取數值 × 10) mod 10。 |

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`Pybricks 積木可讀：1 色位置與寬高`

::: info ℹ️ 補充資訊
- 反射光的位置使用 `40 × 30` 格；環境光的位置或寬高使用 `8 × 6` 格。X 向右、Y 向下增加，非實際像素；位置 0 表示未找到。
- 反射光位置若讀到負值，先加 6399，再進行以下換算。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | 顏色 1 的 X 與 顏色 1 的 Y | `-3199 ~ 3199`<br>• 顏色 1 的 X 範圍：`0, 1 ~ 40`{.code-green}。<br>• 顏色 1 的 X = 讀取數值 ÷ 100。<br>• 顏色 1 的 Y 範圍：`0, 1 ~ 30`{.code-green}。<br>• 顏色 1 的 Y = 讀取數值 mod 100。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | 顏色 1 的 W 與 顏色 1 的 H | `0 ~ 8.6`<br>• 顏色 1 的 W 範圍：`0, 1 ~ 8`{.code-green}。<br>• 顏色 1 的 W = 無條件捨去小數 (讀取數值)。<br>• 顏色 1 的 H 範圍：`0, 1 ~ 6`{.code-green}。<br>• 顏色 1 的 H = round(讀取數值 × 10) mod 10。 |

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`Pybricks 積木可讀：2 點色相`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
- 只保留十位；數字 9 表示約 90 或以上，無法還原個位。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | S1 色相 與 S1 飽和度 | `0 ~ 2559`<br>• S1 色相 範圍：`0 ~ 255`{.code-green}。<br>• S1 色相 = 讀取數值 ÷ 10。<br>• S1 飽和度 範圍：`0 ~ 90`{.code-green}。<br>• S1 飽和度為 (讀取數值 mod 10) × 10。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | S2 色相 與 S2 飽和度 (十位精度) | `0 ~ 255.9`<br>• S2 色相 範圍：`0 ~ 255`{.code-green}。<br>• S2 色相 = 無條件捨去小數 (讀取數值)。<br>• S2 飽和度 (十位精度) 範圍：`0 ~ 90`{.code-green}。<br>• S2 飽和度為 (round(讀取數值 × 10) mod 10) × 10。 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相 + 飽和">

`Pybricks 積木可讀：2 點色相與飽和度`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
- 只保留十位；數字 9 表示約 90 或以上，無法還原個位。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | S1 色相 與 S1 飽和度 | `0 ~ 2559`<br>• S1 色相 範圍：`0 ~ 255`{.code-green}。<br>• S1 色相 = 讀取數值 ÷ 10。<br>• S1 飽和度 範圍：`0 ~ 90`{.code-green}。<br>• S1 飽和度為 (讀取數值 mod 10) × 10。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | S2 色相 與 S2 飽和度 (十位精度) | `0 ~ 255.9`<br>• S2 色相 範圍：`0 ~ 255`{.code-green}。<br>• S2 色相 = 無條件捨去小數 (讀取數值)。<br>• S2 飽和度 (十位精度) 範圍：`0 ~ 90`{.code-green}。<br>• S2 飽和度為 (round(讀取數值 × 10) mod 10) × 10。 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相 + 飽和 + 明度">

`Pybricks 積木可讀：1 點色相、飽和度與明度`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
- 只保留十位；數字 9 表示約 90 或以上，無法還原個位。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | S1 色相 | `0 ~ 255`<br>• S1 色相 = 讀取數值。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | S1 飽和度 與 S1 明度 (十位精度) | `0 ~ 100.9`<br>• S1 飽和度 範圍：`0 ~ 100`{.code-green}。<br>• S1 飽和度 = 無條件捨去小數 (讀取數值)。<br>• S1 明度 (十位精度) 範圍：`0 ~ 90`{.code-green}。<br>• S1 明度為 (round(讀取數值 × 10) mod 10) × 10。 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

`Pybricks 積木可讀：前 2 塊色相與總塊數`

::: info ℹ️ 補充資訊
- 色塊由左至右排列。請先讀總塊數，再使用前幾筆色相；色相 0 可以是紅色。
- 讀值 9 表示 9 個或以上。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | 左起第 1 塊色相 | `0 ~ 255`<br>• 左起第 1 塊色相 = 讀取數值。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | 左起第 2 塊色相 與 色塊總數 | `0 ~ 255.9`<br>• 左起第 2 塊色相 範圍：`0 ~ 255`{.code-green}。<br>• 左起第 2 塊色相 = 無條件捨去小數 (讀取數值)。<br>• 色塊總數 範圍：`0 ~ 9`{.code-green}。<br>• 色塊總數 = round(讀取數值 × 10) mod 10。 |

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

`Pybricks 積木可讀：近、遠偏移、路口類型與有線旗標`

::: info ℹ️ 補充資訊
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標以近、中、遠的 1、2、4 相加。
- 本子模式辨識亮色地面上的黑線。
- 例如讀到 80，還原後為 -20。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | 近處偏移 與 路口類型 | `0 ~ 2005`<br>• 近處偏移 範圍：`-100 ~ 100`{.code-green}。<br>• 近處偏移 = (讀取數值 ÷ 10) - 100。<br>• 路口類型 範圍：`0 ~ 5`{.code-green}。<br>• 路口類型 = 讀取數值 mod 10。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | 遠處偏移 與 有線旗標 | `0 ~ 200.7`<br>• 遠處偏移 範圍：`-100 ~ 100`{.code-green}。<br>• 遠處偏移 = (無條件捨去小數 (讀取數值)) - 100。<br>• 有線旗標 範圍：`0 ~ 7`{.code-green}。<br>• 有線旗標 = round(讀取數值 × 10) mod 10。 |

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

`Pybricks 積木可讀：近、遠偏移、路口類型與有線旗標`

::: info ℹ️ 補充資訊
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標以近、中、遠的 1、2、4 相加。
- 本子模式辨識深色地面上的白線。
- 例如讀到 80，還原後為 -20。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | 近處偏移 與 路口類型 | `0 ~ 2005`<br>• 近處偏移 範圍：`-100 ~ 100`{.code-green}。<br>• 近處偏移 = (讀取數值 ÷ 10) - 100。<br>• 路口類型 範圍：`0 ~ 5`{.code-green}。<br>• 路口類型 = 讀取數值 mod 10。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | 遠處偏移 與 有線旗標 | `0 ~ 200.7`<br>• 遠處偏移 範圍：`-100 ~ 100`{.code-green}。<br>• 遠處偏移 = (無條件捨去小數 (讀取數值)) - 100。<br>• 有線旗標 範圍：`0 ~ 7`{.code-green}。<br>• 有線旗標 = round(讀取數值 × 10) mod 10。 |

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

`Pybricks 積木可讀：近、遠偏移、路口類型與有線旗標`

::: info ℹ️ 補充資訊
- 路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標以近、中、遠的 1、2、4 相加。
- 使用色線前，先把線的顏色教成目標色 1。
- 例如讀到 80，還原後為 -20。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | 近處偏移 與 路口類型 | `0 ~ 2005`<br>• 近處偏移 範圍：`-100 ~ 100`{.code-green}。<br>• 近處偏移 = (讀取數值 ÷ 10) - 100。<br>• 路口類型 範圍：`0 ~ 5`{.code-green}。<br>• 路口類型 = 讀取數值 mod 10。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | 遠處偏移 與 有線旗標 | `0 ~ 200.7`<br>• 遠處偏移 範圍：`-100 ~ 100`{.code-green}。<br>• 遠處偏移 = (無條件捨去小數 (讀取數值)) - 100。<br>• 有線旗標 範圍：`0 ~ 7`{.code-green}。<br>• 有線旗標 = round(讀取數值 × 10) mod 10。 |

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

`Pybricks 積木可讀：前 1 個物體的代碼、位置與物體總數`

::: info ℹ️ 補充資訊
- 反射光的位置使用 `40 × 30` 格，X 向右、Y 向下增加，非實際像素；位置 0 表示未找到。環境光在此模式提供物體資料，不是第二組位置。
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序，物體 1 最大。X、Y 是物體質心。形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 反射光位置若讀到負值，先加 6399，再進行以下換算。
- 例如 13 = 色 1 的三角形；0 表示沒有物體。
- 讀值 9 表示 9 個或以上。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | 物體 1 的 X 與 物體 1 的 Y | `-3199 ~ 3199`<br>• 物體 1 的 X 範圍：`0, 1 ~ 40`{.code-green}。<br>• 物體 1 的 X = 讀取數值 ÷ 100。<br>• 物體 1 的 Y 範圍：`0, 1 ~ 30`{.code-green}。<br>• 物體 1 的 Y = 讀取數值 mod 100。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | 物體 1 代碼 與 物體總數 | `0 ~ 89.9`<br>• 物體 1 代碼 範圍：`0, 10 ~ 89`{.code-green}。<br>• 物體 1 色號 = (無條件捨去小數 (讀取數值)) ÷ 10。<br>• 物體 1 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 1 形狀碼 = (無條件捨去小數 (讀取數值)) mod 10。<br>• 物體總數 範圍：`0 ~ 9`{.code-green}。<br>• 物體總數 = round(讀取數值 × 10) mod 10。 |

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

`Pybricks 積木可讀：前 1 個物體的詳細資料`

::: info ℹ️ 補充資訊
- 反射光的位置使用 `40 × 30` 格，X 向右、Y 向下增加，非實際像素；位置 0 表示未找到。環境光在此模式提供物體資料，不是第二組位置。
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序，物體 1 最大。X、Y 是物體質心。形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 反射光位置若讀到負值，先加 6399，再進行以下換算。
- 例如 13 = 色 1 的三角形；0 表示沒有物體。
- 只保留十位；數字 9 表示約 90 或以上，無法還原個位。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/Cam/spike-block/reflected.png) | 物體 1 的 X 與 物體 1 的 Y | `-3199 ~ 3199`<br>• 物體 1 的 X 範圍：`0, 1 ~ 40`{.code-green}。<br>• 物體 1 的 X = 讀取數值 ÷ 100。<br>• 物體 1 的 Y 範圍：`0, 1 ~ 30`{.code-green}。<br>• 物體 1 的 Y = 讀取數值 mod 100。 |
| ![環境光數值](/images/tutorials/Cam/spike-block/ambient.png) | 物體 1 代碼 與 物體 1 面積 (十位精度) | `0 ~ 89.9`<br>• 物體 1 代碼 範圍：`0, 10 ~ 89`{.code-green}。<br>• 物體 1 色號 = (無條件捨去小數 (讀取數值)) ÷ 10。<br>• 物體 1 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 1 形狀碼 = (無條件捨去小數 (讀取數值)) mod 10。<br>• 物體 1 面積 (十位精度) 範圍：`0 ~ 90`{.code-green}。<br>• 物體 1 面積為 (round(讀取數值 × 10) mod 10) × 10。 |

</CamModeSection>

</CamModeAccordion>


## 03 / 進階控制-前置作業與函數功能說明

<DownloadButton href="/programs/Cam/spike-pybricks/MBC_UniCam.py" download="MBC_UniCam.py" label="v4.1 函式庫" />

### ✔ 函數設定
1.  點選上方 <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>v4.1 函式庫</code> 按鈕下載 `MBC 神攝手視覺感應器 Pybricks - SPIKE 函式庫`{.code-blue}。
2. 確認函式庫檔名為 `MBC_UniCam.py`{.code-blue}。
3. 回到 Pybricks，在 `file explorer`{.code-blue} 工作區中點選 `import a file`{.code-blue} 按鈕 ![匯入](/images/tutorials/S8/spike-block/pybricks-import.svg){style = "width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"}。
4. 選擇 `MBC_UniCam.py`{.code-blue} 函式庫並匯入。
5. 確認 `file explorer`{.code-blue} 工作區中出現 `MBC_UniCam.py`{.code-blue}。`MBC_UniCam.py`{.code-blue} 與你的主程式必須放在同一個專案列表下。
6. 開啟你的 Pybricks 程式，在 `set up`{.code-blue} 積木下放入匯入與設定函式庫的程式積木，如下圖。其餘底盤與馬達感應器初始化則接續放置於`set up`{.code-blue} 積木下。
![Mode ID 設定 11](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_11.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

### ✔ 設定與通用功能功能說明

#### set up
| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![導入 UniCam 函式庫](/images/tutorials/Cam/spike-block/advanced/setup/import.png) | 導入函式庫 | • 從 `MBC_UniCam`{.code-green} 模組匯入 `UniCam`{.code-green} 類別。<br>• `from` 欄位填入 `MBC_UniCam`{.code-green}，不含 `.py`；`import` 欄位填入 `UniCam`{.code-green}。<br>• 函式庫檔案 `MBC_UniCam.py`{.code-green} 與主程式需在同一專案列表，檔名與類別名稱的大小寫必須完全相同。 |
| ![Cam 物件設定](/images/tutorials/Cam/spike-block/advanced/setup/init_true.png) | 函式庫設定 | • `Cam`{.code-green} 為建立的物件名稱，後續數值讀取積木需選擇相同名稱。<br>• `UniCam`{.code-green} 為從 `MBC_UniCam`{.code-green} 匯入的類別名稱。<br>• 第 1 個數字 `1`{.code-green} 為連接埠 A；`1 ~ 6`{.code-green} 依序對應 `A ~ F`{.code-green}，請依實際接線設定。<br>• 第 2 個數字 `11`{.code-green} 為相機 Mode ID，需依欲使用的子模式修改，並與機身選單設定相同。<br>• 最後的布林欄位為非同步開關：`true`{.code-green} 啟動非同步模式，搭配 `await`{.code-green}；`false`{.code-green} 使用同步模式，搭配 `call`{.code-green}。 |


::: info ℹ️ 補充資訊
- 同步模式設定說明：

| 官方圖形指令 | 模式 | 說明 |
| --- | --- | --- |
| ![非同步設定 true](/images/tutorials/Cam/spike-block/advanced/setup/init_true.png) | 非同步模式，設定為 `true`{.code-green} | • 數值讀取時須搭配 `await`{.code-green} 做使用。![await](/images/tutorials/Cam/spike-block/advanced/main1/xy.png){style = "display: block; width: 300px; max-width: 100%; height: auto; margin: 10px;"}• 可以搭配 `multitask`{.code-green} 積木使用。![multitask](/images/tutorials/S8/spike-block/multitask.png){style = "display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"} |
| ![同步設定 false](/images/tutorials/Cam/spike-block/advanced/setup/init_false.png) | 同步模式，設定為 `false`{.code-green} | • 數值讀取時須搭配 `call`{.code-green} 做使用。![call](/images/tutorials/Cam/spike-block/advanced/main1/xy_call.png){style = "display: block; width: 300px; max-width: 100%; height: auto; margin: 10px;"}• 不可搭配 `multitask`{.code-green} 積木使用。 |

:::



#### 感應器狀態與裝置資訊

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![感應器讀取狀態](/images/tutorials/Cam/spike-block/advanced/sensor/sensor_ok.png) | 感應器讀取狀態 | `true / false`<br>• 回傳最近一次是否成功讀取。true = 成功，false = 未成功。 |
| ![程式設定的 Mode ID](/images/tutorials/Cam/spike-block/advanced/sensor/mode_number.png) | 程式設定的 Mode ID | `11 ~ 52`<br>• 回傳建立物件時或切換後的 Mode ID；有效編號為 11、12、13、14、21、22、23、30、41、42、43、51、52。 |
| ![裝置識別資訊](/images/tutorials/Cam/spike-block/advanced/sensor/device_id.png) | 裝置識別資訊 | `tuple[3]`<br>• 依序回傳 (裝置位址, 硬體代碼, 韌體版本字)。例如 (76, 3, 100)，其中 76 = 0x4C。<br>• 裝置資訊使用感應器通訊模式 `8`。 |
| ![是否為神攝手](/images/tutorials/Cam/spike-block/advanced/sensor/is_unicam.png) | 是否為神攝手 | `true / false`<br>• 依裝置識別資訊判斷是否為神攝手。 |
| ![韌體版本](/images/tutorials/Cam/spike-block/advanced/sensor/firmware_version.png) | 韌體版本 | `tuple[2]`<br>• 回傳 (主版, 次版)，例如 (1, 0)。 |

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

請將 `set up` 中的 Mode ID 設為 `11`{.code-green}，並確認相機機身選單也使用 Mode ID `11`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 11](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_11.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![指定顏色的位置 X、Y](/images/tutorials/Cam/spike-block/advanced/main1/xy.png) | 指定顏色的位置 X、Y | `X: 0, 5 ~ 155 / Y: 0, 5 ~ 115`<br>• 回傳 `(X, Y)`{.code-green}，單位為像素。<br>• 輸入數值範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的 X](/images/tutorials/Cam/spike-block/advanced/main1/x.png) | 指定顏色的 X | `0, 5 ~ 155`<br>• 回傳指定顏色的 X，向右增加。<br>• 輸入數值範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的 Y](/images/tutorials/Cam/spike-block/advanced/main1/y.png) | 指定顏色的 Y | `0, 5 ~ 115`<br>• 回傳指定顏色的 Y，向下增加。<br>• 輸入數值範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![是否找到指定顏色](/images/tutorials/Cam/spike-block/advanced/main1/found.png) | 是否找到指定顏色 | `true / false`<br>• `true`{.code-green} 表示找到目標，`false`{.code-green} 表示未找到。<br>• 輸入數值範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的分格位置](/images/tutorials/Cam/spike-block/advanced/main1/cell.png) | 指定顏色的分格位置 | `X: 0 ~ 16 / Y: 0 ~ 12`<br>• 回傳 `(X, Y)`{.code-green}，使用 `16 × 12`{.code-green} 格，並非像素；`(0, 0)`{.code-green} 表示未找到。<br>• 輸入數值範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的色塊數量](/images/tutorials/Cam/spike-block/advanced/main1/count.png) | 指定顏色的色塊數量 | `0 ~ 7`<br>• 回傳該目標色的色塊數量，不是找到的總色數。<br>• 輸入數值範圍 `1 ~ 14`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![找到顏色的色數](/images/tutorials/Cam/spike-block/advanced/main1/colors_found.png) | 找到顏色的色數 | `0 ~ 15`<br>• 回傳相機找到的總色數，不等於本模式提供位置的顏色數量上限。 |
| ![可讀顏色數量上限](/images/tutorials/Cam/spike-block/advanced/main1/max_color.png) | 可讀顏色數量上限 | `14`<br>• 本模式最多提供 `14`{.code-green} 色的資料；可用來決定讀取迴圈的上限。 |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`函式庫可讀：7 色位置與數量`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 主要資料使用感應器通訊模式 `9`。
- 數量使用感應器通訊模式 `6`，換讀取模式需要等待，只在需要時查詢。
:::

**Mode ID 設定**

請將 `set up` 中的 Mode ID 設為 `12`{.code-green}，並確認相機機身選單也使用 Mode ID `12`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 12](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_12.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![指定顏色的位置 X、Y](/images/tutorials/Cam/spike-block/advanced/main1/xy.png) | 指定顏色的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳 `(X, Y)`{.code-green}，單位為像素。<br>• 輸入數值範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的 X](/images/tutorials/Cam/spike-block/advanced/main1/x.png) | 指定顏色的 X | `0 ~ 159`<br>• 回傳指定顏色的 X，向右增加。<br>• 輸入數值範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的 Y](/images/tutorials/Cam/spike-block/advanced/main1/y.png) | 指定顏色的 Y | `0 ~ 119`<br>• 回傳指定顏色的 Y，向下增加。<br>• 輸入數值範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![是否找到指定顏色](/images/tutorials/Cam/spike-block/advanced/main1/found.png) | 是否找到指定顏色 | `true / false`<br>• `true`{.code-green} 表示找到目標，`false`{.code-green} 表示未找到。<br>• 輸入數值範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的色塊數量](/images/tutorials/Cam/spike-block/advanced/main1/count.png) | 指定顏色的色塊數量 | `0 ~ 15`<br>• 回傳該目標色的色塊數量，不是找到的總色數。<br>• 輸入數值範圍 `1 ~ 7`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![找到顏色的色數](/images/tutorials/Cam/spike-block/advanced/main1/colors_found.png) | 找到顏色的色數 | `0 ~ 15`<br>• 回傳相機找到的總色數，不等於本模式提供位置的顏色數量上限。 |
| ![可讀顏色數量上限](/images/tutorials/Cam/spike-block/advanced/main1/max_color.png) | 可讀顏色數量上限 | `7`<br>• 本模式最多提供 `7`{.code-green} 色的資料；可用來決定讀取迴圈的上限。 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`函式庫可讀：4 色位置與數量、面積`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 主要資料使用感應器通訊模式 `9`。
:::

**Mode ID 設定**

請將 `set up` 中的 Mode ID 設為 `13`{.code-green}，並確認相機機身選單也使用 Mode ID `13`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 13](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_13.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![指定顏色的位置 X、Y](/images/tutorials/Cam/spike-block/advanced/main1/xy.png) | 指定顏色的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳 `(X, Y)`{.code-green}，單位為像素。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的 X](/images/tutorials/Cam/spike-block/advanced/main1/x.png) | 指定顏色的 X | `0 ~ 159`<br>• 回傳指定顏色的 X，向右增加。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的 Y](/images/tutorials/Cam/spike-block/advanced/main1/y.png) | 指定顏色的 Y | `0 ~ 119`<br>• 回傳指定顏色的 Y，向下增加。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![是否找到指定顏色](/images/tutorials/Cam/spike-block/advanced/main1/found.png) | 是否找到指定顏色 | `true / false`<br>• `true`{.code-green} 表示找到目標，`false`{.code-green} 表示未找到。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的色塊數量](/images/tutorials/Cam/spike-block/advanced/main1/count.png) | 指定顏色的色塊數量 | `0 ~ 15`<br>• 回傳該目標色的色塊數量，不是找到的總色數。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的面積](/images/tutorials/Cam/spike-block/advanced/main1/area.png) | 指定顏色的面積 | `0 ~ 100`<br>• 回傳該色塊占畫面的面積百分比；`0`{.code-green} 表示未找到。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![可讀顏色數量上限](/images/tutorials/Cam/spike-block/advanced/main1/max_color.png) | 可讀顏色數量上限 | `4`<br>• 本模式最多提供 `4`{.code-green} 色的資料；可用來決定讀取迴圈的上限。 |

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`函式庫可讀：2 色位置與數量、面積與寬高`

::: info ℹ️ 補充資訊
- 座標使用像素，X 向右、Y 向下增加；位置 `(0, 0)` 表示未找到目標。
- 主要資料使用感應器通訊模式 `9`。
:::

**Mode ID 設定**

請將 `set up` 中的 Mode ID 設為 `14`{.code-green}，並確認相機機身選單也使用 Mode ID `14`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 14](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_14.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![指定顏色的位置 X、Y](/images/tutorials/Cam/spike-block/advanced/main1/xy.png) | 指定顏色的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳 `(X, Y)`{.code-green}，單位為像素。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的 X](/images/tutorials/Cam/spike-block/advanced/main1/x.png) | 指定顏色的 X | `0 ~ 159`<br>• 回傳指定顏色的 X，向右增加。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的 Y](/images/tutorials/Cam/spike-block/advanced/main1/y.png) | 指定顏色的 Y | `0 ~ 119`<br>• 回傳指定顏色的 Y，向下增加。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![是否找到指定顏色](/images/tutorials/Cam/spike-block/advanced/main1/found.png) | 是否找到指定顏色 | `true / false`<br>• `true`{.code-green} 表示找到目標，`false`{.code-green} 表示未找到。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的寬、高](/images/tutorials/Cam/spike-block/advanced/main1/size.png) | 指定顏色的寬、高 | `W: 0 ~ 160 / H: 0 ~ 120`<br>• 回傳 `(W, H)`{.code-green}，單位為像素。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的色塊數量](/images/tutorials/Cam/spike-block/advanced/main1/count.png) | 指定顏色的色塊數量 | `0 ~ 15`<br>• 回傳該目標色的色塊數量，不是找到的總色數。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![指定顏色的面積](/images/tutorials/Cam/spike-block/advanced/main1/area.png) | 指定顏色的面積 | `0 ~ 100`<br>• 回傳該色塊占畫面的面積百分比；`0`{.code-green} 表示未找到。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的顏色編號。圖中的 `1`{.code-green} 表示顏色 1。 |
| ![找到顏色的色數](/images/tutorials/Cam/spike-block/advanced/main1/colors_found.png) | 找到顏色的色數 | `0 ~ 16`<br>• 回傳相機找到的總色數，不等於本模式提供位置的顏色數量上限。 |
| ![可讀顏色數量上限](/images/tutorials/Cam/spike-block/advanced/main1/max_color.png) | 可讀顏色數量上限 | `2`<br>• 本模式最多提供 `2`{.code-green} 色的資料；可用來決定讀取迴圈的上限。 |

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`函式庫可讀：14 點色相`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 取樣點須先在相機上設定。未設定的取樣點回傳 0；色相 0 也可以是紅色，不能單靠色相 0 判斷未設定。
:::

**Mode ID 設定**

請將 `set up` 中的 Mode ID 設為 `21`{.code-green}，並確認相機機身選單也使用 Mode ID `21`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 21](/images/tutorials/Cam/spike-block/advanced/setup/2/setup_21.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![指定取樣點的色相](/images/tutorials/Cam/spike-block/advanced/main2/hue.png) | 指定取樣點的色相 | `0 ~ 255`<br>• 回傳取樣點的色相碼；`0`{.code-green} 可以代表紅色。<br>• 輸入數值範圍 `1 ~ 14`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![指定取樣點的 HSV](/images/tutorials/Cam/spike-block/advanced/main2/hsv.png) | 指定取樣點的 HSV | `H: 0 ~ 255 / S: None / V: None`<br>• 回傳 `(H, S, V)`{.code-green}，依序為色相、飽和度、明度。本模式未提供的項目為 `None`{.code-green}。<br>• 輸入數值範圍 `1 ~ 14`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![指定取樣點的顏色名稱](/images/tutorials/Cam/spike-block/advanced/main2/color.png) | 指定取樣點的顏色名稱 | `str`<br>• 將色相轉為顏色名稱：`red`、`orange`、`yellow`、`green`、`cyan`、`blue`、`purple`、`white`、`black`。<br>• 輸入數值範圍 `1 ~ 14`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![可讀取樣點數量上限](/images/tutorials/Cam/spike-block/advanced/main2/max_point.png) | 可讀取樣點數量上限 | `14`<br>• 本模式最多提供 `14`{.code-green} 個取樣點。 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相 + 飽和">

`函式庫可讀：7 點色相、飽和度`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 取樣點須先在相機上設定。未設定的取樣點回傳 0；色相 0 也可以是紅色，不能單靠色相 0 判斷未設定。
:::

**Mode ID 設定**

請將 `set up` 中的 Mode ID 設為 `22`{.code-green}，並確認相機機身選單也使用 Mode ID `22`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 22](/images/tutorials/Cam/spike-block/advanced/setup/2/setup_22.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![指定取樣點的色相](/images/tutorials/Cam/spike-block/advanced/main2/hue.png) | 指定取樣點的色相 | `0 ~ 255`<br>• 回傳取樣點的色相碼；`0`{.code-green} 可以代表紅色。<br>• 輸入數值範圍 `1 ~ 7`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![指定取樣點的飽和度](/images/tutorials/Cam/spike-block/advanced/main2/sat.png) | 指定取樣點的飽和度 | `0 ~ 100`<br>• 回傳指定取樣點的飽和度。<br>• 輸入數值範圍 `1 ~ 7`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![指定取樣點的 HSV](/images/tutorials/Cam/spike-block/advanced/main2/hsv.png) | 指定取樣點的 HSV | `H: 0 ~ 255 / S: 0 ~ 100 / V: None`<br>• 回傳 `(H, S, V)`{.code-green}，依序為色相、飽和度、明度。本模式未提供的項目為 `None`{.code-green}。<br>• 輸入數值範圍 `1 ~ 7`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![指定取樣點的顏色名稱](/images/tutorials/Cam/spike-block/advanced/main2/color.png) | 指定取樣點的顏色名稱 | `str`<br>• 將色相轉為顏色名稱：`red`、`orange`、`yellow`、`green`、`cyan`、`blue`、`purple`、`white`、`black`。<br>• 輸入數值範圍 `1 ~ 7`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![可讀取樣點數量上限](/images/tutorials/Cam/spike-block/advanced/main2/max_point.png) | 可讀取樣點數量上限 | `7`<br>• 本模式最多提供 `7`{.code-green} 個取樣點。 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相 + 飽和 + 明度">

`函式庫可讀：4 點色相、飽和度與明度`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 取樣點須先在相機上設定。未設定的取樣點回傳 0；色相 0 也可以是紅色，不能單靠色相 0 判斷未設定。
:::

**Mode ID 設定**

請將 `set up` 中的 Mode ID 設為 `23`{.code-green}，並確認相機機身選單也使用 Mode ID `23`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 23](/images/tutorials/Cam/spike-block/advanced/setup/2/setup_23.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![指定取樣點的色相](/images/tutorials/Cam/spike-block/advanced/main2/hue.png) | 指定取樣點的色相 | `0 ~ 255`<br>• 回傳取樣點的色相碼；`0`{.code-green} 可以代表紅色。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![指定取樣點的飽和度](/images/tutorials/Cam/spike-block/advanced/main2/sat.png) | 指定取樣點的飽和度 | `0 ~ 100`<br>• 回傳指定取樣點的飽和度。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![指定取樣點的明度](/images/tutorials/Cam/spike-block/advanced/main2/val.png) | 指定取樣點的明度 | `0 ~ 100`<br>• 回傳指定取樣點的明度。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![指定取樣點的 HSV](/images/tutorials/Cam/spike-block/advanced/main2/hsv.png) | 指定取樣點的 HSV | `H: 0 ~ 255 / S: 0 ~ 100 / V: 0 ~ 100`<br>• 回傳 `(H, S, V)`{.code-green}，依序為色相、飽和度、明度。本模式未提供的項目為 `None`{.code-green}。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![指定取樣點的顏色名稱](/images/tutorials/Cam/spike-block/advanced/main2/color.png) | 指定取樣點的顏色名稱 | `str`<br>• 將色相轉為顏色名稱：`red`、`orange`、`yellow`、`green`、`cyan`、`blue`、`purple`、`white`、`black`。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的取樣點編號。圖中的 `1`{.code-green} 表示取樣點 S1。 |
| ![可讀取樣點數量上限](/images/tutorials/Cam/spike-block/advanced/main2/max_point.png) | 可讀取樣點數量上限 | `4`<br>• 本模式最多提供 `4`{.code-green} 個取樣點。 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

`函式庫可讀：前 13 塊色相與總塊數`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 色塊由左到右排序。總塊數可能超過 13，但清單最多提供 13 塊；先確認清單長度再取指定索引。色相 0 可以是紅色。
:::

**Mode ID 設定**

請將 `set up` 中的 Mode ID 設為 `30`{.code-green}，並確認相機機身選單也使用 Mode ID `30`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 30](/images/tutorials/Cam/spike-block/advanced/setup/3/setup_30.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![由左至右的色相清單](/images/tutorials/Cam/spike-block/advanced/main3/order.png) | 由左至右的色相清單 | `list[int]`<br>• 回傳由左到右排列的色相清單，最多 13 塊；每筆色相範圍為 `0 ~ 255`{.code-green}。<br>• 清單長度就是本次實際提供的筆數；紅色色相也可以是 0。 |
| ![色塊總數](/images/tutorials/Cam/spike-block/advanced/main3/total.png) | 色塊總數 | `0 ~ 18`<br>• 回傳畫面中的總塊數，可能大於清單可提供的 13 塊。 |

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

請將 `set up` 中的 Mode ID 設為 `41`{.code-green}，並確認相機機身選單也使用 Mode ID `41`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 41](/images/tutorials/Cam/spike-block/advanced/setup/4/setup_41.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![近處偏移](/images/tutorials/Cam/spike-block/advanced/main4/near.png) | 近處偏移 | `-100 ~ 100`<br>• 回傳近處偏移。 |
| ![中段偏移](/images/tutorials/Cam/spike-block/advanced/main4/mid.png) | 中段偏移 | `-100 ~ 100`<br>• 回傳中段偏移。 |
| ![遠處偏移](/images/tutorials/Cam/spike-block/advanced/main4/far.png) | 遠處偏移 | `-100 ~ 100`<br>• 回傳遠處偏移。 |
| ![線角度](/images/tutorials/Cam/spike-block/advanced/main4/angle.png) | 線角度 | `-90 ~ 90`<br>• 回傳線角度。 單位為度。 |
| ![近處線寬](/images/tutorials/Cam/spike-block/advanced/main4/width.png) | 近處線寬 | `0 ~ 100`<br>• 回傳近處線寬。 單位為百分比。 |
| ![有線旗標](/images/tutorials/Cam/spike-block/advanced/main4/flags.png) | 有線旗標 | `0 ~ 7`<br>• 回傳有線旗標。 |
| ![路口類型](/images/tutorials/Cam/spike-block/advanced/main4/junction.png) | 路口類型 | `0 ~ 5`<br>• 回傳路口類型。 |
| ![路口距離](/images/tutorials/Cam/spike-block/advanced/main4/junction_dist.png) | 路口距離 | `0 ~ 100`<br>• 回傳路口距離。 單位為百分比。 |
| ![近處線左、右緣](/images/tutorials/Cam/spike-block/advanced/main4/edges.png) | 近處線左、右緣 | `left: -100 ~ 100 / right: -100 ~ 100`<br>• 回傳 `(左緣, 右緣)`{.code-green}；負值在畫面左側，正值在右側。 |
| ![遠處線寬](/images/tutorials/Cam/spike-block/advanced/main4/far_width.png) | 遠處線寬 | `0 ~ 100`<br>• 回傳遠處線寬。 單位為百分比。 |
| ![標記線色號與累計條數](/images/tutorials/Cam/spike-block/advanced/main4/marker.png) | 標記線色號與累計條數 | `color: 0 ~ 8 / count: 0 ~ 99`<br>• 回傳 `(色號, 累計條數)`{.code-green}，不是單一數值。 |
| ![最後離線方向](/images/tutorials/Cam/spike-block/advanced/main4/lost.png) | 最後離線方向 | `0 ~ 2`<br>• 回傳最後離線方向。 |
| ![一次讀取完整循線資料](/images/tutorials/Cam/spike-block/advanced/main4/line_all.png) | 一次讀取完整循線資料 | `tuple[14]`<br>• 依序回傳：近處偏移、中段偏移、遠處偏移、角度、近處線寬、有線旗標、路口類型、路口距離、左緣、右緣、遠處線寬、標記色號、標記累計、最後離線方向。<br>• 各項數值範圍與上方對應積木相同，適合同一輪需要多個循線值時使用。 |

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

`函式庫可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 主要資料使用感應器通訊模式 `9`。
- 偏移左負右正；角度為有號值。路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。
- 最後離線方向：0 = 有線、1 = 左、2 = 右。
:::

**Mode ID 設定**

請將 `set up` 中的 Mode ID 設為 `42`{.code-green}，並確認相機機身選單也使用 Mode ID `42`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 42](/images/tutorials/Cam/spike-block/advanced/setup/4/setup_42.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![近處偏移](/images/tutorials/Cam/spike-block/advanced/main4/near.png) | 近處偏移 | `-100 ~ 100`<br>• 回傳近處偏移。 |
| ![中段偏移](/images/tutorials/Cam/spike-block/advanced/main4/mid.png) | 中段偏移 | `-100 ~ 100`<br>• 回傳中段偏移。 |
| ![遠處偏移](/images/tutorials/Cam/spike-block/advanced/main4/far.png) | 遠處偏移 | `-100 ~ 100`<br>• 回傳遠處偏移。 |
| ![線角度](/images/tutorials/Cam/spike-block/advanced/main4/angle.png) | 線角度 | `-90 ~ 90`<br>• 回傳線角度。 單位為度。 |
| ![近處線寬](/images/tutorials/Cam/spike-block/advanced/main4/width.png) | 近處線寬 | `0 ~ 100`<br>• 回傳近處線寬。 單位為百分比。 |
| ![有線旗標](/images/tutorials/Cam/spike-block/advanced/main4/flags.png) | 有線旗標 | `0 ~ 7`<br>• 回傳有線旗標。 |
| ![路口類型](/images/tutorials/Cam/spike-block/advanced/main4/junction.png) | 路口類型 | `0 ~ 5`<br>• 回傳路口類型。 |
| ![路口距離](/images/tutorials/Cam/spike-block/advanced/main4/junction_dist.png) | 路口距離 | `0 ~ 100`<br>• 回傳路口距離。 單位為百分比。 |
| ![近處線左、右緣](/images/tutorials/Cam/spike-block/advanced/main4/edges.png) | 近處線左、右緣 | `left: -100 ~ 100 / right: -100 ~ 100`<br>• 回傳 `(左緣, 右緣)`{.code-green}；負值在畫面左側，正值在右側。 |
| ![遠處線寬](/images/tutorials/Cam/spike-block/advanced/main4/far_width.png) | 遠處線寬 | `0 ~ 100`<br>• 回傳遠處線寬。 單位為百分比。 |
| ![標記線色號與累計條數](/images/tutorials/Cam/spike-block/advanced/main4/marker.png) | 標記線色號與累計條數 | `color: 0 ~ 8 / count: 0 ~ 99`<br>• 回傳 `(色號, 累計條數)`{.code-green}，不是單一數值。 |
| ![最後離線方向](/images/tutorials/Cam/spike-block/advanced/main4/lost.png) | 最後離線方向 | `0 ~ 2`<br>• 回傳最後離線方向。 |
| ![一次讀取完整循線資料](/images/tutorials/Cam/spike-block/advanced/main4/line_all.png) | 一次讀取完整循線資料 | `tuple[14]`<br>• 依序回傳：近處偏移、中段偏移、遠處偏移、角度、近處線寬、有線旗標、路口類型、路口距離、左緣、右緣、遠處線寬、標記色號、標記累計、最後離線方向。<br>• 各項數值範圍與上方對應積木相同，適合同一輪需要多個循線值時使用。 |

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

請將 `set up` 中的 Mode ID 設為 `43`{.code-green}，並確認相機機身選單也使用 Mode ID `43`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 43](/images/tutorials/Cam/spike-block/advanced/setup/4/setup_43.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![近處偏移](/images/tutorials/Cam/spike-block/advanced/main4/near.png) | 近處偏移 | `-100 ~ 100`<br>• 回傳近處偏移。 |
| ![中段偏移](/images/tutorials/Cam/spike-block/advanced/main4/mid.png) | 中段偏移 | `-100 ~ 100`<br>• 回傳中段偏移。 |
| ![遠處偏移](/images/tutorials/Cam/spike-block/advanced/main4/far.png) | 遠處偏移 | `-100 ~ 100`<br>• 回傳遠處偏移。 |
| ![線角度](/images/tutorials/Cam/spike-block/advanced/main4/angle.png) | 線角度 | `-90 ~ 90`<br>• 回傳線角度。 單位為度。 |
| ![近處線寬](/images/tutorials/Cam/spike-block/advanced/main4/width.png) | 近處線寬 | `0 ~ 100`<br>• 回傳近處線寬。 單位為百分比。 |
| ![有線旗標](/images/tutorials/Cam/spike-block/advanced/main4/flags.png) | 有線旗標 | `0 ~ 7`<br>• 回傳有線旗標。 |
| ![路口類型](/images/tutorials/Cam/spike-block/advanced/main4/junction.png) | 路口類型 | `0 ~ 5`<br>• 回傳路口類型。 |
| ![路口距離](/images/tutorials/Cam/spike-block/advanced/main4/junction_dist.png) | 路口距離 | `0 ~ 100`<br>• 回傳路口距離。 單位為百分比。 |
| ![近處線左、右緣](/images/tutorials/Cam/spike-block/advanced/main4/edges.png) | 近處線左、右緣 | `left: -100 ~ 100 / right: -100 ~ 100`<br>• 回傳 `(左緣, 右緣)`{.code-green}；負值在畫面左側，正值在右側。 |
| ![遠處線寬](/images/tutorials/Cam/spike-block/advanced/main4/far_width.png) | 遠處線寬 | `0 ~ 100`<br>• 回傳遠處線寬。 單位為百分比。 |
| ![標記線色號與累計條數](/images/tutorials/Cam/spike-block/advanced/main4/marker.png) | 標記線色號與累計條數 | `color: 0 ~ 8 / count: 0 ~ 99`<br>• 回傳 `(色號, 累計條數)`{.code-green}，不是單一數值。 |
| ![最後離線方向](/images/tutorials/Cam/spike-block/advanced/main4/lost.png) | 最後離線方向 | `0 ~ 2`<br>• 回傳最後離線方向。 |
| ![一次讀取完整循線資料](/images/tutorials/Cam/spike-block/advanced/main4/line_all.png) | 一次讀取完整循線資料 | `tuple[14]`<br>• 依序回傳：近處偏移、中段偏移、遠處偏移、角度、近處線寬、有線旗標、路口類型、路口距離、左緣、右緣、遠處線寬、標記色號、標記累計、最後離線方向。<br>• 各項數值範圍與上方對應積木相同，適合同一輪需要多個循線值時使用。 |

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

請將 `set up` 中的 Mode ID 設為 `51`{.code-green}，並確認相機機身選單也使用 Mode ID `51`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 51](/images/tutorials/Cam/spike-block/advanced/setup/5/setup_51.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![可讀物體數量上限](/images/tutorials/Cam/spike-block/advanced/main5/max_object.png) | 可讀物體數量上限 | `4`<br>• 本模式最多提供前 `4`{.code-green} 個物體，依面積由大到小排序。 |
| ![物體總數](/images/tutorials/Cam/spike-block/advanced/main5/object_count.png) | 物體總數 | `0 ~ 8`<br>• 回傳畫面物體總數，可能多於本模式可讀物體數量上限。 |
| ![指定物體的代碼](/images/tutorials/Cam/spike-block/advanced/main5/object.png) | 指定物體的代碼 | `0, 10 ~ 89`<br>• 物體代碼 = 色號 × 10 + 形狀碼；例如 `13`{.code-green} 表示目標色 1 的三角形，`0`{.code-green} 表示沒有物體。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![是否找到指定物體](/images/tutorials/Cam/spike-block/advanced/main5/object_found.png) | 是否找到指定物體 | `true / false`<br>• `true`{.code-green} 表示有該物體，`false`{.code-green} 表示沒有；先判斷再使用形狀與位置。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![指定物體的色號](/images/tutorials/Cam/spike-block/advanced/main5/object_color.png) | 指定物體的色號 | `0 ~ 8`<br>• 回傳物體對應的目標色編號；`0`{.code-green} 表示沒有物體。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![指定物體的形狀碼](/images/tutorials/Cam/spike-block/advanced/main5/object_shape.png) | 指定物體的形狀碼 | `0 ~ 9`<br>• 回傳形狀碼。沒有物體時也可能回傳 0，先使用「是否找到指定物體」判斷。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![指定物體的位置 X、Y](/images/tutorials/Cam/spike-block/advanced/main5/object_xy.png) | 指定物體的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳質心 `(X, Y)`{.code-green}，單位為像素；`(0, 0)`{.code-green} 表示沒有物體。<br>• 輸入數值範圍 `1 ~ 4`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |

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

請將 `set up` 中的 Mode ID 設為 `52`{.code-green}，並確認相機機身選單也使用 Mode ID `52`{.code-green}。連接埠與物件名稱需和實際接線及後續積木相同。

![Mode ID 設定 52](/images/tutorials/Cam/spike-block/advanced/setup/5/setup_52.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**子模式函式功能說明**

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![可讀物體數量上限](/images/tutorials/Cam/spike-block/advanced/main5/max_object.png) | 可讀物體數量上限 | `2`<br>• 本模式最多提供前 `2`{.code-green} 個物體，依面積由大到小排序。 |
| ![指定物體的代碼](/images/tutorials/Cam/spike-block/advanced/main5/object.png) | 指定物體的代碼 | `0, 10 ~ 89`<br>• 物體代碼 = 色號 × 10 + 形狀碼；例如 `13`{.code-green} 表示目標色 1 的三角形，`0`{.code-green} 表示沒有物體。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![是否找到指定物體](/images/tutorials/Cam/spike-block/advanced/main5/object_found.png) | 是否找到指定物體 | `true / false`<br>• `true`{.code-green} 表示有該物體，`false`{.code-green} 表示沒有；先判斷再使用形狀與位置。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![指定物體的色號](/images/tutorials/Cam/spike-block/advanced/main5/object_color.png) | 指定物體的色號 | `0 ~ 8`<br>• 回傳物體對應的目標色編號；`0`{.code-green} 表示沒有物體。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![指定物體的形狀碼](/images/tutorials/Cam/spike-block/advanced/main5/object_shape.png) | 指定物體的形狀碼 | `0 ~ 9`<br>• 回傳形狀碼。沒有物體時也可能回傳 0，先使用「是否找到指定物體」判斷。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![指定物體的位置 X、Y](/images/tutorials/Cam/spike-block/advanced/main5/object_xy.png) | 指定物體的位置 X、Y | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• 回傳質心 `(X, Y)`{.code-green}，單位為像素；`(0, 0)`{.code-green} 表示沒有物體。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![指定物體的寬、高](/images/tutorials/Cam/spike-block/advanced/main5/object_size.png) | 指定物體的寬、高 | `W: 0 ~ 160 / H: 0 ~ 120`<br>• 回傳外框 `(W, H)`{.code-green}，單位為像素。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |
| ![指定物體的面積](/images/tutorials/Cam/spike-block/advanced/main5/object_area.png) | 指定物體的面積 | `0 ~ 100`<br>• 回傳物體占畫面的面積百分比。<br>• 輸入數值範圍 `1 ~ 2`{.code-green}，表示欲讀取的物體編號。圖中的 `1`{.code-green} 表示物體 1。 |

</CamModeSection>

</CamModeAccordion>

## 04 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
