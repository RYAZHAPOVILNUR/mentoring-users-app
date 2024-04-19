import { createFeature, createReducer, on } from '@ngrx/store';

import { Folder } from '../models/folder.interface';
import { Material } from '../models/material.interface';
import { additionalActions, folderActions, materialActions } from './materials.actions';

export const materialsFeatureKey = 'materials';

export interface State {
  folders: Folder[];
  materials: Material[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  folders: [],
  materials: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(folderActions.loadFolders, (state) => ({ ...state, isLoading: true })),
  on(folderActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders,
    isLoading: false,
  })),
  on(folderActions.loadFoldersFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(folderActions.createFolder, (state) => ({ ...state, isLoading: true })),
  on(folderActions.createFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: [...state.folders, folder],
    isLoading: false,
  })),
  on(folderActions.createFolderFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(folderActions.removeFolder, (state) => ({ ...state, isLoading: true })),
  on(folderActions.removeFolderSuccess, (state, { folderId }) => ({
    ...state,
    folders: state.folders.filter((folder) => folder.id !== folderId),
    isLoading: false,
  })),
  on(folderActions.removeFolderFailure, (state, { error }) => ({ ...state, error, isLoading: false })),

  on(materialActions.loadMaterials, (state) => ({ ...state, isLoading: true })),
  on(materialActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials,
    isLoading: false,
  })),
  on(materialActions.loadMaterialsFailure, (state, { error }) => ({ ...state, error, isLoading: false })),
  on(additionalActions.clearMaterials, (state) => ({ ...state, materials: [] }))
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
