import React from 'react';
import Dashboard from './Dashboard';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <Dashboard >
                <Outlet/>
            </Dashboard>
        </div>
    );
}

export default Layout;
