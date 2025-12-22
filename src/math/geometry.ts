import { clamp } from "./math.ts";
import { Vector2, type Vector2Like } from "./vector2d.ts";

/*
 *  General collision functions
 */

export function getNearestPointAlongRectangle(
    rectPos: Vector2Like,
    rectWidth: number,
    rectHeight: number,
    pointPos: Vector2Like,
): {
    point: Vector2Like;
    side: "top" | "bottom" | "left" | "right";
} {
    const left = rectPos.x;
    const top = rectPos.y;
    const right = left + rectWidth;
    const bottom = top + rectHeight;

    const pos = { x: pointPos.x, y: pointPos.y };
    pos.x = clamp(pos.x, left, right);
    pos.y = clamp(pos.y, top, bottom);

    const dl = Math.abs(pos.x - left);
    const dr = Math.abs(pos.x - right);
    const dt = Math.abs(pos.y - top);
    const db = Math.abs(pos.y - bottom);
    const m = Math.min(dl, dr, dt, db);

    if (m === dt) {
        // Top side
        pos.y = top;

        return {
            point: pos,
            side: "top",
        };
    }
    if (m === db) {
        // Bottom side
        pos.y = bottom;

        return {
            point: pos,
            side: "bottom",
        };
    }
    if (m === dl) {
        // Left side
        pos.x = left;

        return {
            point: pos,
            side: "left",
        };
    }

    // Otherwise, it must be the right side
    pos.x = right;

    return {
        point: pos,
        side: "right",
    };
}

export function isPointInsideRectangle(
    rectPos: Vector2Like,
    rectWidth: number,
    rectHeight: number,
    pointPos: Vector2Like,
): boolean {
    return (
        rectPos.x <= pointPos.x &&
        pointPos.x <= rectPos.x + rectWidth &&
        rectPos.y <= pointPos.y &&
        pointPos.y <= rectPos.y + rectHeight
    );
}

export function hasCircleRectangleCollision(
    rectPos: Vector2Like,
    rectWidth: number,
    rectHeight: number,
    circlePos: Vector2Like,
    circleRadius: number,
): boolean {
    // Check if circle's center is inside the rectangle
    if (isPointInsideRectangle(rectPos, rectWidth, rectHeight, circlePos)) {
        return true;
    }

    // Check if circle is intersecting the rectangle's perimeter
    const { point } = getNearestPointAlongRectangle(
        rectPos,
        rectWidth,
        rectHeight,
        circlePos,
    );
    if (Vector2.distance(point, circlePos) < circleRadius) return true;

    return false;
}
