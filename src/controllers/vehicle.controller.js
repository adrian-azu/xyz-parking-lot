const { request, response } = require("express");
const VehiclesService = require("../services/vehicle.services");
let { vehicles, parkingObj } = require("../repositories");
exports.park = (req = request, res = response) => {
  const { slot, vehicleId } = req.body;
  const existingVehicle = vehicles.find((vehicle) => vehicle.vehicleId === vehicleId);
  if (existingVehicle) {
    if (existingVehicle.isParked) {
      return res.json({ message: "Vehicle is already parked!" });
    }
    existingVehicle.park(slot);
    return res.json({ vehicles: vehicles, message: `Vehicle with vehicle id of ${vehicleId} is now parked` });
  }
  const newVehicle = new VehiclesService(parseInt(slot.size), vehicleId);
  newVehicle.park(slot);
  vehicles.push(newVehicle);
  return res.json({ vehicles: vehicles, message: `Vehicle with vehicle id of ${vehicleId} is now parked` });
};
exports.unPark = (req = request, res = response) => {
  const { vehicleId } = req.body;
  const vehicleIndex = vehicles.findIndex((val) => val.vehicleId === vehicleId);
  if (vehicleIndex < 0) {
    throw new Error("Vehicle does not exists!");
  }
  if ((vehicles[vehicleIndex].isParked = false)) {
    throw new Error("Vehicle already unparked");
  }
  const fee = parkingObj.get("parkingObj").unPark(vehicles[vehicleIndex]);
  return res.json({ parking_fee: fee, vehicles });
};
