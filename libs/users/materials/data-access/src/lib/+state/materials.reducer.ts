import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';
import { LoadingStatus } from '@users/core/data-access';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const MATERIALS_FEATURE_KEY = 'materials';
export const materialsAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export interface State extends EntityState<Folder> {
  materials: Material[];
  error: Error | null;
  status: LoadingStatus;
}

export const initialState: State = materialsAdapter.getInitialState({
  materials: [],
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialState,

  // Folder
  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
    materialsAdapter.setAll(folders, {...state, status: 'loaded' as const}),
  ),
  on(MaterialsActions.loadFoldersFailure, (state, {error}) => ({
    ...state, error, status: 'error' as const,
  })),
  on(MaterialsActions.addFolder, (state) => ({
    ...state, status: 'loading' as const,
  })),
  on(MaterialsActions.addFolderSuccess, (state, {folder}) =>
    materialsAdapter.addOne(folder, {...state, status: 'loaded' as const}),
  ),
  on(MaterialsActions.addFolderFailure, (state, {error}) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(MaterialsActions.deleteFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, {id}) =>
    materialsAdapter.removeOne(id, {...state, status: 'loaded' as const}),
  ),
  on(MaterialsActions.deleteFolderFailure, (state, {error}) => ({
    ...state, error, status: 'error' as const,
  })),

  // Material
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, {error}) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(MaterialsActions.addFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.addMaterialSuccess, (state, {material}) => ({
    ...state,
    materials: [...state.materials, material],
    status: 'loaded' as const,
  })),
  on(MaterialsActions.addFolderFailure, (state, {error}) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(MaterialsActions.deleteFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, {id}) => ({
    ...state,
    materials: [...state.materials.filter(folder => folder.id !== id)],
    status: 'loaded' as const,
  })),
  on(MaterialsActions.deleteFolderFailure, (state, {error}) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer,
});
