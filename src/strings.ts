/**
 * Creates a new string with the characters in reverse order
 * @param str The input string
 * @returns The reversed string
 */
export function reverse(str: string): string {
    return str.split("").reverse().join("");
}

/**
 * Creates a new string with the specified prefix removed
 * @param str The input string
 * @param prefix The prefix to remove
 * @returns The string with the prefix removed
 */
export function removePrefix(str: string, prefix: string): string {
    const newStr = str;

    if (newStr.startsWith(prefix)) {
        return newStr.substring(prefix.length);
    }

    return newStr;
}

/**
 * Creates a new string with the specified suffix removed
 * @param str The input string
 * @param suffix The suffix to remove
 * @returns The string with the suffix removed
 */
export function removeSuffix(str: string, suffix: string): string {
    const newStr = str;

    if (newStr.endsWith(suffix)) {
        return newStr.substring(0, newStr.length - suffix.length);
    }

    return newStr;
}

/**
 * Converts a Uint8Array or number array into a string
 * @param chars The input array of numbers
 * @returns The decoded string
 */
export function fromUint8Array(chars: Uint8Array | number[]): string {
    const MAX_SAFE_LENGTH = 8192;

    if (chars.length <= MAX_SAFE_LENGTH) {
        return String.fromCharCode.apply(String, <number[]> chars);
    }

    const chunks = [];
    for (let i = 0; i < chars.length; i += MAX_SAFE_LENGTH) {
        const slice = chars.slice(i, i + MAX_SAFE_LENGTH);
        chunks.push(String.fromCharCode.apply(String, <number[]> slice));
    }
    return chunks.join("");
}

/**
 * Converts a string into a Uint8Array
 * @param str The input string
 * @returns The byte representation of the string
 */
export function toUint8Array(str: string): Uint8Array {
    const len = str.length;
    const uint8 = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        uint8[i] = str.charCodeAt(i);
    }
    return uint8;
}

/**
 * Generates a random string of the specified length
 * @param len The length of the string
 * @returns The random string
 */
export function randomString(len: number): string {
    // Generate a random values
    const arr = new Uint8Array(len);
    crypto.getRandomValues(arr);

    // Convert to string
    return String.fromCharCode(...arr);
}

/**
 * Encodes a string into Base64Url
 * @param str The input string
 * @returns The Base64Url encoded string
 */
export function base64UrlEncode(str: string): string {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Decodes a Base64Url encoded string
 * @param str The input string
 * @returns The decoded string
 */
export function base64UrlDecode(str: string): string {
    return atob(str.replace(/-/g, "+").replace(/_/g, "/"));
}
