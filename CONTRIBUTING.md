# Contributing to Corax CoLAB's GAP Ecosystem

First off, thank you for considering contributing to the Green Automated Platform (GAP)! We are excited to collaborate with the open-source community, hardware sponsors, and deep-tech enthusiasts to build the future of Edge-First AI and Autonomous Robotics.

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🚀 How Can I Contribute?

### 1. Hardware Integration & Testing
We are actively seeking feedback and optimizations for our hardware stack:
*   **Raspberry Pi 5 & Hailo-8L:** Help us optimize AI inference pipelines and power management (e.g., BEC configurations).
*   **Pixhawk 6C & PX4:** Contribute to ROS 2 / MicroXRCE-DDS bridge stability and custom MAVLink messages.

### 2. Documentation and Simulation
*   Improve existing architectural diagrams (Mermaid.js) and technical documentation.
*   Submit improvements or variants to our `/simulation_stubs` (e.g., advanced Gazebo world configurations).
*   Submit improvements or variants to our `/cad` models, such as the `payload_dropper`.

### 3. Reporting Bugs
If you find a bug in the documentation, build scripts, or provided code snippets, please open an Issue:
*   Use a clear and descriptive title.
*   Provide the exact steps to reproduce the issue.
*   Include your environment details (OS, ROS 2 version, Hardware setup, Docker configs).

### 4. Pull Requests
We welcome Draft Pull Requests (PRs) for all changes!
1.  Fork the repo and create your branch from `main`.
2.  Ensure your code/documentation adheres to the guidelines in `AGENTS.md`.
3.  **Important:** This is a public showcase repository. **DO NOT** submit proprietary business logic, trained custom ML models, or core SLAM algorithms.
4.  If modifying ROS 2 packages (like `/public_interfaces`), ensure they pass the CI pipelines defined in `.github/workflows/`.
5.  Submit your PR as a **Draft** for review by the Corax CoLAB team.

## 🧑‍💻 Code Style
*   **Mission Control Dashboard (React/TypeScript):** We use ESLint. Ensure your code conforms by running `npm run lint`.
*   **Python:** Follow PEP 8 standards.
*   **C++:** Follow the standard ROS 2 C++ style guide.
*   **ROS 2 Packages:** Ensure packages pass `ament_lint` checks as defined in our linting workflows.

## 🤝 Contact
For partnerships, hardware sponsorships, or deep-tech investment inquiries, please reach out to **Pelle Nyberg**:
*   [LinkedIn](https://www.linkedin.com/in/pellenyberg/)
*   [Corax CoLAB Website](https://coraxcolab.com)
