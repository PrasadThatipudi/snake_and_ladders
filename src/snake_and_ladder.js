const debug = function (arg) {
  console.log(arg);
  return arg;
};

class SnakeAndLadder {
  #score;
  #snakeAndLadders;
  #target;
  #players;

  constructor(players, snakeAndLadders) {
    this.#target = 100;
    this.#snakeAndLadders = snakeAndLadders;
    this.#players = players;
    this.#score = Array(players.length).fill(1);
  }

  get players() {
    return this.#players;
  }

  #playerId(player) {
    return this.#players.indexOf(player);
  }

  updatePlayerPosition(player, dice) {
    const playerId = this.#playerId(player);
    const prevPosition = this.#score[playerId];
    const curPosition = this.#getScore(prevPosition, dice);
    const tileOutcome = this.#tileOutcome(dice, prevPosition, curPosition);

    this.#score[playerId] = curPosition;
    const currentState = { score: this.#score, tileOutcome };

    return currentState;
  }

  isPlayerWon(player) {
    const playerId = this.#playerId(player);
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

  #tileOutcome(dice, prevPosition, curPosition) {
    const expectedPosition = dice + prevPosition;
    const isSnake = expectedPosition > curPosition;
    const isLadder = expectedPosition < curPosition;

    if (isSnake) return "snake";
    if (isLadder) return "ladder";
    return "none";
  }

  static generateSnakesAndLadders() {
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

export { SnakeAndLadder };
