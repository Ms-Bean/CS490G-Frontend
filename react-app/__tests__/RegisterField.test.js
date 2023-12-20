import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterField from '../src/components/RegisterField';

// Mock useAuth and useSignup hooks
jest.mock('../src/hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({ user: null })),
}));

jest.mock('../src/hooks/useSignup', () => ({
  useSignup: jest.fn(() => ({ signup: jest.fn(), isLoading: false, errorMessage: null })),
}));

describe('RegisterField', () => {
  it('renders without crashing', () => {
    render(<RegisterField />);
  });

  it('handles form submission', async () => {
    const { getByLabelText, getByText } = render(<RegisterField />);

    // Fill in form fields
    fireEvent.change(getByLabelText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText(/Username/i), { target: { value: 'johndoe' } });
    fireEvent.change(getByLabelText(/Password/i), { target: { value: 'password123' } });

    // Trigger form submission
    fireEvent.click(getByText(/Submit/i));

    // Wait for form submission to complete
    await waitFor(() => {
      // Assert any expected behavior after form submission
    });
  });

  it('handles role selection', () => {
    const { getByLabelText } = render(<RegisterField />);

    // Select the "Coach" role
    fireEvent.click(getByLabelText(/Coach/i));

    // Assert any expected behavior after role selection
  });

  // Add more tests for other functionalities as needed
});
