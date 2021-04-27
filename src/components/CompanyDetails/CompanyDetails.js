// Dependencies
import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';

// Styles
import './CompanyDetails.css';

/**
 * CompanyDetails - Display details about a single company selected by the user
 * @return {*}
 * @constructor
 */
export default function CompanyDetails() {
    const loading = useStoreState((state) => state.StocksModel.loading);
    const companyInfo = useStoreState((state) => state.StocksModel.companyInfo);
    const setCompanyInfo = useStoreActions((actions) => actions.StocksModel.HandleLoadCompanyInfo);
    const history = useHistory();
    const params = useParams().companyId;

    const handleReturn = () => {
        const path = '/stocks';
        history.push(path);
    };

    useEffect(() => {
        if (params) {
            setCompanyInfo(params);
        }
    }, [params, setCompanyInfo]);

    return <div className='company'>
        <input id='clear' onClick={handleReturn} type="button" value='Return to Stocks Graph'/>

        <div>
            {loading
                ? <h2>Loading...</h2>
                : companyInfo && companyInfo[params]
                    ? <div className='company-details'>
                        <h2>{companyInfo[params].name} ({companyInfo[params].symbol})</h2>

                        <div className='company-details-wrapper'>
                            <div className='company-details-left'>
                                <p>Country: {companyInfo[params].country}</p>

                                <p>Currency: {companyInfo[params].currency}</p>

                                <p>Exchange: {companyInfo[params].exchange}</p>

                                <p>Finnhub Industry: {companyInfo[params].finnhubIndustry}</p>

                                <p>IPO Date: {companyInfo[params].ipo}</p>

                                <p>Market Capitalization: {companyInfo[params].marketCapitalization}</p>

                                <p>Phone: {companyInfo[params].phone}</p>

                                <p>Share Outstanding: {companyInfo[params].shareOutstanding}</p>

                                <p><a href={companyInfo[params].weburl} rel='noreferrer' target='_blank'>Web URL</a></p>
                            </div>

                            <div className='company-details-right'>
                                <img src={companyInfo[params].logo} alt="Company Logo"/>
                            </div>
                        </div>
                    </div>
                    : <h2>No Company Info</h2>
            }
        </div>
    </div>;
}