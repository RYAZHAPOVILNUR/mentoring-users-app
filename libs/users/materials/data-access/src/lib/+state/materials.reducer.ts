import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeature, Action } from '@ngrx/store';

import { MaterialsEntity } from './materials.models';
import { LoadingStatus } from '@users/core/data-access';
import { UsersErrors } from '@users/users/data-access';
import { foldersActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<Folder> {
  materials: Material[];
  status: LoadingStatus;
  folders: Folder[]
}

export const materialsAdapter: EntityAdapter<Folder> =
  createEntityAdapter<Folder>();

export const initialMaterialsState: MaterialsState =
  materialsAdapter.getInitialState({
    materials: [],
    folders: [],
    status: 'init'
  });

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(foldersActions.loadFolders, (state) => ({
      ...state,
      status: 'loading'
    })),
    on(foldersActions.loadFoldersSuccess, (state, { folders }) => ({
      ...state,
      status: 'loaded',
      folders: folders
    }))
  )
});

// const reducer = createReducer(
//   initialMaterialsState,
//   on(MaterialsActions.initMaterials, (state) => ({
//     ...state,
//     loaded: false,
//     error: null,
//   })),
//   on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
//     materialsAdapter.setAll(materials, { ...state, loaded: true })
//   ),
//   on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
//     ...state,
//     error,
//   })),
// );

// export function materialsReducer(
//   state: MaterialsState | undefined,
//   action: Action
// ) {
//   return reducer(state, action);
// }
