# Hardware Integration Guide: Raspberry Pi 5 to Holybro Pixhawk 6C

This document provides a highly technical overview of the physical and logical integration between the edge-compute node (Raspberry Pi 5) and the flight controller (Holybro Pixhawk 6C) within the GAP ecosystem.

## Physical Interface & Serial Communication

The primary communication bridge between the ROS 2 node running on the RPi5 and the PX4 Autopilot on the Pixhawk 6C is a high-speed UART connection via MicroXRCE-DDS.

### UART Pinout Mapping

Connections must be made crossing the TX and RX lines to establish the serial link. We typically utilize the `TELEM2` port on the Pixhawk.

| Holybro Pixhawk 6C (TELEM2) | Description | Raspberry Pi 5 (GPIO Header) | Description |
| :--- | :--- | :--- | :--- |
| Pin 1 (VCC) | 5V Output | **DO NOT CONNECT** | *See Power Requirements below* |
| Pin 2 (TX) | Transmit | Pin 10 (GPIO 15 - RXD) | Receive |
| Pin 3 (RX) | Receive | Pin 8 (GPIO 14 - TXD) | Transmit |
| Pin 4 (CTS) | Clear to Send | *Optional / NC* | |
| Pin 5 (RTS) | Request to Send | *Optional / NC* | |
| Pin 6 (GND) | Ground | Pin 6 (Ground) | Common Ground |

*Note: The grounds must be tied together to ensure a common reference voltage for the serial lines.*

## ⚠️ Critical Power Requirements

**DO NOT power the Raspberry Pi 5 directly from the Pixhawk TELEM2 VCC line.**

The RPi5 running intensive Hailo-8L Edge AI inference pipelines experiences significant transient power spikes. Relying on the flight controller's internal BEC or standard telemetry power will result in voltage drops (brownouts).

A brownout during flight can cause the edge node to reboot, severing the ROS 2 / MicroXRCE-DDS link and potentially triggering an autonomous failsafe or loss of high-level control.

### Dedicated 5V/5A BEC Requirement

You **MUST** use a dedicated, high-quality 5V/5A Battery Eliminator Circuit (BEC) tied directly to the main flight battery to power the Raspberry Pi 5 via its USB-C port or 5V GPIO pins.

*   **Recommended Specs:** 5V output, minimum 5A continuous rating (peak higher).
*   **Isolation:** This isolates the noisy, high-draw compute load from the sensitive flight controller logic.

## Logical Configuration

1.  **Pixhawk (PX4):** Ensure the `TELEM2` port is configured for the `uxrce_dds_client` (MAV_0_CONFIG or similar depending on PX4 version and specific port usage). Set the baud rate to a high value (e.g., `921600`).
2.  **Raspberry Pi (ROS 2):** Ensure the `MicroXRCEAgent` is running and bound to the corresponding serial device (`/dev/serial0` or `/dev/ttyAMA0`), matching the baud rate configured on the flight controller.

```bash
# Example agent startup on RPi5
MicroXRCEAgent serial --dev /dev/ttyAMA0 -b 921600
```
