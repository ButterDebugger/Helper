import {
	elementPageScaler,
	runAnimation,
	copyToClipboard,
} from "../dist/index.js";

/**
 * Simple assertion that matches the expected value of the result
 */
function assert(result, expected, message = "") {
	const passed = result === expected;

	if (passed) {
		console.log("✅", message);
		return;
	}

	// Log the expected and actual values for easier debugging
	console.log("❌", message, ": Expected", expected, "but got", result);
}

// Perform some tests
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

elementPageScaler(canvas);

runAnimation(async (time, fps) => {
	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#fff";
	ctx.font = "20px monospace";

	ctx.fillText(`Time: ${time}`, 10, 30);
	ctx.fillText(`FPS: ${fps}`, 10, 60);
});

canvas.addEventListener("click", () => {
	copyToClipboard("Hello, world!");
});
