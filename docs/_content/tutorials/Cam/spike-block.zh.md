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

### ✔ 前置作業

<DownloadButton href="/programs/Cam/spike-pybricks/MBC_UniCam.py" download="MBC_UniCam.py" label="MBC_UniCam.py" />

<DownloadButton href="/programs/Cam/spike-pybricks/Cam_Blocks.py" download="Cam_Blocks.py" label="Cam_Blocks.py" />

1. 下載 `MBC_UniCam.py`，匯入 Pybricks，檔名保持不變，並與主程式放在同一個工作區。
2. 再下載並匯入 `Cam_Blocks.py`。此檔將函式庫包成可由「外部任務」呼叫的單一數值函式，相機接 C 埠；換埠時修改檔案中的 `Port.C`。
3. 從 `Cam_Blocks` 匯入 `camera_mode` 與 `camera_read`。程式開始時先呼叫 `camera_mode(13)`，確認回傳 0 後，再進入重複讀值迴圈。不要同時啟用基礎篇的顏色感應器設定。

::: info ℹ️ 補充資訊
- 函式庫以通訊模式 9 讀取主要資料；模式 11、12 的數量會改讀通訊模式 6。換讀取模式需要等待，數量只在需要時查詢。
- 一次只啟用一種相機子模式，程式與相機的 Mode ID 必須相同。函式庫已處理打包、座標換算與循線有號數，不需額外加 65536。
- 座標以像素表示，X 向右、Y 向下增加。模式 11 的 `cell` 另提供 16 × 12 分格位置；像素位置取分格中心，精度不等於逐像素偵測。
- 尚未成功讀到資料時可能回傳 `None`；斷線後可能保留上一次讀值。先檢查連線狀態，再使用結果。
- `camera_read("欄位", 編號)` 的編號用來指定顏色、取樣點或物體，從 1 起算；無編號欄位仍填 1。每輪先將結果存入變數。`camera_read("sensor_ok", 1)` 回傳連線狀態。
:::

<CamModeAccordion namespace="advanced">

### ✔ 相機模式概覽

<CamModeOverview />

### ✔ 各模式讀值與解碼

#### 模式一：指定顏色追蹤

<CamModeSection mode="11" title="顏色追蹤 - ① 最多色">

`函式庫可讀：14 色位置與數量`

