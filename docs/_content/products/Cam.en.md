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

<FeatureSection horizontal
  :cards="[
    {
      title: 'Color tracking',
      image: '/images/tutorials/Cam/color-track.svg',
      imageAlt: 'Color tracking positions X and Y, width W and height H',
      items: [
        'Teach up to <strong>16 target colors</strong>, then locate their color blocks.',
        'Submodes trade color count for <strong>position, size, count and area</strong> detail. Width and height can help estimate distance.'
      ]
    },
    {
      title: 'Coordinate color sampling',
      image: '/images/tutorials/Cam/sample-points.svg',
      imageAlt: 'Sample point positions S1 to S20',
      items: [
        'Fixed points return <strong>hue H</strong>, with saturation S and value V added by submode.',
        'Set positions on the camera or with I2C command E1. Each sample averages <strong>3×3 pixels</strong>.'
      ]
    },
    {
      title: 'Color order',
      image: '/images/tutorials/Cam/color-order.svg',
      imageAlt: 'Color blocks ordered left to right with hue codes',
      items: [
        'Return hue codes <strong>from left to right</strong> and the total block count. There are no submodes.',
        'Red also has hue code <strong>0</strong>. Read the count first to identify valid fields.'
      ]
    },
    {
      title: 'Line following',
      image: '/images/tutorials/Cam/line-follow.svg',
      imageAlt: 'Near, middle and far scan rows with offsets and angle',
      items: [
        '<strong>Three scan rows</strong> detect offsets, angle, widths and junctions. Available fields depend on the host.',
        'Choose black, white or colored line; colored line uses <strong>target 1</strong>. Near offset supports PID; far offset anticipates bends.'
      ]
    },
    {
      title: 'Object detection',
      image: '/images/tutorials/Cam/objects.svg',
      imageAlt: 'Objects ordered by area, with color and shape codes',
      items: [
        'Combine <strong>target colors 1 ~ 8 and outlines</strong>; detect up to eight objects, largest first.',
        '<strong>Code = color ID × 10 + shape</strong>; 13 means color 1 triangle, 0 means none. Details mode adds fields beyond codes and positions.'
      ]
    }
  ]"
/>

### ✔ Hardware specifications

<FeatureSection horizontal
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

These illustrations follow the firmware interface. The interface is in English and the camera images are illustrative. See “Detection mode setup” above for menu navigation. The illustrated `max N` values assume the SPIKE Education App; other hosts may show different limits.

### ✔ Live view and status

| Location | Meaning |
| :-- | :-- |
| Upper left | Host name. Green means connected; red means disconnected. |
| Top | `Mode main-submode`. For example, `Mode 1-3` selects standard color tracking. |
| Upper right | Selected target number, starting at 1 and matching the color ID sent to the host. Yellow `MENU` indicates the menu entry. |
| Bottom | Position, color or detection data for the current mode, as listed below. |

Left/right cycles through “Target 1 … Target N → MENU”. N is the last taught target plus one empty slot, up to 16. Spot mode cycles through “S1 … Sn → MENU”, also including one empty slot after the last configured point.

<CamScreenGallery>

<figure>

![Boot screen](/images/tutorials/Cam/ui/01-boot.webp)

<figcaption><strong>Boot screen</strong><br>Shows the host version and lens model. SPIKE and EV3 versions wait for a host connection before starting the camera.</figcaption>
</figure>

<figure>

![Live view: color tracking](/images/tutorials/Cam/ui/02-live-track.webp)

<figcaption><strong>Live view: color tracking</strong><br>Mode 1-3 and the target number appear at the top; X, Y, W, H and count for the selected target appear below.</figcaption>
</figure>

<figure>

![Live view: MENU](/images/tutorials/Cam/ui/03-live-menu.webp)

<figcaption><strong>Live view: MENU</strong><br>Yellow MENU at the upper right marks the selected menu entry.</figcaption>
</figure>

</CamScreenGallery>

### ✔ Menu information and max N

The submode menu’s `max N` is **the number of targets or sample points the current host can receive at once**, rather than the camera’s storage capacity. For example, tracking mode 1-3 shows `max 4` with the SPIKE Education App. Yellow text lists the available fields; the explanation below describes their use.

SPIKE identifies the Education App, home app, Pybricks blocks or Pybricks library from the sensor mode most recently read by the host. No count appears before the first host read. **The count is determined when you enter the menu.** After changing programs, return to live view, let the program start reading, then reopen the menu. The count does not refresh while the menu remains open.

<CamScreenGallery>

<figure>

![MENU cards](/images/tutorials/Cam/ui/04-menu-cards.webp)

<figcaption><strong>MENU cards</strong><br>Five camera modes and Setup. Green text and a green dot mark the active mode.</figcaption>
</figure>

<figure>

![Tracking submodes](/images/tutorials/Cam/ui/05-sub-track.webp)

<figcaption><strong>Tracking submodes</strong><br>max N gives the host limit; yellow text lists the output fields.</figcaption>
</figure>

<figure>

![Spot submodes](/images/tutorials/Cam/ui/06-sub-spot.webp)

<figcaption><strong>Spot submodes</strong><br>Hue, hue plus saturation, or hue plus saturation and value.</figcaption>
</figure>

<figure>

![Line submodes](/images/tutorials/Cam/ui/07-sub-line.webp)

