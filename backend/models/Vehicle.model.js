const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
        required: [true, "Please,Enter user name!!"],
        trim: true,
        uppercase: true,
        validate: {
            validator: function (nm) {
                return nm.match(/^[0-9a-zA-Z\\-]+$/)
            },
            message: "Vehicle Name must contain only alphabets!"
        }
    },
    color: {
        type: String,
        required: [true, "Vehicle must have color."],
        trim: true,
        uppercase: true,
        validate: {
            validator: function (nm) {
                return nm.match(/^[a-zA-Z\s]+$/)
            },
            message: "Color must have only alphabets"
        }
    },
    capacity: {
        type: Number,
        required: [true, "Provide vehicle capacity."]
    },
    photo: {
        type: String,
        required: true,
        default: 'default.jpg'
    },
    fuelType: {
        type: String,
        required: [true, "Provide vehicle fuel type."],
        enum: ['CNG', 'Petrol', 'Diesel', 'Electric']
    },
    rentPerKm: {
        type: Number,
        required: [true, "Provide Rent for vehicle."]
    },
    vehicleNo: {
        type: String,
        unique: [true, "Vehicle must have unique vehicle Number."],
        required: [true, "Vehicle number is required."],
        trim: true,
        validate: {
            validator: function (e) {
                const exp = /^(GJ)(05)(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
                return e.match(exp)
            },
            message: "Invalid Vehicle Number"
        }
    },
    penaltyPerDay: {
        type: Number,
        required: [true, "Provide penalty per day for vehicle."]
    },
    vehicleType: {
        type: String,
        required: [true, "Vehicle must have type."],
        enum: ["Car", "MiniBus", "Bike", "AutoRikshaw"]
    },
    status: {
        type: String,
        default: "Available",
        enum: ["Available", "Booked", "Not-available"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports = mongoose.model("tblvehicle", vehicleSchema);