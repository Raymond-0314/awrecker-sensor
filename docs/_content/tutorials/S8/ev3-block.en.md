# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Type for This Tutorial |
| --- | --- |
| Controller | • LEGO MINDSTORMS Education EV3 |
| Sensor | • MBC 8-Channel Line-Following Sensor |
| Programming Environment | • Pybricks - Blocks |

### ✔ Preparation

::: warning ⚠️ Caution
The MBC 8-Channel Line-Following Sensor supports two approaches in Pybricks: `Basic Control`{.code-blue} and `Advanced Control`{.code-blue}.

- `Basic Control`{.code-blue}: Simple and easy to understand, suitable for beginners.
- `Advanced Control`{.code-blue}: Provides more features and requires importing the `MBC 8-Channel Line-Following Sensor Pybricks Library`{.code-blue-text}.

`Basic Control`{.code-blue} is supported only in Pybricks - Python.

Download the library if required for your application:

<DownloadButton
  href="/programs/S8/ev3-pybricks/MBC_line8_EV3_Lib.py"
  download="MBC_line8_EV3_Lib.py"
  label="EV3 - Pybricks Library"
/>

:::

1. Turn on your robot and launch Pybricks Blocks.
2. Confirm that everything is working properly.
3. Calibrate the MBC 8-Channel Line-Following Sensor for the lighting conditions of your track.

## 02 / Advanced Control — Setup and Functions

### ✔ Function Setup

