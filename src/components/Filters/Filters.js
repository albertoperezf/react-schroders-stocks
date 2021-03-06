// Dependencies
import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from "react";

// Components
import Stock from "./Stock/Stock";

// Utilities
import { GetStocksUSDetails } from "../../services/stocksAPI";

// Styles
import './Filters.css';

/**
 * Filters - Manage the filtering part of the Stock App
 * @return {*}
 * @constructor
 */
export default function Filters() {
    const selected = useStoreState((state) => state.StocksModel.selectedStocks);
    const setSelected = useStoreActions((actions) => actions.StocksModel.HandleSetSelectedStock);
    const marketInfo = useStoreState((state) => state.StocksModel.marketInfo);
    const setMarketInfo = useStoreActions((actions) => actions.StocksModel.HandleSetMarketInfo);
    const filters = useStoreState((state) => state.StocksModel.filters);
    const setFilters = useStoreActions((actions) => actions.StocksModel.HandleSetFilter);
    const graphInfo = useStoreState((state) => state.StocksModel.graphInfo);
    const clearGraphInfo = useStoreActions((actions) => actions.StocksModel.HandleClearGraphInfo);
    const loadGraphInfo = useStoreActions((actions) => actions.StocksModel.HandleLoadSelectedPropertiesData);

    useEffect(() => {
        // When the app mount, get the information for stocks of the US Market if we don't have one yet
        if (!marketInfo) {
            GetStocksUSDetails()
                .then((response) => {
                    if (response) {
                        // Reduce the amount of results to only a few
                        if (response.length > 1000) {
                            setMarketInfo(response.slice(0, 1000));
                        } else {
                            setMarketInfo(response);
                        }
                    }
                })
                .catch(err => console.error(err));
        }

        // return () => {
        //     console.log('clear'); // TODO: REMOVE CONSOLE
        //     setMarketInfo([]);
        // };
    }, []);

    useEffect(() => {
        update();
    }, [filters]);

    const update = () => {
        if (graphInfo) {
            // eslint-disable-next-line array-callback-return
            Object.keys(graphInfo).map(key => {
                const s = marketInfo.find(item => item.symbol === key);

                handleCheckChange(s, false, false);
            });
        }
    };

    /**
     * Handle change for the Start Date input
     * @param {String} value - Value of the start date selected by the user
     * @return {*}
     */
    const handleStartDateChange = ({ target: { value } }) => setFilters({ ...filters, startDate: value });

    /**
     * Handle change for the End Date input
     * @param {String} value - Value of the end date selected by the user
     * @return {*}
     */
    const handleEndDateChange = ({ target: { value } }) => setFilters({ ...filters, endDate: value });

    /**
     * Handle change for the Search input
     * @param {String} value - Value of the search perform by the user
     * @return {*}
     */
    const handleSearchChange = ({ target: { value } }) => setFilters({ ...filters, search: value });

    /**
     * Handle change for the Stock's checkbox
     * @param {Object} data - Information about the Stock selected
     * @param {Boolean} isSelected - Indicates if the item is selected or not
     * @param {Boolean} mustUpdate - Indicates if the action must update the Graph
     */
    const handleCheckChange = (data, isSelected, mustUpdate = true) => {
        const parseDate = date => Math.round((new Date(date)).getTime() / 1000);
        const end = parseDate(filters.endDate);
        const start = parseDate(filters.startDate);

        if (data) {
            if (mustUpdate) {
                setSelected(data);
            }

            if (!isSelected) {
                // Get information for the graph
                loadGraphInfo({ symbol: data.symbol, start, end });
            } else {
                clearGraphInfo(data.symbol);
            }
        }
    };

    /**
     * Handle the cleaning of the information on the Filters and the Graph
     * @return {*}
     */
    const handleClear = () => {
        // Reset filters to original state
        setFilters({ endDate: '2021-01-31', search: '', startDate: '2021-01-01', });
        // Clear Current Graph and selection info
        // eslint-disable-next-line array-callback-return
        Object.keys(selected).map(key => {
            setSelected({ symbol: key });
            clearGraphInfo(key);
        });
    };

    /**
     * Renders and Stock item on the page
     * @param {Object} stock - Data of the Stock to render
     * @return {*}
     */
    const renderStock = stock => {
        const isSelected = !!selected[stock.symbol];
        const disabled = Object.keys(selected).length >= 3 && !isSelected;

        return <Stock data={stock} disabled={disabled} isSelected={isSelected} key={stock.symbol} onChange={handleCheckChange} />;
    };

    return (
        <div className='filters' role='document'>
            {marketInfo
                ? <div className='filters-container'>
                    <div className='filters-list' role='list'>
                        {marketInfo.length > 0
                            ? filters.search !== ''
                                ? marketInfo
                                    .filter(stock => stock.description.toLowerCase().includes(filters.search) || stock.symbol.toLowerCase().includes(filters.search))
                                    .map(stock => renderStock(stock))
                                : marketInfo.map(stock => renderStock(stock))
                            : <></>
                        }
                    </div>

                    <div className='filters-date'>
                        <label className='filters-input' htmlFor="search">
                            Search Stock:
                            <input id='search' onChange={handleSearchChange} placeholder='by Symbol or Company' type="search" value={filters.search}/>
                        </label>

                        <label className='filters-input' htmlFor="start">
                            Start Date:
                            <input id='start' onChange={handleStartDateChange} type="date" value={filters.startDate}/>
                        </label>

                        <label className='filters-input' htmlFor="end">
                            End Date:
                            <input id='end' onChange={handleEndDateChange} type="date" value={filters.endDate}/>
                        </label>

                        <label className='filters-input' htmlFor="clear">
                            <input id='clear' onClick={handleClear} type="button" value='Clear Filters'/>
                        </label>
                    </div>
                </div>
                : <div>Loading Stocks Information...</div>
            }
        </div>
    );
}