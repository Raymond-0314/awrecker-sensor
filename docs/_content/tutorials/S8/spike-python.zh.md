##

# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：
| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | • MBC 8 路巡跡板 |
| 程式語言 | • Pybricks - Python `v4.0.0`{.code-red} |

### ✔ 事前準備
::: warning ⚠️ 注意
MBC 8 路循跡板在 Pybricks 上分成 `基礎控制`{.code-blue} 與 `進階控制`{.code-blue} 兩種使用方法：
- `基礎控制`{.code-blue}：簡單易懂，適合初學者。
- `進階控制`{.code-blue}：功能廣泛，需要額外匯入 `MBC 8 路循跡板 Pybricks 函式庫`{.code-blue-text}。

請根據你的需求決定是否下載函式庫：
<DownloadButton
  href="/programs/S8/spike-pybricks/MBC_line8_obj_Lib_v400.py"
  download="MBC_line8_obj_Lib_v400.py"
  label="v4.0.0 函式庫"
/>

:::

1. 啟動你的機器人與 Pybricks，確認 Pybricks 版本為 `v4.0.0`{.code-red}。
2. 確認一切運作正常。
3. MBC 8 路巡跡板的場地光值校正。

::: info ℹ️ 補充資訊
在 Pybricks 中，S8 巡跡板將以「SPIKE 顏色感應器」模式運作。
:::

## 02 / 基礎控制-前置作業與函數功能說明

### ✔ 數值解碼函數設定
1. 開啟你的 Pybricks 程式，輸入顏色感應器設定程式碼，如下。其餘底盤與馬達感應器初始化程式碼則接續放置。
```python
line = ColorSensor(Port.C)
```
2. 接下來設定數值解碼函數，基礎控制提供四種功能，請完成以下數值解碼函數的設定。
```python
def getLinePos8():
    return line.reflection() // 10 - 8

def getLineWidth8():
    return line.reflection() % 10

def getLinePos100():
    return round(line.ambient() // 1 - 100)

def getLineWidth100():
    return round((line.ambient() * 100) % 100)
```

### ✔ 函數功能說明
| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `getLinePos8()`{.code-blue} | 循線位置 | `-8 ~ +8`<br>• 取得循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 適合基本 PID 循線控制。 |
| `getLineWidth8()`{.code-blue} | 特徵線寬 | `0 ~ 8`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。 |
| `getLinePos100()`{.code-blue} | 高解析循線位置 | `-100 ~ +100`<br>• 取得高解析度循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 精度遠高於 `getLinePos8()`{.code-green}。<br>• 適合高階 PID 精密循線。<br>• 必須確實完成感應器校準，校準越精確數值越準確。 |
| `getLineWidth100()`{.code-blue} | 高解析特徵線寬 | `0 ~ 8`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。<br>• 與 `getLinePos100()`{.code-green} 搭配使用，精度遠高於 `getLineWidth100()`{.code-green}。<br>• 必須確實完成感應器校準，校準越精確數值越準確。 |

::: warning ⚠️ 注意
請選擇同一精度的 `循線位置`{.code-blue} 與 `特徵線寬`{.code-blue} 搭配使用：
- 使用 `getLinePos8()`{.code-blue} 搭配 `getLineWidth8()`{.code-blue}。
- 使用 `getLinePos100()`{.code-blue} 搭配 `getLineWidth100()`{.code-blue}。
:::