::: info ℹ️ 補充資訊
- 位置 (0, 0) 表示沒有目標，先判斷目標是否存在再使用座標。
- 像素座標是分格中心：X = (格子 X - 1) × 10 + 5，Y = (格子 Y - 1) × 10 + 5。每色數量最多回傳 7，7 表示 7 塊或以上。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("x", 1)` | 顏色 1 的 X | `0, 5 ~ 155`<br>• 顏色 1 的 X = 讀取數值。 |
| `camera_read("y", 1)` | 顏色 1 的 Y | `0, 5 ~ 115`<br>• 顏色 1 的 Y = 讀取數值。 |
| `camera_read("cell_x", 1)` | 顏色 1 的分格 X | `0, 1 ~ 16`<br>• 顏色 1 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 1)` | 顏色 1 的分格 Y | `0, 1 ~ 12`<br>• 顏色 1 的分格 Y = 讀取數值。 |
| `camera_read("count", 1)` | 顏色 1 的數量 | `0 ~ 7`<br>• 顏色 1 的數量 = 讀取數值。 |
| `camera_read("x", 2)` | 顏色 2 的 X | `0, 5 ~ 155`<br>• 顏色 2 的 X = 讀取數值。 |
| `camera_read("y", 2)` | 顏色 2 的 Y | `0, 5 ~ 115`<br>• 顏色 2 的 Y = 讀取數值。 |
| `camera_read("cell_x", 2)` | 顏色 2 的分格 X | `0, 1 ~ 16`<br>• 顏色 2 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 2)` | 顏色 2 的分格 Y | `0, 1 ~ 12`<br>• 顏色 2 的分格 Y = 讀取數值。 |
| `camera_read("count", 2)` | 顏色 2 的數量 | `0 ~ 7`<br>• 顏色 2 的數量 = 讀取數值。 |
| `camera_read("x", 3)` | 顏色 3 的 X | `0, 5 ~ 155`<br>• 顏色 3 的 X = 讀取數值。 |
| `camera_read("y", 3)` | 顏色 3 的 Y | `0, 5 ~ 115`<br>• 顏色 3 的 Y = 讀取數值。 |
| `camera_read("cell_x", 3)` | 顏色 3 的分格 X | `0, 1 ~ 16`<br>• 顏色 3 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 3)` | 顏色 3 的分格 Y | `0, 1 ~ 12`<br>• 顏色 3 的分格 Y = 讀取數值。 |
| `camera_read("count", 3)` | 顏色 3 的數量 | `0 ~ 7`<br>• 顏色 3 的數量 = 讀取數值。 |
| `camera_read("x", 4)` | 顏色 4 的 X | `0, 5 ~ 155`<br>• 顏色 4 的 X = 讀取數值。 |
| `camera_read("y", 4)` | 顏色 4 的 Y | `0, 5 ~ 115`<br>• 顏色 4 的 Y = 讀取數值。 |
| `camera_read("cell_x", 4)` | 顏色 4 的分格 X | `0, 1 ~ 16`<br>• 顏色 4 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 4)` | 顏色 4 的分格 Y | `0, 1 ~ 12`<br>• 顏色 4 的分格 Y = 讀取數值。 |
| `camera_read("count", 4)` | 顏色 4 的數量 | `0 ~ 7`<br>• 顏色 4 的數量 = 讀取數值。 |
| `camera_read("x", 5)` | 顏色 5 的 X | `0, 5 ~ 155`<br>• 顏色 5 的 X = 讀取數值。 |
| `camera_read("y", 5)` | 顏色 5 的 Y | `0, 5 ~ 115`<br>• 顏色 5 的 Y = 讀取數值。 |
| `camera_read("cell_x", 5)` | 顏色 5 的分格 X | `0, 1 ~ 16`<br>• 顏色 5 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 5)` | 顏色 5 的分格 Y | `0, 1 ~ 12`<br>• 顏色 5 的分格 Y = 讀取數值。 |
| `camera_read("count", 5)` | 顏色 5 的數量 | `0 ~ 7`<br>• 顏色 5 的數量 = 讀取數值。 |
| `camera_read("x", 6)` | 顏色 6 的 X | `0, 5 ~ 155`<br>• 顏色 6 的 X = 讀取數值。 |
| `camera_read("y", 6)` | 顏色 6 的 Y | `0, 5 ~ 115`<br>• 顏色 6 的 Y = 讀取數值。 |
| `camera_read("cell_x", 6)` | 顏色 6 的分格 X | `0, 1 ~ 16`<br>• 顏色 6 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 6)` | 顏色 6 的分格 Y | `0, 1 ~ 12`<br>• 顏色 6 的分格 Y = 讀取數值。 |
| `camera_read("count", 6)` | 顏色 6 的數量 | `0 ~ 7`<br>• 顏色 6 的數量 = 讀取數值。 |
| `camera_read("x", 7)` | 顏色 7 的 X | `0, 5 ~ 155`<br>• 顏色 7 的 X = 讀取數值。 |
| `camera_read("y", 7)` | 顏色 7 的 Y | `0, 5 ~ 115`<br>• 顏色 7 的 Y = 讀取數值。 |
| `camera_read("cell_x", 7)` | 顏色 7 的分格 X | `0, 1 ~ 16`<br>• 顏色 7 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 7)` | 顏色 7 的分格 Y | `0, 1 ~ 12`<br>• 顏色 7 的分格 Y = 讀取數值。 |
| `camera_read("count", 7)` | 顏色 7 的數量 | `0 ~ 7`<br>• 顏色 7 的數量 = 讀取數值。 |
| `camera_read("x", 8)` | 顏色 8 的 X | `0, 5 ~ 155`<br>• 顏色 8 的 X = 讀取數值。 |
| `camera_read("y", 8)` | 顏色 8 的 Y | `0, 5 ~ 115`<br>• 顏色 8 的 Y = 讀取數值。 |
| `camera_read("cell_x", 8)` | 顏色 8 的分格 X | `0, 1 ~ 16`<br>• 顏色 8 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 8)` | 顏色 8 的分格 Y | `0, 1 ~ 12`<br>• 顏色 8 的分格 Y = 讀取數值。 |
| `camera_read("count", 8)` | 顏色 8 的數量 | `0 ~ 7`<br>• 顏色 8 的數量 = 讀取數值。 |
| `camera_read("x", 9)` | 顏色 9 的 X | `0, 5 ~ 155`<br>• 顏色 9 的 X = 讀取數值。 |
| `camera_read("y", 9)` | 顏色 9 的 Y | `0, 5 ~ 115`<br>• 顏色 9 的 Y = 讀取數值。 |
| `camera_read("cell_x", 9)` | 顏色 9 的分格 X | `0, 1 ~ 16`<br>• 顏色 9 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 9)` | 顏色 9 的分格 Y | `0, 1 ~ 12`<br>• 顏色 9 的分格 Y = 讀取數值。 |
| `camera_read("count", 9)` | 顏色 9 的數量 | `0 ~ 7`<br>• 顏色 9 的數量 = 讀取數值。 |
| `camera_read("x", 10)` | 顏色 10 的 X | `0, 5 ~ 155`<br>• 顏色 10 的 X = 讀取數值。 |
| `camera_read("y", 10)` | 顏色 10 的 Y | `0, 5 ~ 115`<br>• 顏色 10 的 Y = 讀取數值。 |
| `camera_read("cell_x", 10)` | 顏色 10 的分格 X | `0, 1 ~ 16`<br>• 顏色 10 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 10)` | 顏色 10 的分格 Y | `0, 1 ~ 12`<br>• 顏色 10 的分格 Y = 讀取數值。 |
| `camera_read("count", 10)` | 顏色 10 的數量 | `0 ~ 7`<br>• 顏色 10 的數量 = 讀取數值。 |
| `camera_read("x", 11)` | 顏色 11 的 X | `0, 5 ~ 155`<br>• 顏色 11 的 X = 讀取數值。 |
| `camera_read("y", 11)` | 顏色 11 的 Y | `0, 5 ~ 115`<br>• 顏色 11 的 Y = 讀取數值。 |
| `camera_read("cell_x", 11)` | 顏色 11 的分格 X | `0, 1 ~ 16`<br>• 顏色 11 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 11)` | 顏色 11 的分格 Y | `0, 1 ~ 12`<br>• 顏色 11 的分格 Y = 讀取數值。 |
| `camera_read("count", 11)` | 顏色 11 的數量 | `0 ~ 7`<br>• 顏色 11 的數量 = 讀取數值。 |
| `camera_read("x", 12)` | 顏色 12 的 X | `0, 5 ~ 155`<br>• 顏色 12 的 X = 讀取數值。 |
| `camera_read("y", 12)` | 顏色 12 的 Y | `0, 5 ~ 115`<br>• 顏色 12 的 Y = 讀取數值。 |
| `camera_read("cell_x", 12)` | 顏色 12 的分格 X | `0, 1 ~ 16`<br>• 顏色 12 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 12)` | 顏色 12 的分格 Y | `0, 1 ~ 12`<br>• 顏色 12 的分格 Y = 讀取數值。 |
| `camera_read("count", 12)` | 顏色 12 的數量 | `0 ~ 7`<br>• 顏色 12 的數量 = 讀取數值。 |
| `camera_read("x", 13)` | 顏色 13 的 X | `0, 5 ~ 155`<br>• 顏色 13 的 X = 讀取數值。 |
| `camera_read("y", 13)` | 顏色 13 的 Y | `0, 5 ~ 115`<br>• 顏色 13 的 Y = 讀取數值。 |
| `camera_read("cell_x", 13)` | 顏色 13 的分格 X | `0, 1 ~ 16`<br>• 顏色 13 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 13)` | 顏色 13 的分格 Y | `0, 1 ~ 12`<br>• 顏色 13 的分格 Y = 讀取數值。 |
| `camera_read("count", 13)` | 顏色 13 的數量 | `0 ~ 7`<br>• 顏色 13 的數量 = 讀取數值。 |
| `camera_read("x", 14)` | 顏色 14 的 X | `0, 5 ~ 155`<br>• 顏色 14 的 X = 讀取數值。 |
| `camera_read("y", 14)` | 顏色 14 的 Y | `0, 5 ~ 115`<br>• 顏色 14 的 Y = 讀取數值。 |
| `camera_read("cell_x", 14)` | 顏色 14 的分格 X | `0, 1 ~ 16`<br>• 顏色 14 的分格 X = 讀取數值。 |
| `camera_read("cell_y", 14)` | 顏色 14 的分格 Y | `0, 1 ~ 12`<br>• 顏色 14 的分格 Y = 讀取數值。 |
| `camera_read("count", 14)` | 顏色 14 的數量 | `0 ~ 7`<br>• 顏色 14 的數量 = 讀取數值。 |
| `camera_read("colors_found", 1)` | 找到顏色的色數 | `0 ~ 15`<br>• 找到顏色的色數 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`函式庫可讀：7 色位置與數量`

