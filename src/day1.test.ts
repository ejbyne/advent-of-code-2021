import { readFile } from "fs/promises";
import { countDepthIncreases } from "./day1";

describe("countDepthIncreases", () => {
  it("handles only increases", () => {
    const input = `
9
10
22
28
30
44
56
    `;
    const result = countDepthIncreases(input);

    expect(result).toBe(6);
  });

  it("handles increases and decreases", () => {
    const input = `
199
200
208
210
200
207
240
269
260
263
    `;

    const result = countDepthIncreases(input);

    expect(result).toBe(7);
  });

  it("handles the puzzle input", async () => {
    const input = await readFile("src/day1.input.txt", "utf-8");

    const result = countDepthIncreases(input);

    expect(result).toBe(1387);
  });
});
