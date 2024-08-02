import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { MaterialType } from '../models/material.type';
import { LoadingStatus } from '@users/core/data-access';
import { createFeature, createReducer, on } from '@ngrx/store';
import { materialsActions } from './materials.actions';

export const MATERIALS_FEATURE_KEY = 'materials';
export const materialsAdapter: EntityAdapter<MaterialType> = createEntityAdapter();

export interface MaterialsState extends EntityState<MaterialType> {
  status: LoadingStatus;
  error: Error | null;
}

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(materialsActions.loadMaterials, (state) => {
      return {
        ...state,
        status: 'loading' as const,
      };
    }),
    on(materialsActions.loadMaterialsSuccess, (state, { materials }) => {
      return materialsAdapter.setAll(materials, {
        ...state,
        status: 'loaded' as const,
      });
    }),
    on(materialsActions.loadMaterialsFailed, (state, { error }) => {
      return {
        ...state,
        status: 'error' as const,
        error,
      };
    }),
    on(materialsActions.addMaterials, (state) => {
      return {
        ...state,
        status: 'loading' as const,
      };
    }),
    on(materialsActions.addMaterialsSuccess, (state, { material }) => {
      return materialsAdapter.addOne(material, {
        ...state,
        status: 'loaded' as const,
      });
    }),
    on(materialsActions.addMaterialsFailed, (state, { error }) => {
      return {
        ...state,
        status: 'error' as const,
        error,
      };
    }),
    on(materialsActions.deleteMaterials, (state) => {
      return {
        ...state,
        status: 'loading' as const,
      };
    }),
    on(materialsActions.deleteMaterialsSuccess, (state, { id }) => {
      return materialsAdapter.removeOne(id, {
        ...state,
        status: 'loaded' as const,
      });
    }),
    on(materialsActions.deleteMaterialsFailed, (state, { error }) => {
      return {
        ...state,
        status: 'error' as const,
        error,
      };
    })
  ),
});
