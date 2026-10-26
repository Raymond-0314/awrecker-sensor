# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Type for This Tutorial |
| --- | --- |
| Controller | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| Sensor | • MBC 8-Channel Line-Following Sensor |
| Programming Environment | • LEGO Education SPIKE 3 App |

### ✔ Preparation

1. Turn on your robot and launch the LEGO Education SPIKE 3 App.
2. Confirm that everything is working properly.
3. Calibrate the MBC 8-Channel Line-Following Sensor for your track.

## 02 / Functions and Features

::: info ℹ️ Additional Information
In the official SPIKE App, the S8 Line-Following Sensor operates in “SPIKE Color Sensor” mode.
:::

| Programming Block | Function | Returned Values |
| --- | --- | --- |
| ![Line Width](/images/tutorials/S8/spike-app/color.png) | Line Width | `0 ~ 8`<br>• The number of sensing elements detecting the line. |
| ![Line Offset](/images/tutorials/S8/spike-app/reflect.png) | Line Offset | `0 ~ 16`<br>• `8`{.code-green-text} indicates the center, `0`{.code-green-text} indicates the far left, and `16`{.code-green-text} indicates the far right.<br>• Subtract `8`{.code-green-text} from the reading to obtain the line position. Negative values indicate that the line is on the left, and positive values indicate that the line is on the right. This provides a clear error value suitable for PID line following. |
| ![Red Value](/images/tutorials/S8/spike-app/red.png) | High-Resolution Line Offset | `0 ~ 200`<br>• `100`{.code-green-text} indicates the center, `0`{.code-green-text} indicates the far left, and `200`{.code-green-text} indicates the far right.<br>• Subtract `100`{.code-green-text} from the reading to obtain the high-precision line position. Negative values indicate that the line is on the left, and positive values indicate that the line is on the right. An intelligent algorithm provides a more precise error value. Proper sensor calibration is required when using this mode. |
| ![Green Value](/images/tutorials/S8/spike-app/green.png) | Optical Values of the First 4 Sensing Elements | `0 ~ 65535`<br>• Each `4-bit`{.code-green-text} group represents the optical value of one sensing element, ranging from `0 ~ 15`{.code-green-text}. |
| ![Blue Value](/images/tutorials/S8/spike-app/blue.png) | Optical Values of the Last 4 Sensing Elements | `0 ~ 65535`<br>• Each `4-bit`{.code-green-text} group represents the optical value of one sensing element, ranging from `0 ~ 15`{.code-green-text}. |

## 03 / Example Program

<DownloadButton
  href="/programs/S8/spike-app/S8_Example_SpikeApp.llsp3"
  download="S8_Example_SpikeApp.llsp3"
  label="Download Example Program"
/>

![Example Program](/images/tutorials/S8/spike-app/ex_program.png){style="border-radius: 10px;"}

## 04 / 【Lego】 Lau Xiao Demonstration Videos

<div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap; margin: 24px auto;">

  <iframe
    src="https://www.youtube.com/embed/WgacdWLatbk"
    title="MBC S8 Demonstration Video 1"
    style="width: 315px; max-width: 100%; aspect-ratio: 9 / 16; border: none; border-radius: 12px; display: block;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

  <iframe
    src="https://www.youtube.com/embed/Y2evkfTkOO4"
    title="MBC S8 Demonstration Video 2"
    style="width: 315px; max-width: 100%; aspect-ratio: 9 / 16; border: none; border-radius: 12px; display: block;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
  </iframe>

</div>

[Return to the homepage to choose another tutorial](/en/)