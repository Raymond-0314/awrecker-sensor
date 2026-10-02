## Your tutorial · SPIKE · SPIKE App

Learn to read, display and evaluate a distance value.

::: warning Demonstration guide
The product driver and API are not available yet. The sample below uses simulated readings; it does not communicate with a sensor. Product compatibility must be verified before use.
:::

## 01 / Prepare your environment

Prepare a SPIKE controller and the SPIKE App. Verify driver and firmware requirements before changing firmware.

1. Obtain the product wiring diagram and driver.
2. Confirm the port and measurement unit.
3. Begin with a single reading before adding a loop.

## 02 / Function concepts

| Concept | Demonstration function | Result |
| --- | --- | --- |
| Read a value | `read_demo_distance()` | Simulated distance in mm |
| Compare a threshold | `is_near(distance_mm, threshold_mm)` | Boolean result |
| Display feedback | `print(message)` | Console message |

These names belong to this example, not the product API. Replace the simulated reader with the official driver after confirmation.

<h2 id="example">03 / Example program</h2>

This is a conceptual block sequence. The official product extension and importable project will be added when available.

<div class="block-flow"><div>When program starts</div><div>Set threshold to 200 mm</div><div>Set simulated distance to 150 mm</div><div>If distance &lt; threshold</div><div>Display “Object nearby”</div></div>

## 04 / Try it yourself

Change the simulated distance from `150` to `300`. With a `200` mm threshold, the result changes to “Path clear”. A value exactly equal to `200` is also clear because the comparison uses `<`.

## Troubleshooting

| Situation | Check |
| --- | --- |
| No real readings | This demo uses simulation. Add the official driver first. |
| Cannot find a block | Product extensions are pending; this is a conceptual sequence. |
| Unexpected units | Confirm the driver returns mm before comparing values. |

[Return home and choose another path](/en/)
