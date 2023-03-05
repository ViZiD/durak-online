import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { usersSelectors } from './usersSlice';

export const usersSelectAll = usersSelectors.selectAll;
export const usersSelectById = usersSelectors.selectById;

const getUserPosition = (_, position) => position;
export const selectUserByPosition = createDraftSafeSelector(
  usersSelectAll,
  getUserPosition,
  (users, position) => users.find((user) => user.position === position),
);

export const selectNotOutUsers = createDraftSafeSelector(usersSelectAll, (users) =>
  users.filter((user) => user.remainCards !== 0),
);

export const selectEnemyUsers = createDraftSafeSelector(usersSelectAll, (users) =>
  users.filter((user) => !user.me),
);

export const selectUserMe = createDraftSafeSelector(usersSelectAll, (users) =>
  users.find((user) => user.me),
);

export const selectUserRemainCards = createDraftSafeSelector(
  usersSelectById,
  (user) => user.remainCards,
);

export const selectUserBuraPoints = createDraftSafeSelector(
  usersSelectById,
  (user) => user.buraPoints,
);
