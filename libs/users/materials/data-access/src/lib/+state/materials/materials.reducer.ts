import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '../../../../../../../core/data-access/src';
import { MaterialsDTO } from '../../../../../../../core/data-access/src/lib/materials-dto.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as MaterialsAction from '../materials/materials.actions';


export const MaterialsFeatureKey = 'materials';

export const materialsAdapter: EntityAdapter<MaterialsDTO> = createEntityAdapter<MaterialsDTO>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  // set initial required properties
  status: 'init',
  error: null,
});

export interface MaterialsState extends EntityState<MaterialsDTO> {
  selectedId?: string | number; // which Users record has been selected
  status: LoadingStatus;
  error: string | null;
}

const reducerMaterial = createReducer(
  initialMaterialsState,
  on(MaterialsAction.initMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsAction.loadMaterialsSuccess, (state, { material }) => (
    materialsAdapter.setAll(material, { ...state, status: 'loaded' as const })
  )),
  on(MaterialsAction.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
);

export function materialReducer(state: MaterialsState | undefined, action: Action){
  return reducerMaterial(state, action);
}
