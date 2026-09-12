import { chromium } from 'playwright';
import path from 'path';

const filePath = path.resolve('C:/Users/LAP17257/OneDrive - VNG Group JSC/Documents/Mahjong x Block/Final Outputs/index.html');
const url = 'file:///' + filePath.replace(/\\/g, '/');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 400, height: 800 } });
await page.goto(url);
await page.waitForTimeout(800);

const info = await page.evaluate(() => {
  const D = window.__digest24k1;
  const level = D.LEVELS[28];
  return {
    title: level.title,
    size: level.size,
    seals: level.seals,
    solution: level.solution,
    winTargets: level.winTargets,
    goalType: level.goalType,
    tiles: level.tiles,
  };
});
console.log(JSON.stringify(info, null, 2));

// step through move by move, logging per-seal achieved counts and legality at each step
const steps = await page.evaluate(() => {
  const D = window.__digest24k1;
  const level = D.LEVELS[28];
  const model = D.debug.freshModel(28);
  const log = [];
  for (let m = 0; m < level.solution.length; m++) {
    const move = level.solution[m];
    const before = JSON.parse(JSON.stringify(model.sealAdjacentCounts||{}));
    const r = D.debug.modelDrop(model, move.row, move.col);
    log.push({ m, move, legal: r.legal, reason: r.sim && r.sim.reason, sealAdjCountsBefore: before, sealAdjCountsAfter: JSON.parse(JSON.stringify(model.sealAdjacentCounts||{})) });
    if (!r.legal) break;
  }
  return log;
});
console.log(JSON.stringify(steps, null, 2));

await browser.close();
