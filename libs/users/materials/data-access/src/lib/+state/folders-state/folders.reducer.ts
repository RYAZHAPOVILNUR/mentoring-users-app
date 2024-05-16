import { createFeature, createReducer, on } from '@ngrx/store';
import { FolderStateInterface } from '../../interfaces/folder-state.interface';
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { FolderInterface } from '../../interfaces/folder.interface';
import { FoldersActions } from './folders.actions';

export const FOLDERS_FEATURE_KEY = 'folders';
export const foldersAdapter: EntityAdapter<FolderInterface> = createEntityAdapter<FolderInterface>();
export const initialFoldersState: FolderStateInterface = foldersAdapter.getInitialState({
  status: 'init'});

export const foldersFeature = createFeature({
  name: FOLDERS_FEATURE_KEY,
  reducer: createReducer(
    initialFoldersState,
    on(FoldersActions.loadFolders, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(FoldersActions.loadFoldersSuccess, (state, { folders })=>
      foldersAdapter.setAll(folders, {
        ...state,
        status: 'loaded'
    })),
    on(FoldersActions.loadFoldersFailure, (state) => ({
      ...state,
      status: 'error'
    })),




)});







