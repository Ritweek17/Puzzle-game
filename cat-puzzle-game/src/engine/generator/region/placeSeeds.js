export function placeSeeds(board, regionCount, random) {
  const size = board.length;

  const regions = board.map((row) => [...row]);

  const seeds = [];

  let id = 1;

  while (id <= regionCount) {
    const row = Math.floor(random() * size);
    const col = Math.floor(random() * size);

    if (regions[row][col] !== -1) continue;

    regions[row][col] = id;

    seeds.push({
      id,
      row,
      col,
    });

    id++;
  }

  return { regions, seeds };
}