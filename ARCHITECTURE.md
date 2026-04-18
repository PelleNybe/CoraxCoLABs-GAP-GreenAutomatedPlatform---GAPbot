# 🏗️ GAP Ecosystem Architecture

This document provides a high-level overview of the Corax CoLAB Green Automated Platform (GAP) architecture, specifically detailing the interaction between the aerial unit (GAPdrone), ground unit (GAPbot), and the decentralized network topology.

## 🌐 System Context: Decentralized Swarm Topology

The GAP ecosystem relies on a robust, decentralized network for mission-critical operations in unstructured, remote environments. We utilize the **B.A.T.M.A.N.-adv (Better Approach To Mobile Adhoc Networking)** mesh protocol to ensure resilient, infrastructure-less communication.

```mermaid
graph TD
    subgraph "Web3 & Operations"
        Operator[Operator Dashboard <br/> React / Three.js / Vite]
        Ledger[(Web3 Audit Ledger <br/> Quantum-Resistant)]
        Operator <-->|Telemetry & Commands| MeshNetwork
        Operator -->|Immutable Logs| Ledger
    end

    subgraph "GAP Swarm Mesh (B.A.T.M.A.N.-adv)"
        MeshNetwork((Decentralized <br/> Mesh Network))
    end

    subgraph "Ground Node: GAPbot"
        GAPbot[GAPbot <br/> Edge AI / SLAM]
        GAPbot <-->|Swarm Data| MeshNetwork
    end

    subgraph "Aerial Node: GAPdrone"
        GAPdrone[GAPdrone <br/> Edge AI / LiDAR]
        GAPdrone <-->|Swarm Data| MeshNetwork
    end

    classDef operator fill:#22314E,stroke:#fff,stroke-width:2px,color:#fff;
    classDef mesh fill:#129532,stroke:#fff,stroke-width:2px,color:#fff;
    classDef node fill:#3776AB,stroke:#fff,stroke-width:2px,color:#fff;
    classDef ledger fill:#8A2BE2,stroke:#fff,stroke-width:2px,color:#fff;

    class Operator operator;
    class MeshNetwork mesh;
    class GAPbot node;
    class GAPdrone node;
    class Ledger ledger;
```

## 🦅 GAPdrone: Hardware & Software Interface

The GAPdrone's internal architecture is designed around "Edge-First" principles, enabling complex AI inference and autonomous flight control locally. We utilize an asynchronous ROS 2 architecture and bridge it directly to the PX4 Autopilot using MicroXRCE-DDS.

```mermaid
sequenceDiagram
    participant Camera as Camera / LiDAR Sensor
    participant NPU as Hailo-8 NPU (Edge AI)
    participant ROS2 as ROS 2 Brain Node (RPi 5)
    participant DDS as MicroXRCE-DDS Agent
    participant PX4 as Pixhawk 6C (PX4)
    participant Actuator as Servo / Payload Release

    Camera->>NPU: Raw Video / Point Cloud
    Note over NPU: Real-time Biological Classification
    NPU->>ROS2: AI Inference Results (Bounding Boxes)
    Note over ROS2: Process Inference & Generate Command
    ROS2->>DDS: Publish Command (e.g., VEHICLE_CMD_DO_SET_ACTUATOR)
    DDS->>PX4: Translate to RTPS / MAVLink
    PX4->>Actuator: Actuate Payload Release
```

### Key Architectural Interfaces:
1.  **AI Inference Pipeline:** High-bandwidth data flows directly from sensors to the **Hailo-8 NPU**, generating structured data (bounding boxes, classifications) for the ROS 2 environment.
2.  **ROS 2 to PX4 Bridge:** The Companion Computer (Raspberry Pi 5) communicates with the Flight Controller (Pixhawk 6C) via **MicroXRCE-DDS** over a dedicated UART link (TELEM2). This eliminates the overhead and complexities of MAVProxy, providing a streamlined, low-latency control interface.
3.  **Actuation:** High-level AI decisions are translated into specific `VEHICLE_CMD_DO_SET_ACTUATOR` commands within ROS 2, which are then reliably executed by the Pixhawk 6C to interact with the physical world (e.g., triggering the payload release mechanism).

> ⚠️ **Note:** The exact definitions of the custom ROS 2 messages (`.msg`) and services (`.srv`) can be found in the `public_interfaces` directory. Core proprietary logic executing these interfaces is maintained in Corax CoLAB's private repositories.
