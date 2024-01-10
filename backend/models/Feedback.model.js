const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "tbluser",
        required: [true, "User is required"]
    },
    rate: {
        type: Number,
        default: 0
    },
    comment: {
        type: String,
        required: [true, "Give your feedback."]
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("tblfeedback", feedbackSchema)