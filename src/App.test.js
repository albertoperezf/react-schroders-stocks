// Dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import App from './App';

it('renders without crashing', () => {
  render(<App />);

  screen.debug();
});