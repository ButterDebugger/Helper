import { assertEquals } from "@std/assert";
import { Grid } from "../src/index.ts";

Deno.test("Sample grid points", () => {
    const grid = new Grid<number>();

    grid.set(0, 0, 1);
    grid.set(-1, 1, 2);
    grid.set(1, 0, 3);
    grid.set(0, 1, 4);

    grid.set(-0.7, 1.2, 5);

    // Get values
    assertEquals(grid.get(0, 0), 1);
    assertEquals(grid.get(-1, 1), 5);
    assertEquals(grid.get(1, 0), 3);
    assertEquals(grid.get(0, 1), 4);

    // Get undefined values
    assertEquals(grid.get(1, 1), undefined);

    // Check if values exist
    assertEquals(grid.has(0, 0), true);
    assertEquals(grid.has(-1, 1), true);
    assertEquals(grid.has(1, 0), true);
    assertEquals(grid.has(0, 1), true);
    assertEquals(grid.has(1, 1), false);
});

Deno.test("Random grid points", () => {
    const grid = new Grid<number>();
    const points: { x: number; y: number; value: number }[] = [];

    for (let i = 0; i < 100; i++) {
        const x = Math.random() * 1e10 - 5e9;
        const y = Math.random() * 1e10 - 5e9;

        grid.set(x, y, i);

        points.push({ x, y, value: i });
    }

    for (const point of points) {
        assertEquals(grid.get(point.x, point.y), point.value);
    }
});

Deno.test("Square of grid points", () => {
    const grid = new Grid<string>();

    for (let x = -50; x < 50; x++) {
        for (let y = -50; y < 50; y++) {
            grid.set(x, y, `${x},${y}`);
        }
    }

    for (let x = -50; x < 50; x++) {
        for (let y = -50; y < 50; y++) {
            assertEquals(grid.get(x, y), `${x},${y}`);
        }
    }
});
