import { assertEquals } from "@std/assert";
import { QuadTree, Point, BoundingCircle, BoundingRectangle } from "../src/index.ts";

Deno.test("quadtree", () => {
  const outerBound = new BoundingRectangle(0, 0, 100, 100);
  const tree = new QuadTree<string>(outerBound, 4);

  // Insert some points
  const p1 = new Point(10, 10, "p1");
  const p2 = new Point(20, 20, "p2");
  const p3 = new Point(30, 30, "p3");
  const p4 = new Point(40, 40, "p4");
  const p5 = new Point(50, 50, "p5");

  tree.insert(p1);
  tree.insert(p2);
  tree.insert(p3);
  tree.insert(p4);
  tree.insert(p5);

  // Query the entire tree
  const points = tree.query(outerBound);

  assertEquals(points.length, 5);
});
