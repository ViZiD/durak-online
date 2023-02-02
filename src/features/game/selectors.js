import { createDraftSafeSelector } from '@reduxjs/toolkit';

const gameSetting = (state) => state.game;

export const selectGameStatus = createDraftSafeSelector(gameSetting, (game) => {
  return game.gameStatus;
});
export const selectGameType = createDraftSafeSelector(gameSetting, (game) => {
  return game.gameType;
});
export const selectDeckCount = createDraftSafeSelector(gameSetting, (game) => {
  return game.deckCount;
});
