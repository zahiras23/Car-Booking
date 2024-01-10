import React from "react";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import CommuteIcon from "@mui/icons-material/Commute";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EngineeringIcon from '@mui/icons-material/Engineering';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';

const AdminSideBar = () => {
  const role = localStorage.getItem('role')
  const checkAdminRole = role === 'admin' ? true : false
  return (
    <>
      <div id="layoutSidenav" style={{ marginLeft: "2%" }}>
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <br />
                <br />
                <br />
                {!checkAdminRole && <Link className="nav-link" to="/">
                  <div className="sb-nav-link-icon">
                    <HomeIcon />
                  </div>
                  Home
                </Link>}
                <Link className="nav-link" to="/adminHome">
                  <div className="sb-nav-link-icon">
                    <DashboardIcon />
                  </div>
                  Dashboard
                </Link>
                {/* Users Operations  */}
                {checkAdminRole && (
                  <>
                    <Link
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseUser"
                      aria-expanded="false"
                      aria-controls="collapsePages"
                    >
                      <div className="sb-nav-link-icon">
                        <GroupIcon />
                      </div>
                      Manage Users
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </Link>
                    <div
                      className="collapse"
                      id="collapseUser"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/adminHome/manageUser">
                          Change User Status
                        </Link>
                      </nav>
                    </div>


                    {/* Vehicle Operations  */}
                    <Link
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseVehicle"
                      aria-expanded="false"
                      aria-controls="collapsePages"
                    >
                      <div className="sb-nav-link-icon">
                        <CommuteIcon />
                      </div>
                      Manage Vehicle
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </Link>
                    <div
                      className="collapse"
                      id="collapseVehicle"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/adminHome/getVehicleByTypes">
                          Display Vehicles
                        </Link>
                        <Link
                          className="nav-link"
                          to="/adminHome/addNewVehicle"
                        >
                          Add New Vehicle
                        </Link>
                        <Link
                          className="nav-link"
                          to="/adminHome/makeVehicleAvailable"
                        >
                          Make Vehicle Available
                        </Link>
                      </nav>
                    </div>

                    {/* Driver's operation */}
                    <Link
                      className="nav-link collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseDriver"
                      aria-expanded="false"
                      aria-controls="collapsePages"
                    >
                      <div className="sb-nav-link-icon">
                        <EngineeringIcon />
                      </div>
                      Manage Drivers
                      <div className="sb-sidenav-collapse-arrow">
                        <i className="fas fa-angle-down"></i>
                      </div>
                    </Link>
                    <div
                      className="collapse"
                      id="collapseDriver"
                      aria-labelledby="headingOne"
                      data-bs-parent="#sidenavAccordionPages"
                    >
                      <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link" to="/adminHome/manageDriver">
                          Registered Drivers
                        </Link>
                      </nav>
                    </div>

                    {/* Booking operation */}
                    <Link className="nav-link" to="/adminHome/bookingAllotion">
                      <div className="sb-nav-link-icon">
                        <BadgeIcon />
                      </div>
                      Booking Allocation
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
