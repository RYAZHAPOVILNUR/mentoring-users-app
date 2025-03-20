import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { IFolder } from '../../models/folders-model';
import * as FoldersActions from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export type FoldersErrors = {
  status: number;
  error: Error;
  [key: string]: unknown;
};

export interface FoldersState extends EntityState<IFolder> {
  folders: IFolder[];
  selectedFolderId?: string | number;
  error: FoldersErrors | null;
  status: LoadingStatus;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  folders: [],
  error: null,
});

const foldersReducer = createReducer(
  initialFoldersState,
  on(FoldersActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, {
      ...state,
      status: 'loaded' as const,
    })
  ),
  on(FoldersActions.loadFoldersFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(FoldersActions.addFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.addFolderSuccess, (state, { folder }) =>
    foldersAdapter.addOne(folder, {
      ...state,
      status: 'loaded' as const,
      error: null,
    })
  ),
  on(FoldersActions.addFolderFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(FoldersActions.deleteFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) =>
    foldersAdapter.removeOne(id, {
      ...state,
      status: 'loaded' as const,
    })
  ),
  on(FoldersActions.deleteFolderFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(FoldersActions.openFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.openFolderSuccess, (state, { folder }) => ({
    ...state,
    selectedId: folder.id,
    status: 'loaded' as const,
    error: null,
  })),
  on(FoldersActions.openFolderFailed, (state, { error }) => ({
    ...state,
    error,
    status: 'loading' as const,
  }))
);
export function FoldersReducer(state: FoldersState | undefined, action: Action) {
  return foldersReducer(state, action);
}
