import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const compareByValue = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const deckAdapter = createEntityAdapter({
  selectId: (card) => card.id,
  sortComparer: (a, b) => compareByValue(a.value, b.value),
});

export const deckSlice = createSlice({
  name: 'deck',
  initialState: deckAdapter.getInitialState(),
  reducers: {
    deckReceived(state, action) {
      deckAdapter.setAll(state, action.payload);
    },
    deckUpdateOne: deckAdapter.updateOne,
    deckUpdateMany: deckAdapter.updateMany,
    resetDeck: () => deckAdapter.getInitialState(),
  },
});

export const deckSelectors = deckAdapter.getSelectors((state) => state.deck);
export const { deckReceived, deckUpdateOne, deckUpdateMany, resetDeck } = deckSlice.actions;

export default deckSlice.reducer;
