const catchAsync = require("../utils/catchAsync")

const logout = (req, res) => {
    return res.status(200).json({
        mesage: "You are successfully logged out."
    })
}

module.exports = {
    logout
}