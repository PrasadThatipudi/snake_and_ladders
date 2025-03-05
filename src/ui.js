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
  const diceAttributes = { className: "dice" };
  const dice = createNode("button", diceAttributes);

  dice.addEventListener("click", diceHandler);

  return dice;
};

const isOdd = (number) => (number & 1) === 1;

const boardOrder = () => {
  const numbers = range(1, 101, 1);
  const splits = range(90, -1, -10);

  return splits.flatMap((splitIndex, index) => {
    const column = numbers.splice(splitIndex);

    return isOdd(index) ? column : column.toReversed();
  });
};

const generateBoard = () => {
  const board = createNode("div", { className: "board" });
  const cellIds = boardOrder();

  cellIds.forEach((cellId) => {
    const cell = createNode("div", { className: "cell", id: cellId });

    board.appendChild(cell);
  });

  return board;
};

const updateBoard = (score, playersSymbols) => {
  score.forEach((playerPosition, index) => {
    const cell = document.getElementById(playerPosition);
    const symbol = playersSymbols.at(index);
    const player = createNode("div", {}, symbol);

    cell.appendChild(player);
  });
};

const clearAllPlayerPositions = (score) => {
  score.forEach((playerPosition) => {
    const cell = document.getElementById(playerPosition);

    cell.textContent = "";
  });
};

const displayDiceValue = (diceValue) => {
  const dice = document.querySelector(".dice");

  dice.textContent = diceValue;
};

const stopTheGame = (winner, diceHandler) => {
  const winnerId = winner + 1;

  const dice = document.querySelector(".dice");
  dice.removeEventListener("click", diceHandler);

  if (confirm(`Player ${winnerId} won!\nDo you want to play again?`))
    window.location.reload();
};

const turn = (game, currentPlayer, playersSymbols) => {
  // const currentPlayer = players.next();
  const dice = rollTheDice();

  const currentState = game.updatePlayerPosition(currentPlayer, dice);

  displayDiceValue(dice);
  updateBoard(currentState.score, playersSymbols);
};

const startGame = (game, players, playersSymbols) => {
  const board = generateBoard();

  const diceHandler = () => {
    const currentPlayer = players.next();

    clearAllPlayerPositions(game.currentScore());
    turn(game, currentPlayer, playersSymbols);

    if (game.isPlayerWon(currentPlayer))
      stopTheGame(currentPlayer, diceHandler);
  };

  document.body.appendChild(board);
  document.body.appendChild(createDice(diceHandler));
  updateBoard(game.currentScore(), playersSymbols);
};

const main = () => {
  const noOfPlayers = 2;
  const snakeAndLadders = SnakeAndLadder.generateSnakeAndLadders();
  const game = new SnakeAndLadder(noOfPlayers, snakeAndLadders);

  const playerIds = range(0, noOfPlayers, 1);
  const symbols = ["🔴", "🟢"];
  const players = new Cycle(playerIds);

  startGame(game, players, symbols);
};

window.onload = main;
