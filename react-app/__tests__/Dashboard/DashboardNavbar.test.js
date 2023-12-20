import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardNavbar from '../../src/components/Dashboard/DashboardNavbar';

// Mock the function passed as a prop
const mockOnTabSelect = jest.fn();

describe('DashboardNavbar', () => {
  it('renders correctly with default values', () => {
    const { getByText } = render(
      <DashboardNavbar onTabSelect={mockOnTabSelect} isDisabled={false} currentTab="weeklyView" userRole="user" />
    );

    // Use toHaveClass from jest-dom
    expect(getByText('This Week')).toHaveClass('active');
  });

  it('handles tab selection correctly', () => {
    const { getByText } = render(
      <DashboardNavbar onTabSelect={mockOnTabSelect} isDisabled={false} currentTab="weeklyView" userRole="user" />
    );

    fireEvent.click(getByText('Statistics'));

    // Check if onTabSelect is called with the correct argument
    expect(mockOnTabSelect).toHaveBeenCalledWith('statisticsView');
  });

  it('disables tabs when isDisabled is true', () => {
    const { getByText } = render(
      <DashboardNavbar onTabSelect={() => {}} isDisabled={true} currentTab="weeklyView" userRole="admin" />
    );
  
    // Ensure that all tabs have the 'disabled' attribute
    expect(getByText('Your Clients')).toHaveAttribute('disabled');
    expect(getByText('This Week')).toHaveAttribute('disabled');
    expect(getByText('Statistics')).toHaveAttribute('disabled');
    expect(getByText('Daily Survey')).toHaveAttribute('disabled');
  });
  
});
