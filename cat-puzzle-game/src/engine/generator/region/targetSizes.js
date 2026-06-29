    /**
     * Generates balanced target sizes for every region.
     *
     * Example:
     * Grid 4x4 = 16 cells
     * Regions = 6
     *
     * Result:
     * [3,3,3,3,2,2]
     */

    export function createTargetSizes(gridSize, regionCount) {

        const totalCells = gridSize * gridSize;

        const baseSize = Math.floor(
            totalCells / regionCount
        );

        const extra = totalCells % regionCount;

        const targets = [];

        for (let i = 0; i < regionCount; i++) {

            targets.push(
                baseSize + (i < extra ? 1 : 0)
            );

        }

        return targets;

    }