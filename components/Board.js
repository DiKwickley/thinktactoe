const Cell = ({ cell, cellIndex, rowIndex, boardOnChange, enable }) => {
  return (
    <button
      onClick={() => {
        boardOnChange(rowIndex * 3 + cellIndex);
      }}
      disabled={enable}
    >
      {cell}
    </button>
  );
};

const Row = ({ rowIndex, row, boardOnChange, enable }) => {
  return (
    <div>
      {row.map((cell, cellIndex) => {
        return (
          <Cell
            cell={cell}
            rowIndex={rowIndex}
            cellIndex={cellIndex}
            enable={enable}
            boardOnChange={boardOnChange}
          />
        );
      })}
    </div>
  );
};

export const Board = ({ board, turn, boardOnChange, player }) => {
  console.log({
    board,
    turn,
    player,
  });
  return (
    <div>
      {/* {board.map((element, index) => {
        return (
          <Cell
            element={element}
            index={index}
            key={index}
            enable={player !== turn}
            boardOnChange={boardOnChange}
          />
        );
      })} */}

      <Row
        row={board.slice(0, 3)}
        rowIndex={0}
        boardOnChange={boardOnChange}
        enable={player !== turn}
      />
    </div>
  );
};
