// Dependencias
import { createStore, StoreProvider } from 'easy-peasy';
import React from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// Components
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import Header from "./components/Header/Header";
import StocksDetails from "./components/StocksDetails/StocksDetails";

// Styles
import './App.css';

// Utilities
import Stores from "./redux/Stores";

/**
 * App - Main component of the application
 * @return {*}
 * @constructor
 */
function App() {
    return (
        <StoreProvider store={createStore(Stores)}>
            <Router>
                <div className="app">
                    <Header/>

                    <Switch>
                        {/* MAIN VIEW FOR SELECTING STOCKS */}
                        <Route path="/stocks" component={StocksDetails} />

                        {/* CHECK DETAILS ABOUT A SINGLE COMPANY */}
                        <Route path="/company/:companyId" component={CompanyDetails} />

                        {/* DEFAULT REDIRECTION */}
                        <Route path="/">
                            <Redirect to="/stocks" />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </StoreProvider>
    );
}

export default App;