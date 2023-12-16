// ExerciseCard.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseCard from '../src/components/Exercises/ExerciseCard.js';
import { ExerciseContext } from '../src/context/exerciseContext';

// Mock the context value
jest.mock('../src/context/exerciseContext', () => ({
  ExerciseContext: {
    handleInfoOrEdit: jest.fn(),
  },
}));

describe('ExerciseCard component', () => {
  // Reset the mock before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ExerciseCard component', () => {
    const exercise = {
      name: 'Sample Exercise',
    };

    render(<ExerciseCard exercise={exercise} isAdmin={false} />);

    // Add your assertions based on the rendered content
    expect(screen.getByText('Sample Exercise')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  test('renders ExerciseCard component with "Edit" button for admin', () => {
    const exercise = {
      name: 'Sample Exercise',
    };

    render(<ExerciseCard exercise={exercise} isAdmin={true} />);

    // Add your assertions based on the rendered content
    expect(screen.getByText('Sample Exercise')).toBeInTheDocument();
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
  });

  test('calls handleInfoOrEdit with "view" when "Info" button is clicked', () => {
    const exercise = {
      name: 'Sample Exercise',
    };

    render(<ExerciseCard exercise={exercise} isAdmin={false} />);

    // Trigger the click event on the "Info" button
    fireEvent.click(screen.getByText('Info'));

    // Check if handleInfoOrEdit was called with the correct arguments
    expect(ExerciseContext.handleInfoOrEdit).toHaveBeenCalledWith(exercise, 'view');
  });

  test('calls handleInfoOrEdit with "edit" when "Edit" button is clicked for admin', () => {
    const exercise = {
      name: 'Sample Exercise',
    };

    render(<ExerciseCard exercise={exercise} isAdmin={true} />);

    // Trigger the click event on the "Edit" button
    fireEvent.click(screen.getByText('Edit'));

    // Check if handleInfoOrEdit was called with the correct arguments
    expect(ExerciseContext.handleInfoOrEdit).toHaveBeenCalledWith(exercise, 'edit');
  });
});
