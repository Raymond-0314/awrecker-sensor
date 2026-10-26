
# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • LEGO MINDSTORMS Education EV3 |
| 感應器 | • MBC 16 路巡跡板 |
| 程式語言 | • clev3r v1.7.1.0 |

### ✔ 事前準備

1. 啟動你的機器人與 clev3r v1.7.1.0。
2. 確認一切運作正常。
3. MBC 16 路巡跡板的場地光值校正。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
在 clev3r 中，S16 巡跡板將以「EV3 紅外線感應器」模式運作。
:::

::: danger 🚨 警告
由於 EV3 主機的硬體通訊限制，當程式切換不同紅外線感應器模式 (Proximity / Beacon / Remote) 時會產生約 0.5 秒延遲，高速比賽中可能導致機器失控。強烈建議在程式中僅選定一種模式做數值讀取 (例如只使用 Remote 進行 PID 循線)。
:::

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `Sensor.SetMode(port, 0)`<br>`value = Sensor.ReadRawValue(port, 0)` | 線位置 | `-16 ~ +16`<br>• `0`{.code-green-text} 代表線在正中央，負數偏左，正數偏右。<br>• `+16`{.code-green-text} 與 `-16`{.code-green-text} 表示線在感應器最邊緣。 |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[0]` | 光電 0 與 1 號數值 | `11 ~ 99`<br>• 十位數為通道 0 的光電光值，數值從 1 至 9。<br>• 個位數為通道 1 的光電光值，數值從 1 至 9。 |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[1]` | 光電 2 與 3 號數值 | `11 ~ 99`<br>• 十位數為通道 2 的光電光值，數值從 1 至 9。<br>• 個位數為通道 3 的光電光值，數值從 1 至 9。 |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[2]` | 光電 4 與 5 號數值 | `11 ~ 99`<br>• 十位數為通道 4 的光電光值，數值從 1 至 9。<br>• 個位數為通道 5 的光電光值，數值從 1 至 9。 |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[3]` | 光電 6 與 7 號數值 | `11 ~ 99`<br>• 十位數為通道 6 的光電光值，數值從 1 至 9。<br>• 個位數為通道 7 的光電光值，數值從 1 至 9。 |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[4]` | 光電 8 與 9 號數值 | `11 ~ 99`<br>• 十位數為通道 8 的光電光值，數值從 1 至 9。<br>• 個位數為通道 9 的光電光值，數值從 1 至 9。 |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[5]` | 光電 10 與 11 號數值 | `11 ~ 99`<br>• 十位數為通道 10 的光電光值，數值從 1 至 9。<br>• 個位數為通道 11 的光電光值，數值從 1 至 9。 |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[6]` | 光電 12 與 13 號數值 | `11 ~ 99`<br>• 十位數為通道 12 的光電光值，數值從 1 至 9。<br>• 個位數為通道 13 的光電光值，數值從 1 至 9。 |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[7]` | 光電 14 與 15 號數值 | `11 ~ 99`<br>• 十位數為通道 14 的光電光值，數值從 1 至 9。<br>• 個位數為通道 15 的光電光值，數值從 1 至 9。 |
| `Sensor.SetMode(port, 2)`<br>`value = Sensor.ReadRawValue(port, 4)[0]` | 高解析位置平移 | `-100 ~ +100`<br>• `0`{.code-green-text} 代表正中央，負值偏左，正值偏右。<br>• 超平滑的 PID 誤差輸入首選。 |
| `Sensor.SetMode(port, 2)`<br>`value = Sensor.ReadRawValue(port, 4)[1]` | 特徵線寬 | `0 ~ 16`<br>• 偵測到線的感測器數量。<br>• 可用於偵測十字路口或 T 字路口。 |
| `Sensor.SetMode(port, 2)`<br>`value = Sensor.ReadRawValue(port, 4)[2]` | 左邊界實體光值 | `0 ~ 100`<br>• 最左邊感測器 (通道 `15`{.code-green-text}) 的反射光。<br>• `0`{.code-green-text} 表示純黑，`100`{.code-green-text} 表示純白。<br>• 可用於偵測賽道邊界或分岔。 |
| `Sensor.SetMode(port, 2)`<br>`value = Sensor.ReadRawValue(port, 4)[3]` | 右邊界實體光值 | `0 ~ 100`<br>• 最右邊感測器 (通道 `0`{.code-green-text}) 的反射光。<br>• `0`{.code-green-text} 表示純黑，`100`{.code-green-text} 表示純白。<br>• 可用於偵測賽道邊界或分岔。 |

## 03 / 範例程式

<DownloadButton
  href="/programs/S16/ev3-clev3r/S16_Example_ev3_clev3r.bp"
  download="S16_Example_ev3_clev3r.bp"
  label="範例程式下載"
/>

![範例程式](/images/tutorials/S16/ev3-clev3r/ex_program.png){style="border-radius: 10px;"}

### ✔ EV3 專屬自訂積木 (My Blocks) 說明
MBC 16 路循線感應器提供了三個「副程式 (Subroutines)」。開發時不需要額外安裝擴充包，只需在主程式中呼叫對應函數，並將最新感應器數據存入變數，便可供馬達控制直接使用。以下為三個核心函數的功能與使用時機介紹：

| 用途 | 函數 | 功能 |
| --- | --- | --- |
| 基礎循線函數 | `LinePos16_dataUpdate` | `-16 ~ +16`<br>• 快速讀取最基礎的 16 段循線位置，適合新手入門教學與基礎左右轉向判斷。<br>• 輸入感應器連接埠 (port)，回傳變數 `pos16`{.code-green-text}。<br>• `0`{.code-green-text} 代表線在正中央，負數偏左，正數偏右。 |
| 競技高精度函數 | `LinePos100_dataUpdate` | `-16 ~ +16`<br>• 取得高解析度次像素級插值位置。<br>• 專為高階 PID 循線控制演算法設計，能提供極致平滑的修正動力。<br>• 需完成感應器校準。<br>• 輸入感應器連接埠 (port)，會同步回傳：<br>&emsp;1. `pos100`{.code-green}：高精度位置，範圍 `-100 ~ +100`{.code-green-text} (負值偏左、正值偏右)。 <br>&emsp;2. `width`{.code-green}：偵測到線的感測器數量，範圍 `0 ~ 16`{.code-green-text}。可用於判斷路口類型。<br>&emsp;3. `ch1/ch16`{.code-green}：讀取最左/右邊感應器的實體光值，用於防掉線或路口偵測。 |
| 全陣列展開函數 | `LineCh16_dataUpdate` | `1 ~ 9`<br>• 將 16 顆感應器解碼為獨立狀態。<br>• 可根據 16 顆不同光電的數值自訂進階演算法。<br>• 輸入感應器連接埠 (port)，會回傳陣列 `light16`{.code-green-text}。<br>• 可透過索引值 `light16[0]`{.code-green-text} ~ `light16[15]`{.code-green-text} 取得各光電光值。 |

::: info ℹ️ 補充資訊
將自訂積木放入無限迴圈中，即可確保機器與 MBC 16 路巡跡板隨時掌握即時場地資訊。
:::

## 04 / 【Lego】 Lau Xiao 示範影片

<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin: 24px auto;">

  <iframe
    src="https://www.youtube.com/embed/kH8V2Pri37o?si=Zuk9fKAEN3bwXD7x"
    title="MBC S16 示範影片 1"
    style="
      width: 800px;
      max-width: 100%;
      aspect-ratio: 16 / 9;
      border: none;
      border-radius: 12px;
      display: block;
    "
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

</div>

[回首頁選擇其他教學](/)
