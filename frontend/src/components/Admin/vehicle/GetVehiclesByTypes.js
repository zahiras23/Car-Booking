import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteVehicle, getVehicle } from "../../../slices/Vehicle.slice";
import { Box, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { toast } from 'react-toastify';
import Modal from '@mui/material/Modal';
import $ from 'jquery';
import 'datatables.net-bs4';
import 'datatables.net-select-bs4/css/select.bootstrap4.css';


export default function GetVehiclesByTypes() {
    const [vehicleId, setVehicleId] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const [type, setType] = useState("")
    const [vehicleData, setVehicleData] = useState([])
    const dispatch = useDispatch()

    const vehicleState = useSelector((state) => state.vehicleState)

    useEffect(() => {
        if (vehicleState.getVehicleStatus === 'success') {
            setVehicleData(vehicleState.vehicles)
            $(document).ready(function () {
                $('#dtBasicExample').DataTable();
                $('.dataTables_length').addClass('bs-select');
            });
        }
    }, [vehicleState])

    useEffect(() => {
        if (openModal)
            document.body.style.overflow = 'hidden';
        else if (!openModal)
            document.body.style.overflow = 'visible';
    }, [openModal])

    //get data by vehicle type
    const handleSubmit = (event) => {
        event.preventDefault()
        if (type.trim().length === 0) {
            toast.error("Please,select vehicle type.")
        }
        else {
            dispatch(getVehicle(type))
        }
    }

    const vehicles = vehicleData.map((v) => {
        return (
            <tr key={v._id}>
                <td>{v.vehicleName}</td>
                <td>{v.color}</td>
                <td>{v.capacity}</td>
                <td><img src={v.photo} height={100} width={170} /></td>
                <td>{v.fuelType}</td>
                <td>₹{v.rentPerKm}</td>
                <td>{v.vehicleNo}</td>
                <td>₹{v.penaltyPerDay}</td>
                <td>
                    <Button onClick={() => getVehicleId(v._id)}>
                        <DeleteIcon fontSize='medium' style={{ color: "black" }} />
                    </Button>
                </td>
                <td>
                    <Link to={`/adminHome/editVehicle/${v._id}`}>
                        <EditNoteIcon fontSize='medium' style={{ color: "black" }} />
                    </Link>
                </td>
            </tr>
        )
    })

    //modal close handler
    const handleClose = () => {
        setOpenModal(false);
    }

    //get vehicleId for delete operation
    const getVehicleId = (vid) => {
        document.body.style.overflow = 'hidden';
        setOpenModal(true)
        setVehicleId(vid)
    }

    const deleteHandler = () => {
        const vehicleData = { vehicleId, type }
        setOpenModal(false)
        dispatch(deleteVehicle(vehicleData))
    }
    return (
        <div>
            <marquee><h5>All Registered Vehicles</h5></marquee>
            <select
                className="form-select form-secondary"
                aria-label="Disabled select example"
                onChange={(event) => setType(event.target.value)}
                style={{ width: "25%" }}
            >
                <option className="dropdown-item" selected disabled>
                    ---Select Vehicle Type---
                </option>
                <option className="dropdown-item" value="Car">
                    Car
                </option>
                <option className="dropdown-item" value="MiniBus">
                    MiniBus
                </option>
                <option className="dropdown-item" value="Bike">
                    Bike
                </option>
                <option className="dropdown-item" value="AutoRikshaw">
                    AutoRikshaw
                </option>
            </select>

            <button
                type="submit"
                style={{ width: "10%", marginTop: "-7%", marginLeft: "35%" }}
                className='btn btn-primary'
                onClick={handleSubmit}
            >
                Find
            </button>
            <br /><br />
            {
                vehicles.length > 0 &&
                <div>
                    <table border="3" align='center' className="table" id="dtBasicExample">
                        <thead>
                            <tr className="table-active">

                                <th style={{ width: "20%" }}>Vehicle Name</th>
                                <th>Color</th>
                                <th >Capacity</th>
                                <th>Photo</th>
                                <th>Fuel Type</th>
                                <th>Rent Per Km</th>
                                <th>Vehicle No</th>
                                <th>Penalty per day</th>
                                <th>Delete</th>
                                <th>Edit</th>

                            </tr>
                        </thead>
                        <tbody>
                            {vehicles}
                        </tbody>
                    </table>
                </div>
            }

            {/* modal for delete vehicle confirmation */}
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid white',
                    boxShadow: 24,
                    p: 4,
                }}>
                    <Typography sx={{ mt: 2 }}>
                        Are you sure to delete?
                    </Typography>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={deleteHandler}>Continue</Button>
                </Box>
            </Modal >
        </div>
    )
}