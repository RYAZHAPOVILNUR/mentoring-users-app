import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@users/core/data-access';

import { Material } from '../../models/material.interface';
import { MaterialsActions } from './materials.actions';
import { MaterialsErrors } from '../../models/material.type';

export const MATERIAL_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<Material> {
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();

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
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadMaterialsFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialsActions.createMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.createMaterialSuccess, (state, { material }) =>
    materialsAdapter.addOne(material, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.createMaterialFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialsActions.deleteMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) =>
    materialsAdapter.removeOne(id, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.deleteMaterialFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);
