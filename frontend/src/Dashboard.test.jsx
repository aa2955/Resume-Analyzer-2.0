import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../Dashboard'; // Adjust the path as per your structure

test('renders correct fit score visualization', () => {
  render(<Dashboard />);
  const progressBar = screen.getByText(/50%/); // Example score
  expect(progressBar).toBeInTheDocument();
});

test('renders feedback items correctly', () => {
  const feedback = { skills: ['Skill 1', 'Skill 2'], experience: [] };
  render(<Dashboard improvementSuggestions={feedback} />);
  const feedbackItems = screen.getAllByRole('listitem');
  expect(feedbackItems).toHaveLength(2);
});

test('filters feedback based on selected category', () => {
  const feedback = {
    skills: ['Skill A'],
    experience: ['Experience A'],
  };
  render(<Dashboard improvementSuggestions={feedback} />);
  const select = screen.getByLabelText(/Filter Feedback by Category:/i);
  fireEvent.change(select, { target: { value: 'skills' } });
  const feedbackItems = screen.getAllByRole('listitem');
  expect(feedbackItems).toHaveLength(1);
  expect(feedbackItems[0]).toHaveTextContent('Skill A');
});
