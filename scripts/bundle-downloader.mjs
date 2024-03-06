import fs from 'node:fs/promises';
import url from 'node:url';
import path from 'node:path';
import got from 'got';
import chalk from 'chalk';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const log = console.log;

// colors
const succes = chalk.hex('#82C220');
const essential = chalk.hex('#EC7D19');
// const warning = chalk.hex('#BC0B4A');

const getMainFilePath = async (appRootPath, redirectRulesPath) => {
  const redirectRules = JSON.parse(await fs.readFile(redirectRulesPath, 'utf-8'));
  const extensionPath = redirectRules[0]['action']['redirect']['extensionPath'];
  const mainFilePath = path.join(appRootPath, 'src', extensionPath);
  return mainFilePath;
};

const injectVariableToBundle = (bundle, regExp) => {
  const variable = 'var durak_store;';
  log('Inject variable to store ' + chalk.bold(essential(variable)) + '\n');
  const targetFunction = bundle.match(regExp)[0];
  const functionArgument = bundle.match(regExp)[1];
  const variableContent = `${targetFunction}durak_store = ${functionArgument}.store;`;
  const result = (variable + bundle).replace(targetFunction, variableContent);
  log('Got target function ' + chalk.bold(essential(targetFunction)));
  log('Got function argument ' + '"' + chalk.bold(essential(functionArgument)) + '"');
  log('Maked content for variable ' + chalk.bold(essential(variableContent)));
  log(
    'Target function ' +
      chalk.bold(essential(targetFunction)) +
      ' replaced ' +
      chalk.bold(essential(variableContent)) +
      '\n',
  );
  log('Bundle modifed ' + chalk.bold(succes('successfully\n')));
  return result;
};

(async function () {
  const appRootPath = path.dirname(__dirname);
  const redirectRulesPath = path.join(appRootPath, 'src', 'redirect-rules.json');
  const mainFilePath = await getMainFilePath(appRootPath, redirectRulesPath);

  const durakBaseURL = 'https://durakonline.ru/game';

  const bundleFileRegExp = /static\/js\/main\.[a-z0-9]+\.chunk\.js/;
  const functionRegExp = /mark\(\(function .\((.)\)\{var\s../;

  const durakInstance = got.extend({
    prefixUrl: durakBaseURL,
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 YaBrowser/23.9.0.2293 Yowser/2.5 Safari/537.36',
    },
  });

  log('Parsing bundle name from ' + chalk.bold(succes('index.html')));
  const mainBundlePath = (await durakInstance('index.html')).body.match(bundleFileRegExp)[0];
  log('Parsing bundle name successfully - ' + chalk.bold(succes(mainBundlePath)) + '\n');
  const mainBundle = (await durakInstance(mainBundlePath)).body;
  const modifiedBundle = injectVariableToBundle(mainBundle, functionRegExp);
  try {
    log('Saving modifed bundle...');
    await fs.writeFile(mainFilePath, modifiedBundle, 'utf-8');
    log('Bundle ' + chalk.bold(succes('successfully')) + ' saved to');
    log(chalk.bold(succes(mainFilePath)) + '\n');
  } catch (error) {
    log(error);
  }
})();
