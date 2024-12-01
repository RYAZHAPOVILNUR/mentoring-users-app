import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoldersState } from './folders.reducer';
import { FolderDTO } from '../../models/folder.model';

export const selectFoldersState = createFeatureSelector<FoldersState>('folders');

export const selectFolders = createSelector(selectFoldersState, (state : FoldersState) => state.folders);
export const selectFoldersStatus = createSelector(selectFoldersState, (state : FoldersState) => state.status)
export const selectFoldersError = createSelector(selectFoldersState, (state : FoldersState) => state.error)

export const selectFolderById = (folderId: number) =>
  createSelector(selectFoldersState, (state) => {
    console.log('Folders State:', state);
    return state.folders.find((folder: FolderDTO) => folder.id === folderId);
  });
