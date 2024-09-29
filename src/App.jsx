import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;

  for (const turn of gameTurns) {
    const { field, player } = turn;
    const { row, col } = field;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const cominations of WINNING_COMBINATIONS) {
    const firstFieldSymbol =
      gameBoard[cominations[0].row][cominations[0].column];
    const secondFieldSymbol =
      gameBoard[cominations[1].row][cominations[1].column];
    const thirdFieldSymbol =
      gameBoard[cominations[2].row][cominations[2].column];

    if (
      firstFieldSymbol &&
      firstFieldSymbol === secondFieldSymbol &&
      firstFieldSymbol === thirdFieldSymbol
    ) {
      winner = firstFieldSymbol;
    }
  }

  function handleSelectField(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) =>
    //   currActivePlayer === "X" ? "O" : "X"
    // );

    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);

      const updateTurns = [
        { field: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updateTurns;
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          ></Player>
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          ></Player>
        </ol>
        {winner && <p>You won, {winner}</p>}
        <GameBoard
          onSelectField={handleSelectField}
          board={gameBoard}
        ></GameBoard>
      </div>
      <Log turns={gameTurns}></Log>
    </main>
  );
}

export default App;
