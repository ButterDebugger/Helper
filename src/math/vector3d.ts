export class Vector3 {
    #x: number;
    #y: number;
    #z: number;

    constructor(x = 0, y = 0, z = 0) {
        this.#x = x;
        this.#y = y;
        this.#z = z;
    }

    get comps(): [number, number, number] {
        return [this.#x, this.#y, this.#z];
    }

    get dimension(): string {
        return "3d";
    }

    // Getters

    getX(): number {
        return this.#x;
    }
    getY(): number {
        return this.#y;
    }
    getZ(): number {
        return this.#z;
    }

    // Setters

    set(x: number = this.#x, y: number = this.#y, z: number = this.#z): Vector3 {
        this.#x = x;
        this.#y = y;
        this.#z = z;
        return this;
    }
    setX(scalar: number): Vector3 {
        this.#x = scalar;
        return this;
    }
    setY(scalar: number): Vector3 {
        this.#y = scalar;
        return this;
    }
    setZ(scalar: number): Vector3 {
        this.#z = scalar;
        return this;
    }

    // Addition operations

    add(vector: Vector3): Vector3 {
        this.#x += vector.getX();
        this.#y += vector.getY();
        this.#z += vector.getZ();
        return this;
    }
    addScalar(scalar: number): Vector3 {
        this.#x += scalar;
        this.#y += scalar;
        this.#z += scalar;
        return this;
    }
    addX(scalar: number): Vector3 {
        this.#x += scalar;
        return this;
    }
    addY(scalar: number): Vector3 {
        this.#y += scalar;
        return this;
    }
    addZ(scalar: number): Vector3 {
        this.#z += scalar;
        return this;
    }

    // Subtraction operations

    subtract(vector: Vector3): Vector3 {
        this.#x -= vector.getX();
        this.#y -= vector.getY();
        this.#z -= vector.getZ();
        return this;
    }
    subtractScalar(scalar: number): Vector3 {
        this.#x -= scalar;
        this.#y -= scalar;
        this.#z -= scalar;
        return this;
    }
    subtractX(scalar: number): Vector3 {
        this.#x -= scalar;
        return this;
    }
    subtractY(scalar: number): Vector3 {
        this.#y -= scalar;
        return this;
    }
    subtractZ(scalar: number): Vector3 {
        this.#z -= scalar;
        return this;
    }

    // Multiplication operations

    multiply(vector: Vector3): Vector3 {
        this.#x *= vector.getX();
        this.#y *= vector.getY();
        this.#z *= vector.getZ();
        return this;
    }
    multiplyScalar(scalar: number): Vector3 {
        this.#x *= scalar;
        this.#y *= scalar;
        this.#z *= scalar;
        return this;
    }
    multiplyX(scalar: number): Vector3 {
        this.#x *= scalar;
        return this;
    }
    multiplyY(scalar: number): Vector3 {
        this.#y *= scalar;
        return this;
    }
    multiplyZ(scalar: number): Vector3 {
        this.#z *= scalar;
        return this;
    }

    // Division operations

    divide(vector: Vector3): Vector3 {
        this.#x /= vector.getX();
        this.#y /= vector.getY();
        this.#z /= vector.getZ();
        return this;
    }
    divideScalar(scalar: number): Vector3 {
        this.#x /= scalar;
        this.#y /= scalar;
        this.#z /= scalar;
        return this;
    }
    divideX(scalar: number): Vector3 {
        this.#x /= scalar;
        return this;
    }
    divideY(scalar: number): Vector3 {
        this.#y /= scalar;
        return this;
    }
    divideZ(scalar: number): Vector3 {
        this.#z /= scalar;
        return this;
    }

    // Other operations

    distance(vector: Vector3): number {
        const a = (this.#x - vector.getX()) ** 2;
        const b = (this.#y - vector.getY()) ** 2;
        const c = (this.#z - vector.getZ()) ** 2;

        return Math.sqrt(a + b + c);
    }
    dot(vector: Vector3): number {
        return this.#x * vector.getX() + this.#y * vector.getY() + this.#z * vector.getZ();
    }
    mag(): number {
        return Math.sqrt(this.magSq());
    }
    magSq(): number {
        return this.#x * this.#x + this.#y * this.#y + this.#z * this.#z;
    }
    setMag(scalar: number): Vector3 {
        this.normalize().multiplyScalar(scalar);
        return this;
    }
    normalize(): Vector3 {
        const len = this.mag();

        if (len !== 0) this.multiplyScalar(1 / len);
        return this;
    }
    cross(vector: Vector3): Vector3 {
        const x = this.#y * vector.getZ() - this.#z * vector.getY();
        const y = this.#z * vector.getX() - this.#x * vector.getZ();
        const z = this.#x * vector.getY() - this.#y * vector.getX();
        this.#x = x;
        this.#y = y;
        this.#z = z;
        return this;
    }
    limit(max: number): Vector3 {
        const mSq = this.magSq();

        if (mSq > max * max) {
            this.divideScalar(Math.sqrt(mSq)).multiplyScalar(max);
        }
        return this;
    }
    negate(): Vector3 {
        this.#x = -this.#x;
        this.#y = -this.#y;
        this.#z = -this.#z;
        return this;
    }
    equals(vector: unknown): boolean {
        return (
            vector instanceof Vector3 &&
            this.#x === vector.getX() &&
            this.#y === vector.getY() &&
            this.#z === vector.getZ()
        );
    }
    clone(): Vector3 {
        return new Vector3(this.#x, this.#y, this.#z);
    }

    stringify(): string {
        return `<${this.#x},${this.#y},${this.#z}>`;
    }

    parse(str: string): Vector3 {
        const vector = Vector3.parse(str);

        this.set(vector.getX(), vector.getY(), vector.getZ());
        return this;
    }

    static parse(str: string): Vector3 {
        if (!str.startsWith("<") || !str.startsWith("<")) {
            throw new SyntaxError("Missing angle brackets");
        }

        const body = str.slice(1, -1);
        const args = body.split(",");

        if (args.length !== 3) {
            throw new SyntaxError(`Expected 3 arguments but got ${args.length}`);
        }

        const x = Number(args[0]);
        const y = Number(args[1]);
        const z = Number(args[2]);
        return new Vector3(x, y, z);
    }
}
