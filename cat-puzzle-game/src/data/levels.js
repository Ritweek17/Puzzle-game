/**
 * ----------------------------------------------------
 * File : levels.js
 *
 * Purpose :
 * Generates all game levels.
 *
 * Status :
 * Final v2
 * ----------------------------------------------------
 */

const levels = [];

/* ---------------- Easy (150) ---------------- */

for (let i = 1; i <= 150; i++) {

  levels.push({

    id: i,

    title: `Level ${i}`,

    difficulty: "Easy",

    size: 4,

  });

}

/* ---------------- Medium (150) ---------------- */

for (let i = 151; i <= 300; i++) {

  levels.push({

    id: i,

    title: `Level ${i}`,

    difficulty: "Medium",

    size: 5,

  });

}

/* ---------------- Hard (100) ---------------- */

for (let i = 301; i <= 400; i++) {

  levels.push({

    id: i,

    title: `Level ${i}`,

    difficulty: "Hard",

    size: 6,

  });

}

export default levels;