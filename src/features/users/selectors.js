import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { usersSelectors } from './usersSlice';

export const usersSelectAll = usersSelectors.selectAll;
export const usersSelectById = usersSelectors.selectById;

export const selectNotOutUsers = createDraftSafeSelector(usersSelectAll, (users) =>
  users.filter((user) => user.remainCards !== 0),
);

export const selectEnemyUsers = createDraftSafeSelector(usersSelectAll, (users) =>
  users.filter((user) => !user.me),
);
