# 🎮 GAP Ecosystem Simulation Environment

Before any software updates are deployed to physical hardware operating in sensitive biological environments, Corax CoLAB utilizes a rigorous, multi-tiered simulation pipeline. This ensures high reliability and allows for safe iteration of the AI and flight control logic.

## 1. Software-In-The-Loop (SITL)

Our primary testing ground is a pure software simulation utilizing **Gazebo (Ignition)** integrated with the PX4 Autopilot SITL architecture.

*   **World Models:** We utilize high-fidelity 3D environments simulating dense forestry and unstructured terrain, acting as synthetic inputs for our SLAM and visual odometry pipelines.
*   **Sensor Simulation:** Gazebo provides synthetic LiDAR point-clouds and RGB camera feeds, which are routed through a software synthetic of the Hailo-8 NPU to test the logical flow of our ROS 2 inference nodes.

### Running the SITL Environment
*(Note: Requires the proprietary simulation packages available in the Corax CoLAB private registry).*

```bash
# Launch the simulated forest environment and PX4 SITL
make px4_sitl gz_x500_depth

# In a separate terminal, launch the MicroXRCE-DDS Agent bridging to the simulation
MicroXRCEAgent udp4 -p 8888
```

## 2. Hardware-In-The-Loop (HITL)

To validate timing, latency, and actual hardware interfaces (UART, I2C), we utilize HITL testing.

*   **Setup:** A physical Holybro Pixhawk 6C and Raspberry Pi 5 are connected on the bench.
*   **Execution:** The flight controller runs the actual PX4 firmware, but sensor data (IMU, GPS, Vision) is fed into the Pixhawk from the Gazebo simulation running on a powerful host PC. The Raspberry Pi 5 runs the actual ROS 2 stack and Hailo-8 NPU hardware, performing real-time inference on the synthetic video feed.

This ensures that the `MicroXRCE-DDS` UART bridge and the power draw of the Edge AI components perform as expected under simulated flight load before actual deployment.

## 📁 /simulation_stubs

The `/simulation_stubs` directory in this public repository contains structural examples of the Gazebo world files (`.sdf`) and launch configurations (`.launch.py`) used to construct our synthetic testing environments. Core proprietary physics models and synthetic biological assets remain closed-source.
