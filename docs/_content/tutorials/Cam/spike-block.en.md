# Tutorial

## 01 / Environment setup

### ✔ Check your controller, sensor, and programming environment

| Requirement | Supported in this tutorial |
| --- | --- |
| Controller | LEGO® Education SPIKE™ Prime Set<br>LEGO® MINDSTORMS® Robot Inventor |
| Sensor | MBC UniCam Vision Camera Sensor (SPIKE edition) |
| Programming environment | Pybricks Blocks |

### ✔ Before you begin

1. Start your robot and open Pybricks Blocks.
2. Check that the hub runs Pybricks firmware and that the camera is connected.
3. Set the camera mode and make sure it matches the mode used by the program.

## 02 / Basic control - Preparation and functions

### ✔ Preparation

1. No external library is required. Connect the camera to Port C and use the built-in Pybricks Color Sensor.
2. Select the Mode ID on the camera so it matches the reading table.
3. Configure a Color Sensor on Port C and use its reflection and ambient-light blocks.

::: info ℹ️ Reading notes
- Use the built-in Color Sensor blocks. Store reflection and ambient readings in variables and decode them for the selected camera mode. Select that mode on the camera.
- Here ÷ means integer division and mod means remainder. Ambient readings retain one decimal place: use floor(reading) for the integer and round(reading × 10) % 10 for the digit.
:::

::: warning ⚠️ Note
- Only one camera submode is active at a time. Make sure its Mode ID matches the program.
- Modes reuse the same read expressions; decode their results using the table for the selected mode.
:::

<CamModeAccordion namespace="basic">

### ✔ Camera mode overview

MBC UniCam provides five main modes, each with its own submodes. Use the tables and Mode ID numbers below to find the corresponding programming instructions.

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 — Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`Pybricks blocks provide: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Pybricks blocks provide: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Pybricks blocks provide: 2 color positions`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Color 2 X and Color 2 Y | `0 ~ 8.6`<br>• Color 2 X range: `0, 1 ~ 8`{.code-green}.<br>• Color 2 X = floor(reading).<br>• Color 2 Y range: `0, 1 ~ 6`{.code-green}.<br>• Color 2 Y = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Pybricks blocks provide: 1 color positions and sizes`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid; ambient-light positions or sizes use an `8 × 6` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found.
- For a negative reflected-light position, add 6399 before decoding.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Color 1 X and Color 1 Y | `-3199 ~ 3199`<br>• Color 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Color 1 X = reading ÷ 100.<br>• Color 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Color 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Color 1 W and Color 1 H | `0 ~ 8.6`<br>• Color 1 W range: `0, 1 ~ 8`{.code-green}.<br>• Color 1 W = floor(reading).<br>• Color 1 H range: `0, 1 ~ 6`{.code-green}.<br>• Color 1 H = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 2 — Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Pybricks blocks provide: 2 points: hue`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Saturation retains tens only; the reconstructed value is approximate.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | S1 hue and S1 saturation | `0 ~ 2559`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading ÷ 10.<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading mod 10) × 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | S2 hue and S2 saturation (tens precision) | `0 ~ 255.9`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = floor(reading).<br>• S2 saturation (tens precision) range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (round(reading × 10) % 10) × 10. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Pybricks blocks provide: 2 points: hue and saturation`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Saturation retains tens only; the reconstructed value is approximate.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | S1 hue and S1 saturation | `0 ~ 2559`<br>• S1 hue range: `0 ~ 255`{.code-green}.<br>• S1 hue = reading ÷ 10.<br>• S1 saturation range: `0 ~ 90`{.code-green}.<br>• S1 saturation = (reading mod 10) × 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | S2 hue and S2 saturation (tens precision) | `0 ~ 255.9`<br>• S2 hue range: `0 ~ 255`{.code-green}.<br>• S2 hue = floor(reading).<br>• S2 saturation (tens precision) range: `0 ~ 90`{.code-green}.<br>• S2 saturation = (round(reading × 10) % 10) × 10. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Pybricks blocks provide: 1 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Configure sample positions first. Unset points are not drawn and send H, S and V as 0. H is hue, S saturation and V value.
- Hue 0 can be red. Confirm the sample position is configured rather than treating hue 0 alone as absence.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | S1 hue | `0 ~ 255`<br>• S1 hue = reading. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | S1 saturation and S1 value (tens precision) | `0 ~ 100.9`<br>• S1 saturation range: `0 ~ 100`{.code-green}.<br>• S1 saturation = floor(reading).<br>• S1 value (tens precision) range: `0 ~ 90`{.code-green}.<br>• S1 value = (round(reading × 10) % 10) × 10. |

</CamModeSection>

#### Mode 3 — Color order

<CamModeSection mode="30" title="Color order">

`Pybricks blocks provide: the first 2 block hues and total count`

::: info ℹ️ Reading notes
- Blocks are ordered left to right. Read the total count before using hue entries; hue 0 can be red.
- 9 means 9 or more.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Block 1 hue from the left | `0 ~ 255`<br>• Block 1 hue from the left = reading. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Block 2 hue from the left and Total color blocks | `0 ~ 255.9`<br>• Block 2 hue from the left range: `0 ~ 255`{.code-green}.<br>• Block 2 hue from the left = floor(reading).<br>• Total color blocks range: `0 ~ 9`{.code-green}.<br>• Total color blocks = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 4 — Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Pybricks blocks provide: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a black line on a light surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `-100 ~ 100`{.code-green}.<br>• Near offset = (reading ÷ 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading mod 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `-100 ~ 100`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Pybricks blocks provide: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- This submode detects a white line on a dark surface.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `-100 ~ 100`{.code-green}.<br>• Near offset = (reading ÷ 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading mod 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `-100 ~ 100`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Pybricks blocks provide: near/far offsets, junction type and line-found flags`

