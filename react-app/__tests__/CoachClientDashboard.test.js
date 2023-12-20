import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CoachClientDashboard from '../src/components/CoachClientDashboard'; // Replace with the correct path

test('renders "Your Clients"', () => {
    // Render the component inside a Router wrapper
    render(
      <Router>
        <CoachClientDashboard />
      </Router>
    );
  
    // Assert that "Your Clients" is present on the page
    expect(screen.getByText('Your Clients')).toBeInTheDocument();
  });
  test('renders "Pending Clients"', () => {
    // Render the component inside a Router wrapper
    render(
      <Router>
        <CoachClientDashboard />
      </Router>
    );
  
    // Assert that "Your Clients" is present on the page
    expect(screen.getByText('Pending Clients')).toBeInTheDocument();
  });