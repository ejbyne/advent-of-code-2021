export function calculateNumberOfDangerousAreas(
  input: string,
  includeDiagonalLines = true
) {
  const lines = input.trim().split("\n");
  const coordinatesMap = new Map<string, number>();
  lines.forEach(processLine);
  return sumUpDangerousAreas();

  function processLine(line: string) {
    const [firstCoords, secondCoords] = line.split(" -> ");
    const [firstX, firstY] = parseCoords(firstCoords);
    const [secondX, secondY] = parseCoords(secondCoords);
    const [lowestX, highestX] = sortCoords(firstX, secondX);
    const [lowestY, highestY] = sortCoords(firstY, secondY);

    if (isHorizontalLine(lowestX, highestX, lowestY, highestY)) {
      for (let x = lowestX; x <= highestX; x++) {
        incrementCountForCoords(x, lowestY);
      }
    } else if (isVerticalLine(lowestX, highestX, lowestY, highestY)) {
      for (let y = lowestY; y <= highestY; y++) {
        incrementCountForCoords(lowestX, y);
      }
    } else if (includeDiagonalLines) {
      const isXAscending = firstX < secondX;
      const isYAscending = firstY < secondY;

      if (isXAscending) {
        for (let x = firstX; x <= secondX; x++) {
          incrementCountForCoords(
            x,
            isYAscending ? firstY + (x - firstX) : firstY - (x - firstX)
          );
        }
      } else {
        for (let x = firstX; x >= secondX; x--) {
          incrementCountForCoords(
            x,
            isYAscending ? firstY + (firstX - x) : firstY - (firstX - x)
          );
        }
      }
    }
  }

  function incrementCountForCoords(x: number, y: number) {
    const currentCoords = `${x},${y}`;
    const entryForCoords = coordinatesMap.get(currentCoords);
    coordinatesMap.set(currentCoords, entryForCoords ? entryForCoords + 1 : 1);
  }

  function sumUpDangerousAreas() {
    return Array.from(coordinatesMap.values()).reduce(
      (sum, current) => (current > 1 ? sum + 1 : sum),
      0
    );
  }
}

function parseCoords(firstCoords: string) {
  return firstCoords.split(",").map((coord) => parseInt(coord, 10));
}

function sortCoords(firstCoord: number, secondCoord: number) {
  return [firstCoord, secondCoord].sort((a, b) => a - b);
}

function isHorizontalLine(
  lowestX: number,
  highestX: number,
  lowestY: number,
  highestY: number
) {
  return lowestX !== highestX && lowestY === highestY;
}

function isVerticalLine(
  lowestX: number,
  highestX: number,
  lowestY: number,
  highestY: number
) {
  return lowestX === highestX && lowestY !== highestY;
}
