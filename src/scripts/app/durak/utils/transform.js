import compact from 'lodash/compact'
import values from 'lodash/values'
import flattenDeep from 'lodash/flattenDeep'
import { initialPartyState } from '../stores/party'

export const transformParty = partyObj => {
  if (partyObj.Users.length === 0) {
    return initialPartyState
  }

  const {
    DeckTrump,
    DeckLength,
    GameType,
    LowTrump,
    IsReverse,
    IsPair,
    IsFirstRun,
    Me,
    MoveUser,
    iAmViewer,
    iAmWinner,
    Users,
    AllUsers,
    TotalUsers,
    GameSeconds
  } = partyObj
  return {
    DeckTrump,
    DeckLength,
    GameType,
    LowTrump,
    IsReverse,
    IsPair,
    IsFirstRun,
    Me,
    MoveUser,
    iAmViewer,
    iAmWinner,
    Users,
    AllUsers,
    TotalUsers,
    GameSeconds
  }
}

export const durakMovesTransfom = moves =>
  compact(
    flattenDeep(
      values(moves).map(({ CardMove, DefCard }) => [CardMove, DefCard])
    )
  ).map(({ Type, Value }) => ({ Type, Value }))

export const myCardsTransform = cards =>
  cards.map(({ Type, Value }) => ({ Type, Value }))

export const remainsCardsTransform = remainsCards =>
  Object.keys(remainsCards).map(prop => ({
    UserId: prop,
    Count: remainsCards[prop]
  }))

export const buraMovesTransform = moves =>
  compact(flattenDeep(moves.Moves.map(move => move?.Cards)))

export const friendCardTransform = obj =>
  obj.Cards.map(card => ({ ...card, Owner: obj.UserId }))

export const buraPtsTransform = UserPoints =>
  UserPoints.map(({ Id, Pt }) => ({ UserId: Id, Points: Pt }))
