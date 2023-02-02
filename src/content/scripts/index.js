import ready from '@ryanmorr/ready';
import { store } from '../../store';

import { selectors } from './constants';
import { resetGame } from '../../features/game/gameSlice';
import deckSlice, {
  resetDeck,
  updateCardOnTable,
  updateCardInHands,
  setTaker,
  setDiscard,
  deckUpdateOne,
  deckSetTrumpId,
} from '../../features/deck/deckSlice';
import { addCardToBuffer, resetBuffer } from '../../features/buffer/bufferSlice';
import { onTable } from '../../features/deck/selectors';
import { gameStatusListenerStarted } from '../../features/listeners';

import {
  cardsHands,
  cardsTableAdded,
  cardsTableRemoved,
  discardHandler,
  handleTrumpAdded,
  handleTrumpRemoved,
  takerHandler,
} from './handlers';
import { cardsBuffer } from '../../features/buffer/selectors';

export default async function () {
  store.dispatch(gameStatusListenerStarted());

  // handle cards on table
  cardsTableAdded.subscribe((card) => {
    store.dispatch(updateCardOnTable(card));
  });

  cardsTableRemoved.subscribe((card) => {
    store.dispatch(addCardToBuffer(card));
  });

  // handle cards in hands
  cardsHands.subscribe((cardId) => {
    store.dispatch(updateCardInHands(cardId));
  });

  //handle trump card
  handleTrumpAdded.subscribe((cardId) => {
    store.dispatch(deckSetTrumpId(cardId));
  });

  discardHandler.subscribe(() => {
    store.dispatch(setDiscard(cardsBuffer(store.getState())));
    store.dispatch(resetBuffer());
  });

  takerHandler.subscribe((takerId) => {
    store.dispatch(setTaker({ cards: cardsBuffer(store.getState()), takerId: takerId }));
    store.dispatch(resetBuffer());
  });

  // reset game after logout, and exit game
  ready(selectors.Game.LoginScreen, () => {
    store.dispatch(resetGame());
    store.dispatch(resetDeck());
    store.dispatch(resetBuffer());
  });

  ready(selectors.Game.MainScreen, () => {
    store.dispatch(resetGame());
    store.dispatch(resetDeck());
    store.dispatch(resetBuffer());
  });
  ready(selectors.ExitButton, (button) => {
    button.addEventListener('click', () => {
      store.dispatch(resetGame());
      store.dispatch(resetDeck());
      store.dispatch(resetBuffer());
    });
  });

  //   // ready('.Toastify__toast-container', (toast) => {
  //   //   toast.parentElement.removeChild(toast);
  //   // });
  // store.subscribe(() => {
  //   console.log(store.getState());
  // });
}
