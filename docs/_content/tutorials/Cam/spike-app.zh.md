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
- 官方 App 會將神攝手顯示為「顏色感應器」，可直接透過原生顏色感應器做數值讀取。
- 表中的「 ÷ 」表示整數除法，需捨去小數；「mod」表示取餘數。先把積木讀值存成變數，再解碼，避免同一筆資料讀到不同影格。
- 面積、飽和度、明度、線寬與路口距離以百分比表示，數值範圍不另外加百分號。
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

`官方積木可讀：7 色位置`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 向下增加。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
- 每個打包讀值欄位最多放兩色位置，不代表每個畫面分格只能偵測兩色。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 找到顏色的色數 | `0 ~ 16`<br>• 找到顏色的色數 = 讀取數值。<br>• 這是找到的總色數；本模式可讀到幾色位置，請看上方數量說明。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 顏色 1 位置 | `0, 11 ~ 86`<br>• 顏色 1 的 X = 讀取數值 ÷ 10。<br>• 顏色 1 的 Y = 讀取數值 mod 10。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 顏色 2 位置 與 顏色 3 位置 | `0 ~ 8686`<br>• 顏色 2 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 2 的 X = (讀取數值 ÷ 100) ÷ 10。<br>• 顏色 2 的 Y = (讀取數值 ÷ 100) mod 10。<br>• 顏色 3 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 3 的 X = (讀取數值 mod 100) ÷ 10。<br>• 顏色 3 的 Y = (讀取數值 mod 100) mod 10。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 顏色 4 位置 與 顏色 5 位置 | `0 ~ 8686`<br>• 顏色 4 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 4 的 X = (讀取數值 ÷ 100) ÷ 10。<br>• 顏色 4 的 Y = (讀取數值 ÷ 100) mod 10。<br>• 顏色 5 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 5 的 X = (讀取數值 mod 100) ÷ 10。<br>• 顏色 5 的 Y = (讀取數值 mod 100) mod 10。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 顏色 6 位置 與 顏色 7 位置 | `0 ~ 8686`<br>• 顏色 6 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 6 的 X = (讀取數值 ÷ 100) ÷ 10。<br>• 顏色 6 的 Y = (讀取數值 ÷ 100) mod 10。<br>• 顏色 7 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 7 的 X = (讀取數值 mod 100) ÷ 10。<br>• 顏色 7 的 Y = (讀取數值 mod 100) mod 10。 |

</CamModeSection>

<CamModeSection mode="12" title="顏色追蹤 - ② 多色">

`官方積木可讀：7 色位置`

::: info ℹ️ 補充資訊
- 座標使用 `8 × 6` 格，X 向右、Y 向下增加。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
- 每個打包讀值欄位最多放兩色位置，不代表每個畫面分格只能偵測兩色。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 找到顏色的色數 | `0 ~ 16`<br>• 回傳找到顏色的色數 = 讀取數值。<br>• 這是找到的總色數；本模式可讀到幾色位置，請看上方數量說明。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 顏色 1 位置 | `0, 11 ~ 86`<br>• 顏色 1 的 X = 讀取數值 ÷ 10。<br>• 顏色 1 的 Y = 讀取數值 mod 10。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 顏色 2 位置 與 顏色 3 位置 | `0 ~ 8686`<br>• 顏色 2 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 2 的 X = (讀取數值 ÷ 100) ÷ 10。<br>• 顏色 2 的 Y = (讀取數值 ÷ 100) mod 10。<br>• 顏色 3 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 3 的 X = (讀取數值 mod 100) ÷ 10。<br>• 顏色 3 的 Y = (讀取數值 mod 100) mod 10。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 顏色 4 位置 與 顏色 5 位置 | `0 ~ 8686`<br>• 顏色 4 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 4 的 X = (讀取數值 ÷ 100) ÷ 10。<br>• 顏色 4 的 Y = (讀取數值 ÷ 100) mod 10。<br>• 顏色 5 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 5 的 X = (讀取數值 mod 100) ÷ 10。<br>• 顏色 5 的 Y = (讀取數值 mod 100) mod 10。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 顏色 6 位置 與 顏色 7 位置 | `0 ~ 8686`<br>• 顏色 6 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 6 的 X = (讀取數值 ÷ 100) ÷ 10。<br>• 顏色 6 的 Y = (讀取數值 ÷ 100) mod 10。<br>• 顏色 7 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 顏色 7 的 X = (讀取數值 mod 100) ÷ 10。<br>• 顏色 7 的 Y = (讀取數值 mod 100) mod 10。 |

