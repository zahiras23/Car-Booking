import React from 'react';
import '../Stylesheets/spinner.css'

const Spinner = () => {
    return (
        <div className="zd-flex">
            <div className="spinner-container">
                <div className="loading-spinner">
                </div>
                <h6>Loading...</h6>
            </div>
        </div>
    );
}

export default Spinner;
