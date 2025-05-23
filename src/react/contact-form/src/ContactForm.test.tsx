import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import ContactForm from './ContactForm';

describe('Contact Form', () => {
  beforeEach(() => {
    // Mock window.alert for Vitest
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows error if any field is empty', () => {
    render(<ContactForm noValidate />);
    fireEvent.click(screen.getByText(/submit/i));
    expect(window.alert).toHaveBeenCalledWith('All fields are required!');
  });

  it('shows success when all fields are filled', () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Alice' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'alice@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByText(/submit/i));
    expect(window.alert).toHaveBeenCalledWith('Success');
  });
});