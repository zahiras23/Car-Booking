const { emailVerifyMiddleWare } = require("../midllewares/Common.middleware");
const OtpModel = require("../models/Otp.model");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const loginMiddleWare = (req, res, next) => {
  if (req.body.password.trim().length < 6) {
    return next(new AppError("Password has minimum 6 character"), 400);
  }
  if (!emailVerifyMiddleWare(req.body.email)) {
    return next(new AppError("Provide Valid Email Address."), 400);
  }
  next();
};

//login
const login = catchAsync(async (req, res, next) => {
  const email = req.body.email;

  const record = await req.model.findOne({ email: req.body.email });
  if (record) {
    const isMatched = await bcrypt.compare(req.body.password, record.password);
    if (isMatched && record.status === "Activate") {
      const id = record._id;
      //nodemailer through send email
      generateSendOTP(req, res);
    } else {
      return next(new AppError("Your Password may be wrong Or You are deactivated by Admin", 400));
    }
  } else {
    return next(new AppError("User doesn't exist!", 401));
  }
});

//---Generate and send OTP
const generateSendOTP = catchAsync(async (req, res) => {
  const email = req.body.email;

  // console.log('email==' + email)
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log("otp--" + otp);
  let transporter = nodeMailer.createTransport({
    service: "Gmail",
    auth: {
      user: "krutikarana576@gmail.com",
      pass: "qqpufcnksaxgkdki",
    },
  });

  let info = await transporter.sendMail({
    from: "Rent A Vehicle",
    to: email,
    subject: "Email Verification",
    text: "Please,Verify your Email",
    html: `Your One Time password is <b>${otp}</b>.Never share it with anyone.`,
  });
  const status = info.messageId;

  //store otp in databse
  const hasedOtp = await bcrypt.hash(otp.toString(), +process.env.OTP_SALT);
  let d = new Date();
  let expire = d.setSeconds(d.getSeconds() + 120);
  const newOtp = new OtpModel({
    email: email,
    otp: hasedOtp,
    createdAt: Date.now(),
    expiresAt: expire,
  });
  await newOtp.save();
  res.status(201).json({
    message: "OTP is send successfully.",
  });
});

const otpVerify = catchAsync(async (req, res, next) => {
  const record = await OtpModel.find({
    email: req.body.email,
  });
  if (record.length <= 0) {
    return next(new AppError("Unauthorized User", 401));
  } else {
    const expiresAt = record[0].expiresAt;
    const dbOTP = record[0].otp;
    const currentTimestamp = new Date();
    if (expiresAt < currentTimestamp) {
      const r = await OtpModel.deleteMany({ email: req.body.email });
      return next(new AppError("Your OTP is expired!", 400));
    } else {
      const hasedOtp1 = await bcrypt.compare(req.body.otp, dbOTP);
      if (!hasedOtp1) {
        return next(new AppError("Invalid OTP!", 400));
      } else {
        const r = await OtpModel.deleteMany({ email: req.body.email });
        const user = await req.model.find({ email: req.body.email });
        const id = user[0]._id;
        // ---Token generation---
        jwt.sign({ id }, req.key, { expiresIn: "30d" }, async (err, token) => {
          if (err) {
            res.json({
              error: err.message,
            });
          } else {
            const date = new Date();
            const userName = user[0].userName
            res.status(200).json({
              token,
              userName
            });
          }
        });
      }
    }
  }
});

module.exports = {
  loginMiddleWare,
  login,
  otpVerify,
  generateSendOTP,
};
