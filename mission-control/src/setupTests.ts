import '@testing-library/jest-dom/vitest';
import ResizeObserver from 'resize-observer-polyfill';

(globalThis as any).ResizeObserver = ResizeObserver;
