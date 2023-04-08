class ParkingSystem {
  slots = 0;
  entrance = 3;
  parkingMap;
  constructor(entranceNumber, slots) {
    this.entrance = entranceNumber;
    this.slots = slots;
    this.parkingMap = new Array(entranceNumber);
  }

  createParkingSlot() {
    let entranceSlots = [];
    const slots = this.generateParkingMap();

    for (let index = 0; index < this.entrance; index++) {
      entranceSlots.push(slots.slice(this.slots * index, this.slots * (index + 1)));
    }

    this.parkingMap = Object.keys(entranceSlots).map((val, index) => {
      return entranceSlots[val].map((slot, slotIndex) => {
        return {
          slot,
          size: Math.round(Math.random() * 2),
          isAvailable: true,
          entranceIndex: index,
          slotIndex,
        };
      });
    });
  }

  generateParkingMap() {
    const parkingMap = [];
    const entrance = this.entrance;
    const slots = this.slots;
    // slots per entrance
    // total slots = entrance * slot per entrance
    const totalSlots = entrance * slots;
    for (let i = 0; i < totalSlots; i++) {
      // generate each one
      parkingMap.push(
        Array.from({ length: entrance }, (_, index) => {
          if (i > 0 && index > 0) {
            return Math.abs(index * slots - i);
          } else {
            return Math.abs(index * slots + i);
          }
        })
      );
    }
    return parkingMap;
  }

  findAvailableSlots(entrance, size) {
    const data = this.parkingMap;
    // Filter all the available spots in parking entrance and get the first value

    let availableSlot =
      data[entrance - 1].filter((val) => val.isAvailable && val.size >= size)[0] ||
      data[entrance]?.filter((val) => val.isAvailable && val.size >= size)?.[0] || //get plus one first
      data[entrance - 2]?.filter((val) => val.isAvailable && val.size >= size)?.[0]; // get plus two

    if (!availableSlot) {
      //get the mid value of the entrance
      const slotsSize = data[entrance - 1].length;
      const midSlot = data[entrance - 1][Math.floor(slotsSize / 2)].slot[entrance];
      // get all slots that is nearest by: entrance number, entrance slot index difference :
      const closeEntrance = [];
      // loop through all entrances, filter by size and availability and get all the first one

      for (let i = 0; i < data.length; i++) {
        if (i === entrance - 1) continue;

        const avail = data[i].filter((val, index) => val.isAvailable && val.size >= size)?.[0];
        if (!!avail) closeEntrance.push({ spot: avail });
      }
      // check if there still some left
      if (closeEntrance.length === 0) {
        return null;
      }
      // Loop the fetched spots and get the differences then return the smallest difference
      let slotDiff = Infinity;
      closeEntrance.forEach(({ spot }) => {
        const diff = Math.abs(spot.slot[entrance] - midSlot);
        if (diff < slotDiff) {
          availableSlot = spot;
          slotDiff = diff;
        }
      });
    }
    const vehicleId = Date.now();
    const returnObject = Object.freeze({ ...availableSlot });
    this.parkingMap[availableSlot.entranceIndex][availableSlot.slotIndex].isAvailable = false;
    this.parkingMap[availableSlot.entranceIndex][availableSlot.slotIndex].slot = ["X"];
    this.parkingMap[availableSlot.entranceIndex][availableSlot.slotIndex].vehicleId = vehicleId;
    return { slot: returnObject, vehicleId };
  }
  unPark(vehicle) {
    this.parkingMap[vehicle.slot.entranceIndex][vehicle.slot.slotIndex] = vehicle.slot;
    delete this.parkingMap[vehicle.slot.entranceIndex][vehicle.slot.slotIndex].vehicleId;
    return vehicle.unPark();
  }
  checkParkingMap() {
    return this.parkingMap;
  }
}

module.exports = ParkingSystem;