::: info ℹ️ 補充資訊
- 位置 (0, 0) 表示沒有目標，先判斷目標是否存在再使用座標。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("x", 1)` | 顏色 1 的 X | `0 ~ 159`<br>• 顏色 1 的 X = 讀取數值。 |
| `camera_read("y", 1)` | 顏色 1 的 Y | `0 ~ 119`<br>• 顏色 1 的 Y = 讀取數值。 |
| `camera_read("count", 1)` | 顏色 1 的數量 | `0 ~ 15`<br>• 顏色 1 的數量 = 讀取數值。 |
| `camera_read("x", 2)` | 顏色 2 的 X | `0 ~ 159`<br>• 顏色 2 的 X = 讀取數值。 |
| `camera_read("y", 2)` | 顏色 2 的 Y | `0 ~ 119`<br>• 顏色 2 的 Y = 讀取數值。 |
| `camera_read("count", 2)` | 顏色 2 的數量 | `0 ~ 15`<br>• 顏色 2 的數量 = 讀取數值。 |
| `camera_read("x", 3)` | 顏色 3 的 X | `0 ~ 159`<br>• 顏色 3 的 X = 讀取數值。 |
| `camera_read("y", 3)` | 顏色 3 的 Y | `0 ~ 119`<br>• 顏色 3 的 Y = 讀取數值。 |
| `camera_read("count", 3)` | 顏色 3 的數量 | `0 ~ 15`<br>• 顏色 3 的數量 = 讀取數值。 |
| `camera_read("x", 4)` | 顏色 4 的 X | `0 ~ 159`<br>• 顏色 4 的 X = 讀取數值。 |
| `camera_read("y", 4)` | 顏色 4 的 Y | `0 ~ 119`<br>• 顏色 4 的 Y = 讀取數值。 |
| `camera_read("count", 4)` | 顏色 4 的數量 | `0 ~ 15`<br>• 顏色 4 的數量 = 讀取數值。 |
| `camera_read("x", 5)` | 顏色 5 的 X | `0 ~ 159`<br>• 顏色 5 的 X = 讀取數值。 |
| `camera_read("y", 5)` | 顏色 5 的 Y | `0 ~ 119`<br>• 顏色 5 的 Y = 讀取數值。 |
| `camera_read("count", 5)` | 顏色 5 的數量 | `0 ~ 15`<br>• 顏色 5 的數量 = 讀取數值。 |
| `camera_read("x", 6)` | 顏色 6 的 X | `0 ~ 159`<br>• 顏色 6 的 X = 讀取數值。 |
| `camera_read("y", 6)` | 顏色 6 的 Y | `0 ~ 119`<br>• 顏色 6 的 Y = 讀取數值。 |
| `camera_read("count", 6)` | 顏色 6 的數量 | `0 ~ 15`<br>• 顏色 6 的數量 = 讀取數值。 |
| `camera_read("x", 7)` | 顏色 7 的 X | `0 ~ 159`<br>• 顏色 7 的 X = 讀取數值。 |
| `camera_read("y", 7)` | 顏色 7 的 Y | `0 ~ 119`<br>• 顏色 7 的 Y = 讀取數值。 |
| `camera_read("count", 7)` | 顏色 7 的數量 | `0 ~ 15`<br>• 顏色 7 的數量 = 讀取數值。 |
| `camera_read("colors_found", 1)` | 找到顏色的色數 | `0 ~ 15`<br>• 找到顏色的色數 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`函式庫可讀：4 色位置與數量、面積`

::: info ℹ️ 補充資訊
- 位置 (0, 0) 表示沒有目標，先判斷目標是否存在再使用座標。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("x", 1)` | 顏色 1 的 X | `0 ~ 159`<br>• 顏色 1 的 X = 讀取數值。 |
| `camera_read("y", 1)` | 顏色 1 的 Y | `0 ~ 119`<br>• 顏色 1 的 Y = 讀取數值。 |
| `camera_read("count", 1)` | 顏色 1 的數量 | `0 ~ 15`<br>• 顏色 1 的數量 = 讀取數值。 |
| `camera_read("area", 1)` | 顏色 1 的面積 | `0 ~ 100`<br>• 顏色 1 的面積 = 讀取數值。 |
| `camera_read("x", 2)` | 顏色 2 的 X | `0 ~ 159`<br>• 顏色 2 的 X = 讀取數值。 |
| `camera_read("y", 2)` | 顏色 2 的 Y | `0 ~ 119`<br>• 顏色 2 的 Y = 讀取數值。 |
| `camera_read("count", 2)` | 顏色 2 的數量 | `0 ~ 15`<br>• 顏色 2 的數量 = 讀取數值。 |
| `camera_read("area", 2)` | 顏色 2 的面積 | `0 ~ 100`<br>• 顏色 2 的面積 = 讀取數值。 |
| `camera_read("x", 3)` | 顏色 3 的 X | `0 ~ 159`<br>• 顏色 3 的 X = 讀取數值。 |
| `camera_read("y", 3)` | 顏色 3 的 Y | `0 ~ 119`<br>• 顏色 3 的 Y = 讀取數值。 |
| `camera_read("count", 3)` | 顏色 3 的數量 | `0 ~ 15`<br>• 顏色 3 的數量 = 讀取數值。 |
| `camera_read("area", 3)` | 顏色 3 的面積 | `0 ~ 100`<br>• 顏色 3 的面積 = 讀取數值。 |
| `camera_read("x", 4)` | 顏色 4 的 X | `0 ~ 159`<br>• 顏色 4 的 X = 讀取數值。 |
| `camera_read("y", 4)` | 顏色 4 的 Y | `0 ~ 119`<br>• 顏色 4 的 Y = 讀取數值。 |
| `camera_read("count", 4)` | 顏色 4 的數量 | `0 ~ 15`<br>• 顏色 4 的數量 = 讀取數值。 |
| `camera_read("area", 4)` | 顏色 4 的面積 | `0 ~ 100`<br>• 顏色 4 的面積 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`函式庫可讀：2 色位置與數量、面積與寬高`

