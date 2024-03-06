import isEqual from 'lodash/isEqual'
import { $dimensions } from '../stores/dimensions'
import { $party } from '../stores/party'
import { $game } from '../stores/game'
import {
  buraMovesTransform,
  buraPtsTransform,
  durakMovesTransfom,
  friendCardTransform,
  myCardsTransform,
  remainsCardsTransform,
  transformParty
} from './transform'
// import { $drop } from '../stores/drop'

const partyStateConsumer = partyState => {
  const prevObj = $party.value
  const newObj = transformParty(partyState)

  if (!isEqual(prevObj, newObj)) {
    $party.set(newObj)
  }
}
const resizeStateConsumer = ({ height, width, isDesktopMode }) => {
  const newValue = {
    height: height,
    width: width,
    is_desktop_mode: isDesktopMode
  }
  if (!isEqual($dimensions.value, newValue)) {
    $dimensions.set(newValue)
  }
}

const windowStateConsumer = ({ inGame }) => {
  const prevValue = $game.value?.inGame

  if (prevValue != inGame) {
    $game.setKey('inGame', inGame)
  }
}

const reverseStateConsumer = ({ AvailableReverse }) => {
  const prevValue = $game.value?.AvailableReverse

  if (prevValue != AvailableReverse) {
    $game.setKey('AvailableReverse', AvailableReverse)
  }
}

const regaveStateConsumer = ({ AvailableRegave }) => {
  const prevValue = $game.value?.AvailableRegave

  if (prevValue != AvailableRegave) {
    $game.setKey('AvailableRegave', AvailableRegave)
  }
}

const countersStateConsumer = ({ GardageCount }) => {
  const prevValue = $game.value?.GardageCount

  if (prevValue != GardageCount) {
    $game.setKey('GardageCount', GardageCount)
  }
}

const deckStateConsumer = ({ DeckCurrent, DeckStart }) => {
  const prevDeckCurrent = $game.value?.deckState.DeckCurrent
  const prevDeckStart = $game.value?.deckState.DeckStart

  if (prevDeckCurrent !== DeckCurrent) {
    $game.setKey('deckState.DeckCurrent', DeckCurrent)
  }
  if (prevDeckStart !== DeckStart) {
    $game.setKey('deckState.DeckStart', DeckStart)
  }
}

const actionsStateConsumer = ({ GardageProcess, PickUpTo }) => {
  const prevActionsState = $game.value?.actions

  if (prevActionsState.GardageProcess !== GardageProcess) {
    $game.setKey('actions.GardageProcess', GardageProcess)
  }
  if (prevActionsState.PickUpTo !== PickUpTo) {
    $game.setKey('actions.PickUpTo', PickUpTo)
  }
}

const myCardConsumer = ({ Cards }) => {
  const prevState = $game.value?.myCards
  const transformedState = myCardsTransform(Cards)

  if (!isEqual(prevState, transformedState)) {
    $game.setKey('myCards', transformedState)
  }
}

const friendCardConsumer = friendCardState => {
  const prevState = $game.value?.friendCards
  const transformedCard = friendCardTransform(friendCardState)

  if (!isEqual(prevState, transformedCard)) {
    $game.setKey('friendCards', transformedCard)
  }
}

const remainsCardsConsumer = remainsCardState => {
  const prevState = $game.value?.userCardsCounter
  const transformedState = remainsCardsTransform(remainsCardState)

  if (!isEqual(prevState, transformedState)) {
    $game.setKey('userCardsCounter', transformedState)
  }
}

const durakMovesConsumer = moves => {
  const prevState = $game.value?.durakMoves
  const transformedMoves = durakMovesTransfom(moves)

  if (!isEqual(prevState, transformedMoves)) {
    $game.setKey('durakMoves', transformedMoves)
  }
}

const buraMovesConsumer = moves => {
  const prevState = $game.value?.buraMoves
  const transformedMoves = buraMovesTransform(moves)

  if (!isEqual(prevState, transformedMoves)) {
    $game.setKey('buraMoves', transformedMoves)
  }
}

