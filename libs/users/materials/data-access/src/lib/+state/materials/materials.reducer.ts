import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus, MaterialsEntity } from '@users/core/data-access';
import { MaterialsErrors } from './models/material';
import { createReducer, on } from '@ngrx/store';
import { materialsActions } from './materials.actions';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<MaterialsEntity> {
  selectedId?: string | number; // which Materials record has been selected
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null
});

const reducer = createReducer(
  initialMaterialsState,
  // Загрузка материала
  on(materialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(materialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(materialsActions.loadMaterialsFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error
    })
  ),
  // Добавление материала
  on(materialsActions.addMaterial, (state) => ({
      ...state,
      status: 'loading' as const
    })
  ),
  on(materialsActions.addMaterialSuccess, (state, { materialData }) =>
    materialsAdapter.addOne({ ...materialData }, { ...state })
  ),
  on(materialsActions.addMaterialFailure, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error
    })
  ),
  // Удаление материала
  on(materialsActions.deleteMaterial, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(materialsActions.deleteMaterialSuccess, (state, { materialId }) =>
    materialsAdapter.removeOne(materialId, { ...state, status: 'loaded' as const })
  ),
  on(materialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  }))
);
