##

# 使用教學

## 01 / 環境準備

### ✔ 請確認你所使用的控制器、感應器與程式語言和本教學頁面相同：
| 要求 | 符合本教學頁面的種類 |
| --- | --- |
| 控制器 | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| 感應器 | • MBC 8 路巡跡板 |
| 程式語言 | • Pybricks `v4.0.0`{.code-red} |

### ✔ 事前準備
::: warning ⚠️ 注意
MBC 8 路循跡板在 Pybricks 上分成 `基礎控制`{.code-blue} 與 `進階控制`{.code-blue} 兩種使用方法：
- `基礎控制`{.code-blue}：簡單易懂，適合初學者。
- `進階控制`{.code-blue}：功能廣泛，需要額外匯入 `MBC 8 路循跡板 Pybricks 函式庫`{.code-blue-text}。

請根據你的需求決定是否下載函式庫：
<script setup>
  import { withBase } from 'vitepress'
</script>

<div class="library-downloads">
    <a
    :href="withBase('/programs/S8/spike-pybricks/MBC_line8_obj_Lib_v400.py')"
    download="MBC_line8_obj_Lib_v400.py"
    class="zip-download-btn">
        ⬇ V4.0.0 函式庫
    </a>
</div>

:::

1. 啟動你的機器人與 Pybricks，確認 Pybricks 版本為 `v4.0.0`{.code-red}。
2. 確認一切運作正常。
3. MBC 8 路巡跡板的場地光值校正。


## 02 / 基礎控制-前置作業與函數功能說明

::: info ℹ️ 補充資訊
在官方 SPIKE App 中，S8 巡跡板將以「SPIKE 顏色感應器」模式運作。
:::

### ✔ 數值解碼函數設定
1. 開啟你的 Pybricks 程式，在 `set up`{.code-blue} 積木下放入顏色感應器設定積木，如下圖。其餘底盤與馬達感應器初始化則接續放置於`set up`{.code-blue} 積木下。
![顏色感應器設定](/images/tutorials/S8/spike-block/basic_setup.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px auto;"}
2. 接下來設定數值解碼函數，拉出 `my task`{.code-blue} 積木，並選擇 `公事包`{.code-blue} 圖案的模式，如下圖。
![mytask設定](/images/tutorials/S8/spike-block/basic_setup_mytask.png){style="display: block; width: 200px; max-width: 100%; height: auto; margin: 10px auto;"}
3. 基礎控制提供四種功能，請依照以下圖片的程式依序完成數值解碼函數的設定。
![pos8設定](/images/tutorials/S8/spike-block/basic_setup_pos8.png){style="display: block; width: 400px; max-width: 100%; height: auto;"}
![width8設定](/images/tutorials/S8/spike-block/basic_setup_width8.png){style="display: block; width: 350px; max-width: 100%; height: auto;"}
![pos100設定](/images/tutorials/S8/spike-block/basic_setup_pos100.png){style="display: block; width: 480px; max-width: 100%; height: auto;"}
![width100設定](/images/tutorials/S8/spike-block/basic_setup_width100.png){style="display: block; width: 480px; max-width: 100%; height: auto;"}

### ✔ 函數功能說明
| 官方圖形指令 | 功能 | 數值意義說明 |
| --- | --- | --- |
| ![循線位置](/images/tutorials/S8/spike-block/basic_pos8.png) | 循線位置 | `-8 ~ +8`<br>• 取得循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 適合基本 PID 循線控制。 |
| ![特徵線寬](/images/tutorials/S8/spike-block/basic_width8.png) | 特徵線寬 | `0 ~ 8`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。 |
| ![高解析循線位置](/images/tutorials/S8/spike-block/basic_pos100.png) | 高解析循線位置 | `-100 ~ +100`<br>• 取得高解析度循線位置。<br>• `0`{.code-green-text} 為正中央，負數偏左，正數偏右。<br>• 精度遠高於 `getLinePos8()`{.code-green}。<br>• 適合高階 PID 精密循線。 |
| ![高解析特徵線寬](/images/tutorials/S8/spike-block/basic_width100.png) | 高解析特徵線寬 | `0 ~ 8`<br>• 在線上的感測器數量。<br>• 用於偵測十字路口、T 字路口等寬線特徵。<br>• 與 `getLinePos100()`{.code-green} 搭配使用，精度遠高於 `getLineWidth100()`{.code-green}。 |

::: warning ⚠️ 注意
請選擇同一精度的 `循線位置`{.code-blue} 與 `特徵線寬`{.code-blue} 搭配使用：
- 使用 `getLinePos8()`{.code-blue} 搭配 `getLineWidth8()`{.code-blue}。
- 使用 `getLinePos100()`{.code-blue} 搭配 `getLineWidth100()`{.code-blue}。
:::

## 03 / 進階控制-前置作業與函數與功能說明
### ✔ 函數設定
1.  點選上方 `⬇ V4.0.0 函式庫`{.code-blue} 按鈕下載 `MBC 8 路循跡板 Pybricks 函式庫`{.code-blue}。
2. 確認函式庫檔名為 `MBC_line8_obj_Lib_v400.py`{.code-blue}。
3. 回到 Pybricks，在 `file explorer`{.code-blue} 工作區中點選 `import a file`{.code-blue} 按鈕 ![匯入](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"}。
4. 選擇 `MBC_line8_obj_Lib_v400.py`{.code-blue} 函式庫並匯入。
5. 確認 `file explorer`{.code-blue} 工作區中出現 `MBC_line8_obj_Lib_v400.py`{.code-blue}。`MBC_line8_obj_Lib_v400.py`{.code-blue} 與你的主程式必須放在同一個專案列表下。
6. 開啟你的 Pybricks 程式，在 `set up`{.code-blue} 積木下放入匯入與設定函式庫的程式積木，如下圖。其餘底盤與馬達感應器初始化則接續放置於`set up`{.code-blue} 積木下。
![函式庫設定](/images/tutorials/S8/spike-block/setup.png){style="display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

### ✔ 函數功能說明

## 04 / 範例程式

<a
  :href="withBase('/programs/S8/spike-inventor/S8_Example_Inventor.lms')"
  download="S8_Example_Inventor.lms"
  class="zip-download-btn">
  ⬇ 範例程式下載
</a>

![範例程式](/images/tutorials/S8/spike-inventor/ex_program.webp){style="border-radius: 10px;"}

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
