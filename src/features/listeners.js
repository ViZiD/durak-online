import { createListenerMiddleware, createAction, isFulfilled } from '@reduxjs/toolkit';

import { setDeckCount, setGameType, setGameStatus, resetGame } from './game/gameSlice';

import { durakGameType, durakDecks, selectors } from '../content/scripts/constants';

import elementReady from 'element-ready';
import { deckSetTrump, deckUpdateOne, setDeck } from './deck/deckSlice';
import { deckSelectById } from './deck/selectors';

export const listenerMiddleware = createListenerMiddleware();

export const gameStatusListenerStarted = createAction('gameStatusListener/started');
export const gameStatusListenerStopped = createAction('gameStatusListener/stopped');

// set trump card
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    const fulfilledDeck = isFulfilled(setDeck);
    return (
      fulfilledDeck(action) &&
      currentState?.deck?.entities &&
      currentState?.deck?.trumpId &&
      currentState.game?.gameStatus
    );
  },
  effect: async (action, listenerApi) => {
    const trumpId = listenerApi.getState()?.deck?.trumpId;
    listenerApi.dispatch(deckUpdateOne({ id: trumpId, changes: { trump: true } }));
    const trumpCard = deckSelectById(listenerApi.getState(), trumpId);
    listenerApi.dispatch(deckSetTrump({ value: trumpCard.value, suit: trumpCard.suit }));
  },
});

// game status listener
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      gameStatusListenerStarted.match(action) &&
      !previousState.game?.gameStatus &&
      !currentState.game?.gameStatus
    );
  },
  effect: async (action, listenerApi) => {
    const listenGameStatus = listenerApi.fork(async (forkApi) => {
      while (true) {
        const gameStart = await elementReady(selectors.Game.StartGame, {
          waitForChildren: false,
          stopOnDomReady: false,
        });
        if (gameStart) {
          listenerApi.dispatch(setGameStatus(true));
          const gameEnd = await elementReady(selectors.Game.EndGame, {
            waitForChildren: false,
            stopOnDomReady: false,
          });
          if (gameEnd) listenerApi.dispatch(resetGame());
        }
      }
    });
    await listenerApi.condition(gameStatusListenerStopped.match);
    listenGameStatus.cancel();
  },
});

// set deck
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return setDeckCount.match(action) && currentState.game?.deckCount;
  },
  effect: async (action, { getState, dispatch }) => {
    const deckCount = getState()?.game?.deckCount;
    dispatch(setDeck(deckCount));
  },
});

// set deck type by game type
listenerMiddleware.startListening({
  actionCreator: setGameType,
  effect: async (action, listenerApi) => {
    const gameType = action.payload;
    switch (gameType) {
      case durakGameType.bura:
        listenerApi.dispatch(setDeckCount(durakDecks.deck36));
        break;
      case durakGameType.ochko:
        listenerApi.dispatch(setDeckCount(durakDecks.deck52));
        break;
    }
  },
});

// get game type
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      setGameStatus.match(action) &&
      currentState.game?.gameStatus &&
      !previousState.game?.gameStatus
    );
  },
  effect: async (action, listenerApi) => {
    const durak = listenerApi.fork(async (forkApi) => {
      const data = await elementReady(selectors.Game.Type.Durak, {
        stopOnDomReady: false,
        waitForChildren: false,
      });
      if (data) return durakGameType.durak;
    });
    const bura = listenerApi.fork(async (forkApi) => {
      const data = await elementReady(selectors.Game.Type.Bura, {
        stopOnDomReady: false,
        waitForChildren: false,
      });
      if (data) return durakGameType.bura;
    });
    const ochko = listenerApi.fork(async (forkApi) => {
      const data = await elementReady(selectors.Game.Type.Ochko, {
        stopOnDomReady: false,
        waitForChildren: false,
      });
      if (data) return durakGameType.ochko;
    });

    const result = await Promise.any([durak.result, bura.result, ochko.result]);
    if (result.status === 'ok') {
      listenerApi.dispatch(setGameType(result.value));
    }
  },
});

// get deck count
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      setGameStatus.match(action) &&
      currentState.game?.gameStatus &&
      !previousState.game?.gameStatus
    );
  },
  effect: async (action, listenerApi) => {
    const deckCount = await listenerApi.fork(async (forkApi) => {
      const data = await elementReady(selectors.Game.DeckCount, {
        stopOnDomReady: false,
        waitForChildren: false,
      });
      if (data) return parseInt(data?.innerHTML);
    })?.result;

    if (deckCount.status === 'ok') {
      listenerApi.dispatch(setDeckCount(deckCount.value));
    }
  },
});
