import { Cycle } from "./src/cycle.js";
import { SnakeAndLadder, range } from "./src/snake_and_ladder.js";

const randomInt = (from, to) =>
  from + Math.floor(Math.random() * Math.abs(to - from));

const rollTheDice = () => randomInt(1, 7);

export const getNumberSymbol = (number) =>
  ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"][number];

printDiceValue = (playerNo, diceValue) => {
  console.log(`Player ${playerNo} got ${getNumberSymbol(diceValue)}`);
};

getDiceValue = (playerNo) => {
  if (prompt(`roll the dice-player ${playerNo}: `, "press enter")) {
    const dice = rollTheDice();
    printDiceValue(playerNo, dice);
    return dice;
  }
};

const debug = function (arg) {
  console.log(arg);
  return arg;
};

const startGame = function (noOfPlayers) {
  const snakeAndLadders = SnakeAndLadder.generateSnakeAndLadders();
  const game = new SnakeAndLadder(noOfPlayers, snakeAndLadders);

  const playerIds = range(0, noOfPlayers, 1);
  const players = new Cycle(playerIds);

  while (!game.isPlayerWon(players.peek())) {
    const currentPlayer = players.next();
    const dice = getDiceValue(currentPlayer);

    const currentState = game.updatePlayerPosition(currentPlayer, dice);
  }

  return currentPlayer;
};

const main = () => {
  console.log("Welcome!");

  return startGame(2);
};

main();
