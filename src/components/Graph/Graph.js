// Dependencies
import { useStoreState } from 'easy-peasy';
import React from "react";

/**
 * Graph - Component to show the time series for the selected stocks
 * @return {*}
 * @constructor
 */
export default function Graph() {
    const loading = useStoreState((state) => state.StocksModel.loading);
    // const setLoading = useStoreActions((actions) => actions.StocksModel.HandleSetLoading);
    const graphInfo = useStoreState((state) => state.StocksModel.graphInfo);

    console.log('Info: ', graphInfo); // TODO: REMOVE CONSOLE

    return loading ? 'Loading Stock Graph...' : <header className="App-graph">
        <p>Graph!</p>
    </header>;
}