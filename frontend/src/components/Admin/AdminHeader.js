import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
    const role = localStorage.getItem('role')
    return (
        <>
            <body className="sb-nav-fixed">
                <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                    {/* <!-- Navbar Brand--> */}
                    <Link className="navbar-brand ps-3" href="/adminHome">Admin Panel</Link>
                    {/* <!-- Sidebar Toggle--> */}
                    {role === 'admin' && <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                        <li className="nav-item dropdown" style={{ marginLeft: "1000px" }}>
                            <Link className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></Link>
                            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/adminHome/changePassword">Change Password</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/adminHome/logout">Logout</Link></li>
                            </ul>
                        </li>
                    </ul>}
                </nav>
            </body>
        </>
    );
}

export default AdminHeader;
