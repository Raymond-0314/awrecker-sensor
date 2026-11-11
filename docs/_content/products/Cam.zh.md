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

<FeatureSection horizontal
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

<FeatureSection horizontal
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
### ✔ 即時畫面與狀態

| 畫面位置 | 顯示內容 |
| :-- | :-- |
| 左上角 | 主機名稱。綠色表示連線中，紅色表示斷線。 |
| 上方 | `Mode 主模式-子選項`，例如 `Mode 1-3` 是顏色追蹤的標準子模式。 |
| 右上角 | 目前選取的目標編號，從 1 起算，與主機收到的色號相同；選到選單時顯示黃色 `MENU`。 |
| 底部 | 依模式顯示位置、顏色或偵測結果，詳見下方對照。 |

左右切換的範圍是「目標 1 ~ N → MENU」。N 為最後一個已教色目標再加一個空位，最多 16 個。座標取色模式則是「S1 … Sn → MENU」，同樣保留最後一個已設定取樣點之後的一個空位。

<CamScreenGallery>

<figure>

![開機畫面](/images/tutorials/Cam/ui/01-boot.webp)

<figcaption><strong>開機畫面</strong><br>顯示主機版本與鏡頭型號。SPIKE／EV3 版本需先連上主機才會啟動鏡頭。</figcaption>
</figure>

<figure>

![即時畫面：顏色追蹤](/images/tutorials/Cam/ui/02-live-track.webp)

<figcaption><strong>即時畫面：顏色追蹤</strong><br>上方顯示 Mode 1-3 與目標編號，底部顯示目前目標的 X、Y、W、H 與數量。</figcaption>
</figure>

<figure>

![即時畫面：MENU](/images/tutorials/Cam/ui/03-live-menu.webp)

<figcaption><strong>即時畫面：MENU</strong><br>右上角的黃色 MENU 表示目前選到選單入口。</figcaption>
</figure>

</CamScreenGallery>

### ✔ 選單資訊與 max N

子模式選單右側的 `max N` 是**目前主機一次能收到的目標或取樣點數量**，不是相機可儲存的總數。例如 SPIKE 官方 App 教育版的顏色追蹤 1-3 顯示 `max 4`。黃色文字列出可取得的數值，下方文字說明用途。

SPIKE 會依主機最近讀取的感應器模式，辨識官方 App 教育版、家用版、Pybricks 積木或 Pybricks 函式庫。主機還沒讀取過相機時，不顯示數量。**數量在進入選單時決定**；若換了程式，請先回到即時畫面，等程式開始讀取，再進入選單查看。停在選單中不會即時更新。

<CamScreenGallery>

<figure>

![MENU 卡片](/images/tutorials/Cam/ui/04-menu-cards.webp)

<figcaption><strong>MENU 卡片</strong><br>五種相機模式與 Setup；綠字與綠點標示目前啟用的模式。</figcaption>
</figure>

<figure>

![顏色追蹤子模式](/images/tutorials/Cam/ui/05-sub-track.webp)

<figcaption><strong>顏色追蹤子模式</strong><br>右側 max N 顯示主機可讀數量，黃色文字顯示輸出欄位。</figcaption>
</figure>

<figure>

![座標取色子模式](/images/tutorials/Cam/ui/06-sub-spot.webp)

<figcaption><strong>座標取色子模式</strong><br>依序提供色相、色相＋飽和度、色相＋飽和度＋明度。</figcaption>
</figure>

<figure>

![循線子模式](/images/tutorials/Cam/ui/07-sub-line.webp)

<figcaption><strong>循線子模式</strong><br>黑線、白線與色線；色線使用目標色 1。</figcaption>
</figure>

<figure>

![物體偵測子模式](/images/tutorials/Cam/ui/08-sub-object.webp)

<figcaption><strong>物體偵測子模式</strong><br>可選物體清單或物體詳細資料。</figcaption>
</figure>

</CamScreenGallery>

### ✔ 目標教色與取樣點

停在目標按 OK 可教色，先選 AxisX，再選 AxisY，確認後取色；按住 OK 約 0.8 秒可直接完成。之後可調整 Hue、Sta、Size、Locked／MaxArea。停在目標按側鍵會清除該目標及其指定形狀。物體偵測模式教完目標 1 ~ 8，會顯示 `Target N shape` 選擇形狀，Any 表示不限定形狀。

<CamScreenGallery>

<figure>

![教顏色：選 X](/images/tutorials/Cam/ui/11-teach-x.webp)