::: info ℹ️ 補充資訊
- 位置 (0, 0) 表示沒有目標，先判斷目標是否存在再使用座標。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("x", 1)` | 顏色 1 的 X | `0 ~ 159`<br>• 顏色 1 的 X = 讀取數值。 |
| `camera_read("y", 1)` | 顏色 1 的 Y | `0 ~ 119`<br>• 顏色 1 的 Y = 讀取數值。 |
| `camera_read("w", 1)` | 顏色 1 的 W | `0 ~ 160`<br>• 顏色 1 的 W = 讀取數值。 |
| `camera_read("h", 1)` | 顏色 1 的 H | `0 ~ 120`<br>• 顏色 1 的 H = 讀取數值。 |
| `camera_read("count", 1)` | 顏色 1 的數量 | `0 ~ 15`<br>• 顏色 1 的數量 = 讀取數值。 |
| `camera_read("area", 1)` | 顏色 1 的面積 | `0 ~ 100`<br>• 顏色 1 的面積 = 讀取數值。 |
| `camera_read("x", 2)` | 顏色 2 的 X | `0 ~ 159`<br>• 顏色 2 的 X = 讀取數值。 |
| `camera_read("y", 2)` | 顏色 2 的 Y | `0 ~ 119`<br>• 顏色 2 的 Y = 讀取數值。 |
| `camera_read("w", 2)` | 顏色 2 的 W | `0 ~ 160`<br>• 顏色 2 的 W = 讀取數值。 |
| `camera_read("h", 2)` | 顏色 2 的 H | `0 ~ 120`<br>• 顏色 2 的 H = 讀取數值。 |
| `camera_read("count", 2)` | 顏色 2 的數量 | `0 ~ 15`<br>• 顏色 2 的數量 = 讀取數值。 |
| `camera_read("area", 2)` | 顏色 2 的面積 | `0 ~ 100`<br>• 顏色 2 的面積 = 讀取數值。 |
| `camera_read("colors_found", 1)` | 找到顏色的色數 | `0 ~ 16`<br>• 找到顏色的色數 = 讀取數值。 |

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`函式庫可讀：14 點色相`

::: info ℹ️ 補充資訊
- 取樣點須先在相機上設定。未設定的取樣點回傳 0；色相 0 也可以是紅色，不能單靠色相 0 判斷未設定。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("hue", 1)` | S1 色相 | `0 ~ 255`<br>• S1 色相 = 讀取數值。 |
| `camera_read("hue", 2)` | S2 色相 | `0 ~ 255`<br>• S2 色相 = 讀取數值。 |
| `camera_read("hue", 3)` | S3 色相 | `0 ~ 255`<br>• S3 色相 = 讀取數值。 |
| `camera_read("hue", 4)` | S4 色相 | `0 ~ 255`<br>• S4 色相 = 讀取數值。 |
| `camera_read("hue", 5)` | S5 色相 | `0 ~ 255`<br>• S5 色相 = 讀取數值。 |
| `camera_read("hue", 6)` | S6 色相 | `0 ~ 255`<br>• S6 色相 = 讀取數值。 |
| `camera_read("hue", 7)` | S7 色相 | `0 ~ 255`<br>• S7 色相 = 讀取數值。 |
| `camera_read("hue", 8)` | S8 色相 | `0 ~ 255`<br>• S8 色相 = 讀取數值。 |
| `camera_read("hue", 9)` | S9 色相 | `0 ~ 255`<br>• S9 色相 = 讀取數值。 |
| `camera_read("hue", 10)` | S10 色相 | `0 ~ 255`<br>• S10 色相 = 讀取數值。 |
| `camera_read("hue", 11)` | S11 色相 | `0 ~ 255`<br>• S11 色相 = 讀取數值。 |
| `camera_read("hue", 12)` | S12 色相 | `0 ~ 255`<br>• S12 色相 = 讀取數值。 |
| `camera_read("hue", 13)` | S13 色相 | `0 ~ 255`<br>• S13 色相 = 讀取數值。 |
| `camera_read("hue", 14)` | S14 色相 | `0 ~ 255`<br>• S14 色相 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相 + 飽和">

