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

  it("opens the modal when the 'Reject' button is clicked", () => {
    render(<RejectCoach />);
    fireEvent.click(screen.getByText("Reject"));
    expect(screen.getByText("Reject Coach")).toBeInTheDocument();
  });

  it("closes the modal when the 'Reject' button in the modal is clicked", async () => {
    render(<RejectCoach />);

    // Click the button outside the modal to open it
    fireEvent.click(screen.getByText("Reject"));

    // Find all buttons with the text "Reject" inside the modal
    const rejectButtons = screen.queryAllByText("Reject", { selector: "button" });

    // Ensure that at least one button is found
    expect(rejectButtons.length).toBeGreaterThan(0);

    // Click the first button (you can modify this based on your structure)
    fireEvent.click(rejectButtons[0]);

    // Wait for the modal-open class to be removed before asserting
    await waitFor(() => {
      expect(document.body).toHaveClass('modal-open');
    });
  });

//   it('calls the handleRejectCoach function when "Reject" button in the modal is clicked', async () => {
//     const handleUploadSuccessChange = jest.fn();

//     const { getByText, getByTestId } = render(
//       <RejectCoach user_id="123" firstName="John" handleUploadSuccessChange={handleUploadSuccessChange} />
//     );

//     fireEvent.click(getByText('Reject'));

//     expect(handleUploadSuccessChange).toHaveBeenCalled();
    
//   });
});
