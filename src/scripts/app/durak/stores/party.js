import { action, computed, deepMap, onSet } from 'nanostores'
import { deckTrumpHandler } from '../utils/handlers'
import { DURAK_DECKLENGTH, DURAK_GAMETYPE } from '../utils/constants'

export const initialPartyState = {
  TotalUsers: 0,
  GameSeconds: 0,
  IsReverse: false,
  IsPair: false,
  MoveUser: 0,
  LowTrump: 0,
  GameType: -1,
  DeckLength: 52,
  DeckTrump: {
    Type: -1,
    Value: 0
  },
  Users: [],
  IsFirstRun: true,
  AllUsers: [],
  iAmWinner: false,
  Me: {},
  iAmViewer: false
}

export const $party = deepMap(initialPartyState)

export const resetParty = action($party, 'resetParty', (store, _) => {
  store.set(initialPartyState)
})

export const getUserIdByPosition = position => {
  const user = $party.get().AllUsers.filter(usr => usr?.num === position)
  return user?.[0]?.Id
}

export const isEnemyId = id => $party.get().Me?.Id !== id

onSet($party, ({ newValue }) => {
  if (newValue.GameType === DURAK_GAMETYPE.ochko) return
  // if (
  //   newValue.AllUsers.length === 4 &&
  //   newValue.DeckLength === DURAK_DECKLENGTH.deck24
  // )
  //   return
  deckTrumpHandler({ trump: newValue.DeckTrump, state: newValue })
})
