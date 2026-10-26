## 產品介紹

<div style="
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
  margin: 24px auto;
">

  <!-- 左側：產品圖片 -->
  <div style="
    flex: 1 1 300px;
    max-width: 480px;
    text-align: center;
  ">
    <img
      src="/images/products/Hue12/Hue12-spike.webp"
      alt="MBC Hue12 視覺感應器"
      style="
        width: 100%;
        height: auto;
        max-height: 315px;
        object-fit: contain;
        border-radius: 12px;
      "
    >
  </div>

  <!-- 右側：YouTube 影片 -->
  <div style="
    flex: 1 1 300px;
    max-width: 560px;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
  ">
    <iframe
      src="https://www.youtube.com/embed/Zy4OVcHO7QQ?si=m6f2qJluZgB83sbB"
      title="MBC Hue12 視覺感應器展示影片"
      style="
        width: 100%;
        height: 100%;
        border: none;
        display: block;
      "
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>

</div>

神攝手視覺感應器 (Hue12) 是專為機器人視覺應用設計的感應器，整合 <span style="color: red;">1.8 吋彩色螢幕</span>、<span style="color: red;">按鍵設定介面</span> 與 <span style="color: red;">內建補光燈</span>，可即時辨識指定顏色的色塊、取得目標位置與大小、讀取指定位置的顏色，以及偵測畫面動態，適合用於顏色辨識、目標追蹤與互動控制。

使用者可直接透過機身螢幕預覽影像與偵測結果，並以按鍵調整取色位置、顏色容許範圍及最小色塊面積，無須自行撰寫影像處理程式。顏色設定與鏡頭參數可斷電保存，搭配 65°、110°、120° 或 160° 鏡頭選配，能依使用需求兼顧遠距目標與廣角視野。

提供 SPIKE、EV3 與 MATRIX 對應版本，由主機直接供電，不需額外電池；各版本的功能與資料讀取方式有所不同，選購時須確認控制器及韌體版本。


### ✔ 視覺辨識功能

<FeatureSection
  :cards="[
    {
      title: '指定顏色追蹤',
      items: [
        '辨識畫面中指定顏色的色塊，取得 <strong>目標位置與大小資訊</strong>。',
        '可作為機器人轉向、接近目標與追蹤控制的依據。'
      ]
    },
    {
      title: '指定位置取色',
      items: [
        '讀取畫面中 <strong>指定座標點的顏色</strong>。',
        '取色位置可直接透過機身選單設定，搭配即時畫面確認偵測區域。'
      ]
    },
    {
      title: '畫面動態偵測',
      items: [
        '偵測畫面變化，輸出 <strong>動態偵測數值</strong>。',
        '畫面變化越大，數值越高，可用於設計動作觸發與互動控制。'
      ]
    }
  ]"
/>

### ✔ 機身操作與設定

<FeatureSection
  :cards="[
    {
      title: '彩色螢幕即時預覽',
      items: [
        '搭配 <strong>1.8 吋彩色螢幕</strong>，即時顯示鏡頭畫面與偵測結果。',
        '直接在感應器上觀察目標，方便確認取色位置與追蹤效果。'
      ]
    },
    {
      title: '按鍵設定與斷電保存',
      items: [
        '透過機身按鍵調整 <strong>取色位置</strong>、<strong>HSV 容許範圍</strong> 與 <strong>最小色塊面積</strong>，無須自行撰寫影像處理程式。',
        '顏色設定與鏡頭參數可 <strong>斷電保存</strong>，下次開機直接使用。'
      ]
    },
    {
      title: '補光與鏡頭選配',
      items: [
        '內建 <strong>補光燈</strong>，可透過機身選單開關，輔助光線不足時的辨識。',
        '提供 <strong>65°、110°、120°、160°</strong> 鏡頭視角選配，依需求選擇遠距目標或寬廣視野。'
      ]
    }
  ]"
/>

### ✔ 版本相容性
::: warning ⚠️ 注意
MBC Hue12 視覺感應器共有以下 3 種版本，版本間不相容，請謹慎選擇。
- SPIKE
- EV3
- 一般 I2C 開發板
:::
<!--
## 產品概覽

距離感測可以用於障礙物偵測、接近提示與保持間距。讀取感測器數值後，程式便能根據條件執行不同動作。

| 項目 | 目前狀態 |
| --- | --- |
| 產品型號 / 照片 | 待甲方提供 |
| 量測範圍與精度 | 待正式規格確認 |
| 接頭與通訊方式 | 待硬體介面確認 |
| EV3 / SPIKE 相容性 | 待驅動與韌體驗證 |
| 程式環境 | 本版展示四條教學路徑 |
-->

## 開始之前

1. 確認你的控制器與 MBC Hue12 視覺感應器版本是否相同。
2. 透過電線連接你的 MBC Hue12 視覺感應器與控制器。
3. 正確通電後彩色螢幕會啟動。

## 校正與正規化
1. 按下校準按鈕
    - 按住感應器上的校準按鈕 0.5 秒，直到 🟢 綠色校準指示燈 (靠近校準按鈕) 保持亮起。
2. 開始掃描 (5 秒)
    - 將感應器在場地黑色與白色區塊上來回移動。
    - 掃描最黑和最白的區域
    - 感應器距離地面 0.5 ~ 1.2 公分。
3. 等待完成
    - 等待 🟢 綠色校準指示燈熄滅，校準完成。
    - 校準數值會自動儲存，下次啟動不用重新校正 (相同環境狀況下)。


## 硬體指示燈說明
| 燈號 | 狀態說明 |
| --- | --- |
| 🟢 綠色心跳指示燈 (靠近插座) | 每秒閃爍一次，表示感應器供電正常且系統正常運作中。 |
| 🟢 綠色校準指示燈 (靠近校準按鈕) | 按住按鈕 0.5 秒後此綠燈會持續亮起 5 秒，代表校準進行中；熄滅表示校準順利完成。 |
| 🔴 紅色指示燈 (通訊除錯燈) | 長亮表示與主控板通訊失敗。請檢查連接線是否插緊，或更換主機連接埠 / 連接線進行交叉測試。 |
| 🔘 一鍵校準按鈕 | 按住 0.5 秒放開，進入校準模式 (綠色校準指示燈持續亮起 5 秒)。 |
| 💡 板載 8 路狀態 LED 陣列 | 燈亮表示該通道偵測到線。 |

<br><br>