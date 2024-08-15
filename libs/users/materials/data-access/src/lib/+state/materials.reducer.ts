import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { Folder } from '../models/folder.model';
import { Material } from '../models/material.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<Folder> {
  materials: Material[];
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export const materialsAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialMaterialsState,

  // folders
  on(MaterialsActions.addFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.addFolderSuccess, (state, { folderData }) =>
    materialsAdapter.setAll(folderData, {
      ...state,
      status: 'loaded' as const
    })
  ),
  on(MaterialsActions.addFolderFailed, (state) => ({
      ...state,
      status: 'error' as const,
      error: null
    })
  ),


  on(MaterialsActions.loadMaterialss, (state) => state),
  on(MaterialsActions.loadMaterialssSuccess, (state, action) => state),
  on(MaterialsActions.loadMaterialssFailure, (state, action) => state)
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer,
});
