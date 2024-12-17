import { error } from 'highcharts';
import { LoadingStatus } from '@users/core/data-access';
import { createFeature, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IFolder } from '../models/folder.model';
import { FoldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<IFolder> {
  status: LoadingStatus;
}

export const foldersAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
});

export const foldersFeature = createFeature({
  name: 'folders',
  reducer: createReducer(
    initialFoldersState,
    on(FoldersActions.loadFolders, (state) => ({
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
    on(FoldersActions.addFolderSuccess, (state, { folder }) => foldersAdapter.addOne(folder, { ...state })),
    on(FoldersActions.addFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(FoldersActions.deleteFolderSuccess, (state, { id }) => foldersAdapter.removeOne(id, { ...state })),
    on(FoldersActions.deleteFolderFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    }))
  ),
});
