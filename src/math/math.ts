// General math functions

/**
 * Calculates the nth root of a number
 * @param radicand The number to calculate the root of
 * @param root The degree of the root
 * @returns The nth root of the radicand
 */
export function radical(radicand: number, root: number): number {
  return (radicand > 1 || radicand < -1) && root === 0 // If root is 0 and radicand is not between -1 and 1
    ? Number.POSITIVE_INFINITY
    : radicand !== 0 && root === 0 // If root is 0 and radicand is not 0
      ? 1
      : radicand < 0 && root % 2 === 0 // If radicand is negative and root is even
        ? Number.NaN // Imaginary numbers: // `${((x < 0 ? -x : x) ** (1 / n))}${"i"}` */
        : root === 3 && radicand < 0 // If root is 3 and radicand is negative
          ? -Math.cbrt(-radicand) // Negative cube root of radicand
          : radicand < 0 // If radicand is negative
            ? -((radicand < 0 ? -radicand : radicand) ** (1 / root)) // -1 * ( abs( radicand ) ^ (1 / root) )
            : root === 3 && radicand > 0 // If root is 3 and radicand is positive
              ? Math.cbrt(radicand) // Cube root of radicand
              : (radicand < 0 ? -radicand : radicand) ** (1 / root); // abs( radicand ) ^ (1 / root)
}

/**
 * Generates a random integer between min and max (inclusive)
 * @param min The minimum range
 * @param max The maximum range
 * @returns A random integer within the given range
 */
export function randomInt(min = 0, max = 1): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Generates a random float between min and max (inclusive)
 * @param min The minimum range
 * @param max The maximum range
 * @returns A random float within the given range
 */
export function randomFloat(min = 0, max = 1): number {
  return Math.random() * (max - min) + min;
}

/**
 * Constrains a value between a minimum and maximum value.
 * @param value The value to constrain
 * @param lower The minimum value
 * @param upper The maximum value
 * @returns The value constrained between lower and upper.
 */
export function clamp(value: number, lower: number, upper: number): number {
  return Math.max(lower, Math.min(upper, value));
}

/**
 * Maps a value from one range to another.
 * @param value The value to remap
 * @param start1 The minimum value of the input
 * @param stop1 The maximum value of the input
 * @param start2 The minimum value of the output
 * @param stop2 The maximum value of the output
 * @param constrain Whether to constrain the output to the range of start2 and stop2
 * @returns The remapped number
 */
export function remapRange(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number,
  constrain = false,
): number {
  const newValue = ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;

  if (!constrain) {
    return newValue;
  }

  if (start2 < stop2) {
    return clamp(newValue, start2, stop2);
  }

  return clamp(newValue, stop2, start2);
}

/**
 * Correctly calculates the modulo of two numbers
 * @param dividend The number to be divided
 * @param divisor The number to divide by
 * @returns The positive remainder
 */
export function mod(dividend: number, divisor: number): number {
  return ((dividend % divisor) + divisor) % divisor;
}

/**
 * Wraps a value around a range
 * @param value The value to wrap
 * @param lower The minimum value of the range
 * @param upper The maximum value of the range
 * @returns The wrapped value
 */
export function wrap(value: number, lower: number, upper: number): number {
  const range = upper - lower;
  return ((((value - lower) % range) + range) % range) + lower;
}

/**
 * Calculates the factorial of a number
 * @param num The number to calculate the factorial of
 * @returns The factorial of the number
 */
export function factorial(num: number): number {
  if (num < 0) return Number.NaN;
  let value = 1;
  for (let i = 2; i <= num; i++) {
    value *= i;
  }
  return value;
}

/**
 * @param n Total number of items
 * @param r Number of items selected
 * @returns Number of permutations
 */
export function permutation(n: number, r: number): number {
  return factorial(n) / factorial(n - r);
}

/**
 * @param n Total number of items
 * @param k Number of items selected
 * @returns Number of combinations
 */
export function choose(n: number, k: number): number {
  return factorial(n) / (factorial(k) * factorial(n - k));
}

/**
 * Calculates the linear interpolation of a value between two numbers
 * @param a The starting number
 * @param b The ending number
 * @param t The interpolation factor (between 0 and 1)
 * @returns The interpolated number
 */
export function lerp(a: number, b: number, t: number): number {
  return (1 - t) * a + t * b;
}
