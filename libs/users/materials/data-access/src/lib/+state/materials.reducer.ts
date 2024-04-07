import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { LoadingStatus } from '@users/core/data-access'
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsError = {
  status: number,
  [key:string]: unknown
}

export interface State {
  materials: Material[],
  folders: Folder[],

  status: LoadingStatus,
  error: MaterialsError | null,
}

export const initialState: State = {
  materials: [],
  folders: [],
  status: 'init',
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.initFolders, state => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders: folders,
    status: 'loaded' as const
  })),
  on(MaterialsActions.loadFoldersFaild, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),

  on(MaterialsActions.createFolders, state => ({
    ...state,
    status: 'loading' as const
  })),
  on(MaterialsActions.createFoldersSuccess, (state,  { folder } ) => ({
    ...state,
    folders: [...state.folders, folder],
    status: 'loaded' as const
  })),
  on(MaterialsActions.createFoldersFaild, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),

  on(MaterialsActions.deleteFoldersSuccess, (state, { id }) => ({
    ...state,
    folders: state.folders.filter((folder) => folder.id !== id),
    status: 'loaded' as const
  })),
  on(MaterialsActions.deleteFoldersFaild, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),
  
  on(MaterialsActions.openFolderSuccess, (state, { materials }) => ({
    ...state,
    materials: materials,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.openFolderFaild, ( state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),


  on(MaterialsActions.loadMaterials, state => ({
    ...state,
    status: 'loading' as const
  })),
  on(MaterialsActions.loadMaterialsSuccess, ( state, { materials }) => ({
    ...state,
    materials: materials,
    status: 'loaded' as const
  })),
  on(MaterialsActions.loadMaterialsFaild, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),

  on(MaterialsActions.createMaterials, state => ({
    ...state,
    status: 'loading' as const
  })),
  on(MaterialsActions.createMaterialsSuccess, (state, { material }) => ({
    ...state,
    materials: [...state.materials, material],
    status: 'loaded' as const,
  })),
  on(MaterialsActions.createFoldersFaild, (state , { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),

  on(MaterialsActions.deleteMaterials, state => ({
    ...state,
    status: 'loading' as const
  })),
  on(MaterialsActions.deleteMaterialsSuccess, (state, { material_id }) => ({
    ...state,
    materials: state.materials.filter((material) => material.id !== material_id),
    status: 'loaded' as const,
  })),
  on(MaterialsActions.deleteMaterialsFaild, (state , { error }) => ({
    ...state,
    status: 'error' as const,
    error
  })),
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer,
});

