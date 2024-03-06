import { Fragment } from 'preact'
import { useStore } from '@nanostores/preact'
import styled from 'styled-components'
import DeckTable from './DeckTable'
import { $party } from '../stores/party'
import { $game } from '../stores/game'
import { $settings } from '../stores/settings'
import { DURAK_GAMETYPE, HELPER_FLAGS } from '../utils/constants'

// const HideButton = styled.button`
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 8%;
//   height: 8%;
//   background: none;
//   border: none;
//   color: transparent;
//   cursor: pointer;
//   outline: none;
// `

const App = () => {
  const party = useStore($party)
  const game = useStore($game)
  const settings = useStore($settings)

  return (
    <Fragment>
      {/* {game.inGame && (
        <HideButton
          onClick={() =>
            $settings.setKey(
              'helper',
              settings.helper === HELPER_FLAGS.show
                ? HELPER_FLAGS.hide
                : HELPER_FLAGS.show
            )
          }
        />
      )} */}
      {settings.helper === HELPER_FLAGS.show &&
        game.inGame &&
        party.GameType !== DURAK_GAMETYPE.ochko && (
          <DeckTable deckTrump={party.DeckTrump} />
        )}
    </Fragment>
  )
}

export default App
