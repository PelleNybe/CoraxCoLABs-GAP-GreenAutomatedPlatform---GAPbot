# 🔌 Hardware Integration & Specs

This document outlines the critical hardware integration parameters for the GAPdrone, specifically focusing on the communication bridge between the Companion Computer and the Flight Controller, as well as the power management required for stable Edge AI inference.

## 🧠 Companion Computer to Flight Controller Interface

The core of our autonomous architecture relies on high-speed, reliable communication between the Raspberry Pi 5 (running ROS 2 and Edge AI) and the Holybro Pixhawk 6C.

### UART/I2C Mapping

We utilize **MicroXRCE-DDS** over a dedicated UART connection, bypassing legacy MAVProxy setups for reduced latency and increased throughput.

*   **Flight Controller Port:** `TELEM2` on the Holybro Pixhawk 6C.
*   **Companion Computer Port:** GPIO UART on the Raspberry Pi 5.

| Pixhawk 6C (TELEM2) | Raspberry Pi 5 (GPIO) | Function |
| :--- | :--- | :--- |
| Pin 2 (TX) | Pin 10 (RXD - GPIO 15) | Data from FC to RPi |
| Pin 3 (RX) | Pin 8 (TXD - GPIO 14) | Data from RPi to FC |
| Pin 6 (GND) | Pin 6 (GND) | Common Ground Reference |

> **Critical Note:** Ensure crossing of TX and RX lines (TX -> RX, RX -> TX). Do **NOT** connect the VCC (5V) line from the TELEM2 port to the Raspberry Pi, as both devices are powered independently.

## ⚡ Power Management & Edge AI

Running complex YOLOv8 models and biological classification pipelines via the Hailo-8 NPU requires strict power management to prevent system brownouts during intensive inference tasks.

### Hailo-8 NPU Power Requirements

The Raspberry Pi 5 must provide sufficient current to the Hailo-8 NPU, which is typically connected via the M.2 HAT+ interface.

1.  **Dedicated Power Supply:** The Raspberry Pi 5 **MUST** be powered by a dedicated, high-quality **5V/5A BEC** (Battery Eliminator Circuit) directly from the main flight battery. Standard 3A supplies will result in instability during AI inference spikes.
2.  **Configuration:** You must explicitly enable maximum USB current in the Raspberry Pi configuration to ensure the Hailo-8 receives adequate power under load.

Edit `/boot/firmware/config.txt` and append:
```ini
# Critical: Enable max current for Hailo-8 NPU inference
usb_max_current_enable=1
```

### Actuator Power Routing

The servos responsible for the ecological payload release mechanism are controlled via the Pixhawk 6C (triggered by `VEHICLE_CMD_DO_SET_ACTUATOR` from ROS 2). These servos must be powered by a separate, dedicated BEC connected to the Pixhawk's servo rail, isolated from the primary flight control electronics.
