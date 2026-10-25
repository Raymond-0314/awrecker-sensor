# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Type for This Tutorial |
| --- | --- |
| Controller | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| Sensor | • MBC 16-Channel Line-Following Sensor |
| Programming Environment | • Pybricks - Python `v4.0.0`{.code-red} |

### ✔ Preparation

::: warning ⚠️ Caution
The MBC 16-Channel Line-Following Sensor supports two approaches in Pybricks: `Basic Control`{.code-blue} and `Advanced Control`{.code-blue}.

- `Basic Control`{.code-blue}: Simple and easy to understand, suitable for beginners.
- `Advanced Control`{.code-blue}: Provides more features and requires importing the `MBC 16-Channel Line-Following Sensor Pybricks - SPIKE Library`{.code-blue-text}.

Download the library if needed:
<DownloadButton
  href="/programs/S16/spike-pybricks/MBC_line16_obj_Lib.py"
  download="MBC_line16_obj_Lib.py"
  label="Download Library"
/>

:::

1. Turn on your robot and launch Pybricks. Confirm that the Pybricks version is `v4.0.0`{.code-red}.
2. Confirm that everything is working properly.
3. Calibrate the MBC 16-Channel Line-Following Sensor for your track.

::: info ℹ️ Additional Information
In Pybricks, the S16 Line-Following Sensor operates in “SPIKE Color Sensor” mode.
:::

## 02 / Basic Control - Setup and Function Reference

### ✔ Setting Up the Decoding Functions

1. Open your Pybricks program and enter the color sensor setup code below. Place the remaining drivetrain, motor, and sensor initialization code after it.

```python
Line16 = ColorSensor(Port.C)
```

2. Next, configure the decoding functions. Basic Control provides four functions. Add the following definitions:

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

### ✔ Function Reference

| Code | Function | Returned Values |
| --- | --- | --- |
| `getLinePos16()` | Line Position | `-16 ~ +16`<br>• Reads the line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Suitable for basic PID line following. |
| `getLineWidth16()` | Line Width | `0 ~ 16`<br>• The number of sensing elements detecting the line.<br>• Used to detect wide-line features such as crossroads and T-junctions. |
| `getLinePos100()` | High-Resolution Line Position | `-100 ~ +100`<br>• Reads the high-resolution line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Provides much higher precision than `getLinePos16()`{.code-green}.<br>• Suitable for advanced, precise PID line following.<br>• Proper sensor calibration is required. More accurate calibration produces more accurate readings. |
| `getLineWidth100()` | High-Resolution Line Width | `0 ~ 16`<br>• The number of sensing elements detecting the line.<br>• Used to detect wide-line features such as crossroads and T-junctions.<br>• Use together with `getLinePos100()`{.code-green}. Provides much higher precision than `getLineWidth16()`{.code-green}.<br>• Proper sensor calibration is required. More accurate calibration produces more accurate readings. |

::: warning ⚠️ Caution
Use `Line Position`{.code-blue} and `Line Width`{.code-blue} functions with matching precision:

- Use `getLinePos16()`{.code-blue} with `getLineWidth16()`{.code-blue}.
- Use `getLinePos100()`{.code-blue} with `getLineWidth100()`{.code-blue}.
:::

## 03 / Advanced Control - Setup and Function Reference

### ✔ Function Setup

1. Click the <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>Download Library</code> button above to download the `MBC 16-Channel Line-Following Sensor Pybricks - SPIKE Library`{.code-blue}.
2. Confirm that the library filename is `MBC_line16_obj_Lib.py`{.code-blue}.
3. Return to Pybricks and click the `import a file`{.code-blue} button ![Import](/images/tutorials/S8/spike-block/pybricks-import.svg){style="width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"} in the `file explorer`{.code-blue} workspace.
4. Select and import the `MBC_line16_obj_Lib.py`{.code-blue} library.
5. Confirm that `MBC_line16_obj_Lib.py`{.code-blue} appears in the `file explorer`{.code-blue} workspace. The library and your main program must be in the same project.
6. Open your Pybricks program and enter the library import and configuration code below. Place the remaining drivetrain, motor, and sensor initialization code after it.

```python
from MBC_line16_obj_Lib import MBC_LINE16
line16 = MBC_LINE16(3, True)
```

### ✔ Function Reference

#### set up

| Code | Function | Description |
| --- | --- | --- |
| `from MBC_line16_obj_Lib import MBC_LINE16`{.code-blue} | Import Library | • Imports the `MBC_LINE16`{.code-green} class from `MBC_line16_obj_Lib.py`{.code-green}.<br>• The names must match exactly.<br>• `MBC_LINE16`{.code-green} is the class name defined in the library. |
| `line16 = MBC_LINE16(3, True)`{.code-blue} | Library Configuration | • `line16`{.code-green} is the name used for subsequent sensor readings.<br>• `MBC_LINE16`{.code-green} is the class name defined in the library.<br>• `3`{.code-green} specifies the connection port of the MBC 16-Channel Line-Following Sensor. `1 ~ 6`{.code-green} correspond to `A ~ F`{.code-green}, respectively.<br>• The synchronization argument controls the operating mode: `True`{.code-green} enables asynchronous mode, while `False`{.code-green} keeps synchronous mode. |