<figcaption><strong>Line submodes</strong><br>Black, white or colored line. Colored-line mode uses target color 1.</figcaption>
</figure>

<figure>

![Object submodes](/images/tutorials/Cam/ui/08-sub-object.webp)

<figcaption><strong>Object submodes</strong><br>Choose the object list or object details.</figcaption>
</figure>

</CamScreenGallery>

### ✔ Teaching targets and positioning sample points

Press OK on a target to teach its color. Select AxisX, then AxisY, and confirm to sample the color. Holding OK for about 0.8 seconds completes teaching directly. Hue, Sta, Size and Locked/MaxArea can then be adjusted. Pressing the side button on a target clears both its color and assigned shape. In object mode, teaching targets 1–8 opens `Target N shape`; Any leaves the shape unrestricted.

<CamScreenGallery>

<figure>

![Teach color: X](/images/tutorials/Cam/ui/11-teach-x.webp)

<figcaption><strong>Teach color: X</strong><br>The image freezes. Move the yellow line left/right, then press OK.</figcaption>
</figure>

<figure>

![Teach color: Y](/images/tutorials/Cam/ui/12-teach-y.webp)

<figcaption><strong>Teach color: Y</strong><br>Move the blue line, then press OK to sample the color.</figcaption>
</figure>

<figure>

![Assign a shape](/images/tutorials/Cam/ui/13-teach-shape.webp)

<figcaption><strong>Assign a shape</strong><br>Targets 1–8 support a shape constraint. Any accepts all shapes.</figcaption>
</figure>

</CamScreenGallery>

In Spot mode, OK on a point **sets its position** rather than teaching a target color. Confirm X, then Y to save. The side button cancels during positioning; on the live point it clears that point. Camera controls and host command `E1` edit the same positions.

**Unset points are not drawn, the bottom bar shows `--`, and H, S and V sent to the host are all 0**, as with untaught targets.

<CamScreenGallery>

<figure>

![Unset sample point](/images/tutorials/Cam/ui/15-spot-unset.webp)

<figcaption><strong>Unset sample point</strong><br>No cross is drawn and the host receives H, S and V as 0. Press OK to set the position.</figcaption>
</figure>

<figure>

![Sample position: X](/images/tutorials/Cam/ui/16-spot-x.webp)

<figcaption><strong>Sample position: X</strong><br>Move the yellow line left/right and press OK.</figcaption>
</figure>

<figure>

![Sample position: Y](/images/tutorials/Cam/ui/17-spot-y.webp)

<figcaption><strong>Sample position: Y</strong><br>Move the blue line. OK saves; the side button cancels.</figcaption>
</figure>

</CamScreenGallery>

### ✔ Mode overlays and bottom-bar values

| Camera mode | Overlay | Bottom bar |
| :-- | :-- | :-- |
| Color tracking | Target tracking results | X, Y, W, H and count for the selected target. |
| Coordinate color sampling | Crosses and numbers for configured points; the selected point is cyan | Selected point’s H, S and V, or `--` when unset. |
| Color order | Sequence numbers on color blocks | Total block count. |
| Line following | Three scan rows and the detected line | Near offset N, far offset F, angle A and junction type J. |
| Object detection | Each outline and its color ID and shape; `?` marks an object touching the image edge | Object count and the largest object’s code and position. |

<CamScreenGallery>

<figure>

![Live view: Spot](/images/tutorials/Cam/ui/14-live-spot.webp)

<figcaption><strong>Live view: Spot</strong><br>The selected point is a large cyan cross. Its H, S and V appear below.</figcaption>
</figure>

<figure>

![Live view: line following](/images/tutorials/Cam/ui/18-live-line.webp)

<figcaption><strong>Live view: line following</strong><br>Three scan rows are drawn; N, F, A and J appear below.</figcaption>
</figure>

<figure>

![Live view: object detection](/images/tutorials/Cam/ui/19-live-object.webp)

<figcaption><strong>Live view: object detection</strong><br>Outlines show color IDs and shapes. The bottom bar gives the count and largest object’s code and position.</figcaption>
</figure>

</CamScreenGallery>

### ✔ Setup and value adjustment

Setup includes brightness, contrast, saturation, white balance, white calibration, self-test and restoring defaults. Item 14, `ShapeTol`, ranges from 1 to 5 and controls how loosely object shapes are matched.

<CamScreenGallery>

<figure>

![Setup menu](/images/tutorials/Cam/ui/09-setup.webp)

<figcaption><strong>Setup menu</strong><br>OK opens adjustment. The side button saves settings and returns to the cards; EXIT returns to live view.</figcaption>
</figure>

<figure>

![Adjust a value](/images/tutorials/Cam/ui/10-adjust.webp)

<figcaption><strong>Adjust a value</strong><br>Changes apply immediately. Left decreases, right increases, OK saves and the side button restores the previous value.</figcaption>
</figure>

</CamScreenGallery>

### ✔ Settings retained after power-off

The camera retains 16 target colors, lens settings, the main mode and each mode’s submode, configured sample positions (including positions changed by host command E1), shape tolerance and assigned shapes for targets 1–8.

::: warning ⚠️ Note
Flashing this generation of UniCam firmware for the first time resets all these settings and selects “Color tracking - ③ Standard”.
:::

<br><br>
