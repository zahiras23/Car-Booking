const AdminModel = require('../models/Admin.model')
const AppError = require('../utils/AppError')
const { emailVerifyMiddleWare } = require('./Common.middleware')

const selectAdminModel = (req, res, next) => {
    req.model = AdminModel;
    next()
}

const selectSecretKey = (req, res, next) => {
    req.key = process.env.ADMIN_SECRET_KEY
    next()
}

const selectAdminSalt = (req, res, next) => {
    req.salt = process.env.ADMIN_SALT
    next()
}

module.exports = {
    selectAdminModel,
    selectSecretKey,
    selectAdminSalt,
}