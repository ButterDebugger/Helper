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
     * Returns an iterable of keys in the grid
     * @yields The x and y coordinates of each point
     */
    *keys(): IterableIterator<{
        x: number;
        y: number;
    }> {
        for (const x of this.points.keys()) {
            for (const y of this.points.get(x)!.keys()) {
                yield {
                    x,
                    y,
                };
            }
        }
    }

    /**
     * Returns an iterable of values in the grid
     * @yields The value at each point
     */
    *values(): IterableIterator<T> {
        for (const row of this.points.values()) {
            for (const value of row.values()) {
                yield value;
            }
        }
    }

    /**
     * Returns an iterable of key, value pairs for every entry in the grid
     * @yields The x and y coordinates and value at each point
     */
    *entries(): IterableIterator<{
        x: number;
        y: number;
        value: T;
    }> {
        for (const x of this.points.keys()) {
            for (const y of this.points.get(x)!.keys()) {
                yield {
                    x,
                    y,
                    value: this.points.get(x)!.get(y)!,
                };
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
