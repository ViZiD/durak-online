import { useStore } from '@nanostores/preact'
import styled from 'styled-components'
import { getCardsBySuit } from '../stores/deck'
import RowItem from './RowItem'
import SuitIcon from './SuitIcon'

const RowContainer = styled.div`
  display: flex;
  flex: 1;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 0.2em 0 0.2em;
`

export default ({ suit, id }) => {
  const cards = useStore(getCardsBySuit(suit))

  return (
    <RowContainer id={id}>
      <SuitIcon suit={suit} />
      {cards.map(card => (
        <RowItem key={`${card.Type}-${card.Value}`} item={card} />
      ))}
      <SuitIcon suit={suit} />
    </RowContainer>
  )
}
