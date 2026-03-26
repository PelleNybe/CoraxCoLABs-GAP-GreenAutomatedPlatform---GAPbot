# GAPbot - High-Level Bill of Materials (BOM)

GAPbot is our ground-based autonomous hexapod, designed for complex, unstructured terrains where wheeled robots fail. Below is the high-level Bill of Materials.

## Compute & AI
*   **Main Brain:** Raspberry Pi 5 (16GB RAM)
    *   *Purpose:* Runs the core ROS 2 stack, mission control logic, and general computing.
*   **AI Accelerator:** Hailo-8L NPU (via PCIe)
    *   *Purpose:* Hardware-accelerated inference for real-time vision processing (YOLOv8) and environmental analysis.
*   **Storage:** NVMe SSD (via PCIe/USB 3.1)
    *   *Purpose:* High-speed data logging, database storage, and fast OS operations.

## Navigation & Sensors
*   **Vision:** High-Definition RGB/NIR Camera Array
    *   *Purpose:* Visual SLAM, object detection, and environmental mapping.
*   **Spatial Awareness:** 2D/3D LiDAR
    *   *Purpose:* Real-time point cloud generation for obstacle avoidance and precise mapping.
*   **Positioning:** RTK-GPS Module
    *   *Purpose:* Centimeter-level absolute positioning in outdoor environments.

## Actuation & Power
*   **Servo Controllers:** PCA9685 I2C PWM Drivers
    *   *Purpose:* Precise control of the 18 high-torque servos.
*   **Motors:** 18x High-Torque Servos
    *   *Purpose:* Actuation of the hexapod legs for complex kinematics and gait control.
*   **Power System:** High-Capacity LiPo/Li-Ion Battery Pack with Smart BMS
    *   *Purpose:* Sustained power delivery with intelligent monitoring and safety features.

## Communication
*   **Mesh Networking:** B.A.T.M.A.N.-adv Mesh Node
    *   *Purpose:* Decentralized communication with the GAPdrone and other ecosystem agents.
