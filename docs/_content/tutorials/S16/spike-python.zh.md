##

# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：
| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | • MBC 16 路巡跡板 |
| 程式語言 | • Pybricks - Python `v4.0.0`{.code-red} |

### ✔ 事前準備
::: warning ⚠️ 注意
MBC 16 路循跡板在 Pybricks 上分成 `基礎控制`{.code-blue} 與 `進階控制`{.code-blue} 兩種使用方法：
- `基礎控制`{.code-blue}：簡單易懂，適合初學者。
- `進階控制`{.code-blue}：功能廣泛，需要額外匯入 `MBC 16 路循跡板 Pybricks - SPIKE 函式庫`{.code-blue-text}。

請根據你的需求決定是否下載函式庫：
<DownloadButton
  href="/programs/S16/spike-pybricks/MBC_line16_obj_Lib.py"
  download="MBC_line16_obj_Lib.py"
  label="函式庫下載"
/>

:::

1. 啟動你的機器人與 Pybricks，確認 Pybricks 版本為 `v4.0.0`{.code-red}。
2. 確認一切運作正常。
3. MBC 16 路巡跡板的場地光值校正。

::: info ℹ️ 補充資訊
在 Pybricks 中，S16 巡跡板將以「SPIKE 顏色感應器」模式運作。
:::


## 02 / 基礎控制-前置作業與函數功能說明

### ✔ 數值解碼函數設定
1. 開啟你的 Pybricks 程式，輸入顏色感應器設定程式碼，如下。其餘底盤與馬達感應器初始化程式碼則接續放置。
```python
Line16 = ColorSensor(Port.C)
```
2. 接下來設定數值解碼函數，基礎控制提供四種功能，請完成以下數值解碼函數的設定。
```python
def getLinePos16():
    if Line16.reflection() >= 0:
        return Line16.reflection() // 100 - 16
    else:
        return (Line16.reflection() + 6399) // 100 - 16

def getLineWidth16():
    if Line16.reflection() >= 0:
        return Line16.reflection() % 100
    else:
        return (Line16.reflection() + 6399) % 100

def getLinePos100():
    return round(Line16.ambient() // 1 - 100)

def getLineWidth100():
    return round((Line16.ambient() * 100) % 100)
```

### ✔ 函數功能說明
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `getLinePos16()` | 循線位置 | `-16 ~ +16`<br>• 取得循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 適合基本 PID 循線控制。 |
| `getLineWidth16()	` | 特徵線寬 | `0 ~ 16`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。 |
| `getLinePos100()` | 高解析循線位置 | `-100 ~ +100`<br>• 取得高解析度循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 精度遠高於 `getLinePos16()`{.code-green}。<br>• 適合高階 PID 精密循線。<br>• 必須確實完成感應器校準，校準越精確數值越準確。 |
| `getLineWidth100()` | 高解析特徵線寬 | `0 ~ 16`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。<br>• 與 `getLinePos100()`{.code-green} 搭配使用，精度遠高於 `getLineWidth16()`{.code-green}。<br>• 必須確實完成感應器校準，校準越精確數值越準確。 |

::: warning ⚠️ 注意
請選擇同一精度的 `循線位置`{.code-blue} 與 `特徵線寬`{.code-blue} 搭配使用：
- 使用 `getLinePos16()`{.code-blue} 搭配 `getLineWidth16()`{.code-blue}。
- 使用 `getLinePos100()`{.code-blue} 搭配 `getLineWidth100()`{.code-blue}。
:::

