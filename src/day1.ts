export function countDepthIncreases(input: string) {
  const measurements = input
    .trim()
    .split("\n")
    .map((measurement) => parseInt(measurement, 10));
  return measurements.reduce(
    ([count, previousMeasurement], currentMeasurement) => {
      const updatedCount =
        currentMeasurement > previousMeasurement ? count + 1 : count;
      return [updatedCount, currentMeasurement];
    },
    [0, undefined]
  )[0];
}
