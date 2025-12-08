/**
 * Checks if an index is out of range for a given array
 * @param array The input array
 * @param index The index to check
 * @returns Whether the index is out of range
 */
export function isIndexOutOfRange(array: unknown[], index: number): boolean {
    return index < 0 || index >= array.length;
}

/**
 * Creates a new array with its items in random order
 * @param arr The input array
 * @returns The shuffled array
 */
export function shuffle<T>(arr: T[]): T[] {
    let shuffledArr = arr;

    for (let i = shuffledArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        shuffledArr = swap(shuffledArr, i, j);
    }

    return shuffledArr;
}

/**
 * Creates a new array with two of its items swapped
 * @param arr The input array
 * @returns The switched array
 * @throws {RangeError} If the either of the indices are out of range
 */
export function swap<T>(arr: T[], index1: number, index2: number): T[] {
    if (isIndexOutOfRange(arr, index1) || isIndexOutOfRange(arr, index2)) {
        throw new RangeError("Index is out of range");
    }

    const newArr = arr;

    const temp = newArr[index1];
    newArr[index1] = newArr[index2];
    newArr[index2] = temp;

    return newArr;
}
