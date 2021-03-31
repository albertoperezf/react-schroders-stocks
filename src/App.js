// Dependencias
import { createStore, StoreProvider } from 'easy-peasy';
import React from 'react';

// Components
import Filters from "./components/Filters/Filters";
import Graph from "./components/Graph/Graph";
import Header from "./components/Header/Header";

// Styles
import './App.css';

// Utilities
import Stores from "./redux/Stores";

function App() {
    return (
        <StoreProvider store={createStore(Stores)}>
            <div className="App">
                <Header/>

                <Filters />

                <Graph />
            </div>
        </StoreProvider>
    );
}

export default App;