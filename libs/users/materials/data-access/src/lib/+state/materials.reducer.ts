import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { IFolder } from '../models/folder.model';
import { LoadingStatus } from '@users/core/data-access';
import { IMaterial } from '../models/material.model';

export const materialsFeatureKey = 'materials';

export interface MaterialState {
  folders: IFolder[],
  materials: IMaterial[],
  status: LoadingStatus,
  error: string | null,
}

export const initialState: MaterialState = {
  folders: [],
  materials: [],
  status: 'init',
  error: null
};

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadFolders, (state) => ({...state, status: 'loading' as const})),
  on(MaterialsActions.loadFoldersSuccess, (state, {folders}) => ({...state, folders: folders, status: 'loaded' as const})),
  on(MaterialsActions.loadFoldersFailure, (state, {error}) => ({...state, status: 'error' as const, error: error })),
  on(MaterialsActions.deleteFolderSuccess, (state, {id}) => ({...state, folders: state.folders.filter(folder => folder.id !== id)})),
  on(MaterialsActions.deleteFolderFailure, (state, {error}) => ({...state, status: 'error' as const, error: error })),
  on(MaterialsActions.addFolderSuccess, (state, {folder}) => ({...state, folders: [...state.folders, folder]})),
  on(MaterialsActions.addFolderFailure, (state, {error}) => ({...state, status: 'error' as const, error: error })),
  on(MaterialsActions.loadMaterials, (state) => ({...state, status: 'loading' as const})),
  on(MaterialsActions.loadMaterialsSuccess, (state, {materials}) => ({...state, materials: materials, status: 'loaded' as const})),
  on(MaterialsActions.loadMaterialsFailure, (state, {error}) => ({...state, status: 'error' as const, error: error })),
  on(MaterialsActions.addMaterialSuccess, (state, {newMaterial}) => ({...state, materials: [...state.materials, newMaterial]})),
  on(MaterialsActions.deleteMaterialSuccess, (state, {id}) => ({...state, materials: state.materials.filter(material => material.id !== id)})),
  on(MaterialsActions.deleteFolderFailure, (state, {error}) => ({...state, status: 'error' as const, error: error })),
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});

export function materialReducer(state: MaterialState | undefined, action: Action) {
  return reducer(state, action);
}