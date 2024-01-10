const mongoose = require("mongoose");
const userModel = require("../models/User.model");
const driverModel = require("../models/Driver.model")
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const BookingModel = require("../models/Booking.model");
const VehicleModel = require("../models/Vehicle.model");

//---Fetch all Registered Users---
const fetchAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await userModel.find(
    {},
    { password: 0, dob: 0, address: 0, createdAt: 0, updatedAt: 0 }
  );
  if (allUsers != []) {
    res.status(200).json({
      allUsers
    })
  }
  else {
    return next(new AppError("There is no users exist.", 404))
  }
});

//---Update User Status
const updateUserStatus = catchAsync(async (req, res, next) => {
  const uid = req.params.id
  const checkUser = await userModel.findById(new mongoose.Types.ObjectId(uid))
  if (checkUser) {
    //For activate status
    if (checkUser.status === "Activate") {
      const userStatus = await userModel.updateOne(
        { _id: new mongoose.Types.ObjectId(uid), status: "Activate" },
        {
          $set: {
            status: "Deactivate"
          }
        })
      if (userStatus.matchedCount === 1) {
        res.status(200).json({
          message: `${checkUser.userName} is deactivated successfully.`
        })
      }

    }
    //For Deactivate status
    else if (checkUser.status === "Deactivate") {
      const userStatus = await userModel.updateOne(
        { _id: new mongoose.Types.ObjectId(uid), status: "Deactivate" },
        {
          $set: {
            status: "Activate"
          }
        })
      if (userStatus.matchedCount === 1) {
        res.status(200).json({
          message: `${checkUser.userName} is activated successfully.`
        })
      }
    }
  } else {
    return next(new AppError("User doesn't exist.", 404))
  }
})


//---Fetch all registered Drivers---
const fetchAllDrivers = catchAsync(async (req, res, next) => {
  const allDrivers = await driverModel.find({},
    { password: 0, dob: 0, address: 0, createdAt: 0, updatedAt: 0 }
  )
  if (allDrivers != []) {
    res.status(200).json({
      allDrivers
    })
  }
  else {
    return next(new AppError("There is no Driver exist.", 404))
  }
  next()
})

//---Update Driver Status
const updateDriverStatus = catchAsync(async (req, res, next) => {
  const uid = req.params.id
  const checkDriver = await driverModel.findById(new mongoose.Types.ObjectId(uid))
  if (checkDriver) {
    //For activate status
    if (checkDriver.status === "Activate") {
      const driverStatus = await driverModel.updateOne(
        { _id: new mongoose.Types.ObjectId(uid), status: "Activate" },
        {
          $set: {
            status: "Deactivate"
          }
        })
      if (driverStatus.matchedCount === 1) {
        res.status(200).json({
          message: `${checkDriver.userName} is deactivated successfully.`
        })
      }
    }
    //For Deactivate status
    else if (checkDriver.status === "Deactivate") {
      const driverStatus = await driverModel.updateOne(
        { _id: new mongoose.Types.ObjectId(uid), status: "Deactivate" },
        {
          $set: {
            status: "Activate"
          }
        })
      if (driverStatus.matchedCount === 1) {
        res.status(200).json({
          message: `${checkDriver.userName} is activated successfully.`
        })
      }
    }
  } else {
    return next(new AppError("User doesn't exist.", 404))
  }
})

//---Get booking data of which user booked with only pending status
const getAllBookingData = catchAsync(async (req, res, next) => {
  const bookingData = await BookingModel.aggregate([
    {
      $match: {
        "status": "Pending"
      }
    },
    {
      $lookup: {
        from: "tblvehicles",
        localField: "vehicleId",
        foreignField: "_id",
        as: "vehicleInfo"
      }
    },
    {
      $lookup: {
        from: "tblusers",
        localField: "userId",
        foreignField: "_id",
        as: "userInfo"
      }
    },
    {
      $project: {
        "vehicleInfo.vehicleName": 1,
        "vehicleInfo.photo": 1,
        "vehicleInfo.fuelType": 1,
        "vehicleInfo.rentPerKm": 1,
        "vehicleInfo.vehicleNo": 1,
        "userInfo.userName": 1,
        "userInfo.email": 1,
        "bookedFrom": 1,
        "bookedTo": 1,
        "pickUpAddress": 1,
        "status": 1
      }
    }
  ])
  res.status(200).json({
    bookingData
  })
})

