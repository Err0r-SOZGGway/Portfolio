import { getConfig } from './config';
import { gacha, gacha10 } from './gacha';

async function main() {
  const config = await getConfig();
  // 単発ガチャの実行
  console.log(gacha(config, { ceilCount: 40 }, 0.005)); // -> { id: '5002', ceilCount: 0 }
  console.log(gacha(config, { ceilCount: 40 }, 0.04)); // -> { id: '4002', ceilCount: 41 }
  console.log(gacha(config, { ceilCount: 40 }, 0.7)); // -> { id: '3002', ceilCount: 41 }
  console.log(gacha(config, { ceilCount: 99 }, 0.7)); // -> { id: '5002', ceilCount: 0 }

  // 10連ガチャの実行
  console.log(gacha10(config, { ceilCount: 70 }, Array(10).fill(0.7)));
  // -> { ceilCount: 80, ids: [ '3002', '3002', '3002', '3002', '3002', '3002', '3002', '3002', '3002', '4003' ] }

  console.log(gacha10(config, { ceilCount: 92 }, Array(10).fill(0.7)));
  // -> { ceilCount: 2, ids: [ '3002', '3002', '3002', '3002', '3002', '3002', '3002', '5002', '3002', '3002' ] }
}
