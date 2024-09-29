export default function GameBoard({ onSelectField, board }) {
  return (
    <ol id="game-board">
      {board.map((itemRow, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {itemRow.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectField(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
