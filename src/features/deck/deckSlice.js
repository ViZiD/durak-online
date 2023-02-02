import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

import { decks } from '../../content/scripts/constants';

export const setDeck = createAsyncThunk('deck/setDeck', async (deck) => {
  return decks[deck];
});

export const updateCardOnTable = createAsyncThunk('deck/updateCardOnTable', async (card) => {
  const { id, url } = card;
  return {
    id: id,
    changes: { ontable: true, onhands: false, trump: false, hostile: false, whose: '', url: url },
  };
});

export const updateCardInHands = createAsyncThunk('deck/updateCardInHands', async (cardId) => {
  return {
    id: cardId,
    changes: { ontable: false, onhands: true, trump: false, hostile: false, whose: '' },
  };
});

export const setTaker = createAsyncThunk('deck/setTaker', async (data) => {
  const { cards, takerId } = data;
  return cards.map((card) => {
    return { id: card.id, changes: { ontable: false, hostile: true, whose: takerId } };
  });
});

export const setDiscard = createAsyncThunk('deck/setDiscard', async (cards) => {
  return cards.map((card) => {
    return { id: card.id, changes: { ontable: false, discard: true } };
  });
});

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
  initialState: deckAdapter.getInitialState({
    trumpId: '',
    trump: { value: 0, suit: '' },
  }),
  reducers: {
    deckSetTrumpId(state, action) {
      state.trumpId = action.payload;
    },
    deckSetTrump(state, action) {
      state.trump = action.payload;
    },
    deckUpdateOne: deckAdapter.updateOne,
    deckUpdateMany: deckAdapter.updateMany,
    resetDeck: () => deckAdapter.getInitialState(),
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCardOnTable.fulfilled, (state, action) => {
        deckAdapter.updateOne(state, action.payload);
      })
      .addCase(updateCardInHands.fulfilled, (state, action) => {
        deckAdapter.updateOne(state, action.payload);
      })
      .addCase(setDeck.fulfilled, (state, action) => {
        deckAdapter.setAll(state, action.payload);
      })
      .addCase(setDiscard.fulfilled, (state, action) => {
        deckAdapter.updateMany(state, action.payload);
      })
      .addCase(setTaker.fulfilled, (state, action) => {
        deckAdapter.updateMany(state, action.payload);
      });
  },
});

export const deckSelectors = deckAdapter.getSelectors((state) => state.deck);
export const { deckUpdateOne, deckUpdateMany, resetDeck, deckSetTrump, deckSetTrumpId, kj } =
  deckSlice.actions;

export default deckSlice.reducer;
