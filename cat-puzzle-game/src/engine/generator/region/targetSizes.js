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

    export function createTargetSizes(gridSize, regionCount, random = Math.random) {
        const totalCells = gridSize * gridSize;
        const targets = Array(regionCount).fill(1);
        let remaining = totalCells - regionCount;

        // Give remaining cells to a few random regions, allowing some to stay exactly 1
        while (remaining > 0) {
            // Heavily bias towards a subset of regions to create massive size disparity
            // e.g. picking Math.floor(random() * random() * regionCount)
            const idx = Math.floor(random() * random() * regionCount);
            targets[idx]++;
            remaining--;
        }

        // Shuffle the targets to random regions
        for (let i = targets.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [targets[i], targets[j]] = [targets[j], targets[i]];
        }

        return targets;
    }