import { createSlice, createAction } from '@reduxjs/toolkit';

export const extensionStatusToggle = createAction('setting/extensionStatusToggle');

const initialState = {
  draggablePosition: { x: 0, y: 0 },
  extensionStatus: true,
};

export const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    setDraggablePosition: (state, action) => {
      state.draggablePosition = action.payload;
    },
    enableExtension: (state, action) => void (state.extensionStatus = true),
    disableExtension: (state, action) => void (state.extensionStatus = false),
  },
});

export const { setDraggablePosition, enableExtension, disableExtension } = settingSlice.actions;

export default settingSlice.reducer;