</CamModeSection>

<CamModeSection mode="13" title="顏色追蹤 - ③ 標準">

`官方積木可讀：4 色位置`

::: info ℹ️ 補充資訊
- 座標使用 `16 × 12` 格，X 向右、Y 向下增加。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 顏色 1 的 X | `0, 1 ~ 16`<br>• 顏色 1 的 X = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 顏色 1 的 Y | `0, 1 ~ 12`<br>• 顏色 1 的 Y = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 顏色 2 的 X 與 顏色 2 的 Y | `0 ~ 3088`<br>• 顏色 2 的 X 範圍：`0, 1 ~ 16`{.code-green}。<br>• 顏色 2 的 X = 讀取數值 mod 256。<br>• 顏色 2 的 Y 範圍：`0, 1 ~ 12`{.code-green}。<br>• 顏色 2 的 Y = 讀取數值 ÷ 256。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 顏色 3 的 X 與 顏色 3 的 Y | `0 ~ 3088`<br>• 顏色 3 的 X 範圍：`0, 1 ~ 16`{.code-green}。<br>• 顏色 3 的 X = 讀取數值 mod 256。<br>• 顏色 3 的 Y 範圍：`0, 1 ~ 12`{.code-green}。<br>• 顏色 3 的 Y = 讀取數值 ÷ 256。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 顏色 4 的 X 與 顏色 4 的 Y | `0 ~ 3088`<br>• 顏色 4 的 X 範圍：`0, 1 ~ 16`{.code-green}。<br>• 顏色 4 的 X = 讀取數值 mod 256。<br>• 顏色 4 的 Y 範圍：`0, 1 ~ 12`{.code-green}。<br>• 顏色 4 的 Y = 讀取數值 ÷ 256。 |

</CamModeSection>

<CamModeSection mode="14" title="顏色追蹤 - ④ 精細">

`官方積木可讀：2 色位置與寬高`

::: info ℹ️ 補充資訊
- 座標使用 `16 × 12` 格，X 向右、Y 向下增加。回傳的是分格位置，非實際像素。若位置回傳 0 表示未找到。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 顏色 1 的 X | `0, 1 ~ 16`<br>• 顏色 1 的 X = 讀取數值。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 顏色 1 的 Y | `0, 1 ~ 12`<br>• 顏色 1 的 Y = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 顏色 2 的 X 與 顏色 2 的 Y | `0 ~ 3088`<br>• 顏色 2 的 X 範圍：`0, 1 ~ 16`{.code-green}。<br>• 顏色 2 的 X = 讀取數值 mod 256。<br>• 顏色 2 的 Y 範圍：`0, 1 ~ 12`{.code-green}。<br>• 顏色 2 的 Y = 讀取數值 ÷ 256。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 顏色 1 的 W 與 顏色 1 的 H | `0 ~ 3088`<br>• 顏色 1 的 W 範圍：`0, 1 ~ 16`{.code-green}。<br>• 顏色 1 的 W = 讀取數值 mod 256。<br>• 顏色 1 的 H 範圍：`0, 1 ~ 12`{.code-green}。<br>• 顏色 1 的 H = 讀取數值 ÷ 256。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 顏色 2 的 W 與 顏色 2 的 H | `0 ~ 3088`<br>• 顏色 2 的 W 範圍：`0, 1 ~ 16`{.code-green}。<br>• 顏色 2 的 W = 讀取數值 mod 256。<br>• 顏色 2 的 H 範圍：`0, 1 ~ 12`{.code-green}。<br>• 顏色 2 的 H = 讀取數值 ÷ 256。 |

</CamModeSection>

#### 模式二：指定座標取色

<CamModeSection mode="21" title="座標取色 - ① 色相">

`官方積木可讀：6 點色相`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | S1 色相 與 S2 色相 | `0 ~ 65535`<br>• S1 色相 範圍：`0 ~ 255`{.code-green}。<br>• S1 色相 = 讀取數值 mod 256。<br>• S2 色相 範圍：`0 ~ 255`{.code-green}。<br>• S2 色相 = 讀取數值 ÷ 256。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | S3 色相 與 S4 色相 | `0 ~ 65535`<br>• S3 色相 範圍：`0 ~ 255`{.code-green}。<br>• S3 色相 = 讀取數值 mod 256。<br>• S4 色相 範圍：`0 ~ 255`{.code-green}。<br>• S4 色相 = 讀取數值 ÷ 256。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | S5 色相 與 S6 色相 | `0 ~ 65535`<br>• S5 色相 範圍：`0 ~ 255`{.code-green}。<br>• S5 色相 = 讀取數值 mod 256。<br>• S6 色相 範圍：`0 ~ 255`{.code-green}。<br>• S6 色相 = 讀取數值 ÷ 256。 |

