import React from 'react';
import Dashboard from './Dashboard';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Dashboard >
                <Outlet />
            </Dashboard>
        </>
    );
}

export default Layout;
