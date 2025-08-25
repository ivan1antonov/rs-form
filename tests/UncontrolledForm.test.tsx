import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import UncontrolledForm from '../src/components/Forms/UncontrolledForm';
import type { ModalFormData } from '../src/types/types';

describe('UncontrolledForm', () => {
  it('call onSubmit with correct data', () => {
    const mockSubmit = vi.fn();
    render(<UncontrolledForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/Name:/i), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByLabelText(/Age:/i), { target: { value: 40 } });
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'bob@test.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: '1234' },
    });
    fireEvent.change(screen.getByLabelText(/Gender:/i), {
      target: { value: 'male' },
    });
    fireEvent.change(screen.getByLabelText(/Country:/i), {
      target: { value: 'UK' },
    });
    fireEvent.click(screen.getByLabelText(/Accept Terms:/i));

    fireEvent.submit(screen.getByTestId('uncontrolled-form'));

    expect(mockSubmit).toHaveBeenCalledTimes(1);
    const submittedData: ModalFormData = mockSubmit.mock.calls[0][0];
    expect(submittedData.id).toBeDefined();
    expect(submittedData.name).toBe('Bob');
    expect(submittedData.age).toBe(40);
  });
});
