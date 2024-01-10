import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookingByUser } from '../../slices/User.slice';
import { cancelBooking } from '../../slices/Booking.slice';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-select-bs4/css/select.bootstrap4.css';

const MyBookings = () => {
    const [data, setData] = useState([])
    const [bookingId, setBookingId] = useState("")
    const [vehicleId, setVehiclId] = useState("")


    const dispatch = useDispatch()
    const userState = useSelector(state => state.userState)
    useEffect(() => {
        dispatch(getBookingByUser())

    }, [dispatch])

    //for datatable intialized
    const initializeDataTable = () => {
        if (!$.fn.DataTable.isDataTable('#dtBasicExample')) {
            $('#dtBasicExample').DataTable({
                language: {
                    paginate: {
                        next: '&#8594;', // or '→'
                        previous: '&#8592;' // or '←' 
                    }
                },
                info: false,
                searching: false
            });
            $('.dataTables_length').addClass('bs-select');

        }
    }

    useEffect(() => {
        if (userState.getBookingDataStatus === "success") {
            if (userState.getBookingData !== []) {
                setData(userState.getBookingData)
            }
        }
    }, [userState])

    useEffect(() => {
        initializeDataTable();
    }, [data]);

    //Booking cancel handler
    const bookingHandler = () => {
        const bookingData = {
            bookingId, vehicleId
        }
        // console.log(bookingData)
        dispatch(cancelBooking(bookingData))
    }

    //get Booking data for confirmation handler
    const getBookingData = (bookingId, vehicleId) => {
        setBookingId(bookingId)
        setVehiclId(vehicleId)
    }



    const bookingDetailsData = data.map((u) => {
        const day = new Date(u.bookedFrom).getDate()
        const year = new Date(u.bookedFrom).getFullYear()
        const month = new Date(u.bookedFrom).getMonth() + 1
        const bookedFrom = `${day}-${month}-${year}`

        const day1 = new Date(u.bookedTo).getDate()
        const year1 = new Date(u.bookedTo).getFullYear()
        const month1 = new Date(u.bookedTo).getMonth() + 1
        const bookedTo = `${day1}-${month1}-${year1}`

        const additionalColumn = u.status === "Pending" ?
            <td>
                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#confirmation" onClick={() => getBookingData(u._id, u.joined[0]._id)}>Cancel</button>
            </td>
            : <td></td>
        return (
            <tr key={u._id}>
                <td>{u.joined[0].vehicleName}</td>
                <td>{u.joined[0].color}</td>
                <td>{u.joined[0].capacity}</td>
                <td>{u.joined[0].fuelType}</td>
                <td>{u.joined[0].rentPerKm}</td>
                <td>{u.joined[0].vehicleNo}</td>
                <td>{bookedFrom}</td>
                <td>{bookedTo}</td>
                <td>{u.status}</td>
                {additionalColumn}
            </tr>
        )
    })
    return (
        <div style={{ marginLeft: "13%" }}>
            {data.length > 0 &&
                // eslint-disable-next-line jsx-a11y/no-distracting-elements
                <div><marquee style={{ fontSize: "20px", color: "#02054C " }}>Your Booking History</marquee>

                    <table border="3" id="dtBasicExample" align='center' className="table table-bordered table-responsive">
                        <thead>
                            <tr className="table-active">
                                <th style={{ width: "15%" }}>Vehicle Name</th>
                                <th >Color</th>
                                <th>Capacity</th>
                                <th>Fuel Type</th>
                                <th>Rent Per Km</th>
                                <th>Vehicle Number</th>
                                <th>BookedFrom</th>
                                <th>BookedTo</th>
                                <th style={{ width: "10%" }}>Booking Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingDetailsData}
                        </tbody>
                    </table><br /><br />
                </div>
            }
            {data.length === 0 && <div style={{ fontSize: "20px", textAlign: "center", paddingTop: "20%" }}>Till now you haven't booked any vehicle for rent.</div>}
            <br />
            {/* Confirmation Modal */}
            <div className="modal fade " id="confirmation" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: "100px" }}>
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <h5>Are you sure to cancel this booking? </h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={bookingHandler}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyBookings;
