import { createFeature, createReducer, on } from '@ngrx/store';
import *as MaterialsActions from './materials.actions';
import { Material } from './models/materials.interface';

export const materialsFeatureKey = 'materials';

export interface MaterialState {
  materials: Material[],
  status: 'init' | 'loading' | 'success' | 'error',
  error: Error | null ,
}

export const initialState: MaterialState = {
  materials: [],
  status: 'init',
  error: null,
};

export const materialReducer = createReducer(
  initialState,
  on(MaterialsActions.loadMaterial, (state) => ({
    ...state,
    status: 'loading' as const
   })),
   on(MaterialsActions.loadMaterialSuccess, (state, {materials}) => ({
    ...state,
    materials,
    status: 'success' as const
   })),
   on(MaterialsActions.loadMaterialFailure, (state, {error}) => ({
    ...state,
    error: error,
    status: 'error' as const
   })),

  on(MaterialsActions.deleteMaterial, (state,) => ({
   ...state,
    status: 'loading' as const
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, {id}) => ({
    ...state,
    materials: state.materials.filter(material => material.id!== id),
    status:'success' as const
  })),
  on(MaterialsActions.deleteMaterialFailure, (state, {error}) => ({
    ...state,
    error: error,
    status:'error' as const
  })),

  on(MaterialsActions.addMaterial, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(MaterialsActions.addMaterialSuccess, (state, {material}) => ({
    ...state,
    materials: [...state.materials, material],
    status:'success' as const
  })),
  on(MaterialsActions.addMaterialFailure, (state, {error}) => ({
    ...state,
    error: error,
    status:'error' as const
  }))
);
