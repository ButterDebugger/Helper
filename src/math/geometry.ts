import { clamp } from "./math.ts";
import { Vector2 } from "./vector2d.ts";

/*
 *  General collision functions
 */

export function getNearestPointAlongRectangle(
    rectPos: Vector2,
    rectWidth: number,
    rectHeight: number,
    pointPos: Vector2,
): {
    point: Vector2;
    side: "top" | "bottom" | "left" | "right";
} {
    if (!(rectPos instanceof Vector2)) {
        throw new TypeError("Argument 1 must be a two dimensional vector");
    }
    if (typeof rectWidth !== "number") {
        throw new TypeError("Argument 2 must be a number");
    }
    if (typeof rectHeight !== "number") {
        throw new TypeError("Argument 3 must be a number");
    }
    if (!(pointPos instanceof Vector2)) {
        throw new TypeError("Argument 4 must be a two dimensional vector");
    }

    const left = rectPos.getX();
    const top = rectPos.getY();
    const right = left + rectWidth;
    const bottom = top + rectHeight;

    const pos = pointPos.clone();
    pos.setX(clamp(pos.getX(), left, right));
    pos.setY(clamp(pos.getY(), top, bottom));

    const dl = Math.abs(pos.getX() - left);
    const dr = Math.abs(pos.getX() - right);
    const dt = Math.abs(pos.getY() - top);
    const db = Math.abs(pos.getY() - bottom);
    const m = Math.min(dl, dr, dt, db);

    if (m === dt) {
        return {
            point: pos.setY(top),
            side: "top",
        };
    }
    if (m === db) {
        return {
            point: pos.setY(bottom),
            side: "bottom",
        };
    }
    if (m === dl) {
        return {
            point: pos.setX(left),
            side: "left",
        };
    }
    return {
        point: pos.setX(right),
        side: "right",
    };
}
export function isPointInsideRectangle(
    rectPos: Vector2,
    rectWidth: number,
    rectHeight: number,
    pointPos: Vector2,
): boolean {
    if (!(rectPos instanceof Vector2)) {
        throw new TypeError("Argument 1 must be a two dimensional vector");
    }
    if (typeof rectWidth !== "number") {
        throw new TypeError("Argument 2 must be a number");
    }
    if (typeof rectHeight !== "number") {
        throw new TypeError("Argument 3 must be a number");
    }
    if (!(pointPos instanceof Vector2)) {
        throw new TypeError("Argument 4 must be a two dimensional vector");
    }

    return (
        rectPos.getX() <= pointPos.getX() &&
        pointPos.getX() <= rectPos.getX() + rectWidth &&
        rectPos.getY() <= pointPos.getY() &&
        pointPos.getY() <= rectPos.getY() + rectHeight
    );
}
export function hasCircleRectangleCollision(
    rectPos: Vector2,
    rectWidth: number,
    rectHeight: number,
    circlePos: Vector2,
    circleRadius: number,
): boolean {
    if (!(rectPos instanceof Vector2)) {
        throw new TypeError("Argument 1 must be a two dimensional vector");
    }
    if (typeof rectWidth !== "number") {
        throw new TypeError("Argument 2 must be a number");
    }
    if (typeof rectHeight !== "number") {
        throw new TypeError("Argument 3 must be a number");
    }
    if (!(circlePos instanceof Vector2)) {
        throw new TypeError("Argument 4 must be a two dimensional vector");
    }
    if (typeof circleRadius !== "number") {
        throw new TypeError("Argument 5 must be a number");
    }

    // Check if circle's center is inside the rectangle
    if (isPointInsideRectangle(rectPos, rectWidth, rectHeight, circlePos)) {
        return true;
    }

    // Check if circle is intersecting the rectangle's perimeter
    const { point } = getNearestPointAlongRectangle(rectPos, rectWidth, rectHeight, circlePos);
    if (point.distance(circlePos) < circleRadius) return true;

    return false;
}
