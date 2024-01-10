const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const globleErrorHandler = require("./utils/errorMiddlewares");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const userRouter = require("./routes/User.route");
const adminRouter = require("./routes/Admin.route");
const vehicleRouter = require("./routes/Vehicle.route");
const driverRouter = require('./routes/Driver.route')

app.use("/api/userApi", userRouter);
app.use("/api/adminApi", adminRouter);
app.use("/api/vehicleApi", vehicleRouter);
app.use("/api/driverApi", driverRouter)

app.use(globleErrorHandler);

module.exports = app;
