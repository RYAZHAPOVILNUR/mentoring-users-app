import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { MaterialInterface } from '../../interfaces/material.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { MaterialStateInterface } from '../../interfaces/material-state.interface';

export const MATERIALS_FEATURE_KEY = 'materials';
export const materialsAdapter: EntityAdapter<MaterialInterface> = createEntityAdapter<MaterialInterface>();
export const initialMaterialsState: MaterialStateInterface = materialsAdapter.getInitialState({
  status: 'init'});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials })=>
      materialsAdapter.setAll(materials, {
        ...state,
        status: 'loaded'
      })),
    on(MaterialsActions.loadMaterialsFailure, (state) => ({
      ...state,
      status: 'error'
    })),


)})
