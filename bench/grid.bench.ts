import { Grid } from "../src/index.ts";

const width = 1000;

Deno.bench("Square grid", () => {
    const grid = new Grid();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            grid.set(x, y, x + y * width);
        }
    }

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            grid.get(x, y);
        }
    }
});

Deno.bench("Grid of random points", () => {
    const grid = new Grid();

    for (let i = 0; i < width * width; i++) {
        const x = Math.random() * 1e10 - 5e9;
        const y = Math.random() * 1e10 - 5e9;
        grid.set(x, y, i);
    }

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < width; y++) {
            grid.get(x, y);
        }
    }
});
