import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { MaterialsEntity } from '../../models/materials.entity';

export const materialsFeatureKey = 'materials';

export interface MaterialsState extends EntityState<MaterialsEntity> {
  status: LoadingStatus;
  error: Error | null;
}

export const materialsAdapter = createEntityAdapter<MaterialsEntity>();

export const initialState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => 
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.addMaterialSuccess, (state, { materialData }) => 
    materialsAdapter.addOne(materialData, state)
  ),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => 
    materialsAdapter.removeOne(id, state)
  ),
  on(
    MaterialsActions.loadMaterialsFailed,
    MaterialsActions.addMaterialFailed,
    (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
