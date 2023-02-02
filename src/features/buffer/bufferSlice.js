import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cards: [],
};

export const bufferSlice = createSlice({
  name: 'buffer',
  initialState: initialState,
  reducers: {
    addCardToBuffer: (state, action) => {
      state.cards.push(action.payload);
    },

    resetBuffer: () => initialState,
  },
});

export const { addCardToBuffer, resetBuffer } = bufferSlice.actions;

export default bufferSlice.reducer;
