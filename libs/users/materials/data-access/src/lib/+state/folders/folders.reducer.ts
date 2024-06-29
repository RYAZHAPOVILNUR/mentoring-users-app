import { createFeature, createReducer, on } from '@ngrx/store';
import { FoldersActions } from './folders.actions';
import { LoadingStatus } from '@users/core/data-access';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Folder } from '../../models/folder.model';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<Folder> {
  status: LoadingStatus;
  error: Error | null;
  openedFolder: Folder | null;
};

export const foldersAdapter = createEntityAdapter<Folder>();

const initialState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
  openedFolder: null,
});

const reducer = createReducer(
  initialState,
  on(FoldersActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { folders }) => 
    foldersAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(
    FoldersActions.loadFoldersFailed,
    FoldersActions.addFolderFailed,
    FoldersActions.deleteFolderFailed,
    (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(FoldersActions.addFolderSuccess, (state, { folderData }) => 
    foldersAdapter.addOne(folderData, state)
  ),
  on(FoldersActions.deleteFolder, (state, { id }) => 
    foldersAdapter.removeOne(id, state)
  ),
);

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer,
});
