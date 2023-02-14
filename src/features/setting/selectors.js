import { createDraftSafeSelector } from '@reduxjs/toolkit';

const settingState = (state) => state.setting;

export const selectDraggablePosition = createDraftSafeSelector(
  settingState,
  (setting) => setting.draggablePosition,
);

export const selectExtensionStatus = createDraftSafeSelector(
  settingState,
  (setting) => setting.extensionStatus,
);
