import { APIFetch } from './methods';

const ACCESS_TOKEN = 'c1i32dv48v6sod8lqatg';
// const ACCESS_TOKEN_SANDBOX = 'sandbox_c1i32dv48v6sod8lqau0';

/**
 * Get all the Stock list on the US market
 * @return {Promise<unknown>}
 * @constructor
 */
export function GetStocksUSDetails() {
    const endpoint = `https://finnhub.io/api/v1/stock/symbol?exchange=US&limit=100&token=${ACCESS_TOKEN}`;

    return APIFetch(endpoint);
}

/**
 * Get the information about a single company
 * @param {String} company - Name of the company to look for
 * @return {*}
 * @constructor
 */
export function GetCompanyDetails(company) {
    const endpoint = `https://finnhub.io/api/v1/search?q=${company}&token=${ACCESS_TOKEN}`;

    return APIFetch(endpoint);
}

/**
 * Get the information about the candlestick for a single company
 * @param {String} company - Name of the company to look for
 * @param {String} end - End date on milliseconds
 * @param {String} start - Start date on milliseconds
 * @return {*}
 * @constructor
 */
export function GetCompanyCandle(company, start, end) {
    const endpoint = `https://finnhub.io/api/v1/stock/candle?symbol=${company}&resolution=1&from=${start}&to=${end}&token=${ACCESS_TOKEN}`;

    return APIFetch(endpoint);
}
