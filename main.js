import { SnakeAndLadder } from "./src/snake_and_ladder.js";

const displayDivider = () => console.log("-".repeat(40));

const debug = function (arg) {
  console.log(arg);
  return arg;
};

const startGame = function (noOfPlayers) {
  const game = new SnakeAndLadder(noOfPlayers);

  let currentPlayer = 0;

  while (true) {
    if (currentPlayer === 0) displayDivider();

    const scoreCard = game.updatePlayerPosition(currentPlayer);
    if (game.isPlayerWon(currentPlayer)) return currentPlayer;

    currentPlayer = (currentPlayer + 1) % noOfPlayers;
  }
};

const displayWinningMsg = (winner) =>
  console.log(`Congratulations Player ${winner} won the game`);

function playGameWith(noOfPlayers) {
  const winner = startGame(noOfPlayers);
  displayWinningMsg(winner);
}

function main() {
  console.log("Welcome!");

  // if (confirm("Do you want to play this game?")) {
  // const noOfPlayers = prompt("Enter number of players: ");
  return playGameWith(2);
  // }

  // return "Bye👋";
}

main();
