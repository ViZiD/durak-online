import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { durakSuit } from '../../content/scripts/constants';
import { sortByOrder } from '../../content/scripts/utils';

import { deckSelectors } from './deckSlice';

export const deckSelectAll = deckSelectors.selectAll;
export const deckSelectById = deckSelectors.selectById;
//
// export const onTable = createDraftSafeSelector(deckSelectAll, (cards) =>
//   cards.filter((card) => card.ontable),
// );
//
// export const onTableDiscard = createDraftSafeSelector(onTable, (cards) =>
//   cards.map((card) => {
//     return { id: card.id, changes: { ...card, ontable: false, discard: true } };
//   }),
// );

// export const onlyDiscard = createDraftSafeSelector(deckSelectAll, (cards) =>
//   cards.filter((card) => card.discard),
// );

const getCardSuit = (_, suit) => suit;

export const filterBySuit = createDraftSafeSelector(deckSelectAll, getCardSuit, (cards, suit) =>
  cards.filter((card) => card.type === durakSuit[suit]).sort(sortByOrder),
);

export const getRemainsCardsInDeck = createDraftSafeSelector(deckSelectAll, (cards) =>
  cards.filter((card) => card.indeck),
);

const getOwnerId = (_, ownerId) => ownerId;

export const getCardsByOwnerId = createDraftSafeSelector(
  deckSelectAll,
  getOwnerId,
  (cards, ownerId) => cards.filter((card) => card?.owner.userId === ownerId),
);
