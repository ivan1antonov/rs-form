import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ControlledForm from '../src/components/Forms/ControlledForm';

describe('ControlledForm', () => {
  it('call onSubmit with correct data', async () => {
    const mockSubmit = vi.fn();
    render(<ControlledForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/Name:/i), {
      target: { value: 'Alice' },
    });
    fireEvent.change(screen.getByLabelText(/Age:/i), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'alice@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'password' },
    });
    fireEvent.change(screen.getByLabelText(/Gender:/i), {
      target: { value: 'female' },
    });
    fireEvent.change(screen.getByLabelText(/Country:/i), {
      target: { value: 'Canada' },
    });
    fireEvent.click(screen.getByLabelText(/Accept Terms:/i));

    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledTimes(1);
      const submittedData = mockSubmit.mock.calls[0][0];
      expect(submittedData.name).toBe('Alice');
      expect(submittedData.age).toBe(30);
    });
  });
});
