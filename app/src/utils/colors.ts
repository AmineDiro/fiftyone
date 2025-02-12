let seedCache = 0;
let mapCache = {};
let poolCache: string[] = null;
let colorByLabelCache = false;

function shuffle(array: string[], seed: number) {
  let m = array.length,
    t,
    i;

  while (m) {
    i = Math.floor(random(seed) * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed;
  }

  return array;
}

function random(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

export function generateColorMap(
  colorPool: string[],
  seed: number,
  colorByLabel = false
): (value) => string {
  if (
    JSON.stringify(poolCache) !== JSON.stringify(colorPool) ||
    colorByLabelCache !== colorByLabel
  ) {
    poolCache = colorPool;
    mapCache = {};
  }
  const newMap = seed === seedCache ? Object.assign({}, mapCache) : {};
  seedCache = seed;
  let colors = Array.from(poolCache);
  if (seed > 0) {
    colors = shuffle(colors, seed);
  }

  let offset = Object.keys(newMap).length;
  mapCache = newMap;
  let i = 0;
  return (val) => {
    if (val in newMap) {
      return newMap[val];
    }
    offset = Object.keys(newMap).length;
    newMap[val] = colors[i % colors.length];
    i++;
    return newMap[val];
  };
}