`函式庫可讀：7 點色相、飽和度`

::: info ℹ️ 補充資訊
- 取樣點須先在相機上設定。未設定的取樣點回傳 0；色相 0 也可以是紅色，不能單靠色相 0 判斷未設定。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("hue", 1)` | S1 色相 | `0 ~ 255`<br>• S1 色相 = 讀取數值。 |
| `camera_read("sat", 1)` | S1 飽和度 | `0 ~ 100`<br>• S1 飽和度 = 讀取數值。 |
| `camera_read("hue", 2)` | S2 色相 | `0 ~ 255`<br>• S2 色相 = 讀取數值。 |
| `camera_read("sat", 2)` | S2 飽和度 | `0 ~ 100`<br>• S2 飽和度 = 讀取數值。 |
| `camera_read("hue", 3)` | S3 色相 | `0 ~ 255`<br>• S3 色相 = 讀取數值。 |
| `camera_read("sat", 3)` | S3 飽和度 | `0 ~ 100`<br>• S3 飽和度 = 讀取數值。 |
| `camera_read("hue", 4)` | S4 色相 | `0 ~ 255`<br>• S4 色相 = 讀取數值。 |
| `camera_read("sat", 4)` | S4 飽和度 | `0 ~ 100`<br>• S4 飽和度 = 讀取數值。 |
| `camera_read("hue", 5)` | S5 色相 | `0 ~ 255`<br>• S5 色相 = 讀取數值。 |
| `camera_read("sat", 5)` | S5 飽和度 | `0 ~ 100`<br>• S5 飽和度 = 讀取數值。 |
| `camera_read("hue", 6)` | S6 色相 | `0 ~ 255`<br>• S6 色相 = 讀取數值。 |
| `camera_read("sat", 6)` | S6 飽和度 | `0 ~ 100`<br>• S6 飽和度 = 讀取數值。 |
| `camera_read("hue", 7)` | S7 色相 | `0 ~ 255`<br>• S7 色相 = 讀取數值。 |
| `camera_read("sat", 7)` | S7 飽和度 | `0 ~ 100`<br>• S7 飽和度 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相 + 飽和 + 明度">

`函式庫可讀：4 點色相、飽和度與明度`

::: info ℹ️ 補充資訊
- 取樣點須先在相機上設定。未設定的取樣點回傳 0；色相 0 也可以是紅色，不能單靠色相 0 判斷未設定。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("hue", 1)` | S1 色相 | `0 ~ 255`<br>• S1 色相 = 讀取數值。 |
| `camera_read("sat", 1)` | S1 飽和度 | `0 ~ 100`<br>• S1 飽和度 = 讀取數值。 |
| `camera_read("val", 1)` | S1 明度 | `0 ~ 100`<br>• S1 明度 = 讀取數值。 |
| `camera_read("hue", 2)` | S2 色相 | `0 ~ 255`<br>• S2 色相 = 讀取數值。 |
| `camera_read("sat", 2)` | S2 飽和度 | `0 ~ 100`<br>• S2 飽和度 = 讀取數值。 |
| `camera_read("val", 2)` | S2 明度 | `0 ~ 100`<br>• S2 明度 = 讀取數值。 |
| `camera_read("hue", 3)` | S3 色相 | `0 ~ 255`<br>• S3 色相 = 讀取數值。 |
| `camera_read("sat", 3)` | S3 飽和度 | `0 ~ 100`<br>• S3 飽和度 = 讀取數值。 |
| `camera_read("val", 3)` | S3 明度 | `0 ~ 100`<br>• S3 明度 = 讀取數值。 |
| `camera_read("hue", 4)` | S4 色相 | `0 ~ 255`<br>• S4 色相 = 讀取數值。 |
| `camera_read("sat", 4)` | S4 飽和度 | `0 ~ 100`<br>• S4 飽和度 = 讀取數值。 |
| `camera_read("val", 4)` | S4 明度 | `0 ~ 100`<br>• S4 明度 = 讀取數值。 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

`函式庫可讀：前 13 塊色相與總塊數`

