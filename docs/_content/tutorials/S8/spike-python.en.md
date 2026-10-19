# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Types for This Tutorial |
| --- | --- |
| Controller | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| Sensor | • MBC 8-Channel Line-Following Sensor |
| Programming Environment | • Pybricks - Python `v4.0.0`{.code-red} |

### ✔ Preparation

::: warning ⚠️ Caution
The MBC 8-Channel Line-Following Sensor supports two approaches in Pybricks: `Basic Control`{.code-blue} and `Advanced Control`{.code-blue}.

- `Basic Control`{.code-blue}: Simple and easy to understand, suitable for beginners.
- `Advanced Control`{.code-blue}: Provides more features and requires importing the `MBC 8-Channel Line-Following Sensor Pybricks Library`{.code-blue-text}.

Download the library if required for your application:

<DownloadButton
  href="/programs/S8/spike-pybricks/MBC_line8_obj_Lib_v400.py"
  download="MBC_line8_obj_Lib_v400.py"
  label="v4.0.0 Library"
/>

:::

1. Turn on your robot and launch Pybricks. Confirm that the Pybricks version is `v4.0.0`{.code-red}.
2. Confirm that everything is working properly.
3. Calibrate the MBC 8-Channel Line-Following Sensor for the lighting conditions of your track.

::: info ℹ️ Additional Information
In Pybricks, the S8 Line-Following Sensor operates in “SPIKE Color Sensor” mode.
:::

## 02 / Basic Control — Setup and Functions

### ✔ Setting Up the Value-Decoding Functions

1. Open your Pybricks program and enter the following color sensor configuration code. Place any remaining drive base, motor, and sensor initialization code after it.

```python
line = ColorSensor(Port.C)
```

2. Next, configure the value-decoding functions. Basic Control provides four functions. Add the following definitions:

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

### ✔ Functions and Features

| Function Call | Function | Returned Values |
| --- | --- | --- |
| `getLinePos8()`{.code-blue} | Line Position | `-8 ~ +8`<br>• Retrieves the line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Suitable for basic PID line-following control. |
| `getLineWidth8()`{.code-blue} | Line Width | `0 ~ 8`<br>• The number of sensing elements detecting the line.<br>• Used to detect wide-line features, such as crossroads and T-junctions. |
| `getLinePos100()`{.code-blue} | High-Resolution Line Position | `-100 ~ +100`<br>• Retrieves the high-resolution line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Provides much higher precision than `getLinePos8()`{.code-green}.<br>• Suitable for advanced, precise PID line following.<br>• Proper sensor calibration is required. More accurate calibration produces more accurate readings. |
| `getLineWidth100()`{.code-blue} | High-Resolution Line Width | `0 ~ 8`<br>• The number of sensing elements detecting the line.<br>• Used to detect wide-line features, such as crossroads and T-junctions.<br>• Used together with `getLinePos100()`{.code-green}, with much higher precision than `getLineWidth100()`{.code-green}.<br>• Proper sensor calibration is required. More accurate calibration produces more accurate readings. |

::: warning ⚠️ Caution
Use `Line Position`{.code-blue} and `Line Width`{.code-blue} functions with matching precision:

- Pair `getLinePos8()`{.code-blue} with `getLineWidth8()`{.code-blue}.
- Pair `getLinePos100()`{.code-blue} with `getLineWidth100()`{.code-blue}.
:::

## 03 / Advanced Control — Setup and Functions

### ✔ Function Setup

