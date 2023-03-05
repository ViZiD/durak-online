import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { selectEnemyUsers, usersSelectAll } from '../../../features/users/selectors';

import { selectGameType } from '../../../features/game/selectors';

import { EnemyItem } from './EnemyItem';
import { durakGameType } from '../../scripts/constants';

export const EnemyList = () => {
  const gameType = useSelector(selectGameType, shallowEqual);

  const users =
    gameType === durakGameType.bura
      ? useSelector(usersSelectAll, shallowEqual)
      : useSelector(selectEnemyUsers, shallowEqual);

  return users.map((user) => {
    return <EnemyItem user={user} key={user?.id} gameType={gameType} />;
  });
};
