import { assertEquals } from "@std/assert";
import { choose, factorial, mod } from "../src/index.ts";

Deno.test("Mod", () => {
    assertEquals(mod(10, 5), 0);
    assertEquals(mod(11, 5), 1);
    assertEquals(mod(12, 5), 2);
    assertEquals(mod(13, 5), 3);
    assertEquals(mod(14, 5), 4);
    assertEquals(mod(15, 5), 0);
    assertEquals(mod(-1, 5), 4);
    assertEquals(mod(-2, 5), 3);
    assertEquals(mod(-3, 5), 2);
    assertEquals(mod(-4, 5), 1);
    assertEquals(mod(-5, 5), 0);
    assertEquals(mod(10, -5), 0);
    assertEquals(mod(11, -5), -4);
    assertEquals(mod(12, -5), -3);
    assertEquals(mod(13, -5), -2);
    assertEquals(mod(14, -5), -1);
    assertEquals(mod(15, -5), 0);
    assertEquals(mod(-1, -5), -1);
    assertEquals(mod(-2, -5), -2);
    assertEquals(mod(-3, -5), -3);
    assertEquals(mod(-4, -5), -4);
    assertEquals(mod(-5, -5), 0);
});

Deno.test("Factorial", () => {
    assertEquals(factorial(0), 1);
    assertEquals(factorial(1), 1);
    assertEquals(factorial(2), 2);
    assertEquals(factorial(6), 720);
    assertEquals(factorial(14), 87178291200);
});

Deno.test("Choose", () => {
    assertEquals(choose(34, 10), 131128139.99999999); // IEEE moment: 131128140
    assertEquals(choose(10, 4), 210);
    assertEquals(choose(8, 5), 56);
    assertEquals(choose(6, 2), 15);
    assertEquals(choose(14, 5), 2002);
});
