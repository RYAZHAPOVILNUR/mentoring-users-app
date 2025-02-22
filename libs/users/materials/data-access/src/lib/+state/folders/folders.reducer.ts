import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as FoldersActions from './folders.actions';
import { LoadingStatus } from '@users/core/data-access';
import { FolderModel } from '../../models/folder.model';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<FolderModel> {
  loading: string | boolean;
  error: string | null;
}

export const adapter = createEntityAdapter<FolderModel>();

export const initialState: FoldersState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const foldersReducer = createReducer(
  initialState,

  on(FoldersActions.loadAllFolders, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(FoldersActions.loadAllFoldersSuccess, (state, { folders }) =>
    adapter.setAll(folders, {
      ...state,
      loading: false,
    })
  ),

  on(FoldersActions.loadAllFoldersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(FoldersActions.loadFolder, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(FoldersActions.loadFolderSuccess, (state, { folder }) => ({
    ...state,
    selectedFolderId: folder.id.toString(),
    loading: false,
  })),

  on(FoldersActions.loadFolderFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);

// Export the adapter's selectors
export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
