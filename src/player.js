class Player {
  #name;
  #symbol;

  constructor(name, symbol) {
    this.#name = name;
    this.#symbol = symbol;
  }

  get name() {
    return this.#name;
  }

  get symbol() {
    return this.#symbol;
  }
}

export { Player };
