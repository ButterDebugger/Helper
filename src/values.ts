/**
 * Checks if a string is valid JSON
 * @param str The input string
 * @returns Whether the input string is valid JSON
 */
export function isJSON(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (_) {
        return false;
    }
    return true;
}

/**
 * Generates a range of numbers
 * @param start The beginning number
 * @param end The ending number
 * @param step The step between numbers
 * @returns A generator that yields numbers in the specified range
 * @throws {Error} If called with not enough or too many arguments
 */
export function* range(
    start: number,
    end: number,
    step: number,
): Generator<number> {
    // biome-ignore lint/style/noArguments: Used to determine which loop to use
    switch (arguments.length) {
        case 0:
            throw new Error("Not enough arguments");
        case 1:
            for (let i = 0; i < start; i++) {
                yield i;
            }
            break;
        case 2:
            for (let i = start; i < end; i++) {
                yield i;
            }
            break;
        case 3:
            for (let i = start; i < end; i += step) {
                yield i;
            }
            break;
        default:
            throw new Error("Too many arguments");
    }
}

/**
 * Checks if a value is nullish
 * @param val The input value
 * @returns Whether the input value is nullish
 */
export function isNil(val: unknown): boolean {
    return val !== (val ?? !val);
}
