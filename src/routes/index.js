const { Router } = require("express");
const parkinglotController = require("./parkinglot");
const vehicleController = require("./vehicle");

const router = Router();

router.use("/parking-lot", parkinglotController);
router.use("/vehicle", vehicleController);

module.exports = router;