const buraPtsConsumer = ({ UserPoints }) => {
  const prevState = $game.value?.buraPoints
  const transformedState = buraPtsTransform(UserPoints)

  if (!isEqual(prevState, transformedState)) {
    $game.setKey('buraPoints', transformedState)
  }
}

const stepStateConsumer = ({
  DefUser,
  IsMyDefEvent,
  IsMyDefStep,
  IsMyOffStep,
  PercentTimer,
  PushUsers
}) => {
  const prevStepState = $game.value.stepState

  if (prevStepState.DefUser !== DefUser) {
    $game.setKey('stepState.DefUser', DefUser)
  }
  if (prevStepState.IsMyDefEvent !== IsMyDefEvent) {
    $game.setKey('stepState.IsMyDefEvent', IsMyDefEvent)
  }
  if (prevStepState.IsMyDefStep !== IsMyDefStep) {
    $game.setKey('stepState.IsMyDefStep', IsMyDefStep)
  }
  if (prevStepState.IsMyOffStep !== IsMyOffStep) {
    $game.setKey('stepState.IsMyOffStep', IsMyOffStep)
  }
  if (prevStepState.PercentTimer !== PercentTimer) {
    $game.setKey('stepState.PercentTimer', PercentTimer)
  }
  if (!isEqual(prevStepState.PushUsers, PushUsers)) {
    $game.setKey('stepState.PushUsers', PushUsers)
  }
}

const takeCircleConsumer = ({ Taker }) => {
  const prevTaker = $game.value.takeCircle.Taker
  if (prevTaker !== Taker) {
    $game.setKey('takeCircle.Taker', Taker)
  }
}

const timerStateConsumer = ({ PercentTimer, UsersWithCircle }) => {
  const prevPercentTimer = $game.value.timerState.PercentTimer
  const prevUsersWithCircle = $game.value.timerState.UsersWithCircle

  if (prevPercentTimer !== PercentTimer) {
    $game.setKey('timerState.PercentTimer', PercentTimer)
  }
  if (!isEqual(prevUsersWithCircle, UsersWithCircle)) {
    $game.setKey('timerState.UsersWithCircle', UsersWithCircle)
  }
}

const loseTimerConsumer = ({ LoseTimer, LoseUser }) => {
  const prevLoseTimer = $game.value.loseTimer.LoseTimer
  const prevLoseUser = $game.value.loseTimer.LoseUser

  if (prevLoseTimer !== LoseTimer) {
    $game.setKey('loseTimer.LoseTimer', LoseTimer)
  }
  if (prevLoseUser !== LoseUser) {
    $game.setKey('loseTimer.LoseUser', LoseUser)
  }
}

// const dropZoneConsumer = dropZoneState => {
//   const prevState = $drop.value?.DropZoneState

//   if (!isEqual(prevState, dropZoneState)) {
//     $drop.setKey('DropZoneState', dropZoneState)
//   }
// }
// const dragginOnTableConsumer = dragginOnTableState => {
//   const prevState = $drop.value?.DraggingOnTableState

//   if (!isEqual(prevState, dragginOnTableState)) {
//     $drop.setKey('DraggingOnTableState', dragginOnTableState)
//   }
// }

export const reduxListener = store => {
  const state = store.getState()

  // dropZoneConsumer(state.DropZoneState)
  // dragginOnTableConsumer(state.DraggingOnTableState)

  stepStateConsumer(state.stepState)

  takeCircleConsumer(state.takeCircleState)
  timerStateConsumer(state.timerState)
  loseTimerConsumer(state.loseTimerState)

  myCardConsumer(state.myCardState)

  actionsStateConsumer(state.actionsState)

  partyStateConsumer(state.partyState)

  if (!Object.hasOwn(state.remainCardState, 'Users')) {
    remainsCardsConsumer(state.remainCardState)
  }

  resizeStateConsumer(state.ResizeState)

  windowStateConsumer(state.windowState)

  reverseStateConsumer(state.reverseState)

  regaveStateConsumer(state.regaveState)

  countersStateConsumer(state.countersState)

  friendCardConsumer(state.friendCardState)

  deckStateConsumer(state.deckState)

  durakMovesConsumer(state.movedState)

  buraMovesConsumer(state.movedBuraState)

  buraPtsConsumer(state.buraPtsState)
}
