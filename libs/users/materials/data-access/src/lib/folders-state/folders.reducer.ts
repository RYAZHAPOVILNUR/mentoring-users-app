import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as FoldersActions from './folders.actions';
import { FoldersEntity } from './folders.models';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<FoldersEntity> {
  selectedId?: string | number; // which Folders record has been selected
  loaded: boolean; // has the Folders list been loaded
  error?: string | null; // last known error (if any)
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialFoldersState,
  on(FoldersActions.initFolders, (state) => ({ ...state, loaded: false, error: null })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, { ...state, loaded: true })
  ),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({ ...state, error })),

  on(FoldersActions.addFolderSuccess, (state, { folder }) => foldersAdapter.addOne(folder, state)),
  on(FoldersActions.addFolderFailure, (state, { error }) => ({ ...state, error })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) => foldersAdapter.removeOne(id, { ...state })),
  on(FoldersActions.deleteFolderFailure, (state, { error }) => ({ ...state, error }))
);

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}
