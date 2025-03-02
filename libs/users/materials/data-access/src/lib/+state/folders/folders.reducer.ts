import { FoldersEntity, LoadingStatus } from '@users/core/data-access';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { FoldersErrors } from '../../models/folders-error';
import { foldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<FoldersEntity> {
  selectedId?: string | number
  status: LoadingStatus,
  error: FoldersErrors | null,
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null
});

export const reducer = createReducer(
  initialFoldersState,
  on(foldersActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(foldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(foldersActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),
  on(foldersActions.addFolderSuccess, (state, { folderData }) =>
    foldersAdapter.addOne({ ...folderData }, { ...state })
  ),
  on(foldersActions.addFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),
  on(foldersActions.editFolderSuccess, (state, { folderData }) =>
    foldersAdapter.updateOne({
      id: folderData.id,
      changes: folderData
    }, state)
  ),
  on(foldersActions.editFolderFailure, (state, { error }) => ({
    ...state, status: 'error' as const, error
  })),
  on(foldersActions.deleteFolderSuccess, (state, { id }) =>
    foldersAdapter.removeOne(id, { ...state })
  ),
  on(foldersActions.deleteFolderFailure, (state, { error }) => ({
    ...state, status: 'error' as const, error
  }))
);

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}
