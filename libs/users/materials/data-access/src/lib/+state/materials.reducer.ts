import { createReducer, on, Action, createFeature } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IFolder } from '../models/folder.model';
import { LoadingStatus } from '@users/core/data-access';
import { IMaterial } from '../models/material.model';

export const MATERIALS_FEATURE_KEY = 'materials';


export interface MaterialsState extends EntityState<IFolder> {
  materials: IMaterial[],
  status: LoadingStatus
}

export const materialsAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>()

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  status: 'init'
})

export const materialsFeature = createFeature({
  name: 'materials',
  reducer: createReducer(
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
    ),

    on(MaterialsActions.deleteFolderSuccess, (state, { id }) =>
      materialsAdapter.removeOne(id, { ...state })
    ),
    on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
    ),

    on(MaterialsActions.addFolderSuccess, (state, { folder }) =>
      materialsAdapter.addOne(folder, {...state})
    ),
    on(MaterialsActions.addFolderFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    })
    ),
    
    on(MaterialsActions.openFolder, (state) => ({
      ...state, status: 'loading' as const
    })
    ),
    on(MaterialsActions.openFolderSuccess, (state, { folder }) =>
      materialsAdapter.addOne({ ...folder }, { ...state, status: 'loaded' as const })
    ),
    on(MaterialsActions.openFolderFailure, (state, { error }) => ({
      ...state, status: 'error' as const, error
    }))
  )
})