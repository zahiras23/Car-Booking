import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDrivers, updateDriverStatus, updateDriverVerify } from '../../slices/AdminWork.slice';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-select-bs4/css/select.bootstrap4.css';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const ManageDriver = () => {
    const [driverData, setDriverData] = useState([])
    const [did, setdid] = useState("")
    const [driverStatus, setDriverStatus] = useState("")
    const [driverName, setDriverName] = useState("")
    const [driverVerify, setDriverVerify] = useState("")


    const dispatch = useDispatch();
    const adminWork = useSelector((state) => state.adminWorkState)

    useEffect(() => {
        dispatch(fetchAllDrivers());
    }, [])

    useEffect(() => {
        if (adminWork.fetchDriverStatus === "success") {
            setDriverData(adminWork.allDrivers)
            $(document).ready(function () {
                $('#dtBasicExample').DataTable({
                    "bInfo": false,
                    "bAutoWidth": false,
                    "bDestroy": true

                });
                $('.dataTables_length').addClass('bs-select');
            });
        }
    }, [adminWork])

    //---Get user's data---
    const getDriverId = (userId, userName, userStatus) => {
        setdid(userId)
        setDriverName(userName)
        if (userStatus === 'Activate') {
            setDriverStatus("deactivate")
        }
        else if (userStatus === 'Deactivate') {
            setDriverStatus("activate")
        }
        setDriverVerify("")

    }

    //---Get driver's verification data---
    const getDriverVerifydata = (userId, userName, driverVerify) => {
        setdid(userId)
        setDriverName(userName)
        if (driverVerify.toString() === "true") {
            setDriverVerify("unverify")
        }
        else if (driverVerify.toString() === "false") {
            setDriverVerify("verify")
        }
        setDriverStatus("")

    }

    const editDriverStatus = () => {
        dispatch(updateDriverStatus(did))
    }
    const editDriverVerify = (userId) => {
        console.log(userId)
        dispatch(updateDriverVerify(userId))
        setdid("")
    }

    //For all drivers' data
    const allDrivers = driverData.map((u) => {
        const btnStatusColor = u.status === "Activate" ? "btn-outline-primary" : "btn-outline-danger"
        const btnVerifyColor = u.isVerified.toString() === "true" ? "btn-outline-primary" : "btn-outline-danger"
        const btnVerifyIcon = u.isVerified.toString() === "true" ? <CheckCircleOutlineIcon /> : <HighlightOffIcon />
        return (
            <tr key={u._id}>
                <td>{u.userName}</td>
                <td>{u.email}</td>
                <td>{u.contactNo}</td>
                <td>{u.gender}</td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target="#confirmation" onClick={() => getDriverId(u._id, u.userName, u.status,)} data-bs-whatever="@mdo" className={`btn ` + btnStatusColor}>{u.status}</button>
                </td>
                <td>
                    <button data-bs-toggle="modal" data-bs-target="#confirmation" onClick={() => getDriverVerifydata(u._id, u.userName, u.isVerified)} className={`btn ` + btnVerifyColor}>{btnVerifyIcon}</button>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <marquee><h5>All Registered Drivers</h5></marquee>
            <table border="3" align='center' className="table " id="dtBasicExample">
                <thead>
                    <tr className="table-active">
                        <th style={{ width: "20%" }}>Driver Name</th>
                        <th>Email</th>
                        <th >Contact No</th>
                        <th>Gender</th>
                        <th>Status</th>
                        <th>IsVerified</th>
                    </tr>
                </thead>
                <tbody>
                    {allDrivers}
                </tbody>
            </table>
            {/* Confirmation Modal */}
            <div className="modal fade " id="confirmation" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: "100px" }}>
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                {driverStatus && <h5>Are you sure to {driverStatus} {driverName}?</h5>}
                                {driverVerify && <h5>Are you sure you want to {driverVerify} (for license) {driverName}?</h5>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {driverStatus && <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={editDriverStatus}>Continue</button>}
                            {driverVerify && <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => editDriverVerify(did)}>Continue</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ManageDriver;
