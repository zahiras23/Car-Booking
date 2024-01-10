const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

require("dotenv").config({ path: "config.env" });

const verifyToken = catchAsync(async (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader !== "") {
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            req.token = token;
            const token1 = req.headers.authorization.split(' ')[1];

            const decode = jwt.decode(token1, req.key);
            if (decode === null) {
                return next(new AppError("Please,Login again.", 401))
            }
            else {
                const record = await req.model.find({ _id: decode.id })
                if (record === null) {
                    return res.send({ message: "User does not exist.", status: 403 });
                } else {
                    jwt.verify(token1, req.key, function (err, decoded) {
                        if (err) {
                            next(err)
                        }
                        else {
                            console.log("Token verifified successfully");
                        }
                        next();
                    });
                }
            }

        }
        else {
            return next(new AppError("Invalid Token", 401))
        }
    } else {
        return next(new AppError("You are logged out.Plesae,loggin again.", 403))

    }
})

module.exports = {
    verifyToken,

}