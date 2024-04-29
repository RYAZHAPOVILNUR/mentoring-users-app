import { FoldersActions } from './folders.actions';
import { LoadingStatus } from '@users/core/data-access';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
export const FOLDERS_FEATURE_KEY = 'folders';

export interface Folder {
  created_at: any;
  title: string;
  id: number;
}


export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export interface FoldersState extends EntityState<Folder> {
  status: LoadingStatus;
  error: FoldersErrors | null;
}
export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  error: null,
  status: 'init',
});

export const foldersReducer = createReducer(
  initialFoldersState,
  on(FoldersActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.loadFoldersFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(FoldersActions.createFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.createFolderSuccess, (state, { folder }) =>
    foldersAdapter.addOne(folder, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.createFolderFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(FoldersActions.deleteFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) =>
    foldersAdapter.removeOne(id, { ...state, status: 'loaded' as const })
  ),
  on(FoldersActions.deleteFolderFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);
