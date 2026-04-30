## 2025-04-30 - Navigation Focus & ARIA Accessibility

**Learning:**
Custom motion buttons in the navigation sidebar lacked semantic ARIA labels and clear keyboard focus states, making the dashboard less accessible for keyboard-only or screen reader users.

**Action:**
Added `aria-label`, `aria-current="page"`, and explicit `focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2` utility classes to the `<motion.button>` elements in `mission-control/src/App.tsx`.

## 2025-04-30 - Vision Stream Controls Accessibility

**Learning:**
Interactive elements on the video canvas (bounding boxes) and the side panel close button lacked keyboard navigability and screen reader support.

**Action:**
Added `tabIndex={0}`, `role="button"`, `aria-label`, `onKeyDown` handlers for Enter/Space, and visible focus rings (`focus-visible:ring-4`) to the bounding boxes in `VisionStream.tsx`. Also added focus styling and an ARIA label to the detail panel close button.
