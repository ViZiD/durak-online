import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { CardImage } from './CardImage';

import { getCardsByOwnerId } from '../../../features/deck/selectors';

const EnemyCardsContainer = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top + 65}px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

export const EnemyCards = ({ userId, setting }) => {
  const enemyCards = useSelector((state) => getCardsByOwnerId(state, userId), shallowEqual);

  return (
    <EnemyCardsContainer left={setting?.x} top={setting?.y} size={setting?.size}>
      {enemyCards.map((card) => (
        <CardImage key={card.id} cardId={card.id} />
      ))}
    </EnemyCardsContainer>
  );
};
