export function getCoordinates(input: string) {
  const movements = parseMovements(input);

  return movements.reduce(
    ({ horizontal, vertical }, { direction, distance }) => {
      if (direction === "forward") {
        return { horizontal: horizontal + distance, vertical };
      }
      if (direction === "down") {
        return { horizontal: horizontal, vertical: vertical + distance };
      }
      if (direction === "up") {
        return { horizontal: horizontal, vertical: vertical - distance };
      }
    },
    { horizontal: 0, vertical: 0 }
  );
}

function parseMovements(input: string) {
  const movements = input
    .trim()
    .split("\n")
    .map((movement) => {
      const [direction, distance] = movement.split(" ");
      return {
        direction,
        distance: parseInt(distance, 10),
      };
    });
  return movements;
}

export function getCoordinatesWithAim(input: string) {
  const movements = parseMovements(input);

  return movements.reduce(
    ({ horizontal, vertical, aim }, { direction, distance }) => {
      if (direction === "forward") {
        return {
          horizontal: horizontal + distance,
          vertical: vertical + distance * aim,
          aim,
        };
      }
      if (direction === "down") {
        return {
          horizontal,
          vertical,
          aim: aim + distance,
        };
      }
      if (direction === "up") {
        return {
          horizontal,
          vertical,
          aim: aim - distance,
        };
      }
    },
    { horizontal: 0, vertical: 0, aim: 0 }
  );
}
