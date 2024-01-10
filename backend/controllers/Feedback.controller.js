const feedbackModel = require('../models/Feedback.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken')

//---Get Token---
const getJwt = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.decode(token, req.key);
    const id = decode.id;
    return id;
}

//Add feedback
const giveFeedback = catchAsync(async (req, res, next) => {
    const userId = getJwt(req, res)
    const newFeedback = new feedbackModel({
        userId: userId,
        rate: +req.body.rate,
        comment: req.body.comment
    })
    const record = await newFeedback.save()
    if (record) {
        res.status(201).json({
            message: "Thank You for rating us."
        })
    }
    else {
        return next(new AppError("There was something wrong", 400))
    }
    next()
})

//getAllFeedback 
const getFeedback = catchAsync(async (req, res, next) => {
    const feedbacks = await feedbackModel.aggregate([
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
                "userInfo.userName": 1,
                "rate": 1,
                "comment": 1
            }
        }
    ])
    if (feedbacks.length > 0) {
        res.status(200).json({
            feedbacks
        })
    }
    else {
        return next(new AppError("Nothing is available in feedback.", 400))
    }
    next()
})


module.exports = {
    giveFeedback,
    getFeedback,
}