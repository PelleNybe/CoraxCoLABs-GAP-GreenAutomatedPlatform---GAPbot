🎯 **What:** The vulnerability fixed
Replaced `Math.random()` with `window.crypto.getRandomValues()` in `mission-control/src/AuditLedger.tsx` for secure hash generation, and used `window.crypto.randomUUID()` for ID generation in `AuditLedger.tsx` and `VisionStream.tsx`.

⚠️ **Risk:** The potential impact if left unfixed
Using `Math.random()` for cryptographic purposes or generating unique identifiers is insecure as the PRNG (Pseudo-Random Number Generator) algorithm behind it is predictable. This could allow attackers to predict generated hashes and IDs, potentially exploiting the immutable ledger or spoofing identities.

🛡️ **Solution:** How the fix addresses the vulnerability
Modified `generateHash` to use `window.crypto.getRandomValues()` to populate a `Uint8Array` and convert it to a hex string. Replaced `Math.random().toString()` with `window.crypto.randomUUID()` for generating identifiers. The change utilizes cryptographically secure methods provided by the web browser, ensuring that the generated hashes and identifiers are unpredictable and secure.
