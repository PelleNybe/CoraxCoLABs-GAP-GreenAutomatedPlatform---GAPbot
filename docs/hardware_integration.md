# Hardware Integration Guide: Raspberry Pi 5 to Holybro Pixhawk 6C

This document provides a highly technical overview of integrating the Raspberry Pi 5 (RPi5) companion computer with the Holybro Pixhawk 6C flight controller within the GAPdrone architecture.

## Logical Connection

The GAPdrone utilizes an Edge-First architecture where the Raspberry Pi 5 acts as the high-level brain. It runs ROS 2 and manages intensive Edge AI tasks using the Hailo-8 NPU.

Instead of legacy protocols like MAVProxy, we employ **MicroXRCE-DDS**. The MicroXRCE-DDS agent runs on the Raspberry Pi 5, communicating directly with the MicroXRCE-DDS client embedded within the Pixhawk 6C's PX4 Autopilot. This allows for seamless, low-latency publish/subscribe communication of RTPS/MAVLink messages over a serial connection.

## Physical UART Connection

The physical bridge between the RPi5 and the Pixhawk 6C is a serial UART connection.

We utilize the **TELEM2** port on the Pixhawk 6C, mapping its TX/RX pins directly to the dedicated UART TX/RX GPIO pins on the Raspberry Pi 5.

### Pinout Mapping

| Holybro Pixhawk 6C (TELEM2) | Function | Raspberry Pi 5 (GPIO) | Pin Number (RPi5) |
| :--- | :--- | :--- | :--- |
| Pin 2 | TX (Transmit) | RXD (Receive) | GPIO 15 (Pin 10) |
| Pin 3 | RX (Receive) | TXD (Transmit) | GPIO 14 (Pin 8) |
| Pin 6 | GND (Ground) | GND (Ground) | Pin 6 (or any Ground) |

*Note: Ensure cross-over connection (TX to RX, RX to TX).*

## Critical Power Requirements

The Raspberry Pi 5, especially when performing intensive real-time AI inference with the Hailo-8L NPU, draws significant current.

⚠️ **CRITICAL: You must use a dedicated 5V/5A Battery Eliminator Circuit (BEC).** ⚠️

Attempting to power the Raspberry Pi 5 directly from the Pixhawk's telemetry ports or a standard low-power BEC will result in voltage drops (brownouts) during peak AI workloads, causing sudden reboots of the companion computer and potential loss of drone control.

### Raspberry Pi 5 Configuration

To ensure the RPi5 can deliver maximum power to connected USB peripherals (like the Hailo-8 NPU module if connected via USB/M.2 HAT), you must explicitly enable maximum USB current in the boot configuration.

1. Open `/boot/firmware/config.txt` (or `/boot/config.txt` depending on OS version).
2. Add the following line:
   ```ini
   usb_max_current_enable=1
   ```
3. Reboot the Raspberry Pi 5.

---
*For further information, please consult the Corax CoLAB team or review the component BOMs in `/hardware/`.*
