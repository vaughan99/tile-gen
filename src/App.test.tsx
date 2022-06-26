import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders learn react link', () => {
  render(<App />);
  const searchText = screen.getByText(/Tile Generator/i);
  expect(searchText).toBeInTheDocument();
});