//---Get verified drivers
const getVerifiedDrivers = catchAsync(async (req, res, next) => {
  const records = await driverModel.find({ isVerified: true }, { userName: 1 })
  if (records.length > 0) {
    res.status(200).json({
      records
    })
    next()
  }
})

//---Allocate driver for trip
const allocateDriverToTrip = catchAsync(async (req, res, next) => {
  const recordStatus = await BookingModel.findByIdAndUpdate(
    { _id: req.params.bid },
    {
      $set: {
        driverId: req.body.enteredDriver,
        status: "Allocated"
      }
    }
  )
  if (recordStatus != null) {
    res.status(200).json({
      message: "Driver has allocated successfully."
    })
    next()
  }
})

//---Change Driver's verify status
const updateDriverVerify = catchAsync(async (req, res, next) => {
  const uid = req.params.id
  const checkDriver = await driverModel.findById(new mongoose.Types.ObjectId(uid))
  if (checkDriver) {
    //For make driver unVerify
    if (checkDriver.isVerified === true) {
      const driverStatus = await driverModel.updateOne(
        { _id: new mongoose.Types.ObjectId(uid), isVerified: true },
        {
          $set: {
            isVerified: false
          }
        })
      if (driverStatus.matchedCount === 1) {
        res.status(200).json({
          message: "Driver's verification is updated successfully."
        })
      }
    }
    //For Verify status
    else if (checkDriver.isVerified === false) {
      const driverStatus = await driverModel.updateOne(
        { _id: new mongoose.Types.ObjectId(uid), isVerified: false },
        {
          $set: {
            isVerified: true
          }
        })
      if (driverStatus.matchedCount === 1) {
        res.status(200).json({
          message: "Driver's verification is updated successfully."
        })
      }
    }
  } else {
    return next(new AppError("User doesn't exist.", 404))
  }
})

//---get allocated vehicle for make available
const getVehicleAllocated = catchAsync(async (req, res, next) => {
  const vehicleRecords = await BookingModel.aggregate([
    {
      $match: {
        status: "Allocated"
      }
    },
    {
      $lookup: {
        from: "tblvehicles",
        localField: "vehicleId",
        foreignField: "_id",
        as: "joined"
      }
    },
    {
      $project: {
        "bookedFrom": 1,
        "bookedTo": 1,
        "status": 1,
        "joined.vehicleName": 1,
        "joined._id": 1,
        "joined.color": 1,
        "joined.photo": 1,
        "joined.rentPerKm": 1,
        "joined.vehicleNo": 1
      }
    },
  ])
  res.status(200).json({
    vehicleRecords
  })
})

//---Edit allocated vehicle with return date and make vehicle vailable
const makeVehicleAvailable = catchAsync(async (req, res, next) => {
  const bookingStatus = req.body.bookingStatus
  const vehicleStatus = bookingStatus === 'Allocated' ? "Booked" : "Available"

  const bookingRecord = await BookingModel.findByIdAndUpdate(
    req.body.bid,
    {
      returDateTime: req.body.returndatetime,
      status: bookingStatus
    }
  )
  if (bookingRecord) {
    const vehicleRecord = await VehicleModel.findByIdAndUpdate(
      req.body.vid,
      { status: vehicleStatus }
    )
    if (vehicleRecord) {
      res.status(200).json({
        message: `Now ${vehicleRecord.vehicleName} is available.`
      })
    }
  } else {
    return next(new AppError("There was something wrong!", 400))
  }
})

//get total customers,drivers,vehicles
const counting = catchAsync(async (req, res, next) => {
  const totalCutomers = await userModel.find().count()
  const totalDrivers = await driverModel.find().count()
  const totalVehicles = await VehicleModel.find().count()
  const totalVerifiedDrivers = await driverModel.find({ isVerified: true }).count()
  const totalPendingBookings = await BookingModel.find({ status: "Pending" }).count()

  res.status(200).json({
    totalCutomers,
    totalDrivers,
    totalVehicles,
    totalVerifiedDrivers,
    totalPendingBookings
  })
  next()
})


module.exports = {
  fetchAllUsers,
  updateUserStatus,
  fetchAllDrivers,
  updateDriverStatus,
  getAllBookingData,
  allocateDriverToTrip,
  getVerifiedDrivers,
  updateDriverVerify,
  getVehicleAllocated,
  makeVehicleAvailable,
  counting,
};
