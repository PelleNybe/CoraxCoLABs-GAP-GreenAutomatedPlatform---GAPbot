import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, it, expect } from 'vitest';

describe('App Component', () => {
  it('renders the Mission Control sidebar', () => {
    render(<App />);
    expect(screen.getByText(/Mission Control/i)).toBeInTheDocument();
  });
});
