import browser from 'webextension-polyfill';
import { createListenerMiddleware, isFulfilled } from '@reduxjs/toolkit';

import { applyRemainsCardsToUser, deckUpdateOne, setDeckLength } from './deck/deckSlice';
import { setDeckRemains, setGameSession } from './game/gameSlice';

import { setUsers, updateUsersRemainCards, usersUpdateMany } from './users/usersSlice';

import { disableExtension, enableExtension, extensionStatusToggle } from './setting/settingSlice';

import {
  selectDeckLength,
  selectDeckTrumpId,
  selectGameMe,
  selectGameType,
  selectLowTrump,
} from './game/selectors';
import { deckSelectById, getRemainsCardsInDeck } from './deck/selectors';

import {
  selectEnemyUsers,
  selectNotOutUsers,
  selectUserMe,
  usersSelectAll,
} from './users/selectors';

import { durakGameType, extension, selectors, durakDeckLength } from '../content/scripts/constants';

import {
  removeInjectedCSS,
  injectCSS,
  getElementData,
  getUserElementByPosition,
} from '../content/scripts/utils';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      setGameSession.match(action) &&
      currentState.game?.session?.deckLength !== durakDeckLength.deck52 &&
      currentState.game?.session?.gameType !== durakGameType.ochko
    );
  },
  effect: async (action, listenerApi) => {
    const deckLength = selectDeckLength(listenerApi.getState());
    listenerApi.dispatch(setDeckLength(deckLength));
  },
});

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      setGameSession.match(action) && currentState?.game?.session?.gameType !== durakGameType.ochko
    );
  },
  effect: async (action, listenerApi) => {
    const trumpId = selectDeckTrumpId(listenerApi.getState());
    const trumpCard = deckSelectById(listenerApi.getState(), trumpId);
    if (!trumpCard.trump) {
      listenerApi.dispatch(deckUpdateOne({ id: trumpId, changes: { trump: true } }));
    }
  },
});

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return (
      setGameSession.match(action) && currentState?.game?.session?.gameType !== durakGameType.ochko
    );
  },
  effect: async (action, listenerApi) => {
    const me = selectGameMe(listenerApi.getState());
    const { user, lowTrump } = selectLowTrump(listenerApi.getState());

    if (me.id !== user.id) {
      listenerApi.dispatch(
        deckUpdateOne({
          id: lowTrump.Id,
          changes: {
            trump: false,
            indeck: false,
            ontable: false,
            hostile: true,
            owner: { userId: user.id, position: user.position },
          },
        }),
      );
    }
  },
});

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return setDeckRemains.match(action) && currentState?.game?.deckRemains == 0;
  },
  effect: async (action, listenerApi) => {
    const trumpId = selectDeckTrumpId(listenerApi.getState());
    const trumpCard = deckSelectById(listenerApi.getState(), trumpId);
    if (trumpCard.trump) {
      listenerApi.dispatch(deckUpdateOne({ id: trumpId, changes: { trump: false } }));
    }
  },
});

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    const users = selectNotOutUsers(currentState);
    const usersCondition = users.length == 2 && users.filter((user) => !user.me).length == 1;
    const remainCardsFulfilled = isFulfilled(updateUsersRemainCards);
    const remainCards = getRemainsCardsInDeck(currentState);
    return (
      remainCardsFulfilled(action) &&
      usersCondition &&
      currentState?.game?.deckRemains == 0 &&
      remainCards.length !== 0
    );
  },
  effect: async (action, listenerApi) => {
    const remainCards = getRemainsCardsInDeck(listenerApi.getState());
    const user = selectNotOutUsers(listenerApi.getState()).find((user) => !user.me);
    listenerApi.dispatch(applyRemainsCardsToUser({ user: user, cards: remainCards }));
  },
});

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    const setUsersFulfilled = isFulfilled(setUsers);
    return setUsersFulfilled(action);
  },
  effect: async (action, listenerApi) => {
    const users = usersSelectAll(listenerApi.getState());
    const update = users.map((user) => {
      const { id, position } = user;

      const userElement = getUserElementByPosition(position);
      const userElementData = getElementData(userElement);

      return { id: id, changes: { userElement: userElementData } };
    });
    listenerApi.dispatch(usersUpdateMany(update));
  },
});

listenerMiddleware.startListening({
  actionCreator: extensionStatusToggle,
  effect: async (_, listenerApi) => {
    const status = listenerApi.getState()?.setting?.extensionStatus;
    status ? listenerApi.dispatch(disableExtension()) : listenerApi.dispatch(enableExtension());
  },
});

listenerMiddleware.startListening({
  actionCreator: disableExtension,
  effect: async () => {
    removeInjectedCSS();
  },
});

listenerMiddleware.startListening({
  actionCreator: enableExtension,
  effect: async () => {
    injectCSS(browser.runtime.getURL(extension.CssFilePath));
  },
});

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return action.type === 'persist/REHYDRATE' && currentState?.setting?.extensionStatus;
  },

  effect: async () => {
    injectCSS(browser.runtime.getURL(extension.CssFilePath));
  },
});

listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    return action.type === 'persist/REHYDRATE' && !currentState?.setting?.extensionStatus;
  },

  effect: async () => {
    removeInjectedCSS();
  },
});