<figcaption><strong>教顏色：選 X</strong><br>影像凍結，左右移動黃色線選擇 X，按 OK 確認。</figcaption>
</figure>

<figure>

![教顏色：選 Y](/images/tutorials/Cam/ui/12-teach-y.webp)

<figcaption><strong>教顏色：選 Y</strong><br>移動藍色線選擇 Y，按 OK 取色。</figcaption>
</figure>

<figure>

![指定物體形狀](/images/tutorials/Cam/ui/13-teach-shape.webp)

<figcaption><strong>指定物體形狀</strong><br>目標 1 ~ 8 可指定形狀，Any 表示不限定。</figcaption>
</figure>

</CamScreenGallery>

座標取色模式中，停在取樣點按 OK 是**設定位置**，不是教目標色。先確認 X，再確認 Y 儲存；設定途中按側鍵不儲存，停在取樣點按側鍵則清除該點。相機操作與主機 `E1` 命令修改的是同一份位置。

**未設定的取樣點不畫在畫面上，底部顯示 `--`，送給主機的 H、S、V 都是 0**，與未教色的目標相同。

<CamScreenGallery>

<figure>

![尚未設定的取樣點](/images/tutorials/Cam/ui/15-spot-unset.webp)

<figcaption><strong>尚未設定的取樣點</strong><br>不畫十字，主機收到的 H、S、V 都是 0；按 OK 開始設定。</figcaption>
</figure>

<figure>

![設定取樣點：選 X](/images/tutorials/Cam/ui/16-spot-x.webp)

<figcaption><strong>設定取樣點：選 X</strong><br>左右移動黃色線，按 OK 確認。</figcaption>
</figure>

<figure>

![設定取樣點：選 Y](/images/tutorials/Cam/ui/17-spot-y.webp)

<figcaption><strong>設定取樣點：選 Y</strong><br>移動藍色線，按 OK 儲存；按側鍵取消。</figcaption>
</figure>

</CamScreenGallery>

### ✔ 各模式的畫面與底部數值

| 相機模式 | 畫面標記 | 底部資訊 |
| :-- | :-- | :-- |
| 顏色追蹤 | 目標的追蹤結果 | 目前目標的 X、Y、W、H 與數量。 |
| 座標取色 | 已設定取樣點的十字與編號，選取中的點為青色 | 目前選取點的 H、S、V；未設定時顯示 `--`。 |
| 依序取色號 | 色塊上的排列順序 | 色塊總數。 |
| 循線 | 三條掃描列與偵測到的線 | 近處偏移 N、遠處偏移 F、角度 A、路口類型 J。 |
| 物體偵測 | 每個物體的外輪廓與「色號 形狀」，碰到畫面邊緣時加上 `?` | 物體數量，以及最大物體的代碼與位置。 |

<CamScreenGallery>

<figure>

![即時畫面：座標取色](/images/tutorials/Cam/ui/14-live-spot.webp)

<figcaption><strong>即時畫面：座標取色</strong><br>目前選取的點是青色大十字，底部顯示該點的 H、S、V。</figcaption>
</figure>

<figure>

![即時畫面：循線](/images/tutorials/Cam/ui/18-live-line.webp)

<figcaption><strong>即時畫面：循線</strong><br>畫面顯示三條掃描列，底部顯示 N、F、A、J。</figcaption>
</figure>

<figure>

![即時畫面：物體偵測](/images/tutorials/Cam/ui/19-live-object.webp)

<figcaption><strong>即時畫面：物體偵測</strong><br>外輪廓旁標示色號與形狀，底部顯示物體數與最大物體的代碼、位置。</figcaption>
</figure>

</CamScreenGallery>

### ✔ Setup 與數值調整畫面

Setup 提供亮度、對比、飽和度、白平衡、白色校正、自測與恢復預設等項目。第 14 項 `ShapeTol` 的範圍為 1 ~ 5，用來調整物體偵測的形狀判定寬鬆度。

<CamScreenGallery>

<figure>

![Setup 鏡頭設定](/images/tutorials/Cam/ui/09-setup.webp)

<figcaption><strong>Setup 鏡頭設定</strong><br>OK 進入調整；側鍵儲存設定並回到卡片；EXIT 回到即時畫面。</figcaption>
</figure>

<figure>

![調整數值](/images/tutorials/Cam/ui/10-adjust.webp)

<figcaption><strong>調整數值</strong><br>畫面即時套用變更。左減右加，OK 儲存，側鍵還原。</figcaption>
</figure>

</CamScreenGallery>


<br><br>
