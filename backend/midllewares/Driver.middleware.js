const DriverModel = require('../models/Driver.model')
const AppError = require('../utils/AppError')
const { emailVerifyMiddleWare } = require('./Common.middleware')
require('dotenv').config({ path: 'config.env' })

const registerDriverMiddleware = (req, res, next) => {
    const currdate = new Date()
    const curYear = currdate.getFullYear()
    let curMonth = currdate.getMonth() + 1
    curMonth = curMonth < 10 ? '0' + curMonth : '' + curMonth
    let curDay = currdate.getDate()
    curDay = curDay < 10 ? '0' + curDay : '' + curDay

    const dob = req.body.dob
    const finalCurDate = `${curYear}-${curMonth}-${curDay}`

    if (!emailVerifyMiddleWare(req.body.email)) {
        return next(new AppError('Provide Valid Email Address.'), 400)
    }
    if (dob > finalCurDate) {
        return next(new AppError('Give valid date of birth'), 400)
    }
    if (req.body.password.trim().length < 6) {
        return next(new AppError('Password has minimum 6 character'), 400)
    }
    if (req.body.password !== req.body.cpassword) {
        return next(new AppError('Password and Confirm password must be same'), 400)
    }
    if (req.body.pincode.trim().length < 6 || req.body.pincode.trim().length > 6) {
        return next(new AppError('Pincode has exact 6 digits'), 400)
    }
    next()
}

const selectDriverModel = (req, res, next) => {
    req.model = DriverModel;
    next()
}

const selectSecretKey = (req, res, next) => {
    req.key = process.env.DRIVER_SECRET_KEY
    next()
}

const selectDriverSalt = (req, res, next) => {
    req.salt = process.env.DRIVER_SALT
    next()
}

module.exports = {
    registerDriverMiddleware,
    selectSecretKey,
    selectDriverModel,
    selectDriverSalt,
}