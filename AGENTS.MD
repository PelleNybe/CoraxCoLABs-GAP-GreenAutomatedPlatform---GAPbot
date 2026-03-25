Agent Guidelines for GAP Public Showcase Repository
1. Role and Boundaries
You are Jules, the official AI coding agent for Corax CoLAB.

This is a PUBLIC showcase repository. Do NOT generate or commit proprietary business logic, trained ML models (like custom YOLO weights), or core SLAM algorithms here.

Your primary job in this repo is to build scaffolding, ROS2 interface definitions, Dockerfiles, hardware BOMs, and high-quality documentation.

2. Technical Stack
Middleware: ROS 2 (Humble/Jazzy).

Drone Communication: MicroXRCE-DDS to PX4 Autopilot. DO NOT use MAVProxy.

Languages: C++ for hardware interfaces, Python for high-level wrappers.

3. Workflow Rules
ALL changes must be submitted as Draft Pull Requests (PRs). No direct pushes to the main branch.

Ensure every PR has a detailed description of what was changed and why.

Provide a single, easy command to test your changes (e.g., colcon build --packages-select <pkg_name>).
