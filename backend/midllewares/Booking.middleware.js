const { getJwt } = require('../controllers/User.controller')
const BookingModel = require('../models/Booking.model')
const bookingModel = require('../models/Booking.model')
const VehicleModel = require('../models/Vehicle.model')
const AppError = require('../utils/AppError')


const BookingMiddleWare = async (req, res, next) => {
    const currdate = new Date()
    const curYear = currdate.getFullYear()
    let curMonth = currdate.getMonth() + 1
    curMonth = curMonth < 10 ? '0' + curMonth : '' + curMonth
    let curDay = currdate.getDate()
    curDay = curDay < 10 ? '0' + curDay : '' + curDay
    const finalCurDate = `${curYear}-${curMonth}-${curDay}`

    const bookedFrom = req.body.bookedFrom
    const bookedTo = req.body.bookedTo

    const diffTime = Math.abs(new Date(finalCurDate) - new Date(bookedFrom));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays > 10) {
        return next(new AppError("You can't book any vehicle before more than 10 days.", 400))
    }
    if (bookedTo < bookedFrom) {
        return next(new AppError("Select valid Booking time slot.", 400))
    }

    //--Check vehicle Id is valid or not---
    const isExist = await VehicleModel.findById(req.body.vid)
    if (isExist === null) {
        return next(new AppError("Vehicle is not exist.", 400))
    }
    next()
}

//---Check Booking is exist or not
const isBookingExist = async (req, res, next) => {
    if (!req.params.bid) {
        const record = await bookingModel.findById(req.body.bid)
        if (record == null) {
            return next(new AppError("This Booking doesn't exist.", 404))
        }
    }
    else if (!req.body.bid) {
        const record = await bookingModel.findById(req.params.bid)
        if (record == null) {
            return next(new AppError("This Booking doesn't exist.", 404))
        }
    }
    next()
}

//Checking date for booking cancelation
const cancelBookingMiddleware = async (req, res, next) => {
    const currdate = new Date()

    const uid = getJwt(req, res)
    const bookingRecord = await BookingModel.find({ _id: req.body.bookingId, userId: uid })

    const diffTime = Math.abs(new Date(currdate) - new Date(bookingRecord[0].createdAt))
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays > 1) {
        return next(new AppError("Booking counld not be cancel."))
    }
    next()
}

module.exports = {
    BookingMiddleWare,
    isBookingExist,
    cancelBookingMiddleware
}