import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bookingAllocation, getBookingPendingData, getVerifiedDrivers } from '../../slices/AdminWork.slice';

const BookingAllotion = () => {
    const [pendingBookingData, setPendingBookingData] = useState([])
    const [record, setRecord] = useState([])
    const [bookedFrom, setBookedFrom] = useState("")
    const [bookedTo, setBookedTo] = useState("")
    const [allDrivers, setAllDrivers] = useState([])
    const [enteredDriver, setEnteredDriver] = useState("")
    const [id, setId] = useState("")

    const dispatch = useDispatch();
    const adminWork = useSelector((state) => state.adminWorkState)

    useEffect(() => {
        dispatch(getBookingPendingData())
        dispatch(getVerifiedDrivers())

    }, [])


    useEffect(() => {
        if (adminWork.getBookingPendingStatus === "success" && adminWork.pendingBooking) {
            setPendingBookingData(adminWork.pendingBooking)
        }
        if (adminWork.getVerifiedDriverStatus === 'success') {
            setAllDrivers(adminWork.getVerifiedDriver)
        }
    }, [adminWork])

    useEffect(() => {
    }, [record])

    const showDetails = (id) => {
        const booking = pendingBookingData.find((booking) => booking._id == id)

        const day = new Date(booking.bookedFrom).getDate()
        const year = new Date(booking.bookedFrom).getFullYear()
        const month = new Date(booking.bookedFrom).getMonth() + 1
        const hour = new Date(booking.bookedFrom).getHours()
        const minute = new Date(booking.bookedFrom).getMinutes()
        const seconds = new Date(booking.bookedFrom).getSeconds()
        const bookedFrom = `${day}-${month}-${year}, ${hour}:${minute}:${seconds}`
        setBookedFrom(bookedFrom)

        const day1 = new Date(booking.bookedTo).getDate()
        const year1 = new Date(booking.bookedTo).getFullYear()
        const month1 = new Date(booking.bookedTo).getMonth() + 1
        const hourTo = new Date(booking.bookedTo).getHours()
        const minuteTo = new Date(booking.bookedTo).getMinutes()
        const secondsTo = new Date(booking.bookedTo).getSeconds()
        const bookedTo = `${day1}-${month1}-${year1}, ${hourTo}:${minuteTo}:${secondsTo}`
        setBookedTo(bookedTo)
        setRecord(booking)
    }

    //driver allocation handler
    const allotDriver = (id) => {
        setId(id)
    }

    const driverAllocateHandler = (event) => {
        event.preventDefault()
        const userData = {
            id, enteredDriver
        }
        if (enteredDriver.trim().length === 0) {
            toast.error("Please,select any driver.")
        }
        else {
            dispatch(bookingAllocation(userData))
        }
    }
    // For displaying data
    const allData = pendingBookingData.length > 0 && pendingBookingData.map((u) => {
        return (
            <>
                <div className="col" key={u._id}>
                    <div className="card">
                        <img src={u.vehicleInfo[0].photo} className="card-img-top" alt="..." style={{ height: "200px" }} />
                        <div class="card-body">
                            <h5 class="card-title">{u.vehicleInfo[0].vehicleName}</h5>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={(event) => showDetails(u._id)}>View Details</button>
                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#allotBooking" data-bs-whatever="@mdo" style={{ marginLeft: '5%' }} onClick={(event) => allotDriver(u._id)}>Allot Driver</button>
                        </div>
                    </div>
                </div>
            </>
        )
    })

    //create drop-down for driver name
    const driver = allDrivers && allDrivers.map((d) => {
        return (
            <option value={d._id} key={d._id} >{d.userName}</option>
        )
    })
    return (
        <>
            <marquee><h5>Booking Allocation to Drivers</h5></marquee>
            <div className="row row-cols-1 row-cols-md-3 g-4" >
                {allData}
            </div>
            {/* modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: "100px" }}>
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Booking Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <b>User Name :</b>{record.userInfo && record.userInfo.length > 0 ? record.userInfo[0].userName : ""}
                                <br /><b>User Email :</b>{record.userInfo && record.userInfo.length > 0 ? record.userInfo[0].email : ""}
                                < br /> <b>Fuel Type :</b>{record.vehicleInfo && record.vehicleInfo.length > 0 ? record.vehicleInfo[0].fuelType : ""}
                                <br /><b>Rent :</b>{record.vehicleInfo && record.vehicleInfo.length > 0 ? record.vehicleInfo[0].rentPerKm : ""}
                                <br /><b>Vehicle Number  :</b>{record.vehicleInfo && record.vehicleInfo.length > 0 ? record.vehicleInfo[0].vehicleNo : ""}
                                <br /><b>bookedFrom  :</b>{bookedFrom}
                                <br /><b>bookedTo  :</b>{bookedTo}
                                <br /><b>Pickup Address  :</b>{record.pickUpAddress}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* For booking allotion to driver */}
            <div className="modal fade" id="allotBooking" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: "100px" }}>
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Allot Driver to Trip</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <select className="form-select" onChange={((event) => setEnteredDriver(event.target.value))}>
                                    <option selected disabled>Choose Driver</option>
                                    {driver}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={driverAllocateHandler}>Allocate</button>
                        </div>
                    </div>
                </div>
            </div>
            {pendingBookingData.length <= 0 && <h4 style={{ textAlign: "center", marginTop: "10%" }}>No available any booking</h4>}
        </>
    );
}

export default BookingAllotion;
