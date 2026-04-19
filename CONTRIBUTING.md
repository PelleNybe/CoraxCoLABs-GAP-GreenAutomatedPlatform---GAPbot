# Contributing to the GAP-System

Thank you for your interest in contributing to the Green Automated Platform (GAP)! The GAP-System is an advanced cyber-physical ecosystem integrating Swarm Robotics, Precision Agriculture, and Zero Trust Security.

We welcome contributions of all kinds, from bug reports and documentation improvements to new features and major architectural enhancements.

## Getting Started

### 1. Code of Conduct
Before contributing, please read and agree to our [Code of Conduct](CODE_OF_CONDUCT.md). We expect all contributors to adhere to these guidelines to ensure a welcoming and inclusive environment.

### 2. Understand the Architecture
Familiarize yourself with the GAP architecture. Key resources:
*   [README.md](README.md)
*   [Hardware Setup](docs/HARDWARE_SETUP.md)
*   [System Overview](gap/docs/architecture/SYSTEM_OVERVIEW.md)

### 3. Setting Up Your Development Environment
Follow the instructions in the [Hardware Setup](docs/HARDWARE_SETUP.md) and [Master Implementation Plan](MASTER_IMPLEMENTATION_PLAN.md) to set up your local development environment.
The project heavily utilizes ROS 2 (Jazzy), Python (FastAPI), React, and Docker.

## How to Contribute

### Reporting Bugs
If you find a bug, please create an issue on our issue tracker. Include:
*   A clear, descriptive title.
*   Steps to reproduce the bug.
*   Expected vs. actual behavior.
*   Information about your environment (OS, ROS 2 version, hardware).

### Suggesting Enhancements
We welcome ideas for new features or improvements. When suggesting an enhancement, please open an issue and provide:
*   A clear description of the proposed feature.
*   The problem it solves or the value it adds.
*   Any relevant architectural considerations or potential impacts on existing modules (e.g., EUDR compliance, AI Act constraints).

### Claiming an Issue Before Working
To prevent duplicated effort, you **must** claim an issue before starting work. Comment on the issue you wish to work on with *"I would like to work on this."* Wait for a core maintainer to assign the issue to you. Do not open a PR for an unassigned issue, as it may not be reviewed.

### Contributing Code
1.  **Fork the repository** and create a new branch from `main`. Use a descriptive branch name (e.g., `feature/mesh-routing-optimization`, `bugfix/hailo-memory-leak`).
2.  **Write clean, documented code.** Follow the existing style conventions (PEP 8 for Python, standard ROS 2 C++ guidelines if applicable).
3.  **Write Tests (New Code = New Tests).** In alignment with ROS 2 core community standards, any new functionality must be accompanied by corresponding unit or integration tests. Pull requests introducing new logic without accompanying tests will be immediately rejected. Test coverage must not drop below the current repository baseline.
4.  **Run the linters and test suite.** Ensure all existing tests pass before submitting your PR.
5.  **Submit a Pull Request (PR).** Fill out the PR template completely. Link any related issues.

## Pull Request Guidelines
*   Keep PRs focused. Do not combine unrelated changes into a single PR.
*   **Strict Scoping:** PRs must do one thing and one thing only. If you are fixing a bug and also notice a typo in an adjacent file, open a separate PR for the typo. PRs that mix feature additions, refactoring, and bug fixes will be closed and you will be asked to split them.
*   Write clear, concise commit messages.
*   Ensure your PR passes all CI/CD checks (including security audits and bias checks where applicable).
*   Be responsive to code review feedback.

## Developer Certificate of Origin (DCO)
By contributing to this project, you agree to the Developer Certificate of Origin (DCO). This means you certify that you wrote the code or have the right to pass it on as an open-source contribution.

Thank you for helping us build the future of autonomous, sustainable operations!
