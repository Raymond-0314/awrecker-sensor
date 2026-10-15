
# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | • MBC 16 路巡跡板 |
| 程式語言 | • LEGO Education SPIKE 3 App |

### ✔ 事前準備

1. 啟動你的機器人與 LEGO Education SPIKE 3 App。
2. 確認一切運作正常。
3. MBC 16 路巡跡板的場地光值校正。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
在官方 SPIKE App 中，S16 巡跡板將以「SPIKE 顏色感應器」模式運作。
:::

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![特徵線寬](/images/tutorials/S16/spike-app/color.png) | 特徵線寬 | `0-16`<br>• 表示在線上的感應器數量。<br>• 一般線寬約為 3 ~ 5，數值會隨線寬與路口種類而有增減。 |
| ![線偏移量](/images/tutorials/S16/spike-app/reflect.png) | 線偏移量 | `0-32`<br>• 16 代表正中央，0 代表最左，32 代表最右。<br>• 數值讀取後 -16 即為循線位置 (數值為負代表線在左邊，數值為正代表線在右邊)。<br>• 適合 PID 循線。 |
| ![紅色數值](/images/tutorials/S16/spike-app/red.png) | 高解析線偏移 | `0-200`<br>• 100 代表正中央，0 代表極左，200 代表極右。<br>• 數值讀取後 -100 即為高精度循線位置 (數值為負代表線在左邊，數值為正代表線在右邊)。<br>• 使用智能演算法提供更高精準度，使用此模式須確保感應器校準確實。 |
| ![綠色數值](/images/tutorials/S16/spike-app/green.png) | 前 8 顆光電數值 | `0-65535`<br>• 每 2-bit 代表一個光電數值。<br>•數值範圍 0 ~ 3。 |
| ![藍色數值](/images/tutorials/S16/spike-app/blue.png) | 後 8 顆光電數值 | `0-65535`<br>• 每 2-bit 代表一個光電數值。<br>•數值範圍 0 ~ 3。 |

## 03 / 範例程式
<script setup>
  import { withBase } from 'vitepress'
</script>

<a
  :href="withBase('/programs/S16/spike-app/S16_Example_SpikeApp.llsp3')"
  download="S16_Example_SpikeApp.llsp3"
  class="zip-download-btn">
  ⬇ 範例程式下載
</a>

![範例程式](/images/tutorials/S16/spike-app/ex_program.png){style="border-radius: 10px;"}

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
