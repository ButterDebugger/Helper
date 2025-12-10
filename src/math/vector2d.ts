export class Vector2 {
    #x: number;
    #y: number;

    /**
     * Creates a new Vector2 object
     * @param x The x coordinate of the vector
     * @param y The y coordinate of the vector
     */
    constructor(x = 0, y = 0) {
        this.#x = x;
        this.#y = y;
    }

    /**
     * @returns A tuple containing the x and y components of the vector.
     */
    get comps(): [number, number] {
        return [this.#x, this.#y];
    }

    /**
     * @returns A string representing the dimension of the vector, which is "2d".
     */
    get dimension(): string {
        return "2d";
    }

    // Getters

    /**
     * @returns The x component of the vector
     */
    getX(): number {
        return this.#x;
    }
    /**
     * @returns The y component of the vector
     */
    getY(): number {
        return this.#y;
    }

    // Setters

    /**
     * Sets the x and y components of the vector
     * @param x The new x value of the vector
     * @param y The new y value of the vector
     * @returns The vector itself
     */
    set(x: number = this.#x, y: number = this.#y): Vector2 {
        this.#x = x;
        this.#y = y;
        return this;
    }
    /**
     * Sets the x component of the vector
     * @param scalar The new x value of the vector
     * @returns The vector itself
     */
    setX(scalar: number): Vector2 {
        this.#x = scalar;
        return this;
    }
    /**
     * Sets the y component of the vector
     * @param scalar The new y value of the vector
     * @returns The vector itself
     */
    setY(scalar: number): Vector2 {
        this.#y = scalar;
        return this;
    }

    // Addition operations

    /**
     * Adds another vector to this vector
     * @param vector The vector to add
     * @returns The vector itself
     */
    add(vector: Vector2): Vector2 {
        this.#x += vector.getX();
        this.#y += vector.getY();
        return this;
    }
    /**
     * Adds a scalar value to both the x and y components of the vector
     * @param scalar The scalar value to add
     * @returns The vector itself
     */
    addScalar(scalar: number): Vector2 {
        this.#x += scalar;
        this.#y += scalar;
        return this;
    }
    /**
     * Adds a scalar value to the x component of the vector
     * @param scalar The scalar value to add
     * @returns The vector itself
     */
    addX(scalar: number): Vector2 {
        this.#x += scalar;
        return this;
    }
    /**
     * Adds a scalar value to the y component of the vector
     * @param scalar The scalar value to add
     * @returns The vector itself
     */
    addY(scalar: number): Vector2 {
        this.#y += scalar;
        return this;
    }

    // Subtraction operations

    /**
     * Subtracts another vector from this vector
     * @param vector The vector to subtract
     * @returns The vector itself
     */
    subtract(vector: Vector2): Vector2 {
        this.#x -= vector.getX();
        this.#y -= vector.getY();
        return this;
    }
    /**
     * Subtracts a scalar value from both the x and y components of the vector
     * @param scalar The scalar value to subtract
     * @returns The vector itself
     */
    subtractScalar(scalar: number): Vector2 {
        this.#x -= scalar;
        this.#y -= scalar;
        return this;
    }
    /**
     * Subtracts a scalar value from the x component of the vector
     * @param scalar The scalar value to subtract
     * @returns The vector itself
     */
    subtractX(scalar: number): Vector2 {
        this.#x -= scalar;
        return this;
    }
    /**
     * Subtracts a scalar value from the y component of the vector
     * @param scalar The scalar value to subtract
     * @returns The vector itself
     */
    subtractY(scalar: number): Vector2 {
        this.#y -= scalar;
        return this;
    }

    // Multiplication operations

    /**
     * Multiplies this vector by another vector
     * @param vector The vector to multiply
     * @returns The vector itself
     */
    multiply(vector: Vector2): Vector2 {
        this.#x *= vector.getX();
        this.#y *= vector.getY();
        return this;
    }
    /**
     * Multiplies both the x and y components of the vector by a scalar value
     * @param scalar The scalar value to multiply
     * @returns The vector itself
     */
    multiplyScalar(scalar: number): Vector2 {
        this.#x *= scalar;
        this.#y *= scalar;
        return this;
    }
    /**
     * Multiplies the x component of the vector by a scalar value
     * @param scalar The scalar value to multiply
     * @returns The vector itself
     */
    multiplyX(scalar: number): Vector2 {
        this.#x *= scalar;
        return this;
    }
    /**
     * Multiplies the y component of the vector by a scalar value
     * @param scalar The scalar value to multiply
     * @returns The vector itself
     */
    multiplyY(scalar: number): Vector2 {
        this.#y *= scalar;
        return this;
    }

    // Division operations

    /**
     * Divides this vector by another vector
     * @param vector The vector to divide
     * @returns The vector itself
     */
    divide(value: Vector2): Vector2 {
        this.#x /= value.getX();
        this.#y /= value.getY();
        return this;
    }
    /**
     * Divides both the x and y components of the vector by a scalar value
     * @param scalar The scalar value to divide
     * @returns The vector itself
     */
    divideScalar(scalar: number): Vector2 {
        this.#x /= scalar;
        this.#y /= scalar;
        return this;
    }
    /**
     * Divides the x component of the vector by a scalar value
     * @param scalar The scalar value to divide
     * @returns The vector itself
     */
    divideX(scalar: number): Vector2 {
        this.#x /= scalar;
        return this;
    }
    /**
     * Divides the y component of the vector by a scalar value
     * @param scalar The scalar value to divide
     * @returns The vector itself
     */
    divideY(scalar: number): Vector2 {
        this.#y /= scalar;
        return this;
    }

    // Other operations

    /**
     * Calculates the distance between this vector and another vector
     * @param vector The vector to calculate the distance to
     * @returns The distance between the two vectors
     */
    distance(vector: Vector2): number {
        const a = (this.#x - vector.getX()) ** 2;
        const b = (this.#y - vector.getY()) ** 2;

        return Math.sqrt(a + b);
    }
    /**
     * Calculates the dot product of this vector and another vector
     * @param vector The vector to calculate the dot product with
     * @returns The dot product of the two vectors
     */
    dot(vector: Vector2): number {
        return this.#x * vector.getX() + this.#y * vector.getY();
    }
    /**
     * Calculates the magnitude of the vector
     * @returns The magnitude of the vector
     */
    mag(): number {
        return Math.sqrt(this.magSq());
    }
    /**
     * Calculates the magnitude of the vector squared
     * @returns The magnitude of the vector squared
     */
    magSq(): number {
        return this.#x * this.#x + this.#y * this.#y;
    }
    /**
     * Sets the magnitude of the vector
     * @param scalar The new magnitude of the vector
     * @returns The vector itself
     */
    setMag(scalar: number): Vector2 {
        this.normalize().multiplyScalar(scalar);
        return this;
    }
    /**
     * Normalizes the vector to have a magnitude of 1.
     * If the vector's magnitude is zero, then nothing changes
     * @returns The vector itself
     */
    normalize(): Vector2 {
        const len = this.mag();

        if (len !== 0) this.multiplyScalar(1 / len);
        return this;
    }
    /**
     * Calculates the cross product of this vector and another vector
     * @param vector The vector to calculate the cross product with
     * @returns The cross product of the two vectors
     */
    cross(vector: Vector2): number {
        return this.#x * vector.getY() - this.#y * vector.getX();
    }
    /**
     * Limits the magnitude of the vector to a certain value.
     * If the vector's magnitude is less than or equal to the given value, then nothing changes
     * @param max The maximum magnitude of the vector
     * @returns The vector itself
     */
    limit(max: number): Vector2 {
        const mSq = this.magSq();

        if (mSq > max * max) {
            this.divideScalar(Math.sqrt(mSq)).multiplyScalar(max);
        }
        return this;
    }
    /**
     * Negates the x and y components of the vector
     * @returns The vector itself
     */
    negate(): Vector2 {
        this.#x = -this.#x;
        this.#y = -this.#y;
        return this;
    }
    /**
     * Checks if another vector is equal to this vector
     * @param vector The vector to check equality with
     * @returns Whether the two vectors are equal
     */
    equals(vector: unknown): boolean {
        return vector instanceof Vector2 && this.#x === vector.getX() && this.#y === vector.getY();
    }
    /**
     * Creates a copy of this vector.
     * @returns A new vector with the same x and y values as this vector
     */
    clone(): Vector2 {
        return new Vector2(this.#x, this.#y);
    }

    /**
     * Creates a string representation of the vector
     * @returns A string in the format `<x,y>`
     */
    stringify(): string {
        return `<${this.#x},${this.#y}>`;
    }

    /**
     * Parses a string representation of a vector and sets the x and y components of this vector to the parsed values
     * @param str The string to parse, which should be in the format `<x,y>`
     * @returns The vector itself
     * @throws {SyntaxError} If the string is not in the correct format
     */
    parse(str: string): Vector2 {
        const vector = Vector2.parse(str);

        this.set(vector.getX(), vector.getY());
        return this;
    }

    /**
     * Parses a string representation of a vector and returns a new vector with the parsed values.
     * The string should be in the format `<x,y>`
     * @param str The string to parse
     * @returns A new vector with the parsed x and y values
     * @throws {SyntaxError} If the string is not in the correct format
     */
    static parse(str: string): Vector2 {
        if (!str.startsWith("<") || !str.startsWith("<")) {
            throw new SyntaxError("Missing angle brackets");
        }

        const body = str.slice(1, -1);
        const args = body.split(",");

        if (args.length !== 2) {
            throw new SyntaxError(`Expected 2 arguments but got ${args.length}`);
        }

        const x = Number(args[0]);
        const y = Number(args[1]);
        return new Vector2(x, y);
    }
}
