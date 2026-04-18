# 🧠 GAPdrone Edge AI Pipeline

> ⚠️ **Proprietary Software Notice**
>
> The contents of this module represent the core intellectual property of Corax CoLAB. The actual inference pipelines, customized YOLO model weights, and the low-level Hailo-8 integration logic are maintained in our private enterprise repository.

This module is responsible for the real-time processing of high-bandwidth sensor data (RGB/LiDAR) through the Hailo-8 NPU to execute biological classification and target detection.

## Architecture Interface
The AI pipeline consumes raw sensor streams and publishes standardized `AIInferenceResult.msg` formats to the asynchronous ROS 2 network, decoupling the complex inference logic from the mission-control and flight-actuation systems.
