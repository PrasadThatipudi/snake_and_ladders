import { Cycle } from "./cycle.js";
import { SnakeAndLadder, range } from "./snake_and_ladder.js";
import { createNode } from "./createNode.js";

const randomInt = (from, to) =>
  from + Math.floor(Math.random() * Math.abs(to - from));

const rollTheDice = () => randomInt(1, 7);

export const getNumberSymbol = (number) =>
  ["0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"][number];

const printDiceValue = (playerNo, diceValue) => {
  console.log(`Player ${playerNo} got ${getNumberSymbol(diceValue)}`);
};

const getDiceValue = (playerNo) => {
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

const createDice = (diceHandler) => {
  const style = { width: "50px", aspectRatio: "1" };
  const dice = createNode("button", { onclick: diceHandler, style });

  return dice;
};

const turn = (game, players) => {
  const currentPlayer = players.next();
  const dice = rollTheDice();

  const currentState = game.updatePlayerPosition(currentPlayer, dice);
};

const startGame = (game, players) => {
  const diceHandler = () => turn(game, players);

  document.body.appendChild(createDice(diceHandler));
};

const main = () => {
  console.log("Welcome!");

  const noOfPlayers = 2;
  const snakeAndLadders = SnakeAndLadder.generateSnakeAndLadders();
  const game = new SnakeAndLadder(noOfPlayers, snakeAndLadders);

  const playerIds = range(0, noOfPlayers, 1);
  const players = new Cycle(playerIds);

  startGame(game, players);
};

window.onload = main;
