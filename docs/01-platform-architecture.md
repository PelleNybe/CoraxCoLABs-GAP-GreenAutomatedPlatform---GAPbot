# 🌐 Platform Architecture: The Edge-First Approach

The Green Automated Platform (GAP) is built on a fundamental principle: **Biological environments lack reliable internet.** Therefore, the system is designed to be fully autonomous and "Edge-First."

<img src="../assets/dashboard-preview.png" alt="Mission Control Dashboard Preview" width="100%" />

## 1. Decentralized Edge Compute
Unlike traditional cloud-dependent IoT systems, GAP processes critical data locally. The central API (`/gap/backend_core`) runs entirely on the physical edge device (e.g., the Raspberry Pi 5). 
* **Local High-Speed Storage:** Telemetry and mission data are logged to a local SQLite database residing on a high-speed NVMe SSD via PCIe/USB 3.1.
* **Offline Autonomy:** If connectivity is lost, the GAPbot and local sensors continue to execute their `Mission` and `MissionStep` objects autonomously.

## 2. Cloud Synchronization
When an internet connection is established, the `Sync Service` (`/gap/cloud_monitor`) quietly wakes up in the background. It securely pushes batched updates from the local SQLite database to the cloud orchestrator (Supabase). This ensures the central Mission Control dashboard is updated without interrupting real-time physical operations.

## 3. Web3 Audit Ledger (Data Integrity)
In sectors like industrial agriculture and forestry, data integrity is critical. We utilize a cryptographic Web3 Audit Ledger.
* Critical events (mode changes, safety stops, environmental anomalies) are cryptographically signed and verifiable via the `AuditLedger` component in the Mission Control frontend.
* We utilize quantum-resistant algorithms (like Falcon/Kyber via `liboqs-python`) to future-proof the integrity of the data stream.

## 4. Modern Mission Control
The nervous system of the GAP ecosystem is the modern React/Vite-based Mission Control dashboard. It translates high-level human goals into actionable robotic commands and visualizes the bot's state in real-time. Key frontend features include:
* **Live Telemetry & Diagnostics:** Comprehensive system health and performance monitoring.
* **Digital Twin Visualization:** A synchronized 3D representation of the GAPbot for remote inspection and kinematics monitoring.
* **Lidar Map Rendering:** Real-time 2D/3D point cloud generation for robust situational awareness.
* **Vision Stream Integration:** High-definition video with edge-computed bounding boxes (YOLOv8) overlaid dynamically.
