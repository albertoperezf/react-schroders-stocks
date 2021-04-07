// Dependencies
import { createStore, StoreProvider } from "easy-peasy";
import React from 'react';
import { render, screen } from '@testing-library/react';
import Stores from "../../redux/Stores";

// Components
import Filters from "./Filters";

const store = createStore(Stores);

it('renders without crashing', () => {
    render(<StoreProvider store={store}><Filters /></StoreProvider>);
    //
    // screen.debug();
});