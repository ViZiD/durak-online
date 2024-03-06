import { logger } from '@nanostores/logger'
import init_durak from './app/durak'
import {
  $deck,
  $deckTable,
  getOnlyHaveOwnerCards
} from './app/durak/stores/deck'
import { $game } from './app/durak/stores/game'
import { $dimensions } from './app/durak/stores/dimensions'
import { reduxListener } from './app/durak/utils/redux'
import { $party } from './app/durak/stores/party'
import { CARDS_VALUE, SUIT_EMOJI } from './app/durak/utils/constants'
// import { $drop } from './app/durak/stores/drop'

let destroy = logger(
  {
    // DeckTable: $deck
    // Party: $party
    // Game: $game
    // Demensions: $dimensions
  }
  // {
  //   messages: {
  //     mount: false,
  //     unmount: false
  //   }
  // }
)

window.durak_store?.subscribe(() => reduxListener(window.durak_store))

init_durak()
