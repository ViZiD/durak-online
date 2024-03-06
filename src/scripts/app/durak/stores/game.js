import { deepMap, onSet } from 'nanostores'
import {
  deckCurrentHandler,
  durakCardsHandler,
  friendCardsHandler,
  gardageHandler,
  inGameHandler,
  myCardsHandler,
  pickUpHandler,
  userCardsCounterHandler
} from '../utils/handlers'
import { $party } from './party'
import { DURAK_GAMETYPE } from '../utils/constants'

export const initialGameStore = {
  inGame: false,
  AvailableReverse: false,
  AvailableRegave: false,
  GardageCount: 0,
  deckState: {
    DeckCurrent: 0,
    DeckStart: 0
  },
  actions: {
    GardageProcess: false,
    PickUpTo: -1
  },
  stepState: {
    IsMyOffStep: false,
    IsMyOffEvent: false,
    IsMyDefStep: false,
    IsMyDefEvent: false,
    PercentTimer: 100,
    PushUsers: [],
    DefUser: 0
  },
  loseTimer: {
    LoseTimer: 100,
    LoseUser: 0
  },
  timerState: {
    PercentTimer: 100,
    UsersWithCircle: []
  },
  takeCircle: {
    Taker: 0
  },
  myCards: [],
  friendCards: [],
  durakMoves: [],
  userCardsCounter: [],
  buraMoves: [],
  buraPoints: []
}

export const $game = deepMap(initialGameStore)

onSet($game, ({ newValue, changed }) => {
  switch (changed) {
    case 'durakMoves':
      durakCardsHandler({ cards: newValue[changed], state: newValue })
      break
    case 'buraMoves':
      durakCardsHandler({ cards: newValue[changed], state: newValue })
      break
    case 'myCards':
      myCardsHandler({ cards: newValue[changed], state: newValue })
      break
    case 'friendCards':
      friendCardsHandler({ cards: newValue[changed], state: newValue })
      break
    case 'actions.GardageProcess':
      const gameType = $party.value.GameType
      const cards =
        gameType === DURAK_GAMETYPE.durak
          ? newValue.durakMoves
          : newValue.buraMoves
      gardageHandler({
        gardage: newValue[changed],
        cards: cards,
        state: newValue
      })
      break
    case 'actions.PickUpTo':
      pickUpHandler({
        userPos: newValue[changed],
        cards: newValue.durakMoves,
        state: newValue
      })
      break
    case 'inGame':
      inGameHandler({ flag: newValue[changed], state: newValue })
      break
    case 'userCardsCounter':
      userCardsCounterHandler({ counters: newValue[changed], state: newValue })
      break
    case 'deckState.DeckCurrent':
      deckCurrentHandler({ value: newValue[changed], state: newValue })
    default:
      break
  }
})
