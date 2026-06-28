const DIRECTIONS = [
    [-1,0],
    [1,0],
    [0,-1],
    [0,1]
];

/**
 * Checks whether a region is connected.
 *
 * @param {number[][]} regions
 * @param {number} regionId
 *
 * @returns {boolean}
 */

export function isRegionConnected(
    regions,
    regionId
){

    const size = regions.length;

    let start = null;

    let totalCells = 0;

    for(let row=0;row<size;row++){

        for(let col=0;col<size;col++){

            if(regions[row][col]===regionId){

                totalCells++;

                if(!start){

                    start={row,col};

                }

            }

        }

    }

    if(totalCells===0)
    return true;

    const visited=new Set();

    const queue=[start];

    while(queue.length){

        const current=queue.shift();

        const key=`${current.row},${current.col}`;

        if(visited.has(key))
        continue;

        visited.add(key);

        for(const [dr,dc] of DIRECTIONS){

            const nr=current.row+dr;

            const nc=current.col+dc;

            if(
                nr<0||
                nr>=size||
                nc<0||
                nc>=size
            )
            continue;

            if(
                regions[nr][nc]!==regionId
            )
            continue;

            queue.push({
                row:nr,
                col:nc
            });

        }

    }

    return visited.size===totalCells;

}