## Product introduction

<div style="
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  width: 100%;
  margin: 24px auto;
">

  <!-- Product image -->
  <div style="
    flex: 1 1 300px;
    max-width: 480px;
    text-align: center;
  ">
    <img
      src="/images/products/Cam/Cam-spike.webp"
      alt="MBC UniCam Vision Camera Sensor"
      style="
        width: 100%;
        height: auto;
        max-height: 315px;
        object-fit: contain;
        border-radius: 12px;
      "
    >
  </div>

  <!-- YouTube video -->
  <div style="
    flex: 1 1 300px;
    max-width: 560px;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
  ">
    <iframe
      src="https://www.youtube.com/embed/Zy4OVcHO7QQ?si=m6f2qJluZgB83sbB"
      title="MBC UniCam demonstration video"
      style="
        width: 100%;
        height: 100%;
        border: none;
        display: block;
      "
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen>
    </iframe>
  </div>

</div>

The MBC UniCam Vision Camera Sensor is a new-generation intelligent vision sensor designed for robotics competitions and programming education. It combines a <span style="color: red;">1.8-inch color screen</span>, <span style="color: red;">button-based controls</span>, and a <span style="color: red;">built-in fill light</span>. It detects taught colors in real time, reports target position and size, samples colors at selected coordinates, and recognizes lines and object shapes for color recognition, target tracking, and interactive control.

Preview the image and detection results directly on the camera screen. Use the buttons to adjust sampling positions, color tolerance, and minimum color-block area without writing image-processing code. Color settings and lens parameters are retained after power-off. Choose a 68°, 128°, or 160° lens to suit distant targets or a wider field of view.

SPIKE, EV3, MATRIX, and general I²C each use their own firmware. Check the camera version before connecting it and follow the wiring instructions for the corresponding tutorial.

::: warning ⚠️ Note
- The new MBC UniCam combines the functions of earlier models in one module for more complete and convenient vision recognition. Sales of the previous version ended in October 2026.
- Updates for earlier versions have ended. Future development will focus on the new-generation UniCam.
- The new version provides the functions described in the tutorials on this website.
- Owners of earlier versions can have the firmware upgraded to the new version free of charge, with round-trip shipping paid by the owner.
:::

### ✔ Five vision functions

<FeatureSection
  :cards="[
    {
      title: 'Color tracking',
      items: [
        'Detect color blocks in the image and read their <strong>position</strong>, <strong>count</strong>, <strong>width and height</strong>, and <strong>percentage of the image area</strong>.',
        'Store up to 16 target colors for <strong>tracking and identifying objects of multiple colors</strong>.'
      ]
    },
    {
      title: 'Coordinate color sampling',
      items: [
        'Read the <strong>color at a selected coordinate</strong> in the image.',
        'Set sampling positions from the camera menu and check the detection area in the live preview.',
        'Identify the color at a sample point without recognizing an entire object.'
      ]
    },
    {
      title: 'Color order',
      items: [
        'Detect color blocks arranged <strong>from left to right</strong> in the image.',
        'Read the <strong>hue codes</strong> in order and the <strong>total count</strong> so the robot can determine the color sequence.'
      ]
    },
    {
      title: 'Line following',
      items: [
        'Detect <strong>line position</strong>, <strong>direction</strong>, and <strong>junction type</strong> in real time.',
        'Support <strong>precise line following</strong> and <strong>autonomous navigation</strong>.'
      ]
    },
    {
      title: 'Object detection',
      items: [
        'Detect the <strong>geometric shape</strong>, <strong>color</strong>, and <strong>position</strong> of objects.',
        'Support <strong>object recognition</strong> and <strong>sorting tasks</strong>.'
      ]
    }
  ]"
/>

### ✔ Hardware specifications

<FeatureSection
  :cards="[
    {
      title: 'Live color preview',
      items: [
        'A <strong>168*128 TFT LCD color screen</strong> displays the camera image and detection results in real time.',
        'View targets directly on the sensor to check detection and tracking.'
      ]
    },
    {
      title: 'Fill light and lens options',
      items: [
        'Switch the built-in <strong>fill light</strong> on or off from the camera menu to improve recognition in low light.',
        'Choose a <strong>68°</strong> or <strong>128°</strong> lens for distant targets or a wider view. <strong>(A 160° wide-angle lens is available separately.)</strong>'
      ]
    },
    {
      title: 'Button controls and saved settings',
      items: [
        'Use the camera buttons to adjust <strong>color sampling settings for the five vision functions</strong> without writing additional image-processing code.',
        '<strong>Color settings and lens parameters are retained after power-off</strong> and are ready to use at the next startup.'
      ]
    }
  ]"
/>

### ✔ Version compatibility
::: warning ⚠️ Note
Choose the camera firmware that matches your host. This website provides the following three tutorial paths.
- SPIKE
- EV3
- General I2C development boards
:::

## Before you begin

1. Check that your controller matches the version of your MBC UniCam Vision Camera Sensor.
2. Connect the MBC UniCam Vision Camera Sensor to your controller with the appropriate cable.
3. The color screen turns on when power is connected correctly.
4. Mount the MBC UniCam Vision Camera Sensor on your robot.
5. Aim it at the field from the height and angle you will use, keeping the fill light and ambient lighting consistent with the actual run.
6. Make sure the mode selected on the MBC UniCam matches the mode configured in your program.
   - For camera settings, see “Detection mode setup” below.
   - For program settings, see “Functions and data” below.

## Detection mode setup

::: warning ⚠️ Note
UniCam has many functions. Follow the setup steps below while learning to use it. Once you are familiar with the controls, you can configure it on your own.
:::

1. The camera opens in the live preview after startup. Use the control at the upper right of UniCam to switch targets. The target indicator appears at the upper right of the display (explained in more detail later). Select the yellow “Menu” label, then press the selection button at the upper left of the sensor to confirm with “OK”.
2. The MENU screen displays cards for the five camera modes and Setup. Green text and a green dot indicate the active mode. The five main modes are listed below.
   - Mode 1 — Color tracking (Track)
   - Mode 2 — Coordinate color sampling (Spot)
   - Mode 3 — Color order (Order)
   - Mode 4 — Line following (Line)
   - Mode 5 — Object detection (Object)
3. Move the left/right control to choose a mode, then press the selection button to confirm the main mode.
   - Press the left/right control inward like a button to return to the previous screen.
4. After selecting a main mode, the submode menu opens. Use the left/right control to choose a submode, then press the selection button to confirm.
   - Mode 3 has only one submode, so the submode selection screen is skipped.
   - Press the left/right control inward to return to the previous screen.
5. After completing the setup, make sure the mode selected on the sensor matches the mode configured in your program.

## Display content explanation

<br><br>
