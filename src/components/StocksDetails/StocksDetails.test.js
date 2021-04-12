// Dependencies
import { createStore, StoreProvider } from "easy-peasy";
import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import StocksDetails from "./StocksDetails";

// State Management
import Stores from "../../redux/Stores";

const store = createStore(Stores);

describe('App Component', () => {
    test('renders without crashing', () => {
        render(<StoreProvider store={store}><StocksDetails /></StoreProvider>);

        expect(screen.getAllByRole('document')).toHaveLength(2);
    });
});