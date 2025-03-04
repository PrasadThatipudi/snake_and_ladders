import { SnakeAndLadder, range } from "./src/snake_and_ladder.js";

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

const debug = function (arg) {
  console.log(arg);
  return arg;
};

class Cycle {
  #elements;
  #index;

  constructor(elements) {
    this.#elements = elements;
    this.#index = 0;
  }

  next() {
    const element = this.#elements.at(this.#index);
    this.#index = (this.#index + 1) % this.#elements.length;

    return element;
  }

  peek() {
    return this.#elements.at(this.#index);
  }
}

const startGame = function (noOfPlayers) {
  const game = new SnakeAndLadder(noOfPlayers);
  const playerIds = range(0, noOfPlayers, 1);
  const players = new Cycle(playerIds);

  while (!game.isPlayerWon(players.peek())) {
    const currentPlayer = players.next();
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
