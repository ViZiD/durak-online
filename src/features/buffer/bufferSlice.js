import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const compareByValue = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const bufferAdapter = createEntityAdapter({
  selectId: (card) => card.id,
  sortComparer: (a, b) => compareByValue(a.value, b.value),
});

export const bufferSlice = createSlice({
  name: 'buffer',
  initialState: bufferAdapter.getInitialState(),
  reducers: {
    bufferReceived(state, action) {
      bufferAdapter.setAll(state, action.payload);
    },
    bufferAddOne: bufferAdapter.addOne,
    buffferAddMany: bufferAdapter.addMany,
    resetBuffer: () => {
      return { ids: [], entities: {} };
    },
  },
});

export const bufferSelectors = bufferAdapter.getSelectors((state) => state.buffer);
export const { bufferReceived, bufferAddOne, buffferAddMany, resetBuffer } = bufferSlice.actions;

export default bufferSlice.reducer;
