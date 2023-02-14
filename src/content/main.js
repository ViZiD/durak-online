import browser from 'webextension-polyfill';

import scripts from './scripts';
import ui from './ui';

import { injectCode } from './scripts/utils';
import { extension } from './scripts/constants';

injectCode(browser.runtime.getURL(extension.WsHookFilePath));

scripts();
ui();
