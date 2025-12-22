import { isRecord } from "../types.ts";

/**
 * A 3-dimensional like object that has an x, y, and z property
 */
export interface Vector3Like {
    x: number;
    y: number;
    z: number;
}

/**
 * Checks if an object is a Vector3Like object
 * @param obj The object to check
 * @returns True if the object is a Vector3Like object, false otherwise
 */
export function isVector3Like(obj: unknown): obj is Vector3Like {
    return (
        isRecord(obj) &&
        typeof obj.x === "number" &&
        typeof obj.y === "number" &&
        typeof obj.z === "number"
    );
}

/**
 * A 3-dimensional vector
 */
export class Vector3 implements Vector3Like {
    x: number;
    y: number;
    z: number;

    /**
     * Creates a new Vector3 object
     * @param x The x coordinate of the vector
     * @param y The y coordinate of the vector
     * @param z The z coordinate of the vector
     */
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    /**
     * @returns A tuple containing the x, y, and z components of the vector
     */
    get comps(): [number, number, number] {
        return [this.x, this.y, this.z];
    }

    /**
     * @returns A string representing the dimension of the vector, which is "3d"
     */
    get dimension(): string {
        return "3d";
    }

    // Getters

    /**
     * @returns The x component of the vector
     */
    getX(): number {
        return this.x;
    }

    /**
     * @returns The y component of the vector
     */
    getY(): number {
        return this.y;
    }

    /**
     * @returns The z component of the vector
     */
    getZ(): number {
        return this.z;
    }

    // Setters