</CamModeSection>

<CamModeSection mode="22" title="座標取色 - ② 色相 + 飽和">

`官方積木可讀：3 點完整色相與飽和度，另有 S4 飽和度`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | S4 飽和度 | `0 ~ 100`<br>• S4 飽和度 = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | S1 色相 與 S1 飽和度 | `0 ~ 25855`<br>• S1 色相 範圍：`0 ~ 255`{.code-green}。<br>• S1 色相 = 讀取數值 mod 256。<br>• S1 飽和度 範圍：`0 ~ 100`{.code-green}。<br>• S1 飽和度 = 讀取數值 ÷ 256。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | S2 色相 與 S2 飽和度 | `0 ~ 25855`<br>• S2 色相 範圍：`0 ~ 255`{.code-green}。<br>• S2 色相 = 讀取數值 mod 256。<br>• S2 飽和度 範圍：`0 ~ 100`{.code-green}。<br>• S2 飽和度 = 讀取數值 ÷ 256。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | S3 色相 與 S3 飽和度 | `0 ~ 25855`<br>• S3 色相 範圍：`0 ~ 255`{.code-green}。<br>• S3 色相 = 讀取數值 mod 256。<br>• S3 飽和度 範圍：`0 ~ 100`{.code-green}。<br>• S3 飽和度 = 讀取數值 ÷ 256。 |

</CamModeSection>

<CamModeSection mode="23" title="座標取色 - ③ 色相 + 飽和 + 明度">

`官方積木可讀：3 點色相與飽和度，另有 S1 明度`

::: info ℹ️ 補充資訊
- 取樣點須先設定位置。未設定的取樣點不畫在畫面上，傳給主機的 H、S、V 為 0。H = 色相、S = 飽和度、V = 明度。
- 色相 0 可以是紅色，須先確認該取樣點已設定，不能單靠色相 0 判斷未偵測。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | S1 明度 | `0 ~ 100`<br>• S1 明度 = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | S1 色相 與 S1 飽和度 | `0 ~ 25855`<br>• S1 色相 範圍：`0 ~ 255`{.code-green}。<br>• S1 色相 = 讀取數值 mod 256。<br>• S1 飽和度 範圍：`0 ~ 100`{.code-green}。<br>• S1 飽和度 = 讀取數值 ÷ 256。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | S2 色相 與 S2 飽和度 | `0 ~ 25855`<br>• S2 色相 範圍：`0 ~ 255`{.code-green}。<br>• S2 色相 = 讀取數值 mod 256。<br>• S2 飽和度 範圍：`0 ~ 100`{.code-green}。<br>• S2 飽和度 = 讀取數值 ÷ 256。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | S3 色相 與 S3 飽和度 | `0 ~ 25855`<br>• S3 色相 範圍：`0 ~ 255`{.code-green}。<br>• S3 色相 = 讀取數值 mod 256。<br>• S3 飽和度 範圍：`0 ~ 100`{.code-green}。<br>• S3 飽和度 = 讀取數值 ÷ 256。 |

</CamModeSection>

#### 模式三：依序取色號

<CamModeSection mode="30" title="依序取色號">

`官方積木可讀：前 6 塊色相與總塊數`

::: info ℹ️ 補充資訊
- 色塊由左至右排列。請先讀總塊數，再使用前幾筆色相；色相 0 可以是紅色。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 色塊總數 | `0 ~ 18`<br>• 色塊總數 = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 左起第 1 塊色相 與 左起第 2 塊色相 | `0 ~ 65535`<br>• 左起第 1 塊色相 範圍：`0 ~ 255`{.code-green}。<br>• 左起第 1 塊色相 = 讀取數值 mod 256。<br>• 左起第 2 塊色相 範圍：`0 ~ 255`{.code-green}。<br>• 左起第 2 塊色相 = 讀取數值 ÷ 256。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 左起第 3 塊色相 與 左起第 4 塊色相 | `0 ~ 65535`<br>• 左起第 3 塊色相 範圍：`0 ~ 255`{.code-green}。<br>• 左起第 3 塊色相 = 讀取數值 mod 256。<br>• 左起第 4 塊色相 範圍：`0 ~ 255`{.code-green}。<br>• 左起第 4 塊色相 = 讀取數值 ÷ 256。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 左起第 5 塊色相 與 左起第 6 塊色相 | `0 ~ 65535`<br>• 左起第 5 塊色相 範圍：`0 ~ 255`{.code-green}。<br>• 左起第 5 塊色相 = 讀取數值 mod 256。<br>• 左起第 6 塊色相 範圍：`0 ~ 255`{.code-green}。<br>• 左起第 6 塊色相 = 讀取數值 ÷ 256。 |

