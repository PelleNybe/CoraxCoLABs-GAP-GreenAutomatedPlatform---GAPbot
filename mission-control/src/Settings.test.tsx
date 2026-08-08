import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import Settings from './Settings';

describe('Settings Component', () => {
  afterEach(() => {
    // Clean up DOM after each test to prevent multiple components from leaking across tests
    document.body.innerHTML = '';
  });

  it('renders all sections and titles correctly', () => {
    render(<Settings />);

    expect(screen.getByText('Global Configuration')).toBeInTheDocument();
    expect(screen.getByText(/Interface Theme/i)).toBeInTheDocument();
    expect(screen.getByText(/Telemetry Sync Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Security & API Keys/i)).toBeInTheDocument();
    expect(screen.getByText('Danger Zone')).toBeInTheDocument();
  });

  it('toggles theme modes', () => {
    render(<Settings />);

    const darkModeBtn = screen.getByRole('button', { name: /Dark Mode/i });
    const lightModeBtn = screen.getByRole('button', { name: /Light Mode/i });

    // Initial state is dark
    expect(darkModeBtn).toHaveAttribute('aria-pressed', 'true');
    expect(lightModeBtn).toHaveAttribute('aria-pressed', 'false');

    // Click light mode
    fireEvent.click(lightModeBtn);
    expect(darkModeBtn).toHaveAttribute('aria-pressed', 'false');
    expect(lightModeBtn).toHaveAttribute('aria-pressed', 'true');

    // Click dark mode again
    fireEvent.click(darkModeBtn);
    expect(darkModeBtn).toHaveAttribute('aria-pressed', 'true');
    expect(lightModeBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('updates telemetry sync rate', () => {
    render(<Settings />);

    const slider = screen.getByRole('slider', { name: /Telemetry Sync Rate/i });

    // Initial value
    expect(screen.getByText('Current Rate: 2 Hz')).toBeInTheDocument();

    // Change value
    fireEvent.change(slider, { target: { value: '8' } });

    expect(screen.getByText('Current Rate: 8 Hz')).toBeInTheDocument();
  });

  it('updates api key input', () => {
    render(<Settings />);

    const input = screen.getByLabelText(/Supabase \/ Cloud Sync Key/i) as HTMLInputElement;

    // Initial state
    expect(input.value).toBe('');

    // Type into input
    fireEvent.change(input, { target: { value: 'my-secret-api-key' } });

    expect(input.value).toBe('my-secret-api-key');
  });

  it('prompts confirmation when factory reset is clicked', () => {
    // Mock window.confirm
    const confirmMock = vi.spyOn(window, 'confirm').mockImplementation(() => false);

    render(<Settings />);

    const resetBtn = screen.getByRole('button', { name: /Factory Reset Node/i });
    fireEvent.click(resetBtn);

    expect(confirmMock).toHaveBeenCalledTimes(1);
    expect(confirmMock).toHaveBeenCalledWith(expect.stringContaining('Are you sure you want to factory reset this node?'));

    confirmMock.mockRestore();
  });
});
