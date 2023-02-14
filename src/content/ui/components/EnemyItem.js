import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { CardImage } from './CardImage';

import { getCardsByOwnerId } from '../../../features/deck/selectors';

const EnemyContainer = styled.div`
  position: absolute;
  left: ${(props) => props.left - 10}px;
  top: ${(props) => props.top - 7}px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

const EnemyCardCount = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  font-size: calc(clamp(30px, 7vh, 60px) * 1);
  color: ${(props) => props.theme.colors.yellow};
`;

const EnemyCards = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
`;

export const EnemyItem = ({ user }) => {
  const enemyCards = useSelector((state) => getCardsByOwnerId(state, user.id), shallowEqual);

  return (
    <EnemyContainer left={user?.cordinate?.x} top={user?.cordinate?.y}>
      <EnemyCardCount>{user.remainCards}</EnemyCardCount>
      <EnemyCards>
        {enemyCards.map((card) => (
          <CardImage key={card.id} cardId={card.id} />
        ))}
      </EnemyCards>
    </EnemyContainer>
  );
};
