import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { sortByOrder } from '../../content/scripts/utils';

import { deckSelectors } from './deckSlice';

export const deckSelectAll = deckSelectors.selectAll;
export const deckSelectById = deckSelectors.selectById;

export const onTable = createDraftSafeSelector(deckSelectAll, (cards) =>
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
  cards.filter((card) => card.suit === 'hearts').sort(sortByOrder),
);

export const filterByDiamonds = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.suit === 'diamonds').sort(sortByOrder),
);

export const filterByClubs = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.suit === 'clubs').sort(sortByOrder),
);

export const filterBySpades = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.suit === 'spades').sort(sortByOrder),
);
