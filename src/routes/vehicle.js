const { Router } = require("express");
const VehicleController = require("../controllers/vehicle.controller");
const router = Router();
router.post("/park", VehicleController.park);
router.post("/unpark", VehicleController.unPark);

module.exports = router;
