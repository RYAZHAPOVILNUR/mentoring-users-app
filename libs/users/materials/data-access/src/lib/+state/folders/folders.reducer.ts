import { createFeature, createReducer, on } from '@ngrx/store';
import { FolderState } from '../../interfaces/folder-state.interface';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Folder } from '../../interfaces/folder.interface';
import { foldersActions } from './foldersActions';

export const FOLDERS_FEATURE_KEY = 'folders';
export const foldersAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();
export const initialFoldersState: FolderState = foldersAdapter.getInitialState({
  status: 'init'
});

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(foldersActions.loadFolders, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(foldersActions.loadFoldersSuccess, (state, { folders })=>
      foldersAdapter.setAll(folders, {
        ...state,
        status: 'loaded'
    })),
    on(foldersActions.loadFoldersFailure, (state) => ({
      ...state,
      status: 'error'
    })),




)});







