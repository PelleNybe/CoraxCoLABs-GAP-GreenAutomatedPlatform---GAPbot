## 2025-02-27 - Zero Trust Handshake Nonce Validation Replay Attack Prevention

**Vulnerability:**
The `ZeroTrustHandshake` class checked timestamps but ignored nonces during signature verification. This allowed a malicious actor to intercept a valid payload and replay it multiple times within the 5-minute timestamp validity window without being rejected.

**Learning:**
Simply generating nonces during signing isn't enough; they must be cached and validated against seen nonces *within* the timestamp validity window to effectively prevent replay attacks. The cache must use the message's `payload_time` (not the server's receipt time) for eviction to ensure perfect alignment with the clock skew rules. Caching should only occur *after* the HMAC signature is verified to prevent DoS attacks through cache exhaustion via invalid signatures.

**Prevention:**
Implement an in-memory or persisted nonce cache that tracks valid nonces within the timestamp expiration window. Validate incoming nonces against this cache and clean out expired entries based on their payload timestamp compared to the current server time. Always verify signatures *before* modifying state (caching nonces) to prevent resource exhaustion vectors.
