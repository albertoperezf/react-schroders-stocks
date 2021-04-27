// Dependencies
import React from "react";
import { useLocation } from 'react-router-dom';

// Styles
import './Header.css';

/**
 * Header - Display the title of the app
 * @return {*}
 * @constructor
 */
export default function Header() {
    const location = useLocation().pathname;
    const title = location === '/stocks'
        ? 'Select up to 3 stocks to check the Time Series (Scroll to see more)'
        : 'Company Details';

    return <header aria-level='1' className="header" role='heading'>
        {title}
    </header>;
}