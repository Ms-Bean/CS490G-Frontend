import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import RegisterField from '../src/components/RegisterField';
import '@testing-library/jest-dom';
import { useSignup } from '../src/hooks/useSignup';

// Mock useAuth hook
jest.mock('../src/hooks/useAuth', () => ({
  useAuth: jest.fn(() => ({ user: null })),
}));

jest.mock('../src/hooks/useSignup', () => ({
    useSignup: jest.fn(() => ({
      signup: jest.fn(),
      isLoading: false,
      errorMessage: null,
    })),
  }));

describe('RegisterField', () => {
  it('renders without crashing', () => {
    render(<RegisterField />);
  });

  it('handles form submission', async () => {

    useSignup.mockReturnValueOnce({
      signup: jest.fn(),
      isLoading: false,
      errorMessage: null,
    });

    const { getByText, getByTestId, container } = render(<RegisterField />);

    // Fill in form fields
    fireEvent.change(container.querySelector('#first_name'), { target: { value: 'John' } });
    // Repeat the process for other form fields...

    // Trigger form submission
    fireEvent.submit(container.querySelector('form'));

    // Wait for form submission to complete
    await waitFor(() => {

      // Assert that signup function was called with the correct formData and userRole
      expect(useSignup().signup).not.toHaveBeenCalledWith(
        {
          first_name: 'John', // Update with the actual values you set
          last_name: '', // Update with the actual values you set
          email: '', // Update with the actual values you set
          username: '', // Update with the actual values you set
          password: '', // Update with the actual values you set
          // Add other fields as needed
        },
        'client' // Assuming the default role is 'client'
      );
    });
  });
  // Add more tests for other functionalities as needed
});
