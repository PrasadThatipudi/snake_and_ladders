import { Cycle } from "./cycle.js";
import { SnakeAndLadder, range } from "./snake_and_ladder.js";
import { createNode } from "./createNode.js";

const debug = function (arg) {
  console.log(arg);
  return arg;
};

const randomInt = (from, to) =>
  from + Math.floor(Math.random() * Math.abs(to - from));

const rollTheDice = () => randomInt(1, 7);

const createDice = (diceHandler) => {
  const diceAttributes = { onclick: diceHandler, className: "dice" };
  const dice = createNode("button", diceAttributes);

  return dice;
};

const generateBoard = () => {
  const board = createNode("div", { className: "board" });
  const cellIds = range(1, 101, 1);

  cellIds.forEach((cellId) => {
    const cell = createNode("div", { className: "cell", id: cellId });

    board.appendChild(cell);
  });

  return board;
};

const updateBoard = (currentState) => {
  const { score } = currentState;

  score.forEach((playerPosition, index) => {
    const cell = document.getElementById(playerPosition);
    const playerId = index + 1;
    cell.textContent = [cell.textContent, playerId].join(" ").trim();
  });
};

const clearAllPlayerPositions = (score) => {
  score.forEach((playerPosition) => {
    const cell = document.getElementById(playerPosition);

    cell.textContent = "";
  });
};

const turn = (game, players) => {
  const currentPlayer = players.next();
  const dice = rollTheDice();

  const currentState = game.updatePlayerPosition(currentPlayer, dice);

  updateBoard(currentState);
};

const startGame = (game, players) => {
  const board = generateBoard();

  const diceHandler = () => {
    clearAllPlayerPositions(game.currentScore());
    turn(game, players);
  };

  document.body.appendChild(board);
  document.body.appendChild(createDice(diceHandler));
  updateBoard({ score: game.currentScore() });
};

const main = () => {
  const noOfPlayers = 2;
  const snakeAndLadders = SnakeAndLadder.generateSnakeAndLadders();
  const game = new SnakeAndLadder(noOfPlayers, snakeAndLadders);

  const playerIds = range(0, noOfPlayers, 1);
  const players = new Cycle(playerIds);

  startGame(game, players);
};

window.onload = main;
