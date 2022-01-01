import { calculateNumberOfDangerousAreas } from "./day5";
import { readFile } from "fs/promises";

describe("Day 5", () => {
  describe("Part 1", () => {
    it("calculates the number of dangerous areas in horizontal lines", () => {
      const input = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `;

      const result = calculateNumberOfDangerousAreas(input, false);

      expect(result).toBe(4);
    });

    it("calculates the number of dangerous areas in horizontal and vertical lines", () => {
      const input = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `;

      const result = calculateNumberOfDangerousAreas(input, false);

      expect(result).toBe(5);
    });

    it("calculates the dangerous areas for the puzzle input", async () => {
      const input = await readFile("src/day5.input.txt", "utf-8");

      const result = calculateNumberOfDangerousAreas(input, false);

      expect(result).toBe(6710);
    });
  });

  describe("Part 2", () => {
    it("includes diagonal lines", () => {
      const input = `
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
      `;

      const result = calculateNumberOfDangerousAreas(input);

      expect(result).toBe(12);
    });

    it("calculates the dangerous areas for the puzzle input", async () => {
      const input = await readFile("src/day5.input.txt", "utf-8");

      const result = calculateNumberOfDangerousAreas(input);

      expect(result).toBe(20121);
    });
  });
});