::: info ℹ️ Reading notes
- Junction types: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 dead end. Line-found flags add 1, 2 and 4 for near, middle and far.
- Before using colored-line mode, teach the line color as target 1.
- For example, a reading of 80 decodes to - 20.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Near offset and Junction type | `0 ~ 2005`<br>• Near offset range: `-100 ~ 100`{.code-green}.<br>• Near offset = (reading ÷ 10) - 100.<br>• Junction type range: `0 ~ 5`{.code-green}.<br>• Junction type = reading mod 10. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Far offset and Line-found flags | `0 ~ 200.7`<br>• Far offset range: `-100 ~ 100`{.code-green}.<br>• Far offset = (floor(reading)) - 100.<br>• Line-found flags range: `0 ~ 7`{.code-green}.<br>• Line-found flags = round(reading × 10) % 10. |

</CamModeSection>

#### Mode 5 — Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Pybricks blocks provide: codes and positions of the first 1 objects, plus total count`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found. Ambient light provides object data, rather than a second position.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For a negative reflected-light position, add 6399 before decoding.
- For example, 13 means color 1 triangle; 0 means no object.
- 9 means 9 or more.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Object 1 X and Object 1 Y | `-3199 ~ 3199`<br>• Object 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Object 1 X = reading ÷ 100.<br>• Object 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Object 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Object 1 code and Object count | `0 ~ 89.9`<br>• Object 1 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 1 color ID = (floor(reading)) ÷ 10.<br>• Object 1 shape code = (floor(reading)) % 10.<br>• Object count range: `0 ~ 9`{.code-green}.<br>• Object count = round(reading × 10) % 10. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Pybricks blocks provide: details of the first 1 objects`

::: info ℹ️ Reading notes
- Reflected-light positions use a `40 × 30` grid. X increases rightward and Y downward. These are grid units, not pixels; position 0 means not found. Ambient light provides object data, rather than a second position.
- Only target colors 1 ~ 8 are used. Objects are ordered largest first, and X/Y is the centroid. Shape codes 0 ~ 9 mean other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star and trapezoid.
- For a negative reflected-light position, add 6399 before decoding.
- For example, 13 means color 1 triangle; 0 means no object.
- Only tens are retained; 9 represents about 90 or higher. Units are lost.
:::

| Block / read location | Function | Value meaning and decoding |
| --- | --- | --- |
| ![Reflected-light value](/images/tutorials/Cam/spike-block/reflected.png) | Object 1 X and Object 1 Y | `-3199 ~ 3199`<br>• Object 1 X range: `0, 1 ~ 40`{.code-green}.<br>• Object 1 X = reading ÷ 100.<br>• Object 1 Y range: `0, 1 ~ 30`{.code-green}.<br>• Object 1 Y = reading mod 100. |
| ![Ambient-light value](/images/tutorials/Cam/spike-block/ambient.png) | Object 1 code and Object 1 area (tens precision) | `0 ~ 89.9`<br>• Object 1 code range: `0, 10 ~ 89`{.code-green}.<br>• Object 1 color ID = (floor(reading)) ÷ 10.<br>• Object 1 shape code = (floor(reading)) % 10.<br>• Object 1 area (tens precision) range: `0 ~ 90`{.code-green}.<br>• Object 1 area = (round(reading × 10) % 10) × 10. |

</CamModeSection>

</CamModeAccordion>

### ✔ Basic control example


Select camera mode 13 (Color Tracking - ③ Standard) and teach target colors 1 and 2. Create reflected, ambient, X1, Y1, X2, and Y2 variables. Add the following operations inside a forever loop.

| Step | Block operation |
| --- | --- |
| 1 | Set reflected to the reflected light reading and ambient to the ambient light reading. Read each once per loop. |
| 2 | If reflected < 0, increase reflected by 6399. |
| 3 | X1 = floor(reflected / 100). Y1 = the remainder after dividing reflected by 100. |
| 4 | X2 = floor(ambient). Y2 = round(ambient × 10) modulo 10. |
| 5 | If X1 or X2 is 0, display “No target” for that color. Otherwise display its X and Y. |
| 6 | Wait 0.1 seconds before the next iteration. |

For example, reflected = 2015 and ambient = 4.3 decode to target 1 grid position (20,15) and target 2 grid position (4,3). The grids have different resolutions: 40 × 30 for target 1 and 8 × 6 for target 2.

### ✔ Decode line-following readings

For camera modes 41, 42, and 43: near offset = floor(reflected / 10) - 100; junction = reflected modulo 10; far offset = floor(ambient) - 100; flags = round(ambient × 10) modulo 10. For example, 802 and 115.5 mean near offset -20, a T junction, far offset +15, and a line detected in the near and far rows.


*[Image pending: complete SPIKE Pybricks Blocks basic example or project]*

## 03 / Advanced control - Preparation and functions

<DownloadButton href="/programs/Cam/spike-pybricks/MBC_UniCam.py" download="MBC_UniCam.py" label="v4.1 Library" />

### ✔ Function Setup

1. Click the <code class="code-blue"><svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline-block; vertical-align: -0.125em; margin-right: 4px;"><path d="M12 3v12m-5-5 5 5 5-5"></path><path d="M5 16v5h14v-5"></path></svg>v4.1 Library</code> button above to download the `MBC UniCam Vision Camera Sensor Pybricks - SPIKE Library`{.code-blue}.
2. Confirm that the library filename is `MBC_UniCam.py`{.code-blue}.
3. Return to Pybricks and click the `import a file`{.code-blue} button ![Import](/images/tutorials/S8/spike-block/pybricks-import.svg){style = "width: 1em; height: 1em; display: inline-block; vertical-align: -0.125em; margin: 0 4px;"} in the `file explorer`{.code-blue} workspace.
4. Select and import the `MBC_UniCam.py`{.code-blue} library.
5. Confirm that `MBC_UniCam.py`{.code-blue} appears in the `file explorer`{.code-blue} workspace. The library and your main program must be in the same project.
6. Open your Pybricks program and place the library import and configuration blocks under the `set up`{.code-blue} block, as shown below. Place the remaining drivetrain, motor, and sensor initialization blocks after them under the `set up`{.code-blue} block.

![Mode ID setup 11](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_11.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

### ✔ Function Reference

#### set up

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Import the UniCam class](/images/tutorials/Cam/spike-block/advanced/setup/import.png) | Import Library | • Import the `UniCam`{.code-green} class from the `MBC_UniCam`{.code-green} module.<br>• Enter `MBC_UniCam`{.code-green} in the `from` field without the `.py` extension, and `UniCam`{.code-green} in the `import` field.<br>• Keep `MBC_UniCam.py`{.code-green} and the main program in the same project; spelling and capitalization must match. |
| ![Configure the Cam object](/images/tutorials/Cam/spike-block/advanced/setup/init_true.png) | Library Configuration | • `Cam`{.code-green} is the object name selected by subsequent reading blocks.<br>• `UniCam`{.code-green} is the class imported from `MBC_UniCam`{.code-green}.<br>• First number: `1`{.code-green} is Port A. `1 ~ 6`{.code-green} correspond to `A ~ F`{.code-green}; match the wiring.<br>• Second number: `11`{.code-green} is the camera Mode ID. Change it for the chosen submode and select the same mode on the camera.<br>• Boolean: `true`{.code-green} enables asynchronous mode with `await`{.code-green}; `false`{.code-green} uses synchronous mode with `call`{.code-green}. |


::: info ℹ️ Additional Information
- Synchronization settings:

| Programming Block | Mode | Description |
| --- | --- | --- |
| ![Asynchronous setup: true](/images/tutorials/Cam/spike-block/advanced/setup/init_true.png) | Asynchronous mode: set to `true`{.code-green} | • Use `await`{.code-green} when reading values.![await](/images/tutorials/Cam/spike-block/advanced/main1/xy.png){style = "display: block; width: 300px; max-width: 100%; height: auto; margin: 10px;"}• Can be used with the `multitask`{.code-green} block.![multitask](/images/tutorials/S8/spike-block/multitask.png){style = "display: block; width: 250px; max-width: 100%; height: auto; margin: 10px;"} |
| ![Synchronous setup: false](/images/tutorials/Cam/spike-block/advanced/setup/init_false.png) | Synchronous mode: set to `false`{.code-green} | • Use `call`{.code-green} when reading values.![call](/images/tutorials/Cam/spike-block/advanced/main1/xy_call.png){style = "display: block; width: 300px; max-width: 100%; height: auto; margin: 10px;"}• Cannot be used with the `multitask`{.code-green} block. |

:::



#### Sensor status and device information

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Sensor read status](/images/tutorials/Cam/spike-block/advanced/sensor/sensor_ok.png) | Sensor read status | `true / false`<br>• Reports whether the most recent read succeeded. true = success; false = no successful read. |
| ![Configured Mode ID](/images/tutorials/Cam/spike-block/advanced/sensor/mode_number.png) | Configured Mode ID | `11 ~ 52`<br>• Returns the configured Mode ID. Valid IDs are 11, 12, 13, 14, 21, 22, 23, 30, 41, 42, 43, 51 and 52. |
| ![Device identification](/images/tutorials/Cam/spike-block/advanced/sensor/device_id.png) | Device identification | `tuple[3]`<br>• Returns (device address, hardware code, firmware word). For example (76, 3, 100), where 76 = 0x4C.<br>• Device information uses sensor communication mode `8`. |
| ![Whether the device is UniCam](/images/tutorials/Cam/spike-block/advanced/sensor/is_unicam.png) | Whether the device is UniCam | `true / false`<br>• Checks the device identification for UniCam. |
| ![Firmware version](/images/tutorials/Cam/spike-block/advanced/sensor/firmware_version.png) | Firmware version | `tuple[2]`<br>• Returns (major, minor), for example (1, 0). |

<CamModeAccordion namespace="advanced">

### ✔ Camera mode overview

<CamModeOverview />

### ✔ Mode fields and decoding

#### Mode 1 - Color tracking

<CamModeSection mode="11" title="Color tracking - ① Most colors">

`Library provides: 14 color positions and counts`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- `cell()` uses a `16 × 12` grid. Pixel coordinates represent cell centers.
- Main data uses sensor communication mode `9`.
- Counts use sensor communication mode `6`. Request them only when needed because switching read modes adds a delay.
- Pixel coordinates are cell centers: X = (cell X - 1) × 10 + 5 and Y = (cell Y - 1) × 10 + 5. Count 7 means 7 or more blobs.
:::

**Mode ID setup**

Set the `set up` Mode ID to `11`{.code-green} and select the same Mode ID `11`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 11](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_11.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Position X/Y of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/xy.png) | Position X/Y of a selected color | `X: 0, 5 ~ 155 / Y: 0, 5 ~ 115`<br>• Returns `(X, Y)`{.code-green} in pixels.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![X of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/x.png) | X of a selected color | `0, 5 ~ 155`<br>• Returns X, increasing rightward.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Y of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/y.png) | Y of a selected color | `0, 5 ~ 115`<br>• Returns Y, increasing downward.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Whether a selected color was found](/images/tutorials/Cam/spike-block/advanced/main1/found.png) | Whether a selected color was found | `true / false`<br>• `true`{.code-green} means found; `false`{.code-green} means not found.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Grid position of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/cell.png) | Grid position of a selected color | `X: 0 ~ 16 / Y: 0 ~ 12`<br>• Returns `(X, Y)`{.code-green} on a `16 × 12`{.code-green} grid rather than pixels; `(0, 0)`{.code-green} means not found.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Blob count of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/count.png) | Blob count of a selected color | `0 ~ 7`<br>• Returns the blob count for that target color, not the total number of colors found.<br>• Input range: `1 ~ 14`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Colors found](/images/tutorials/Cam/spike-block/advanced/main1/colors_found.png) | Colors found | `0 ~ 15`<br>• Returns the reported total colors found, distinct from this mode’s position capacity. |
| ![Maximum readable colors](/images/tutorials/Cam/spike-block/advanced/main1/max_color.png) | Maximum readable colors | `14`<br>• This mode provides data for up to `14`{.code-green} colors; use it as the read-loop limit. |

</CamModeSection>

<CamModeSection mode="12" title="Color tracking - ② Multiple colors">

`Library provides: 7 color positions and counts`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
- Counts use sensor communication mode `6`. Request them only when needed because switching read modes adds a delay.
:::

**Mode ID setup**

Set the `set up` Mode ID to `12`{.code-green} and select the same Mode ID `12`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 12](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_12.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Position X/Y of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/xy.png) | Position X/Y of a selected color | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns `(X, Y)`{.code-green} in pixels.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![X of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/x.png) | X of a selected color | `0 ~ 159`<br>• Returns X, increasing rightward.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Y of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/y.png) | Y of a selected color | `0 ~ 119`<br>• Returns Y, increasing downward.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Whether a selected color was found](/images/tutorials/Cam/spike-block/advanced/main1/found.png) | Whether a selected color was found | `true / false`<br>• `true`{.code-green} means found; `false`{.code-green} means not found.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Blob count of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/count.png) | Blob count of a selected color | `0 ~ 15`<br>• Returns the blob count for that target color, not the total number of colors found.<br>• Input range: `1 ~ 7`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Colors found](/images/tutorials/Cam/spike-block/advanced/main1/colors_found.png) | Colors found | `0 ~ 15`<br>• Returns the reported total colors found, distinct from this mode’s position capacity. |
| ![Maximum readable colors](/images/tutorials/Cam/spike-block/advanced/main1/max_color.png) | Maximum readable colors | `7`<br>• This mode provides data for up to `7`{.code-green} colors; use it as the read-loop limit. |

</CamModeSection>

<CamModeSection mode="13" title="Color tracking - ③ Standard">

`Library provides: 4 color positions and counts, area`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
:::

**Mode ID setup**

Set the `set up` Mode ID to `13`{.code-green} and select the same Mode ID `13`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 13](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_13.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Position X/Y of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/xy.png) | Position X/Y of a selected color | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns `(X, Y)`{.code-green} in pixels.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![X of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/x.png) | X of a selected color | `0 ~ 159`<br>• Returns X, increasing rightward.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Y of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/y.png) | Y of a selected color | `0 ~ 119`<br>• Returns Y, increasing downward.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Whether a selected color was found](/images/tutorials/Cam/spike-block/advanced/main1/found.png) | Whether a selected color was found | `true / false`<br>• `true`{.code-green} means found; `false`{.code-green} means not found.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Blob count of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/count.png) | Blob count of a selected color | `0 ~ 15`<br>• Returns the blob count for that target color, not the total number of colors found.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Area of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/area.png) | Area of a selected color | `0 ~ 100`<br>• Returns blob area as a percentage of the image; `0`{.code-green} means not found.<br>• Input range: `1 ~ 4`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Maximum readable colors](/images/tutorials/Cam/spike-block/advanced/main1/max_color.png) | Maximum readable colors | `4`<br>• This mode provides data for up to `4`{.code-green} colors; use it as the read-loop limit. |

</CamModeSection>

<CamModeSection mode="14" title="Color tracking - ④ Fine">

`Library provides: 2 color positions and counts, area and size`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
:::

**Mode ID setup**

Set the `set up` Mode ID to `14`{.code-green} and select the same Mode ID `14`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 14](/images/tutorials/Cam/spike-block/advanced/setup/1/setup_14.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Position X/Y of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/xy.png) | Position X/Y of a selected color | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns `(X, Y)`{.code-green} in pixels.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![X of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/x.png) | X of a selected color | `0 ~ 159`<br>• Returns X, increasing rightward.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Y of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/y.png) | Y of a selected color | `0 ~ 119`<br>• Returns Y, increasing downward.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Whether a selected color was found](/images/tutorials/Cam/spike-block/advanced/main1/found.png) | Whether a selected color was found | `true / false`<br>• `true`{.code-green} means found; `false`{.code-green} means not found.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Width/height of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/size.png) | Width/height of a selected color | `W: 0 ~ 160 / H: 0 ~ 120`<br>• Returns `(W, H)`{.code-green} in pixels.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Blob count of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/count.png) | Blob count of a selected color | `0 ~ 15`<br>• Returns the blob count for that target color, not the total number of colors found.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Area of a selected color](/images/tutorials/Cam/spike-block/advanced/main1/area.png) | Area of a selected color | `0 ~ 100`<br>• Returns blob area as a percentage of the image; `0`{.code-green} means not found.<br>• Input range: `1 ~ 2`{.code-green}, selecting the color index. The pictured `1`{.code-green} selects color 1. |
| ![Colors found](/images/tutorials/Cam/spike-block/advanced/main1/colors_found.png) | Colors found | `0 ~ 16`<br>• Returns the reported total colors found, distinct from this mode’s position capacity. |
| ![Maximum readable colors](/images/tutorials/Cam/spike-block/advanced/main1/max_color.png) | Maximum readable colors | `2`<br>• This mode provides data for up to `2`{.code-green} colors; use it as the read-loop limit. |

</CamModeSection>

#### Mode 2 - Coordinate sampling

<CamModeSection mode="21" title="Coordinate sampling - ① Hue">

`Library provides: 14 points: hue`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

**Mode ID setup**

Set the `set up` Mode ID to `21`{.code-green} and select the same Mode ID `21`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 21](/images/tutorials/Cam/spike-block/advanced/setup/2/setup_21.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Hue of a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/hue.png) | Hue of a selected sampling point | `0 ~ 255`<br>• Returns the sampling point’s hue code; `0`{.code-green} can mean red.<br>• Input range: `1 ~ 14`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![HSV of a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/hsv.png) | HSV of a selected sampling point | `H: 0 ~ 255 / S: None / V: None`<br>• Returns `(H, S, V)`{.code-green}: hue, saturation and value. Components unavailable in this mode are `None`{.code-green}.<br>• Input range: `1 ~ 14`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![Color name at a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/color.png) | Color name at a selected sampling point | `str`<br>• Converts hue to one of: `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `white`, `black`.<br>• Input range: `1 ~ 14`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![Maximum readable sampling points](/images/tutorials/Cam/spike-block/advanced/main2/max_point.png) | Maximum readable sampling points | `14`<br>• This mode provides up to `14`{.code-green} sampling points. |

