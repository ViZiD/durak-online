import ready from '@ryanmorr/ready';
import { persistor, store } from '../../store';

import { decks, durakRe, selectors } from './constants';
import {
  setTableType,
  setDeckCount,
  toggleGameStatus,
  resetGame,
} from '../../features/game/gameSlice';
import { checkParent } from './utils';
import {
  resetDeck,
  deckReceived,
  deckUpdateOne,
  deckUpdateMany,
  deckSelectors,
} from '../../features/deck/deckSlice';
import {
  onTableDiscard,
  onlyDiscard,
  filterByDiamonds,
  filterByHearts,
  filterByClubs,
  filterBySpades,
} from '../../features/deck/selectors';

export default async function () {
  ready(selectors.Game.Screen, function () {
    if (!store.getState()?.game?.gameStart) {
      store.dispatch(toggleGameStatus());
    }
  });

  // get game type
  ready(selectors.Game.Type.Durak, function (durak) {
    if (checkParent(durak, selectors.Game.Options)) {
      store.dispatch(setTableType(1));
    }
  });
  ready(selectors.Game.Type.Bura, function (bura) {
    if (checkParent(bura, selectors.Game.Options)) {
      store.dispatch(setTableType(2));
      store.dispatch(setDeckCount('36'));
      store.dispatch(deckReceived(decks['36']));
    }
  });
  ready(selectors.Game.Type.Ochko, function (ochko) {
    if (checkParent(ochko, selectors.Game.Options)) {
      store.dispatch(setTableType(3));
      store.dispatch(setDeckCount('52'));
      store.dispatch(deckReceived(decks['52']));
    }
  });

  // get deck count
  ready(selectors.Game.DeckCount, function (deck) {
    if (checkParent(deck, selectors.Game.Options)) {
      if (deck?.innerHTML) {
        store.dispatch(setDeckCount(deck.innerHTML));
        store.dispatch(deckReceived(decks[deck.innerHTML]));
      }
    }
  });
  // handle end game
  ready(selectors.Game.EndGame, function (end) {
    if (end) {
      store.dispatch(resetDeck());
      store.dispatch(resetGame());
    }
  });

  // handle cards on table
  ready(selectors.Table.Card, function (card) {
    const cardID = card?.src.match(durakRe.card)[0];
    store.dispatch(
      deckUpdateOne({
        id: cardID,
        changes: { ontable: true, onhands: false, trump: false, hostile: false, whose: '' },
      }),
    );
  });
  // handle cards in hands
  ready(selectors.MeUser.Card, function (card) {
    const cardID = card?.src.match(durakRe.card)[0];
    store.dispatch(
      deckUpdateOne({
        id: cardID,
        changes: { ontable: false, onhands: true, trump: false, hostile: false, whose: '' },
      }),
    );
  });

  // handle trump card
  ready(selectors.Table.TrumpCard, function (card) {
    const cardID = card?.src.match(durakRe.card)[0];
    store.dispatch(deckUpdateOne({ id: cardID, changes: { trump: true } }));
  });

  //handle discard/gardage
  ready(selectors.GardageList, function () {
    store.dispatch(deckUpdateMany(onTableDiscard(store.getState())));

    console.log(filterByDiamonds(store.getState()));
    console.log(filterByHearts(store.getState()));
    console.log(filterByClubs(store.getState()));
    console.log(filterBySpades(store.getState()));
  });

  store.subscribe(() => {
    // console.log(store.getState().deck?.['entities']);
  });
}
