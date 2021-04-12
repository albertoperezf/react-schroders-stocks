// Dependencies
import { useStoreActions, useStoreState } from 'easy-peasy';
import PropTypes from 'prop-types';
import React, { useEffect } from "react";

/**
 * CompanyDetails - Display details about a single company selected by the user
 * @return {*}
 * @constructor
 */
export default function CompanyDetails() {
    const companyInfo = useStoreState((state) => state.StocksModel.companyInfo);
    const setCompanyInfo = useStoreActions((actions) => actions.StocksModel.HandleLoadCompanyInfo);

    useEffect(() => {

    }, []);


    return <div className='company-details'>
        <h1>Company Details</h1>
    </div>;
}

// Properties verification for the component
CompanyDetails.propTypes = {

};