const VehicleModel = require('../models/Vehicle.model')
const AppError = require('../utils/AppError')

const vehicleMiddleWare = async (req, res, next) => {
    //--Check vehicle Id is valid or not---
    if (!req.body.vid) {
        const isExist = await VehicleModel.findById(req.params.vid)
        if (isExist === null) {
            return next(new AppError("Vehicle is not exist.", 400))
        }
    }
    else if (!req.params.vid) {
        const isExist = await VehicleModel.findById(req.body.vid)
        if (isExist === null) {
            return next(new AppError("Vehicle is not exist.", 400))
        }
    }
    next()
}

module.exports = {
    vehicleMiddleWare,
}