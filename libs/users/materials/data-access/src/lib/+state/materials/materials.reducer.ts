import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Material } from '../../models/material.model';
import { LoadingStatus } from '@users/core/data-access';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

export const MATERIALS_FEATURE_KEY = 'materials';
export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();

export interface MaterialsState extends EntityState<Material> {
  error: Error | null;
  status: LoadingStatus;
}

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  error: null,
  status: 'init',
});

export const materialsReducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const}),
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, {error}) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(MaterialsActions.addMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.addMaterialSuccess, (state, {material}) =>
    materialsAdapter.addOne(material, {...state, status: 'loaded' as const}),
  ),
  on(MaterialsActions.addMaterialFailure, (state, {error}) => ({
    ...state,
    error,
    status: 'error' as const,
  })),
  on(MaterialsActions.deleteMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, {id}) =>
    materialsAdapter.removeOne(id, {...state, status: 'loaded' as const}),
  ),
  on(MaterialsActions.deleteMaterialFailure, (state, {error}) => ({
    ...state,
    error, status: 'error' as const,
  })),
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: materialsReducer,
});
