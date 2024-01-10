const OtpModel = require("../models/Otp.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs")

const forgotPassword = catchAsync(async (req, res, next) => {
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, +req.salt)

    const record = await req.model.findOneAndUpdate(
        { email: email },
        {
            password: password
        }
    )
    if (record) {
        res.status(200).json({
            message: "Password has been updated successfully."
        })
    } else {
        return next(new AppError("This Account Doesn't exist.", 400))
    }
})

const passwordOtpVerify = catchAsync(async (req, res, next) => {
    const record = await OtpModel.find({
        email: req.body.email
    })
    if (record.length <= 0) {
        return next(new AppError("Unauthorized User", 401))
    }
    else {
        const expiresAt = record[0].expiresAt
        const dbOTP = record[0].otp
        const currentTimestamp = new Date()
        if (expiresAt < currentTimestamp) {
            const r = await OtpModel.deleteMany({ email: req.body.email })
            return next(new AppError("Your OTP is expired!", 400))

        } else {
            const hasedOtp1 = await bcrypt.compare(req.body.otp, dbOTP)
            if (!hasedOtp1) {
                return next(new AppError("Invalid OTP!", 400))
            } else {
                const r = await OtpModel.deleteMany({ email: req.body.email })
                res.status(200).json({
                    message: "OTP is verified succefully."
                })
            }
        }
    }
})

module.exports = {
    forgotPassword,
    passwordOtpVerify
}