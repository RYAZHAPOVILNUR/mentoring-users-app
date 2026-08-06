import { createFeature, createReducer, on } from '@ngrx/store';

import { Material } from '@users/ui-materials';

import { MaterialsActions } from './materials.actions';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState {
  materials: Material[];
  status: string;
}

export const initialMaterialsState: MaterialsState = {
  materials: [],
  status: 'init',
};

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadMaterials, (state: MaterialsState) => {
      ({
        ...state,
        status: 'loading',
      })
    }),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => {
      ({
        ...state,
        status: 'loaded',
        materials,
      })
    }),
    on(MaterialsActions.loadMaterialsFailure, (state) => {
      ({
        ...state,
        status: 'failed',
      })
    }),
    on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => {
      ({
        ...state,
        status: 'loaded',
        materials: state.materials.filter(({ id }) => id !== id),
      })
    }),
    on(MaterialsActions.createMaterialSuccess, (state, { material }) => {
      ({
        ...state,
        status: 'loaded',
        materials: [...state.materials, material],
      })
    }),
  ),
});
