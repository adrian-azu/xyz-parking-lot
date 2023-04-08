const ParkingSystem = require("../services/parkinglot.services");

module.exports = {
  vehicles: [],
  parkingObj: new Map(),
  currentTime: Date.now(),
  extendedTime: [],
};
