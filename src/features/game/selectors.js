import { createDraftSafeSelector } from '@reduxjs/toolkit';

const gameState = (state) => state.game;

export const selectGameSession = createDraftSafeSelector(gameState, (game) => game.session);
export const selectGameId = createDraftSafeSelector(selectGameSession, (session) => session.gameId);
export const selectGameType = createDraftSafeSelector(
  selectGameSession,
  (session) => session.gameType,
);
export const selectDeckLength = createDraftSafeSelector(
  selectGameSession,
  (session) => session.deckLength,
);
export const selectDeckTrump = createDraftSafeSelector(
  selectGameSession,
  (session) => session.deckTrump,
);

export const selectLowTrump = createDraftSafeSelector(
  selectGameSession,
  (session) => session.lowTrump,
);

export const selectDeckTrumpSuit = createDraftSafeSelector(selectDeckTrump, (card) => card.Type);

export const selectDeckTrumpId = createDraftSafeSelector(selectDeckTrump, (trump) => trump.Id);

export const selectGameMe = createDraftSafeSelector(gameState, (game) => game.me);
export const selectMySlotId = createDraftSafeSelector(selectGameMe, (me) => me.gameId);

export const selectDeckRemains = createDraftSafeSelector(gameState, (game) => game.deckRemains);
export const selectDiscardCount = createDraftSafeSelector(gameState, (game) => game.discardCount);
