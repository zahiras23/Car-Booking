import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getVehicle } from '../../slices/Vehicle.slice';
import { vehicleBooking } from '../../slices/Booking.slice';
import { toast } from 'react-toastify';


const VehicleByType = () => {
    const [vehicleData, setVehicleData] = useState([])
    const [vid, setVid] = useState("")
    const [bookedFrom, setBookedFrom] = useState("")
    const [bookedTo, setBookedTo] = useState("")
    const [address, setAddress] = useState("")
    const [paymentMode, setpaymentMode] = useState("Cash")
    const { type } = useParams()
    const dispatch = useDispatch()

    const vehicleState = useSelector((state) => state.vehicleState)

    useEffect(() => {
        dispatch(getVehicle(type))
    }, [dispatch, type])

    useEffect(() => {
        if (vehicleState.getVehicleStatus === "success") {
            setVehicleData(vehicleState.vehicles)
        }
    }, [vehicleState.getVehicleStatus, vehicleState.vehicles])

    const vehicleHandler = (vid) => {
        setVid(vid)
    }
    const bookingHandler = () => {
        if (bookedFrom.length === 0) {
            toast.error("Please,select booking date and time for booked From.")
        }
        else if (bookedTo.length === 0) {
            toast.error("Please,select booking date and time for booked To.")
        }
        else if (address.trim().length === 0) {
            toast.error("Please,give pick up address.")
        }
        else {
            const bookingData = {
                vid, bookedFrom, bookedTo, address, paymentMode, type
            }
            dispatch(vehicleBooking(bookingData))
        }
    }
    const vehicles = vehicleData.map((v) => {
        return (
            <div className="col" key={v._id}>
                <div className="card cards" style={{ width: "18rem", marginBottom: "75px", height: "85%" }}>
                    <img src={v.photo} className="card-img-top " style={{ height: "200px" }} alt='' />
                    <div className='vehicle_price'>₹{v.rentPerKm} / Per KM</div>
                    <div className="card-body" align="center">
                        <h5 className="card-title" align="center">{v.vehicleName}</h5>
                        <p className="card-text"><b>Color :</b>{v.color}</p>
                        <p className="card-text"><b>Capacity :</b >{v.capacity}</p>
                        <p className="card-text"><b>Fuel Type :</b>{v.fuelType}</p>
                        <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" onClick={() => vehicleHandler(v._id)} style={{ backgroundColor: "#F7752A" }}>Book Now</button>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            <div className="row row-cols-1 row-cols-md-4 g-4" style={{ paddingLeft: "5%", paddingRight: "3%" }}>
                {vehicles}
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Booking Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlfor="recipient-date" className="col-form-label" style={{ textAlign: "center", color: "black" }}><h5>Select Time Slot</h5></label>
                                    <br />
                                    From :<input type="datetime-local" className="form-control" id="recipient-name" onChange={(event) => setBookedFrom(event.target.value)} />
                                    To :<input type="datetime-local" className="form-control" id="recipient-name" onChange={(event) => setBookedTo(event.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlfor="address" className="col-form-label" style={{ textAlign: "center" }}><h5>Address:</h5></label>
                                    <textarea className="form-control" id="message-text" onChange={(event) => setAddress(event.target.value)}></textarea>
                                </div>
                                <div className="mb-3">
                                    <select
                                        className="form-select form-secondary"
                                        aria-label="Disabled select example"
                                        onChange={(event) => setpaymentMode(event.target.value)}
                                        style={{ width: "45%" }}
                                    >
                                        <option className="dropdown-item" selected disabled>
                                            Select Payment Mode
                                        </option>
                                        <option className="dropdown-item" value="Cash">
                                            Cash
                                        </option>
                                        <option className="dropdown-item" value="Online">
                                            Online
                                        </option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-success" onClick={bookingHandler} data-bs-dismiss="modal">Booking Confirmation</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default VehicleByType;
