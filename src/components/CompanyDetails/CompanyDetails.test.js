// Dependencies
import { createStore, StoreProvider } from "easy-peasy";
import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import CompanyDetails from "./CompanyDetails";

// State Management
import Stores from "../../redux/Stores";

const store = createStore(Stores);

describe('App Component', () => {
    test('renders without crashing', () => {
        render(<StoreProvider store={store}><CompanyDetails /></StoreProvider>);

        screen.debug();
        // expect(screen.getAllByRole('document')).toHaveLength(2);
    });
});