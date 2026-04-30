2025-04-30 - Remove Insecure Default Zero-Trust Secret

**Vulnerability:**
The `gap_zero_trust/zero_trust_handshake.py` script contained a hardcoded fallback string (`default_insecure_dev_key_do_not_use_in_prod!`) if the `GAP_SHARED_SECRET` environment variable was not set. This poses a critical risk if deployed to production without the environment variable properly configured, allowing for complete compromise of the Zero-Trust mesh communication.

**Learning:**
Never provide fallback credentials or secrets in code, even for development or testing purposes. Applications should fail securely and explicitly if required security context is missing.

**Prevention:**
The script now raises a `ValueError` if `GAP_SHARED_SECRET` is not set in the environment, enforcing secure configuration practices.
