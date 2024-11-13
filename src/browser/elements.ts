import type { VoidCallback } from "../types.ts";

/**
 * Copies text to the clipboard
 *
 * **Only works in the browser**
 * @param text The input string to copy
 */
export function copyToClipboard(text: string): void {
    const temp = document.createElement("input");
    temp.setAttribute("value", text);
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
}

/**
 * Initializes event handlers to automatically scale an element to the full size of the page
 *
 * **Only works in the browser**
 * @param ele The element to scale
 * @param callback An optional callback when the element changes scale
 */
export function elementPageScaler(
    ele: HTMLElement & { width: number; height: number },
    callback?: VoidCallback,
): void {
    const scaleElement = () => {
        ele.style.position = "absolute";
        ele.style.top = ele.style.left = "0px";
        ele.style.width = "100vw";
        ele.style.height = "100vh";

        ele.width = globalThis.innerWidth;
        ele.height = globalThis.innerHeight;

        if (typeof callback === "function") callback();
    };
    scaleElement();
    globalThis.addEventListener("DOMContentLoaded", scaleElement);
    globalThis.addEventListener("resize", scaleElement);
}
