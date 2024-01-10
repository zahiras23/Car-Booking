const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/User.model')
const catchAsync = require('../utils/catchAsync')

const otpModel = require('../models/Otp.model')
const nodeMailer = require('nodemailer')
const AppError = require('../utils/AppError')
const VehicleModel = require('../models/Vehicle.model')
const BookingModel = require('../models/Booking.model')
require('dotenv').config({ path: 'config.env' })

//---Get Token---
const getJwt = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token, req.key);
    const id = decode.id;
    return id;
}

//---Register user---
const registerUser = catchAsync(async (req, res) => {
    const password = await bcrypt.hash(req.body.password, + process.env.SALT)
    const newUser = new userModel({
        userName: req.body.uname,
        email: req.body.email,
        password: password,
        dob: req.body.dob,
        contactNo: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
        pincode: req.body.pincode
    })
    await newUser.save()
    res.status(201).json({
        message: 'User registered successfully.'
    })
})


//---Logout user
const logoutUser = (req, res) => {
    try {
        res.status(200).json({
            mesage: 'success'
        })
    } catch (error) {
        res.status(500).json({
            errorMessage: errorFormat(error.message)
        })
    }
}

//---Forgot password
const forgotPassword = async (req, res) => {
    try {
        const email = req.body.email
        const password = await bcrypt.hash(req.body.password, +process.env.SALT)

        const record = await userModel.findOneAndUpdate(
            { email: email },
            {
                password: password
            }
        )
        if (record) {
            res.status(200).json({
                message: 'Password has been updated successfully.'
            })
        } else {
            res.status(400).json({
                message: 'Please,give valid email address.'
            })
        }

    } catch (error) {
        res.status(500).json({
            errorMessage: errorFormat(error.message)
        })
    }
}

//Get all vehicles by vehicle types and status
const vehicleByType = catchAsync(async (req, res, next) => {
    const type = req.body.vehicleType;
    const vehicles = await VehicleModel.find({ vehicleType: type, status: "Available", isDeleted: false })
    if (vehicles.length > 0) {
        res.status(200).json({
            vehicles
        })
    } else {
        return next(new AppError("Not available any vehicle of this vehicle type!", 404))
    }
})

//Get booking details of loggedIn user
const getBookingByUser = catchAsync(async (req, res, next) => {
    const uid = getJwt(req, res)
    const userBookingData = await BookingModel.aggregate(
        [
            {
                $match: {
                    "userId": new mongoose.Types.ObjectId(uid)
                }
            },
            {
                $lookup: {
                    from: "tblvehicles",
                    localField: "vehicleId",
                    foreignField: "_id",
                    as: "joined"
                }
            },
            {
                $project: {
                    "bookedFrom": 1,
                    "bookedTo": 1,
                    "designation": 1,
                    "pickUpAddress": 1,
                    "status": 1,
                    "joined.vehicleName": 1,
                    "joined.color": 1,
                    "joined.capacity": 1,
                    "joined.photo": 1,
                    "joined.fuelType": 1,
                    "joined.rentPerKm": 1,
                    "joined.vehicleNo": 1,
                    "joined._id": 1
                }
            }
        ]
    )
    if (userBookingData !== []) {
        res.status(200).json({
            userBookingData
        })
    } else {
        res.status(200).json({
            message: "Till now you haven't booked any vehicle for rent."
        })
    }
})

//Cancel Booking
const cancelBooking = catchAsync(async (req, res, next) => {
    const vehicleRecord = await VehicleModel.findByIdAndUpdate(req.body.vehicleId, {
        status: "Available"
    })
    if (vehicleRecord) {
        const bookingRecord = await BookingModel.findByIdAndDelete({ _id: req.body.bookingId })
        if (bookingRecord) {
            res.status(200).json({
                message: "Your booking cancelled successfully."
            })
        }
    }
    next()
})


module.exports = {
    registerUser,
    logoutUser,
    forgotPassword,
    vehicleByType,
    getBookingByUser,
    cancelBooking,
    getJwt,
}