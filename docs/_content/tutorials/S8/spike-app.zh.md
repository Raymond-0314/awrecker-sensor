
# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：

| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | • MBC 8 路巡跡板 |
| 程式語言 | • LEGO Education SPIKE 3 App |

### ✔ 事前準備

1. 啟動你的機器人與 LEGO Education SPIKE 3 App。
2. 確認一切運作正常。
3. MBC 8 路巡跡板的場地光值校正。

## 02 / 函數與功能說明

::: info ℹ️ 補充資訊
在官方 SPIKE App 中，S8 巡跡板將以「SPIKE 顏色感應器」模式運作。
:::

| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![黑線線寬](/images/tutorials/S8/spike-app/color.png) | 黑線線寬 | `0-8`<br>• 表示在黑線上的感應器數量。 |
| ![黑線偏移](/images/tutorials/S8/spike-app/reflect.png) | 黑線偏移 | `0-16`<br>• 8 代表正中央，0 代表最左，16 代表最右。<br>• 數值讀取後 -8 即為循線位置 (數值為負代表黑線在左邊，數值為正代表黑線在右邊)，數值明確，適合 PID 循線。 |
| ![紅色數值](/images/tutorials/S8/spike-app/red.png) | 高解析黑線偏移 | `0-200`<br>• 100 代表正中央，0 代表極左，200 代表極右。<br>• 數值讀取後 -100 即為高精度循線位置 (數值為負代表黑線在左邊，數值為正代表黑線在右邊)，使用智能演算法提供更高精度的誤差範圍，使用此模式須確保感應器校準確實。 |
| ![綠色數值](/images/tutorials/S8/spike-app/green.png) | 前 4 顆光電數值 | `0-65535`<br>• 每 4-bit 代表一個光電數值，精確度高達 15 段 (數值範圍 0~15)。 |
| ![藍色數值](/images/tutorials/S8/spike-app/blue.png) | 後 4 顆光電數值 | `0-65535`<br>• 每 4-bit 代表一個光電數值，精確度高達 15 段 (數值範圍 0~15)。 |

## 03 / 範例程式
<a href="withBase('/programs/S8/spike-app/S8_Example.llsp3')" download="S8_Example.llsp3" class="zip-download-btn">
  ⬇ 範例程式下載
</a>

![範例程式](/images/tutorials/S8/spike-app/ex_program.png)

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
