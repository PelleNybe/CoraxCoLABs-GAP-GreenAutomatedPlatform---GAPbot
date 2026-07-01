2026-06-30 - Insecure Randomness in Hash Generation
**Vulnerability:** Use of `Math.random()` for generating cryptographic hashes and identifiers.
**Learning:** `Math.random()` is not cryptographically secure and can be predictable, which is dangerous for generating hashes or UUIDs, especially in an immutable ledger context.
**Prevention:** Always use `window.crypto.getRandomValues()` for random byte generation and `window.crypto.randomUUID()` for unique identifiers in browser environments when security or true randomness is required.
2026-06-30 - Insecure Privileged Container Flag
**Vulnerability:** Running Docker containers with `privileged: true` grants the container root-level access to the host system.
**Learning:** The `privileged: true` flag should be avoided as it circumvents container isolation, creating a severe security risk if the container is compromised.
**Prevention:** Use specific capabilities (e.g., `cap_add`) and explicit device mappings (e.g., `/dev/hailo0`) instead of granting full privileged access, adhering to the principle of least privilege.
