import React, { useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import styled from 'styled-components';

import { CardTable } from './CardTable';
import { EnemyList } from './EnemyList';

import {
  selectDeckLength,
  selectDeckTrumpId,
  selectGameType,
  selectMySlotId,
} from '../../../features/game/selectors';

import { setDeckLength } from '../../../features/deck/deckSlice';

import {
  selectDraggablePosition,
  selectExtensionStatus,
} from '../../../features/setting/selectors';
import { setDraggablePosition } from '../../../features/setting/settingSlice';

import { durakDeckLength, durakGameType } from '../../scripts/constants';
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
  ${(props) =>
    !props.show && {
      visibility: 'hidden',
    }};
`;

export default function App() {
  const dispatch = useDispatch();

  const draggablePosition = useSelector(selectDraggablePosition, shallowEqual);
  const extensionStatus = useSelector(selectExtensionStatus, shallowEqual);

  const deckLength = useSelector(selectDeckLength, shallowEqual);
  const mySlotId = useSelector(selectMySlotId, shallowEqual);
  const gameType = useSelector(selectGameType, shallowEqual);
  const deckTrumpId = useSelector(selectDeckTrumpId, shallowEqual);

  useEffect(() => {
    if (deckLength !== durakDeckLength.deck52 && deckLength && gameType !== durakGameType.ochko) {
      dispatch(setDeckLength(deckLength));
    }
  }, [dispatch, deckLength, gameType, deckTrumpId]);

  return (
    <>
      {/* <EnemyList /> */}
      <Draggable
        defaultPosition={draggablePosition}
        position={null}
        onDrag={(e) => {
          debounce(() => {
            dispatch(setDraggablePosition({ x: e.x, y: e.y }));
          }, 5000);
        }}>
        <Container
          // id="dragable"
          show={
            deckLength !== 0 &&
            mySlotId !== 0 &&
            gameType !== durakGameType.ochko &&
            extensionStatus
          }>
          <CardTable />
        </Container>
      </Draggable>
    </>
  );
}
