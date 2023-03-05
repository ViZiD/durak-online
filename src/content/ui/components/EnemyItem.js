import React from 'react';

import { EnemyRemainCards } from './EnemyRemainCards';
import { EnemyBuraPoints } from './EnemyBuraPoints';
import { EnemyCards } from './EnemyCards';

import { durakGameType } from '../../scripts/constants';

export const EnemyItem = ({ user, gameType }) => {
  if (gameType === durakGameType.bura) {
    return <EnemyBuraPoints userId={user.id} setting={user.userElement} />;
  } else {
    return (
      <>
        <EnemyRemainCards userId={user.id} setting={user.userElement} />
        <EnemyCards userId={user.id} setting={user.userElement} />
      </>
    );
  }
};
