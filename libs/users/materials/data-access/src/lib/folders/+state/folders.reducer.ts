import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { FoldersEntity } from '../../models/folders.interface';
import * as FoldersActions from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export interface FoldersState extends EntityState<FoldersEntity> {
  selectedFolderId?: number;
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

const reducer = createReducer(
  initialFoldersState,
  on(FoldersActions.initFolders, (state) => ({ ...state, status: 'loading' as const })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(FoldersActions.addFolderSuccess, (state, { folderData }) =>
    foldersAdapter.addOne({ ...folderData }, { ...state })
  ),
  on(FoldersActions.addFolderFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) => foldersAdapter.removeOne(id, { ...state })),
  on(FoldersActions.deleteFolderFailed, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  on(FoldersActions.loadFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFolderSuccess, (state, { folderData }) =>
    foldersAdapter.addOne({ ...folderData }, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.loadFolderFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(FoldersActions.updateFolderStatus, (state, { status }) => ({
    ...state,
    status,
  }))
);

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}
