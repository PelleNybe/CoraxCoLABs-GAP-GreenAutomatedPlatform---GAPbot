# GAPdrone Payload Dropper Mechanism

This directory serves as the conceptual CAD repository and documentation hub for the **GAPdrone Dual-Use Payload Dropper**.

## Mechanism Concept

The GAPdrone is equipped with a custom, lightweight, servo-actuated payload delivery mechanism. This system is designed around robust RC servos to provide a reliable, digitally controlled release mechanism directly integrated with the autonomous flight system.

The physical release uses a pin-pull or trap-door design, actuated by the servo, to instantly detach the carried payload upon command.

## Dual-Use Capabilities

This mechanism is the core actuation point for the GAPdrone's primary missions, serving critical functions in both environmental and tactical scenarios:

### 1. Ecological Restoration
In its primary mode, the payload dropper is utilized for large-scale precision agriculture and ecological restoration. The mechanism is capable of carrying and autonomously deploying:
*   **Seed Pods:** Dispersing native seeds over degraded terrain.
*   **Nutrient Packets:** Delivering targeted fertilizer to specific high-value forestry zones.
*   **Biological Agents:** Releasing beneficial insects or fungal spores for natural pest control and soil revitalization.

### 2. Emergency Tactical Deployment
In hazardous or contaminated environments where human or wheeled robotic access is impossible, the payload dropper serves a secondary, critical function:
*   **GAPbot Air-Drop:** The mechanism is engineered to securely carry and precisely airdrop a specialized, ruggedized **GAPbot** (Ground Autonomous Platform).
*   **Deployment:** The drone navigates to the target GPS coordinates and actuates the servo to release the GAPbot, allowing the ground unit to immediately begin SLAM mapping and biological evaluation in the hot zone.

## ROS 2 & PX4 Integration

The payload release is fully integrated into our edge-first ROS 2 architecture, ensuring that drops can be executed autonomously based on complex AI logic or specific geographic waypoints.

### Triggering the Release

We leverage the tight integration between ROS 2 and the Pixhawk 6C flight controller via MicroXRCE-DDS.

The release sequence operates as follows:
1.  **ROS 2 Brain Node:** The central ROS 2 node determines that the drone has reached the optimal deployment location (e.g., via GPS waypoint or visual confirmation from the Hailo-8 NPU).
2.  **MAVLink Command:** The node generates a `VEHICLE_CMD_DO_SET_ACTUATOR` command.
3.  **Actuation:** This command is published to the appropriate PX4 actuator topic over the MicroXRCE-DDS bridge.
4.  **Hardware Release:** The Pixhawk 6C translates this command into a PWM signal sent directly to the designated servo pin, pulling the release pin and deploying the payload.

This direct, low-level integration ensures highly reliable, low-latency actuation without the need for secondary, independent radio triggers.
