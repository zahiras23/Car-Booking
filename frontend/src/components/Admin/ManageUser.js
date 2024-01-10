import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, updateUserStatus } from '../../slices/AdminWork.slice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-select-bs4/css/select.bootstrap4.css';


const ManageUser = () => {
    const [userData, setUserData] = useState([])
    const [uid, setUid] = useState("")
    const [userStatus, setUserStatus] = useState("")
    const [userName, setUserName] = useState("")

    const dispatch = useDispatch();
    const adminWork = useSelector((state) => state.adminWorkState)

    const navigate = useNavigate();
    useEffect(() => {
        dispatch(fetchAllUsers());

    }, [])

    useEffect(() => {
        if (adminWork.fetchUserStatus === "success") {
            setUserData(adminWork.allUsers)
            $(document).ready(function () {
                $('#dtBasicExample').DataTable({
                    "bInfo": false,
                    "bAutoWidth": false,
                    "bDestroy": true
                });
                $('.dataTables_length').addClass('bs-select');
            });
        }
        if (adminWork.userStatus === "success") {
            navigate("/adminHome/manageUser")
        }
    }, [adminWork])

    //---Get user's data---
    const getUserId = (userId, userName, userStatus) => {
        setUid(userId)
        setUserName(userName)
        if (userStatus === 'Activate') {
            setUserStatus("deactivate")
        }
        else if (userStatus === 'Deactivate') {
            setUserStatus("activate")
        }
    }

    //---update user Status---
    const editUserStatus = () => {
        dispatch(updateUserStatus(uid))
    }

    const allUsers = userData.map((u) => {
        const btnColor = u.status === "Activate" ? "btn-outline-primary" : "btn-outline-danger"
        return (
            <tr key={u._id}>
                <td>{u.userName}</td>
                <td>{u.email}</td>
                <td>{u.contactNo}</td>
                <td>{u.gender}</td>
                <td>
                    <button type="button" className={`btn ` + btnColor} data-bs-toggle="modal" data-bs-target="#confirmation" onClick={() => getUserId(u._id, u.userName, u.status,)} data-bs-whatever="@mdo" >{u.status}</button>
                </td>
            </tr>
        )
    })

    return (
        <div>
            <marquee><h5>All Registered Users</h5></marquee>
            <table border="3" align='center' className="table" id="dtBasicExample">
                <thead>
                    <tr className="table-active">
                        <th style={{ width: "20%" }}>User Name</th>
                        <th>Email</th>
                        <th >Contact No</th>
                        <th>Gender</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers}
                </tbody>
            </table>

            {/* Confirmation Modal */}
            <div className="modal fade " id="confirmation" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ marginTop: "100px" }}>
                <div className="modal-dialog">
                    <div className="modal-content" >
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">User Status Update</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <h5>Are you sure to {userStatus} {userName}?</h5>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={editUserStatus}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ManageUser;
