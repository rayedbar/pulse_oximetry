import { PULSE_OXIMETRY_DEFAULT_RANGE } from "./constants";

export const getPulseOximetryRange = (individualDetail) => {
  if (individualDetail.pulseOximetryRange.items[0]) {
    return individualDetail.pulseOximetryRange.items[0];
  } else {
    return {
      id: "default",
      minSpO2: PULSE_OXIMETRY_DEFAULT_RANGE.MIN_SPO2,
      minHeartRate: PULSE_OXIMETRY_DEFAULT_RANGE.MIN_HEART_RATE,
      maxHeartRate: PULSE_OXIMETRY_DEFAULT_RANGE.MAX_HEART_RATE,
    };
  }
};
