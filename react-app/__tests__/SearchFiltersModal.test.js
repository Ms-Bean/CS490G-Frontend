// SearchFiltersModal.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFiltersModal from '../src/components/CoachSearch/SearchFiltersModal';

test('renders SearchFiltersModal component', () => {
  const handleClose = jest.fn();
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const searchParams = {
    name: 'John',
    minHourlyRate: 20,
    maxHourlyRate: 80,
    minExperience: 2,
    maxExperience: 10,
    acceptingNewClients: true,
  };

  render(
    <SearchFiltersModal
      show={true}
      handleClose={handleClose}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      searchParams={searchParams}
    />
  );

  // Add your assertions based on the rendered content
  expect(screen.getByText('Filters')).toBeInTheDocument();
  expect(screen.getByLabelText('Name')).toHaveValue('John');
  expect(screen.getByPlaceholderText('Min Hourly Rate')).toHaveValue('20');
  expect(screen.getByPlaceholderText('Max Hourly Rate')).toHaveValue('80');
  // Add more assertions as needed
});

// You can add more tests for interactions, e.g., submitting the form
test('calls handleSubmit when the form is submitted', () => {
  const handleSubmit = jest.fn();
  const { getByTestId } = render(
    <SearchFiltersModal show={true} handleClose={() => {}} handleChange={() => {}} handleSubmit={handleSubmit} searchParams={{}} />
  );

  fireEvent.submit(getByTestId('search-filters-form'));
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});