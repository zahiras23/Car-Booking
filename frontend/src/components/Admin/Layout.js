import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';

const Layout = () => {
    return (
        <div>
            <Dashboard >
                <Outlet />
            </Dashboard>
        </div>
    );
}

export default Layout;