</CamModeSection>

<CamModeSection mode="22" title="Coordinate sampling - ② Hue and saturation">

`Library provides: 7 points: hue, saturation`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

**Mode ID setup**

Set the `set up` Mode ID to `22`{.code-green} and select the same Mode ID `22`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 22](/images/tutorials/Cam/spike-block/advanced/setup/2/setup_22.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Hue of a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/hue.png) | Hue of a selected sampling point | `0 ~ 255`<br>• Returns the sampling point’s hue code; `0`{.code-green} can mean red.<br>• Input range: `1 ~ 7`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![Saturation of a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/sat.png) | Saturation of a selected sampling point | `0 ~ 100`<br>• Returns saturation at the selected sampling point.<br>• Input range: `1 ~ 7`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![HSV of a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/hsv.png) | HSV of a selected sampling point | `H: 0 ~ 255 / S: 0 ~ 100 / V: None`<br>• Returns `(H, S, V)`{.code-green}: hue, saturation and value. Components unavailable in this mode are `None`{.code-green}.<br>• Input range: `1 ~ 7`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![Color name at a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/color.png) | Color name at a selected sampling point | `str`<br>• Converts hue to one of: `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `white`, `black`.<br>• Input range: `1 ~ 7`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![Maximum readable sampling points](/images/tutorials/Cam/spike-block/advanced/main2/max_point.png) | Maximum readable sampling points | `7`<br>• This mode provides up to `7`{.code-green} sampling points. |

</CamModeSection>

<CamModeSection mode="23" title="Coordinate sampling - ③ HSV">

`Library provides: 4 points: hue, saturation and value`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Configure sampling points on the camera first. Unset points return 0; hue 0 can also mean red, so it does not identify an unset point by itself.
:::

**Mode ID setup**

Set the `set up` Mode ID to `23`{.code-green} and select the same Mode ID `23`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 23](/images/tutorials/Cam/spike-block/advanced/setup/2/setup_23.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Hue of a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/hue.png) | Hue of a selected sampling point | `0 ~ 255`<br>• Returns the sampling point’s hue code; `0`{.code-green} can mean red.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![Saturation of a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/sat.png) | Saturation of a selected sampling point | `0 ~ 100`<br>• Returns saturation at the selected sampling point.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![Value of a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/val.png) | Value of a selected sampling point | `0 ~ 100`<br>• Returns value at the selected sampling point.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![HSV of a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/hsv.png) | HSV of a selected sampling point | `H: 0 ~ 255 / S: 0 ~ 100 / V: 0 ~ 100`<br>• Returns `(H, S, V)`{.code-green}: hue, saturation and value. Components unavailable in this mode are `None`{.code-green}.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![Color name at a selected sampling point](/images/tutorials/Cam/spike-block/advanced/main2/color.png) | Color name at a selected sampling point | `str`<br>• Converts hue to one of: `red`, `orange`, `yellow`, `green`, `cyan`, `blue`, `purple`, `white`, `black`.<br>• Input range: `1 ~ 4`{.code-green}, selecting the sampling-point index. The pictured `1`{.code-green} selects sampling point S1. |
| ![Maximum readable sampling points](/images/tutorials/Cam/spike-block/advanced/main2/max_point.png) | Maximum readable sampling points | `4`<br>• This mode provides up to `4`{.code-green} sampling points. |

</CamModeSection>

#### Mode 3 - Color order

<CamModeSection mode="30" title="Color order">

`Library provides: the first 13 hues and total block count`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Blocks are ordered left to right. Total count can exceed 13, but the list contains at most 13 blocks. Check its length before indexing. Hue 0 can mean red.
:::

**Mode ID setup**

Set the `set up` Mode ID to `30`{.code-green} and select the same Mode ID `30`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 30](/images/tutorials/Cam/spike-block/advanced/setup/3/setup_30.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Hue list from left to right](/images/tutorials/Cam/spike-block/advanced/main3/order.png) | Hue list from left to right | `list[int]`<br>• Returns hues ordered left to right, up to 13 blocks; each hue is `0 ~ 255`{.code-green}.<br>• The list length is the number of entries provided; hue 0 can mean red. |
| ![Total color blocks](/images/tutorials/Cam/spike-block/advanced/main3/total.png) | Total color blocks | `0 ~ 18`<br>• Returns the total blocks in view, which can exceed the list capacity of 13. |

</CamModeSection>

#### Mode 4 - Line following

<CamModeSection mode="41" title="Line following - ① Black">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Last lost side: 0 on line, 1 left, 2 right.
:::

**Mode ID setup**

Set the `set up` Mode ID to `41`{.code-green} and select the same Mode ID `41`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 41](/images/tutorials/Cam/spike-block/advanced/setup/4/setup_41.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Near offset](/images/tutorials/Cam/spike-block/advanced/main4/near.png) | Near offset | `-100 ~ 100`<br>• Returns near offset. |
| ![Middle offset](/images/tutorials/Cam/spike-block/advanced/main4/mid.png) | Middle offset | `-100 ~ 100`<br>• Returns middle offset. |
| ![Far offset](/images/tutorials/Cam/spike-block/advanced/main4/far.png) | Far offset | `-100 ~ 100`<br>• Returns far offset. |
| ![Line angle](/images/tutorials/Cam/spike-block/advanced/main4/angle.png) | Line angle | `-90 ~ 90`<br>• Returns line angle. Unit: degrees. |
| ![Near line width](/images/tutorials/Cam/spike-block/advanced/main4/width.png) | Near line width | `0 ~ 100`<br>• Returns near line width. Unit: percent. |
| ![Line-found flags](/images/tutorials/Cam/spike-block/advanced/main4/flags.png) | Line-found flags | `0 ~ 7`<br>• Returns line-found flags. |
| ![Junction type](/images/tutorials/Cam/spike-block/advanced/main4/junction.png) | Junction type | `0 ~ 5`<br>• Returns junction type. |
| ![Junction distance](/images/tutorials/Cam/spike-block/advanced/main4/junction_dist.png) | Junction distance | `0 ~ 100`<br>• Returns junction distance. Unit: percent. |
| ![Near left/right edges](/images/tutorials/Cam/spike-block/advanced/main4/edges.png) | Near left/right edges | `left: -100 ~ 100 / right: -100 ~ 100`<br>• Returns `(left, right)`{.code-green}; negative is left of the image center and positive is right. |
| ![Far line width](/images/tutorials/Cam/spike-block/advanced/main4/far_width.png) | Far line width | `0 ~ 100`<br>• Returns far line width. Unit: percent. |
| ![Marker color and count](/images/tutorials/Cam/spike-block/advanced/main4/marker.png) | Marker color and count | `color: 0 ~ 8 / count: 0 ~ 99`<br>• Returns `(color, count)`{.code-green}, not a scalar. |
| ![Last lost side](/images/tutorials/Cam/spike-block/advanced/main4/lost.png) | Last lost side | `0 ~ 2`<br>• Returns last lost side. |
| ![Read all line data at once](/images/tutorials/Cam/spike-block/advanced/main4/line_all.png) | Read all line data at once | `tuple[14]`<br>• Returns, in order: near offset, middle offset, far offset, angle, near width, flags, junction, junction distance, left edge, right edge, far width, marker color, marker count, lost side.<br>• Each component has the range shown above. Use this when several line values are needed in one pass. |

</CamModeSection>

<CamModeSection mode="42" title="Line following - ② White">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Last lost side: 0 on line, 1 left, 2 right.
:::

**Mode ID setup**

Set the `set up` Mode ID to `42`{.code-green} and select the same Mode ID `42`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 42](/images/tutorials/Cam/spike-block/advanced/setup/4/setup_42.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Near offset](/images/tutorials/Cam/spike-block/advanced/main4/near.png) | Near offset | `-100 ~ 100`<br>• Returns near offset. |
| ![Middle offset](/images/tutorials/Cam/spike-block/advanced/main4/mid.png) | Middle offset | `-100 ~ 100`<br>• Returns middle offset. |
| ![Far offset](/images/tutorials/Cam/spike-block/advanced/main4/far.png) | Far offset | `-100 ~ 100`<br>• Returns far offset. |
| ![Line angle](/images/tutorials/Cam/spike-block/advanced/main4/angle.png) | Line angle | `-90 ~ 90`<br>• Returns line angle. Unit: degrees. |
| ![Near line width](/images/tutorials/Cam/spike-block/advanced/main4/width.png) | Near line width | `0 ~ 100`<br>• Returns near line width. Unit: percent. |
| ![Line-found flags](/images/tutorials/Cam/spike-block/advanced/main4/flags.png) | Line-found flags | `0 ~ 7`<br>• Returns line-found flags. |
| ![Junction type](/images/tutorials/Cam/spike-block/advanced/main4/junction.png) | Junction type | `0 ~ 5`<br>• Returns junction type. |
| ![Junction distance](/images/tutorials/Cam/spike-block/advanced/main4/junction_dist.png) | Junction distance | `0 ~ 100`<br>• Returns junction distance. Unit: percent. |
| ![Near left/right edges](/images/tutorials/Cam/spike-block/advanced/main4/edges.png) | Near left/right edges | `left: -100 ~ 100 / right: -100 ~ 100`<br>• Returns `(left, right)`{.code-green}; negative is left of the image center and positive is right. |
| ![Far line width](/images/tutorials/Cam/spike-block/advanced/main4/far_width.png) | Far line width | `0 ~ 100`<br>• Returns far line width. Unit: percent. |
| ![Marker color and count](/images/tutorials/Cam/spike-block/advanced/main4/marker.png) | Marker color and count | `color: 0 ~ 8 / count: 0 ~ 99`<br>• Returns `(color, count)`{.code-green}, not a scalar. |
| ![Last lost side](/images/tutorials/Cam/spike-block/advanced/main4/lost.png) | Last lost side | `0 ~ 2`<br>• Returns last lost side. |
| ![Read all line data at once](/images/tutorials/Cam/spike-block/advanced/main4/line_all.png) | Read all line data at once | `tuple[14]`<br>• Returns, in order: near offset, middle offset, far offset, angle, near width, flags, junction, junction distance, left edge, right edge, far width, marker color, marker count, lost side.<br>• Each component has the range shown above. Use this when several line values are needed in one pass. |

</CamModeSection>

<CamModeSection mode="43" title="Line following - ③ Colored">

`Library provides: 14 line-following values`

::: info ℹ️ Reading notes
- Main data uses sensor communication mode `9`.
- Offsets are negative to the left and positive to the right; angles are signed. Junction: 0 none, 1 cross, 2 T, 3 left, 4 right, 5 end. Flags = near 1 + middle 2 + far 4.
- Teach the line color as target color 1 first.
- Last lost side: 0 on line, 1 left, 2 right.
:::

**Mode ID setup**

Set the `set up` Mode ID to `43`{.code-green} and select the same Mode ID `43`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 43](/images/tutorials/Cam/spike-block/advanced/setup/4/setup_43.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Near offset](/images/tutorials/Cam/spike-block/advanced/main4/near.png) | Near offset | `-100 ~ 100`<br>• Returns near offset. |
| ![Middle offset](/images/tutorials/Cam/spike-block/advanced/main4/mid.png) | Middle offset | `-100 ~ 100`<br>• Returns middle offset. |
| ![Far offset](/images/tutorials/Cam/spike-block/advanced/main4/far.png) | Far offset | `-100 ~ 100`<br>• Returns far offset. |
| ![Line angle](/images/tutorials/Cam/spike-block/advanced/main4/angle.png) | Line angle | `-90 ~ 90`<br>• Returns line angle. Unit: degrees. |
| ![Near line width](/images/tutorials/Cam/spike-block/advanced/main4/width.png) | Near line width | `0 ~ 100`<br>• Returns near line width. Unit: percent. |
| ![Line-found flags](/images/tutorials/Cam/spike-block/advanced/main4/flags.png) | Line-found flags | `0 ~ 7`<br>• Returns line-found flags. |
| ![Junction type](/images/tutorials/Cam/spike-block/advanced/main4/junction.png) | Junction type | `0 ~ 5`<br>• Returns junction type. |
| ![Junction distance](/images/tutorials/Cam/spike-block/advanced/main4/junction_dist.png) | Junction distance | `0 ~ 100`<br>• Returns junction distance. Unit: percent. |
| ![Near left/right edges](/images/tutorials/Cam/spike-block/advanced/main4/edges.png) | Near left/right edges | `left: -100 ~ 100 / right: -100 ~ 100`<br>• Returns `(left, right)`{.code-green}; negative is left of the image center and positive is right. |
| ![Far line width](/images/tutorials/Cam/spike-block/advanced/main4/far_width.png) | Far line width | `0 ~ 100`<br>• Returns far line width. Unit: percent. |
| ![Marker color and count](/images/tutorials/Cam/spike-block/advanced/main4/marker.png) | Marker color and count | `color: 0 ~ 8 / count: 0 ~ 99`<br>• Returns `(color, count)`{.code-green}, not a scalar. |
| ![Last lost side](/images/tutorials/Cam/spike-block/advanced/main4/lost.png) | Last lost side | `0 ~ 2`<br>• Returns last lost side. |
| ![Read all line data at once](/images/tutorials/Cam/spike-block/advanced/main4/line_all.png) | Read all line data at once | `tuple[14]`<br>• Returns, in order: near offset, middle offset, far offset, angle, near width, flags, junction, junction distance, left edge, right edge, far width, marker color, marker count, lost side.<br>• Each component has the range shown above. Use this when several line values are needed in one pass. |

</CamModeSection>

#### Mode 5 - Object detection

<CamModeSection mode="51" title="Object detection - ① Object list">

`Library provides: the first 4 objects and total count`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
- Only target colors 1 ~ 8 are used. Objects are sorted by decreasing area. Code = color ID × 10 + shape code; 0 means no object. Check for an object before using its data.
- Shape codes 0 ~ 9: other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star, trapezoid.
:::

**Mode ID setup**

Set the `set up` Mode ID to `51`{.code-green} and select the same Mode ID `51`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 51](/images/tutorials/Cam/spike-block/advanced/setup/5/setup_51.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Maximum readable objects](/images/tutorials/Cam/spike-block/advanced/main5/max_object.png) | Maximum readable objects | `4`<br>• This mode provides the first `4`{.code-green} objects, sorted by decreasing area. |
| ![Object count](/images/tutorials/Cam/spike-block/advanced/main5/object_count.png) | Object count | `0 ~ 8`<br>• Returns the total objects in view, which can exceed the readable object limit. |
| ![Code of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object.png) | Code of a selected object | `0, 10 ~ 89`<br>• Object code = color ID × 10 + shape code. For example, `13`{.code-green} is a target-color-1 triangle; `0`{.code-green} means no object.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Whether a selected object exists](/images/tutorials/Cam/spike-block/advanced/main5/object_found.png) | Whether a selected object exists | `true / false`<br>• `true`{.code-green} means the object exists; `false`{.code-green} means absent. Check this before using shape and position.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Color ID of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object_color.png) | Color ID of a selected object | `0 ~ 8`<br>• Returns the target-color index; `0`{.code-green} means no object.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Shape code of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object_shape.png) | Shape code of a selected object | `0 ~ 9`<br>• Returns the shape code. No object can also yield 0, so check object presence first.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Position X/Y of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object_xy.png) | Position X/Y of a selected object | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns centroid `(X, Y)`{.code-green} in pixels; `(0, 0)`{.code-green} means no object.<br>• Input range: `1 ~ 4`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |

</CamModeSection>

<CamModeSection mode="52" title="Object detection - ② Object details">

`Library provides: the first 2 objects: position, size and area`

::: info ℹ️ Reading notes
- Positions are in pixels. X increases rightward and Y downward; `(0, 0)` means no target.
- Main data uses sensor communication mode `9`.
- Only target colors 1 ~ 8 are used. Objects are sorted by decreasing area. Code = color ID × 10 + shape code; 0 means no object. Check for an object before using its data.
- Shape codes 0 ~ 9: other, circle, ellipse, triangle, square, rectangle, pentagon, hexagon, star, trapezoid.
:::

**Mode ID setup**

Set the `set up` Mode ID to `52`{.code-green} and select the same Mode ID `52`{.code-green} on the camera. Match the port to the wiring and the object name to subsequent blocks.

![Mode ID setup 52](/images/tutorials/Cam/spike-block/advanced/setup/5/setup_52.png){style = "display: block; width: 400px; max-width: 100%; height: auto; margin: 10px auto;"}

**Submode function reference**

| Programming Block | Function | Description |
| --- | --- | --- |
| ![Maximum readable objects](/images/tutorials/Cam/spike-block/advanced/main5/max_object.png) | Maximum readable objects | `2`<br>• This mode provides the first `2`{.code-green} objects, sorted by decreasing area. |
| ![Code of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object.png) | Code of a selected object | `0, 10 ~ 89`<br>• Object code = color ID × 10 + shape code. For example, `13`{.code-green} is a target-color-1 triangle; `0`{.code-green} means no object.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Whether a selected object exists](/images/tutorials/Cam/spike-block/advanced/main5/object_found.png) | Whether a selected object exists | `true / false`<br>• `true`{.code-green} means the object exists; `false`{.code-green} means absent. Check this before using shape and position.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Color ID of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object_color.png) | Color ID of a selected object | `0 ~ 8`<br>• Returns the target-color index; `0`{.code-green} means no object.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Shape code of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object_shape.png) | Shape code of a selected object | `0 ~ 9`<br>• Returns the shape code. No object can also yield 0, so check object presence first.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Position X/Y of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object_xy.png) | Position X/Y of a selected object | `X: 0 ~ 159 / Y: 0 ~ 119`<br>• Returns centroid `(X, Y)`{.code-green} in pixels; `(0, 0)`{.code-green} means no object.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Width/height of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object_size.png) | Width/height of a selected object | `W: 0 ~ 160 / H: 0 ~ 120`<br>• Returns bounding-box `(W, H)`{.code-green} in pixels.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |
| ![Area of a selected object](/images/tutorials/Cam/spike-block/advanced/main5/object_area.png) | Area of a selected object | `0 ~ 100`<br>• Returns object area as a percentage of the image.<br>• Input range: `1 ~ 2`{.code-green}, selecting the object index. The pictured `1`{.code-green} selects object 1. |

</CamModeSection>

</CamModeAccordion>

## 04 / 【Lego】 Lau Xiao demonstration videos

<CamDemoVideos />

[Back to the home page to choose another tutorial](/en/)
