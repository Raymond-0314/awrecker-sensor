# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Type for This Tutorial |
| --- | --- |
| Controller | • LEGO MINDSTORMS Education EV3 |
| Sensor | • MBC 16-Channel Line-Following Sensor |
| Programming Environment | • Pybricks - Blocks `v4.0.0`{.code-red} |

### ✔ Preparation

::: warning ⚠️ Caution
The MBC 16-Channel Line-Following Sensor supports two approaches in Pybricks: `Basic Control`{.code-blue} and `Advanced Control`{.code-blue}.

- `Basic Control`{.code-blue}: Simple and easy to understand, suitable for beginners.
- `Advanced Control`{.code-blue}: Provides more features and requires importing the `MBC 16-Channel Line-Following Sensor Pybricks Library`{.code-blue-text}.

`Basic Control`{.code-blue} is available only in Pybricks - Python.

Download the library if needed:
<DownloadButton
  href="/programs/S16/ev3-pybricks/MBC_line16_EV3_Lib.py"
  download="MBC_line16_EV3_Lib.py"
  label="EV3 - Pybricks Library"
/>

:::

1. Turn on your robot and launch Pybricks Blocks `v4.0.0`{.code-red}.
2. Confirm that everything is working properly.
3. Calibrate the MBC 16-Channel Line-Following Sensor for your track.

## 02 / Advanced Control - Setup and Function Reference

### ✔ Function Setup

