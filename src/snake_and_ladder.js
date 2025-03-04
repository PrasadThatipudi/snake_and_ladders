const debug = function (arg) {
  console.log(arg);
  return arg;
};

const isNegative = (number) => number < 0;

const range = function (from, to, step) {
  if (step === 0 || isNegative(to - from) !== isNegative(step)) return [];

  const noOfTerms = Math.ceil(Math.abs((to - from) / step));
  return Array.from({ length: noOfTerms }, (_, index) => from + index * step);
};

const isOdd = (number) => (number & 1) === 1;
const reverseArray = (array) => [...array].reverse();

const generateBoard = () =>
  Array.from({ length: 10 }, (_, index) => index)
    .reverse()
    .map((index) => range(index * 10 + 1, index * 10 + 11, 1))
    .map((array, index) => (isOdd(index) ? array : reverseArray(array)));

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

const TARGET = 100;

function isScoreExeeded(score) {
  return score > TARGET;
}

function printPlayerPosition(playerNo, score) {
  console.log(`Player ${playerNo} score is: ${score}`);
}

const snakesAndLadders = {
  4: 56,
  29: 31,
  14: 55,
  22: 58,
  41: 79,
  54: 88,
  28: 10,
  37: 3,
  48: 16,
  75: 32,
  94: 71,
  96: 42,
};

function getScore(playerPosition, dice) {
  playerPosition += isScoreExeeded(playerPosition + dice) ? 0 : dice;

  return playerPosition in snakesAndLadders
    ? snakesAndLadders[playerPosition]
    : playerPosition;
}

const displayIfSnakeOrLadder = (dice, prevPosition, curPosition) => {
  if (prevPosition + dice < curPosition) {
    return console.log("Congrats! You got a 🪜");
  }
  if (prevPosition + dice > curPosition) {
    console.log("Congrats! You caught by 🐍");
  }
};

class SnakeAndLadder {
  #score;
  #noOfPlayers;

  constructor(noOfPlayers) {
    this.#noOfPlayers = noOfPlayers;
    this.#score = Array(noOfPlayers).fill(0);
  }

  updatePlayerPosition(playerNo) {
    const prevPosition = this.#score[playerNo];
    const dice = getDiceValue(playerNo);
    const curPosition = getScore(prevPosition, dice);
    displayIfSnakeOrLadder(dice, prevPosition, curPosition);

    this.#score[playerNo] = curPosition;
    return this.#score;
  }

  isPlayerWon(playerNo) {
    return this.#score.at(playerNo) === TARGET;
  }
}

export { SnakeAndLadder };
