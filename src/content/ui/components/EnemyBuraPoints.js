import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';

import { selectUserBuraPoints } from '../../../features/users/selectors';

const BuraPointsStyle = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  width: ${(props) => props.size.width}px;
  height: ${(props) => props.size.height}px;
  display: flex;
  justify-content: flex-start;
`;

const PointsText = styled.span`
  font-size: calc(clamp(30px, 7vh, 60px) * 1);
  color: ${(props) => props.theme.colors.yellow};
  text-shadow: 0 0 4px ${(props) => props.theme.colors.black};
  user-select: none;
`;

export const EnemyBuraPoints = ({ userId, setting }) => {
  const buraPoints = useSelector((state) => selectUserBuraPoints(state, userId), shallowEqual);
  return (
    <BuraPointsStyle left={setting?.x} top={setting?.y} size={setting?.size}>
      <PointsText>{buraPoints}</PointsText>
    </BuraPointsStyle>
  );
};
