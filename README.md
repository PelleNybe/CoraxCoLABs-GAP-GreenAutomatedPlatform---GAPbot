<div align="center">

<img src="./assets/hero-gapbot.png" alt="GAPbot in action" width="100%" style="border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.15);" />

# 🚀 Corax CoLAB: Green Automated Platform (GAP) Ecosystem
[![ROS 2 Humble](https://img.shields.io/badge/ROS_2-Humble-22314E?style=for-the-badge&logo=ros&logoColor=white)](https://docs.ros.org/en/humble/index.html)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![C++](https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cplusplus&logoColor=white)](https://isocpp.org/)
[![Edge AI](https://img.shields.io/badge/Hailo_8L-Edge_AI-000000?style=for-the-badge)](https://hailo.ai/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg?style=for-the-badge)](https://github.com/PelleNybe/GAP-ecosystem/actions)

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&pause=1000&color=129532&center=true&vCenter=true&width=700&lines=Intelligent+Automation+for+the+Physical+World;Edge-First+AI+and+Autonomous+Robotics;Harmonizing+Nature+with+Digital+Tech;Precision+Agriculture+%26+Deep+Tech)](https://git.io/typing-svg)

*Welcome to the definitive public architectural showcase of the **Green Automated Platform (GAP)**.*

</div>

---

## 🌟 Corax CoLAB: The Vision

At **[Corax CoLAB](https://coraxcolab.com)**, our mission is to orchestrate **Intelligent Automation**. We pioneer the intersection of deep tech, biological reality, and autonomous robotics to harmonize the natural world with digital innovation. We engineer solutions that aren't just intelligent, but fundamentally ecologically sound.

Our enterprise-grade technologies empower organizations to optimize resource flows, perform critical precision agriculture (AgTech), and execute biological restoration through unprecedented automated scaling.

<div align="center">
  <img src="./assets/ai-concept.png" alt="GAP AI Concept" width="100%" style="border-radius: 12px; box-shadow: 0 6px 12px rgba(0,0,0,0.15); margin-bottom: 10px;" />
  <p><i>The Future of Edge AI and Ecological Automation</i></p>
</div>

<br />


## 🧠 The GAP Ecosystem

The **Green Automated Platform (GAP)** is an overarching decentralized software and hardware ecosystem. Rather than relying on fragile cloud architectures, GAP is **Edge-First**. It leverages local high-speed SQLite databases and massive hardware acceleration to guarantee offline autonomy.

### Core Architectural Pillars:
*   **Edge AI Inference:** Real-time object detection and environmental analysis via local **Hailo-8L NPUs**. Data stays local, avoiding cloud bandwidth constraints.
*   **LiDAR-SLAM Navigation:** Generating magnificent 3D point-clouds for absolute spatial awareness.
*   **Decentralized Swarm Communication:** Agents coordinate utilizing the highly robust **B.A.T.M.A.N.-adv mesh network**, operating seamlessly in remote, unstructured environments without traditional infrastructure.
*   **Mission Control:** A powerful **React/Vite/TypeScript** dashboard featuring live WebGL/Three.js telemetry and Digital Twin visualization.
*   **Web3 Audit Ledger:** Unbreakable event logging secured by **Quantum-Resistant Cryptography** (`liboqs-python`).

<details>
<summary><b>🛠️ Interactive: Explore the GAP Stack</b></summary>
<br>

| Domain | Core Technologies |
| :--- | :--- |
| **Edge Compute** | Raspberry Pi 5 (16GB RAM), NVMe SSDs (PCIe), Hailo-8L |
| **Robotics OS** | ROS 2 (Jazzy Jalisco / Humble), MicroXRCE-DDS |
| **AI / Vision** | YOLOv8, PyTorch, OpenCV, GStreamer |
| **Networking** | B.A.T.M.A.N.-adv Mesh, Paho-MQTT, MAVLink (px4_msgs) |
| **Frontend** | React, Vite, TailwindCSS, Three.js |

</details>

<br />

## 🕷️ GAPbot: The Autonomous Hexapod

The physical extension of our platform for the ground floor.

**[GAPbot](./hardware/gapbot/bom.md)** is a relentless, six-legged robotic platform engineered to navigate and analyze the most challenging, unstructured terrains where wheeled systems falter. It operates entirely autonomously, acting as the ground-based sensory array for biological and environmental evaluation.

*   **Actuation:** 18 high-torque servos managed by elegant custom inverse kinematics over I2C (PCA9685).
*   **Perception:** Integrates RTK-GPS and LiDAR for precise, centimeter-level SLAM mapping while utilizing the NPU for real-time biological classification.

## 🦅 GAPdrone: The Edge AI Aerial Unit

The eye in the sky.

**[GAPdrone](./hardware/gapdrone/bom.md)** is our airborne counterpart for ecological intervention. Far from a standard drone, it carries an Edge AI payload capable of processing immense volumes of multi-spectral data locally.

*   **Autonomy:** Utilizes Pixhawk 6C flight controllers seamlessly integrated via ROS 2 Offboard Control, bypassing legacy protocols.
*   **Swarm Synergy:** Constantly communicates trajectory setpoints and AI insights back to the GAPbot via the decentralized mesh network, drastically accelerating terrain mapping and biological analysis.

<br />

---

## 🏗️ System Architecture

### GAPdrone Internal Data Flow
```mermaid
flowchart LR
    A[Camera] -->|Raw Video| B(Hailo-8 NPU)
    B -->|AI Bounding Boxes| C{ROS 2 Brain Node}
    C -->|ROS 2 Topic| D[MicroXRCE-DDS]
    D -->|MAVLink / RTPS| E(Pixhawk 6C Flight Controller)
```

### Decentralized Mesh Topology
```mermaid
flowchart LR
    A[Operator <br/> Web3 Dashboard] <-->|B.A.T.M.A.N.-adv| B((GAPbot <br/> Ground))
    B <-->|B.A.T.M.A.N.-adv| C((GAPdrone <br/> Aerial))
```

## 👨‍💻 Meet the Developer

<div align="center">
<img src="./assets/coraxcolabloggarund.png" alt="Corax CoLAB Logo" width="180" style="margin-bottom: 15px;" />

### **Pelle Nyberg**
**Deep Tech Developer | AI & Robotics Innovator | Master Gardener**

With a background seamlessly spanning industrial quality management, forestry, and low-level hardware architecture, Pelle brings a holistic, highly specialized approach to AgTech and robotics.

[![GitHub](https://img.shields.io/badge/GitHub-PelleNybe-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/PelleNybe)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Pelle_Nyberg-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pellenyberg/)
[![Portfolio](https://img.shields.io/badge/Portfolio-pellenybe.github.io-FF5722?style=for-the-badge&logo=dev.to&logoColor=white)](https://pellenybe.github.io)
[![CryptoP](https://img.shields.io/badge/CryptoP-Project-8A2BE2?style=for-the-badge&logo=bitcoin&logoColor=white)](https://cryptop.coraxcolab.com)
[![Corax CoLAB](https://img.shields.io/badge/Company-coraxcolab.com-22314E?style=for-the-badge&logo=googlechrome&logoColor=white)](https://coraxcolab.com)

</div>

> ⚠️ **Note:** This repository serves as a **public architectural overview, documentation hub, and AI context layer** (`docs/llms.txt`). Proprietary models (EcoMind, InnoBrain) and the complete closed-source operational stack remain in private repositories.

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=129532&height=120&section=footer" width="100%"/>
</div>
