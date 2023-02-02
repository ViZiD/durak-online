import browser from 'webextension-polyfill';
import scripts from './scripts';
import ui from './ui';

function init() {
  scripts();
  ui();
}

init();

const nullthrows = (v) => {
  if (v == null) throw new Error("it's a null");
  return v;
};

function injectCode(src) {
  const script = document.createElement('script');
  script.src = src;

  nullthrows(document.head || document.documentElement).appendChild(script);
}

injectCode(browser.runtime.getURL('content/scripts/wshook.js'));
