const Cell = ({ element, index, boardOnChange, enable }) => {
  return (
    <button
      onClick={() => {
        boardOnChange(index);
      }}
      disabled={enable}
    >
      {element}
    </button>
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
      {board.map((element, index) => {
        return (
          <Cell
            element={element}
            index={index}
            key={index}
            enable={player !== turn}
            boardOnChange={boardOnChange}
          />
        );
      })}
    </div>
  );
};
