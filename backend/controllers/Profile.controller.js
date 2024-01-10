const catchAsync = require("../utils/catchAsync")
const jwt = require('jsonwebtoken')

const getJwt = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token, req.key);
    const id = decode.id;
    return id;
}

const getProfileInfo = catchAsync(async (req, res, next) => {
    const id = getJwt(req, res)
    const record = await req.model.findById(id)
    if (record) {
        res.status(200).json({
            record
        })
    }
    next()
})

//--update profile
const updateprofile = catchAsync(async (req, res, next) => {
    const Id = getJwt(req, res)
    const updatedRecord = await req.model.findByIdAndUpdate(Id,
        {
            userName: req.body.userName,
            email: req.body.email,
            contactNo: req.body.contact,
            address: req.body.address
        }
    )
    if (updatedRecord) {
        res.status(200).json({
            message: "Profile updated successfully."
        })
    }
    next()
})

module.exports = {
    getProfileInfo,
    updateprofile
}