# Payload Dropper Concept

This directory contains the CAD models and documentation for the servo-actuated payload deployment mechanism utilized on the GAPdrone.

## Mechanical Design

The payload dropper is a reliable, lightweight servo-actuated mechanism. It is designed around a dual-use concept, allowing the GAPdrone to carry and precisely drop critical payloads in harsh environments.

### Dual-Use Applications:

1.  **Ecological Restoration (AgTech):** Precision deployment of seed pods across large areas of terrain for rapid reforestation and automated agricultural interventions.
2.  **Emergency Tactical Deployment:** Air-dropping a GAPbot hexapod directly into contaminated areas, hazardous minefields, or complex earthquake zones where human access is impossible or too dangerous.

## Control Integration

The payload dropper mechanism is natively integrated into our ROS 2 architectural stack.

The servo triggering is not handled by direct RC PWM passthrough. Instead, it is managed by the high-level ROS 2 node executing the mission plan.

1.  The ROS 2 Brain Node sends a MAVLink servo command down to the Pixhawk 6C over the MicroXRCE-DDS connection.
2.  Specifically, the `VEHICLE_CMD_DO_SET_ACTUATOR` command is published.
3.  The Pixhawk 6C flight controller parses this command and actuates the appropriate PWM channel to trigger the payload release.

This ensures that payload drops can be flawlessly synchronized with the Hailo-8 AI inference (e.g., dropping a seed pod only when a specific, viable planting location is visually identified) and fully logged in the Web3 Audit Ledger.
