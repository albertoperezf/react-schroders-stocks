// Dependencies
import { createStore, StoreProvider } from "easy-peasy";
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

// Components
import CompanyDetails from "./CompanyDetails";

// State Management
import Stores from "../../redux/Stores";

const store = createStore(Stores);

describe('App Component', () => {
    test('renders without crashing', () => {
        const history = createMemoryHistory();

        render(<StoreProvider store={store}>
            <Router history={history}>
                <CompanyDetails />
            </Router>
        </StoreProvider>);

        screen.debug();

        // expect(screen.getAllByRole('document')).toHaveLength(2);
    });
});