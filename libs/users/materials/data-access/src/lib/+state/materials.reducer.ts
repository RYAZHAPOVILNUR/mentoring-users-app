import { error } from 'highcharts';
import { LoadingStatus } from '@users/core/data-access';
import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IMaterial } from '../models/material.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<IMaterial> {
  status: LoadingStatus;
}

export const materialsAdapter: EntityAdapter<IMaterial> = createEntityAdapter<IMaterial>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
});

export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.addMaterialSuccess, (state, { material }) =>
      materialsAdapter.addOne(material, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),
    on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state }))
  ),
});
