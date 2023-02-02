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
import bufferReducer from './features/buffer/bufferSlice';

import { listenerMiddleware } from './features/listeners';
import { createLogger } from 'redux-logger';

// const logger = createLogger({
//   level: 'info',
// });

const persistStorageConfig = {
  key: 'localStorage',
  storage: localStorage,
  stateReconciler: hardSet,
};

const rootReducers = combineReducers({
  deck: deckReducer,
  game: gameReducer,
  buffer: bufferReducer,
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
