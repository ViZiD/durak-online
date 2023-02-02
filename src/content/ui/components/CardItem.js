import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  padding: 0.7em;
  background: ${(props) => props.theme.colors.black};
  border: 0.8px solid ${(props) => props.theme.colors.border};
  border-radius: 50%;
  width: 0.4px;
  height: 0.4px;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: calc(clamp(28px, 10vmin, 55px) / 3);
  ${(props) =>
    props.inTable && {
      background: props.theme.colors.blue,
    }}
  ${(props) =>
    props.inHands && {
      background: props.theme.colors.green,
    }}
 ${(props) =>
    props.hostile && {
      background: props.theme.colors.red,
    }}
 ${(props) =>
    props.isTrump && {
      background: props.theme.colors.gold,
    }}
 ${(props) =>
    props.isDiscard && {
      visibility: 'hidden',
    }}
`;

export const CardItem = (props) => {
  const { value, ontable, onhands, discard, trump, hostile } = props.card;
  return (
    <CardContainer
      inTable={ontable}
      inHands={onhands}
      isDiscard={discard}
      isTrump={trump}
      hostile={hostile}>
      {ontable}
      {value}
    </CardContainer>
  );
};
