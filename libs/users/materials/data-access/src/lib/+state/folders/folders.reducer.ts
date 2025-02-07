import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as FoldersActions from './folders.actions';
import { FoldersErrors } from './folders.models';
import { LoadingStatus } from '@users/core/data-access';
import { FoldersEntity } from '@users/core/data-access';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<FoldersEntity> {
  selectedId?: string | number; // which Folders record has been selected
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  // set initial required properties
  status: 'init',
  error: null,
});

const reducer = createReducer(
  initialFoldersState,

  on(FoldersActions.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, {
      ...state,
      status: 'loaded' as const,
    })
  ),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}
