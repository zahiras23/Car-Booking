const mongoose = require('mongoose')
const VehicleModel = require('../models/Vehicle.model')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/AppError')
require('dotenv').config({ path: 'config.env' })
const cloudinary = require('../utils/Clodinary')
const { extractPublicId } = require('cloudinary-build-url')
const BookingModel = require('../models/Booking.model')

//---Register New Vehicle
const registerVehicle = catchAsync(async (req, res) => {
    const result = await cloudinary.uploader.upload(req.files.image.path, { upload_preset: "demo" })

    const newVehicle = new VehicleModel({
        vehicleName: req.fields.name,
        color: req.fields.color,
        capacity: req.fields.capacity,
        photo: result.url,
        fuelType: req.fields.fuel,
        rentPerKm: req.fields.rent,
        vehicleNo: req.fields.no,
        penaltyPerDay: req.fields.panelty,
        vehicleType: req.fields.type
    })
    await newVehicle.save()
    res.status(201).json({
        message: 'New Vehicle registered successfully.'
    })
})

//Get all vehicle by type
const vehicleByType = catchAsync(async (req, res, next) => {
    const type = req.body.vehicleType;
    const vehicles = await VehicleModel.find({ vehicleType: type, isDeleted: false })
    if (vehicles.length > 0) {
        res.status(200).json({
            vehicles
        })
    } else {
        return next(new AppError("Not available any vehicle of this vehicle type!", 404))
    }
})

//Delete Vehicle 
const deleteVehicle = catchAsync(async (req, res, next) => {
    const deleteRecord = await VehicleModel.findByIdAndUpdate(req.params.vid, {
        isDeleted: true,
        status: "Not-available"
    })
    const bookingStatusCancel = await BookingModel.findOneAndUpdate({ status: "Pending", vehicleId: req.params.vid }, { status: "Cancelled" })
    if (deleteRecord) {
        res.status(200).json({
            message: `${deleteRecord.vehicleName} ${deleteRecord.vehicleType} deleted successfully.`
        })
    }
    next();
})

//---Get one vehicle---
const getVehicle = catchAsync(async (req, res, next) => {
    const record = await VehicleModel.findById(req.params.vid)
    res.status(200).json({
        record
    })
    next()
})

//---Edit vehicle
const editVehicle = catchAsync(async (req, res, next) => {
    const imageUrlRecord = await VehicleModel.findById(req.params.vid);
    const publicId = extractPublicId(imageUrlRecord.photo)

    cloudinary.uploader.destroy(publicId, function (error, result) {
        if (error) {
            return next(new AppError("There was something wrong!"))
        }
    })
    const result = await cloudinary.uploader.upload(req.files.image.path, { upload_preset: "demo" }, async function (error, result) {
        if (error) {
            return next(new AppError(error.message, 400))
        } else {
            const record = await VehicleModel.findByIdAndUpdate(req.params.vid, {
                vehicleName: req.fields.name,
                color: req.fields.color,
                capacity: req.fields.capacity,
                photo: result.url,
                fuelType: req.fields.fuel,
                rentPerKm: req.fields.rent,
                vehicleNo: req.fields.no,
                penaltyPerDay: req.fields.panelty,
                vehicleType: req.fields.type
            })
            res.status(200).json({
                message: `${record.vehicleName} is updated successfully. `
            })
        }
    })
})

module.exports = {
    registerVehicle,
    vehicleByType,
    deleteVehicle,
    getVehicle,
    editVehicle,

}