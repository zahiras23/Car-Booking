const AppError = require("../utils/AppError")

const emailVerifyMiddleWare = (email) => {
    console.log("email=" + email)
    const exp = /[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
    if (!email.match(exp)) {
        return false;
    }
    return true
}

const OTPMiddleWare = async (req, res, next) => {
    if (!emailVerifyMiddleWare(req.body.email)) {
        return next(new AppError('Provide Valid Email Address.'), 403)
    }
    const record = await req.model.find({ email: req.body.email })
    if (record.length <= 0) {
        return next(new AppError("Email is not registered.", 403))
    }
    next()
}

const changePasswordMiddlware = (req, res, next) => {
    if (!emailVerifyMiddleWare(req.body.email)) {
        return next(new AppError('Provide Valid Email Address.'), 400)
    }
    next()
}


module.exports = {
    emailVerifyMiddleWare,
    OTPMiddleWare,
    changePasswordMiddlware,

}