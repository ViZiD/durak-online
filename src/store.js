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

const persistStorageConfig = {
  key: 'localStorage',
  storage: localStorage,
  stateReconciler: hardSet,
  blacklist: ['deck', 'game'],
};

const rootReducers = combineReducers({
  deck: deckReducer,
  game: gameReducer,
});

const persistedReducer = persistReducer(persistStorageConfig, rootReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export { store, persistor };
