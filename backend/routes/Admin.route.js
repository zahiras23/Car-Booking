const express = require("express");
const bodyParser = require("body-parser");
const {
  loginMiddleWare,
  login,
  otpVerify,
  generateSendOTP,
} = require("../controllers/Login.controller");
const {
  selectAdminModel,
  selectSecretKey,
  selectAdminSalt,
} = require("../midllewares/Admin.middleware");

const { verifyToken } = require("../midllewares/Auth.controller");
const { logout } = require("../controllers/Logout.controller");
const adminController = require("../controllers/Admin.controller");
const BookingMiddleWare = require("../midllewares/Booking.middleware");
const { changePassword } = require("../controllers/ChangePassword.controller");
const { changePasswordMiddlware, OTPMiddleWare } = require("../midllewares/Common.middleware");
const { vehicleMiddleWare } = require("../midllewares/Vehicle.middleware");
const { passwordOtpVerify, forgotPassword } = require("../controllers/forgotPassword.controller");
const router = express.Router();

router.use(bodyParser.json());

router.use(selectAdminModel);
router.use(selectSecretKey);
router.use(selectAdminSalt);

router.post("/loginAdmin", loginMiddleWare, login);
router.post("/adminValidate/otpVerify", otpVerify);
router.post("/logoutAdmin", verifyToken, logout);

router.get("/fetchAllUsers", verifyToken, adminController.fetchAllUsers);
router.post(
  "/updateUserStatus/:id",
  verifyToken,
  adminController.updateUserStatus
);
router.post(
  "/updateDriverVerify/:id",
  verifyToken,
  adminController.updateDriverVerify
);

router.get("/fetchAllDrivers", verifyToken, adminController.fetchAllDrivers);
router.post(
  "/updateDriverStatus/:id",
  verifyToken,
  adminController.updateDriverStatus
);

router.post(
  "/getAllBookingData",
  verifyToken,
  adminController.getAllBookingData
);
router.post(
  "/getVerifiedDrivers",
  verifyToken,
  adminController.getVerifiedDrivers
);
router.patch(
  "/allocateDriverToTrip/:bid",
  verifyToken,
  BookingMiddleWare.isBookingExist,
  adminController.allocateDriverToTrip
);

router.patch(
  "/changePassword",
  changePasswordMiddlware,
  verifyToken,
  changePassword
);

router.post(
  "/getVehicleAllocated",
  verifyToken,
  adminController.getVehicleAllocated
);
router.patch(
  "/makeVehicleAvailable",
  BookingMiddleWare.isBookingExist,
  vehicleMiddleWare,
  verifyToken,
  adminController.makeVehicleAvailable
);

//counting all users
router.get("/counting", verifyToken, adminController.counting)

// forgot password
router.post("/forgotPassword/otpGeneration", OTPMiddleWare, generateSendOTP)
router.post("/forgotPassword/otpVerify", OTPMiddleWare, passwordOtpVerify)
router.patch("/forgotPassword", OTPMiddleWare, forgotPassword)

module.exports = router;
