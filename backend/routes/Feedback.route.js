const express = require('express');
const router = express.Router()

const feedbackController = require('../controllers/Feedback.controller');
const { registerUserMiddleware } = require('../midllewares/User.middleware');

router.use(registerUserMiddleware.selectSecretKey)
