import { Cycle } from "./cycle.js";
import { SnakeAndLadder } from "./snake_and_ladder.js";
import { range } from "./range.js";
import { createNode } from "./createNode.js";
import { Player } from "./player.js";

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

const updateBoard = (score, players) => {
  score.forEach((playerPosition, index) => {
    const cell = document.getElementById(playerPosition);
    const symbol = players.at(index).symbol;
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

const showWinner = (winner) => {
  const wonMessage = document.createElement("div");
  const wonMessageBox = document.createElement("div");
  const board = document.querySelector(".board");

  const winningMessage = `Player ${winner.name}(${winner.symbol}) won!`;

  wonMessageBox.classList.add("wonMessage");
  wonMessage.textContent = winningMessage;
  wonMessageBox.appendChild(wonMessage);
  board.appendChild(wonMessageBox);
};

const stopTheGame = (winner, diceHandler) => {
  const dice = document.querySelector(".dice");
  dice.removeEventListener("click", diceHandler);
  showWinner(winner);
};

const turn = (game, currentPlayer) => {
  const dice = rollTheDice();

  const currentState = game.updatePlayerPosition(currentPlayer, dice);

  displayDiceValue(dice);
  updateBoard(currentState.score, game.players);
};

const startGame = (game, players) => {
  const board = generateBoard();

  const diceHandler = () => {
    const currentPlayer = players.next();

    clearAllPlayerPositions(game.currentScore());
    turn(game, currentPlayer);

    if (game.isPlayerWon(currentPlayer)) {
      stopTheGame(currentPlayer, diceHandler);
    }
  };

  document.body.appendChild(board);
  document.body.appendChild(createDice(diceHandler));
  updateBoard(game.currentScore(), game.players);
};

const readPlayers = (noOfPlayers) => {
  const playerIds = range(0, noOfPlayers);

  return playerIds.map((playerId) => {
    const playerName = prompt(`Enter player ${playerId + 1} name: `);
    const playerSymbol = prompt(`Enter player ${playerId + 1} symbol: `);

    return new Player(playerName, playerSymbol);
  });
};

const main = () => {
  const noOfPlayers = 2;
  const snakeAndLadders = SnakeAndLadder.generateSnakesAndLadders();
  const players = readPlayers(noOfPlayers);
  const game = new SnakeAndLadder(players, snakeAndLadders);

  const playersCycle = new Cycle(players);

  startGame(game, playersCycle);
};

document.addEventListener("DOMContentLoaded", main);
