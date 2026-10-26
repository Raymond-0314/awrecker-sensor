##

# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：
| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • LEGO MINDSTORMS Education EV3 |
| 感應器 | • MBC 8 路巡跡板 |
| 程式語言 | • Pybricks - Python |

### ✔ 事前準備
::: warning ⚠️ 注意
MBC 8 路循跡板在 Pybricks 上分成 `基礎控制`{.code-blue} 與 `進階控制`{.code-blue} 兩種使用方法：
- `基礎控制`{.code-blue}：簡單易懂，適合初學者。
- `進階控制`{.code-blue}：功能廣泛，需要額外匯入 `MBC 8 路循跡板 Pybricks 函式庫`{.code-blue-text}。
而其中 `基礎控制`{.code-blue} 僅支援 Pybricks - Python。

請根據你的需求決定是否下載函式庫：
<DownloadButton
  href="/programs/S8/ev3-pybricks/MBC_line8_EV3_Lib.py"
  download="MBC_line8_EV3_Lib.py"
  label="EV3 - Pybricks 函式庫"
/>

:::

1. 啟動你的機器人與 Pybricks Python。
2. 確認一切運作正常。
3. MBC 8 路巡跡板的場地光值校正。

## 02 / 基礎控制-函數功能說明
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `device.mode(0)` | 循線位置 | `Tuple (1 Byte)`<br>• 取得循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 適合基本 PID 循線控制。 |
| `device.mode(1)` | 8 通道紅外線反射光值 | `Tuple (8 Bytes)`<br>• 回傳 8 路紅外線感應器校準後的反射值。<br>• 最左側的紅外線感應器為第 1 路。<br>• 回傳數值 `0`{.code-green-text} 最暗，`100`{.code-green-text} 最亮。 |
| `device.mode(2)` | 高精度量測數值 | `Tuple (4 Bytes)`<br>• 4 Byte 分別回傳：<br>&emsp;1. 高精度循線位置，數值範圍 `-100 ~ 100`{.code-green}。<br>&emsp;2. 線寬：在線上的紅外線感應器數量，數值範圍 `0 ~ 8`{.code-green}。<br>&emsp;3. 左邊界實體光值：第 1 路紅外線感應器光值，數值範圍 `0 ~ 100`{.code-green}，`0`{.code-green-text} 最暗，`100`{.code-green-text} 最亮。<br>&emsp;4. 右邊界實體光值：第 8 路紅外線感應器光值，數值範圍 `0 ~ 100`{.code-green}，`0`{.code-green-text} 最暗，`100`{.code-green-text} 最亮。 |

