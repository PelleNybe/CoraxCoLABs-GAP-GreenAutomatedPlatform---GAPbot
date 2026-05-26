import '@testing-library/jest-dom/vitest';
import ResizeObserver from 'resize-observer-polyfill';

(globalThis as unknown as { ResizeObserver: typeof ResizeObserver }).ResizeObserver = ResizeObserver;
