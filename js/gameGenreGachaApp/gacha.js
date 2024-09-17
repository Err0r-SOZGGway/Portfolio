import { getConfig } from './config';

function createTable(config) {
  const table = [];
  for (const entry of config) {
    const nonPickProb = entry.prob
      * entry.pickups.reduce((acc, x) => acc - x[1], 1)
      / (entry.ids.length - entry.pickups.length);
    for (const cid of entry.ids) {
      const searched = entry.pickups.find(x => x[0] === cid);
      const prob = (searched)
        ? entry.prob * searched[1]
        : nonPickProb;
      table.push([cid, prob]);
    }
  }
  return table;
}

function gacha(config, rval) {
  const table = createTable(config);

  let accum = 0;
  for (const [cid, prob] of table) {
    accum += prob;
    if (rval < accum) return cid;
  }
  throw new Error('システムエラーです');
}

async function main() {
  const config = await getConfig();
  console.log(gacha(config, 0.001)); // 大当たり, キャラID 5001
  console.log(gacha(config, 0.004)); // 大当たり, キャラID 5002
  console.log(gacha(config, 0.04)); // あたり, キャラID 4001
  console.log(gacha(config, 0.7)); // はずれ
}

main();
