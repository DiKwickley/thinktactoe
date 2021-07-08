let config = {
  drawGame: "draw game",
  row: "row",
  column: "column",
  upLeftDiag: "diagonal-up-left",
  upRightDiag: "diagonal-up-right",
};

export const findWinner = function (field, n) {
  let result = {
    winnerDetected: false,
    type: "",
    location: [],
    lastPoint: [],
    winnerSymbol: "",
  };

  let cellsAmount = 0;
  let cellsFilled = 0;

  for (let i = 0; i < field.length; i++) {
    let counter = 1;
    for (let j = 0; j < field[i].length - 1; j++) {
      if (field[i][j] && field[i][j] == field[i][j + 1]) {
        counter += 1;
        if (counter == n) {
          result.winnerDetected = true;
          result.type = config.row;
          result.lastPoint.push(i, j + 1);
          result.winnerSymbol = field[i][j];
        }
      } else {
        counter = 1;
      }
    }
  }

  for (let j = 0; j < field.length; j++) {
    let counter = 1;
    for (let i = 0; i < field[j].length - 1; i++) {
      if (field[i][j] && field[i][j] == field[i + 1][j]) {
        counter += 1;
        if (counter == n) {
          result.winnerDetected = true;
          result.type = config.column;
          result.lastPoint.push(i + 1, j);
          result.winnerSymbol = field[i][j];
        }
      } else {
        counter = 1;
      }
    }
  }

  for (let i = 0; i <= field.length - 1; i++) {
    let startPoint = [0, i];
    let counter = 1;
    for (let j = 0; j < field.length - 1; j++) {
      if (
        startPoint[0] + j < field.length - 1 &&
        startPoint[1] + j < field.length - 1
      ) {
        if (
          field[startPoint[0] + j][startPoint[1] + j] &&
          field[startPoint[0] + j][startPoint[1] + j] ==
            field[startPoint[0] + j + 1][startPoint[1] + j + 1]
        ) {
          counter += 1;
          if (counter == n) {
            result.winnerDetected = true;
            result.type = config.upLeftDiag;
            result.lastPoint.push(startPoint[0] + j + 1, startPoint[1] + j + 1);
            result.winnerSymbol = field[startPoint[0] + j][startPoint[1] + j];
          }
        } else {
          counter = 1;
        }
      }
    }
  }

  for (let i = 1; i <= field.length - 1; i++) {
    let startPoint = [i, 0];
    let counter = 1;
    for (let j = 0; j < field.length - 1; j++) {
      if (
        startPoint[0] + j < field.length - 1 &&
        startPoint[1] + j < field.length - 1
      ) {
        if (
          field[startPoint[0] + j][startPoint[1] + j] &&
          field[startPoint[0] + j][startPoint[1] + j] ==
            field[startPoint[0] + j + 1][startPoint[1] + j + 1]
        ) {
          counter += 1;
          if (counter == n) {
            result.winnerDetected = true;
            result.type = config.upLeftDiag;
            result.lastPoint.push(startPoint[0] + j + 1, startPoint[1] + j + 1);
            result.winnerSymbol = field[startPoint[0] + j][startPoint[1] + j];
          }
        } else {
          counter = 1;
        }
      }
    }
  }

  for (let i = field.length - 1; i >= 0; i--) {
    let startPoint = [0, i];
    let counter = 1;
    for (let j = 0; j < field.length - 1; j++) {
      if (startPoint[0] + j < field.length - 1 && startPoint[1] - j >= 0) {
        if (
          field[startPoint[0] + j][startPoint[1] - j] &&
          field[startPoint[0] + j][startPoint[1] - j] ==
            field[startPoint[0] + j + 1][startPoint[1] - j - 1]
        ) {
          counter += 1;
          if (counter == n) {
            result.winnerDetected = true;
            result.type = config.upRightDiag;
            result.lastPoint.push(startPoint[0] + j + 1, startPoint[1] - j - 1);
            result.winnerSymbol = field[startPoint[0] + j][startPoint[1] - j];
          }
        } else {
          counter = 1;
        }
      }
    }
  }

  for (let i = 1; i <= field.length - 1; i++) {
    let startPoint = [i, field.length - 1];
    let counter = 1;
    for (let j = 0; j < field.length - 1; j++) {
      if (startPoint[0] + j < field.length - 1 && startPoint[1] - j > 0) {
        if (
          field[startPoint[0] + j][startPoint[1] - j] &&
          field[startPoint[0] + j][startPoint[1] - j] ==
            field[startPoint[0] + j + 1][startPoint[1] - j - 1]
        ) {
          counter += 1;
          if (counter == n) {
            result.winnerDetected = true;
            result.type = config.upRightDiag;
            result.lastPoint.push(startPoint[0] + j + 1, startPoint[1] - j - 1);
            result.winnerSymbol = field[startPoint[0] + j][startPoint[1] - j];
          }
        } else {
          counter = 1;
        }
      }
    }
  }

  if (result.winnerDetected) {
    switch (result.type) {
      case config.row:
        for (let i = 0; i < n; i++) {
          result.location.unshift([
            result.lastPoint[0],
            result.lastPoint[1] - i,
          ]);
        }
        break;
      case config.column:
        for (let i = 0; i < n; i++) {
          result.location.unshift([
            result.lastPoint[0] - i,
            result.lastPoint[1],
          ]);
        }
        break;
      case config.upLeftDiag:
        for (let i = 0; i < n; i++) {
          result.location.unshift([
            result.lastPoint[0] - i,
            result.lastPoint[1] - i,
          ]);
        }
        break;
      case config.upRightDiag:
        for (let i = 0; i < n; i++) {
          result.location.unshift([
            result.lastPoint[0] - i,
            result.lastPoint[1] + i,
          ]);
        }
        break;
    }
    return result;
  }

  for (let i = 0; i <= field.length - 1; i++) {
    for (let j = 0; j <= field[i].length - 1; j++) {
      cellsAmount++;
      if (field[i][j]) {
        cellsFilled++;
      }
    }
  }
  if (cellsAmount == cellsFilled && !result.winnerDetected) {
    result.type = config.drawGame;
    result.winnerDetected = true;
  }
  return result;
};
