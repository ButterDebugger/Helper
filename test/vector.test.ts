import { assertEquals } from "@std/assert";
import { Vector2, Vector3 } from "../src/index.ts";

Deno.test("2d constructor", () => {
    const v = new Vector2(3, 4);

    assertEquals(v.getX(), 3);
    assertEquals(v.getY(), 4);
});

Deno.test("2d add", () => {
    const v1 = new Vector2(1, 2);
    const v2 = new Vector2(3, 4);
    const result = v1.add(v2);

    assertEquals(result.getX(), 4);
    assertEquals(result.getY(), 6);
});

Deno.test("2d subtract", () => {
    const v1 = new Vector2(5, 7);
    const v2 = new Vector2(2, 3);
    const result = v1.subtract(v2);

    assertEquals(result.getX(), 3);
    assertEquals(result.getY(), 4);
});

Deno.test("2d magnitude", () => {
    const v = new Vector2(3, 4);

    assertEquals(v.mag(), 5);
});

Deno.test("3d constructor", () => {
    const v = new Vector3(1, 2, 3);

    assertEquals(v.getX(), 1);
    assertEquals(v.getY(), 2);
    assertEquals(v.getZ(), 3);
});

Deno.test("3d add", () => {
    const v1 = new Vector3(1, 2, 3);
    const v2 = new Vector3(4, 5, 6);
    const result = v1.add(v2);

    assertEquals(result.getX(), 5);
    assertEquals(result.getY(), 7);
    assertEquals(result.getZ(), 9);
});

Deno.test("3d subtract", () => {
    const v1 = new Vector3(10, 8, 6);
    const v2 = new Vector3(1, 2, 3);
    const result = v1.subtract(v2);

    assertEquals(result.getX(), 9);
    assertEquals(result.getY(), 6);
    assertEquals(result.getZ(), 3);
});

Deno.test("3d magnitude", () => {
    const v = new Vector3(2, 3, 6);

    assertEquals(v.mag(), 7);
});
