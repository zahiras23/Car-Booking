import React from 'react';
import Header from './Header';
import Footer from '../CommonComponents/Footer';

const Dashboard = (props) => {
    return (
        <div>
            <Header />
            <div style={{ marginLeft: "10px" }}>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
