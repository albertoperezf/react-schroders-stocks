// Dependencies
import { action, thunk } from "easy-peasy";

// API calls
import { GetCompanyCandle } from "../services/stocksAPI";

const StocksModel = {
    marketInfo: null,
    filters: {
        endDate: '2021-01-31',
        search: '',
        startDate: '2021-01-01',
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

        actions.HandleSetGraphInfo({ symbol, candle });
    }),
    HandleSetGraphInfo: action((state, value) => {
        const { symbol, candle } = value;
        const transformData = data => {
            if (data && data.c && data.o) {
                return data.c.map((item, index) => ({
                    close: Number(item).toFixed(2),
                    open: Number(data.o[index]).toFixed(2),
                    high: Number(data.h[index]).toFixed(2),
                    low: Number(data.l[index]).toFixed(2),
                    timestamp: new Date(data.t[index] * 1000).toLocaleDateString()
                }))
            }
        }
        // Parse Values to be shown
        const parseCandle = transformData(candle);

        state.graphInfo[symbol] = parseCandle;
    }),
    HandleClearGraphInfo: action((state, value) => {
        delete state.graphInfo[value];
    })
}


export default StocksModel;