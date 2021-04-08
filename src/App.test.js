// Dependencies
import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import App from './App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
});