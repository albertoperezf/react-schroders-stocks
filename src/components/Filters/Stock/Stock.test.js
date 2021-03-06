// Dependencies
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

// Components
import Stock from "./Stock";

describe('Stock Component', () => {
    const mockData = {
        currency: "USD",
        description: "DAY TRADEXCHANGE INC",
        displaySymbol: "SYNJ",
        figi: "BBG000P12GR2",
        mic: "OOTC",
        symbol: "SYNJ",
        type: "Common Stock",
    };
    const mockFn = jest.fn();
    const history = createMemoryHistory();
    const renderStock = (disabled, isSelected) => <Router history={history}>
        <Stock data={mockData} disabled={disabled} onChange={mockFn} isSelected={isSelected} />
    </Router>;

    test('renders the Stock component', () => {
        render(renderStock(false, false));
        expect(screen.getByRole('listitem')).toBeInTheDocument();
        expect(screen.getByRole('paragraph')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
        fireEvent.click(screen.getByRole('checkbox'), { target: { checked: true } });
        expect(mockFn).toHaveBeenCalledTimes(1);
        fireEvent.change(screen.getByRole('checkbox'), { target: { checked: true } });
        expect(screen.getByRole('checkbox')).toBeChecked();
    });

    test('renders the Stock component disabled', () => {
        render(renderStock(true, false));
        expect(screen.getByRole('listitem')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeDisabled();
        expect(screen.getByRole('paragraph')).toBeInTheDocument();
    });

    test('renders the Stock component when is selected', () => {
        render(renderStock(false, true));
        expect(screen.getByRole('listitem')).toBeInTheDocument();
        expect(screen.getByRole('paragraph')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeChecked();
        fireEvent.change(screen.getByRole('checkbox'), { target: { checked: false } });
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });
});
