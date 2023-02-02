import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameStatus: false,
  gameType: 0,
  deckCount: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setGameStatus: (state, action) => {
      state.gameStatus = action.payload;
    },
    setGameType: (state, action) => {
      state.gameType = action.payload;
    },
    setDeckCount: (state, action) => {
      state.deckCount = action.payload;
    },
    resetGame: () => initialState,
  },
});

export const { setGameStatus, setGameType, setDeckCount, resetGame } = gameSlice.actions;

export default gameSlice.reducer;
