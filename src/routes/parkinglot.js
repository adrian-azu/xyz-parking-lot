const { Router } = require("express");
const ParkingLotController = require("../controllers/parkinglot.controller");
const router = Router();
router.get("/", ParkingLotController.checkParkingMap);
router.post("/", ParkingLotController.createParkingSlot);
router.post("/find-slots", ParkingLotController.findAvailableSlots);
router.post("/add-time", ParkingLotController.fastForward);

module.exports = router;
