import styled from 'styled-components'

const RowItemContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 0.7em;
  background: ${props => props.theme.colors.black};
  border: 0.3px solid ${props => props.theme.colors.border};
  border-radius: 50%;
  width: 0.3px;
  height: 0.3px;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.white};
  text-align: center;
  font-size: calc(clamp(28px, 10vmin, 55px) / 3);
  font-weight: bold;
  ${props =>
    props.inTable && {
      background: props.theme.colors.blue
    }}
  ${props =>
    props.inHands && {
      background: props.theme.colors.green
    }}
 ${props =>
    props.hostile && {
      background: props.theme.colors.red
    }}
 ${props =>
    props.isTrump && {
      background: props.theme.colors.gold,
      color: props.theme.colors.black
    }}
 ${props =>
    props.isDiscard && {
      visibility: 'hidden'
    }}
`

export default ({ item }) => {
  return (
    <RowItemContainer
      inTable={item.OnTable}
      inHands={item.OnHands}
      hostile={item.Owner}
      isTrump={item.Trump}
      isDiscard={item.Discard}
    >
      {item.Name}
    </RowItemContainer>
  )
}