## 03 / 進階控制-前置作業與函數功能說明
### ✔ 函數設定
1.  點選上方 <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>EV3 - Pybricks 函式庫</code> 按鈕下載 `MBC 8 路循跡板 Pybricks - EV3 函式庫`{.code-blue}。
2. 確認函式庫檔名為 `MBC_line8_EV3_Lib.py`{.code-blue}。
3. 回到 Pybricks，在 `file explorer`{.code-blue} 工作區中點選 `import a file`{.code-blue} 按鈕 ![匯入](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"}。
4. 選擇 `MBC_line8_EV3_Lib.py`{.code-blue} 函式庫並匯入。
5. 確認 `file explorer`{.code-blue} 工作區中出現 `MBC_line8_EV3_Lib.py`{.code-blue}。`MBC_line8_EV3_Lib.py`{.code-blue} 與你的主程式必須放在同一個專案列表下。
6. 開啟你的 Pybricks 程式，輸入函式庫匯入與設定程式碼，如下圖。其餘底盤與馬達感應器初始化程式碼則接續放置。
```python
from MBC_line8_EV3_Lib import (
    line_edge_l,
    line_edge_r,
    line_init_port_multitask,
    line_ir_ch,
    line_pos100,
    line_pos8,
    line_width,
)
line_init_port_multitask(4, False)
```

### ✔ 函數功能說明
#### set up
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `from MBC_line8_EV3_Lib import(略)` | 導入函式庫 | • 從檔案 `MBC_line8_EV3_Lib.py`{.code-green} 中匯入以下函式： `line_edge_l()`{.code-green}、`line_edge_r()`{.code-green}、`line_init_port_multitask()`{.code-green}、`line_ir_ch()`{.code-green}、`line_pos100()`{.code-green}、`line_pos8()`{.code-green}、`line_width()`{.code-green}。<br>• 名稱需要完全相同。 |
| `line_init_port_multitask(4, False)` | 函式庫設定 | • `false`{.code-green} 為同步模式設定，`true`{.code-green} 啟動非同步模式，`false`{.code-green} 則保持同步模式。<br>• `line8`{.code-green} 為後續使用數值讀取功能時使用的名稱。<br>• `4`{.code-green} 為 MBC 8 路巡跡板的連接埠 (port)，`1 ~ 4`{.code-green} 依序為 `A ~ D`{.code-green}。 |

::: info ℹ️ 補充資訊
- 同步模式設定說明：

| 程式碼 | 模式 | 說明 |
| --- | --- | --- |
| `line_init_port_multitask(4, True)`{.code-blue} | 非同步模式，設定為 `True`{.code-green}。 | • 呼叫函數時須搭配 `await`{.code-green} 做使用：`await pos8()`{.code-green}<br>• 數值讀取時可以搭配 `await multitask`{.code-green} 使用。 |
| `line_init_port_multitask(4, False)`{.code-blue} | 同步模式，設定為 `False`{.code-green}。 | • 呼叫函數時可直接使用：`pos8()`{.code-green}。<br>• 數值讀取時不可搭配 `multitask`{.code-green} 使用。 |
:::

#### 數值讀取
::: danger 🚨 警告
MBC 函式庫提供 3 種模式共 6 種功能，由於 EV3 主機的硬體通訊限制，當程式切換不同模式時會產生約 0.5 秒延遲，高速比賽中可能導致機器失控。程式迴圈中請選定一種模式做數值讀取。建議競賽選手全程使用 `模式 3：競賽推薦`{.code-blue} 的 4 種函式。
:::
##### 模式 1：一般功能
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `line_pos8()` | 循線位置 | `-8 ~ +8`<br>• 取得循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 適合基本 PID 循線控制。 |
##### 模式 2：全覽/自訂功能
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `line_ir_ch(ch)` | 指定通道紅外線反射光值 | `1 ~ 9`<br>• 設定通道編號並讀取單一通道的校正光值。<br>• `ch`{.code-green} 輸入數值範圍 `1 ~ 8`{.code-green}，表示欲讀取的通道編號。<br>• 回傳數值 `1`{.code-green-text} 最暗，`9`{.code-green-text} 最亮。 |
##### 模式 3：競賽推薦
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `line_pos100()` | 高解析循線位置 | `-100 ~ +100`<br>• 取得高解析度循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 精度遠高於 `line_pos8()`{.code-green}。<br>• 適合高階 PID 精密循線。<br>• 必須確實完成感應器校準，校準越精確數值越準確。 |
| `line_width()` | 特徵線寬 | `0 ~ 8`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。<br>• 同時適用於 `line_pos8()`{.code-green} 與 `line_pos100()`{.code-green} 兩種解析度模式。 |
| `line_edge_l()` | 左邊界感測器光值 | `0 ~ 100`<br>• 取得左邊界感測器的光值，用於防掉線。<br>• `0`{.code-green-text} 為黑，`100`{.code-green-text} 為白。 |
| `line_edge_r()` | 右邊界感測器光值 | `0 ~ 100`<br>• 取得右邊界感測器的光值，用於防掉線。<br>• `0`{.code-green-text} 為黑，`100`{.code-green-text} 為白。 |

## 05 / 範例程式
<DownloadButton
  href="/programs/S8/ev3-pybricks/S8_Example_Pybricks_Python_EV3.py"
  download="S8_Example_Pybricks_Python_EV3.py"
  label="範例程式下載"
/>

![範例程式](/images/tutorials/S8/ev3-python/ex_program.png){style="border-radius: 10px;"}

## 06 / 【Lego】 Lau Xiao 示範影片

<div style="
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
  margin: 24px auto;
">

  <!-- Shorts 影片 1 -->
  <iframe
    src="https://www.youtube.com/embed/WgacdWLatbk"
    title="MBC S8 示範影片 1"
    style="
      width: 315px;
      max-width: 100%;
      aspect-ratio: 9 / 16;
      height: auto;
      border: none;
      border-radius: 12px;
      display: block;
    "
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

  <!-- Shorts 影片 2 -->
  <iframe
    src="https://www.youtube.com/embed/Y2evkfTkOO4"
    title="MBC S8 示範影片 2"
    style="
      width: 315px;
      max-width: 100%;
      aspect-ratio: 9 / 16;
      height: auto;
      border: none;
      border-radius: 12px;
      display: block;
    "
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

</div>

[回首頁選擇其他教學](/)
