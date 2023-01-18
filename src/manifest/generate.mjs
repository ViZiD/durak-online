import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
import version from '../../package.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const log = console.log;
const tag = chalk.dim.bold('📜 manifest/generate ');
const readJSON = async (...filePath) =>
  JSON.parse(await fs.promises.readFile(path.join(__dirname, ...filePath), 'utf8'));

(async function () {
  const target = process.env.TARGET;
  log(tag, `📄 Generating manifest for target ${chalk.bold(target)}`);

  const base = await readJSON('base.json');
  const targetManifest = await readJSON(`${target}.json`);

  const data = JSON.stringify({ version, ...base, ...targetManifest }, null, 2);

  await fs.promises.writeFile(path.join(__dirname, '..', 'manifest.json'), data);

  log(tag, chalk.green(`✨ Manifest generated for target ${chalk.bold(target)}`));
})();
