import {
  calculateEpsilonRate,
  calculateGammaRate,
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
});