::: info ℹ️ 補充資訊
- 色塊由左到右排序。總塊數可能超過 13，但清單最多提供 13 塊；先確認清單長度再取指定索引。色相 0 可以是紅色。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("order", 1)` | 左起第 1 塊色相 | `0 ~ 255`<br>• 左起第 1 塊色相 = 讀取數值。 |
| `camera_read("order", 2)` | 左起第 2 塊色相 | `0 ~ 255`<br>• 左起第 2 塊色相 = 讀取數值。 |
| `camera_read("order", 3)` | 左起第 3 塊色相 | `0 ~ 255`<br>• 左起第 3 塊色相 = 讀取數值。 |
| `camera_read("order", 4)` | 左起第 4 塊色相 | `0 ~ 255`<br>• 左起第 4 塊色相 = 讀取數值。 |
| `camera_read("order", 5)` | 左起第 5 塊色相 | `0 ~ 255`<br>• 左起第 5 塊色相 = 讀取數值。 |
| `camera_read("order", 6)` | 左起第 6 塊色相 | `0 ~ 255`<br>• 左起第 6 塊色相 = 讀取數值。 |
| `camera_read("order", 7)` | 左起第 7 塊色相 | `0 ~ 255`<br>• 左起第 7 塊色相 = 讀取數值。 |
| `camera_read("order", 8)` | 左起第 8 塊色相 | `0 ~ 255`<br>• 左起第 8 塊色相 = 讀取數值。 |
| `camera_read("order", 9)` | 左起第 9 塊色相 | `0 ~ 255`<br>• 左起第 9 塊色相 = 讀取數值。 |
| `camera_read("order", 10)` | 左起第 10 塊色相 | `0 ~ 255`<br>• 左起第 10 塊色相 = 讀取數值。 |
| `camera_read("order", 11)` | 左起第 11 塊色相 | `0 ~ 255`<br>• 左起第 11 塊色相 = 讀取數值。 |
| `camera_read("order", 12)` | 左起第 12 塊色相 | `0 ~ 255`<br>• 左起第 12 塊色相 = 讀取數值。 |
| `camera_read("order", 13)` | 左起第 13 塊色相 | `0 ~ 255`<br>• 左起第 13 塊色相 = 讀取數值。 |
| `camera_read("total", 1)` | 色塊總數 | `0 ~ 18`<br>• 色塊總數 = 讀取數值。 |

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

`函式庫可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 偏移左負右正；角度為有號值。路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。
- 最後離線方向：0 = 有線、1 = 左、2 = 右。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("near", 1)` | 近處偏移 | `-100 ~ 100`<br>• 近處偏移 = 讀取數值。 |
| `camera_read("mid", 1)` | 中段偏移 | `-100 ~ 100`<br>• 中段偏移 = 讀取數值。 |
| `camera_read("far", 1)` | 遠處偏移 | `-100 ~ 100`<br>• 遠處偏移 = 讀取數值。 |
| `camera_read("angle", 1)` | 線角度 | `-90 ~ 90`<br>• 線角度 = 讀取數值。 |
| `camera_read("width", 1)` | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| `camera_read("flags", 1)` | 有線旗標 | `0 ~ 7`<br>• 有線旗標 = 讀取數值。 |
| `camera_read("junction", 1)` | 路口類型 | `0 ~ 5`<br>• 路口類型 = 讀取數值。 |
| `camera_read("junction_dist", 1)` | 路口距離 | `0 ~ 100`<br>• 路口距離 = 讀取數值。 |
| `camera_read("left", 1)` | 近處線左緣 | `-100 ~ 100`<br>• 近處線左緣 = 讀取數值。 |
| `camera_read("right", 1)` | 近處線右緣 | `-100 ~ 100`<br>• 近處線右緣 = 讀取數值。 |
| `camera_read("far_width", 1)` | 遠處線寬 | `0 ~ 100`<br>• 遠處線寬 = 讀取數值。 |
| `camera_read("marker_color", 1)` | 標記線色號 | `0 ~ 8`<br>• 標記線色號 = 讀取數值。 |
| `camera_read("marker_count", 1)` | 標記線累計條數 | `0 ~ 99`<br>• 標記線累計條數 = 讀取數值。 |
| `camera_read("lost", 1)` | 最後離線方向 | `0 ~ 2`<br>• 最後離線方向 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="42" title="循線 - ② 白線">

`函式庫可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 偏移左負右正；角度為有號值。路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。
- 最後離線方向：0 = 有線、1 = 左、2 = 右。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("near", 1)` | 近處偏移 | `-100 ~ 100`<br>• 近處偏移 = 讀取數值。 |
| `camera_read("mid", 1)` | 中段偏移 | `-100 ~ 100`<br>• 中段偏移 = 讀取數值。 |
| `camera_read("far", 1)` | 遠處偏移 | `-100 ~ 100`<br>• 遠處偏移 = 讀取數值。 |
| `camera_read("angle", 1)` | 線角度 | `-90 ~ 90`<br>• 線角度 = 讀取數值。 |
| `camera_read("width", 1)` | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| `camera_read("flags", 1)` | 有線旗標 | `0 ~ 7`<br>• 有線旗標 = 讀取數值。 |
| `camera_read("junction", 1)` | 路口類型 | `0 ~ 5`<br>• 路口類型 = 讀取數值。 |
| `camera_read("junction_dist", 1)` | 路口距離 | `0 ~ 100`<br>• 路口距離 = 讀取數值。 |
| `camera_read("left", 1)` | 近處線左緣 | `-100 ~ 100`<br>• 近處線左緣 = 讀取數值。 |
| `camera_read("right", 1)` | 近處線右緣 | `-100 ~ 100`<br>• 近處線右緣 = 讀取數值。 |
| `camera_read("far_width", 1)` | 遠處線寬 | `0 ~ 100`<br>• 遠處線寬 = 讀取數值。 |
| `camera_read("marker_color", 1)` | 標記線色號 | `0 ~ 8`<br>• 標記線色號 = 讀取數值。 |
| `camera_read("marker_count", 1)` | 標記線累計條數 | `0 ~ 99`<br>• 標記線累計條數 = 讀取數值。 |
| `camera_read("lost", 1)` | 最後離線方向 | `0 ~ 2`<br>• 最後離線方向 = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="43" title="循線 - ③ 色線">

`函式庫可讀：14 個循線讀值`

::: info ℹ️ 補充資訊
- 偏移左負右正；角度為有號值。路口類型：0 = 無、1 = 十字、2 = T、3 = 左、4 = 右、5 = 盡頭。有線旗標 = 近 1 + 中 2 + 遠 4。
- 先將線的顏色教成目標色 1。
- 最後離線方向：0 = 有線、1 = 左、2 = 右。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("near", 1)` | 近處偏移 | `-100 ~ 100`<br>• 近處偏移 = 讀取數值。 |
| `camera_read("mid", 1)` | 中段偏移 | `-100 ~ 100`<br>• 中段偏移 = 讀取數值。 |
| `camera_read("far", 1)` | 遠處偏移 | `-100 ~ 100`<br>• 遠處偏移 = 讀取數值。 |
| `camera_read("angle", 1)` | 線角度 | `-90 ~ 90`<br>• 線角度 = 讀取數值。 |
| `camera_read("width", 1)` | 近處線寬 | `0 ~ 100`<br>• 近處線寬 = 讀取數值。 |
| `camera_read("flags", 1)` | 有線旗標 | `0 ~ 7`<br>• 有線旗標 = 讀取數值。 |
| `camera_read("junction", 1)` | 路口類型 | `0 ~ 5`<br>• 路口類型 = 讀取數值。 |
| `camera_read("junction_dist", 1)` | 路口距離 | `0 ~ 100`<br>• 路口距離 = 讀取數值。 |
| `camera_read("left", 1)` | 近處線左緣 | `-100 ~ 100`<br>• 近處線左緣 = 讀取數值。 |
| `camera_read("right", 1)` | 近處線右緣 | `-100 ~ 100`<br>• 近處線右緣 = 讀取數值。 |
| `camera_read("far_width", 1)` | 遠處線寬 | `0 ~ 100`<br>• 遠處線寬 = 讀取數值。 |
| `camera_read("marker_color", 1)` | 標記線色號 | `0 ~ 8`<br>• 標記線色號 = 讀取數值。 |
| `camera_read("marker_count", 1)` | 標記線累計條數 | `0 ~ 99`<br>• 標記線累計條數 = 讀取數值。 |
| `camera_read("lost", 1)` | 最後離線方向 | `0 ~ 2`<br>• 最後離線方向 = 讀取數值。 |

