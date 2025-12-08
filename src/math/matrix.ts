export class Matrix {
  #map;
  #width;
  #height;

  constructor(width = 0, height = 0) {
    this.#map = Array.from<number>({ length: width * height }).fill(0);
    this.#width = width;
    this.#height = height;
  }

  get width(): number {
    return this.#width;
  }
  get height(): number {
    return this.#height;
  }

  #getIndex(x: number, y: number): number {
    if (x < 0 || x >= this.#width || y < 0 || y >= this.#height) {
      throw new Error("Index out of bounds");
    }

    return y * this.#width + x;
  }

  set(x: number, y: number, value: number): void {
    this.#map[this.#getIndex(x, y)] = value;
  }
  get(x: number, y: number): number {
    return this.#map[this.#getIndex(x, y)];
  }
}
