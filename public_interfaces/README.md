# 📡 Public Interfaces: ROS 2 Custom Messages & Services

This directory contains the public definitions for the custom ROS 2 messages (`.msg`) and services (`.srv`) utilized within the Green Automated Platform (GAP) ecosystem.

These files serve as the architectural contract between the various nodes in our asynchronous ROS 2 environment, bridging the gap between Edge AI perception (Hailo-8), the central Brain Node, and the flight control actuation (MicroXRCE-DDS to Pixhawk 6C).

> ⚠️ **Proprietary Notice:** These definitions represent the public interfaces of our system. The underlying core logic, specifically the Python scripts and C++ nodes that populate these messages (e.g., the proprietary `hailo_target_detector.py` and the Zero-Trust Security handshake mechanisms), are maintained in Corax CoLAB's private enterprise repository to protect our intellectual property.

## Contents

### Messages (`/msg`)
*   **`AIInferenceResult.msg`**: Defines the structured output from our Hailo-8 Edge AI pipeline, including biological classification IDs, confidence scores, and bounding boxes.

### Services (`/srv`)
*   **`PayloadDrop.srv`**: Defines the request and response structure for actuating the ecological payload release mechanism, translating high-level target coordinates into actionable actuator commands.
