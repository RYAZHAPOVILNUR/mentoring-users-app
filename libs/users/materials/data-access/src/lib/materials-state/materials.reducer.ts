import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as MaterialsActions from './materials.actions';
import { MaterialsEntity } from './materials.models';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<MaterialsEntity> {
  selectedId?: string | number; // which Materials record has been selected
  loaded: boolean; // has the Materials list been loaded
  error?: string | null; // last known error (if any)
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.initMaterials, (state) => ({ ...state, loaded: false, error: null })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, loaded: true })
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({ ...state, error })),
  on(MaterialsActions.addMaterialSuccess, (state, { material }) => materialsAdapter.addOne(material, state)),
  on(MaterialsActions.addMaterialFailure, (state, { error }) => ({ ...state, error })),

  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => materialsAdapter.removeOne(id, {...state})),
  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({ ...state, error })),
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
