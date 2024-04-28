import Draggable from 'react-draggable'
import styled from 'styled-components'
import DeckRow from './DeckRow'
import { DURAK_SUITNAME } from '../utils/constants'
import { $deckPosition } from '../stores/settings'
import { useStore } from '@nanostores/preact'

const DeckTableContainer = styled.div`
  cursor: move;
  display: inline-flex;
  background: ${props => props.theme.colors.background};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
`

const InternalContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  #${props => props.suitName} {
    background-color: ${props => props.theme.colors.trumpsuit};
  }
`

export default ({ deckTrump }) => {
  const deckPosition = useStore($deckPosition)

  return (
    <Draggable
      bounds="body"
      defaultPosition={deckPosition}
      allowAnyClick={true}
      onStop={e => {
        $deckPosition.set({ x: e.x, y: e.y })
      }}
    >
      <DeckTableContainer>
        <InternalContainer suitName={DURAK_SUITNAME[deckTrump.Type]}>
          <DeckRow id="hearts" suit="hearts" />
          <DeckRow id="diamonds" suit="diamonds" />
          <DeckRow id="clubs" suit="clubs" />
          <DeckRow id="spades" suit="spades" />
        </InternalContainer>
      </DeckTableContainer>
    </Draggable>
  )
}
