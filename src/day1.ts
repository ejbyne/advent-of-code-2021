function parseMeasurements(input: string) {
  const measurements = input
    .trim()
    .split("\n")
    .map((measurement) => parseInt(measurement, 10));
  return measurements;
}

export function countDepthIncreases(input: string) {
  const measurements = parseMeasurements(input);
  return measurements.reduce(
    ([count, previousMeasurement], currentMeasurement) => {
      const updatedCount =
        currentMeasurement > previousMeasurement ? count + 1 : count;
      return [updatedCount, currentMeasurement];
    },
    [0, undefined]
  )[0];
}

export function countTripleDepthIncreases(input: string) {
  const measurements = parseMeasurements(input);

  return measurements.reduce(
    ([count, lastTripleMeasurement], currentMeasurement, index) => {
      if (index >= measurements.length - 2) {
        return [count, currentMeasurement];
      }

      const nextTripleMeasurement =
        currentMeasurement + measurements[index + 1] + measurements[index + 2];

      const updatedCount =
        nextTripleMeasurement > lastTripleMeasurement ? count + 1 : count;
      return [updatedCount, nextTripleMeasurement];
    },
    [0, undefined]
  )[0];
}
