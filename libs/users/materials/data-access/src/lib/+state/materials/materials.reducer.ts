import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeature } from '@ngrx/store';
import { MaterialsEntity } from '../../models/materials.models';
import { LoadingStatus } from '@users/core/data-access';
import { materialActions } from './materials.actions';
import { materialFilter } from '../../models/material-filter.models';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<MaterialsEntity> {
  selectedId: string | number | null;
  status: LoadingStatus;
  materialFilter: materialFilter;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  selectedId: null,
  status: 'init',
  materialFilter: { folder_id: 0 },
});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,

    on(materialActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(materialActions.loadMaterialsSuccess, (state, { materials }) =>
      materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
    ),

    on(materialActions.loadMaterialsFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),

    on(materialActions.addMaterialSuccess, (state, { materialData }) =>
      materialsAdapter.addOne({ ...materialData }, { ...state })
    ),

    on(materialActions.deleteMaterialSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state })),

    on(materialActions.loadMaterial, (state) => ({
      ...state,
      status: 'loading' as const,
    })),

    on(materialActions.loadMaterialSuccess, (state, { material }) =>
      materialsAdapter.addOne(material, { ...state, status: 'loaded' as const })
    ),

    on(materialActions.loadMaterialFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error,
    })),

    on(materialActions.setMaterialFilter, (state, { filter }) => ({
      ...state,
      materialFilter: { folder_id: filter.folder_id },
    }))
  ),
});
