import { Observable } from 'rxjs';

import { selectors, durakRe } from './constants';

export const addedNodeObserver = new Observable((subscriber) => {
  function handleMutations(mutations) {
    for (const { addedNodes } of mutations) {
      for (const element of addedNodes) {
        if (element.nodeType !== 1) continue;
        subscriber.next(element);
      }
    }
  }
  const observer = new MutationObserver(handleMutations);

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
});

export const removedNodeObserver = new Observable((subscriber) => {
  function handleMutations(mutations) {
    for (const { removedNodes } of mutations) {
      for (const element of removedNodes) {
        if (element.nodeType !== 1) continue;
        subscriber.next(element);
      }
    }
  }
  const observer = new MutationObserver(handleMutations);

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
});

export const takerObserver = new Observable((subscriber) => {
  let me = null;
  let taker = null;
  function handleMutations(mutations) {
    for (const { addedNodes, removedNodes } of mutations) {
      for (const addedElement of addedNodes) {
        if (addedElement.nodeType !== 1) continue;
        if (addedElement.matches(selectors.MeUser.Me)) {
          me = addedElement.closest(selectors.MeUser.Me)?.className.match(durakRe.userID)[1];
        }
        if (addedElement.matches(selectors.Users.Taker)) {
          taker = addedElement
            .closest(selectors.Users.Taker)
            ?.parentNode?.className.match(durakRe.userID)[1];
        }
      }
      for (const removedElement of removedNodes) {
        if (removedElement.nodeType !== 1) continue;
        if (removedElement.matches(selectors.Users.removedTaker)) {
          if (me && taker && me !== taker) {
            subscriber.next(taker);
            taker = null;
          }
        }
      }
    }
  }
  const observer = new MutationObserver(handleMutations);

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
});
