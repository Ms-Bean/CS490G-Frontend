// AcceptCoach.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // for toHaveTextContent

import AcceptCoach from '../../src/components/Admin/AcceptCoach';

describe('AcceptCoach component', () => {
    it('renders without crashing', () => {
      render(<AcceptCoach />);
      expect(screen.getByText('Accept')).toBeInTheDocument();
    });
    // You can add more tests as needed
  });
