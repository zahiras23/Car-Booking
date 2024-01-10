import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllocatedVehicle, makeVehicleAvailable } from '../../slices/AdminWork.slice';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-select-bs4/css/select.bootstrap4.css';

const MakeVehicleAvailable = () => {
    const [vehicle, setVehicle] = useState([])
    const [returndatetime, setReturndatetime] = useState("")
    const [bookingStatus, setBookingStatus] = useState("")

    const disptch = useDispatch()

    const adminWorkState = useSelector(state => state.adminWorkState)

    useEffect(() => {
        disptch(getAllocatedVehicle())
    }, [])

    useEffect(() => {
        if (adminWorkState.getAllocatedStatus === 'success' && adminWorkState.allocatedVehicle) {
            setVehicle(adminWorkState.allocatedVehicle)
            $(document).ready(function () {
                $('#dtBasicExample').DataTable();
                $('.dataTables_length').addClass('bs-select');
            });
        }
    }, [adminWorkState.getAllocatedStatus])


    //---For update booking and vehicle record
    const editVehiclehandler = (bid, vid) => {
        const info = {
            bid, vid, returndatetime, bookingStatus
        }
        disptch(makeVehicleAvailable(info))
    }

    const vehicleData = vehicle.map((v) => {
        const day = new Date(v.bookedFrom).getDate()
        const year = new Date(v.bookedFrom).getFullYear()
        const month = new Date(v.bookedFrom).getMonth() + 1
        const hour = new Date(v.bookedFrom).getHours()
        const minute = new Date(v.bookedFrom).getMinutes()
        const seconds = new Date(v.bookedFrom).getSeconds()
        const bookedFrom = `${day}-${month}-${year}, ${hour}:${minute}:${seconds}`

        const day1 = new Date(v.bookedTo).getDate()
        const year1 = new Date(v.bookedTo).getFullYear()
        const month1 = new Date(v.bookedTo).getMonth() + 1
        const hourTo = new Date(v.bookedTo).getHours()
        const minuteTo = new Date(v.bookedTo).getMinutes()
        const secondsTo = new Date(v.bookedTo).getSeconds()
        const bookedTo = `${day1}-${month1}-${year1}, ${hourTo}:${minuteTo}:${secondsTo}`

        return (
            <tr key={v._id}>
                <td >{v.joined[0].vehicleName}</td>
                <td>{v.joined[0].color}</td>
                <td>{v.joined[0].vehicleNo}</td>
                <td>
                    <img src={v.joined[0].photo} style={{ height: 100, width: "200px" }} alt='vehicleImage' />
                </td>
                <td>{bookedFrom}</td>
                <td>{bookedTo}</td>
                <td>
                    <input type='datetime-local' onChange={(event) => setReturndatetime(event.target.value)} />
                </td>
                <td>
                    <select onChange={(event) => setBookingStatus(event.target.value)}>
                        <option selected disabled>Select Booking status</option>
                        <option value="Allocated">Allocated</option>
                        <option value="Completed">Completed</option>
                    </select>
                </td>
                <td>
                    <button className='btn btn-success' onClick={() => editVehiclehandler(v._id, v.joined[0]._id)}>Update</button>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <div className="table-responsive text-nowrap">
                {vehicle.length > 0 &&
                    <div>
                        <h4>On rent vehicles</h4>
                        <table border="3" align='center' className="table" id="dtBasicExample">
                            <thead>
                                <tr className="table-active">
                                    <th style={{ width: "20%" }}>Vehicle Name</th>
                                    <th>Color</th>
                                    <th style={{ width: "30%" }}>Vehicle No</th>
                                    <th>Photo</th>
                                    <th>BookedFrom</th>
                                    <th>BookedTo</th>
                                    <th>Return Date</th>
                                    <th>status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicleData}
                            </tbody>
                        </table>
                    </div>}
                {vehicle.length <= 0 && <h5 align="center">There is not any vehicle on rent.</h5>}
            </div>
        </div>
    );
}

export default MakeVehicleAvailable;
