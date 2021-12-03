import {
  calculateCO2ScrubberRating,
  calculateEpsilonRate,
  calculateGammaRate,
  calculateOxygenGeneratorRating,
  multiplyRatesAsDecimals,
} from "./day3";
import { readFile } from "fs/promises";

describe("Day 3", () => {
  describe("Part 1", () => {
    it("calculates the gamma rate for 1 bit", () => {
      const input = `
0
1
1
1
1
0
0
1
1
1
0
0
`;
      const result = calculateGammaRate(input);
      expect(result).toBe("1");
    });

    it("calculates the gamma rate for multiple bits", () => {
      const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;
      const result = calculateGammaRate(input);
      expect(result).toBe("10110");
    });

    it("calculates the gamma rate for the puzzle input", async () => {
      const input = await readFile("src/day3.input.txt", "utf-8"); //?

      const result = calculateGammaRate(input);

      expect(result).toBe("101110101011");
    });

    it("calculates the epsilon rate for the puzzle input", () => {
      const result = calculateEpsilonRate("101110101011");

      expect(result).toBe("010001010100");
    });

    it("multiplies the gamma rate and the epsilon rate in decimal format", () => {
      const result = multiplyRatesAsDecimals("10110", "01001");

      expect(result).toBe(198);

      const puzzleResult = multiplyRatesAsDecimals(
        "101110101011",
        "010001010100"
      );

      expect(puzzleResult).toBe(3309596);
    });
  });

  describe("Part 2", () => {
    it("calculates the oxygen generator rating", () => {
      const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

      const result = calculateOxygenGeneratorRating(input);

      expect(result).toBe("10111");
    });

    it("calculates the CO2 scrubber rating", () => {
      const input = `
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
`;

      const result = calculateCO2ScrubberRating(input);

      expect(result).toBe("01010");
    });
  });

  it("multiplies the oxygen generator rating and CO2 scrubber rating in decimal format", () => {
    const result = multiplyRatesAsDecimals("10111", "01010");

    expect(result).toBe(230);
  });

  it("calculates the puzzle result", async () => {
    const input = await readFile("src/day3.input.txt", "utf-8"); //?

    const oxygenGeneratorRating = calculateOxygenGeneratorRating(input);
    const co2ScrubberRating = calculateCO2ScrubberRating(input);

    const result = multiplyRatesAsDecimals(
      oxygenGeneratorRating,
      co2ScrubberRating
    );

    expect(result).toBe(2981085);
  });
});
