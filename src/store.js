import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { localStorage } from 'redux-persist-webextension-storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import deckReducer from './features/deck/deckSlice';
import gameReducer from './features/game/gameSlice';
import usersReducer from './features/users/usersSlice';
import settingReducer from './features/setting/settingSlice';

import { listenerMiddleware } from './features/listeners';
import { createLogger } from 'redux-logger';

const logger = createLogger({
  predicate: (getState, action) =>
    action.type === 'deck/regaveRun/fulfilled' ||
    action.type === 'deck/regaveRun/pending' ||
    action.type === 'deck/regaveRun/rejected' ||
    // action.type === 'setting/disableExtension' ||
    // action.type === 'setting/enableExtension' ||
    // action.type === 'deck/applyRemainsCardsToUser/fulfilled' ||
    // action.type === 'users/updateUsersRemainCards/fulfilled' ||
    action.type === 'deck/updateCardInHands/fulfilled' ||
    action.type === 'users/updateUsersBuraPoints/fulfilled' ||
    action.type === 'users/removeUser' ||
    action.type === 'game/setDeckRemains',

  collapsed: (getState, action) =>
    action.type === 'deck/regaveRun/fulfilled' ||
    action.type === 'deck/regaveRun/pending' ||
    action.type === 'deck/regaveRun/rejected' ||
    // action.type === 'setting/disableExtension' ||
    // action.type === 'setting/enableExtension' ||
    // action.type === 'setting/enableExtension' ||
    // action.type === 'deck/applyRemainsCardsToUser/fulfilled' ||
    // action.type === 'users/updateUsersRemainCards/fulfilled' ||
    action.type === 'deck/updateCardInHands/fulfilled' ||
    action.type === 'users/updateUsersBuraPoints/fulfilled' ||
    action.type === 'users/removeUser' ||
    action.type === 'game/setDeckRemains',

  diff: true,

  duration: true,
  timestamp: true,

  colors: {
    title: () => '#0f1842',
    prevState: () => '#de6f0d',
    action: () => '#6e13ab',
    nextState: () => '#1a9134',
  },
});

const persistStorageConfig = {
  key: 'localStorage',
  storage: localStorage,
  stateReconciler: hardSet,
};

const rootReducers = combineReducers({
  deck: deckReducer,
  game: gameReducer,
  users: usersReducer,
  setting: settingReducer,
});

const persistedReducer = persistReducer(persistStorageConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      // .concat(logger)

      .prepend(listenerMiddleware.middleware),
});

let persistor = persistStore(store);

export { store, persistor };
