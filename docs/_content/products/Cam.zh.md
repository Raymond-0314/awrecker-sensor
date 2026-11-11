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
      src="/images/products/Cam/Cam-spike.webp"
      alt="MBC Vision Camera Sensor 視覺感應器"
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
      title="MBC Cam 視覺感應器展示影片"
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

MBC 神攝手視覺感應器 (Vision Camera Sensor) 是專為機器人競賽與程式教育打造的最新一代智慧視覺感應器。整合 <span style="color: red;">1.8 吋彩色螢幕</span>、<span style="color: red;">按鍵設定介面</span> 與 <span style="color: red;">內建補光燈</span>，可即時辨識指定顏色的色塊、取得目標位置與大小、讀取指定位置的顏色，並可辨識線路與物體形狀，適合用於顏色辨識、目標追蹤與互動控制。

使用者可直接透過機身螢幕預覽影像與偵測結果，並以按鍵調整取色位置、顏色容許範圍及最小色塊面積，無須自行撰寫影像處理程式。顏色設定與鏡頭參數可斷電保存，搭配 68°、128° 或 160° 鏡頭選配，能依使用需求兼顧遠距目標與廣角視野。

SPIKE、EV3、MATRIX 與通用 I²C 各有對應韌體。連接前先確認相機版本，並依各教學接線。

::: warning ⚠️ 注意
- MBC 神攝手視覺感應器已整合全新版本，將舊款不同型號的功能整合至單一模組，提供更完整且便利的視覺辨識解決方案。舊版 MBC 神攝手視覺感應器販售至 2026/10 月為止。
- 舊版本已停止更新，未來將以新一代神攝手視覺感應器為主要開發版本。
- 如何分辨舊版與新版：和本網站教學頁面的功能相同即為新版。
- 舊版買家可免費更新韌體至新版，但買家需自行負擔來回運費。
:::

### ✔ 5 大視覺辨識功能

<FeatureSection
  :cards="[
    {
      title: '指定顏色追蹤',
      items: [
        '自動辨識畫面中的色塊，並取得 <strong>色塊位置</strong>、<strong>色塊數量</strong>、<strong>色塊寬高</strong> 及 <strong>色塊面積占比</strong> 等資訊。',
        '可預先設定最多 16 種目標顏色，適合<strong>多色物件追蹤與辨識</strong>。'
      ]
    },
    {
      title: '指定座標取色',
      items: [
        '讀取畫面中 <strong>指定座標點的顏色</strong>。',
        '取色位置可直接透過機身選單設定，搭配即時畫面確認偵測區域。',
        '無須辨識整個物體即可快速判斷取樣點顏色。'
      ]
    },
    {
      title: '依序取色號',
      items: [
        ' 自動辨識畫面中 <strong>由左至右排列的色塊</strong>。',
        '依照排列順序輸出各色塊的 <strong>色相碼</strong> 與 <strong>總數量</strong>，讓機器人快速取得顏色排列資訊。'
      ]
    },
    {
      title: '循線',
      items: [
        '透過攝影機即時辨識 <strong>路線位置</strong>、<strong>方向</strong> 與 <strong>路口類型</strong>。',
        '可協助機器人實現 <strong>精準循線</strong> 及 <strong>自主導航</strong>。'
      ]
    },
    {
      title: '物體偵測',
      items: [
        '自動偵測物體的 <strong>幾何形狀</strong>、<strong>顏色</strong> 與 <strong>位置</strong>。',
        '可協助機器人完成 <strong>物件辨識</strong> 及 <strong>分類任務</strong>。'
      ]
    }
  ]"
/>

### ✔ 產品硬體規格

<FeatureSection
  :cards="[
    {
      title: '彩色螢幕即時預覽',
      items: [
        '搭配 <strong>168*128 TFT LCD 彩色螢幕</strong>，即時顯示鏡頭畫面與偵測結果。',
        '直接在感應器上觀察目標，方便確認偵測與追蹤效果。'
      ]
    },
    {
      title: '補光與鏡頭選配',
      items: [
        '內建 <strong>補光燈</strong>，可透過機身選單開關，輔助光線不足時的辨識。',
        '提供 <strong>68°</strong> 與 <strong>128°</strong> 鏡頭視角選配，依需求選擇遠距目標或寬廣視野。<strong>(可另外加購 160° 廣角鏡頭)</strong>'
      ]
    },
    {
      title: '按鍵設定與斷電保存',
      items: [
        '透過機身按鍵調整 <strong>5 大視覺辨識功能的取色設定</strong>，無須自行撰寫額外影像處理程式。',
        '顏色設定與鏡頭參數可 <strong>斷電保存</strong>，下次開機直接使用。'
      ]
    }
  ]"
/>

### ✔ 版本相容性
::: warning ⚠️ 注意
請依主機選擇對應的相機韌體。本網站提供下列三類教學。
- SPIKE
- EV3
- 一般 I2C 開發板
:::

## 開始之前

1. 確認你的控制器與 MBC 神攝手視覺感應器版本是否相同。
2. 透過電線連接你的 MBC 神攝手視覺感應器與控制器。
3. 正確通電後彩色螢幕會啟動。
4. 將 MBC 神攝手視覺感應器固定至機器人上。
5. 以實際使用的高度和角度對準場地，確認補光及環境光與運作時一致。
6. MBC 神攝手視覺感應器上所選擇的模式請務必與程式設定模式相同。
  - MBC 神攝手視覺感應器模式設定請參考下方「MBC 神攝手視覺感應器模式設定」。
  - 程式模式設定請參考下方「函數與功能說明」。

## 偵測模式設定
::: warning ⚠️ 注意
MBC 神攝手視覺感應器功能齊全，建議跟隨說明步驟進行設定，否則會迷失方向，待熟悉後便可自行操作。
:::

1. 開機後會進入及時預覽畫面，透過 MBC 神攝手視覺感應器右上角的旋鈕，可以進行目標切換，可在畫面右上角觀察目標編號 (這部分後續會再說明)。請將畫面右上角的目標編號切換至「黃色 Menu 字樣」，並觸發感應器左上角選擇按鈕，表示「Ok 選擇」。
2. 此時會進入 MENU 卡片，畫面包括 5 個相機模式與 Setup，而畫面中的綠字綠點表示目前正在使用中的模式。五大主模式如下：
 - 主模式一：顏色追蹤 Track
 - 主模式二：座標取色 Spot
 - 主模式三：照順序給色號 Order
 - 主模式四：循線 Line
 - 主模式五：物體偵測 Object
3. 透過左右旋鈕切換模式，並透過選擇按鈕確認欲使用的主模式。
 - 按下左右旋鈕 (和按鈕一下按下，非左右撥動) 可回到上一頁。
4. 主模式選擇後，會進入子模式選單，同樣透過左右旋鈕切換模式，選擇按鈕確認欲使用的子模式。
 - 主模式三因為只有一種子模式，所以跳過子模式選擇功能，不需要選擇。
 - 按下左右旋鈕可回到上一頁。
5. 以上為模式設定，請務必確保感應器模式與程式設定模式相同。

## 顯示內容說明

<br><br>