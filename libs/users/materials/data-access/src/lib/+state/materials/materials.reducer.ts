import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { MaterialsType } from "../../models/material.type";
import { LoadingStatus } from "@users/core/data-access";
import { Action, createReducer, on } from "@ngrx/store";
import { MaterialsActions } from "./materials.actions";

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<MaterialsType> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<MaterialsType> = createEntityAdapter<MaterialsType>()

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
})

const reducer = createReducer(

  initialMaterialsState,

  on(MaterialsActions.initMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  
 on(MaterialsActions.addMaterialSuccess, (state, { material }) =>
    materialsAdapter.addOne(material, { ...state })
  ),
  on(MaterialsActions.addMaterialFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) =>
    materialsAdapter.removeOne(id, { ...state })
  ),
  on(MaterialsActions.deleteMaterialFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))

)

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}