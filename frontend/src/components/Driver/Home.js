
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-select-bs4/css/select.bootstrap4.css';
import { allocatedBookings } from '../../slices/Driver.slice';

const Home = () => {
    const [bookings, setBookings] = useState([])
    const dispatch = useDispatch()
    const driverState = useSelector(state => state.driverState)

    useEffect(() => {
        dispatch(allocatedBookings())
    }, [dispatch])

    useEffect(() => {
        if (driverState.allocateBookingStatus === "success") {
            if (driverState.allAllocatedBooking !== []) {
                setBookings(driverState.allAllocatedBooking)
            }
        }
    }, [driverState])

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
            });
            $('.dataTables_length').addClass('bs-select');

        }
    }
    useEffect(() => {
        initializeDataTable();
    }, [bookings]);

    const bookingDetailsData = bookings.map((u) => {
        const day = new Date(u.bookedFrom).getDate()
        const year = new Date(u.bookedFrom).getFullYear()
        const month = new Date(u.bookedFrom).getMonth() + 1
        const hour = new Date(u.bookedFrom).getHours()
        const minute = new Date(u.bookedFrom).getMinutes()
        const seconds = new Date(u.bookedFrom).getSeconds()

        const bookedFrom = `${day}-${month}-${year}`
        const bookedTime = `${hour}:${minute}:${seconds}`

        const dayTo = new Date(u.bookedTo).getDate()
        const yearTo = new Date(u.bookedTo).getFullYear()
        const monthTo = new Date(u.bookedTo).getMonth() + 1
        const hourTo = new Date(u.bookedTo).getHours()
        const minuteTo = new Date(u.bookedTo).getMinutes()
        const secondsTo = new Date(u.bookedTo).getSeconds()

        const bookedTo = `${dayTo}-${monthTo}-${yearTo}`
        const bookedToTime = `${hourTo}:${minuteTo}:${secondsTo}`
        return (
            <tr key={u._id}>
                <td>{u.joined[0].vehicleName}</td>
                <td>{u.joined[0].color}</td>
                <td>{u.joined[0].capacity}</td>
                <td>{u.joined[0].fuelType}</td>
                <td>{u.joined[0].rentPerKm}</td>
                <td>{u.joined[0].vehicleNo}</td>
                <td>{bookedFrom}, {bookedTime}</td>
                <td>{bookedTo}, {bookedToTime}</td>
                <td>{u.status}</td>
            </tr>
        )
    })

    return (
        <div style={{ marginLeft: "5%", marginRight: "5%" }}>
            <marquee style={{ fontSize: "20px", color: "#02054C" }}>Welcome To Driver Homepage</marquee>
            {bookings.length > 0 &&
                <>
                    <h5 align="center">Allocated Bookings</h5>
                    <table border="3" id="dtBasicExample" align='center' className="table table-bordered table-responsive">
                        <thead>
                            <tr className="table-active">

                                <th style={{ width: "10%" }}>Vehicle Name</th>
                                <th >Color</th>
                                <th>Capacity</th>
                                <th>Fuel Type</th>
                                <th>Rent Per Km</th>
                                <th>Vehicle Number</th>
                                <th>BookedFrom</th>
                                <th>BookedTo</th>
                                <th style={{ width: "10%" }}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookingDetailsData}
                        </tbody>
                    </table>
                </>
            }
            {bookings.length <= 0 && <h5 align="center">No booking allocated to you till now.</h5>}
        </div>
    );
}

export default Home;