## 03 / 進階控制-前置作業與函數與功能說明
### ✔ 函數設定
1. 點選上方 <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>v4.0.0 函式庫</code> 按鈕下載 `MBC 8 路循跡板 Pybricks 函式庫`{.code-blue}。
2. 確認函式庫檔名為 `MBC_line8_obj_Lib_v400.py`{.code-blue}。
3. 回到 Pybricks，在 `file explorer`{.code-blue} 工作區中點選 `import a file`{.code-blue} 按鈕 ![匯入](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"}。
4. 選擇 `MBC_line8_obj_Lib_v400.py`{.code-blue} 函式庫並匯入。
5. 確認 `file explorer`{.code-blue} 工作區中出現 `MBC_line8_obj_Lib_v400.py`{.code-blue}。`MBC_line8_obj_Lib_v400.py`{.code-blue} 與你的主程式必須放在同一個專案列表下。
6. 開啟你的 Pybricks 程式，輸入函式庫匯入與設定程式碼，如下圖。其餘底盤與馬達感應器初始化程式碼則接續放置。
```python
from MBC_line8_obj_Lib_v400 import MBC_LINE8
line8 = MBC_LINE8(3, True)
```

### ✔ 函數功能說明

#### set up
| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `from MBC_line8_obj_Lib_v400 import MBC_LINE8`{.code-blue} | 導入函式庫 | • 從檔案`MBC_line8_obj_Lib_v400.py`{.code-green} 中匯入 `MBC_LINE8`{.code-green} 類別。<br>• 名稱需要完全相同。<br>• `MBC_LINE8`{.code-green} 為函式庫中設定的類別 (class) 名稱。 |
| `line8 = MBC_LINE8(3, True)`{.code-blue} | 函式庫設定 | • `line8`{.code-green} 為後續使用數值讀取功能時使用的名稱。<br>• `MBC_LINE8`{.code-green} 為函式庫中設定的類別 (class) 名稱。<br>• `3`{.code-green} 為 MBC 8 路巡跡板的連接埠 (port)，`1 ~ 6`{.code-green} 依序為 `A ~ F`{.code-green}。<br>• `true`{.code-green} 為同步模式設定，`True`{.code-green} 啟動非同步模式，`False`{.code-green} 則保持同步模式。 |

::: info ℹ️ 補充資訊
- 同步模式設定說明：

| 官方圖形指令 | 模式 | 說明 |
| --- | --- | --- |
| `line8 = MBC_LINE8(3, True)`{.code-blue} | 非同步模式，設定為 `true`{.code-green} | • 呼叫函數時須搭配 `await`{.code-green} 做使用：`await line8.pos8()`{.code-green}。<br>• 可以搭配 `multitask`{.code-green} 積木使用：`await multitask()`{.code-green}。 |
| `line8 = MBC_LINE8(3, False)`{.code-blue} | 同步模式，設定為 `false`{.code-green} | • 呼叫函數時可直接使用：`line8.pos8()`{.code-green}。<br>• 不可搭配 `multitask`{.code-green} 積木使用。 |
:::

#### 數值讀取
| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `line8.pos8()`{.code-blue} | 循線位置 | `-8 ~ +8`<br>• 取得循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 適合基本 PID 循線控制。 |
| `line8.pos100()`{.code-blue} | 高解析循線位置 | `-100 ~ +100`<br>• 取得高解析度循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 精度遠高於 `getLinePos8()`{.code-green}。<br>• 適合高階 PID 精密循線。<br>• 必須確實完成感應器校準，校準越精確數值越準確。 |
| `line8.width`{.code-blue} | 特徵線寬 | `0 ~ 8`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。<br>• 同時適用於 `line_pos8()`{.code-green} 與 `line_pos100()`{.code-green} 兩種解析度模式。 |
| `line8.ir_calibration()`{.code-blue} | 8 通道紅外線反射光值 | `list[8]`<br>• 回傳 8 路校正後紅外線反射光值陣列。<br>• `index = 0`{.code-green} 表示通道 `0`{.code-green-text} 的紅外線感應器，`index = 0`{.code-green} 表示通道 `8`{.code-green-text} 的紅外線感應器。<br>• 各光電數值範圍 `0 ~ 100`{.code-green}。 |
| `line8.ir_ch(ch)`{.code-blue} | 指定通道紅外線反射光值 | `0 ~ 100`<br>• 設定通道編號並讀取單一通道的校正光值。<br>• `ch`{.code-green}輸入數值範圍 `1 ~ 8`{.code-green}，表示欲讀取的通道編號。 |
| `line8.junction()`{.code-blue} | 線群數量 | `0, 1, 2+`<br>• 回傳偵測到的線群數量。<br>• `0`{.code-green-text} 表示無線，`1`{.code-green-text} 表示單線，`2+`{.code-green-text} 表示路口分叉。 |
| `line8.junction_name()`{.code-blue} | 路口種類 | `str`<br>• 回傳路口狀態的文字描述。<br>• `none`{.code-green-text} 表示無線，`line`{.code-green-text} 表示單線，`junction`{.code-green-text} 表示路口分叉。 |
| `line8.bin_raw()`{.code-blue} | 8 通道紅外線感應器是否在線上 | `0 ~ 255`<br>• 讀取 8 通道紅外線感應器是否偵測到線。<br>• 以 `8-bit`{.code-green}表示，需先轉為 2 進位表示法，此時會有 8 個數字，分別代表 8 通道測線狀況。<br>• `bit 0`{.code-green} 為通道 `1`{.code-green-text} 的狀態。`1`{.code-green-text} 表示偵測到線，`0`{.code-green-text} 表示未偵測到線。<br>• 舉例：回傳 `6`{.code-green-text} (十進位)，轉為二進位表示法為 `00000110`{.code-green-text}，表示通道 `2`{.code-green-text} 與通道 `3`{.code-green-text} 偵測到線。 |
| `line8.on_sensors()`{.code-blue} | 8 通道紅外線感應器測線列表 | `list[int]`<br>• 回傳測到線的紅外線感應器編號列表。<br>• 舉例：`[4, 5]`{.code-green} 表示通道 `4`{.code-green-text} 與通道 `5`{.code-green-text} 偵測到線。 |
| `line8.read_all()`{.code-blue} | 讀取所有數值 | `dict`<br>• 一次讀取上述所有數據。<br>• 回傳含有所有欄位的字典 `dict`{.code-green}。<br>• 包含：`ir_calibration`{.code-green}、`line_pos8`{.code-green}、`line_pos100`{.code-green}、`line_width`{.code-green}、`bin_raw`{.code-green}、`on_sensors`{.code-green}、`junction`{.code-green}、`junction_name`{.code-green} 等。 |

## 04 / 範例程式

### ✔ 基礎控制
<DownloadButton
  href="/programs/S8/spike-pybricks/S8_Example_Pybricks_Python_Basic.py"
  download="S8_Example_Pybricks_Python_Basic.py"
  label="範例程式下載（基礎控制）"
/>

![範例程式](/images/tutorials/S8/spike-python/ex_program_basic.png){style="border-radius: 10px;"}

### ✔ 進階控制
<DownloadButton
  href="/programs/S8/spike-pybricks/S8_Example_Pybricks_Python_Advanced.py"
  download="S8_Example_Pybricks_Python_Advanced.py"
  label="範例程式下載 (進階控制)"
/>

![範例程式](/images/tutorials/S8/spike-python/ex_program_adv.png){style="border-radius: 10px;"}

## 05 / 【Lego】 Lau Xiao 示範影片

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
