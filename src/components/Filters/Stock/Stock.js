// Dependencies
import PropTypes from 'prop-types';
import React from "react";

/**
 * Stock - Item to show info about a single Stock
 * @param {Object} data - Data of the company to filter
 * @param {Boolean} disabled - Indicates if the selection must be disabled
 * @param {Function} onChange - Handle when the user clicks on a checkbox
 * @param {Boolean} isSelected - Indicates if the item is currently selected
 * @return {*}
 * @constructor
 */
export default function Stock({ data, disabled, onChange, isSelected }) {
    const handleChange = () => {
        if (!disabled) {
            onChange(data, isSelected);
        }
    };

    return <div role='listitem' className='stock-details' key={data.symbol}>
        <p role='paragraph' title={data.description}>{data.symbol}</p>

        <input disabled={disabled} id='select' checked={isSelected} onChange={handleChange} type="checkbox" value={isSelected} />
    </div>;
}

// Properties verification for the component
Stock.propTypes = {
    data: PropTypes.object,
    disabled: PropTypes.bool.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};