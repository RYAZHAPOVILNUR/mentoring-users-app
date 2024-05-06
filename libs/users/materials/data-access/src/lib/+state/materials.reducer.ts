import { createFeature, createReducer, on } from '@ngrx/store';
import { Folder } from '../models/folder.interface';
import { Material } from '../models/material.interface';
import { folderActions, additionalActions, materialActions } from './materials.actions';

export const materialsFeatureKey = 'materials';

export interface State {
  folders: Folder[];
  folder: Folder | null;
  materials: Material[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  folders: [],
  folder: null,
  materials: [],
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

  on(materialActions.loadMaterials, (state) => ({ ...state, isLoading: true })),
  on(materialActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(materialActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    isLoading: false,
    materials,
  })),

  on(additionalActions.clearMaterials, () => initialState),
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
