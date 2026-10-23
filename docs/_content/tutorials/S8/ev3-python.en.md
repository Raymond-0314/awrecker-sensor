# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Type for This Tutorial |
| --- | --- |
| Controller | • LEGO MINDSTORMS Education EV3 |
| Sensor | • MBC 8-Channel Line-Following Sensor |
| Programming Environment | • Pybricks - Python |

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

1. Turn on your robot and launch Pybricks Python.
2. Confirm that everything is working properly.
3. Calibrate the MBC 8-Channel Line-Following Sensor for the lighting conditions of your track.

## 02 / Basic Control — Functions

| Code | Function | Returned Values |
| --- | --- | --- |
| `device.mode(0)` | Line Position | `Tuple (1 Byte)`<br>• Retrieves the line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Suitable for basic PID line-following control. |
| `device.mode(1)` | 8-Channel Infrared Reflectance Values | `Tuple (8 Bytes)`<br>• Returns the calibrated reflectance values of all eight infrared sensing elements.<br>• The leftmost infrared sensing element is channel 1.<br>• A return value of `0`{.code-green-text} indicates the darkest reading, and `100`{.code-green-text} indicates the brightest. |
| `device.mode(2)` | High-Precision Measurements | `Tuple (4 Bytes)`<br>• The four bytes return the following values, respectively:<br>&emsp;1. High-precision line position, ranging from `-100 ~ 100`{.code-green}.<br>&emsp;2. Line width: the number of infrared sensing elements detecting the line, ranging from `0 ~ 8`{.code-green}.<br>&emsp;3. Leftmost reflectance value: the reading from infrared sensor channel 1, ranging from `0 ~ 100`{.code-green}. `0`{.code-green-text} indicates the darkest reading, and `100`{.code-green-text} indicates the brightest.<br>&emsp;4. Rightmost reflectance value: the reading from infrared sensor channel 8, ranging from `0 ~ 100`{.code-green}. `0`{.code-green-text} indicates the darkest reading, and `100`{.code-green-text} indicates the brightest. |

## 03 / Advanced Control — Setup and Functions

### ✔ Function Setup

1. Click the <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>EV3 - Pybricks Library</code> button above to download the `MBC 8-Channel Line-Following Sensor Pybricks - EV3 Library`{.code-blue}.
2. Confirm that the library filename is `MBC_line8_EV3_Lib.py`{.code-blue}.
3. Return to Pybricks and click the `import a file`{.code-blue} button ![Import](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"} in the `file explorer`{.code-blue} panel.
4. Select and import the `MBC_line8_EV3_Lib.py`{.code-blue} library.
5. Confirm that `MBC_line8_EV3_Lib.py`{.code-blue} appears in the `file explorer`{.code-blue} panel. The library and your main program must be listed under the same project.
6. Open your Pybricks program and enter the library import and initialization code shown below. Place any remaining drive base, motor, and sensor initialization code after it.

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

### ✔ Functions and Features

#### Setup

| Code | Function | Description |
| --- | --- | --- |
| `from MBC_line8_EV3_Lib import (...)` | Import Library | • Imports the following functions from `MBC_line8_EV3_Lib.py`{.code-green}: `line_edge_l()`{.code-green}, `line_edge_r()`{.code-green}, `line_init_port_multitask()`{.code-green}, `line_ir_ch()`{.code-green}, `line_pos100()`{.code-green}, `line_pos8()`{.code-green}, and `line_width()`{.code-green}.<br>• The names must match exactly. |
| `line_init_port_multitask(4, False)` | Library Configuration | • The Boolean parameter controls the synchronization mode: `True`{.code-green} enables asynchronous mode, while `False`{.code-green} keeps synchronous mode.<br>• `line8`{.code-green} is the name used for subsequent data-reading operations.<br>• `4`{.code-green} specifies the port connected to the MBC 8-Channel Line-Following Sensor. Values `1 ~ 4`{.code-green} correspond to ports `A ~ D`{.code-green}, respectively. |

::: info ℹ️ Additional Information
- Synchronization mode settings:

| Code | Mode | Description |
| --- | --- | --- |
| `line_init_port_multitask(4, True)`{.code-blue} | Asynchronous Mode: `True`{.code-green} | • Can be used with `multitask`{.code-green} when reading values. |
| `line_init_port_multitask(4, False)`{.code-blue} | Synchronous Mode: `False`{.code-green} | • Cannot be used with `multitask`{.code-green} when reading values. |

:::

#### Reading Values

::: danger 🚨 Warning
The MBC library provides six functions across three modes. Due to hardware communication limitations of the EV3 controller, switching between modes introduces a delay of approximately 0.5 seconds. During high-speed competition, this may cause the robot to lose control. Use only one mode for data readings within your program loop. For competition use, we recommend using the four functions in `Mode 3: Recommended for Competition`{.code-blue} throughout the program.
:::

##### Mode 1: General Functions

| Code | Function | Returned Values |
| --- | --- | --- |
| `line_pos8()` | Line Position | `-8 ~ +8`<br>• Retrieves the line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Suitable for basic PID line-following control. |

##### Mode 2: Full Array / Custom Functions

| Code | Function | Returned Values |
| --- | --- | --- |
| `line_ir_ch(ch)` | Individual Channel Infrared Reflectance | `1 ~ 9`<br>• Reads the calibrated reflectance value of a single channel specified by its channel number.<br>• The input range for `ch`{.code-green} is `1 ~ 8`{.code-green}, specifying the channel to read.<br>• A return value of `1`{.code-green-text} indicates the darkest reading, and `9`{.code-green-text} indicates the brightest. |

##### Mode 3: Recommended for Competition

| Code | Function | Returned Values |
| --- | --- | --- |
| `line_pos100()` | High-Resolution Line Position | `-100 ~ +100`<br>• Retrieves the high-resolution line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Provides much higher precision than `line_pos8()`{.code-green}.<br>• Suitable for advanced, precise PID line following.<br>• Proper sensor calibration is required. More accurate calibration produces more accurate readings. |
| `line_width()` | Line Width | `0 ~ 8`<br>• The number of sensing elements detecting the line.<br>• Used to detect wide-line features, such as crossroads and T-junctions.<br>• Works with both `line_pos8()`{.code-green} and `line_pos100()`{.code-green} resolution modes. |
| `line_edge_l()` | Left Edge Sensor Reflectance | `0 ~ 100`<br>• Retrieves the reflectance value of the leftmost sensing element to help prevent line loss.<br>• `0`{.code-green-text} indicates black, and `100`{.code-green-text} indicates white. |
| `line_edge_r()` | Right Edge Sensor Reflectance | `0 ~ 100`<br>• Retrieves the reflectance value of the rightmost sensing element to help prevent line loss.<br>• `0`{.code-green-text} indicates black, and `100`{.code-green-text} indicates white. |

## 05 / Example Program

<DownloadButton
  href="/programs/S8/ev3-pybricks/S8_Example_Pybricks_Python_EV3.py"
  download="S8_Example_Pybricks_Python_EV3.py"
  label="Download Example Program"
/>

![Example Program](/images/tutorials/S8/ev3-python/ex_program.png){style="border-radius: 10px;"}

## 06 / 【Lego】 Lau Xiao Demonstration Videos

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