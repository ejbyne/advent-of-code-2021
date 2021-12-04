import { calculateLosingBingoScore, calculateWinningBingoScore } from "./day4";
import { readFile } from "fs/promises";

describe("Day 4", () => {
  describe("Part 1", () => {
    it("calculates the final score for the winning board", () => {
      const input = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

      const result = calculateWinningBingoScore(input);

      expect(result).toBe(4512);
    });

    it("calculates the winning final score for the puzzle input", async () => {
      const input = await readFile("src/day4.input.txt", "utf-8");

      const result = calculateWinningBingoScore(input);

      expect(result).toBe(55770);
    });
  });

  describe("Part 2", () => {
    it("calculates the final score for the losing board", () => {
      const input = `
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7
`;

      const result = calculateLosingBingoScore(input);

      expect(result).toBe(1924);
    });

    it("calculates the losing final score for the puzzle input", async () => {
      const input = await readFile("src/day4.input.txt", "utf-8");

      const result = calculateLosingBingoScore(input);

      expect(result).toBe(2980);
    });
  });
});
