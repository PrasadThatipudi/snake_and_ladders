const debug = function (arg) {
  console.log(arg);
  return arg;
};

const isNegative = (number) => number < 0;

const range = (from, to, step = 1) => {
  if (step === 0 || isNegative(to - from) !== isNegative(step)) return [];

  const noOfTerms = Math.ceil(Math.abs((to - from) / step));
  return Array.from({ length: noOfTerms }, (_, index) => from + index * step);
};

class SnakeAndLadder {
  #score;
  #snakeAndLadders;
  #target;

  constructor(noOfPlayers, snakeAndLadders) {
    this.#target = 100;
    this.#snakeAndLadders = snakeAndLadders;
    this.#score = Array(noOfPlayers).fill(1);
  }

  updatePlayerPosition(player, dice) {
    const prevPosition = this.#score[player];
    const curPosition = this.#getScore(prevPosition, dice);
    const flag = this.#isSnakeOrLadder(dice, prevPosition, curPosition);

    this.#score[player] = curPosition;
    const currentState = { score: this.#score, flag };

    return currentState;
  }

  isPlayerWon(playerId) {
    return this.#score.at(playerId) === this.#target;
  }

  currentScore() {
    return this.#score;
  }

  #isScoreExceeded(score) {
    return score > this.#target;
  }

  #getScore(playerPosition, dice) {
    const offSet = this.#isScoreExceeded(playerPosition + dice) ? 0 : dice;
    const newPosition = playerPosition + offSet;

    return newPosition in this.#snakeAndLadders
      ? this.#snakeAndLadders[newPosition]
      : newPosition;
  }

  #isSnakeOrLadder(dice, prevPosition, curPosition) {
    const expectedPosition = dice + prevPosition;
    const isSnake = expectedPosition > curPosition;
    const isLadder = expectedPosition < curPosition;

    return { isSnake, isLadder };
  }

  static generateSnakeAndLadders() {
    return {
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
  }
}

export { SnakeAndLadder, range };
