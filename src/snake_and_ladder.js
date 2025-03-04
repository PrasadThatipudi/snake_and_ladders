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

const TARGET = 100;

function isScoreExceeded(score) {
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
  playerPosition += isScoreExceeded(playerPosition + dice) ? 0 : dice;

  return playerPosition in snakesAndLadders
    ? snakesAndLadders[playerPosition]
    : playerPosition;
}

const isSnakeOrLadder = (dice, prevPosition, curPosition) => {
  const expectedPosition = dice + prevPosition;
  const isSnake = expectedPosition > curPosition;
  const isLadder = expectedPosition < curPosition;

  return { isSnake, isLadder };
};

class SnakeAndLadder {
  #score;

  constructor(noOfPlayers) {
    this.#score = Array(noOfPlayers).fill(0);
  }

  updatePlayerPosition(player, dice) {
    const prevPosition = this.#score[player];
    const curPosition = getScore(prevPosition, dice);
    const flag = isSnakeOrLadder(dice, prevPosition, curPosition);
    this.#score[player] = curPosition;
    const currentState = { score: this.#score, flag };
    return currentState;
  }

  isPlayerWon(playerId) {
    return this.#score.at(playerId) === TARGET;
  }
}

export { SnakeAndLadder };
