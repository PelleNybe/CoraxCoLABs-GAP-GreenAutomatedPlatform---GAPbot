# Changelog

All notable changes to the public architectural repository of the GAP ecosystem will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-04-18

### Added
- Comprehensive Enterprise/Deep Tech README.md showcasing the GAP vision and EUDR use case.
- `ARCHITECTURE.md` with Mermaid.js diagrams detailing the B.A.T.M.A.N.-adv mesh and ROS2-PX4 interface.
- Complete hardware Bill of Materials (`BOM.md`) featuring Holybro X650, Pixhawk 6C, Raspberry Pi 5, and Hailo-8.
- CI/CD pipelines via GitHub Actions for building and linting `public_interfaces` on ROS 2 Humble.
- Containerization support with `Dockerfile`, `docker-compose.yml`, and `.devcontainer`.
- `SIMULATION.md` and stub Gazebo world files to document SITL/HITL testing procedures.
- Developer ergonomics via root `Makefile`.
- Issue and Pull Request templates for open-source community engagement.

### Changed
- Refactored `public_interfaces` into a strictly compliant `ament_cmake` ROS 2 package.
- Updated `CONTRIBUTING.md` and `SECURITY.md` to reflect new security paradigms regarding the Zero-Trust mesh network.

## [1.0.0] - 2023-11-05

### Added
- Initial public release of the GAPbot / GAPdrone architecture.
- Structural stubs for proprietary modules (`gapdrone_edge_ai`, `gap_zero_trust`, `core_slam`).
- Basic dual-license framework defining the boundary between public interfaces and closed-source IP.

### Changed
- Migrated internal core middleware standard from ROS 2 Foxy to ROS 2 Humble.
- Transitioned flight-controller bridge architecture from legacy MAVProxy to native MicroXRCE-DDS over UART.
