class Cycle {
  #elements;
  #index;

  constructor(elements) {
    this.#elements = elements;
    this.#index = 0;
  }

  next() {
    const element = this.#elements.at(this.#index);
    this.#index = (this.#index + 1) % this.#elements.length;

    return element;
  }

  peek() {
    return this.#elements.at(this.#index);
  }

  indexOf(element) {
    return Array.from(this.#elements).indexOf(element);
  }

  at(index) {
    this.#elements.at(index);
  }
}

export { Cycle };
