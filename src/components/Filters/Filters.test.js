// Dependencies
import { createStore, StoreProvider } from "easy-peasy";
import React from 'react';
import { render, screen } from '@testing-library/react';
import Stores from "../../redux/Stores";

// Components
import Filters from "./Filters";

const store = createStore(Stores);

describe('Filters Component', () => {
    test('renders without crashing', async () => {
        render(<StoreProvider store={store}><Filters /></StoreProvider>);

        expect(screen.getByRole('document')).toBeInTheDocument();
        expect(screen.getByRole('heading')).toBeInTheDocument();
        expect(screen.getByText(/Loading Stocks Information.../)).toBeInTheDocument();

        // expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
    });
});