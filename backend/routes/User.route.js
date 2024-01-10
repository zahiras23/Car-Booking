const express = require('express');
const router = express.Router();
const userController = require('../controllers/User.controller')
const userMiddleware = require('../midllewares/User.middleware');
const { loginMiddleWare, login, otpVerify, generateSendOTP } = require('../controllers/Login.controller');
const { verifyToken } = require('../midllewares/Auth.controller');
const { logout } = require('../controllers/Logout.controller');
const { forgotPassword, passwordOtpVerify } = require('../controllers/forgotPassword.controller');
const { OTPMiddleWare, changePasswordMiddlware } = require('../midllewares/Common.middleware');
const { BookingMiddleWare, cancelBookingMiddleware } = require('../midllewares/Booking.middleware');
const bookingController = require('../controllers/Booking.controller');
const { changePassword } = require('../controllers/ChangePassword.controller');
const { giveFeedback, getFeedback } = require('../controllers/Feedback.controller');
const { verify } = require('jsonwebtoken');
const { getProfileInfo, updateprofile } = require('../controllers/Profile.controller');

router.use(userMiddleware.selectUserModel)
router.use(userMiddleware.selectSecretKey)
router.use(userMiddleware.selectUserSalt)

router.post("/registerUser", userMiddleware.registerUserMiddleware, userController.registerUser)
router.post("/loginUser", loginMiddleWare, login)
router.post("/userValidate/otpVerify", otpVerify)
router.post("/forgotPassword/otpGeneration", OTPMiddleWare, generateSendOTP)
router.post("/forgotPassword/otpVerify", OTPMiddleWare, passwordOtpVerify)
router.patch("/forgotPassword", OTPMiddleWare, forgotPassword)
router.post("/logoutUser", verifyToken, logout)

//---vehicle by types Routing---
router.post("/getVehicleByType", verifyToken, userController.vehicleByType)

//booking Routing---
router.post("/bookVehicle", verifyToken, BookingMiddleWare, bookingController.bookVehicle)

//get booking data of loggedIn user
router.post("/getBookingByUser", verifyToken, userController.getBookingByUser)

//reset password
router.patch("/changePassword", changePasswordMiddlware, verifyToken, changePassword)

//Give feedback
router.post("/giveFeedback", verifyToken, giveFeedback)

//get all feedback
router.get("/getFeedback", getFeedback)

//cancel booking
router.post("/cancelBooking", verifyToken, cancelBookingMiddleware, userController.cancelBooking)

//get profile information
router.post("/getProfileInfo", verifyToken, getProfileInfo)
//update driver profile
router.patch("/updateProfile", verifyToken, updateprofile)

module.exports = router;