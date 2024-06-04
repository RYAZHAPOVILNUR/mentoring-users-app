import { createEntityAdapter } from '@ngrx/entity';
import { Material } from '../../interfaces/material.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { materialsActions } from './materials.actions';
import _default from 'chart.js/dist/plugins/plugin.tooltip';

export const MATERIALS_FEATURE_KEY = 'materials';
export const materialsAdapter = createEntityAdapter<Material>();

const initialState = materialsAdapter.getInitialState({
  status: 'init'
});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(materialsActions.loadMaterials, (state) => ({
        ...state,
        status: 'loading'
      })
    ),
    on(materialsActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsAdapter.setAll(materials, {
        ...state,
        status: 'loaded'
      })
    ),
    on(materialsActions.loadMaterialsFailure, (state) => ({
        ...state,
        status: 'error'
      })
    )
  )
});
