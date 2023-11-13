import { createReducer, on, Action } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IFolder } from '../models/folder.model';
import { LoadingStatus } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';


export interface MaterialsState extends EntityState<IFolder> {
  materials: [],
  status: LoadingStatus
}

export const materialsAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>()

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  status: 'init'
})

export const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.loadFolders, (state) => ({
    ...state, status: 'loading' as const
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => 
    materialsAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state, status: 'error' as const, error
  })
  )
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action)
}