/**
 * Callback function for animation frames
 */
export type AnimateCallback = (
    time: number,
    timeStep: number,
) => Promise<boolean | undefined> | boolean | undefined;

/**
 * Automatically schedules animation frames
 *
 * **Only works in the browser**
 * @param animation The animation callback function
 */
export function runAnimation(animation: AnimateCallback): void {
    let lastTime: number | null = null;

    const frame: FrameRequestCallback = async (time: number) => {
        const timeStep = lastTime === null ? 0 : 1000 / (time - lastTime);

        if ((await animation(time, timeStep)) === false) {
            return; // Stop animation
        }

        lastTime = time;
        requestAnimationFrame(frame); // Request another frame
    };

    requestAnimationFrame(frame); // Begin animation
}
