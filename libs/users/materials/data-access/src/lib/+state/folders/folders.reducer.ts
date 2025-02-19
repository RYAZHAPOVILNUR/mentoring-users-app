import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { FoldersActions } from './folders.actions';
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
  status: 'init',
  error: null,
});

const reducer = createReducer(
  initialFoldersState,

  on(FoldersActions.initFolders, (state) => {
    return {
      ...state,
      status: 'loading' as const,
    };
  }),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) => {
    return foldersAdapter.setAll(folders, {
      ...state,
      status: 'loaded' as const,
    });
  }),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => {
    return {
      ...state,
      status: 'error' as const,
      error,
    };
  }),
  on(FoldersActions.addFolderSuccess, (state, { folderData }) =>
    foldersAdapter.addOne({ ...folderData }, { ...state })
  ),
  on(FoldersActions.addFolderFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) => {
    return foldersAdapter.removeOne(id, {
      ...state,
      status: 'loaded' as const,
    });
  }),
  on(FoldersActions.deleteFolderFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(FoldersActions.editFolderSuccess, (state, { folderData }) =>
    foldersAdapter.updateOne(
      {
        id: folderData.id,
        changes: folderData,
      },
      state
    )
  ),
  on(FoldersActions.editFolderFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);

export function foldersReducer(state: FoldersState | undefined, action: Action) {
  return reducer(state, action);
}
