## 2025-06-10 - Telemetry Optimizations

**Optimization:**
The `Telemetry.tsx` component was updated to replace Framer Motion `motion.div` bars with native HTML `div` elements and CSS transitions (`transition-all duration-500 ease-out`).

**Impact:**
This avoids running Framer Motion's animation frame loops and state updates on 20+ elements every 500ms (2Hz). It significantly reduces the JavaScript execution time and CPU overhead during telemetry data updates, relying instead on hardware-accelerated CSS transitions.

## 2025-06-10 - Accessibility and UX Enhancements

**Action:**
- `AuditLedger.tsx`: Added explicit `label` tags mapped with `htmlFor` attributes for select and input fields. Applied `focus-visible:ring` classes to improve keyboard navigation visibility.
- `LidarMap.tsx`: Added `aria-pressed` states to view mode toggle buttons. Converted the rotation label to an explicit `<label htmlFor="...">` and added focus rings to the slider input.
- `Settings.tsx`: Implemented a `window.confirm` dialog on the "Factory Reset Node" destructive action to prevent accidental data loss.

**Impact:**
These changes address multiple missing accessibility patterns, enabling proper screen reader support for inputs and active states, while also preventing unrecoverable errors during sensitive actions.
