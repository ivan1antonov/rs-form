import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MainPage from '../src/pages/MainPage';

describe('MainPage', () => {
  it('must show contorol modalType=form2', () => {
    render(<MainPage />);

    fireEvent.click(screen.getByText('Open React Hook Form'));

    expect(screen.getByText('Controlled Form')).toBeInTheDocument();
  });

  it('must show UncontrolledForm при modalType=form1', () => {
    render(<MainPage />);

    fireEvent.click(screen.getByText('Open Uncontrolled Form'));

    expect(screen.getByText('Uncontrolled Form')).toBeInTheDocument();
  });
});
