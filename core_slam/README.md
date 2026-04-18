# 🗺️ Core SLAM (Simultaneous Localization and Mapping)

> ⚠️ **Proprietary Software Notice**
>
> The contents of this module represent the core intellectual property of Corax CoLAB. The specialized SLAM algorithms optimized for unstructured biological terrains and our custom point-cloud fusion techniques are maintained in our private enterprise repository.

This module processes RTK-GPS and LiDAR data to generate high-fidelity, real-time 3D maps utilized for absolute spatial awareness by both the GAPbot and GAPdrone.

## Architecture Interface
The Core SLAM engine publishes optimized Nav_msgs data into the ROS 2 environment, providing the necessary spatial context for autonomous navigation and precise payload targeting.
