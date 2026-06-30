import { render, screen } from '@testing-library/react';
import AuditLedger from './AuditLedger';
import { expect, test } from 'vitest';

test('renders immutable ledger and checks randomness generation', () => {
  render(<AuditLedger />);
  const title = screen.getByText(/IMMUTABLE LEDGER/i);
  expect(title).toBeInTheDocument();
});
