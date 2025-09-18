import { HttpErrorResponse } from '@angular/common/http';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingStatus } from '@shared/util-store';

import { MaterialsActions } from './materials.actions';
import { Material } from '../interface/materials.interface';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<Material> {
  status: LoadingStatus;
  error: HttpErrorResponse | null;
  selectedId: number | null;
}
export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();

export const { selectAll } = materialsAdapter.getSelectors();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
  selectedId: null,
});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,

    on(MaterialsActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
      error: null,
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsAdapter.setAll(materials, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
      ...state,
      error,
      status: 'error' as const,
    })),

    on(MaterialsActions.deleteMaterial, (state) => ({
      ...state,
      status: 'loading' as const,
      error: null,
    })),
    on(MaterialsActions.deleteMaterialSuccess, (state, { id }) =>
      materialsAdapter.removeOne(id, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
      ...state,
      error,
      status: 'error' as const,
    })),

    on(MaterialsActions.addMaterial, (state) => ({
      ...state,
      status: 'loading' as const,
      error: null,
    })),
    on(MaterialsActions.addMaterialSuccess, (state, { material }) =>
      materialsAdapter.addOne(material, {
        ...state,
        status: 'loaded' as const,
      }),
    ),
    on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
      ...state,
      error,
      status: 'error' as const,
    })),
  ),
});
