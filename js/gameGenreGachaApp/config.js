function rarityOf(master, id) {
  const me = master.find(x => x.id === id);
  if (me) return me.rarity;
  throw new Error(`no such ID is found: ${id}`);
}

async function getDataFromDB() {
  // ガチャのレアリティのデータ
  const info = {
    weights: [[5, 0.01], [4, 0.1], [3, 0.89]],
    pickup: [['5001', 0.4], ['5002', 0.4], ['4001', 0.1]],
  };
  // ガチャIDごとのデータ
  const master = [
    { id: 'RPG', rarity: 5 }, // other attributes are ommitted
    { id: '音楽ゲーム', rarity: 5 },
    { id: '5003', rarity: 5 },
    { id: 'アクションゲーム', rarity: 4 },
    { id: '格闘ゲーム', rarity: 4 },
    { id: 'アドベンチャーゲーム', rarity: 4 },
    { id: 'パズルゲーム', rarity: 3 },
    { id: '恋愛ゲーム', rarity: 3 },
    { id: 'ノベルゲーム', rarity: 3 },
  ];

  return [info, master];
}

/**
 * ガチャの設定を取得
 *
 * @returns config[]
 */
export async function getConfig() {
  const config = [];
  const [info, master] = await getDataFromDB();
  info.weights.forEach(([rarity, prob]) => {
    const ids = master
      .filter(x => x.rarity === rarity)
      .map(x => x.id);
    const pickups = info.pickup
      .filter(x => rarityOf(master, x[0]) === rarity);
    config.push({ rarity, prob, pickups, ids });
  });
  return config;
}
