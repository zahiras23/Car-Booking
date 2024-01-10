import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './CommonComponents/Login'
import CustomerHome from './Customer/Home'
import About from './CommonComponents/About'
import Otp from './CommonComponents/Otp'
import Registration from './Customer/Registration';
import ForgotPassword from './CommonComponents/ForgotPassword'
import ChangePassword from './CommonComponents/ChangePassword'
import CustomerLayout from './Customer/Layout'
import Logout from './CommonComponents/Logout'
import VehicleByType from './Customer/VehicleByType'
import Profile from './CommonComponents/Profile'
import MyBookings from './Customer/MyBookings'
import Feedback from './Customer/Feedback'
import ChangeCurrentPassword from './CommonComponents/ChangeCurrentPassword'
import NotFound from './CommonComponents/NotFound'
import AdminLayout from './Admin/Layout'
import AdminHome from './Admin/AdminHome'
import ManageUser from './Admin/ManageUser'
import AddNewVehicle from './Admin/vehicle/AddVehicle'
import MakeVehicleAvailable from './Admin/MakeVehicleAvailable'
import GetVehiclesByTypes from './Admin/vehicle/GetVehiclesByTypes'
import EditVehicle from './Admin/vehicle/EditVehicle'
import ManageDriver from './Admin/ManageDriver'
import BookingAllotion from './Admin/BookingAllotion'
import DriverLayout from './Driver/Layout'
import DriverHome from './Driver/Home'
import SignUp from './Driver/Signup'
import { useSelector } from 'react-redux'

const MainRouting = () => {
    const [role, setRole] = useState(localStorage.getItem("role"))
    const userState = useSelector(state => state.userState)
    const driverState = useSelector(state => state.driverState)
    const adminState = useSelector(state => state.adminState)

    useEffect(() => {
        if (userState.verifyStatus === 'success') {
            setRole("customer")
            localStorage.setItem("role", "customer")
        }
        else if (adminState.verifyStatus === 'success') {
            setRole("admin")
            localStorage.setItem("role", "admin")
        }
        else if (driverState.verifyStatus === 'success') {
            setRole("driver")
            localStorage.setItem("role", "driver")
        }
    }, [userState.verifyStatus, adminState.verifyStatus, driverState.verifyStatus])

    return (
        <div>
            <Routes>
                <Route element={<CustomerLayout />}>
                    <Route path='/login' element={<Login />} />
                    <Route path="/" element={<CustomerHome />} />
                    <Route path="/about" element={<About />} />
                    <Route path='/otpVarifier' element={<Otp />} />
                    <Route path='/signup' element={<Registration />} />
                    <Route path='/forgotPassword' element={<ForgotPassword />} />
                    <Route path='/forgotPassword/otpVarifier' element={<Otp />} />
                    <Route path='/changeNewPassword' element={<ChangePassword />} />

                    {/* for admin default routing */}
                    <Route path='/adminHome/login' element={<Login />} />
                    <Route path='/adminHome/otpVarifier' element={<Otp />} />
                    <Route path='/admin/forgotPassword' element={<ForgotPassword />} />
                    <Route path='/admin/forgotPassword/otpVarifier' element={<Otp />} />
                    <Route path='/admin/changeNewPassword' element={<ChangePassword />} />

                    {/* For driver default routing*/}
                    <Route path='/driver/signup' element={<SignUp />} />
                    <Route path='/driver/login' element={<Login />} />
                    <Route path='/driver/otpVerify' element={<Otp />} />
                    <Route path='/driver/forgotPassword' element={<ForgotPassword />} />
                    <Route path='/driver/forgotPassword/otpVarifier' element={<Otp />} />
                    <Route path='/driver/changeNewPassword' element={<ChangePassword />} />
                </Route>

                {
                    role === 'customer' && (
                        <Route element={<CustomerLayout />}>
                            <Route path="/about" element={<About />} />
                            <Route path="/" element={<CustomerHome />} />
                            <Route path='/logout' element={<Logout />} />
                            <Route path='/vehicleType/:type' element={<VehicleByType />} />
                            <Route path='/profile' element={<Profile />} />
                            <Route path='/myBookings' element={<MyBookings />} />
                            <Route path='/ratings' element={<Feedback />} />
                            <Route path='/resetPassword' element={<ChangeCurrentPassword />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                    )
                }
                {
                    role === 'admin' && (
                        <Route element={<AdminLayout />}>
                            <Route path='/adminHome' element={<AdminHome />} />
                            <Route path='/adminHome'>
                                <Route path='logout' element={<Logout />} />
                                <Route path='manageUser' element={<ManageUser />} />
                                <Route path='addNewVehicle' element={<AddNewVehicle />} />
                                <Route path='makeVehicleAvailable' element={<MakeVehicleAvailable />} />
                                <Route path='getVehicleByTypes' element={<GetVehiclesByTypes />} />
                                <Route path='editVehicle/:vid' element={<EditVehicle />} />
                                <Route path='manageDriver' element={<ManageDriver />} />
                                <Route path='bookingAllotion' element={<BookingAllotion />} />
                            </Route>
                            <Route path='/adminHome/changePassword' element={<ChangeCurrentPassword />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                    )
                }
                {
                    role === 'driver' && (
                        <Route element={<DriverLayout />}>
                            <Route path='/driver/home' element={<DriverHome />} />
                            <Route path='/driver/about' element={<About />} />
                            <Route path='/driver/profile' element={<Profile />} />
                            <Route path='/driver/resestPassword' element={<ChangeCurrentPassword />} />
                            <Route path='/driver/logout' element={<Logout />} />
                            <Route path='*' element={<NotFound />} />
                        </Route>
                    )
                }
                <Route path='*' element={<NotFound acceessPermission={true} role={role} />} />
            </Routes>
        </div>
    )
}

export default MainRouting