1. Click the <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>v4.0.0 Library</code> button above to download the `MBC 8-Channel Line-Following Sensor Pybricks Library`{.code-blue}.
2. Confirm that the library filename is `MBC_line8_obj_Lib_v400.py`{.code-blue}.
3. Return to Pybricks and click the `import a file`{.code-blue} button ![Import](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"} in the `file explorer`{.code-blue} panel.
4. Select and import the `MBC_line8_obj_Lib_v400.py`{.code-blue} library.
5. Confirm that `MBC_line8_obj_Lib_v400.py`{.code-blue} appears in the `file explorer`{.code-blue} panel. The library and your main program must be listed under the same project.
6. Open your Pybricks program and enter the library import and initialization code shown below. Place any remaining drive base, motor, and sensor initialization code after it.

```python
from MBC_line8_obj_Lib_v400 import MBC_LINE8
line8 = MBC_LINE8(3, True)
```

### ✔ Functions and Features

#### Setup

| Code | Function | Description |
| --- | --- | --- |
| `from MBC_line8_obj_Lib_v400 import MBC_LINE8`{.code-blue} | Import Library | • Imports the `MBC_LINE8`{.code-green} class from `MBC_line8_obj_Lib_v400.py`{.code-green}.<br>• The names must match exactly.<br>• `MBC_LINE8`{.code-green} is the class name defined in the library. |
| `line8 = MBC_LINE8(3, True)`{.code-blue} | Library Configuration | • `line8`{.code-green} is the object name used for subsequent data-reading operations.<br>• `MBC_LINE8`{.code-green} is the class name defined in the library.<br>• `3`{.code-green} specifies the port connected to the MBC 8-Channel Line-Following Sensor. Values `1 ~ 6`{.code-green} correspond to ports `A ~ F`{.code-green}, respectively.<br>• The Boolean parameter controls the synchronization mode: `True`{.code-green} enables asynchronous mode, while `False`{.code-green} keeps synchronous mode. |

::: info ℹ️ Additional Information
- Synchronization mode settings:

| Code | Mode | Description |
| --- | --- | --- |
| `line8 = MBC_LINE8(3, True)`{.code-blue} | Asynchronous Mode: `True`{.code-green} | • Use `await`{.code-green} when calling a function: `await line8.pos8()`{.code-green}.<br>• Can be used with `multitask`{.code-green}: `await multitask()`{.code-green}. |
| `line8 = MBC_LINE8(3, False)`{.code-blue} | Synchronous Mode: `False`{.code-green} | • Call the function directly: `line8.pos8()`{.code-green}.<br>• Cannot be used with `multitask`{.code-green}. |

:::

#### Reading Values

| Code | Function | Returned Values |
| --- | --- | --- |
| `line8.pos8()`{.code-blue} | Line Position | `-8 ~ +8`<br>• Retrieves the line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Suitable for basic PID line-following control. |
| `line8.pos100()`{.code-blue} | High-Resolution Line Position | `-100 ~ +100`<br>• Retrieves the high-resolution line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Provides much higher precision than `getLinePos8()`{.code-green}.<br>• Suitable for advanced, precise PID line following.<br>• Proper sensor calibration is required. More accurate calibration produces more accurate readings. |
| `line8.width`{.code-blue} | Line Width | `0 ~ 8`<br>• The number of sensing elements detecting the line.<br>• Used to detect wide-line features, such as crossroads and T-junctions.<br>• Works with both `line_pos8()`{.code-green} and `line_pos100()`{.code-green} resolution modes. |
| `line8.ir_calibration()`{.code-blue} | 8-Channel Infrared Reflectance Values | `list[8]`<br>• Returns an array of eight calibrated infrared reflectance values.<br>• `index = 0`{.code-green} represents infrared sensor channel `0`{.code-green-text}, and `index = 0`{.code-green} represents infrared sensor channel `8`{.code-green-text}.<br>• Each value ranges from `0 ~ 100`{.code-green}. |
| `line8.ir_ch(ch)`{.code-blue} | Individual Channel Infrared Reflectance | `0 ~ 100`<br>• Reads the calibrated reflectance value of a single channel specified by its channel number.<br>• The input range for `ch`{.code-green} is `1 ~ 8`{.code-green}, specifying the channel to read. |
| `line8.junction()`{.code-blue} | Number of Line Groups | `0, 1, 2+`<br>• Returns the number of detected line groups.<br>• `0`{.code-green-text} indicates no line, `1`{.code-green-text} indicates a single line, and `2+`{.code-green-text} indicates a junction. |
| `line8.junction_name()`{.code-blue} | Junction Type | `str`<br>• Returns a text description of the line or junction status.<br>• `none`{.code-green-text} indicates no line, `line`{.code-green-text} indicates a single line, and `junction`{.code-green-text} indicates a junction. |
| `line8.bin_raw()`{.code-blue} | 8-Channel Line Detection Bitmask | `0 ~ 255`<br>• Reads whether each of the eight infrared sensing elements detects the line.<br>• Represented as an `8-bit`{.code-green} value. Convert it to binary to obtain eight digits, each representing one channel’s line-detection status.<br>• `bit 0`{.code-green} corresponds to channel `1`{.code-green-text}. `1`{.code-green-text} indicates that the line is detected; `0`{.code-green-text} indicates that it is not detected.<br>• Example: A decimal return value of `6`{.code-green-text} is `00000110`{.code-green-text} in binary, indicating that channels `2`{.code-green-text} and `3`{.code-green-text} detect the line. |
| `line8.on_sensors()`{.code-blue} | Channels Detecting the Line | `list[int]`<br>• Returns a list of infrared sensor channel numbers detecting the line.<br>• Example: `[4, 5]`{.code-green} indicates that channels `4`{.code-green-text} and `5`{.code-green-text} detect the line. |
| `line8.read_all()`{.code-blue} | Read All Values | `dict`<br>• Reads all the values above in one operation.<br>• Returns a dictionary, `dict`{.code-green}, containing all fields.<br>• Includes `ir_calibration`{.code-green}, `line_pos8`{.code-green}, `line_pos100`{.code-green}, `line_width`{.code-green}, `bin_raw`{.code-green}, `on_sensors`{.code-green}, `junction`{.code-green}, `junction_name`{.code-green}, and other fields. |

## 04 / Example Programs

### ✔ Basic Control

<DownloadButton
  href="/programs/S8/spike-pybricks/S8_Example_Pybricks_Python_Basic.py"
  download="S8_Example_Pybricks_Python_Basic.py"
  label="Download Example Program (Basic Control)"
/>

![Example Program](/images/tutorials/S8/spike-python/ex_program_basic.png){style="border-radius: 10px;"}

### ✔ Advanced Control

<DownloadButton
  href="/programs/S8/spike-pybricks/S8_Example_Pybricks_Python_Advanced.py"
  download="S8_Example_Pybricks_Python_Advanced.py"
  label="Download Example Program (Advanced Control)"
/>

![Example Program](/images/tutorials/S8/spike-python/ex_program_adv.png){style="border-radius: 10px;"}

## 05 / 【Lego】 Lau Xiao Demonstration Videos

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