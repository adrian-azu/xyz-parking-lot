const { request, response } = require("express");
const ParkingSystem = require("../services/parkinglot.services");
let { parkingObj, extendedTime } = require("../repositories");
const { VEHICLE_SIZE, DATE_TYPE, TIME_EXTEND } = require("../constants");

exports.createParkingSlot = (req = request, res = response) => {
  const { slots, entrance } = req.body;
  if (entrance < 3) {
    throw new Error("Entrance cannot be less than 3!");
  }
  if (parkingObj.has("parkingOjb")) {
    parkingObj.clear();
  }
  parkingObj.set("parkingObj", new ParkingSystem(entrance, slots));
  const parkingLot = parkingObj.get("parkingObj");
  parkingLot.createParkingSlot();
  extendedTime.push(0);
  return res.json({
    map: parkingLot.parkingMap,
  });
};

exports.findAvailableSlots = (req, res) => {
  const { size, entrance } = req.body;
  if (!VEHICLE_SIZE[size.toUpperCase()]) {
    throw new Error("Size not allowed");
  }

  if (entrance <= 0 || entrance > parkingObj.get("parkingObj").entrance) {
    throw new Error("Entrance is out of scope. You cannot create your own entrance!");
  }
  const slot = parkingObj.get("parkingObj").findAvailableSlots(entrance, VEHICLE_SIZE[size.toUpperCase()]);
  if (!slot) {
    return res.status(404).json({ message: "No more available slot for the vehicle size" });
  }
  return res.json(slot);
};

exports.checkParkingMap = (req, res) => {
  if (!parkingObj.size === 0) {
    throw new Error("Parking System not created");
  }
  return res.json({ map: parkingObj.get("parkingObj").checkParkingMap() });
};

exports.fastForward = (req, res) => {
  const { time, dateType } = req.body;
  if (!DATE_TYPE[dateType.toUpperCase()]) {
    throw new Error("You can only increment date time by: 'minutes','hours', and 'days'");
  }
  // add the current time to the time extended; only save

  extendedTime[0] += time * TIME_EXTEND[dateType.toUpperCase()];

  const timeAdjusted = new Date().setTime(Date.now() + extendedTime[0]);
  const timeNow = new Date(timeAdjusted).toString();

  return res.json({ message: "Date successfully adjusted", current_time: timeNow });
};
