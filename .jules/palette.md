## 2025-02-12 - Optimize LidarMap Point Cloud Instantiation
**Learning:** Initializing objects like `new THREE.Color()` inside large inner loops (20,000+ iterations per render calculation) severely degrades performance by allocating excessive short-lived memory and triggering GC thrashing.
**Action:** Extract the object instantiation out of the loop and reuse the same instance to significantly lower computation time and smooth out the rendering frame rate.
