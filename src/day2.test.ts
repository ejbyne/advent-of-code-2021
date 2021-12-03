import { getCoordinates, getCoordinatesV2 } from "./day2";
import { readFile } from "fs/promises";

describe("getCoordinates", () => {
  describe("v1", () => {
    it("aggregates down movements", () => {
      const input = `
forward 5
forward 8
forward 2`;

      const result = getCoordinates(input);

      expect(result).toEqual({ horizontal: 15, vertical: 0 });
    });

    it("aggregates down movements", () => {
      const input = `
down 5
down 8
down 2`;

      const result = getCoordinates(input);

      expect(result).toEqual({ horizontal: 0, vertical: 15 });
    });

    it("aggregates up movements", () => {
      const input = `
up 5
up 8
up 2`;

      const result = getCoordinates(input);

      expect(result).toEqual({ horizontal: 0, vertical: -15 });
    });

    it("aggregates a mixture of directions", () => {
      const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2`;

      const result = getCoordinates(input);

      expect(result).toEqual({ horizontal: 15, vertical: 10 });
      expect(result.horizontal * result.vertical).toBe(150);
    });

    it("aggregates the puzzle input", async () => {
      const input = await readFile("src/day2.input.txt", "utf-8");

      const result = getCoordinates(input);

      expect(result).toEqual({ horizontal: 2024, vertical: 717 });
      expect(result.horizontal * result.vertical).toBe(1451208);
    });
  });

  describe("v2", () => {
    it("aggregates a mixture of directions", () => {
      const input = `
forward 5
down 5
forward 8
up 3
down 8
forward 2`;

      const result = getCoordinatesV2(input);

      expect(result).toEqual({ aim: 10, horizontal: 15, vertical: 60 });
      expect(result.horizontal * result.vertical).toBe(900);
    });
  });
});
