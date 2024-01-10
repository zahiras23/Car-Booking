import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getProfile, updateProfile } from '../../slices/Profile.slice';
import Spinner from './Spinner';

const Profile = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()
    const profileState = useSelector(state => state.profileState)
    const userState = useSelector(state => state.userState)
    const driverState = useSelector(state => state.driverState)

    const navigate = useNavigate()
    const roleRef = useRef(null);
    // const role = " "
    useEffect(() => {
        if (userState.verifyStatus === 'success') {
            roleRef.current = "customer"
        }
        else if (driverState.verifyStatus === 'success') {
            roleRef.current = "driver"
        }
    }, [userState.verifyStatus, driverState.verifyStatus])

    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])
    roleRef.current = localStorage.getItem("role")

    useEffect(() => {
        if (profileState.profileUpdateStatus === 'success' && roleRef.current === 'driver') {
            navigate("/driver/home")
        }
        if (profileState.profileUpdateStatus === 'success' && roleRef.current === 'customer') {
            navigate("/")
        }
    }, [navigate, profileState, roleRef])

    useEffect(() => {
        if (profileState.profileData !== []) {
            setUserName(profileState.profileData.userName)
            setEmail(profileState.profileData.email)
            setContact(profileState.profileData.contactNo)
            setAddress(profileState.profileData.address)
            setLoading(false)
        }
    }, [profileState.profileData])

    //update profile handler
    const profileHandler = (event) => {
        const contactExpression = /^(0|91)?[6-9][0-9]{9}$/
        const emailExpression = /[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,3}$/

        if (userName.trim().length === 0) {
            toast.error("Please Enter User Name")
        }
        else if (email.trim().length === 0 || !emailExpression.test(email)) {
            toast.error("Please Enter Valid Email")
        }
        else if (contact.trim().length === 0 || !contactExpression.test(contact)) {
            toast.error("Please Enter Valid Contact Number")
        }
        else if (address.trim().length === 0) {
            toast.error("Please Enter Address")
        }
        else {
            const Data = {
                userName, email, contact, address
            }
            dispatch(updateProfile(Data))
        }
    }
    return (
        <>
            {loading ? <Spinner /> :
                <section className="vh-100" style={{ backgroundColor: "#eee" }}>
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-md-9 col-lg-7 col-xl-5">
                                <div className="card" style={{ borderRadius: "15px", backgroundColor: "white" }}>
                                    <div className="card-body p-4 text-black">

                                        <div className="d-flex align-items-center mb-4">
                                            <div className="flex-shrink-0">
                                                <AccountCircleIcon fontSize='large' />
                                            </div>
                                            <div className="flex-grow-1 ms-3">
                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <p className="mb-0 me-2 h5">{profileState.profileData.userName}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <label htmlFor='userName' className='profileLabel'>UserName</label>
                                        <input type="text" onChange={(event) => setUserName(event.target.value)} value={userName || ""} className='form-control' />
                                        <br /><label htmlFor='email' className='profileLabel'>Email</label>
                                        <input type="email" onChange={(event) => setEmail(event.target.value)} value={email || ""} className='form-control' />
                                        <br /><label htmlFor='contact' className='profileLabel'>Contact</label>
                                        <input type="number" onChange={(event) => setContact(event.target.value)} value={contact || ""} className='form-control' />
                                        <br /><label htmlFor='address' className='profileLabel'>Address</label>
                                        <input type="text" onChange={(event) => setAddress(event.target.value)} value={address || ""} className='form-control' />
                                        <br /><button type="button" className="btn btn-outline-success btn-rounded btn-block btn-sm" onClick={profileHandler}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>

    );
}

export default Profile;
