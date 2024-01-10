const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.ObjectId,
        ref: "tblvehicle",
        required: [true, "Select any vehicle."]
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "tbluser",
        required: [true, "User is required"]
    },
    bookedFrom: {
        type: Date,
        required: [true, "Select booking Date & Time."]
    },
    bookedTo: {
        type: Date,
        required: [true, "Select booking Date & Time."]
    },
    pickUpAddress: {
        type: String,
        trim: true,
        required: [true, "Enter pickup address."]
    },
    driverId: {
        type: mongoose.Schema.ObjectId,
        ref: "tblDriver",
        default: null
    },
    paymentMode: {
        type: String,
        default: "Cash",
        enum: ["Cash", "Online"]
    },
    returDateTime: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Alloted", "Completed", "Cancelled"]
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("tblbooking", bookingSchema)