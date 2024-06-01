import { Action, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { MaterialsStateInterface } from '../materials-state.interface';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export const materialsState: MaterialsStateInterface = {
  status: 'init',
  folders: [],
  materials: [],
  error: null,
};

export const reducer = createReducer(
  materialsState,
  on(MaterialsActions.getFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.getFoldersSuccess, (state, { folders }) => ({
    ...state,
    status: 'loaded' as const,
    folders,
  })),
  on(MaterialsActions.getFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.getMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.getMaterialsSuccess, (state, { materials }) => ({
    ...state,
    status: 'loaded' as const,
    materials,
  })),
  on(MaterialsActions.getMaterialsFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
)

export function materialsReducer(state: MaterialsStateInterface | undefined, action: Action) {
  return reducer(state, action);
}