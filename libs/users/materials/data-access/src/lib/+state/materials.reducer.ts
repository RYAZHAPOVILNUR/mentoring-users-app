import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';
import { IFolder } from '../models/folder.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IMaterial } from '../models/material.model';

export const materialsFeatureKey = 'materials';

export interface MaterialsState extends EntityState<IFolder> {
  status: LoadingStatus;
  materials: IMaterial[];
  error: null;
}
export const materialsAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>();

export const initialState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  materials: [],
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadMaterialsFolders, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(MaterialsActions.loadMaterialsFoldersSuccess, (state, { folders }) =>
    materialsAdapter.setAll(folders, { ...state, status: 'loaded' })
  ),
  on(MaterialsActions.loadMaterialsFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  })),

  on(MaterialsActions.addMaterialsFolderSuccess, (state, { folder }) =>
    materialsAdapter.addOne({ ...folder }, { ...state })
  ),
  on(MaterialsActions.deleteMaterialsFolderSuccess, (state, { folder_id }) =>
    materialsAdapter.removeOne(folder_id, { ...state })
  ),
  on(MaterialsActions.deleteMaterialsFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  })),

  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({ ...state, materials, status: 'loaded' })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  })),

  on(MaterialsActions.addMaterials, (state) => ({
    ...state,
  })),
  on(MaterialsActions.addMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials: [...state.materials, materials],
  })),
  on(MaterialsActions.addMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  })),

  on(MaterialsActions.deleteMaterialsSuccess, (state, { id }) => ({
    ...state,
    materials: state.materials.filter((material) => material.id !== id),
  })),
  on(MaterialsActions.deleteMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error',
    error,
  }))
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
