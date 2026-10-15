# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Type for This Tutorial |
| --- | --- |
| Controller | • LEGO MINDSTORMS Education EV3 |
| Sensor | • MBC 8-Channel Line-Following Sensor |
| Programming Environment | • EV3-G |

### ✔ Preparation

1. Turn on your robot and launch EV3-G.
2. Confirm that everything is working properly.
3. Calibrate the MBC 8-Channel Line-Following Sensor for the lighting conditions of your track.

## 02 / Functions and Features

::: info ℹ️ Additional Information
In the official EV3-G software, the S8 Line-Following Sensor operates in “EV3 Infrared Sensor” mode.
:::

::: danger 🚨 Warning
Due to hardware communication limitations of the EV3 controller, switching between infrared sensor modes (Proximity / Beacon / Remote) introduces a delay of approximately 0.5 seconds. During high-speed competition, this may cause the robot to lose control. We strongly recommend using only one mode throughout your program—for example, using Remote mode exclusively for PID line following.
:::

<div class="ev3g-function-table">

| Official Programming Block | Function | Returned Values |
| --- | --- | --- |
| ![Line Position](/images/tutorials/S8/ev3-ev3g/proximity.png) | Line Position | `-8 ~ +8`<br>• 0 indicates that the line is centered. Negative values indicate left, and positive values indicate right.<br>• +8 and -8 indicate that the line is at the outermost edge of the sensor array. |
| ![Optical Values for Channels 0 and 1](/images/tutorials/S8/ev3-ev3g/heading_beacon_1.png) | Optical Values for Channels 0 and 1 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 0, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 1, ranging from 1 to 9. |
| ![Optical Values for Channels 2 and 3](/images/tutorials/S8/ev3-ev3g/heading_beacon_2.png) | Optical Values for Channels 2 and 3 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 2, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 3, ranging from 1 to 9. |
| ![Optical Values for Channels 4 and 5](/images/tutorials/S8/ev3-ev3g/heading_beacon_3.png) | Optical Values for Channels 4 and 5 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 4, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 5, ranging from 1 to 9. |
| ![Optical Values for Channels 6 and 7](/images/tutorials/S8/ev3-ev3g/heading_beacon_4.png) | Optical Values for Channels 6 and 7 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 6, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 7, ranging from 1 to 9. |
| ![High-Resolution Line Position](/images/tutorials/S8/ev3-ev3g/beacon_btn_1.png) | High-Resolution Line Position | `-100 ~ +100`<br>• 0 indicates the center. Negative values indicate left, and positive values indicate right.<br>• Recommended for smooth, high-resolution PID error input. |
| ![Line Width](/images/tutorials/S8/ev3-ev3g/beacon_btn_2.png) | Line Width | `0 ~ 8`<br>• The number of sensing elements detecting the black line. This can be used to detect crossroads or T-junctions. |
| ![Leftmost Reflectance Value](/images/tutorials/S8/ev3-ev3g/beacon_btn_3.png) | Leftmost Reflectance Value | `0 ~ 100`<br>• The reflected-light value of the leftmost sensing element (channel 7).<br>• 0 indicates pure black, and 100 indicates pure white.<br>• Can be used to detect track boundaries or junctions. |
| ![Rightmost Reflectance Value](/images/tutorials/S8/ev3-ev3g/beacon_btn_4.png) | Rightmost Reflectance Value | `0 ~ 100`<br>• The reflected-light value of the rightmost sensing element (channel 0).<br>• 0 indicates pure black, and 100 indicates pure white.<br>• Can be used to detect track boundaries or junctions. |

</div>

## 03 / Example Program

<script setup>
import { withBase } from 'vitepress'
</script>

<a
  :href="withBase('/programs/S8/ev3-ev3g/S8_Example_ev3_ev3g.ev3')"
  download="S8_Example_ev3_ev3g.ev3"
  class="zip-download-btn">
  ⬇ Download Example Program
</a>

![Example Program](/images/tutorials/S8/ev3-ev3g/ex_program.png){style="border-radius: 10px;"}

### ✔ EV3 Custom Blocks (My Blocks)

The MBC 8-Channel Line-Following Sensor provides three custom blocks (My Blocks). No additional extension package is required. Simply call the appropriate function in your main program to store the latest sensor data in variables for direct use in motor control. The following table explains the purpose and usage of these three core functions:

| Purpose | Function | Description |
| --- | --- | --- |
| Basic Line Following | `LinePos8_dataUpdate` | `-8 ~ +8`<br>• Quickly reads the basic line-position value. Suitable for introductory lessons and basic left/right steering decisions.<br>• Calling this function automatically updates the variable `0_LinePos8`.<br>• 0 indicates that the line is centered. Negative values indicate left, and positive values indicate right. |
| High-Precision Competition Line Following | `LinePos100_dataUpdate` | • Retrieves a high-resolution line position using subpixel interpolation.<br>• Designed for advanced PID line-following algorithms to provide smooth steering corrections.<br>• Sensor calibration is required.<br>• Calling this function automatically updates the following variables:<br>&emsp;<span class="no-wrap">1. `0_LinePos100`: High-precision position, ranging from -100 to +100. Negative values indicate left, and positive values indicate right.</span><br>&emsp;2. `0_LineWidth8`: The number of sensing elements detecting the black line, ranging from 0 to 8. Can be used to identify junction types.<br>&emsp;3. `Leftmost / Rightmost Boundary Values`: Reflectance values of the leftmost and rightmost sensing elements, used for line-loss prevention or junction detection. |
| Single-Channel Decoding | `LineCh8_dataUpdate` | `1 ~ 9`<br>• Decodes the eight sensing elements into individual readings.<br>• Allows you to develop custom advanced algorithms using the values from all eight channels.<br>• Specify the sensing element number (1 through 8) at the block’s input. The output returns the optical value of the selected element.<br>• 1 indicates the darkest reading, and 9 indicates the brightest. |

::: info ℹ️ Additional Information
Place the custom block inside a forever loop to keep your robot continuously updated with the latest readings from the MBC 8-Channel Line-Following Sensor.
:::

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