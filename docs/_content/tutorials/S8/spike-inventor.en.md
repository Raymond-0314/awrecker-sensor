
**

##**

# Tutorial

## 01 / Environment Setup

### ✔ Please make sure your controller, sensor, and programming environment match the requirements of this tutorial:

| Requirement | Supported Hardware / Software |
| --- | --- |
| Controller | • LEGO® MINDSTORMS® Robot Inventor |
| Sensor | • MBC 8-Channel Line Tracking Sensor Board |
| Programming Environment | • LEGO MINDSTORMS Inventor App |

### ✔ Before You Begin
1. Turn on your robot and launch the LEGO MINDSTORMS Inventor App.
2. Make sure everything is working properly.
3. Calibrate the MBC 8-Channel Line Tracking Sensor Board for the lighting conditions of your track.

## 02 / Functions and Features

::: info ℹ️ Additional Information
In the official LEGO MINDSTORMS Inventor App, the S8 Line Tracking Sensor Board operates in "SPIKE Color Sensor" mode.
:::

| Official Programming Block | Function | Value Description |
| --- | --- | --- |
| ![Black Line Width](/images/tutorials/S8/spike-app/color.png) | Black Line Width | `0-8`<br>• Indicates the number of sensors detecting the black line. |
| ![Black Line Offset](/images/tutorials/S8/spike-app/reflect.png) | Black Line Offset | `0-16`<br>• 8 represents the center, 0 represents the far left, and 16 represents the far right.<br>• Subtract 8 from the reading to obtain the line-following position (negative values indicate that the black line is to the left, while positive values indicate that it is to the right). This provides a clear position value suitable for PID line following. |
| ![Red Value](/images/tutorials/S8/spike-app/red.png) | High-Resolution Black Line Offset | `0-200`<br>• 100 represents the center, 0 represents the far left, and 200 represents the far right.<br>• Subtract 100 from the reading to obtain the high-precision line-following position (negative values indicate that the black line is to the left, while positive values indicate that it is to the right). An intelligent algorithm provides a higher-resolution position error value. Proper sensor calibration is essential when using this mode. |
| ![Green Value](/images/tutorials/S8/spike-app/green.png) | First 4 Photosensor Values | `0-255`<br>• Every 2 bits represent one photosensor reading, with a value ranging from 0 to 3. |
| ![Blue Value](/images/tutorials/S8/spike-app/blue.png) | Last 4 Photosensor Values | `0-255`<br>• Every 2 bits represent one photosensor reading, with a value ranging from 0 to 3. |

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
    title="MBC S8 Demo Video 1"
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
    title="MBC S8 Demo Video 2"
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

[Back to Home – Choose Another Tutorial](/)
