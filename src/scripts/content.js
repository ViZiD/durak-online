import browser from 'webextension-polyfill';

const nullthrows = (v) => {
  if (v == null) throw new Error("it's a null");
  return v;
};

const injectScript = (src) => {
  const script = document.createElement('script');
  script.setAttribute('src', src);

  nullthrows(document.head || document.documentElement).appendChild(script);
};

injectScript(browser.runtime.getURL('scripts/injector.js'));
