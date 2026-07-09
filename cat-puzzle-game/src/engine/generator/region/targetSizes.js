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

    // Distribute remaining cells across regions randomly without index bias
    while (remaining > 0) {
        const idx = Math.floor(random() * regionCount);
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