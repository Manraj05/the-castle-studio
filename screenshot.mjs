import { execSync } from 'child_process';
import { mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, 'temporary screenshots');
mkdirSync(dir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

const existing = readdirSync(dir).filter(f => f.endsWith('.png'));
const n = existing.length + 1;
const out = join(dir, `screenshot-${n}${label}.png`);

const chrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
execSync(
  `"${chrome}" --headless=new --screenshot="${out}" --window-size=1440,900 --hide-scrollbars "${url}"`,
  { stdio: 'inherit' }
);

console.log(`Saved: ${out}`);
