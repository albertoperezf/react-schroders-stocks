// Dependencies
import { createStore, StoreProvider } from "easy-peasy";
import React from 'react';
import { render, screen } from '@testing-library/react';
import Stores from "../../redux/Stores";

// Components
import Graph from "./Graph";

const store = createStore(Stores);

describe('Graph Component', () => {
    test('renders without crashing', async () => {
        render(<StoreProvider store={store}><Graph /></StoreProvider>);

        expect(screen.getByRole('document')).toBeInTheDocument();
        expect(screen.getByText(/Select a Stock to display the Graph/)).toBeInTheDocument();
    });
});