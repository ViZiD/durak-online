import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { deckSelectors } from './deckSlice';

const deckSelectAll = deckSelectors.selectAll;

const onTable = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.ontable),
);

export const onTableDiscard = createDraftSafeSelector(onTable, (cards) =>
  cards.map((card) => {
    return { id: card.id, changes: { ...card, ontable: false, discard: true } };
  }),
);

export const onlyDiscard = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.discard),
);

// filter by suit
export const filterByHearts = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.suit === 'hearts'),
);

export const filterByDiamonds = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.suit === 'diamonds'),
);

export const filterByClubs = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.suit === 'clubs'),
);

export const filterBySpades = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.suit === 'spades'),
);
