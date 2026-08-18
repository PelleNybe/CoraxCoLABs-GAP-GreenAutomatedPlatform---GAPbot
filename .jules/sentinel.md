YYYY-MM-DD - [Settings component Hardcoded API key fix]
**Vulnerability:** A placeholder API key string `sk-****************************` was hardcoded as the initial state for the API key in the `Settings.tsx` React component. Hardcoding default API keys or secret placeholders is poor practice as it exposes sensitive formats and can mislead developers or cause secrets to leak if real keys are mistakenly entered and committed.
**Learning:** Initial state for secrets should be empty or read from a configuration/environment mechanism, rather than containing default placeholders.
**Prevention:** Avoid hardcoding sensitive API keys or secret-looking strings as initial values or placeholders in source code.

2024-08-13 - [Dockerfile Container Breakout Risk]
**Vulnerability:** Running Docker containers as the default root user poses a significant security risk, especially in Edge AI environments where devices can be accessed physically. If an attacker exploits an application vulnerability, they could escalate privileges and break out to the host system.
**Learning:** Always implement least privilege by explicitely creating and using a non-root user within the Dockerfile to run the main container process.
**Prevention:** Add a non-root user and transition to it via the USER instruction before defining the ENTRYPOINT and CMD.
