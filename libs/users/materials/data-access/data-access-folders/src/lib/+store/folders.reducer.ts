import { createFeature, createReducer, on } from '@ngrx/store';

import { Folder } from '@users/ui-folders';

import { FoldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState {
  folders: Folder[];
  status: string;
}

export const initialFoldersState: FoldersState = {
  folders: [],
  status: 'init',
};

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(FoldersActions.loadFolders, (state) => {
      return {
        ...state,
        status: 'loading',
      };
    }),
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) => {
      return {
        ...state,
        status: 'loaded',
        folders: folders,
      };
    }),
    on(FoldersActions.loadFoldersFailure, (state) => {
      return {
        ...state,
        status: 'failed',
      };
    }),
    on(FoldersActions.deleteFolderSuccess, (state, { deletedFolderId }) => {
      return {
        ...state,
        status: 'loaded',
        folders: state.folders.filter(({ id }) => id !== deletedFolderId),
      };
    }),
    on(FoldersActions.loadFoldersFailure, (state) => {
      return {
        ...state,
        status: 'failed',
      };
    }),
    on(FoldersActions.createFolderSuccess, (state, { createdFolder }) => {
      return {
        ...state,
        status: 'loaded',
        folders: [...state.folders, createdFolder],
      };
    }),
  ),
});
