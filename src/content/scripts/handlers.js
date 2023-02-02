import { filter, delay } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { selectors, durakRe } from './constants';

import { addedNodeObserver, removedNodeObserver, takerObserver } from './observers';

export const cardsTableAdded = addedNodeObserver.pipe(
  filter((element) => element.querySelector(selectors.Table.Card) !== null),
  map((element) => element.querySelector(selectors.Table.Card)?.src),
  map((src) => {
    const id = src?.match(durakRe.card)?.[0];
    return { id, url: src };
  }),
  // tap((x) => console.log('added', x)),
);

export const cardsTableRemoved = removedNodeObserver.pipe(
  filter((element) => element.querySelector(selectors.Table.Card) !== null),
  map((element) => element.querySelector(selectors.Table.Card)?.src),
  map((src) => {
    const id = src?.match(durakRe.card)?.[0];
    return { id, url: src };
  }),
  // tap((x) => console.log('removed', x)),
);

export const cardsHands = addedNodeObserver.pipe(
  filter((element) => element.querySelector(selectors.MeUser.Card) !== null),
  map((element) => element.querySelector('img[src]')?.src),
  map((src) => src?.match(durakRe.card)?.[0]),
);

export const discardHandler = addedNodeObserver.pipe(
  filter((element) => element.matches(selectors.GardageList)),
);

export const handleTrumpAdded = addedNodeObserver.pipe(
  filter((element) => element.querySelector(selectors.Table.TrumpCard) !== null),
  map((element) => element.querySelector('img[src]')?.src),
  map((src) => src?.match(durakRe.card)?.[0]),
);

export const handleTrumpRemoved = removedNodeObserver.pipe(
  filter((element) => element.querySelector(selectors.Table.TrumpCard) !== null),
  map((element) => element.querySelector('img[src]')?.src),
  map((src) => src?.match(durakRe.card)?.[0]),
);

export const takerHandler = takerObserver.pipe(delay(2500));
