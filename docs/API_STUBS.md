# 🔌 GAP Web3 & SCADA API Integration

This document outlines the theoretical API interfaces provided by the Mission Control Dashboard for external integration. These endpoints allow third-party systems (such as governmental SCADA networks or private enterprise audit tools) to fetch verified, cryptographically signed telemetry and environmental impact data to prove EUDR (EU Deforestation Regulation) compliance.

> **Note:** The actual backend implementation, database schemas (SQLite/PostgreSQL), and `liboqs` signing logic are maintained in our private enterprise repository. This document serves as an architectural blueprint for hardware and integration partners.

---

## Base URL
`https://api.missioncontrol.coraxcolab.com/v1`

## Authentication
All endpoints require a valid JWT issued via our Zero-Trust authentication framework.

**Header:** `Authorization: Bearer <token>`

---

## 1. Web3 Audit Ledger

Retrieve cryptographically signed logs of physical interventions (e.g., payload drops, seed dispersal) executed by the GAPdrone.

### `GET /ledger/interventions`

**Parameters:**
*   `drone_id` (string) - The UUID of the specific aerial unit.
*   `start_time` (ISO 8601) - Filter start.
*   `end_time` (ISO 8601) - Filter end.

**Response (200 OK):**
```json
{
  "status": "success",
  "data": [
    {
      "event_id": "evt_987xzy321",
      "timestamp": "2024-04-18T14:32:01Z",
      "drone_id": "gapdrone_alpha_01",
      "action": "payload_release",
      "payload_type": "seed_ball_pine",
      "coordinates": {
        "lat": 59.3293,
        "lon": 18.0686,
        "alt_msl": 124.5
      },
      "cryptographic_signature": {
        "algorithm": "dilithium2",
        "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
      }
    }
  ]
}
```

---

## 2. Biological Telemetry & Mapping

Fetch aggregated AI inference data processed by the Hailo-8 NPU for a specific mapped region.

### `GET /telemetry/biological-survey`

**Parameters:**
*   `region_id` (string) - The predefined operational zone.

**Response (200 OK):**
```json
{
  "status": "success",
  "region_id": "zone_delta_north",
  "survey_timestamp": "2024-04-18T10:00:00Z",
  "findings": [
    {
      "class_label": "pinus_sylvestris",
      "count": 1450,
      "average_confidence": 0.94
    },
    {
      "class_label": "invasive_species_x",
      "count": 12,
      "average_confidence": 0.88,
      "locations": [
        {"lat": 59.3301, "lon": 18.0690},
        {"lat": 59.3305, "lon": 18.0695}
      ]
    }
  ]
}
```

---

## 3. Real-Time Swarm Status

Retrieve the current operational status of the decentralized B.A.T.M.A.N.-adv mesh network.

### `GET /swarm/status`

**Response (200 OK):**
```json
{
  "network_status": "healthy",
  "active_nodes": 3,
  "nodes": [
    {
      "node_id": "operator_base",
      "type": "ground_control",
      "connection": "direct"
    },
    {
      "node_id": "gapbot_01",
      "type": "ugv",
      "connection": "mesh",
      "battery_percent": 82
    },
    {
      "node_id": "gapdrone_alpha_01",
      "type": "uav",
      "connection": "mesh",
      "battery_percent": 45,
      "current_task": "LiDAR_mapping"
    }
  ]
}
```
