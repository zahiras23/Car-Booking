const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require('bcryptjs')

const changePassword = catchAsync(async (req, res, next) => {
    const record = await req.model.findOne({ email: req.body.email })
    if (record) {
        const isMatched = await bcrypt.compare(req.body.currentPassword, record.password);
        if (isMatched) {
            const newPassword = await bcrypt.hash(req.body.newPassword, + req.salt)
            const updateRecord = await req.model.findOneAndUpdate(
                { email: req.body.email },
                {
                    password: newPassword
                }
            )
            if (updateRecord) {
                res.status(200).json({
                    message: "Password Changed Successfully."
                })
            }
        }
        else {
            return next(new AppError("Incorrect password", 401))
        }
    }
    else {
        return next(new AppError("Invalid Email Id", 401))

    }
})

module.exports = {
    changePassword
}