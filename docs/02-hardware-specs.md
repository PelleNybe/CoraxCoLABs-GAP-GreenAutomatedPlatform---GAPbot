# ⚙️ Hardware Specifications: GAPbot

<div align="center">
  <img src="../assets/gap-logo.jpg" alt="GAP Logo" width="150" style="border-radius: 15px;" />
</div>

The GAPbot is a six-legged (hexapod) robotic platform designed for complex, unstructured terrains. The hardware stack is chosen for maximum throughput, edge AI capabilities, and precise physical actuation.

<div align="center">
  <img src="../assets/hero-gapbot.jpg" alt="GAPbot Hardware" width="80%" style="border-radius: 10px; margin: 20px 0;" />
</div>

## Core Compute Node
* **Processor:** Raspberry Pi 5 (16 GiB RAM)
* **Power & Energy Management:** Features "Sun Bathing Mode", a unique battery-saving mode where GAPbot shuts down its motors and enters MPPT solar charging, but keeps the NPU awake to function as a passive, listening sensor node.
* **Storage:** 1TB NVMe SSD connected via PCIe / USB 3.1 for high-I/O database operations and fast boot times.
* **Cooling:** Active onboard fan management for sustained heavy processing loads.
* **Environment:** Runs headless (Ubuntu/Linux) managed via SSH and VNC.

## AI Acceleration
* **NPU:** Integrated Hailo-8 and Hailo-8L Neural Processing Units connected via PCIe.
* **Throughput & Efficiency:** Delivers **26 TOPS** of compute power for real-time inference (e.g., YOLOv8 object detection). Crucially, it operates at an exceptional **TOPS/Watt** efficiency ratio, providing desktop-class AI acceleration with minimal power draw, which is mandatory for sustained battery operation at the edge.
* **CPU Offloading:** Offloads perception entirely, reserving the CPU for complex neuro-symbolic reasoning and kinematic calculations.

## Kinematics & Actuation
* **Safety:** Complies with the EU Machinery Regulation with PL d-compatible E-stops for safe human-robot collaboration.
* **Servos:** 18 individual high-torque servos (3 per leg).
* **Control Interface:** Driven via I2C utilizing the PCA9685 PWM driver.
* **Locomotion:** Custom inverse and forward kinematics algorithms translate high-level directional commands into precise multi-leg gaits. Utilizes "Split-Belly Stability" to navigate unstructured and difficult terrain in biological environments.

## Sensory Input & Navigation
* **Vision:** High-resolution camera modules routed directly through the Hailo-8L.
* **Spatial Awareness:** Integration of Lidar for local obstacle avoidance and RTK-GPS for high-precision global positioning.
* **Telemetry:** I2C/SPI sensors (e.g., BMP280, ADS1115) for environmental monitoring.