</CamModeSection>

#### 模式五：物體偵測

<CamModeSection mode="51" title="物體偵測 - ① 物體清單">

`函式庫可讀：前 4 個物體與物體總數`

::: info ℹ️ 補充資訊
- 只辨識目標色 1 ~ 8；物體依面積由大到小排序。代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。先判斷物體是否存在再使用資料。
- 形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("object_count", 1)` | 物體總數 | `0 ~ 8`<br>• 物體總數 = 讀取數值。 |
| `camera_read("object", 1)` | 物體 1 代碼 | `0, 10 ~ 89`<br>• 物體 1 代碼 = 讀取數值。 |
| `camera_read("object_color", 1)` | 物體 1 色號 | `0 ~ 8`<br>• 物體 1 色號 = 讀取數值。 |
| `camera_read("object_shape", 1)` | 物體 1 形狀碼 | `0 ~ 9`<br>• 物體 1 形狀碼 = 讀取數值。 |
| `camera_read("object_x", 1)` | 物體 1 的 X | `0 ~ 159`<br>• 物體 1 的 X = 讀取數值。 |
| `camera_read("object_y", 1)` | 物體 1 的 Y | `0 ~ 119`<br>• 物體 1 的 Y = 讀取數值。 |
| `camera_read("object", 2)` | 物體 2 代碼 | `0, 10 ~ 89`<br>• 物體 2 代碼 = 讀取數值。 |
| `camera_read("object_color", 2)` | 物體 2 色號 | `0 ~ 8`<br>• 物體 2 色號 = 讀取數值。 |
| `camera_read("object_shape", 2)` | 物體 2 形狀碼 | `0 ~ 9`<br>• 物體 2 形狀碼 = 讀取數值。 |
| `camera_read("object_x", 2)` | 物體 2 的 X | `0 ~ 159`<br>• 物體 2 的 X = 讀取數值。 |
| `camera_read("object_y", 2)` | 物體 2 的 Y | `0 ~ 119`<br>• 物體 2 的 Y = 讀取數值。 |
| `camera_read("object", 3)` | 物體 3 代碼 | `0, 10 ~ 89`<br>• 物體 3 代碼 = 讀取數值。 |
| `camera_read("object_color", 3)` | 物體 3 色號 | `0 ~ 8`<br>• 物體 3 色號 = 讀取數值。 |
| `camera_read("object_shape", 3)` | 物體 3 形狀碼 | `0 ~ 9`<br>• 物體 3 形狀碼 = 讀取數值。 |
| `camera_read("object_x", 3)` | 物體 3 的 X | `0 ~ 159`<br>• 物體 3 的 X = 讀取數值。 |
| `camera_read("object_y", 3)` | 物體 3 的 Y | `0 ~ 119`<br>• 物體 3 的 Y = 讀取數值。 |
| `camera_read("object", 4)` | 物體 4 代碼 | `0, 10 ~ 89`<br>• 物體 4 代碼 = 讀取數值。 |
| `camera_read("object_color", 4)` | 物體 4 色號 | `0 ~ 8`<br>• 物體 4 色號 = 讀取數值。 |
| `camera_read("object_shape", 4)` | 物體 4 形狀碼 | `0 ~ 9`<br>• 物體 4 形狀碼 = 讀取數值。 |
| `camera_read("object_x", 4)` | 物體 4 的 X | `0 ~ 159`<br>• 物體 4 的 X = 讀取數值。 |
| `camera_read("object_y", 4)` | 物體 4 的 Y | `0 ~ 119`<br>• 物體 4 的 Y = 讀取數值。 |

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

`函式庫可讀：前 2 個物體的位置、寬高與面積`

::: info ℹ️ 補充資訊
- 只辨識目標色 1 ~ 8；物體依面積由大到小排序。代碼 = 色號 × 10 + 形狀碼，0 表示沒有物體。先判斷物體是否存在再使用資料。
- 形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `camera_read("object", 1)` | 物體 1 代碼 | `0, 10 ~ 89`<br>• 物體 1 代碼 = 讀取數值。 |
| `camera_read("object_color", 1)` | 物體 1 色號 | `0 ~ 8`<br>• 物體 1 色號 = 讀取數值。 |
| `camera_read("object_shape", 1)` | 物體 1 形狀碼 | `0 ~ 9`<br>• 物體 1 形狀碼 = 讀取數值。 |
| `camera_read("object_x", 1)` | 物體 1 的 X | `0 ~ 159`<br>• 物體 1 的 X = 讀取數值。 |
| `camera_read("object_y", 1)` | 物體 1 的 Y | `0 ~ 119`<br>• 物體 1 的 Y = 讀取數值。 |
| `camera_read("object_w", 1)` | 物體 1 的 W | `0 ~ 160`<br>• 物體 1 的 W = 讀取數值。 |
| `camera_read("object_h", 1)` | 物體 1 的 H | `0 ~ 120`<br>• 物體 1 的 H = 讀取數值。 |
| `camera_read("object_area", 1)` | 物體 1 的面積 | `0 ~ 100`<br>• 物體 1 的面積 = 讀取數值。 |
| `camera_read("object", 2)` | 物體 2 代碼 | `0, 10 ~ 89`<br>• 物體 2 代碼 = 讀取數值。 |
| `camera_read("object_color", 2)` | 物體 2 色號 | `0 ~ 8`<br>• 物體 2 色號 = 讀取數值。 |
| `camera_read("object_shape", 2)` | 物體 2 形狀碼 | `0 ~ 9`<br>• 物體 2 形狀碼 = 讀取數值。 |
| `camera_read("object_x", 2)` | 物體 2 的 X | `0 ~ 159`<br>• 物體 2 的 X = 讀取數值。 |
| `camera_read("object_y", 2)` | 物體 2 的 Y | `0 ~ 119`<br>• 物體 2 的 Y = 讀取數值。 |
| `camera_read("object_w", 2)` | 物體 2 的 W | `0 ~ 160`<br>• 物體 2 的 W = 讀取數值。 |
| `camera_read("object_h", 2)` | 物體 2 的 H | `0 ~ 120`<br>• 物體 2 的 H = 讀取數值。 |
| `camera_read("object_area", 2)` | 物體 2 的面積 | `0 ~ 100`<br>• 物體 2 的面積 = 讀取數值。 |

</CamModeSection>

</CamModeAccordion>

### ✔ 進階控制範例

先教好目標色 1。使用「外部任務」匯入上述兩個函式，依下表建立積木；表內名稱就是外部任務名稱，不是原生顏色感應器積木。

| 順序 | 積木操作 |
| --- | --- |
| 1 | 呼叫 `camera_mode(13)`，確認回傳 0；僅在進入迴圈前執行一次。 |
| 2 | 重複執行：將 `camera_read("x", 1)`、`camera_read("y", 1)`、`camera_read("area", 1)`、`camera_read("count", 1)` 分別存入 X、Y、area、count。 |
| 3 | 確認 `camera_read("sensor_ok", 1)` 為真，且 X 不是 `None`；X 為 0 時表示未找到，否則顯示 X、Y、面積與數量。 |
| 4 | 等待 0.1 秒，再開始下一輪。 |

*［圖片待補｜Cam Pybricks Blocks 外部任務匯入、camera_mode 與 camera_read 積木設定，以及完整進階範例截圖］*

### ✔ 函式庫控制與狀態

`camera_mode(Mode ID)` 切換相機；`camera_read("mode_number", 1)` 查目前程式設定。其他讀值依上表選欄位。燈光、遠端教色與鏡頭設定等控制函式請參考[站內 Pybricks Python 進階篇](./spike-python.md#_03-進階控制-前置作業與函數功能說明)。

## 04 / 【Lego】 Lau Xiao 示範影片

<CamDemoVideos />

[回首頁選擇其他教學](/)
