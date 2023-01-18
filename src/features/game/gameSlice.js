import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setTableType: (state, action) => {
      state.tableType = action.payload;
    },
    setDeckCount: (state, action) => {
      state.deckCount = action.payload;
    },
    toggleGameStatus: (state) => {
      state.gameStart = !state.gameStart;
    },
    resetGame: () => initialState,
  },
});

export const { setTableType, setDeckCount, toggleGameStatus, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
