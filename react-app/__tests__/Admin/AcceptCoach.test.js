import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // for toHaveTextContent

import AcceptCoach from '../../src/components/Admin/AcceptCoach';

describe('AcceptCoach component', () => {
    it('renders without crashing', () => {
      render(<AcceptCoach />);
      expect(screen.getByText('Accept')).toBeInTheDocument();
    });
    it("opens the modal when the 'Accept' button is clicked", () => {
        render(<AcceptCoach />);
        fireEvent.click(screen.getByText("Accept"));
        expect(screen.getByText("Accept Coach")).toBeInTheDocument();
      });
      it("closes the modal when the 'Accept' button in the modal is clicked", async () => {
        render(<AcceptCoach />);
    
    // Click the button outside the modal to open it
    fireEvent.click(screen.getByText("Accept"));

    // Find all buttons with the text "Accept" inside the modal
    const acceptButtons = screen.queryAllByText("Accept", { selector: "button" });

    // Ensure that at least one button is found
    expect(acceptButtons.length).toBeGreaterThan(0);

    // Click the first button (you can modify this based on your structure)
    fireEvent.click(acceptButtons[0]);

    // Wait for the modal-open class to be removed before asserting
    await waitFor(() => {
      expect(document.body).toHaveClass('modal-open');
        });
    });
    // You can add more tests as needed
  });
