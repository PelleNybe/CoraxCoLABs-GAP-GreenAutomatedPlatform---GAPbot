🎯 **What:** The vulnerability fixed
Removed the `privileged: true` flag from the `gap_edge_node` service in `docker-compose.yml`.

⚠️ **Risk:** The potential impact if left unfixed
Running a container with `privileged: true` grants it full root-level access to the host machine. If an attacker were to compromise the `gap_edge_node` container, they could easily break out of the container isolation and take full control of the underlying host system (e.g., the Raspberry Pi or server).

🛡️ **Solution:** How the fix addresses the vulnerability
The `privileged: true` flag was removed. The container already correctly used specific `devices` mapping (e.g., `/dev/hailo0`, `/dev/ttyAMA0`, `/dev/video0`) to access the necessary hardware (Hailo-8 NPU, UART for Pixhawk, Camera/LiDAR). This adheres to the principle of least privilege, ensuring the container only has access to the resources it strictly requires, without exposing the entire host system to unnecessary risk.
