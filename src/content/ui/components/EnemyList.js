import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { selectEnemyUsers } from '../../../features/users/selectors';

import { EnemyItem } from './EnemyItem';

export const EnemyList = () => {
  const users = useSelector(selectEnemyUsers, shallowEqual);
  return users.map((user) => <EnemyItem user={user} key={user?.id} />);
};
