import { FolderDTO } from '../../models/folder.model';
import { LoadingStatus } from '@users/core/data-access';
import { createReducer, on } from '@ngrx/store';
import { FoldersActions } from './folders.actions';

export const foldersFeatureKey = 'folders';
export interface FoldersState {
  folders: FolderDTO[];
  status: LoadingStatus;
  error?: Error | null;
}

export const initialState: FoldersState = {
  folders: [],
  status: 'init',
  error: null,
}

export const foldersReducer = createReducer(
  initialState,
  on(FoldersActions.initFolders, (state) => ({...state, status: 'loading' as const})),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) => ({...state, folders, status: 'loaded' as const})),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({...state, error, status: 'error' as const})),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: state.folders.filter((folder) => folder.id !== id),
    status: 'loaded' as const,
  })),
  on(FoldersActions.deleteFolderFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
  ),
  on(FoldersActions.addFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: [...state.folders, folder],
  })),
  on(FoldersActions.addFolderFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
