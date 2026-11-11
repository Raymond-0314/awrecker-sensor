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

  <div style="
    flex: 1 1 300px;
    max-width: 560px;
    aspect-ratio: 16 / 9;
    border-radius: 12px;
    overflow: hidden;
  ">
    <iframe
      src="https://www.youtube.com/embed/Zy4OVcHO7QQ?si=m6f2qJluZgB83sbB"
      title="MBC UniCam demonstration"
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

The MBC UniCam Vision Camera Sensor processes images on the camera and shows live results on its color screen. Use the camera buttons to teach target colors, choose sample points, and select the camera mode. The host reads the results for robot control.

### ✔ Five vision modes

| Mode | When to use it |
| --- | --- |
| Color tracking | Follow one or more taught colors. Choose a level based on how many targets and which fields you need. |
| Coordinate sampling | Read hue, saturation, and brightness at fixed points in the image. |
| Color order | Read color blocks from left to right and use the total to identify valid entries. |
| Line following | Steer using near, middle, and far offsets. Available fields can include line angle, junctions, and colored markers. |
| Object detection | Identify taught colors and shapes, sorted largest first. Output varies by host and mode. |

### ✔ Hardware and compatibility

The camera has a color preview, physical controls, a built-in fill light, and interchangeable lens options. Choose the firmware for your host. This site covers SPIKE, EV3, and general I²C. Follow the wiring instructions for your version.

## Calibration and normalization

1. **Mount the camera first.** Aim it at the field from the height and angle you will use. Keep the lighting consistent with the actual run.
2. **Set up the selected mode.** For color tracking and object detection, select a target slot, press OK, move the crosshair with AxisX and AxisY, and confirm the sample. For coordinate sampling, move the sample point to the desired location. Select black, white, or colored line following. Colored lines use target color 1.
3. **Check the preview, then the readings.** Move the target and check that its outline follows. Raw EV3 grid Y increases upward, while image Y in the other tutorials increases downward. Line offset runs from −100 to 100, with negative values to the left.

## Hardware indicators and fill light

| Where to look | What it tells you |
| --- | --- |
| Color screen | Shows the live image, detections, and active mode after power-up. For example, 1-3 means Color Tracking ③ Standard. |
| Host name in the upper-left corner | On SPIKE and EV3, green means connected and red means disconnected. Check the port, cable, and firmware version if it stays red. |
| Built-in fill light | Adjust it from the camera menu when you need more light. Check target or line detection again after changing the lighting. |


### ✔ Common values

Object code = color ID × 10 + shape. For example, 13 is a triangle in target color 1. Code 0 means no object.

| Shape code | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Shape | Other | Circle | Oval | Triangle | Square | Rectangle | Pentagon | Hexagon | Star | Trapezoid |

Line flags add 1 for near, 2 for middle, and 4 for far. A value of 5 means the near and far rows detected a line. Junction types 0–5 mean none, cross, T, left, right, and end. Line-loss direction 0, 1, or 2 means line present, left, or right.
