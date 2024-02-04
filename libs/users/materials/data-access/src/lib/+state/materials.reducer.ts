import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Folder } from '../models/folder.models';
import { LoadingStatus } from '@users/core/data-access';
import { Material } from '../models/material.models';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<Folder> {
  status: LoadingStatus;
  error: null;
  materials: Material[];
}

export const materialsAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const initialState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
  materials: []
});

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(MaterialsActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
      materialsAdapter.setAll(folders, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.loadFoldersFailure, (state, action) => ({
      ...state, status: 'error' as const
    })),

    on(MaterialsActions.addFolder, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(MaterialsActions.addFolderSuccess, (state, { newFolder }) => {
      return materialsAdapter.addOne(newFolder, { ...state, status: 'loaded' as const });
    }),
    on(MaterialsActions.addFolderFailure, (state, action) => ({
      ...state, status: 'error' as const
    })),

    on(MaterialsActions.deleteFolder, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(MaterialsActions.deleteFolderSuccess, (state, { id }) => {
      return materialsAdapter.removeOne(id, { ...state, status: 'loaded' as const });
    }),
    on(MaterialsActions.deleteFolderFailure, (state, action) => ({
      ...state, status: 'error' as const
    }))
  )
});

