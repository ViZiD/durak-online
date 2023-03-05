import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { EnemyList } from './EnemyList';

import { selectDeckLength, selectGameType, selectMySlotId } from '../../../features/game/selectors';

import { selectExtensionStatus } from '../../../features/setting/selectors';

import { durakGameType } from '../../scripts/constants';
import { DraggableTable } from './DraggableTable';

export default function App() {
  const extensionStatus = useSelector(selectExtensionStatus, shallowEqual);

  const deckLength = useSelector(selectDeckLength, shallowEqual);
  const mySlotId = useSelector(selectMySlotId, shallowEqual);
  const gameType = useSelector(selectGameType, shallowEqual);

  return (
    <>
      {deckLength !== 0 &&
        mySlotId !== 0 &&
        gameType !== durakGameType.ochko &&
        extensionStatus && <EnemyList />}

      {deckLength !== 0 &&
        mySlotId !== 0 &&
        gameType !== durakGameType.ochko &&
        extensionStatus && <DraggableTable />}
    </>
  );
}
