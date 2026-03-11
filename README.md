# 🌿 GAP System & GAPbot Architecture
**Intelligent Automation for the Physical World | By [Corax CoLAB](https://coraxcolab.com)**

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![ROS 2](https://img.shields.io/badge/ROS_2-22314E?style=for-the-badge&logo=ros&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/Raspberry%20Pi%205-C51A4A?style=for-the-badge&logo=Raspberry-Pi)
![Edge AI](https://img.shields.io/badge/Hailo_8L-Edge_AI-000000?style=for-the-badge)
![Web3](https://img.shields.io/badge/Web3-Audit_Ledger-blue?style=for-the-badge)

Welcome to the architectural overview of the **Green Automated Platform (GAP)** and the **GAPbot**. 

Developed by Corax CoLAB, this ecosystem is an enterprise-grade, edge-native solution designed to bridge the gap between biological reality and digital intelligence. We specialize in autonomous agriculture (AgTech), sustainable operations, and advanced robotics capable of navigating, analyzing, and acting in unstructured environments.

> ⚠️ **Note:** This repository serves as a public architectural overview, documentation hub, and AI context layer (`llms.txt`). The core proprietary source code for the AI models (EcoMind, InnoBrain) and the GAP platform remains in private repositories.

---

![GAPbot in action](./assets/hero-gapbot.jpg)

## 🚀 The Vision: Full-Stack of Matter
At Corax CoLAB, we don't just design systems; we build them from the ground up to ensure our automated solutions are not just "smart," but ecologically sound. The GAP system optimizes resource flows through a decentralized network of IoT sensors, robust Edge AI, and autonomous robotics.

### 🕷️ GAPbot: The Hexapod Explorer
The physical extension of the GAP ecosystem. GAPbot is a six-legged autonomous robot designed for challenging terrains where wheeled robots fail. 
* **Hardware Core:** Powered by a Raspberry Pi 5 (16GB RAM) with active cooling, running headless via SSH/VNC.
* **AI Acceleration:** Equipped with a Hailo-8L NPU over PCIe for real-time vision processing (YOLOv8) and environmental analysis without relying on the cloud.
* **High-Speed I/O:** NVMe SSD connected via PCIe/USB 3.1 for rapid database logging and sensor telemetry.
* **Autonomy:** Runs on ROS 2 (Jazzy Jalisco) with RTK-GPS and Lidar for precision navigation and obstacle avoidance.
* **Actuation:** 18 servos controlled via I2C (PCA9685) managed by custom inverse kinematics algorithms.

### 🧠 The GAP Platform (Mission Control)
The nervous system of the operation.
* **Edge-First AI:** Inference runs locally. The system syncs SQLite data to a cloud (Supabase) orchestrator only when connectivity is available.
* **Mission Orchestrator:** Translates high-level human goals ("Scan Sector A") into actionable robotic commands via MQTT.
* **Web3 Audit Ledger:** Ensures absolute data integrity by cryptographically signing critical events and anchoring them to a blockchain using quantum-resistant algorithms.
* **Modern Dashboard:** A React/Vite based Mission Control for real-time fleet monitoring and teleoperation.

  ![Dashboard Preview](./assets/dashboard-preview.png)


---


## 📚 Documentation

Dive deeper into the GAP ecosystem architecture and specifications:

* [**Platform Architecture**](./docs/01-platform-architecture.md): The Edge-First approach, cloud synchronization, and data integrity.
* [**Hardware Specifications**](./docs/02-hardware-specs.md): Core compute, AI acceleration, and kinematics of the GAPbot.
* [**AI & Vision**](./docs/03-ai-and-vision.md): Real-time processing and the EcoMind & InnoBrain modules.
* [**AI Context Layer**](./docs/llms.txt): Detailed structural overview for LLMs (`llms.txt`).

---

## 🛠️ High-Level Tech Stack
* **Languages & Frameworks:** Python (FastAPI, PyTorch), C++, React (Node.js).
* **Robotics:** ROS 2, rclpy, custom kinematics.
* **Hardware Interfaces:** PCIe, I2C, SPI, UART/Serial, GPIO (`RPi.GPIO`, `gpiozero`).
* **Communication:** Paho-MQTT, WebSockets.

---

## 🤝 Collaborate with Corax CoLAB
Corax CoLAB is led by Pelle Nyberg—Deep Tech Developer, AI & Robotics Innovator, and Master Gardener. With a unique background spanning industrial quality management, forestry, and hardware-level coding, Corax CoLAB brings a holistic approach to Deep Tech and AgTech.

**We are open to:**
* Consulting projects and technical partnerships.
* New opportunities in AI & Robotics Development (Python/Linux/ROS).
* Deep Tech & IoT Architecture design.
* GreenTech Innovation & Strategy.

🌐 **Visit us:** [coraxcolab.com](https://coraxcolab.com)  
🌱 **Gardening division:** [coraxgardening.se](https://www.coraxgardening.se)

*Intelligent Automation. Harmonizing the natural world with the digital one.*
