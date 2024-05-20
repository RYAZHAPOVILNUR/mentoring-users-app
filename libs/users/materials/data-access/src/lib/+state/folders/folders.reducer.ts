import { createFeature, createReducer, on } from '@ngrx/store';
import { Folder } from '@users/materials/data-access';
import { folderActions } from './folders.actions';

export const foldersFeatureKey = 'folders';

export interface State {
  folders: Folder[];
  folder: Folder | null;
  isLoading: boolean;
  error: unknown
}

export const initialState: State = {
  folders: [],
  folder: null,
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(folderActions.loadFolders, (state) => ({ ...state, isLoading: true })),
  on(folderActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    isLoading: false,
    folders,
  })),
  on(folderActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(folderActions.createFolder, (state) => ({ ...state, isLoading: true })),
  on(folderActions.createFolderSuccess, (state, { folder }) => ({
    ...state,
    isLoading: false,
    folders: [...state.folders, folder],
  })),
  on(folderActions.createFolderFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(folderActions.removeFolder, (state) => ({ ...state, isLoading: true })),
  on(folderActions.removeFolderSuccess, (state, { folderId }) => ({
    ...state,
    isLoading: false,
    folders: state.folders.filter((folder) => folder.id !== folderId),
  })),
  on(folderActions.removeFolderFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
);

export const folderFeature = createFeature({
  name: foldersFeatureKey,
  reducer
})

