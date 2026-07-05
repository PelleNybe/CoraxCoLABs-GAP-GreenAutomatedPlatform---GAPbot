🎯 **What:** Removed unused `glob` and `os` imports from `src/gap_mesh_comm/setup.py`.
💡 **Why:** Having unused imports clutters the code, makes it harder to understand dependencies, and can potentially trigger linter warnings or errors. Removing them improves the codebase's cleanliness and maintainability.
✅ **Verification:** Verified the code using Python's compiler (`python3 -m py_compile src/gap_mesh_comm/setup.py`) to ensure no syntax errors were introduced. The change is isolated to removing unused imports in a standard `setup.py` script.
✨ **Result:** Improved maintainability and cleanliness of the `setup.py` file in the `gap_mesh_comm` package.
