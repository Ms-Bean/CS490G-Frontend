import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RejectCoach from '../../src/components/Admin/RejectCoach';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe('RejectCoach', () => {
  it('renders without crashing', () => {
    render(<RejectCoach />);
  });

  it('displays modal when "Reject" button is clicked', async () => {
    const { getByText, getByTestId } = render(<RejectCoach user_id="123" firstName="John" />);
    
    fireEvent.click(getByText('Reject'));

    // Wait for the modal to be visible
    await waitFor(() => {
        expect(queryByText(/Are you sure you want to reject coach "John"?/i)).toBeInTheDocument();
        expect(getByText(/This action cannot be undone/i)).toBeInTheDocument();
    });
  });

  it('calls the handleRejectCoach function when "Reject" button in the modal is clicked', async () => {
    const handleUploadSuccessChange = jest.fn();

    const { getByText, getByTestId } = render(
      <RejectCoach user_id="123" firstName="John" handleUploadSuccessChange={handleUploadSuccessChange} />
    );

    fireEvent.click(getByText('Reject'));

    expect(handleUploadSuccessChange).toHaveBeenCalled();
    
  });
});
