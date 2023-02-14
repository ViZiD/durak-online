import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  session: {
    totalUsers: 0,
    gameType: 0,
    deckLength: 0,
    deckTrump: {
      Type: 0,
      Value: 0,
      Id: '',
    },
    gameId: 0,
    lowTrump: {
      user: {
        id: 0,
        position: null,
      },
      lowTrump: { Type: 0, Value: 0, Id: '0-0' },
    },
  },
  me: {
    is_adm: 0,
    id: 0,
    in_game: 0,
    games_today: 0,
    win_today: 0,
    gameId: 0,
  },
  deckRemains: 0,
  discardCount: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    setGameSession: (state, action) => {
      state.session = action.payload;
    },
    setMe: (state, action) => {
      state.me = action.payload;
    },
    setDeckRemains: (state, action) => {
      state.deckRemains = action.payload;
    },
    setDiscardCount: (state, action) => {
      state.discardCount += action.payload;
    },
    setMyGameId: (state, action) => {
      state.me.gameId = action.payload;
    },

    resetGame: (state) => {
      state.session = initialState.session;
      state.deckRemains = initialState.deckRemains;
      state.discardCount = initialState.discardCount;
    },
  },
});

export const { setMe, setGameSession, setDeckRemains, setDiscardCount, setMyGameId, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
