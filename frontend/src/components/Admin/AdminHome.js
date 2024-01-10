import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countingReport } from '../../slices/AdminWork.slice';

const AdminHome = () => {
    const [role, setRole] = useState(localStorage.getItem("role"))
    const adminState = useSelector((state) => state.adminState)
    const adminWorkState = useSelector((state) => state.adminWorkState)

    const [totalCustomer, setTotalCustomer] = useState(0)
    const [totalDriver, setTotalDriver] = useState(0)
    const [totalVehicle, setTotalVehicle] = useState(0)
    const [totalVerifiedDriver, setTotalVerifiedDriver] = useState(0)
    const [totalPendingBookings, setTotalPendingBookings] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        if (role === 'admin') {
            dispatch(countingReport())
        }
    }, [adminState.loginStatus])

    useEffect(() => {
        setTotalCustomer(adminWorkState.customerCount)
        setTotalDriver(adminWorkState.driverCount)
        setTotalVehicle(adminWorkState.vehicleCount)
        setTotalVerifiedDriver(adminWorkState.verifiedDriverCount)
        setTotalPendingBookings(adminWorkState.pendingBookingCount)
    }, [adminWorkState])

    return (
        <>
            <h5>Welcome To Admin Panel</h5>
            {role === "admin" && <><div className="row" >
                <div className="card  text-bg-warning" style={{ width: "30%", marginRight: "3%" }}>
                    <h5 className="card-header">
                        Total Registered Customers
                    </h5>
                    <div className="card-body" style={{ textAlign: "center" }}>
                        <h5 className="card-text" >{totalCustomer}</h5>
                    </div>
                </div>
                <div className="card text-bg-success" style={{ width: "30%", marginRight: "3%" }}>
                    <h5 className="card-header">
                        Total Registered Vehicles
                    </h5>
                    <div className="card-body" style={{ textAlign: "center" }}>
                        <h5 className="card-text ">{totalVehicle}</h5>
                    </div>
                </div>
                <div className="card  text-bg-secondary" style={{ width: "30%", marginRight: "3%" }}>
                    <h5 className="card-header">
                        Total License Verified Drivers
                    </h5>
                    <div className="card-body" style={{ textAlign: "center" }}>
                        <h5 className="card-text">{totalVerifiedDriver}</h5>
                    </div>
                </div>
            </div>
                <br /><br />
                <div className="row">
                    <div className="card text-bg-primary" style={{ width: "30%", marginRight: "3%" }}>
                        <h5 className="card-header">
                            Total Registered Drivers
                        </h5>
                        <div className="card-body" style={{ textAlign: "center" }}>
                            <h5 className="card-text">{totalDriver}</h5>
                        </div>
                    </div>
                    <div className="card text-bg-danger" style={{ width: "30%", marginRight: "3%" }}>
                        <h5 className="card-header">
                            Total Pending Bookings
                        </h5>
                        <div className="card-body" style={{ textAlign: "center" }}>
                            <h5 className="card-text">{totalPendingBookings}</h5>
                        </div>
                    </div>
                </div></>}
        </>
    );
}

export default AdminHome;
