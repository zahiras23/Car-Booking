import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
    const [role, setRole] = useState(localStorage.getItem("role"))
    const [userName, setUserName] = useState(localStorage.getItem("userName"))

    const userState = useSelector(state => state.userState)

    useEffect(() => {
        if (userState.verifyStatus === 'success') {
            setRole("customer")
            setUserName(userState.userName)
        }
        else if (userState.isLogout === 'success') {
            setRole("")
            setUserName("")
        }
    }, [userState.verifyStatus, userState.isLogout, userState.userName])

    const checkUserRole = role === 'customer' ? true : false

    return (
        <>
            <div className="container-fluid">
                <div className="header_section">
                    <div className="container">
                        <nav className="navbar justify-content-between" style={{ backgroundColor: "#252525" }}>
                            <Link className="logo" to="/">
                                <h4 style={{ color: 'white', paddingTop: "10px", paddingBottom: 0 }}>EcoRide Rentals</h4>
                            </Link>
                            <div className="custome_menu">
                                <ul >
                                    <li><NavLink to="/">Home</NavLink></li>
                                    <li><NavLink to="/about">About</NavLink></li>
                                    {checkUserRole && < li > <Link to="/ratings" >Ratings</Link></li>}
                                    {!checkUserRole && <li className="nav-item dropdown" style={{ marginLeft: "-2%" }}>
                                        <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Driver
                                        </Link>
                                        <ul className="dropdown-menu bg-dark">
                                            <li><Link to="/driver/login" className="dropdown-item bg-dark">Login</Link></li>
                                            <li><Link to="/driver/signup" className="dropdown-item bg-dark">Signup</Link></li>
                                        </ul>
                                    </li>
                                    }
                                    {!checkUserRole && <li><NavLink to="/adminHome/login" style={{ marginLeft: "-4%" }}>Admin</NavLink></li>}
                                </ul>
                            </div>
                            {checkUserRole && <p style={{ color: "white", marginLeft: "1030px", marginTop: "-3.5%" }}>{userName}</p>}
                            <li className="nav-item dropdown " style={{ marginLeft: "1100px", marginTop: "-4.5%" }}>
                                <Link className="nav-link dropdown-toggle" id="navbarDropdown" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw" style={{ color: "white" }}></i></Link>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    {!checkUserRole && <li><Link to="/login" className="dropdown-item">Login</Link></li>}
                                    {!checkUserRole && <li><Link to="/signup" className="dropdown-item">Signup</Link></li>}
                                    {checkUserRole && <>
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/myBookings">My Bookings</Link></li>
                                        <li><Link className="dropdown-item" to="/resetPassword">Change Password</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><Link className="dropdown-item" to="/logout">Logout</Link></li></>}
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
