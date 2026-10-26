##

# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：
| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • LEGO MINDSTORMS Education EV3 |
| 感應器 | • MBC 16 路巡跡板 |
| 程式語言 | • Pybricks - Blocks `v4.0.0`{.code-red} |

### ✔ 事前準備
::: warning ⚠️ 注意
MBC 16 路循跡板在 Pybricks 上分成 `基礎控制`{.code-blue} 與 `進階控制`{.code-blue} 兩種使用方法：
- `基礎控制`{.code-blue}：簡單易懂，適合初學者。
- `進階控制`{.code-blue}：功能廣泛，需要額外匯入 `MBC 16 路循跡板 Pybricks 函式庫`{.code-blue-text}。
而其中 `基礎控制`{.code-blue} 僅支援 Pybricks - Python。

請根據你的需求決定是否下載函式庫：
<DownloadButton
  href="/programs/S16/ev3-pybricks/MBC_line16_EV3_Lib.py"
  download="MBC_line16_EV3_Lib.py"
  label="EV3 - Pybricks 函式庫"
/>

:::

1. 啟動你的機器人與 Pybricks Blocks `v4.0.0`{.code-red}。
2. 確認一切運作正常。
3. MBC 16 路巡跡板的場地光值校正。

## 02 / 進階控制-前置作業與函數功能說明
### ✔ 函數設定
1.  點選上方 <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>EV3 - Pybricks 函式庫</code> 按鈕下載 `MBC 16 路循跡板 Pybricks - EV3 函式庫`{.code-blue}。
2. 確認函式庫檔名為 `MBC_line16_EV3_Lib.py`{.code-blue}。
3. 回到 Pybricks，在 `file explorer`{.code-blue} 工作區中點選 `import a file`{.code-blue} 按鈕 ![匯入](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"}。
4. 選擇 `MBC_line16_EV3_Lib.py`{.code-blue} 函式庫並匯入。
5. 確認 `file explorer`{.code-blue} 工作區中出現 `MBC_line16_EV3_Lib.py`{.code-blue}。`MBC_line16_EV3_Lib.py`{.code-blue} 與你的主程式必須放在同一個專案列表下。
6. 開啟你的 Pybricks 程式，在 `set up`{.code-blue} 積木下放入匯入函式庫的程式積木，如下圖。其餘底盤與馬達感應器初始化則接續放置於`set up`{.code-blue} 積木下。
![函式庫匯入](/images/tutorials/S16/ev3-block/import.png){style="display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}
7. 在 `program`{.code-blue} 積木下放入設定函式庫的程式積木，如下圖。
![函式庫設定](/images/tutorials/S16/ev3-block/setting.png){style="display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

### ✔ 函數功能說明
#### set up
| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![導入函式庫](/images/tutorials/S16/ev3-block/setup.png){style="display: block; width: 400px; height: auto;"} | 導入函式庫 | • 從檔案 `MBC_line16_EV3_Lib.py`{.code-green} 中匯入以下函式： `line_init_port_multitask()`{.code-green}、`line_pos16()`{.code-green}、`line_ir_ch()`{.code-green}、`line_pos100()`{.code-green}、`line_width()`{.code-green}、`line_edge_l()`{.code-green}、`line_edge_r()`{.code-green}。<br>• 名稱需要完全相同。 |
| ![函式庫設定](/images/tutorials/S16/ev3-block/setting.png){style="display: block; width: 400px; height: auto;"} | 函式庫設定 | • `call`{.code-green} 與 `false`{.code-green} 為同步模式設定，`await/true`{.code-green} 啟動非同步模式，`call/false`{.code-green} 則保持同步模式。<br>• `line16`{.code-green} 為後續使用數值讀取功能時使用的名稱。<br>• `4`{.code-green} 為 MBC 16 路巡跡板的連接埠 (port)，`1 ~ 4`{.code-green} 依序為 `A ~ D`{.code-green}。 |

::: info ℹ️ 補充資訊
- 同步模式設定說明：

| 官方圖形指令 | 模式 | 說明 |
| --- | --- | --- |
| ![函式庫設定](/images/tutorials/S16/ev3-block/setting_await.png) | 非同步模式，設定為 `await`{.code-green} 與 `true`{.code-green} | • 數值讀取時須搭配 `await`{.code-green} 做使用。![await](/images/tutorials/S16/ev3-block/pos16_await.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"}• 可以搭配 `multitask`{.code-green} 積木使用。![multitask](/images/tutorials/S8/spike-block/multitask.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"} |
| ![函式庫設定](/images/tutorials/S16/ev3-block/setting_call.png) | 同步模式，設定為 `call`{.code-green} 與 `false`{.code-green} | • 數值讀取時須搭配 `call`{.code-green} 做使用。![await](/images/tutorials/S16/ev3-block/pos16.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"}• 不可搭配 `multitask`{.code-green} 積木使用。 |
:::

#### 數值讀取
::: danger 🚨 警告
MBC 函式庫提供 3 種模式共 6 種功能，由於 EV3 主機的硬體通訊限制，當程式切換不同模式時會產生約 0.5 秒延遲，高速比賽中可能導致機器失控。程式迴圈中請選定一種模式做數值讀取。建議競賽選手全程使用 `模式 3：競賽推薦`{.code-blue} 的 4 種函式。
:::
##### 模式 1：一般功能
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![循線位置](/images/tutorials/S16/ev3-block/pos16.png) | 循線位置 | `-16 ~ +16`<br>• 取得循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 適合基本 PID 循線控制。 |
##### 模式 2：全覽/自訂功能
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![指定通道紅外線反射光值](/images/tutorials/S16/ev3-block/ir_ch.png) | 指定通道紅外線反射光值 | `1 ~ 9`<br>• 設定通道編號並讀取單一通道的校正光值。<br>• 輸入數值範圍 `1 ~ 16`{.code-green}，表示欲讀取的通道編號。<br>• 回傳數值 `1`{.code-green-text} 最暗，`9`{.code-green-text} 最亮。 |
##### 模式 3：競賽推薦
| 程式碼 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![高解析循線位置](/images/tutorials/S16/ev3-block/pos100.png) | 高解析循線位置 | `-100 ~ +100`<br>• 取得高解析度循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 精度遠高於 `line_pos16()`{.code-green}。<br>• 適合高階 PID 精密循線。<br>• 必須確實完成感應器校準，校準越精確數值越準確。 |
| ![特徵線寬](/images/tutorials/S16/ev3-block/width.png) | 特徵線寬 | `0 ~ 16`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。<br>• 同時適用於 `line_pos16()`{.code-green} 與 `line_pos100()`{.code-green} 兩種解析度模式。 |
| ![左邊界感測器光值](/images/tutorials/S16/ev3-block/edge_l.png) | 左邊界感測器光值 | `0 ~ 100`<br>• 取得左邊界感測器的光值，用於防掉線。<br>• `0`{.code-green-text} 為黑，`100`{.code-green-text} 為白。 |
| ![右邊界感測器光值](/images/tutorials/S16/ev3-block/edge_r.png) | 右邊界感測器光值 | `0 ~ 100`<br>• 取得右邊界感測器的光值，用於防掉線。<br>• `0`{.code-green-text} 為黑，`100`{.code-green-text} 為白。 |

## 03 / 範例程式
<DownloadButton
  href="/programs/S16/ev3-pybricks/S16_Example_Pybricks_Blocks_EV3.py"
  download="S16_Example_Pybricks_Blocks_EV3.py"
  label="範例程式下載"
/>

![範例程式](/images/tutorials/S16/ev3-block/ex_program.png){style="border-radius: 10px;"}

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
