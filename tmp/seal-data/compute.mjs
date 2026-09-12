import { chromium } from 'playwright';
import path from 'path';

const filePath = path.resolve('C:/Users/LAP17257/OneDrive - VNG Group JSC/Documents/Mahjong x Block/Final Outputs/index.html');
const url = 'file:///' + filePath.replace(/\\/g, '/');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 400, height: 800 } });
const errors = [];
page.on('pageerror', e => errors.push('PAGEERROR: ' + e.message));
page.on('console', m => { if (m.type() === 'error') errors.push('CONSOLE: ' + m.text()); });
await page.goto(url);
await page.waitForTimeout(800);

console.log('load errors:', errors.length ? errors.join('\n') : '(none)');

const result = await page.evaluate(() => {
  const D = window.__digest24k1;
  const LEVELS = D.LEVELS;
  const out = [];
  LEVELS.forEach((level, i) => {
    if (!level.seals || !level.seals.length) return;
    const model = D.debug.freshModel(i);
    let failedAt = null;
    for (let m = 0; m < level.solution.length; m++) {
      const move = level.solution[m];
      const r = D.debug.modelDrop(model, move.row, move.col);
      if (!r.legal) { failedAt = { moveIndex: m, move, reason: r.sim && r.sim.reason }; break; }
    }
    const perSeal = level.seals.map((s, si) => Object.keys((model.sealAdjacentCounts && model.sealAdjacentCounts[si]) || {}).length);
    out.push({ idx: i, lvNum: i + 1, title: level.title, goalType: level.goalType, sealsCount: level.seals.length, oldSealRequiredDistinct: level.sealRequiredDistinct, perSealAchieved: perSeal, failedAt });
  });
  return out;
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
