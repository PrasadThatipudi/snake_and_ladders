import { SnakeAndLadder } from "./src/snake_and_ladder.js";

const randomInt = (from, to) =>
  from + Math.floor(Math.random() * Math.abs(to - from));

const rollTheDice = () => randomInt(1, 7);

export const getNumberSymbol = (number) =>
  ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"][number];

function printDiceValue(playerNo, diceValue) {
  console.log(`Player ${playerNo} got ${getNumberSymbol(diceValue)}`);
}

function getDiceValue(playerNo) {
  if (prompt(`roll the dice-player ${playerNo}: `, "press enter")) {
    const dice = rollTheDice();
    printDiceValue(playerNo, dice);
    return dice;
  }
}

const displayDivider = () => console.log("-".repeat(40));

const debug = function (arg) {
  console.log(arg);
  return arg;
};

const startGame = function (noOfPlayers) {
  const game = new SnakeAndLadder(noOfPlayers);

  let currentPlayer = noOfPlayers - 1;

  while (!game.isPlayerWon(currentPlayer)) {
    currentPlayer = (currentPlayer + 1) % noOfPlayers;

    if (currentPlayer === 0) displayDivider();

    const dice = getDiceValue(currentPlayer);
    const currentState = game.updatePlayerPosition(currentPlayer, dice);
  }

  return currentPlayer;
};

function main() {
  console.log("Welcome!");

  return startGame(2);
}

main();
