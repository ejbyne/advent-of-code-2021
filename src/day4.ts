interface Board {
  rows: {
    number: string;
    drawn: boolean;
  }[][];
  columns: {
    number: string;
    drawn: boolean;
  }[][];
}

export function calculateWinningBingoScore(input: string) {
  const { boards, numbersToDraw } = parseInput(input);
  return drawNumbersRecursivelyUntilFirstWinner(numbersToDraw, boards);
}

export function calculateLosingBingoScore(input: string) {
  const { boards, numbersToDraw } = parseInput(input);
  return drawNumbersRecursivelyUntilLastWinner(numbersToDraw, boards);
}

function parseInput(input: string) {
  const inputRows = input.trim().split("\n\n");
  const numbersToDraw = inputRows[0].split(",");

  const boards = inputRows.slice(1).map((board) => {
    const rows = board.split("\n").map((boardRow) =>
      boardRow
        .split(" ")
        .filter((number) => number !== "")
        .map((number) => ({ number, drawn: false }))
    );
    const columns = rows[0].map((_, index) => {
      return rows.map((row) => row[index]);
    });

    return { rows, columns };
  });

  return { numbersToDraw, boards };
}

function drawNumbersRecursivelyUntilFirstWinner(
  numbersToDraw: string[],
  boards: Board[]
): any {
  const currentNumber = numbersToDraw[0];
  const updatedBoards = updateBoards(boards, currentNumber);
  const completedBoard = findFirstCompletedBoard(updatedBoards);

  if (completedBoard) {
    return calculateFinalScore(completedBoard, currentNumber);
  }

  return drawNumbersRecursivelyUntilFirstWinner(
    numbersToDraw.slice(1),
    updatedBoards
  );
}

function drawNumbersRecursivelyUntilLastWinner(
  numbersToDraw: string[],
  boards: Board[]
): any {
  const currentNumber = numbersToDraw[0];
  const updatedBoards = updateBoards(boards, currentNumber);
  const allBoardsCompleted = areAllBoardsCompleted(updatedBoards);

  if (allBoardsCompleted) {
    const previousCompletedBoards = findCompletedBoards(boards);
    const lastBoardToCompleteIndex = previousCompletedBoards.findIndex(
      (board) => board === false
    );

    return calculateFinalScore(
      updatedBoards[lastBoardToCompleteIndex],
      currentNumber
    );
  }

  return drawNumbersRecursivelyUntilLastWinner(
    numbersToDraw.slice(1),
    updatedBoards
  );
}

function updateBoards(boards: Board[], currentNumber: string) {
  return boards.map((board) => {
    const updatedRows = board.rows.map(updateRowOrColumn(currentNumber));
    const updatedColumns = board.columns.map(updateRowOrColumn(currentNumber));

    return { rows: updatedRows, columns: updatedColumns };
  });
}

function updateRowOrColumn(currentNumber: string) {
  return (rowOrColumn) =>
    rowOrColumn.map((item) =>
      item.number === currentNumber ? { ...item, drawn: true } : item
    );
}

function findFirstCompletedBoard(boards: Board[]) {
  const completedBoards = findCompletedBoards(boards);
  const completedBoardIndex = completedBoards.findIndex(
    (item) => item === true
  );
  if (completedBoardIndex) {
    return boards[completedBoardIndex];
  }
}

function areAllBoardsCompleted(boards: Board[]) {
  const completedBoards = findCompletedBoards(boards);
  return completedBoards.every((board) => board === true);
}

function findCompletedBoards(boards: Board[]) {
  return boards.map((board) => {
    const completedRows = findCompletedRowsOrColumns(board.rows);
    const completedColumns = findCompletedRowsOrColumns(board.columns);
    return completedRows.length > 0 || completedColumns.length > 0;
  });
}

function findCompletedRowsOrColumns(
  rowsOrColumns: { number: string; drawn: boolean }[][]
) {
  return rowsOrColumns
    .map((list) => list.every((item) => item.drawn === true))
    .filter((list) => list === true);
}

function calculateFinalScore(
  completedBoard: { columns: any[]; rows: any[] },
  currentNumber: string
) {
  const unmarkedTotalOnBoard = completedBoard.rows.reduce(
    (total, currentRow) => {
      const sumForRow = currentRow.reduce((rowTotal, item) => {
        return item.drawn ? rowTotal : rowTotal + parseInt(item.number, 10);
      }, 0);
      return total + sumForRow;
    },
    0
  );

  return unmarkedTotalOnBoard * parseInt(currentNumber, 10);
}
