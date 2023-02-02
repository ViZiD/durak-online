import { createDraftSafeSelector } from '@reduxjs/toolkit';

const bufferState = (state) => state.buffer;

export const cardsBuffer = createDraftSafeSelector(bufferState, (buffer) => {
  return buffer.cards;
});