1. Click the <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>EV3 - Pybricks Library</code> button above to download the `MBC 8-Channel Line-Following Sensor Pybricks - EV3 Library`{.code-blue}.
2. Confirm that the library filename is `MBC_line8_EV3_Lib.py`{.code-blue}.
3. Return to Pybricks and click the `import a file`{.code-blue} button ![Import](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"} in the `file explorer`{.code-blue} panel.
4. Select and import the `MBC_line8_EV3_Lib.py`{.code-blue} library.
5. Confirm that `MBC_line8_EV3_Lib.py`{.code-blue} appears in the `file explorer`{.code-blue} panel. The library and your main program must be listed under the same project.
6. Open your Pybricks program and place the library import block under the `set up`{.code-blue} block, as shown below. Place any remaining drive base, motor, and sensor initialization blocks after it under the same `set up`{.code-blue} block.

![Library Import](/images/tutorials/S8/ev3-block/setup.png){style="display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

7. Place the library configuration block under the `program`{.code-blue} block, as shown below.

![Library Configuration](/images/tutorials/S8/ev3-block/setting.png){style="display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

### ✔ Functions and Features

#### Setup
| Programming Block | Function | Description |
| --- | --- | --- |
| ![Import Library](/images/tutorials/S8/ev3-block/setup.png){style="display: block; width: 400px; height: auto;"} | Import Library | • Imports the following functions from `MBC_line8_EV3_Lib.py`{.code-green}: `line_init_port_multitask()`{.code-green}, `line_pos8()`{.code-green}, `line_ir_ch()`{.code-green}, `line_pos100()`{.code-green}, `line_width()`{.code-green}, `line_edge_l()`{.code-green}, and `line_edge_r()`{.code-green}.<br>• The names must match exactly. |
| ![Library Configuration](/images/tutorials/S8/ev3-block/setting.png){style="display: block; width: 400px; height: auto;"} | Library Configuration | • `call`{.code-green} and `false`{.code-green} select synchronous mode. Use `await/true`{.code-green} to enable asynchronous mode, or `call/false`{.code-green} to keep synchronous mode.<br>• `line8`{.code-green} is the name used for subsequent data-reading operations.<br>• `4`{.code-green} specifies the port connected to the MBC 8-Channel Line-Following Sensor. Values `1 ~ 6`{.code-green} correspond to ports `A ~ F`{.code-green}, respectively. |

::: info ℹ️ Additional Information
- Synchronization mode settings:

| Programming Block | Mode | Description |
| --- | --- | --- |
| ![Library Configuration](/images/tutorials/S8/ev3-block/setting_await.png) | Asynchronous Mode: `await`{.code-green} and `true`{.code-green} | • Use `await`{.code-green} when reading values.![Await](/images/tutorials/S8/ev3-block/pos8_await.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"}• Can be used with the `multitask`{.code-green} block.![Multitask](/images/tutorials/S8/spike-block/multitask.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"} |
| ![Library Configuration](/images/tutorials/S8/ev3-block/setting_call.png) | Synchronous Mode: `call`{.code-green} and `false`{.code-green} | • Use `call`{.code-green} when reading values.![Call](/images/tutorials/S8/ev3-block/pos8.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"}• Cannot be used with the `multitask`{.code-green} block. |

:::

#### Reading Values

| Programming Block | Function | Returned Values |
| --- | --- | --- |
| ![Line Position](/images/tutorials/S8/ev3-block/pos8.png) | Line Position | `-8 ~ +8`<br>• Retrieves the line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Suitable for basic PID line-following control. |
| ![Individual Channel Infrared Reflectance](/images/tutorials/S8/ev3-block/ir_ch.png) | Individual Channel Infrared Reflectance | `1 ~ 9`<br>• Reads the calibrated reflectance value of a single channel specified by its channel number.<br>• The input range is `1 ~ 8`{.code-green}, specifying the channel to read.<br>• A return value of `1`{.code-green-text} indicates the darkest reading, and `9`{.code-green-text} indicates the brightest. |
| ![High-Resolution Line Position](/images/tutorials/S8/ev3-block/pos100.png) | High-Resolution Line Position | `-100 ~ +100`<br>• Retrieves the high-resolution line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Provides much higher precision than `line_pos8()`{.code-green}.<br>• Suitable for advanced, precise PID line following.<br>• Proper sensor calibration is required. More accurate calibration produces more accurate readings. |
| ![Line Width](/images/tutorials/S8/ev3-block/width.png) | Line Width | `0 ~ 8`<br>• The number of sensing elements detecting the line.<br>• Used to detect wide-line features, such as crossroads and T-junctions.<br>• Works with both `line_pos8()`{.code-green} and `line_pos100()`{.code-green} resolution modes. |
| ![Left Edge Sensor Reflectance](/images/tutorials/S8/ev3-block/edge_l.png) | Left Edge Sensor Reflectance | `0 ~ 100`<br>• Retrieves the reflectance value of the leftmost sensing element to help prevent line loss.<br>• `0`{.code-green-text} indicates black, and `100`{.code-green-text} indicates white. |
| ![Right Edge Sensor Reflectance](/images/tutorials/S8/ev3-block/edge_r.png) | Right Edge Sensor Reflectance | `0 ~ 100`<br>• Retrieves the reflectance value of the rightmost sensing element to help prevent line loss.<br>• `0`{.code-green-text} indicates black, and `100`{.code-green-text} indicates white. |

## 03 / Example Program
<DownloadButton
  href="/programs/S8/ev3-pybricks/S8_Example_Pybricks_Blocks_EV3.py"
  download="S8_Example_Pybricks_Blocks_EV3.py"
  label="Download Example Program"
/>

![Example Program](/images/tutorials/S8/ev3-block/ex_program.png){style="border-radius: 10px;"}

## 04 / 【Lego】 Lau Xiao Demonstration Videos

<div style="
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
  margin: 24px auto;
">
  <!-- Shorts Video 1 -->
  <iframe
    src="https://www.youtube.com/embed/WgacdWLatbk"
    title="MBC S8 Demonstration Video 1"
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
  <!-- Shorts Video 2 -->
  <iframe
    src="https://www.youtube.com/embed/Y2evkfTkOO4"
    title="MBC S8 Demonstration Video 2"
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

[Return to the homepage to choose another tutorial](/en/)