// CoachCard.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import CoachCard from '../path-to-your-app/CoachCard';

test('renders CoachCard component', () => {
  const coach = {
    personal_info: { first_name: 'John', last_name: 'Doe' },
    professional_info: {
      experience_level: 5,
      hourly_rate: 50.0,
      accepting_new_clients: true,
      coaching_history: 'Lorem ipsum dolor sit amet.',
    },
  };

  render(<CoachCard coach={coach} />);

  // Add your assertions based on the rendered content
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('Experience: 5 years')).toBeInTheDocument();
  expect(screen.getByText('Hourly Rate: $50.00')).toBeInTheDocument();
  expect(screen.getByText('Accepting New Clients: Yes')).toBeInTheDocument();
  expect(screen.getByText('Coaching History: Lorem ipsum dolor sit amet.')).toBeInTheDocument();
});