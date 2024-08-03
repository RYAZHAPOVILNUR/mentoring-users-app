import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { Materials } from '../models/materials.model';
import { LoadingStatus } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number,
  [key: string]: unknown;
}

export interface MaterialsState extends EntityState<Folder> {
  materials: Materials[];
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface MaterialsPertialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
    materialsAdapter.setAll(folders, {
      ...state,
      status: 'loaded' as const,
    })
  ),
  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.addFolder, (state, { folderData }) =>
    materialsAdapter.addOne({ ...folderData }, { ...state })
  ),
  on(MaterialsActions.loadMaterialss, (state) => state),
  on(MaterialsActions.loadMaterialssSuccess, (state, action) => state),
  on(MaterialsActions.loadMaterialssFailure, (state, action) => state)
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action)
}