YYYY-MM-DD - [Settings component Hardcoded API key fix]
**Vulnerability:** A placeholder API key string `sk-****************************` was hardcoded as the initial state for the API key in the `Settings.tsx` React component. Hardcoding default API keys or secret placeholders is poor practice as it exposes sensitive formats and can mislead developers or cause secrets to leak if real keys are mistakenly entered and committed.
**Learning:** Initial state for secrets should be empty or read from a configuration/environment mechanism, rather than containing default placeholders.
**Prevention:** Avoid hardcoding sensitive API keys or secret-looking strings as initial values or placeholders in source code.

2024-10-25 - [Docker Compose Container Breakout Risk via Host Namespaces Fix]
**Vulnerability:** Host namespaces (`network_mode: "host"`, `ipc: "host"`, and `pid: "host"`) were explicitly set in `docker-compose.yml`, which increases the risk of a container breakout vulnerability by sharing the host's network stack, IPC namespace, and process ID namespace with the container.
**Learning:** Using host namespaces defeats many of the isolation benefits provided by containers. If a container is compromised, the attacker has much broader access to the host system.
**Prevention:** Avoid using host namespaces unless strictly necessary for the application's function. In this case, removing them and relying on specific device mappings (`/dev/hailo0`, `/dev/ttyAMA0`, `/dev/video0`) is sufficient and much safer.
