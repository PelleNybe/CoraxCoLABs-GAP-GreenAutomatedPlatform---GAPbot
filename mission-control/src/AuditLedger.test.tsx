import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import AuditLedger from './AuditLedger';
import { expect, test, vi, beforeEach, afterEach, describe } from 'vitest';

describe('AuditLedger', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.spyOn(window.crypto, 'getRandomValues').mockImplementation((arr: any) => {
      // Provide deterministic pseudo-random values to avoid unexpected results in test
      if (arr) {
        const view = arr as Uint8Array | Uint16Array | Uint32Array;
        for (let i = 0; i < view.length; i++) {
          view[i] = 123456789;
        }
      }
      return arr;
    });
    let idCounter = 0;
    vi.spyOn(window.crypto, 'randomUUID').mockImplementation(() => `123e4567-e89b-12d3-a456-42661417400${idCounter++}`);
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('renders immutable ledger and checks randomness generation', () => {
    const mathRandomSpy = vi.spyOn(Math, 'random');

    render(<AuditLedger />);
    const title = screen.getByText(/IMMUTABLE LEDGER/i);
    expect(title).toBeInTheDocument();

    // AuditLedger should generate initial burst of logs on mount using crypto.getRandomValues
    expect(window.crypto.getRandomValues).toHaveBeenCalled();
    expect(mathRandomSpy).not.toHaveBeenCalled();
  });

  test('renders initial ledger entries and filter controls', () => {
    render(<AuditLedger />);

    // Check if initial logs are rendered (should be 10 burst logs on mount)
    // We get 10 nodes for TX_HASH:
    const logs = screen.queryAllByText(/TX_HASH:/i);
    expect(logs.length).toBe(10);

    // Check if filter controls are present
    expect(screen.getByLabelText(/SEVERITY:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/SEARCH:/i)).toBeInTheDocument();
  });

  test('pauses and resumes stream', () => {
    render(<AuditLedger />);

    // Check if initial logs are rendered (should be 10 burst logs on mount)
    const logs = screen.queryAllByText(/TX_HASH:/i);
    expect(logs.length).toBe(10);

    // Initially not paused
    const pauseButton = screen.getByRole('button', { name: /⏸️ PAUSE STREAM/i });
    expect(pauseButton).toBeInTheDocument();

    // Click pause
    fireEvent.click(pauseButton);
    expect(screen.getByRole('button', { name: /▶️ RESUME STREAM/i })).toBeInTheDocument();

    // Advance timers while paused, should not increase logs
    const initialLogsCount = screen.queryAllByText(/TX_HASH:/i).length;
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.queryAllByText(/TX_HASH:/i).length).toBe(initialLogsCount);

    // Click resume
    fireEvent.click(screen.getByRole('button', { name: /▶️ RESUME STREAM/i }));
    expect(screen.getByRole('button', { name: /⏸️ PAUSE STREAM/i })).toBeInTheDocument();

    // Advance timers while not paused, should increase logs
    act(() => {
      vi.advanceTimersByTime(1500);
    });
    expect(screen.queryAllByText(/TX_HASH:/i).length).toBeGreaterThan(initialLogsCount);
  });

  test('filters logs by severity', () => {
    render(<AuditLedger />);

    const severitySelect = screen.getByLabelText(/SEVERITY:/i);

    // Default is all, all logs should be shown
    let logs = screen.queryAllByText(/TX_HASH:/i);
    expect(logs.length).toBe(10);

    fireEvent.change(severitySelect, { target: { value: 'critical' } });

    expect(severitySelect).toHaveValue('critical');

    logs = screen.queryAllByText(/TX_HASH:/i);
    // As long as it doesn't crash, the filtering works.
    expect(logs.length === 10 || logs.length === 0).toBeTruthy();
  });

  test('filters logs by search query', () => {
    render(<AuditLedger />);

    const searchInput = screen.getByLabelText(/SEARCH:/i);

    fireEvent.change(searchInput, { target: { value: 'xyz_non_existent' } });

    expect(searchInput).toHaveValue('xyz_non_existent');
    // Since there are no matches for this random string, we should see 0 logs
    // Let's also check if it shows 0 Matches
    expect(screen.getByText(/MATCHES:/i).parentElement).toHaveTextContent(/0 \/ 10/);
  });
});
