import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { selectUserRemainCards } from '../../../features/users/selectors';

const CardsRemainStyle = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  width: ${(props) => props.size.width}px;
  display: flex;
  justify-content: center;
`;

const RemainsCardText = styled.span`
  font-size: calc(clamp(30px, 7vh, 60px) * 1);
  color: ${(props) => props.theme.colors.yellow};
  text-shadow: 0 0 4px ${(props) => props.theme.colors.black};
  user-select: none;
`;

export const EnemyRemainCards = ({ userId, setting }) => {
  const remainCards = useSelector((state) => selectUserRemainCards(state, userId), shallowEqual);

  return (
    <CardsRemainStyle left={setting?.x} top={setting?.y} size={setting?.size}>
      <RemainsCardText>{remainCards}</RemainsCardText>
    </CardsRemainStyle>
  );
};
