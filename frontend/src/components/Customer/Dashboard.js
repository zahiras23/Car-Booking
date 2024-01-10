import React from 'react';
import Header from './Header';
import Footer from '../CommonComponents/Footer';

const Dashboard = (props) => {
    return (
        < >
            <Header />
            <div>
                {props.children}
            </div>
            <Footer />
        </>
    );
}

export default Dashboard;
