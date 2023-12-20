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
    // You can add more tests as needed
  });
