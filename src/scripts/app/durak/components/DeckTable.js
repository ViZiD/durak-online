import Draggable from 'react-draggable'
import styled from 'styled-components'
import DeckRow from './DeckRow'
import { DURAK_SUITNAME } from '../utils/constants'

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
  return (
    <Draggable bounds="body" position={null} allowAnyClick={true}>
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
