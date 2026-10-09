
##

# Tutorial

## 01 / Environment Setup

### ✔ Make sure your controller, sensor, and programming environment match the requirements of this tutorial:

| Requirement | Compatible with This Tutorial |
| --- | --- |
| Controller | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| Sensor | • MBC 8-Channel Line-Following Sensor |
| Programming Environment | • LEGO Education SPIKE 3 App |

### ✔ Preparation

1. Turn on your robot and launch the LEGO Education SPIKE 3 App.
2. Make sure everything is working properly.
3. Calibrate the MBC 8-Channel Line-Following Sensor for the lighting conditions of your competition field.

## 02 / Functions and Features

::: info ℹ️ Additional Information
In the official SPIKE App, the S8 Line-Following Sensor operates in "SPIKE Color Sensor" mode.
:::

| Official Programming Block | Function | Value Description |
| --- | --- | --- |
| ![Black Line Width](/images/tutorials/S8/spike-app/color.png) | Black Line Width | `0-8`<br>• Indicates the number of sensors currently detecting the black line. |
| ![Black Line Offset](/images/tutorials/S8/spike-app/reflect.png) | Black Line Offset | `0-16`<br>• 8 represents the center, 0 represents the far left, and 16 represents the far right.<br>• Subtract 8 from the reading to obtain the line-following position error. A negative value indicates that the black line is to the left, while a positive value indicates that it is to the right. The clearly defined values make this mode suitable for PID line following. |
| ![Red Value](/images/tutorials/S8/spike-app/red.png) | High-Resolution Black Line Offset | `0-200`<br>• 100 represents the center, 0 represents the far left, and 200 represents the far right.<br>• Subtract 100 from the reading to obtain the high-precision line-following position error. A negative value indicates that the black line is to the left, while a positive value indicates that it is to the right. This mode uses an intelligent algorithm to provide higher-precision error measurements. Proper sensor calibration is essential when using this mode. |
| ![Green Value](/images/tutorials/S8/spike-app/green.png) | First 4 Photoelectric Sensor Values | `0-65535`<br>• Every 4 bits represent one photoelectric sensor value, providing up to 15 levels of precision (value range: 0–15). |
| ![Blue Value](/images/tutorials/S8/spike-app/blue.png) | Last 4 Photoelectric Sensor Values | `0-65535`<br>• Every 4 bits represent one photoelectric sensor value, providing up to 15 levels of precision (value range: 0–15). |

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

  <!-- Shorts 影片 2 -->
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

[Back to Home – Choose Another Tutorial](/en/)
