import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchFiltersModal from '../../src/components/CoachSearch/SearchFiltersModal';

describe('SearchFiltersModal', () => {
  const mockSearchParams = {
    name: '',
    minHourlyRate: '',
    maxHourlyRate: '',
    minExperience: '',
    maxExperience: '',
    acceptingNewClients: false,
  };

  it('renders with default values', () => {
    const { getByLabelText, getByText } = render(
      <SearchFiltersModal
        show={true}
        handleClose={() => {}}
        searchParams={mockSearchParams}
        handleChange={() => {}}
        handleSubmit={() => {}}
      />
    );

    expect(getByLabelText(/Name/i).value).toBe('');
    expect(getByLabelText(/Min Hourly Rate/i).value).toBe('');
    expect(getByLabelText(/Max Hourly Rate/i).value).toBe('');
    expect(getByLabelText(/Min Experience/i).value).toBe('');
    expect(getByLabelText(/Max Experience/i).value).toBe('');
    expect(getByLabelText(/Show only coaches accepting new clients/i).checked).toBe(false);
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });


  it('updates input values correctly', () => {
    const handleChange = jest.fn();
    const { getByLabelText } = render(
      <SearchFiltersModal
        show={true}
        handleClose={() => {}}
        searchParams={mockSearchParams}
        handleChange={handleChange}
        handleSubmit={() => {}}
      />
    );

    fireEvent.change(getByLabelText(/Name/i), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText(/Min Hourly Rate/i), { target: { value: '20' } });
    fireEvent.change(getByLabelText(/Max Hourly Rate/i), { target: { value: '50' } });
    fireEvent.change(getByLabelText(/Min Experience/i), { target: { value: '2' } });
    fireEvent.change(getByLabelText(/Max Experience/i), { target: { value: '5' } });
    fireEvent.click(getByLabelText(/Show only coaches accepting new clients/i));

    expect(handleChange).toHaveBeenCalledTimes(6);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('submits the form correctly', () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(
      <SearchFiltersModal
        show={true}
        handleClose={() => {}}
        searchParams={mockSearchParams}
        handleChange={() => {}}
        handleSubmit={handleSubmit}
      />
    );

    fireEvent.submit(getByText(/Submit/i));


    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
