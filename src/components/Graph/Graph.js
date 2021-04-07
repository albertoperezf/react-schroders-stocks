// Dependencies
import { useStoreState } from 'easy-peasy';
import React, { useState } from "react";
import { CartesianGrid, Legend, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';


/**
 * Graph - Component to show the time series for the selected stocks
 * @return {*}
 * @constructor
 */
export default function Graph() {
    const loading = useStoreState((state) => state.StocksModel.loading);
    const graphInfo = useStoreState((state) => state.StocksModel.graphInfo);
    const [legendFilters, setLegendFilters] = useState({ open: true, close: true, high: true, low: true });
    const hasSelected = Object.keys(graphInfo);
    const width = window.innerWidth - 100;

    const handleLegendClick = e => {
        const parse = e.dataKey.trim();

        setLegendFilters({ ...legendFilters, [parse]: !legendFilters[parse] })
    };

    return loading
        ? 'Loading Stock Graph...'
        : <div className="App-graph">
            {hasSelected.length === 0
                ? <p>Select a Stock to display the Graph</p>
                : <p>Currently Selected: {hasSelected.toString()}</p>
            }

            {hasSelected.length > 0 &&
                <LineChart width={width} height={500} data={graphInfo[hasSelected[0]]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="timestamp" />

                    <YAxis type="number" allowDecimals={true} allowDataOverflow={true} />

                    <Tooltip />

                    <Legend onClick={handleLegendClick} />

                    {hasSelected.map(key => {
                        return <Line key={`${key}-open`} data={graphInfo[key]} type="monotone" dataKey={`open${legendFilters.open ? '' : ' '}`} stroke="blue" dot={false} />;
                    })}

                    {hasSelected.map(key => {
                        return <Line key={`${key}-close`} data={graphInfo[key]} type="monotone" dataKey={`close${legendFilters.close ? '' : ' '}`} stroke="gray" dot={false} />;
                    })}

                    {hasSelected.map(key => {
                        return <Line key={`${key}-high`} data={graphInfo[key]} type="monotone" dataKey={`high${legendFilters.high ? '' : ' '}`} stroke="red" dot={false} />;
                    })}

                    {hasSelected.map(key => {
                        return <Line key={`${key}-low`} data={graphInfo[key]} type="monotone" dataKey={`low${legendFilters.low ? '' : ' '}`} stroke="green" dot={false} />;
                    })}
                </LineChart>
            }
        </div>;
}