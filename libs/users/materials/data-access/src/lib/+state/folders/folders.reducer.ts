import { createReducer, on } from '@ngrx/store';
import * as FolderActions from '../folders/folders.action';
import { FolderDTO } from '../models/folder.model';

export interface FoldersState {
  folders: FolderDTO[];
  loading: boolean;
  error: any;
}

const initialState: FoldersState = {
  folders: [],
  loading: false,
  error: null,
};

export const foldersReducer = createReducer(
  initialState,
  on(FolderActions.loadFolders, state => ({ ...state, loading: true })),
  on(FolderActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders,
    loading: false,
  })),
  on(FolderActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
