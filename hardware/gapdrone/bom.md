# GAPdrone - High-Level Bill of Materials (BOM)

GAPdrone is our airborne Edge AI unit, engineered for unstructured environments, ecological intervention, and swarm coordination. Below is the high-level Bill of Materials.

## Flight Control & Navigation
*   **Flight Controller (FCU):** Pixhawk 6C
    *   *Purpose:* Real-time, low-latency control of flight dynamics, motor mixing, and sensor fusion. Runs the core PX4 Autopilot stack.
*   **Positioning:** Dual RTK-GPS Modules
    *   *Purpose:* Centimeter-level absolute positioning and robust heading estimation in challenging outdoor environments.
*   **Altitude Sensing:** Precision Barometer & Laser Altimeter (LiDAR Lite v3 or similar)
    *   *Purpose:* Accurate terrain following and altitude maintenance over irregular canopies or topography.

## Compute & Edge AI
*   **Companion Computer:** Raspberry Pi 5 (or similar high-performance SBC)
    *   *Purpose:* Handles high-level mission planning, ROS 2 Offboard Control, and acts as the bridge between the flight controller and the mesh network.
*   **AI Accelerator:** Hailo-8L NPU (via PCIe/M.2)
    *   *Purpose:* Hardware-accelerated inference for real-time vision processing (e.g., YOLOv8 for object detection, NDVI analysis) directly on the edge, without cloud dependency.

## Payload & Sensors
*   **Primary Vision:** Multi-Spectral Camera Array (RGB + NIR)
    *   *Purpose:* Capturing high-resolution imagery for real-time ecological analysis, anomaly detection, and mapping.
*   **Spatial Awareness:** 3D LiDAR (e.g., Ouster or Livox)
    *   *Purpose:* High-density point cloud generation for obstacle avoidance, structural scanning, and LiDAR-SLAM in GPS-denied or complex environments.

## Power & Propulsion
*   **Propulsion System:** High-Efficiency Brushless DC Motors (BLDC) & ESCs
    *   *Purpose:* Optimized for heavy-lift capability and extended flight times.
*   **Power System:** Smart High-Capacity LiPo Battery Pack
    *   *Purpose:* Intelligent power management, cell balancing, and telemetry reporting to the flight controller.

## Communication
*   **Mesh Networking:** B.A.T.M.A.N.-adv Mesh Node (e.g., dedicated 5.8GHz or 900MHz radio)
    *   *Purpose:* Decentralized, robust communication with the GAPbot, other drones, and the Mission Control center, facilitating swarm coordination.
