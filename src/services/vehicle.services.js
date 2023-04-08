const { FLAT_RATE, EXCEED_RATE, FULL_DAY_RATE, FLAT_RATE_HOUR } = require("../constants");
const { extendedTime } = require("../repositories");
class Vehicle {
  size = 0;
  isParked = false;
  slot = null;
  startTime = null;
  fee = 0;

  constructor(size, vehicleId) {
    this.vehicleId = vehicleId;
    this.size = size;
  }
  park(parkingSlot) {
    this.slot = parkingSlot;
    this.isParked = true;

    const currentTime = new Date().setTime(Date.now() + extendedTime[0]);
    // check if vehicle is continuos park
    if (this.exitTime && (currentTime - this.exitTime.getTime()) / (1_000 * 60) < 60) {
      this.exitTime = null;
      return;
    }
    this.startTime = currentTime;
  }
  unPark() {
    const currentTime = new Date().setTime(Date.now() + extendedTime[0]);
    const duration = (currentTime - this.startTime) / (1_000 * 60 * 60); // in hours
    const flatRate = FLAT_RATE;
    const exceedRate = EXCEED_RATE; // rate per sizes
    const fullDayRate = FULL_DAY_RATE; // flat rate
    let roundedDuration = Math.round(duration); // get rounded duration
    const exceedHourlyRate = exceedRate[this.size]; //get vehicle exceed rate

    let fee = 0; // initiate fee

    if (roundedDuration >= 24) {
      const fullDayChunks = Math.floor(duration / 24);
      fee = fullDayChunks * fullDayRate;
      roundedDuration -= fullDayChunks * 24;
    }
    const exceedFee = Math.max(roundedDuration - FLAT_RATE_HOUR, 0) * exceedHourlyRate;

    fee += roundedDuration >= FLAT_RATE_HOUR ? flatRate * FLAT_RATE_HOUR + exceedFee : flatRate * roundedDuration;

    this.isParked = false;
    this.slot = null;
    this.fee = fee;
    return fee;
  }
}

module.exports = Vehicle;
