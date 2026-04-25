## 2025-04-25 - [Removed Hardcoded Secret in Zero Trust Handshake]
**Vulnerability:** A hardcoded shared secret `b"super_secret_quantum_resistant_key_123!"` was present in `gap_zero_trust/zero_trust_handshake.py`.
**Learning:** The hardcoded secret was part of the example usage block (`if __name__ == "__main__":`) for demonstration purposes but posed a risk if copied or used directly in production.
**Prevention:** Use environment variables like `os.environ.get("GAP_SHARED_SECRET")` with explicit insecure fallbacks (that warn the user) when deploying examples that need cryptographic keys.
