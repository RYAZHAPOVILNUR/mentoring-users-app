import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as FoldersActions from './folders.actions';
import { FolderDTO } from '../../models/folders.models';
import { LoadingStatus } from '@users/core/data-access';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<FolderDTO> {
  // selectedId?: string | number; // which Folders record has been selected
  // loaded: boolean; // has the Folders list been loaded
  error: FoldersErrors | null; // last known error (if any)
  status: LoadingStatus;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export const foldersAdapter: EntityAdapter<FolderDTO> = createEntityAdapter<FolderDTO>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  folders: [],
  status: 'init',
  // loaded: false,
  error: null,
});

const reducer = createReducer(
  initialFoldersState,
  on(FoldersActions.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) => foldersAdapter.removeOne(id, { ...state })),
  on(FoldersActions.addFolderSuccess, (state, { folderData }) => foldersAdapter.addOne({ ...folderData }, { ...state })),
  
);

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}
