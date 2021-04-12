// Dependencies
import React from "react";

// Components
import Filters from "../Filters/Filters";
import Graph from "../Graph/Graph";

/**
 * StocksDetails - Display details about companies selected by the user and it's Time Series
 * @return {*}
 * @constructor
 */
export default function StocksDetails() {
    return <>
        <Filters />

        <Graph />
    </>;
}