import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CoachNavbar from '../src/components/CoachSearch/CoachNavbar';

// Mock the functions passed as props
const mockHandleChange = jest.fn();
const mockHandleSubmit = jest.fn();
const mockHandleModalShow = jest.fn();
const mockHandleSortChange = jest.fn();
const mockGetSortDirectionIcon = jest.fn();

const searchParams = {
  name: 'John Doe', // Set initial values as needed
};

describe('CoachNavbar', () => {
  it('renders CoachNavbar component correctly', () => {
    render(
      <CoachNavbar
        searchParams={searchParams}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        handleModalShow={mockHandleModalShow}
        handleSortChange={mockHandleSortChange}
        getSortDirectionIcon={mockGetSortDirectionIcon}
      />
    );

    // Check if the component renders correctly
    expect(screen.getByText('Personal Trainers')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by name...')).toBeInTheDocument();
    // Add more assertions based on your component structure
  });

  it('calls handleChange when input value changes', () => {
    render(
      <CoachNavbar
        searchParams={searchParams}
        handleChange={mockHandleChange}
        handleSubmit={mockHandleSubmit}
        handleModalShow={mockHandleModalShow}
        handleSortChange={mockHandleSortChange}
        getSortDirectionIcon={mockGetSortDirectionIcon}
      />
    );

    // Simulate a change event on the input field
    fireEvent.change(screen.getByPlaceholderText('Search by name...'), { target: { value: 'New Name' } });

    // Check if handleChange is called with the correct value
    expect(mockHandleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'New Name' } }));
  });
});
