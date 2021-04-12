// Dependencies
import { createStore, StoreProvider } from "easy-peasy";
import React from 'react';
import { render, screen } from '@testing-library/react';

// Components
import Filters from "./Filters";

// State Management
import Stores from "../../redux/Stores";

const store = createStore(Stores);

describe('Filters Component', () => {
    const component = () => render(<StoreProvider store={store}><Filters /></StoreProvider>);

    test('Check content before fetch', () => {
        component();

        expect(screen.getByRole('document')).toBeInTheDocument();
        expect(screen.getByText(/Loading Stocks Information.../)).toBeInTheDocument();
        expect(screen.getByRole('document')).toBeInTheDocument();
        expect(screen.queryByText('heading')).toBeNull();
        expect(screen.queryByText('list')).toBeNull();
    });

    // test('Checks component after fetch', async () => {
    //     component();
    //
    //     await screen.debug();
    //
    //     expect(screen.getByRole('document')).toBeInTheDocument();
    //     expect(await screen.findByRole('heading')).toBeInTheDocument();
    //     expect(await screen.findByRole('list')).toBeInTheDocument();
    // });
});