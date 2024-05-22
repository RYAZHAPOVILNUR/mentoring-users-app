import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FolderModel } from '@users/settings/data-access';

const getFolderState = createFeatureSelector<FolderModel>('Folders')

export const getFolderList = createSelector(getFolderState, (state) => {
  if (state.list) {
    return state.list.slice().sort((a, b) => b.id - a.id);
  }
  return [];
});

