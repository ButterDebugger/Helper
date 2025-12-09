/**
 * An infinite 2D space expanding in all directions with points snapped to integer coordinates
 */
export class Grid<T> {
    private points: Map<number, Map<number, T>> = new Map();

    /**
     * Gets the value at the given point
     * @param x The x coordinate
     * @param y The y coordinate
     */
    get(x: number, y: number): T | undefined {
        // Get the key
        const floorX = Math.floor(x);
        const floorY = Math.floor(y);

        // Get the value
        return this.points.get(floorX)?.get(floorY);
    }

    /**
     * Sets the value at the given point
     * @param x The x coordinate
     * @param y The y coordinate
     * @param value The value to set
     */
    set(x: number, y: number, value: T): void {
        // Get the key
        const floorX = Math.floor(x);
        const floorY = Math.floor(y);

        // Create the row if it doesn't exist
        let row = this.points.get(floorX);
        if (!row) {
            row = new Map();
            this.points.set(floorX, row);
        }

        // Set the value
        row.set(floorY, value);
    }

    /**
     * Checks if the given point has a value
     * @param x The x coordinate
     * @param y The y coordinate
     */
    has(x: number, y: number): boolean {
        // Get the key
        const floorX = Math.floor(x);
        const floorY = Math.floor(y);

        // Check if the value exists
        return this.points.get(floorX)?.has(floorY) ?? false;
    }

    /**
     * Deletes the value at the given point
     * @param x The x coordinate
     * @param y The y coordinate
     */
    delete(x: number, y: number): void {
        // Get the key
        const floorX = Math.floor(x);
        const floorY = Math.floor(y);

        // Delete the value
        const row = this.points.get(floorX);
        if (row) {
            row.delete(floorY);

            // Delete the row if it's empty
            if (row.size === 0) {
                this.points.delete(floorX);
            }
        }
    }

    /**
     * Clears the grid
     */
    clear(): void {
        this.points.clear();
    }
}
