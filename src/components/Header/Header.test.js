// Dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

// Components
import Header from './Header';

describe('Header Component', () => {
    test('renders <Header> component', () => {
        const history = createMemoryHistory();

        render(<Router history={history}>
            <Header />
        </Router>);

        const header = screen.getByText(/Company Details/i);
        expect(header).toBeInTheDocument();
    });
});