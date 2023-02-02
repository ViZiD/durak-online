import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Moveable from 'react-moveable';
import styled from 'styled-components';

import { CardTable } from './CardTable';

import {
  selectGameStatus,
  selectGameType,
  selectDeckCount,
} from '../../../features/game/selectors';

const Container = styled.div`
  cursor: move;
  position: relative;
  display: inline-flex;
  background: ${(props) => props.theme.colors.background};
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export default function App() {
  const gameStatus = useSelector(selectGameStatus);
  const deckCount = useSelector(selectDeckCount);
  const gameType = useSelector(selectGameType);
  const [target, setTarget] = useState();
  const [frame, setFrame] = useState({
    translate: [0, 0],
  });
  useEffect(() => {
    const durakRoot = document.querySelector('#durak-helper-root');
    const shadowRoot = durakRoot && durakRoot.shadowRoot;
    const dragable = shadowRoot.querySelector('#dragable');
    setTarget(dragable);
  }, []);

  return (
    <>
      <Container id="dragable">
        {gameStatus && deckCount && gameType !== 3 && <CardTable />}
      </Container>
      <Moveable
        target={target}
        draggable={true}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        origin={false}
        hideDefaultLines={true}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        onDragStart={(e) => {
          e.set(frame.translate);
        }}
        onDrag={(e) => {
          frame.translate = e.beforeTranslate;
          e.target.style.transform = `translate(${e.beforeTranslate[0]}px, ${e.beforeTranslate[1]}px)`;
        }}
      />
    </>
  );
}
