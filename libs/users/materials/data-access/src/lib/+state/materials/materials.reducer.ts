import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus, MaterialsDTO } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};
export interface MaterialsState extends EntityState<MaterialsDTO> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: MaterialsErrors | null;
}
export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}
export const materialsAdapter: EntityAdapter<MaterialsDTO> = createEntityAdapter<MaterialsDTO>();

export const initialMaterialsState: MaterialsState =
  materialsAdapter.getInitialState({
    error: null,
    status: 'init',
  });

const reducer = createReducer(
  initialMaterialsState,
  //________________________________Load Materials
  on(MaterialsActions.loadMaterials, (state) => ({ ...state, status: 'loading' as const })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => materialsAdapter.setAll( materials, { ...state, status: 'loaded' as const })),
  on(MaterialsActions.loadMaterialsFailure, (state, {error}) => ({ ...state, status: 'error' as const, error })),
  //________________________________Add Material
  on(MaterialsActions.addMaterial, (state) => ({ ...state, status: 'loading' as const })),
  on(MaterialsActions.addMaterialSuccess, (state, { material }) => materialsAdapter.addOne(material, { ...state, status: 'loaded' as const })),
  on(MaterialsActions.addMaterialFailure, (state, {error}) => ({ ...state, status: 'error' as const, error })),
  //________________________________Remove Material
  on(MaterialsActions.removeMaterial, (state) => ({ ...state, status: 'loading' as const })),
  on(MaterialsActions.removeMaterialSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state, status: 'loaded' as const })),
  on(MaterialsActions.removeMaterialFailure, (state, {error}) => ({ ...state, status: 'error' as const, error })));

export function materialsReducer(
  state: MaterialsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
