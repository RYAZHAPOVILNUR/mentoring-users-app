import { Action, createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<MaterialsEntity> {
  status: LoadingStatus;
  error: Error | null;
}

export interface MaterialsEntity {
  id: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: number;
};

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>();

export const initialMaterialState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialMaterialState,
  on(MaterialsActions.loadMaterials, (state) => state),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.addMaterialSuccess, (state, { material }) => materialsAdapter.addOne({ ...material }, { ...state })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { materialId }) => materialsAdapter.removeOne(materialId, { ...state })),
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
