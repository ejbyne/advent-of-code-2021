export function calculateGammaRate(input: string) {
  const bits = parseBits(input);

  return [...Array(bits[0].length)].reduce((gammaAggregate, _, index) => {
    const { numberOfZeros, numberOfOnes } =
      calculateNumberOfZerosAndOnesForColumn(bits, index);

    return numberOfZeros > numberOfOnes
      ? gammaAggregate + "0"
      : gammaAggregate + "1";
  }, "");
}

function parseBits(input: string) {
  return input.trim().split("\n");
}

function calculateNumberOfZerosAndOnesForColumn(bits: string[], index: number) {
  const bitsForColumn = bits.reduce((gamma, bitRow) => {
    return [...gamma, bitRow[index]];
  }, []);
  const numberOfZeros = bitsForColumn.sort().findIndex((bit) => bit === "1");
  const numberOfOnes = bitsForColumn.length - numberOfZeros;
  return { numberOfZeros, numberOfOnes };
}

export function calculateEpsilonRate(gammaRate: string) {
  return gammaRate
    .split("")
    .map((bit) => (bit === "1" ? "0" : "1"))
    .join("");
}

export function multiplyRatesAsDecimals(firstRate: string, secondRate: string) {
  return convertBitsToDecimal(firstRate) * convertBitsToDecimal(secondRate);
}

function convertBitsToDecimal(firstRate: string) {
  return parseInt(firstRate, 2);
}

export function calculateOxygenGeneratorRating(input: string) {
  const bits = parseBits(input);
  const filterPredicate = filterMostCommon;

  return filterByColumnRecursively(bits, 0, filterPredicate);
}

export function calculateCO2ScrubberRating(input: string) {
  const bits = parseBits(input);
  const filterPredicate = filterLeastCommon;

  return filterByColumnRecursively(bits, 0, filterPredicate);
}

function filterByColumnRecursively(
  bits: string[],
  index: number,
  filterPredicate: (
    numberOfZeros: number,
    numberOfOnes: number,
    index: number
  ) => (bitRow: string) => boolean
) {
  const { numberOfZeros, numberOfOnes } =
    calculateNumberOfZerosAndOnesForColumn(bits, index);

  const filteredBits = bits.filter(
    filterPredicate(numberOfZeros, numberOfOnes, index)
  );

  if (filteredBits.length === 1) {
    return filteredBits[0];
  }

  return filterByColumnRecursively(filteredBits, index + 1, filterPredicate);
}

function filterMostCommon(
  numberOfZeros: number,
  numberOfOnes: number,
  index: number
) {
  return (bitRow) =>
    numberOfZeros > numberOfOnes
      ? bitRow[index] === "0"
      : bitRow[index] === "1";
}

function filterLeastCommon(
  numberOfZeros: number,
  numberOfOnes: number,
  index: number
) {
  return (bitRow) =>
    numberOfOnes < numberOfZeros
      ? bitRow[index] === "1"
      : bitRow[index] === "0";
}
