# Tutorial

## 01 / Getting Started

### ✔ Confirm that your controller, sensor, and programming environment match this tutorial:

| Requirement | Supported Type for This Tutorial |
| --- | --- |
| Controller | • LEGO MINDSTORMS Education EV3 |
| Sensor | • MBC 16-Channel Line-Following Sensor |
| Programming Environment | • clev3r v1.7.1.0 |

### ✔ Preparation

1. Turn on your robot and launch clev3r v1.7.1.0.
2. Confirm that everything is working properly.
3. Calibrate the MBC 16-Channel Line-Following Sensor for your track.

## 02 / Functions and Features

::: info ℹ️ Additional Information
In clev3r, the S16 Line-Following Sensor operates in “EV3 Infrared Sensor” mode.
:::

::: danger 🚨 Warning
Due to hardware communication limitations of the EV3 controller, switching between infrared sensor modes (Proximity / Beacon / Remote) introduces a delay of approximately 0.5 seconds. During high-speed competition, this may cause the robot to lose control. We strongly recommend using only one mode for reading values throughout your program—for example, using Remote mode exclusively for PID line following.
:::

| Programming Block | Function | Returned Values |
| --- | --- | --- |
| `Sensor.SetMode(port, 0)`<br>`value = Sensor.ReadRawValue(port, 0)` | Line Position | `-16 ~ +16`<br>• `0`{.code-green-text} indicates that the line is centered. Negative values indicate left, and positive values indicate right.<br>• `+16`{.code-green-text} and `-16`{.code-green-text} indicate that the line is at the outermost edge of the sensor array. |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[0]` | Optical Values for Channels 0 and 1 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 0, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 1, ranging from 1 to 9. |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[1]` | Optical Values for Channels 2 and 3 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 2, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 3, ranging from 1 to 9. |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[2]` | Optical Values for Channels 4 and 5 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 4, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 5, ranging from 1 to 9. |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[3]` | Optical Values for Channels 6 and 7 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 6, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 7, ranging from 1 to 9. |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[4]` | Optical Values for Channels 8 and 9 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 8, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 9, ranging from 1 to 9. |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[5]` | Optical Values for Channels 10 and 11 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 10, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 11, ranging from 1 to 9. |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[6]` | Optical Values for Channels 12 and 13 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 12, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 13, ranging from 1 to 9. |
| `Sensor.SetMode(port, 1)`<br>`value = Sensor.ReadRaw(port, 8)[7]` | Optical Values for Channels 14 and 15 | `11 ~ 99`<br>• The tens digit represents the optical value of channel 14, ranging from 1 to 9.<br>• The ones digit represents the optical value of channel 15, ranging from 1 to 9. |
| `Sensor.SetMode(port, 2)`<br>`value = Sensor.ReadRawValue(port, 4)[0]` | High-Resolution Line Position | `-100 ~ +100`<br>• `0`{.code-green-text} indicates the center. Negative values indicate left, and positive values indicate right.<br>• Recommended for smooth, high-resolution PID error input. |
| `Sensor.SetMode(port, 2)`<br>`value = Sensor.ReadRawValue(port, 4)[1]` | Line Width | `0 ~ 16`<br>• The number of sensing elements detecting the line.<br>• Can be used to detect crossroads or T-junctions. |
| `Sensor.SetMode(port, 2)`<br>`value = Sensor.ReadRawValue(port, 4)[2]` | Leftmost Reflectance Value | `0 ~ 100`<br>• The reflected-light value of the leftmost sensing element (channel `15`{.code-green-text}).<br>• `0`{.code-green-text} indicates pure black, and `100`{.code-green-text} indicates pure white.<br>• Can be used to detect track boundaries or junctions. |
| `Sensor.SetMode(port, 2)`<br>`value = Sensor.ReadRawValue(port, 4)[3]` | Rightmost Reflectance Value | `0 ~ 100`<br>• The reflected-light value of the rightmost sensing element (channel `0`{.code-green-text}).<br>• `0`{.code-green-text} indicates pure black, and `100`{.code-green-text} indicates pure white.<br>• Can be used to detect track boundaries or junctions. |

## 03 / Example Program

<DownloadButton
  href="/programs/S16/ev3-clev3r/S16_Example_ev3_clev3r.bp"
  download="S16_Example_ev3_clev3r.bp"
  label="Download Example Program"
/>

![Example Program](/images/tutorials/S16/ev3-clev3r/ex_program.png){style="border-radius: 10px;"}

### ✔ EV3 My Blocks Reference

The MBC 16-Channel Line-Following Sensor provides three subroutines. No additional extension package is required. Simply call the appropriate function in your main program to store the latest sensor data in variables for direct use in motor control. The following table explains the purpose and usage of these three core functions:

| Purpose | Function | Description |
| --- | --- | --- |
| Basic Line Following | `LinePos16_dataUpdate` | `-16 ~ +16`<br>• Quickly reads the basic 16-step line-position value. Suitable for introductory lessons and basic left/right steering decisions.<br>• Takes the sensor port (`port`) as input and returns `pos16`{.code-green-text}.<br>• `0`{.code-green-text} indicates that the line is centered. Negative values indicate left, and positive values indicate right. |
| High-Precision Competition Line Following | `LinePos100_dataUpdate` | `-16 ~ +16`<br>• Retrieves a high-resolution line position using subpixel interpolation.<br>• Designed for advanced PID line-following algorithms to provide smooth steering corrections.<br>• Sensor calibration is required.<br>• Takes the sensor port as input and returns the following values together:<br>&emsp;1. `pos100`{.code-green}: High-precision position, ranging from `-100 ~ +100`{.code-green-text}. Negative values indicate left, and positive values indicate right.<br>&emsp;2. `width`{.code-green}: The number of sensing elements detecting the line, ranging from `0 ~ 16`{.code-green-text}. Can be used to identify junction types.<br>&emsp;3. `ch1/ch16`{.code-green}: Reflectance values of the leftmost and rightmost sensing elements, used for line-loss prevention or junction detection. |
| Full Sensor Array Decoding | `LineCh16_dataUpdate` | `1 ~ 9`<br>• Decodes the 16 sensing elements into individual readings.<br>• Allows you to develop custom advanced algorithms using the values from all 16 channels.<br>• Takes the sensor port as input and returns the array `light16`{.code-green-text}.<br>• Use the indices `light16[0]`{.code-green-text} through `light16[15]`{.code-green-text} to access the optical value of each sensing element. |

::: info ℹ️ Additional Information
Place the custom blocks inside a forever loop to keep your robot continuously updated with the latest readings from the MBC 16-Channel Line-Following Sensor.
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