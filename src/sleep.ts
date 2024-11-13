/**
 * Pauses execution for a specified number of milliseconds
 * @param ms The number of milliseconds to pause execution for
 * @returns A promise that resolves after the specified delay
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((res) => setTimeout(res, ms));
}
