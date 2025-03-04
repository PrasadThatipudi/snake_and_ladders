import { getPlayerPosition, isPlayerWon } from "./src/snake_and_ladder.js";

const displayDivider = () => console.log("-".repeat(40));

const startGame = function (scoreBoard, noOfPlayers) {
  let currentPlayer = 0;

  while (true) {
    if (currentPlayer === 0) displayDivider();

    const curPosition = getPlayerPosition(scoreBoard, currentPlayer);
    if (isPlayerWon(curPosition)) return currentPlayer;

    scoreBoard[currentPlayer] = curPosition;
    currentPlayer = (currentPlayer + 1) % noOfPlayers;
  }
};

const displayWinningMsg = (winner) =>
  console.log(`Congratulations Player ${winner} won the game`);

function playGameWith(noOfPlayers) {
  const scoreBoard = Array.from({ length: noOfPlayers }, () => 0);
  const winner = startGame(scoreBoard, noOfPlayers);
  displayWinningMsg(winner);
}

function main() {
  console.log("Welcome!");

  if (confirm("Do you want to play this game?")) {
    const noOfPlayers = prompt("Enter number of players: ");
    return playGameWith(noOfPlayers);
  }

  return "Bye👋";
}

main();
