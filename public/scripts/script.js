import { Cycle } from "./cycle.js";
import { createNode } from "./createNode.js";
import { range } from "./range.js";

const readPlayers = (noOfPlayers) => {
  const players = new FormData();

  Array.from({ length: noOfPlayers }, (_, id) => players.set(id, id));

  return players;
};

const debug = function (arg) {
  console.log(arg);
  return arg;
};

const requestForNewGame = async (players) => {
  const response = await fetch("/create_game", {
    method: "POST",
    body: players,
  });

  const { gameId } = await response.json();
  return gameId;
};

const createGame = async () => {
  const noOfPlayers = 2;
  const playersFormData = readPlayers(noOfPlayers);

  const gameId = await requestForNewGame(playersFormData);
  const players = [...playersFormData].map(([id]) => id);

  return { gameId, players };
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

const updateBoard = (score, players) => {
  score.forEach((playerPosition, index) => {
    const cell = document.getElementById(playerPosition);
    const symbol = players.at(index);
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

const updatePlayerPosition = async (playerId, dice) => {
  const formData = new FormData();

  formData.set("playerId", playerId);
  formData.set("dice", dice);

  return await fetch("/update_board", { method: "POST", body: formData });
};

const turn = async (currentPlayer, players) => {
  const dice = rollTheDice();

  const currentState = await updatePlayerPosition(currentPlayer, dice);

  displayDiceValue(dice);
  updateBoard(currentState.score, game.players);
};

const diceHandler = (gameId, players) => async () => {
  const currentPlayer = players.next();

  clearAllPlayerPositions(await fetchBoard(gameId));
  await turn(currentPlayer);

  if (game.isPlayerWon(currentPlayer)) {
    stopTheGame(currentPlayer, diceHandler);
  }
};

const setupBoard = (gameId, players) => {
  const board = generateBoard();
  const playersCycle = new Cycle(players);

  document.body.appendChild(board);
  document.body.appendChild(createDice(diceHandler(gameId, playersCycle)));
};

const fetchBoard = async (gameId) => {
  const response = await fetch(`/fetch_board?gameId=${gameId}`);

  return response.json();
};

const startGame = async (gameId, players) => {
  setupBoard(gameId, players);
  const board = await fetchBoard(gameId);
  updateBoard(board, players);
};

const handleGame = async () => {
  const { gameId, players } = await createGame();
  await startGame(gameId, players);
};

document.addEventListener("DOMContentLoaded", handleGame);
