import React from 'react';
import AdminSideBar from './AdminSideBar';
import AdminHeader from './AdminHeader';

const Dashboard = (props) => {
    return (
        <div>
            <div id="layoutSidenav">
                <AdminHeader />
                <AdminSideBar />
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            <div style={{ marginTop: "10%", marginLeft: "10%", marginRight: "10%" }}>
                                {props.children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
