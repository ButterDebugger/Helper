/**
 * A data point with an associated value
 */
export class Point<T> {
  readonly x: number;
  readonly y: number;

  data: T;

  /**
   * @param x The x coordinate of the point
   * @param y The y coordinate of the point
   * @param data The data associated with the point
   */
  constructor(x: number, y: number, data: T) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}

/**
 * Queryable bounding shape
 */
interface BoundingShape<T> {
  /**
   * Checks if the shape contains a point
   * @param point The point to check
   */
  contains(point: Point<T>): boolean;

  /**
   * Checks if the shape intersects with a bounding rectangle
   * @param rect The rectangle to check
   */
  intersects(rect: BoundingRectangle<T>): boolean;
}

/**
 * A bounding rectangle
 */
export class BoundingRectangle<T> implements BoundingShape<T> {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;

  /**
   * @param x The x bottom left coordinate of the rectangle
   * @param y The y bottom left coordinate of the rectangle
   * @param width The width of the rectangle
   * @param height The height of the rectangle
   */
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  contains(point: Point<T>): boolean {
    return (
      point.x >= this.x - this.width &&
      point.x <= this.x + this.width &&
      point.y >= this.y - this.height &&
      point.y <= this.y + this.height
    );
  }

  intersects(rect: BoundingRectangle<T>): boolean {
    return !(
      rect.x - rect.width > this.x + this.width ||
      rect.x + rect.width < this.x - this.width ||
      rect.y - rect.height > this.y + this.height ||
      rect.y + rect.height < this.y - this.height
    );
  }
}

/**
 * A bounding circle
 */
export class BoundingCircle<T> implements BoundingShape<T> {
  readonly x: number;
  readonly y: number;
  readonly radius: number;

  /**
   * @param x The x center coordinate of the circle
   * @param y The y center coordinate of the circle
   * @param radius The radius of the circle
   */
  constructor(x: number, y: number, radius: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  get radiusSquared(): number {
    return this.radius * this.radius;
  }

  contains(point: Point<T>): boolean {
    const dist = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);

    return dist <= this.radiusSquared;
  }

  intersects(rect: BoundingRectangle<T>): boolean {
    const xDist = Math.abs(rect.x - this.x);
    const yDist = Math.abs(rect.y - this.y);
    const edges = Math.pow(xDist - rect.width, 2) + Math.pow(yDist - rect.height, 2);

    if (xDist > this.radius + rect.width || yDist > this.radius + rect.height) return false;
    if (xDist <= rect.width || yDist <= rect.height) return true;

    return edges <= this.radiusSquared;
  }
}

/**
 * A quadtree containing points and sub quadtrees
 */
export class QuadTree<T> {
  readonly boundary: BoundingRectangle<T>;
  readonly capacity: number;
  readonly points: Point<T>[];

  divided: boolean;
  topRight?: QuadTree<T>;
  topLeft?: QuadTree<T>;
  bottomRight?: QuadTree<T>;
  bottomLeft?: QuadTree<T>;

  /**
   * @param boundary The boundary of the quadtree
   * @param capacity The maximum number of points the quadtree can hold before subdividing
   */
  constructor(boundary: BoundingRectangle<T>, capacity: number) {
    if (capacity < 1) throw new RangeError("Capacity must be greater than 0.");

    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  private subdivide(): void {
    // Cancel if already subdivided
    if (this.divided) return;

    // Calculate the new boundaries
    const x = this.boundary.x;
    const y = this.boundary.y;
    const w = this.boundary.width / 2;
    const h = this.boundary.height / 2;

    // Create the new quadrants
    this.topRight = new QuadTree(new BoundingRectangle(x + w, y - h, w, h), this.capacity);
    this.topLeft = new QuadTree(new BoundingRectangle(x - w, y - h, w, h), this.capacity);
    this.bottomRight = new QuadTree(new BoundingRectangle(x + w, y + h, w, h), this.capacity);
    this.bottomLeft = new QuadTree(new BoundingRectangle(x - w, y + h, w, h), this.capacity);

    // Mark as subdivided
    this.divided = true;
  }

  /**
   * Inserts a new point into the quadtree
   * @param point The point to insert
   * @returns Whether the point was inserted
   */
  insert(point: Point<T>): boolean {
    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }

    if (!this.divided) {
      this.subdivide();
    }

    return (
      this.topRight!.insert(point) ||
      this.topLeft!.insert(point) ||
      this.bottomRight!.insert(point) ||
      this.bottomLeft!.insert(point)
    );
  }

  /**
   * Queries the quadtree for points within the given shape
   * @param range The shape to query
   * @param found The points found so far, used internally during query
   * @returns The points found within the shape
   */
  query(range: BoundingShape<T>, found: Point<T>[] = []): Point<T>[] {
    if (!range.intersects(this.boundary)) {
      return found;
    }

    for (const point of this.points) {
      if (range.contains(point)) found.push(point);
    }

    if (this.divided) {
      this.topLeft!.query(range, found);
      this.topRight!.query(range, found);
      this.bottomLeft!.query(range, found);
      this.bottomRight!.query(range, found);
    }

    return found;
  }
}