1. Click the <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>EV3 - Pybricks Library</code> button above to download the `MBC 16-Channel Line-Following Sensor Pybricks - EV3 Library`{.code-blue}.
2. Confirm that the library filename is `MBC_line16_EV3_Lib.py`{.code-blue}.
3. Return to Pybricks and click the `import a file`{.code-blue} button ![Import](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"} in the `file explorer`{.code-blue} workspace.
4. Select and import the `MBC_line16_EV3_Lib.py`{.code-blue} library.
5. Confirm that `MBC_line16_EV3_Lib.py`{.code-blue} appears in the `file explorer`{.code-blue} workspace. The library and your main program must be in the same project.
6. Open your Pybricks program and place the library import block under the `set up`{.code-blue} block, as shown below. Place the remaining drivetrain, motor, and sensor initialization blocks after it under the `set up`{.code-blue} block.

![Library Import](/images/tutorials/S16/ev3-block/import.png){style="display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

7. Place the library configuration block under the `program`{.code-blue} block, as shown below.

![Library Configuration](/images/tutorials/S16/ev3-block/setting.png){style="display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

### ✔ Function Reference

#### set up

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Import Library](/images/tutorials/S16/ev3-block/setup.png){style="display: block; width: 400px; height: auto;"} | Import Library | • Imports the following functions from `MBC_line16_EV3_Lib.py`{.code-green}: `line_init_port_multitask()`{.code-green}, `line_pos16()`{.code-green}, `line_ir_ch()`{.code-green}, `line_pos100()`{.code-green}, `line_width()`{.code-green}, `line_edge_l()`{.code-green}, and `line_edge_r()`{.code-green}.<br>• The names must match exactly. |
| ![Library Configuration](/images/tutorials/S16/ev3-block/setting.png){style="display: block; width: 400px; height: auto;"} | Library Configuration | • `call`{.code-green} and `false`{.code-green} are the synchronous mode settings. `await/true`{.code-green} enables asynchronous mode, while `call/false`{.code-green} keeps synchronous mode.<br>• `line16`{.code-green} is the name used for subsequent sensor readings.<br>• `4`{.code-green} specifies the connection port of the MBC 16-Channel Line-Following Sensor. `1 ~ 4`{.code-green} correspond to `A ~ D`{.code-green}, respectively. |

::: info ℹ️ Additional Information
- Synchronization settings:

| Programming Block | Mode | Description |
| --- | --- | --- |
| ![Library Configuration](/images/tutorials/S16/ev3-block/setting_await.png) | Asynchronous mode: set to `await`{.code-green} and `true`{.code-green} | • Use `await`{.code-green} when reading values.![await](/images/tutorials/S16/ev3-block/pos16_await.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"}• Can be used with the `multitask`{.code-green} block.![multitask](/images/tutorials/S8/spike-block/multitask.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"} |
| ![Library Configuration](/images/tutorials/S16/ev3-block/setting_call.png) | Synchronous mode: set to `call`{.code-green} and `false`{.code-green} | • Use `call`{.code-green} when reading values.![call](/images/tutorials/S16/ev3-block/pos16.png){style="display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"}• Cannot be used with the `multitask`{.code-green} block. |
:::

#### Reading Values

::: danger 🚨 Warning
The MBC library provides six functions across three modes. Due to hardware communication limitations of the EV3 controller, switching between modes introduces a delay of approximately 0.5 seconds. During high-speed competition, this may cause the robot to lose control. Use only one mode for reading values within your program loop. We recommend that competition participants use the four functions in `Mode 3: Recommended for Competition`{.code-blue} throughout their programs.
:::

##### Mode 1: General Functions

| Code | Function | Returned Values |
| --- | --- | --- |
| ![Line Position](/images/tutorials/S16/ev3-block/pos16.png) | Line Position | `-16 ~ +16`<br>• Reads the line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Suitable for basic PID line following. |

##### Mode 2: Overview / Custom Functions

| Code | Function | Returned Values |
| --- | --- | --- |
| ![Infrared Reflectance Value for a Specified Channel](/images/tutorials/S16/ev3-block/ir_ch.png) | Infrared Reflectance Value for a Specified Channel | `1 ~ 9`<br>• Specifies a channel and reads its calibrated reflectance value.<br>• The input ranges from `1 ~ 16`{.code-green}, specifying the channel to read.<br>• A returned value of `1`{.code-green-text} indicates the darkest level, and `9`{.code-green-text} indicates the brightest level. |

##### Mode 3: Recommended for Competition

| Code | Function | Returned Values |
| --- | --- | --- |
| ![High-Resolution Line Position](/images/tutorials/S16/ev3-block/pos100.png) | High-Resolution Line Position | `-100 ~ +100`<br>• Reads the high-resolution line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Provides much higher precision than `line_pos16()`{.code-green}.<br>• Suitable for advanced, precise PID line following.<br>• Proper sensor calibration is required. More accurate calibration produces more accurate readings. |
| ![Line Width](/images/tutorials/S16/ev3-block/width.png) | Line Width | `0 ~ 16`<br>• The number of sensing elements detecting the line.<br>• Used to detect wide-line features such as crossroads and T-junctions.<br>• Supports both resolution modes: `line_pos16()`{.code-green} and `line_pos100()`{.code-green}. |
| ![Left Boundary Sensor Reflectance](/images/tutorials/S16/ev3-block/edge_l.png) | Left Boundary Sensor Reflectance | `0 ~ 100`<br>• Reads the reflectance value of the left boundary sensing element to help prevent line loss.<br>• `0`{.code-green-text} indicates black, and `100`{.code-green-text} indicates white. |
| ![Right Boundary Sensor Reflectance](/images/tutorials/S16/ev3-block/edge_r.png) | Right Boundary Sensor Reflectance | `0 ~ 100`<br>• Reads the reflectance value of the right boundary sensing element to help prevent line loss.<br>• `0`{.code-green-text} indicates black, and `100`{.code-green-text} indicates white. |

## 03 / Example Program

<DownloadButton
  href="/programs/S16/ev3-pybricks/S16_Example_Pybricks_Blocks_EV3.py"
  download="S16_Example_Pybricks_Blocks_EV3.py"
  label="Download Example Program"
/>

![Example Program](/images/tutorials/S16/ev3-block/ex_program.png){style="border-radius: 10px;"}

## 04 / 【Lego】 Lau Xiao Demonstration Video

<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin: 24px auto;">

  <iframe
    src="https://www.youtube.com/embed/kH8V2Pri37o?si=Zuk9fKAEN3bwXD7x"
    title="MBC S16 Demonstration Video 1"
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

[Return to the homepage to choose another tutorial](/en/)