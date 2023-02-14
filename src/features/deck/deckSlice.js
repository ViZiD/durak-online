import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

import initialState from './initialState';
import { deckLengthIds, durakDeckLength } from '../../content/scripts/constants';

export const updateCardOnTable = createAsyncThunk('deck/updateCardOnTable', async (cards) => {
  return cards.map((card) => {
    return {
      id: card.Id,
      changes: {
        ontable: true,
        indeck: false,
        onhands: false,
        trump: false,
        hostile: false,
        owner: {},
      },
    };
  });
});

export const updateCardInHands = createAsyncThunk('deck/updateCardInHands', async (cards) => {
  return cards.map((card) => {
    return {
      id: card.Id,
      changes: {
        ontable: false,
        indeck: false,
        onhands: true,
        trump: false,
        hostile: false,
        owner: {},
      },
    };
  });
});

export const setHostile = createAsyncThunk(
  'deck/setHostile',
  async (data, { getState, rejectWithValue }) => {
    const { userId, position } = data;
    const { id } = getState()?.game?.me;
    const { ids, entities } = getState()?.deck;
    const cardsInTable = ids.map((id) => entities[id]).filter((card) => card.ontable);
    if (id !== userId) {
      return cardsInTable.map((card) => {
        return {
          id: card.id,
          changes: { trump: false, ontable: false, hostile: true, owner: { userId, position } },
        };
      });
    } else {
      return rejectWithValue('me!');
    }
  },
);

export const applyRemainsCardsToUser = createAsyncThunk(
  'deck/applyRemainsCardsToUser',
  async (data) => {
    const { user, cards } = data;

    return cards.map((card) => {
      return {
        id: card.id,
        changes: {
          trump: false,
          indeck: false,
          ontable: false,
          hostile: true,
          owner: { userId: user.id, position: user.position },
        },
      };
    });
  },
);

export const setDiscard = createAsyncThunk('deck/setDiscard', async (_, { getState }) => {
  const { ids, entities } = getState()?.deck;

  const cardsInTable = ids.map((id) => entities[id]).filter((card) => card.ontable);

  return cardsInTable.map((card) => {
    return { id: card.id, changes: { trump: false, ontable: false, discard: true } };
  });
});

export const deckRegaveRun = createAsyncThunk('deck/regaveRun', async (_, { getState }) => {
  const { ids, entities } = getState()?.deck;

  const cardsOnHands = ids.map((id) => entities[id]).filter((card) => card.onhands);

  return cardsOnHands.map((card) => {
    return {
      id: card.id,
      changes: { onhands: false },
    };
  });
});

export const setDeckLength = createAsyncThunk(
  'deck/setDeckLength',
  async (deckLength, { rejectWithValue }) => {
    if (deckLength !== durakDeckLength.deck52 || deckLength !== 0) {
      return deckLengthIds[deckLength];
    } else {
      rejectWithValue('deck length = 52 or 0!');
    }
  },
);


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
  initialState: initialState,
  reducers: {
    deckUpdateOne: deckAdapter.updateOne,
    deckUpdateMany: deckAdapter.updateMany,
    resetDeck: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCardOnTable.fulfilled, (state, action) => {
        deckAdapter.updateMany(state, action.payload);
      })
      .addCase(updateCardInHands.fulfilled, (state, action) => {
        deckAdapter.updateMany(state, action.payload);
      })
      .addCase(setDiscard.fulfilled, (state, action) => {
        deckAdapter.updateMany(state, action.payload);
      })
      .addCase(setHostile.fulfilled, (state, action) => {
        deckAdapter.updateMany(state, action.payload);
      })
      .addCase(deckRegaveRun.fulfilled, (state, action) => {
        deckAdapter.updateMany(state, action.payload);
      })
      .addCase(applyRemainsCardsToUser.fulfilled, (state, action) => {
        deckAdapter.updateMany(state, action.payload);
      })
      .addCase(setDeckLength.fulfilled, (state, action) => {
        deckAdapter.removeMany(state, action.payload);
      });
  },
});

export const deckSelectors = deckAdapter.getSelectors((state) => state.deck);
export const { deckUpdateOne, deckUpdateMany, resetDeck } = deckSlice.actions;

export default deckSlice.reducer;
