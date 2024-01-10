const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/Vehicle.controller");
const { verifyToken } = require("../midllewares/Auth.controller");

const {
    selectAdminModel,
    selectSecretKey,
} = require("../midllewares/Admin.middleware");

const ExpressFormidable = require("express-formidable");
const cloudinary = require("../utils/Clodinary");
const { vehicleMiddleWare } = require("../midllewares/Vehicle.middleware");

router.use(selectAdminModel);
router.use(selectSecretKey);

router.post(
    "/registerVehicle",
    verifyToken,
    ExpressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }),
    vehicleController.registerVehicle
);
router.post("/getVehicleByType", verifyToken, vehicleController.vehicleByType)
router.delete("/deleteVehicle/:vid", verifyToken, vehicleMiddleWare, ExpressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }), vehicleController.deleteVehicle);

//get one vehicle information for edit vehicle information
router.post("/getVehicleById/:vid", verifyToken, vehicleMiddleWare, vehicleController.getVehicle)
router.patch(
    "/editVehicle/:vid",
    verifyToken,
    vehicleMiddleWare,
    ExpressFormidable({ maxFieldsSize: 5 * 1024 * 1024 }),
    vehicleController.editVehicle
);

module.exports = router;
