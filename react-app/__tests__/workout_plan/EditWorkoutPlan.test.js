import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditWorkoutPlan from '../../src/components/WorkoutPlan/EditWorkoutPlan'; // Update the path accordingly
import { useAuth } from '../../src/hooks/useAuth';

// Mocking useAuth hook
jest.mock('../../src/hooks/useAuth');

// Mocking fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
  })
);

describe('EditWorkoutPlan', () => {
  const mockUseAuth = {
    user: {
      user_id: 1,
    },
  };

  useAuth.mockReturnValue(mockUseAuth);

  const handleClose = jest.fn();
  const handleUploadSuccessChange = jest.fn();

  it('renders EditWorkoutPlan component with default values', () => {
    render(
      <EditWorkoutPlan
        workoutPlanName="Test Workout Plan"
        workoutPlanId={1}
        handleUploadSuccessChange={handleUploadSuccessChange}
        show={true}
        handleClose={handleClose}
      />
    );

    // Your assertions here, e.g., check if the Save Changes button is present
    expect(screen.getByText(/Save Changes/i)).toBeInTheDocument();
  });

  it('handles save button click correctly', async () => {
    render(
      <EditWorkoutPlan
        workoutPlanName="Test Workout Plan"
        workoutPlanId={1}
        handleUploadSuccessChange={handleUploadSuccessChange}
        show={true}
        handleClose={handleClose}
      />
    );

    // Trigger the save button click
    fireEvent.click(screen.getByText(/Save Changes/i));

    // Wait for the async operations to complete
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
      expect(handleUploadSuccessChange).toHaveBeenCalled();
    });

    // Your additional assertions here, e.g., check if the resetSession function is called
  });
});
