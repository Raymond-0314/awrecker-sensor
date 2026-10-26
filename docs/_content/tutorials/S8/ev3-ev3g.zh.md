
# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • LEGO MINDSTORMS Education EV3 |
| 感應器 | • MBC 8 路巡跡板 |
| 程式語言 | • EV3-G |

### ✔ 事前準備

1. 啟動你的機器人與 EV3-G。
2. 確認一切運作正常。
3. MBC 8 路巡跡板的場地光值校正。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
在官方 EV3-G 中，S8 巡跡板將以「EV3 紅外線感應器」模式運作。
:::

::: danger 🚨 警告
由於 EV3 主機的硬體通訊限制，當程式切換不同紅外線感應器模式 (Proximity / Beacon / Remote) 時會產生約 0.5 秒延遲，高速比賽中可能導致機器失控。強烈建議在程式中僅選定一種模式做數值讀取 (例如只使用 Remote 進行 PID 循線)。
:::

<div class="ev3g-function-table">

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![線位置](/images/tutorials/S8/ev3-ev3g/proximity.png) | 線位置 | `-8 ~ +8`<br>• 0 代表線在正中央，負數偏左，正數偏右。<br>• +8 與 -8 表示線在感應器最邊緣。 |
| ![光電 0 與 1 號數值](/images/tutorials/S8/ev3-ev3g/heading_beacon_1.png) | 光電 0 與 1 號數值 | `11 ~ 99`<br>• 十位數為通道 0 的光電光值，數值從 1 至 9。<br>• 個位數為通道 1 的光電光值，數值從 1 至 9。 |
| ![光電 2 與 3 號數值](/images/tutorials/S8/ev3-ev3g/heading_beacon_2.png) | 光電 2 與 3 號數值 | `11 ~ 99`<br>• 十位數為通道 2 的光電光值，數值從 1 至 9。<br>• 個位數為通道 3 的光電光值，數值從 1 至 9。 |
| ![光電 4 與 5 號數值](/images/tutorials/S8/ev3-ev3g/heading_beacon_3.png) | 光電 4 與 5 號數值 | `11 ~ 99`<br>• 十位數為通道 4 的光電光值，數值從 1 至 9。<br>• 個位數為通道 5 的光電光值，數值從 1 至 9。 |
| ![光電 6 與 7 號數值](/images/tutorials/S8/ev3-ev3g/heading_beacon_4.png) | 光電 6 與 7 號數值 | `11 ~ 99`<br>• 十位數為通道 6 的光電光值，數值從 1 至 9。<br>• 個位數為通道 7 的光電光值，數值從 1 至 9。 |
| ![高解析位置平移](/images/tutorials/S8/ev3-ev3g/beacon_btn_1.png) | 高解析位置平移 | `-100 ~ +100`<br>• 0 代表正中央，負值偏左，正值偏右。<br>• 超平滑的 PID 誤差輸入首選。 |
| ![特徵線寬](/images/tutorials/S8/ev3-ev3g/beacon_btn_2.png) | 特徵線寬 | `0 ~ 8`<br>• 偵測到線的感測器數量。可用於偵測十字路口或 T 字路口。。 |
| ![左邊界實體光值](/images/tutorials/S8/ev3-ev3g/beacon_btn_3.png) | 左邊界實體光值 | `0 ~ 100`<br>• 最左邊感測器 (通道 7) 的反射光。<br>• 0 表示純黑，100 表示純白。<br>• 可用於偵測賽道邊界或分岔。 |
| ![右邊界實體光值](/images/tutorials/S8/ev3-ev3g/beacon_btn_4.png) | 右邊界實體光值 | `0 ~ 100`<br>• 最右邊感測器 (通道 0) 的反射光。<br>• 0 表示純黑，100 表示純白。<br>• 可用於偵測賽道邊界或分岔。 |

</div>

## 03 / 範例程式
<script setup>
  import { withBase } from 'vitepress'
</script>

<a
  :href="withBase('/programs/S8/ev3-ev3g/S8_Example_ev3_ev3g.ev3')"
  download="S8_Example_ev3_ev3g.ev3"
  class="zip-download-btn">
  ⬇ 範例程式下載
</a>

![範例程式](/images/tutorials/S8/ev3-ev3g/ex_program.png){style="border-radius: 10px;"}

### ✔ EV3 專屬自訂積木 (My Blocks) 說明
MBC 8 路循線感應器提供了三個「自訂積木 (My Blocks) 」。開發時不需要額外安裝擴充包，只需在主程式中呼叫對應函數，並將最新感應器數據存入變數，便可供馬達控制直接使用。以下為三個核心函數的功能與使用時機介紹：

| 用途 | 函數 | 功能 |
| --- | --- | --- |
| 基礎循線函數 | `LinePos8_dataUpdate` | `-8 ~ +8`<br>• 快速讀取最基礎的 8 段循線位置，適合新手入門教學與基礎左右轉向判斷。<br>• 執行此函數後，系統會自動更新變數 `0_LinePos8`。<br>• 0 代表線在正中央，負數偏左，正數偏右。 |
| 競技高精度函數 | `LinePos100_dataUpdate` | • 取得高解析度次像素級插值位置。<br>• 專為高階 PID 循線控制演算法設計，能提供極致平滑的修正動力。<br>• 需完成感應器校準。<br>• 執行此函數後，系統會自動更新變數：<br>&emsp;1. `0_LinePos100`：高精度位置，範圍 -100 到 +100 (負值偏左、正值偏右) 。 <br>&emsp;2. `0_LineWidth8`：偵測到線的感測器數量 (範圍 0 ~ 8)。可用於判斷路口類型。<br>&emsp;3. `最左/最右邊界數值`：讀取最左/右邊感應器的實體光值，用於防掉線或路口偵測。 |
| 單一通道解碼函數 | `LineCh8_dataUpdate` | `1 ~ 9`<br>• 將 8 顆感應器解碼為獨立狀態。<br>• 可根據 8 顆不同光電的數值自訂進階演算法。<br>• 在積木輸入端指定光電編號 (1 ~ 8)，輸出端將回傳該光電光值。<br>• 1 表示最暗，9 表示最亮。 |

::: info ℹ️ 補充資訊
將自訂積木放入無限迴圈中，即可確保機器與 MBC 8 路巡跡板隨時掌握即時場地資訊。
:::

## 04 / 【Lego】 Lau Xiao 示範影片

<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin: 24px auto;">

  <iframe
    src="https://www.youtube.com/embed/WgacdWLatbk"
    title="MBC S8 示範影片 1"
    style="width: 315px; max-width: 100%; aspect-ratio: 9 / 16; border: none; border-radius: 12px; display: block;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

  <iframe
    src="https://www.youtube.com/embed/Y2evkfTkOO4"
    title="MBC S8 示範影片 2"
    style="width: 315px; max-width: 100%; aspect-ratio: 9 / 16; border: none; border-radius: 12px; display: block;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

</div>

[回首頁選擇其他教學](/)
