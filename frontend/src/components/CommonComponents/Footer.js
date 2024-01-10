import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div
            style={{
                position: "fixed", left: "0", bottom: "0", width: "100%"
            }}
        >
            <div className="copyright_section">
                <div className="container">
                    <p className="copyright_text" >Copyright &copy; Reserved By <Link to='/'> EcoRide Rentals </Link> {new Date().getFullYear()}</p>
                </div>
            </div>
        </div >
    );
}

export default Footer;
