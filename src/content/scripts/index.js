import { merge } from 'rxjs';
import ready from '@ryanmorr/ready';
import { store } from '../../store';
import {
  setTrump,
  showGameMove,
  showMeCard,
  pickUpCard,
  doGardage,
  gameEnd,
  setWinner,
  fixDeck,
  updateUserData,
  exitAsViewer,
  setGiveUper,
  showGameMoveBura2,
  usersRemainCards,
  ressurectGame,
  cantDeff,
  onlyGamesData,
  addMessage,
  regaveRun,
  hideReGave,
  availableReGave,
  newPointsBura,
  getNewCards,
  setOffDeff,
  invocationIdCounter,
  setRefund,
} from './pipes';

import {
  setMe,
  setGameSession,
  setDiscardCount,
  setDeckRemains,
  resetGame,
  setMyGameId,
} from '../../features/game/gameSlice';
import {
  resetUsers,
  setUsers,
  removeUser,
  updateUsersBuraPoints,
  updateUsersRemainCards,
} from '../../features/users/usersSlice';
import {
  deckRegaveRun,
  deckRegaveTrump,
  resetDeck,
  setDiscard,
  setHostile,
  updateCardInHands,
  updateCardOnTable,
} from '../../features/deck/deckSlice';
import { extensionStatusToggle } from '../../features/setting/settingSlice';
import { selectors } from './constants';
import { throttle } from './utils';

export default async function () {
  ready(selectors.TableTypeButton, (button) => {
    button.addEventListener('click', () => {
      const throttledButton = throttle(() => {
        store.dispatch(extensionStatusToggle());
      }, 2000);
      throttledButton();
    });
  });

  setTrump.subscribe((data) => {
    store.dispatch(setGameSession(data.session));
    store.dispatch(setUsers(data.users));
  });

  regaveRun.subscribe(() => {
    store.dispatch(deckRegaveRun());
    store.dispatch(deckRegaveTrump());
  });

  // availableReGave.subscribe((data) => {
  //   console.log('availableReGave!!!!', data);
  // });
  // hideReGave.subscribe((data) => {
  //   console.log('hideReGave!!!', data);
  // });

  updateUserData.subscribe((data) => store.dispatch(setMe(data)));

  usersRemainCards.subscribe((updates) => {
    store.dispatch(updateUsersRemainCards(updates));
  });
  //
  // //
  showGameMove.subscribe((cards) => {
    store.dispatch(updateCardOnTable(cards));
  });
  doGardage.subscribe((count) => {
    store.dispatch(setDiscard());
    store.dispatch(setDiscardCount(count));
  });
  showMeCard.subscribe((cards) => {
    store.dispatch(updateCardInHands(cards));
  });
  showGameMoveBura2.subscribe((cards) => {
    store.dispatch(updateCardOnTable(cards));
  });

  fixDeck.subscribe((value) => {
    store.dispatch(setDeckRemains(value));
  });
  //
  merge(gameEnd, exitAsViewer, setGiveUper).subscribe(() => {
    store.dispatch(resetGame());
    store.dispatch(resetDeck());
    store.dispatch(resetUsers());
  });
  pickUpCard.subscribe((data) => {
    store.dispatch(setHostile(data));
  });
  ressurectGame.subscribe((data) => {
    store.dispatch(setGameSession(data.session));
    store.dispatch(setUsers(data.users));
    store.dispatch(setMyGameId(data.session.gameId));
  });

  setWinner.subscribe((userId) => store.dispatch(removeUser(userId)));

  newPointsBura.subscribe((data) => store.dispatch(updateUsersBuraPoints(data)));
  // cantDeff.subscribe(console.log);
  // setOffDeff.subscribe(console.log);
  // getNewCards.subscribe(console.log);
  // onlyGamesData.subscribe(console.log);
  // addMessage.subscribe(console.log);
}
