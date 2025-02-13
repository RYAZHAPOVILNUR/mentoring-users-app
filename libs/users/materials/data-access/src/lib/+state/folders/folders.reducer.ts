import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import { FoldersEntity } from '../../models/folders-entity';

export const FOLDERS_FEATURE_KEY = 'folders';

export type LoadingStatus = 'init' | 'loading' | 'loaded' | 'error';

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export interface FolderState extends EntityState<FoldersEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FolderState;
}

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FolderState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialFoldersState,
  on(FoldersActions.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.loadFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);
