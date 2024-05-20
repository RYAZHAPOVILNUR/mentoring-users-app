import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Material } from '../../interfaces/material.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { materialsActions } from './materialsActions';
import { MaterialState } from '../../interfaces/material-state.interface';

export const MATERIALS_FEATURE_KEY = 'materials';
export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();
export const initialMaterialsState: MaterialState = materialsAdapter.getInitialState({
  status: 'init'}
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(materialsActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(materialsActions.loadMaterialsSuccess, (state, { materials })=>
      materialsAdapter.setAll(materials, {
        ...state,
        status: 'loaded'
      })
    ),
    on(materialsActions.loadMaterialsFailure, (state) => ({
        ...state,
        status: 'error'
      })
    ),


)})
