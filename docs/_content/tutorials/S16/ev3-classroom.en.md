# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Type for This Tutorial |
| --- | --- |
| Controller | • LEGO MINDSTORMS Education EV3 |
| Sensor | • MBC 16-Channel Line-Following Sensor |
| Programming Environment | • EV3 Classroom App |

### ✔ Preparation

1. Turn on your robot and launch the EV3 Classroom App.
2. Confirm that everything is working properly.
3. Calibrate the MBC 16-Channel Line-Following Sensor for the lighting conditions of your track.

## 02 / Functions and Features

::: info ℹ️ Additional Information
In the official EV3 Classroom App, the S16 Line-Following Sensor operates in “EV3 Infrared Sensor” mode.
:::

::: danger 🚨 Warning
Due to hardware communication limitations of the EV3 controller, switching between infrared sensor modes (Proximity / Beacon / Remote) introduces a delay of approximately 0.5 seconds. During high-speed competition, this may cause the robot to lose control. We strongly recommend using only one mode throughout your program—for example, using Remote mode exclusively for PID line following.
:::

| Official Programming Block | Function | Returned Values |
| --- | --- | --- |
| ![Line Position](/images/tutorials/S16/ev3-classroom/proximity.png) | Line Position | `-16 ~ +16`<br>• 0 indicates that the line is centered. Negative values indicate left, and positive values indicate right.<br>• +16 and -16 indicate that the line is at the outermost edge of the sensor array. |
| ![Optical Values for Channels 0 and 1](/images/tutorials/S16/ev3-classroom/heading_beacon_1.png) | Optical Values for Channels 0 and 1 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 0, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 1, ranging from 1 to 9. |
| ![Optical Values for Channels 2 and 3](/images/tutorials/S16/ev3-classroom/proximity_beacon_1.png) | Optical Values for Channels 2 and 3 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 2, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 3, ranging from 1 to 9. |
| ![Optical Values for Channels 4 and 5](/images/tutorials/S16/ev3-classroom/heading_beacon_2.png) | Optical Values for Channels 4 and 5 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 4, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 5, ranging from 1 to 9. |
| ![Optical Values for Channels 6 and 7](/images/tutorials/S16/ev3-classroom/proximity_beacon_2.png) | Optical Values for Channels 6 and 7 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 6, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 7, ranging from 1 to 9. |
| ![Optical Values for Channels 8 and 9](/images/tutorials/S16/ev3-classroom/heading_beacon_3.png) | Optical Values for Channels 8 and 9 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 8, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 9, ranging from 1 to 9. |
| ![Optical Values for Channels 10 and 11](/images/tutorials/S16/ev3-classroom/proximity_beacon_3.png) | Optical Values for Channels 10 and 11 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 10, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 11, ranging from 1 to 9. |
| ![Optical Values for Channels 12 and 13](/images/tutorials/S16/ev3-classroom/heading_beacon_4.png) | Optical Values for Channels 12 and 13 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 12, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 13, ranging from 1 to 9. |
| ![Optical Values for Channels 14 and 15](/images/tutorials/S16/ev3-classroom/proximity_beacon_4.png) | Optical Values for Channels 14 and 15 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 14, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 15, ranging from 1 to 9. |
| ![High-Resolution Line Position](/images/tutorials/S16/ev3-classroom/beacon_btn_1.png) | High-Resolution Line Position | `-100 ~ +100`<br>• 0 indicates the center. Negative values indicate left, and positive values indicate right.<br>• Recommended for smooth, high-resolution PID error input. |
| ![Line Width](/images/tutorials/S16/ev3-classroom/beacon_btn_2.png) | Line Width | `0 ~ 16`<br>• The number of sensing elements detecting the line. This can be used to detect crossroads or T-junctions. |
| ![Leftmost Reflectance Value](/images/tutorials/S16/ev3-classroom/beacon_btn_3.png) | Leftmost Reflectance Value | `0 ~ 100`<br>• The reflected-light value of the leftmost sensing element (channel 7).<br>• 0 indicates pure black, and 100 indicates pure white.<br>• Can be used to detect track boundaries or junctions. |
| ![Rightmost Reflectance Value](/images/tutorials/S16/ev3-classroom/beacon_btn_4.png) | Rightmost Reflectance Value | `0 ~ 100`<br>• The reflected-light value of the rightmost sensing element (channel 0).<br>• 0 indicates pure black, and 100 indicates pure white.<br>• Can be used to detect track boundaries or junctions. |

## 03 / Example Program

<script setup>
import { withBase } from 'vitepress'
</script>

<a
  :href="withBase('/programs/S16/ev3-classroom/S16_Example_ev3_classroom.lmsp')"
  download="S16_Example_ev3_classroom.lmsp"
  class="zip-download-btn">
  ⬇ Download Example Program
</a>

![Example Program](/images/tutorials/S16/ev3-classroom/ex_program.png){style="border-radius: 10px;"}

### ✔ EV3 Custom Blocks (My Blocks)

The MBC 16-Channel Line-Following Sensor provides three custom blocks (My Blocks). No additional extension package is required. Simply call the appropriate function in your main program to store the latest sensor data in variables for direct use in motor control. The following table explains the purpose and usage of these three core functions:

| Purpose | Function | Description |
| --- | --- | --- |
| Basic Line Following | `LinePos16_dataUpdate` | `-16 ~ +16`<br>• Quickly reads the basic 16-step line-position value. Suitable for introductory lessons and basic left/right steering decisions.<br>• Calling this function automatically updates the variable `0_LinePos16`.<br>• 0 indicates that the line is centered. Negative values indicate left, and positive values indicate right. |
| High-Precision Competition Line Following | `LinePos100_dataUpdate` | • Retrieves a high-resolution line position using subpixel interpolation.<br>• Designed for advanced PID line-following algorithms to provide smooth steering corrections.<br>• Sensor calibration is required.<br>• Calling this function automatically updates the following variables:<br>&emsp;<span class="no-wrap">1. `0_LinePos100`: High-precision position, ranging from -100 to +100. Negative values indicate left, and positive values indicate right.</span><br>&emsp;<span class="no-wrap">2. `0_LineWidth16`: The number of sensing elements detecting the line, ranging from 0 to 16. Can be used to identify junction types.</span><br>&emsp;<span class="no-wrap">3. `Leftmost / Rightmost Boundary Values`: Reflectance values of the leftmost and rightmost sensing elements, used for line-loss prevention or junction detection.</span> |
| Full Sensor Array Decoding | `LineCh16_dataUpdate` | • Decodes the 16 sensing elements into individual readings.<br>• Allows you to develop custom advanced algorithms using the values from all 16 channels.<br>• Calling this function updates 16 individual variables, `s1`{.code-green-text} through `s16`{.code-green-text}, corresponding to the real-time readings of each sensing element from left to right. |

::: info ℹ️ Additional Information
Place the custom block inside a forever loop to keep your robot continuously updated with the latest readings from the MBC 16-Channel Line-Following Sensor.
:::

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