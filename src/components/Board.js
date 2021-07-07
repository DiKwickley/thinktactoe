const Cell = ({ cell, cellIndex, rowIndex, boardOnChange, enable }) => {
  return (
    <button
      className={`h-[50px] w-[50px] ${
        enable === true ? "border-gray bg-gray-100" : "border-black"
      } border-2 m-1`}
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
    <div className="flex flex-row">
      {row.map((cell, cellIndex) => {
        return (
          <Cell
            cell={cell}
            rowIndex={rowIndex}
            cellIndex={cellIndex}
            enable={enable}
            boardOnChange={boardOnChange}
            key={cellIndex}
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
    <div className="text-red-700">
      <Row
        row={board.slice(0, 3)}
        rowIndex={0}
        boardOnChange={boardOnChange}
        enable={player !== turn}
      />
      <Row
        row={board.slice(3, 6)}
        rowIndex={1}
        boardOnChange={boardOnChange}
        enable={player !== turn}
      />
      <Row
        row={board.slice(6, 9)}
        rowIndex={2}
        boardOnChange={boardOnChange}
        enable={player !== turn}
      />
    </div>
  );
};
