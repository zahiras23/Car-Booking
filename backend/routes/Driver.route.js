const express = require("express");
const router = express.Router()
const DriverController = require('../controllers/Driver.controller')
const DriverMiddleware = require('../midllewares/Driver.middleware');
const { loginMiddleWare, login, otpVerify, generateSendOTP } = require("../controllers/Login.controller");
const { logout } = require("../controllers/Logout.controller");
const { verifyToken } = require("../midllewares/Auth.controller");
const { changePasswordMiddlware, OTPMiddleWare } = require("../midllewares/Common.middleware");
const { changePassword } = require("../controllers/ChangePassword.controller");
const { getProfileInfo, updateprofile } = require("../controllers/Profile.controller");
const { passwordOtpVerify, forgotPassword } = require("../controllers/forgotPassword.controller");

router.use(DriverMiddleware.selectSecretKey)
router.use(DriverMiddleware.selectDriverModel)
router.use(DriverMiddleware.selectDriverSalt)

router.post("/registerDriver", DriverMiddleware.registerDriverMiddleware, DriverController.registerDriver)
router.post("/loginDriver", loginMiddleWare, login)
router.post("/driverValidate/otpVerify", otpVerify)
router.post("/logoutDriver", verifyToken, logout)
router.post("/getDriverAssignedBooking", verifyToken, DriverController.getDriverAssignedBooking)

//forgot password
router.post("/forgotPassword/otpGeneration", OTPMiddleWare, generateSendOTP)
router.post("/forgotPassword/otpVerify", OTPMiddleWare, passwordOtpVerify)
router.patch("/forgotPassword", OTPMiddleWare, forgotPassword)

//reset password
router.patch("/changePassword", changePasswordMiddlware, verifyToken, changePassword)

//Get Profile information
router.post("/getProfileInfo", verifyToken, getProfileInfo)

//update driver profile
router.patch("/updateProfile", verifyToken, updateprofile)

module.exports = router
