const bookingModel = require('../models/Booking.model');
const VehicleModel = require('../models/Vehicle.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

//---Get Token---
const getJwt = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token, req.key);
    const id = decode.id;
    return id;
}

//---Vehicle Booking---
const bookVehicle = catchAsync(async (req, res, next) => {
    const uid = getJwt(req, res)

    const newBooking = new bookingModel({
        vehicleId: req.body.vid,
        userId: uid,
        bookedFrom: req.body.bookedFrom,
        bookedTo: req.body.bookedTo,
        pickUpAddress: req.body.address,
        paymentMode: req.body.paymentMode,
    })
    const result = await newBooking.save();

    //console.log(result)
    if (result !== null) {
        const updateRecord = await VehicleModel.findByIdAndUpdate(result.vehicleId, { status: "Booked" })
        if (updateRecord != null) {
            res.status(201).json({
                message: "🎉Congratulations! Your Booking is done.🎉"
            })
        }
    }
    next()
})

module.exports = {
    bookVehicle
}