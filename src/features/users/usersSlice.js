import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';

export const setUsers = createAsyncThunk('users/setUsers', async (users, { getState }) => {
  const { me } = getState()?.game;
  return users.map((user) => {
    if (user?.id === me?.id) return { ...user, me: true };
    return user;
  });
});

export const setDeferPusher = createAsyncThunk(
  'users/setDeferPusher',
  async (update, { getState }) => {},
);

export const updateUsersRemainCards = createAsyncThunk(
  'users/updateUsersRemainCards',
  async (updates) => {
    const ids = Object.keys(updates);
    return ids.map((id) => {
      return { id: id, changes: { remainCards: updates[id] } };
    });
  },
);

export const updateUsersBuraPoints = createAsyncThunk(
  'users/updateUsersBuraPoints',
  async (updates) => {
    return updates.map((update) => {
      return { id: update.Id, changes: { buraPoints: update.Pt } };
    });
  },
);

const comparator = (a, b) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => comparator(a.position, b.position),
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    usersUpdateOne: usersAdapter.updateOne,
    usersUpdateMany: usersAdapter.updateMany,
    removeUser: usersAdapter.removeOne,
    resetUsers: () => usersAdapter.getInitialState(),
  },
  extraReducers: (builder) => {
    builder
      .addCase(setUsers.fulfilled, (state, action) => {
        usersAdapter.setAll(state, action.payload);
      })
      .addCase(updateUsersRemainCards.fulfilled, (state, action) => {
        usersAdapter.updateMany(state, action.payload);
      })
      .addCase(updateUsersBuraPoints.fulfilled, (state, action) => {
        usersAdapter.updateMany(state, action.payload);
      });
  },
});

export const usersSelectors = usersAdapter.getSelectors((state) => state.users);
export const { usersUpdateOne, usersUpdateMany, resetUsers, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
