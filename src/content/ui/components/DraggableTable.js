import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import styled from 'styled-components';

import { CardTable } from './CardTable';

import { selectDraggablePosition } from '../../../features/setting/selectors';
import { setDraggablePosition } from '../../../features/setting/settingSlice';

import { debounce } from '../../scripts/utils';

const Container = styled.div`
  cursor: move;
  position: relative;
  display: inline-flex;
  background: ${(props) => props.theme.colors.background};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
`;

export const DraggableTable = () => {
  const dispatch = useDispatch();

  const draggablePosition = useSelector(selectDraggablePosition, shallowEqual);

  return (
    <Draggable
      defaultPosition={draggablePosition}
      position={null}
      onDrag={(e) => {
        debounce(() => {
          dispatch(setDraggablePosition({ x: e.x, y: e.y }));
        }, 5000);
      }}>
      <Container>
        <CardTable />
      </Container>
    </Draggable>
  );
};
