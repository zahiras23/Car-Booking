const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please,Enter user name!!"],
        trim: true,
        uppercase: true,
        validate: {
            validator: function (nm) {
                return nm.match(/^[a-zA-Z]*$/)
            },
            message: "User Name must contain only alphabets!"
        }
    },
    email: {
        type: String,
        required: [true, "User must have email Id"],
        trim: true,
        unique: true,
        validate: {
            validator: function (e) {
                const exp = /[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,3}$/
                return e.match(exp)
            },
            message: "Invalid Email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is must"]
    },
    dob: {
        type: Date,
        required: [true, "Date of Birth is required"]
    },
    contactNo: {
        type: String,
        trim: true,
        required: [true, "Contact Number is required"],
        validate: {
            validator: function (e) {
                const exp = /^(0|91)?[6-9][0-9]{9}$/
                return e.match(exp)
            },
            message: "Invalid Contact Number"
        }
    },
    gender: {
        type: String,
        trim: true,
        required: [true, "Gender is required"]
    },
    address: {
        type: String,
        trim: true,
        required: [true, "Address is required"]

    },
    pincode: {
        type: String,
        trim: true,
        required: [true, "Pincode is required"]
    },
    status: {
        type: String,
        default: "Activate"
    },
},
    { timestamps: true })

module.exports = mongoose.model("tblUser", userSchema)