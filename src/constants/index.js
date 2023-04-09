module.exports = Object.freeze({
  VEHICLE_SIZE: {
    S: 0,
    M: 1,
    L: 2,
  },
  VEHICLE_SIZE_NUM: ["S", "M", "L"],
  DATE_TYPE: {
    MINUTES: "minutes",
    HOURS: "hours",
    DAYS: "days",
  },
  EXCEED_RATE: [20, 60, 100],
  FLAT_RATE: 40,
  FLAT_RATE_HOUR: 3,
  FULL_DAY_RATE: 5_000,
  TIME_EXTEND: {
    MINUTES: 1_000 * 60,
    HOURS: 1_000 * 60 * 60,
    DAYS: 1000 * 60 * 60 * 24,
  },
});
