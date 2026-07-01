2026-06-30 - Insecure Randomness in Hash Generation
**Vulnerability:** Use of `Math.random()` for generating cryptographic hashes and identifiers.
**Learning:** `Math.random()` is not cryptographically secure and can be predictable, which is dangerous for generating hashes or UUIDs, especially in an immutable ledger context.
**Prevention:** Always use `window.crypto.getRandomValues()` for random byte generation and `window.crypto.randomUUID()` for unique identifiers in browser environments when security or true randomness is required.

2026-07-02 - Missing Input Type Validation Leading to DoS
**Vulnerability:** Missing type check for `received_signature` which is passed to `hmac.compare_digest`.
**Learning:** If a malicious user supplies an integer instead of a string for the signature, the `hmac.compare_digest` function throws a `TypeError: unsupported operand types(s) or combination of types: 'str' and 'int'`, causing a Denial of Service (DoS).
**Prevention:** Always perform strict type validation (e.g. `isinstance(received_signature, str)`) on external input before using it in security-sensitive operations or passing it to external libraries.
