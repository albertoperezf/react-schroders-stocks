// Dependencies
import { action, thunk } from "easy-peasy";

// API calls
import { GetCompanyCandle } from "../services/stocksAPI";

const StocksModel = {
    marketInfo: [],
    filters: {
        endDate: '2021-01-31', startDate: '2021-01-01'
    },
    loading: false,
    selectedStocks: {},
    graphInfo: {},

    HandleSetMarketInfo: action((state, value) => {
        state.marketInfo = value;
    }),
    HandleSetFilter: action((state, value) => {
        state.filters = value;
    }),
    HandleSetLoading: action((state, value) => {
        state.loading = value;
    }),
    HandleSetSelectedStock: action((state, value) => {
        const { symbol } = value;

        if (state.selectedStocks[symbol]) {
            delete state.selectedStocks[symbol];
        } else {
            state.selectedStocks[symbol] = value;
        }
    }),
    HandleLoadSelectedPropertiesData: thunk(async (actions, payload, { getState }) => {
        const { symbol, start, end } = payload;
        const candle = await GetCompanyCandle(symbol, start, end);

        console.log('Symbol: ', symbol); // TODO: REMOVE CONSOLE
        console.log('Candle: ', candle); // TODO: REMOVE CONSOLE

        actions.HandleSetGraphInfo({ symbol, candle });
    }),
    HandleSetGraphInfo: action((state, value) => {
        const { symbol, candle } = value;

        if (state.graphInfo[symbol]) {
            delete state.graphInfo[symbol];
        } else {
            state.graphInfo[symbol] = candle;
        }
    }),
}


export default StocksModel;