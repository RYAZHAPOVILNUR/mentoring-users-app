import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { FoldersType } from '../models/folder.type';
import * as FolderActions from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<FoldersType> {
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export type FoldersErrors = {
  status: number;
  [key: string]: unknown;
};

export const FoldersAdapter: EntityAdapter<FoldersType> = createEntityAdapter<FoldersType>();

export const initialFoldersState: FoldersState = FoldersAdapter.getInitialState({
  folders: [],
  status: 'init',
  error: null,
});

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(FolderActions.initFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(FolderActions.loadFoldersSuccess, (state, { folders }) =>
      FoldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
    ),
    on(FolderActions.loadFoldersFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(FolderActions.deleteFolderSuccess, (state, { id }) => FoldersAdapter.removeOne(id, { ...state })),
    on(FolderActions.addFolderSuccess, (state, { folder }) => FoldersAdapter.addOne({ ...folder }, { ...state }))
  ),
});