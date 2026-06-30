2026-06-30 - Insecure Randomness in Hash Generation
**Vulnerability:** Use of `Math.random()` for generating cryptographic hashes and identifiers.
**Learning:** `Math.random()` is not cryptographically secure and can be predictable, which is dangerous for generating hashes or UUIDs, especially in an immutable ledger context.
**Prevention:** Always use `window.crypto.getRandomValues()` for random byte generation and `window.crypto.randomUUID()` for unique identifiers in browser environments when security or true randomness is required.
