// Dependencies
import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from "react";

// Components
import Stock from "./Stock/Stock";

// Utilities
import { GetStocksUSDetails } from "../../services/stocksAPI";

/**
 * Filters - Manage the filtering part of the Stock App
 * @return {*}
 * @constructor
 */
export default function Filters() {
    const selected = useStoreState((state) => state.StocksModel.selectedStocks);
    const setStock = useStoreActions((actions) => actions.StocksModel.HandleSetSelectedStock);
    const marketInfo = useStoreState((state) => state.StocksModel.marketInfo);
    const setMarketInfo = useStoreActions((actions) => actions.StocksModel.HandleSetMarketInfo);
    const filters = useStoreState((state) => state.StocksModel.filters);
    const setFilters = useStoreActions((actions) => actions.StocksModel.HandleSetFilter);
    const loading = useStoreState((state) => state.StocksModel.loading);
    const setLoading = useStoreActions((actions) => actions.StocksModel.HandleSetLoading);
    const loadGraphInfo = useStoreActions((actions) => actions.StocksModel.HandleLoadSelectedPropertiesData);
    const setGraphInfo = useStoreActions((actions) => actions.StocksModel.HandleSetGraphInfo);

    useEffect(() => {
        setLoading(true);

        // When the app mount, get the information for stocks of the US Market
        GetStocksUSDetails()
            .then((response) => {
                if (response) {
                    if (response.length > 10) {
                        setMarketInfo(response.slice(0, 10))
                    } else {
                        setMarketInfo(response);
                    }
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));

        setLoading(false);
    }, []);

    const handleStartDateChange = ({ target: { value } }) => setFilters({ ...filters, startDate: value });

    const handleEndDateChange = ({ target: { value } }) => setFilters({ ...filters, endDate: value });

    const handleCheckChange = (data, isSelected) => {
        const parseDate = date => Math.round((new Date(date)).getTime() / 1000);
        const end = parseDate(filters.endDate);
        const start = parseDate(filters.startDate);

        if (data) {
            setStock(data);

            if (!isSelected) {
                // Get information for the graph
                loadGraphInfo({ symbol: data.symbol, start, end });
            } else {
                setGraphInfo({ symbol: data.symbol, candle: {} });
            }
        }
    };

    return (
        <div className='App-stocks'>
            <h1 className='App-stocks-title'>Select up to three (3) stocks to check it's Time Series</h1>

            {loading
                ? 'Loading Stocks Information...'
                : <div className='App-stocks-selection'>
                    <div className='stocks-selection'>
                        {marketInfo.length !== 0
                            ?  marketInfo.map(stock => {
                                const isSelected = !!selected[stock.symbol];
                                const disabled = Object.keys(selected).length >= 3 && !isSelected;

                                return <Stock data={stock} disabled={disabled} isSelected={isSelected} key={stock.symbol} onChange={handleCheckChange} />;
                            })
                            : <></>
                        }
                    </div>

                    <div className='date-selection'>
                        <label className='date-label' htmlFor="start">
                            Start Date:
                            <input id='start' onChange={handleStartDateChange} type="date" value={filters.startDate}/>
                        </label>

                        <label className='date-label' htmlFor="end">
                            End Date:
                            <input id='end' onChange={handleEndDateChange} type="date" value={filters.endDate}/>
                        </label>
                    </div>
                </div>
            }
        </div>
    );
}