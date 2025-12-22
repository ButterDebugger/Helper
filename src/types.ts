// Common types

/**
 * Callback function with no return type
 */
export type VoidCallback = () => void;

/**
 * Check if the given object is a record
 * @param obj The object to check
 * @returns True if the object is a record, false otherwise
 */
export function isRecord(obj: unknown): obj is Record<string, unknown> {
    return typeof obj === "object" && obj !== null && !Array.isArray(obj);
}