</CamModeSection>

#### 模式四：循線

<CamModeSection mode="41" title="循線 - ① 黑線">

`官方積木可讀：5 個循線欄位`

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

`官方積木可讀：5 個循線欄位`

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

`官方積木可讀：5 個循線欄位`

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

`官方積木可讀：前 3 個物體的代碼與位置`

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
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 物體 2 代碼 與 物體 2 位置 | `0 ~ 8986`<br>• 物體 2 代碼 範圍：`0, 10 ~ 89`{.code-green}。<br>• 物體 2 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 物體 2 色號 = (讀取數值 ÷ 100) ÷ 10。<br>• 物體 2 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 2 形狀碼 = (讀取數值 ÷ 100) mod 10。<br>• 物體 2 的 X = (讀取數值 mod 100) ÷ 10。<br>• 物體 2 的 Y = (讀取數值 mod 100) mod 10。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 物體 3 代碼 與 物體 3 位置 | `0 ~ 8986`<br>• 物體 3 代碼 範圍：`0, 10 ~ 89`{.code-green}。<br>• 物體 3 位置範圍：`0, 11 ~ 86`{.code-green}。<br>• 物體 3 色號 = (讀取數值 ÷ 100) ÷ 10。<br>• 物體 3 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 3 形狀碼 = (讀取數值 ÷ 100) mod 10。<br>• 物體 3 的 X = (讀取數值 mod 100) ÷ 10。<br>• 物體 3 的 Y = (讀取數值 mod 100) mod 10。 |

</CamModeSection>

<CamModeSection mode="52" title="物體偵測 - ② 物體詳細">

`官方積木可讀：物體 1 位置、寬高與面積，另有物體 2 代碼與面積`

::: info ℹ️ 補充資訊
- 座標使用 `160 × 120` 像素，X 向右、Y 向下增加。若 X 回傳 0 表示未找到。
- 只辨識目標色 1 ~ 8，物體依面積由大到小排序，物體 1 最大。X、Y 是物體質心。形狀碼 0 ~ 9 依序為其他、圓、橢圓、三角、正方、長方、五邊、六邊、星、梯形。
- 例如 13 = 色 1 的三角形；0 表示沒有物體。
:::

| 官方圖形指令 / 讀取位置 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![顏色數值](/images/tutorials/S8/spike-app/color.png) | 物體 1 代碼 | `0, 10 ~ 89`<br>• 物體 1 色號 範圍：`0, 1 ~ 8`{.code-green}。<br>• 物體 1 色號 = 讀取數值 ÷ 10。<br>• 物體 1 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 1 形狀碼 = 讀取數值 mod 10。 |
| ![反射光數值](/images/tutorials/S8/spike-app/reflect.png) | 物體 1 面積 | `0 ~ 100`<br>• 物體 1 面積 = 讀取數值。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 物體 1 的 X 與 物體 1 的 Y | `0 ~ 30623`<br>• 物體 1 的 X 範圍：`0 ~ 159`{.code-green}。<br>• 物體 1 的 X = 讀取數值 mod 256。<br>• 物體 1 的 Y 範圍：`0 ~ 119`{.code-green}。<br>• 物體 1 的 Y = 讀取數值 ÷ 256。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 物體 1 的 W 與 物體 1 的 H | `0 ~ 30880`<br>• 物體 1 的 W 範圍：`0 ~ 160`{.code-green}。<br>• 物體 1 的 W = 讀取數值 mod 256。<br>• 物體 1 的 H 範圍：`0 ~ 120`{.code-green}。<br>• 物體 1 的 H = 讀取數值 ÷ 256。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 物體 2 代碼 與 物體 2 面積 | `0 ~ 25689`<br>• 物體 2 代碼 範圍：`0, 10 ~ 89`{.code-green}。<br>• 物體 2 色號 = (讀取數值 mod 256) ÷ 10。<br>• 物體 2 形狀碼 範圍：`0 ~ 9`{.code-green}。<br>• 物體 2 形狀碼 = (讀取數值 mod 256) mod 10。<br>• 物體 2 面積 範圍：`0 ~ 100`{.code-green}。<br>• 物體 2 面積 = 讀取數值 ÷ 256。 |

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
