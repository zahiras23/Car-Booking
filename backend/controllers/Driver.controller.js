const BookingModel = require('../models/Booking.model');
const DriverModel = require('../models/Driver.model')
const catchAsync = require('../utils/catchAsync')
const bcrypt = require('bcryptjs')
const nodeMailer = require("nodemailer");
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

//---Get Token---
const getJwt = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token, req.key);
    const id = decode.id;
    return id;
}

//---Driver registration 
const registerDriver = catchAsync(async (req, res, next) => {
    const password = await bcrypt.hash(req.body.password, + process.env.DRIVER_SALT)
    const newDriver = new DriverModel({
        userName: req.body.name,
        email: req.body.email,
        password: password,
        dob: req.body.dob,
        contactNo: req.body.contact,
        gender: req.body.gender,
        address: req.body.address,
        pincode: req.body.pincode
    })
    const result = await newDriver.save()
    if (result != null) {
        const email = req.body.email
        let transporter = nodeMailer.createTransport({
            service: "Gmail",
            auth: {
                user: "krutikarana576@gmail.com",
                pass: "qqpufcnksaxgkdki",
            },
        });

        let info = await transporter.sendMail({
            from: "Rent A Vehicle",
            to: email,
            subject: "Identity Verification",
            text: "Please,Verify your Id Proof",
            html: `${email}, please verify your Id Proof(License) at Athwalines,Surat help center to get driver post with us.Thank You.`,
        });
        const status = info.messageId;
    }
    res.status(201).json({
        message: 'New Driver registered successfully.'
    })
});

//---Get all booking which are allocated to loggedIn driver
const getDriverAssignedBooking = catchAsync(async (req, res, next) => {
    const driverId = getJwt(req, res)
    const records = await BookingModel.aggregate([
        {
            $match: {
                "driverId": new mongoose.Types.ObjectId(driverId)
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
            $sort: {
                "updatedAt": -1
            }
        },
        {
            $project: {
                "bookedFrom": 1,
                "bookedTo": 1,
                "pickUpAddress": 1,
                "status": 1,
                "joined.vehicleName": 1,
                "joined.color": 1,
                "joined.capacity": 1,
                "joined.photo": 1,
                "joined.fuelType": 1,
                "joined.rentPerKm": 1,
                "joined.vehicleNo": 1
            }
        },
    ])
    if (records !== []) {
        res.status(200).json({
            records
        })
    } else {
        res.status(200).json({
            message: "Till now no booking assigned to you."
        })
    }
})


module.exports = {
    registerDriver,
    getDriverAssignedBooking,
}