## 03 / 進階控制-前置作業與函數功能說明
### ✔ 函數設定
1.  點選上方 <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>函式庫下載</code> 按鈕下載 `MBC 16 路循跡板 Pybricks - SPIKE 函式庫`{.code-blue}。
2. 確認函式庫檔名為 `MBC_line16_obj_Lib.py`{.code-blue}。
3. 回到 Pybricks，在 `file explorer`{.code-blue} 工作區中點選 `import a file`{.code-blue} 按鈕 ![匯入](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"}。
4. 選擇 `MBC_line16_obj_Lib.py`{.code-blue} 函式庫並匯入。
5. 確認 `file explorer`{.code-blue} 工作區中出現 `MBC_line16_obj_Lib.py`{.code-blue}。`MBC_line16_obj_Lib.py`{.code-blue} 與你的主程式必須放在同一個專案列表下。
6. 開啟你的 Pybricks 程式，輸入函式庫匯入與設定程式碼，如下圖。其餘底盤與馬達感應器初始化程式碼則接續放置。
```python
from MBC_line16_obj_Lib import MBC_LINE16
line16 = MBC_LINE16(3, True)
```

### ✔ 函數功能說明
#### set up
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `from MBC_line16_obj_Lib import MBC_LINE16`{.code-blue} | 導入函式庫 | • 從檔案 `MBC_line16_obj_Lib.py`{.code-green} 中匯入 `MBC_LINE16`{.code-green} 類別。<br>• 名稱需要完全相同。<br>• `MBC_LINE16`{.code-green} 為函式庫中設定的類別 (class) 名稱。 |
| `line16 = MBC_LINE16(3, True)`{.code-blue} | 函式庫設定 | • `line16`{.code-green} 為後續使用數值讀取功能時使用的名稱。<br>• `MBC_LINE16`{.code-green} 為函式庫中設定的類別 (class) 名稱。<br>• `3`{.code-green} 為 MBC 16 路巡跡板的連接埠 (port)，`1 ~ 6`{.code-green} 依序為 `A ~ F`{.code-green}。<br>• `True`{.code-green} 為同步模式設定，`True`{.code-green} 啟動非同步模式，`False`{.code-green} 則保持同步模式。 |

::: info ℹ️ 補充資訊
- 同步模式設定說明：

| 程式碼 | 模式 | 說明 |
| --- | --- | --- |
| `line16 = MBC_LINE16(3, True)`{.code-blue} | 非同步模式，設定為 `True`{.code-green} | • 呼叫函數時須搭配 `await`{.code-green} 做使用：`await line16.pos16()`{.code-green}。<br>• 可以搭配 `multitask`{.code-green} 使用：`await multitask()`{.code-green}。 |
| `line16 = MBC_LINE16(3, False)`{.code-blue} | 同步模式，設定為 `False`{.code-green} | • 呼叫函數時可直接使用：`line16.pos16()`{.code-green}。<br>• 不可搭配 `multitask`{.code-green} 使用。 |
:::


#### 數值讀取
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| `line16.pos16()` | 循線位置 | `-16 ~ +16`<br>• 取得循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 適合基本 PID 循線控制。 |
| `line16.pos100()` | 高解析循線位置 | `-100 ~ +100`<br>• 取得高解析度循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 精度遠高於 `pos16()`{.code-green}。<br>• 適合高階 PID 精密循線。<br>• 必須確實完成感應器校準，校準越精確數值越準確。 |
| `line16.width()` | 特徵線寬 | `0 ~ 16`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。<br>• 同時適用於 `pos16()`{.code-green} 與 `pos100()`{.code-green} 兩種解析度模式。 |
| `line16.ir_calibration()` | 16 通道紅外線反射光值 | `list[16]`<br>• 回傳 16 路校正後紅外線反射光值陣列。<br>• `index = 0`{.code-green} 表示通道 `1`{.code-green-text} 的紅外線感應器，`index = 15`{.code-green} 表示通道 `16`{.code-green-text} 的紅外線感應器。<br>• 各光電數值範圍 `0 ~ 100`{.code-green}。 |
| `line16.ir_ch(ch)` | 指定通道紅外線反射光值 | `0 ~ 100`<br>• 設定通道編號並讀取單一通道的校正光值。<br>• 輸入數值範圍 `1 ~ 16`{.code-green}，表示欲讀取的通道編號。 |
| `line16.junction()` | 線群數量 | `0, 1, 2+`<br>• 回傳偵測到的線群數量。<br>• `0`{.code-green-text} 表示無線，`1`{.code-green-text} 表示單線，`2+`{.code-green-text} 表示路口分叉。 |
| `line16.junction_name()` | 路口種類 | `str`<br>• 回傳路口狀態的文字描述。<br>• `none`{.code-green-text} 表示無線，`line`{.code-green-text} 表示單線，`junction`{.code-green-text} 表示路口分叉。 |
| `line16.bin_raw()` | 16 通道紅外線感應器是否在線上<br>`參考下方 16 通道 bin 轉換器`{.code-red} | `0 ~ 65535`<br>• 讀取 16 通道紅外線感應器是否偵測到線。<br>• 以 `16-bit`{.code-green}表示，需先轉為 2 進位表示法，此時會有 16 個數字，分別代表 16 通道測線狀況。<br>• `bit 0`{.code-green} 為通道 `1`{.code-green-text} 的狀態。`1`{.code-green-text} 表示偵測到線，`0`{.code-green-text} 表示未偵測到線。<br>• 舉例：回傳 `33030`{.code-green-text} (十進位)，轉為二進位表示法為 `1000000100000110`{.code-green-text}，表示通道 `2`{.code-green-text}、通道 `3`{.code-green-text}、通道 `9`{.code-green-text} 與通道 `16`{.code-green-text} 偵測到線。 |
| `line16.on_sensors()` | 16 通道紅外線感應器測線列表 | `list[int]`<br>• 回傳測到線的紅外線感應器編號列表。<br>• 舉例：`[4, 5]`{.code-green} 表示通道 `4`{.code-green-text} 與通道 `5`{.code-green-text} 偵測到線。 |
| `line16.read_all()` | 讀取所有數值 | `dict`<br>• 一次讀取上述所有數據。<br>• 回傳含有所有欄位的字典 `dict`{.code-green}。<br>• 包含：`ir_calibration`{.code-green}、`line_pos16`{.code-green}、`line_pos100`{.code-green}、`line_width`{.code-green}、`bin_raw`{.code-green}、`on_sensors`{.code-green}、`junction`{.code-green}、`junction_name`{.code-green} 等。 |

<Sensor16 />

## 04 / 範例程式

### ✔ 基礎控制
<DownloadButton
  href="/programs/S16/spike-pybricks/S16_Example_Pybricks_Python_Basic.py"
  download="S16_Example_Pybricks_Python_Basic.py"
  label="範例程式下載（基礎控制）"
/>

![範例程式](/images/tutorials/S16/spike-python/ex_program_basic.png){style="border-radius: 10px;"}

### ✔ 進階控制
<DownloadButton
  href="/programs/S16/spike-pybricks/S16_Example_Pybricks_Python_Advanced.py"
  download="S16_Example_Pybricks_Python_Advanced.py"
  label="範例程式下載 (進階控制)"
/>

![範例程式](/images/tutorials/S16/spike-python/ex_program_adv.png){style="border-radius: 10px;"}

## 05 / 【Lego】 Lau Xiao 示範影片

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
