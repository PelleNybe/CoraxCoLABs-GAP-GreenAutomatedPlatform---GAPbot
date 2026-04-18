# 📋 GAPdrone Bill of Materials (BOM)

This document outlines the core hardware components utilized in the construction of the GAPdrone. This represents our enterprise-grade baseline for deploying Edge AI in unstructured environments.

## Core Flight Architecture

| Component | Manufacturer | Description | Purpose |
| :--- | :--- | :--- | :--- |
| **X650 Frame Kit** | Holybro | 650mm Carbon Fiber Quadcopter Frame | Robust, industrial-grade airframe capable of supporting heavy sensor payloads and enduring harsh environments. |
| **Pixhawk 6C** | Holybro | Flight Controller (STM32H753) | High-performance, reliable flight control executing PX4 firmware. Acts as the primary actuator interface. |
| **PM02D Power Module** | Holybro | Digital Power Module | Provides clean, monitored power to the Pixhawk 6C and accurate battery telemetry. |
| **M8N GPS** | Holybro | GPS/Compass Module | Primary navigation sensor for absolute global positioning. |
| **Motors & ESCs** | Holybro (or equiv.) | 4114 KV400 Motors + 40A ESCs | High-torque propulsion system optimized for the X650 frame. |

## Edge AI & Compute Payload

| Component | Manufacturer | Description | Purpose |
| :--- | :--- | :--- | :--- |
| **Raspberry Pi 5** | Raspberry Pi | 8GB/16GB RAM SBC | The "Brain Node". Runs the ROS 2 middleware, MicroXRCE-DDS agent, and orchestrates the AI pipelines. |
| **Hailo-8 M.2 Module** | Hailo AI | 26 TOPS Edge AI Accelerator | Dedicated Neural Processing Unit for real-time YOLOv8 object detection and biological classification. |
| **M.2 HAT+** | Raspberry Pi | PCIe to M.2 Adapter | Interfaces the Hailo-8 NPU with the Raspberry Pi 5 via the PCIe bus for high-bandwidth data transfer. |
| **5V/5A Dedicated BEC** | Various (e.g., Matek) | Voltage Regulator | **Critical:** Supplies stable, high-current power specifically for the Raspberry Pi 5 and the Hailo-8 NPU, isolated from flight control power. |

## Sensor Suite (Application Dependent)

*Note: Specific sensor configurations vary based on the ecological mission profile (e.g., LiDAR mapping vs. multi-spectral forestry analysis).*

| Component | Description | Purpose |
| :--- | :--- | :--- |
| **OAK-D Pro (or similar)** | Depth Camera / RGB | Primary visual sensor for local object avoidance and RGB input for the Hailo-8 classification pipeline. |
| **Mid-360 LiDAR** | Livox | 3D LiDAR Scanner | Generates high-resolution point clouds for precise, GPS-denied SLAM navigation and dense forestry mapping. |
| **Custom Actuator Servos** | High-Torque Servos | Driven by the Pixhawk 6C (`VEHICLE_CMD_DO_SET_ACTUATOR`) to trigger the ecological payload release mechanism. |
