import { assertArrayIncludes, assertEquals } from "@std/assert";
import {
    BoundingCircle,
    BoundingRectangle,
    Point,
    QuadTree,
} from "../src/index.ts";

const outerBound = new BoundingRectangle(0, 0, 100, 100);
const tree = new QuadTree<string>(outerBound, 4);

// Insert some points
//     4
// 2 3
// 1   5
const p1 = new Point(25, 25, "bottom-left");
const p2 = new Point(25, 50, "middle-left");
const p3 = new Point(50, 50, "center");
const p4 = new Point(75, 75, "top-right");
const p5 = new Point(75, 25, "bottom-right");

tree.insert(p1);
tree.insert(p2);
tree.insert(p3);
tree.insert(p4);
tree.insert(p5);

Deno.test("Query entire tree", () => {
    const points = tree.query(outerBound);

    assertArrayIncludes(points, [p1, p2, p3, p4, p5]);
    assertEquals(points.length, 5);
});

Deno.test("Query rectangle", () => {
    const rect = new BoundingRectangle(0, 0, 50, 50);
    const points = tree.query(rect);

    assertArrayIncludes(points, [p1, p2, p3]);
    assertEquals(points.length, 3);
});

Deno.test("Query circle", () => {
    const circle = new BoundingCircle(50, 50, 30);
    const points = tree.query(circle);

    assertArrayIncludes(points, [p2, p3]);
    assertEquals(points.length, 2);
});
