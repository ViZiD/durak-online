import { $deck, getLeftOverCards, resetDeck, updateCard } from '../stores/deck'
import { $party, getUserIdByPosition, isEnemyId } from '../stores/party'
import { $settings } from '../stores/settings'
import { HELPER_FLAGS, selectors } from './constants'

export const inGameHandler = ({ flag, state }) => {
  if (!flag) {
    resetDeck()
  } else {
    document.querySelector(selectors.TableTypeButton).addEventListener(
      'click',
      e => {
        $settings.setKey(
          'helper',
          $settings.get().helper === HELPER_FLAGS.show
            ? HELPER_FLAGS.hide
            : HELPER_FLAGS.show
        )
        e.stopPropagation()
      },
      true
    )
  }
}
export const durakCardsHandler = ({ cards, state }) => {
  if (cards.length !== 0) {
    cards.forEach(card => {
      updateCard({
        ...card,
        OnHands: false,
        OnTable: true,
        Discard: false,
        Owner: null,
        Trump: false,
        InDeck: false
      })
    })
  }
}

export const myCardsHandler = ({ cards, state }) => {
  if (cards.length !== 0) {
    cards.forEach(card => {
      updateCard({
        ...card,
        OnHands: true,
        OnTable: false,
        Discard: false,
        Owner: null,
        Trump: false,
        InDeck: false
      })
    })
  }
}

export const friendCardsHandler = ({ cards, state }) => {
  cards.forEach(card => {
    updateCard({
      ...card,
      OnTable: false,
      OnHands: false,
      Trump: false,
      InDeck: false
    }) //hmm...
  })
}

export const gardageHandler = ({ gardage, cards, state }) => {
  if (gardage) {
    cards.forEach(card => {
      updateCard({
        ...card,
        Discard: true,
        OnHands: false,
        OnTable: false,
        Owner: null,
        Trump: false,
        InDeck: false
      })
    })
  }
}
export const pickUpHandler = ({ userPos, cards, state }) => {
  const userId = getUserIdByPosition(userPos)

  if (userPos !== -1 && isEnemyId(userId)) {
    cards.forEach(card => {
      updateCard({
        ...card,
        Owner: userId,
        OnTable: false,
        OnHands: false,
        Trump: false,
        InDeck: false
      }) //hmm...
    })
  }
}

export const deckTrumpHandler = ({ trump, state }) => {
  if (trump.Type !== -1 && state.LowTrump !== 255) {
    if (!state.iAmWinner) {
      updateCard({ ...trump, Trump: true })
    }

    updateCard({
      Value: state.LowTrump,
      Type: trump.Type,
      Owner: state.MoveUser,
      InDeck: false
    })
  }
}

export const userCardsCounterHandler = ({ counters, state }) => {
  const me = $party.get().Me
  const enemysCardsCounters = counters.filter(
    counter => counter?.UserId != me?.Id
  )
  const notNullCounters = enemysCardsCounters.filter(counter => counter?.Count)

  if (notNullCounters.length === 1 && state.deckState.DeckCurrent === 0) {
    const leftOverCards = getLeftOverCards()
    leftOverCards.forEach(card =>
      updateCard({ ...card, InDeck: false, Owner: notNullCounters[0].UserId })
    )
  }
}

export const deckCurrentHandler = ({ value, state }) => {
  //clear trump
  if (value === 0) {
    const trumpCard = $deck.get().filter(card => card.Trump)[0]
    updateCard({ ...trumpCard, Trump: false })
  }
}
