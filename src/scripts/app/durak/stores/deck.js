import { action, atom, computed } from 'nanostores'
import {
  DECK_LENGTH_IDS,
  DURAK_DECKLENGTH,
  DURAK_SUIT
} from '../utils/constants'
import { $party } from './party'

export const initialDeckState = [
  {
    Value: 2,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '2',
    InDeck: true
  },
  {
    Value: 2,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '2',
    InDeck: true
  },
  {
    Value: 2,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '2',
    InDeck: true
  },
  {
    Value: 2,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '2',
    InDeck: true
  },

  {
    Value: 3,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '3',
    InDeck: true
  },
  {
    Value: 3,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '3',
    InDeck: true
  },
  {
    Value: 3,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '3',
    InDeck: true
  },
  {
    Value: 3,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '3',
    InDeck: true
  },

  {
    Value: 4,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '4',
    InDeck: true
  },
  {
    Value: 4,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '4',
    InDeck: true
  },
  {
    Value: 4,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '4',
    InDeck: true
  },
  {
    Value: 4,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '4',
    InDeck: true
  },

  {
    Value: 5,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '5',
    InDeck: true
  },
  {
    Value: 5,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '5',
    InDeck: true
  },
  {
    Value: 5,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '5',
    InDeck: true
  },
  {
    Value: 5,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '5',
    InDeck: true
  },

  {
    Value: 6,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '6',
    InDeck: true
  },
  {
    Value: 6,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '6',
    InDeck: true
  },
  {
    Value: 6,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '6',
    InDeck: true
  },
  {
    Value: 6,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '6',
    InDeck: true
  },

  {
    Value: 7,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '7',
    InDeck: true
  },
  {
    Value: 7,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '7',
    InDeck: true
  },
  {
    Value: 7,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '7',
    InDeck: true
  },
  {
    Value: 7,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '7',
    InDeck: true
  },

  {
    Value: 8,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '8',
    InDeck: true
  },
  {
    Value: 8,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '8',
    InDeck: true
  },
  {
    Value: 8,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '8',
    InDeck: true
  },
  {
    Value: 8,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '8',
    InDeck: true
  },

  {
    Value: 9,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '9',
    InDeck: true
  },
  {
    Value: 9,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '9',
    InDeck: true
  },
  {
    Value: 9,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '9',
    InDeck: true
  },
  {
    Value: 9,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '9',
    InDeck: true
  },

  {
    Value: 10,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '10',
    InDeck: true
  },
  {
    Value: 10,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '10',
    InDeck: true
  },
  {
    Value: 10,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '10',
    InDeck: true
  },
  {
    Value: 10,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: '10',
    InDeck: true
  },

  {
    Value: 11,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'В',
    InDeck: true
  },
  {
    Value: 11,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'В',
    InDeck: true
  },
  {
    Value: 11,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'В',
    InDeck: true
  },
  {
    Value: 11,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'В',
    InDeck: true
  },
  {
    Value: 12,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'Д',
    InDeck: true
  },
  {
    Value: 12,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'Д',
    InDeck: true
  },
  {
    Value: 12,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'Д',
    InDeck: true
  },
  {
    Value: 12,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'Д',
    InDeck: true
  },

  {
    Value: 13,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'K',
    InDeck: true
  },
  {
    Value: 13,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'K',
    InDeck: true
  },
  {
    Value: 13,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'K',
    InDeck: true
  },
  {
    Value: 13,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'K',
    InDeck: true
  },

  {
    Value: 14,
    Type: 0,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'Т',
    InDeck: true
  },
  {
    Value: 14,
    Type: 1,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'Т',
    InDeck: true
  },
  {
    Value: 14,
    Type: 2,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'Т',
    InDeck: true
  },
  {
    Value: 14,
    Type: 3,
    OnHands: false,
    OnTable: false,
    Discard: false,
    Owner: null,
    Trump: false,
    Name: 'Т',
    InDeck: true
  }
]

export const $deck = atom(initialDeckState)

export const $deckTable = computed([$deck, $party], (deck, party) => {
  if (party.DeckLength === DURAK_DECKLENGTH.deck52) return deck
  const ids = DECK_LENGTH_IDS[party.DeckLength]
  return deck.filter(
    card =>
      !ids.some(card2 => card.Type === card2.Type && card.Value === card2.Value)
  )
})

export const resetDeck = action($deck, 'resetDeck', (store, _) => {
  store.set(initialDeckState)
  return store.get()
})

export const getCardsBySuit = suit => {
  return computed([$deck, $deckTable], (_, deck) => {
    return deck
      .filter(card => card.Type === DURAK_SUIT[suit])
      .toSorted((a, b) => a.Value - b.Value)
  })
}

export const getLeftOverCards = () =>
  $deckTable.get().filter(card => card.InDeck)

export const getOnlyHaveOwnerCards = () =>
  $deckTable.get().filter(card => card.Owner)

export const updateCard = action($deck, 'updateCard', (store, updatedProp) => {
  const cardIndex = store
    .get()
    .findIndex(
      card => card.Type === updatedProp.Type && card.Value === updatedProp.Value
    )

  const card = store.get()[cardIndex]
  const updatedCard = { ...card, ...updatedProp }

  store.set([
    ...store.get().filter((_, index) => index !== cardIndex),
    updatedCard
  ])
})
