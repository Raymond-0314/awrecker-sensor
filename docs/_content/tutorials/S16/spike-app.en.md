# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Types for This Tutorial |
| --- | --- |
| Controller | • LEGO® Education SPIKE™ Prime Set<br>• LEGO® MINDSTORMS® Robot Inventor |
| Sensor | • MBC 16-Channel Line-Following Sensor |
| Programming Environment | • LEGO Education SPIKE 3 App |

### ✔ Preparation

1. Turn on your robot and launch the LEGO Education SPIKE 3 App.
2. Confirm that everything is working properly.
3. Calibrate the MBC 16-Channel Line-Following Sensor for the lighting conditions of your track.

## 02 / Functions and Features

::: info ℹ️ Additional Information
In the official SPIKE App, the S16 Line-Following Sensor operates in “SPIKE Color Sensor” mode.
:::

| Official Programming Block | Function | Returned Values |
| --- | --- | --- |
| ![Line Width](/images/tutorials/S16/spike-app/color.png) | Line Width | `0–16`<br>• The number of sensing elements detecting the line.<br>• A typical line produces a value of approximately 3–5. The value varies depending on line width and junction type. |
| ![Line Offset](/images/tutorials/S16/spike-app/reflect.png) | Line Offset | `0–32`<br>• 16 indicates the center, 0 indicates the far left, and 32 indicates the far right.<br>• Subtract 16 from the reading to obtain the line-following position. Negative values indicate that the line is on the left; positive values indicate that it is on the right.<br>• Suitable for PID line following. |
| ![Red Value](/images/tutorials/S16/spike-app/red.png) | High-Resolution Line Offset | `0–200`<br>• 100 indicates the center, 0 indicates the far left, and 200 indicates the far right.<br>• Subtract 100 from the reading to obtain the high-precision line-following position. Negative values indicate that the line is on the left; positive values indicate that it is on the right.<br>• Uses an intelligent algorithm for greater precision. Ensure that the sensor is properly calibrated before using this mode. |
| ![Green Value](/images/tutorials/S16/spike-app/green.png) | Optical Values for the First 8 Sensing Elements | `0–65535`<br>• Each 2-bit field represents the value of one sensing element.<br>• Each individual value ranges from 0 to 3. |
| ![Blue Value](/images/tutorials/S16/spike-app/blue.png) | Optical Values for the Last 8 Sensing Elements | `0–65535`<br>• Each 2-bit field represents the value of one sensing element.<br>• Each individual value ranges from 0 to 3. |

## 03 / Example Program

<script setup>
import { withBase } from 'vitepress'
</script>

<a
  :href="withBase('/programs/S16/spike-app/S16_Example_SpikeApp.llsp3')"
  download="S16_Example_SpikeApp.llsp3"
  class="zip-download-btn">
  ⬇ Download Example Program
</a>

![Example Program](/images/tutorials/S16/spike-app/ex_program.png){style="border-radius: 10px;"}

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