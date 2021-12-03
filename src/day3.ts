export function calculateGammaRate(input: string) {
  const bits = input.trim().split("\n");
  const firstBitRow = bits[0];

  return firstBitRow.split("").reduce((gammaAggregate, _, index) => {
    const bitsForColumn = bits.reduce((gamma, bitRow) => {
      return [...gamma, bitRow[index]];
    }, []);
    const numberOfZeros = bitsForColumn.sort().findIndex((bit) => bit === "1");
    const numberOfOnes = bitsForColumn.length - numberOfZeros;

    return numberOfZeros > numberOfOnes
      ? gammaAggregate + "0"
      : gammaAggregate + "1";
  }, "");
}

export function calculateEpsilonRate(gammaRate: string) {
  return gammaRate
    .split("")
    .map((bit) => (bit === "1" ? "0" : "1"))
    .join("");
}

export function multiplyRatesAsDecimals(firstRate: string, secondRate: string) {
  return parseInt(firstRate, 2) * parseInt(secondRate, 2);
}
