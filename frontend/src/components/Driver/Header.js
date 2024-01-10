import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Header = () => {
    const role = localStorage.getItem("role")
    const userName = localStorage.getItem("userName")

    const checkDriverRole = role === 'driver' ? true : false
    return (
        <>
            <div className="container-fluid">
                <div className="header_section">
                    <div className="container">
                        <nav className="navbar justify-content-between" style={{ backgroundColor: "#252525" }}>
                            <Link className="logo" to="/driver/home">
                                <h3 style={{ color: 'white' }}>Rent a vehicle</h3>
                            </Link>
                            <div className="custome_menu">
                                <ul >
                                    <li><NavLink to="/driver/home">Home</NavLink></li>
                                    <li><NavLink to="/driver/about">About</NavLink></li>
                                </ul>
                            </div>
                            {checkDriverRole && <p style={{ color: "white", marginLeft: "1000px", marginTop: "-3.5%" }}>{userName}</p>}
                            <li className="nav-item dropdown" style={{ marginLeft: "1100px", marginTop: "-4.5%" }}>
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw" style={{ color: "white" }}></i></Link>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    {checkDriverRole && <><li><Link className="dropdown-item" to="/driver/profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/driver/resestPassword">Change Password</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="/driver/logout">Logout</Link></li></>}
                                </ul>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Header;