::: info ℹ️ Additional Information
- Synchronization settings:

| Code | Mode | Description |
| --- | --- | --- |
| `line16 = MBC_LINE16(3, True)`{.code-blue} | Asynchronous mode: set to `True`{.code-green} | • Use `await`{.code-green} when calling functions: `await line16.pos16()`{.code-green}.<br>• Can be used with `multitask`{.code-green}: `await multitask()`{.code-green}. |
| `line16 = MBC_LINE16(3, False)`{.code-blue} | Synchronous mode: set to `False`{.code-green} | • Call functions directly: `line16.pos16()`{.code-green}.<br>• Cannot be used with `multitask`{.code-green}. |
:::

#### Reading Values

| Code | Function | Returned Values |
| --- | --- | --- |
| `line16.pos16()` | Line Position | `-16 ~ +16`<br>• Reads the line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Suitable for basic PID line following. |
| `line16.pos100()` | High-Resolution Line Position | `-100 ~ +100`<br>• Reads the high-resolution line position.<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Provides much higher precision than `pos16()`{.code-green}.<br>• Suitable for advanced, precise PID line following.<br>• Proper sensor calibration is required. More accurate calibration produces more accurate readings. |
| `line16.width()` | Line Width | `0 ~ 16`<br>• The number of sensing elements detecting the line.<br>• Used to detect wide-line features such as crossroads and T-junctions.<br>• Supports both resolution modes: `pos16()`{.code-green} and `pos100()`{.code-green}. |
| `line16.ir_calibration()` | 16-Channel Infrared Reflectance Values | `list[16]`<br>• Returns an array of calibrated infrared reflectance values for all 16 channels.<br>• `index = 0`{.code-green} represents the infrared sensing element on channel `1`{.code-green-text}, and `index = 15`{.code-green} represents the infrared sensing element on channel `16`{.code-green-text}.<br>• Each optical value ranges from `0 ~ 100`{.code-green}. |
| `line16.ir_ch(ch)` | Infrared Reflectance Value for a Specified Channel | `0 ~ 100`<br>• Specifies a channel and reads its calibrated reflectance value.<br>• The input ranges from `1 ~ 16`{.code-green}, specifying the channel to read. |
| `line16.junction()` | Line Group Count | `0, 1, 2+`<br>• Returns the number of detected line groups.<br>• `0`{.code-green-text} indicates no line, `1`{.code-green-text} indicates a single line, and `2+`{.code-green-text} indicates a junction or branch. |
| `line16.junction_name()` | Junction Type | `str`<br>• Returns a text description of the junction status.<br>• `none`{.code-green-text} indicates no line, `line`{.code-green-text} indicates a single line, and `junction`{.code-green-text} indicates a junction or branch. |
| `line16.bin_raw()` | 16-Channel Infrared Line Detection Status<br>`See the 16-Channel Binary Converter below`{.code-red} | `0 ~ 65535`<br>• Reads whether each of the 16 infrared sensing elements detects the line.<br>• The result is represented as a `16-bit`{.code-green} value. Convert it to binary to obtain 16 digits, each representing the line detection status of one channel.<br>• `bit 0`{.code-green} represents channel `1`{.code-green-text}. `1`{.code-green-text} indicates that a line is detected, and `0`{.code-green-text} indicates that no line is detected.<br>• Example: a returned decimal value of `33030`{.code-green-text} becomes `1000000100000110`{.code-green-text} in binary, indicating that channels `2`{.code-green-text}, `3`{.code-green-text}, `9`{.code-green-text}, and `16`{.code-green-text} detect the line. |
| `line16.on_sensors()` | List of Infrared Channels Detecting the Line | `list[int]`<br>• Returns a list of infrared sensing element numbers detecting the line.<br>• Example: `[4, 5]`{.code-green} indicates that channels `4`{.code-green-text} and `5`{.code-green-text} detect the line. |
| `line16.read_all()` | Read All Values | `dict`<br>• Reads all the values listed above at once.<br>• Returns a dictionary (`dict`{.code-green}) containing all fields.<br>• Includes: `ir_calibration`{.code-green}, `line_pos16`{.code-green}, `line_pos100`{.code-green}, `line_width`{.code-green}, `bin_raw`{.code-green}, `on_sensors`{.code-green}, `junction`{.code-green}, `junction_name`{.code-green}, and more. |

<Sensor16 />

## 04 / Example Programs

### ✔ Basic Control

<DownloadButton
  href="/programs/S16/spike-pybricks/S16_Example_Pybricks_Python_Basic.py"
  download="S16_Example_Pybricks_Python_Basic.py"
  label="Download Example Program (Basic Control)"
/>

![Example Program](/images/tutorials/S16/spike-python/ex_program_basic.png){style="border-radius: 10px;"}

### ✔ Advanced Control

<DownloadButton
  href="/programs/S16/spike-pybricks/S16_Example_Pybricks_Python_Advanced.py"
  download="S16_Example_Pybricks_Python_Advanced.py"
  label="Download Example Program (Advanced Control)"
/>

![Example Program](/images/tutorials/S16/spike-python/ex_program_adv.png){style="border-radius: 10px;"}

## 05 / 【Lego】 Lau Xiao Demonstration Video

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