    /**
     * Sets the x, y, and z components of the vector
     * @param x The new x value of the vector
     * @param y The new y value of the vector
     * @param z The new z value of the vector
     * @returns The vector itself
     */
    set(x: number = this.x, y: number = this.y, z: number = this.z): Vector3 {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * Sets the x component of the vector
     * @param scalar The new x value of the vector
     * @returns The vector itself
     */
    setX(scalar: number): Vector3 {
        this.x = scalar;
        return this;
    }

    /**
     * Sets the y component of the vector
     * @param scalar The new y value of the vector
     * @returns The vector itself
     */
    setY(scalar: number): Vector3 {
        this.y = scalar;
        return this;
    }

    /**
     * Sets the z component of the vector
     * @param scalar The new z value of the vector
     * @returns The vector itself
     */
    setZ(scalar: number): Vector3 {
        this.z = scalar;
        return this;
    }

    // Addition operation

    /**
     * Adds another vector to this vector
     * @param vector The vector to add
     * @returns The vector itself
     */
    add(vector: Vector3Like): Vector3;
    /**
     * Adds a scalar value to the x, y, and z components of this vector
     * @param scalar The scalar value to add
     * @returns The vector itself
     */
    add(scalar: number): Vector3;
    /**
     * Adds three scalar values to the x, y, and z components of this vector
     * @param scalarX The scalar value to add to the x component
     * @param scalarY The scalar value to add to the y component
     * @param scalarZ The scalar value to add to the z component
     * @returns The vector itself
     */
    add(scalarX: number, scalarY: number, scalarZ: number): Vector3;

    add(
        scalarX: Vector3Like | number,
        scalarY?: number,
        scalarZ?: number,
    ): Vector3 {
        if (isVector3Like(scalarX)) {
            this.x += scalarX.x;
            this.y += scalarX.y;
            this.z += scalarX.z;
        } else if (typeof scalarY === "number" && typeof scalarZ === "number") {
            this.x += scalarX;
            this.y += scalarY;
            this.z += scalarZ;
        } else {
            this.x += scalarX;
            this.y += scalarX;
            this.z += scalarX;
        }

        return this;
    }

    // Subtraction operation

    /**
     * Subtracts another vector from this vector
     * @param vector The vector to subtract
     * @returns The vector itself
     */
    subtract(vector: Vector3Like): Vector3;
    /**
     * Subtracts a scalar value from the x, y, and z components of this vector
     * @param scalar The scalar value to subtract
     * @returns The vector itself
     */
    subtract(scalar: number): Vector3;
    /**
     * Subtracts three scalar values from the x, y, and z components of this vector
     * @param scalarX The scalar value to subtract from the x component
     * @param scalarY The scalar value to subtract from the y component
     * @param scalarZ The scalar value to subtract from the z component
     * @returns The vector itself
     */
    subtract(scalarX: number, scalarY: number, scalarZ: number): Vector3;

    subtract(
        scalarX: Vector3Like | number,
        scalarY?: number,
        scalarZ?: number,
    ): Vector3 {
        if (isVector3Like(scalarX)) {
            this.x -= scalarX.x;
            this.y -= scalarX.y;
            this.z -= scalarX.z;
        } else if (typeof scalarY === "number" && typeof scalarZ === "number") {
            this.x -= scalarX;
            this.y -= scalarY;
            this.z -= scalarZ;
        } else {
            this.x -= scalarX;
            this.y -= scalarX;
            this.z -= scalarX;
        }

        return this;
    }

    // Multiplication operation

    /**
     * Multiplies this vector by another vector
     * @param vector The vector to multiply by
     * @returns The vector itself
     */
    multiply(vector: Vector3Like): Vector3;
    /**
     * Multiplies the x, y, and z components of this vector by a scalar value
     * @param scalar The scalar value to multiply by
     * @returns The vector itself
     */
    multiply(scalar: number): Vector3;
    /**
     * Multiplies the x, y, and z components of this vector by three scalar values
     * @param scalarX The scalar value to multiply the x component by
     * @param scalarY The scalar value to multiply the y component by
     * @param scalarZ The scalar value to multiply the z component by
     * @returns The vector itself
     */
    multiply(scalarX: number, scalarY: number, scalarZ: number): Vector3;

    multiply(
        scalarX: Vector3Like | number,
        scalarY?: number,
        scalarZ?: number,
    ): Vector3 {
        if (isVector3Like(scalarX)) {
            this.x *= scalarX.x;
            this.y *= scalarX.y;
            this.z *= scalarX.z;
        } else if (typeof scalarY === "number" && typeof scalarZ === "number") {
            this.x *= scalarX;
            this.y *= scalarY;
            this.z *= scalarZ;
        } else {
            this.x *= scalarX;
            this.y *= scalarX;
            this.z *= scalarX;
        }

        return this;
    }

    // Division operation

    /**
     * Divides this vector by another vector
     * @param vector The vector to divide by
     * @returns The vector itself
     */
    divide(vector: Vector3Like): Vector3;
    /**
     * Divides the x, y, and z components of this vector by a scalar value
     * @param scalar The scalar value to divide by
     * @returns The vector itself
     */
    divide(scalar: number): Vector3;
    /**
     * Divides the x, y, and z components of this vector by three scalar values
     * @param scalarX The scalar value to divide the x component by
     * @param scalarY The scalar value to divide the y component by
     * @param scalarZ The scalar value to divide the z component by
     * @returns The vector itself
     */
    divide(scalarX: number, scalarY: number, scalarZ: number): Vector3;

    divide(
        scalarX: Vector3Like | number,
        scalarY?: number,
        scalarZ?: number,
    ): Vector3 {
        if (isVector3Like(scalarX)) {
            this.x /= scalarX.x;
            this.y /= scalarX.y;
            this.z /= scalarX.z;
        } else if (typeof scalarY === "number" && typeof scalarZ === "number") {
            this.x /= scalarX;
            this.y /= scalarY;
            this.z /= scalarZ;
        } else {
            this.x /= scalarX;
            this.y /= scalarX;
            this.z /= scalarX;
        }

        return this;
    }

    // Other operations

    /**
     * Calculates the distance between this vector and another vector
     * @param vector The vector to calculate the distance to
     * @returns The distance between the two vectors
     */
    distance(vector: Vector3Like): number {
        return Vector3.distance(this, vector);
    }

    /**
     * Calculates the distance between two vectors
     * @param vectorA The first vector
     * @param vectorB The second vector
     * @returns The distance between the two vectors
     */
    static distance(vectorA: Vector3Like, vectorB: Vector3Like): number {
        const a = (vectorA.x - vectorB.x) ** 2;
        const b = (vectorA.y - vectorB.y) ** 2;
        const c = (vectorA.z - vectorB.z) ** 2;

        return Math.sqrt(a + b + c);
    }

    /**
     * Calculates the dot product of this vector and another vector
     * @param vector The vector to calculate the dot product with
     * @returns The dot product of the two vectors
     */
    dot(vector: Vector3Like): number {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z;
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
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    /**
     * Sets the magnitude of the vector
     * @param scalar The new magnitude of the vector
     * @returns The vector itself
     */
    setMag(scalar: number): Vector3 {
        this.normalize().multiply(scalar);
        return this;
    }

    /**
     * Normalizes the vector to have a magnitude of 1
     *
     * If the vector's magnitude is zero, then nothing changes
     * @returns The vector itself
     */
    normalize(): Vector3 {
        const len = this.mag();

        if (len !== 0) this.multiply(1 / len);
        return this;
    }

    /**
     * Calculates the cross product of this vector and another vector
     * @param vector The vector to calculate the cross product with
     * @returns The vector itself
     */
    cross(vector: Vector3Like): Vector3 {
        const x = this.y * vector.z - this.z * vector.y;
        const y = this.z * vector.x - this.x * vector.z;
        const z = this.x * vector.y - this.y * vector.x;
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }

    /**
     * Limits the magnitude of the vector to a certain value
     *
     * If the vector's magnitude is less than or equal to the given value, then nothing changes
     * @param max The maximum magnitude of the vector
     * @returns The vector itself
     */
    limit(max: number): Vector3 {
        const mSq = this.magSq();

        if (mSq > max * max) {
            this.divide(Math.sqrt(mSq)).multiply(max);
        }
        return this;
    }

    /**
     * Negates the x, y, and z components of the vector
     * @returns The vector itself
     */
    negate(): Vector3 {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }

    /**
     * Checks if another vector is equal to this vector
     * @param vector The vector to check equality with
     * @returns Whether the two vectors are equal
     */
    equals(vector: unknown): boolean {
        return (
            isVector3Like(vector) &&
            this.x === vector.x &&
            this.y === vector.y &&
            this.z === vector.z
        );
    }

    /**
     * Creates a copy of this vector
     * @returns A new vector with the same x, y, and z values as this vector
     */
    clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * Creates a string representation of the vector
     * @returns A string in the format `<x,y,z>`
     */
    stringify(): string {
        return `<${this.x},${this.y},${this.z}>`;
    }

    /**
     * Parses a string representation of a vector and sets the x, y, and z components of this vector to the parsed values
     * @param str The string to parse, which should be in the format `<x,y,z>`
     * @returns The vector itself
     * @throws {SyntaxError} If the string is not in the correct format
     */
    parse(str: string): Vector3 {
        const vector = Vector3.parse(str);

        this.set(vector.getX(), vector.getY(), vector.getZ());
        return this;
    }

    /**
     * Parses a string representation of a vector and returns a new vector with the parsed values
     * @param str The string to parse, which should be in the format `<x,y,z>`
     * @returns A new vector with the parsed x, y, and z values
     * @throws {SyntaxError} If the string is not in the correct format
     */
    static parse(str: string): Vector3 {
        if (!str.startsWith("<") || !str.startsWith("<")) {
            throw new SyntaxError("Missing angle brackets");
        }

        const body = str.slice(1, -1);
        const args = body.split(",");

        if (args.length !== 3) {
            throw new SyntaxError(
                `Expected 3 arguments but got ${args.length}`,
            );
        }

        const x = Number(args[0]);
        const y = Number(args[1]);
        const z = Number(args[2]);
        return new Vector3(x, y, z);
    }
}
