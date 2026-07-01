import { render, screen } from '@testing-library/react';
import AuditLedger from './AuditLedger';
import { expect, test, vi } from 'vitest';

test('renders immutable ledger and checks randomness generation', () => {
  const mathRandomSpy = vi.spyOn(Math, 'random');
  const cryptoSpy = vi.spyOn(window.crypto, 'getRandomValues');

  render(<AuditLedger />);
  const title = screen.getByText(/IMMUTABLE LEDGER/i);
  expect(title).toBeInTheDocument();

  // AuditLedger should generate initial burst of logs on mount
  expect(cryptoSpy).toHaveBeenCalled();
  expect(mathRandomSpy).not.toHaveBeenCalled();

  mathRandomSpy.mockRestore();
  cryptoSpy.mockRestore();
});
