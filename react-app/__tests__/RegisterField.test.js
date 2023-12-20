import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterField from '../src/components/RegisterField';
import { useSignup } from '../src/hooks/useSignup';

// Mock useAuth hook
jest.mock('../src/hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({ user: null })),
}));

jest.mock('../src/hooks/useSignup', () => {
  const signup = jest.fn();
  const setAlertMessage = jest.fn();
  return {
    useSignup: jest.fn(() => ({
      signup,
      isLoading: false,
      errorMessage: null,
      setAlertMessage,
    })),
  };
});

describe('RegisterField', () => {
  it('renders without crashing', () => {
    render(<RegisterField />);
  });

  it('handles form submission', async () => {
    const { getByText } = render(<RegisterField />);

    // Trigger form submission
    fireEvent.click(getByText(/Submit/i));

    // Wait for form submission to complete
    await waitFor(() => {
      // Assert that signup function was called with the correct formData and userRole
      expect(useSignup().signup).toHaveBeenCalledWith(
        {
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          password: '',
        },
        'client' // Assuming the default role is 'client'
      );

      // Assert that isLoading and errorMessage are as expected
      expect(useSignup().isLoading).toBe(false);
      expect(useSignup().errorMessage).toBe(null);
    });
  });
  // Add more tests for other functionalities as needed
});
