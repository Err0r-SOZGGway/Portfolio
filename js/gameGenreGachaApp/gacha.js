/**
 * ガチャテーブルを作成
 *
 * @param config
 * @returns
 */
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
      table.push([cid, prob, entry.rarity]);
    }
  }
  return table;
}

function normalize(configLike) {
  const ret = [];
  const summed = configLike.reduce((acc, x) => acc + x.prob, 0);
  configLike.forEach(entry => ret.push({ ...entry, prob: entry.prob / summed }));
  return ret;
}

function createTableCeil(conf) {
  const filtered = normalize(conf.filter(x => x.rarity === 5));
  return createTable(filtered);
}

function createTableRescue(conf) {
  const filtered = normalize(conf.filter(x => x.rarity > 3));
  return createTable(filtered);
}

function gachaInternal(config, user, rval) {
  const ceilCount = user.ceilCount || 0;
  const table = ceilCount === 99
    ? createTableCeil(config)
    : user.rescue
      ? createTableRescue(config)
      : createTable(config);

  let accum = 0;
  for (const [cid, prob, rarity] of table) {
    accum += prob;
    if (rval < accum) return [cid, rarity];
  }
  throw new Error('システムエラーです');
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

export function gacha10(config, user, rvals) {
  const ids = [];
  let { ceilCount } = user;
  for (let i = 0, over4 = false; i < rvals.length; i += 1) {
    const rescue = i === rvals.length - 1 && over4 === false;
    const [id, rarity] = gachaInternal(config, { ceilCount, rescue }, rvals[i]);
    ceilCount = rarity === 5 ? 0 : ceilCount + 1;
    if (rarity > 3) over4 = true;
    ids.push(id);
  }
  return { ids, ceilCount };
}