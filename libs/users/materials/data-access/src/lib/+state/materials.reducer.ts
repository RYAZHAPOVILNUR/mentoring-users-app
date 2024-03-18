import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialActions from './materials.actions';
import { IFolder, IMaterial } from '../model/folders-models';
import { LoadingStatus } from '@users/core/data-access';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

export const materialsFeatureKey = 'materials';

export interface MaterialsState extends EntityState<IFolder> {
  materials: IMaterial[]
  status: LoadingStatus
}

export const materialsAdapter: EntityAdapter<IFolder> =
  createEntityAdapter<IFolder>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  materials:[] as IMaterial[],
  status: 'init'
});


export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer:createReducer(
    initialMaterialsState,
    on(MaterialActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const
    })),
    on(MaterialActions.loadFoldersSuccess, 
      (state, { folders }) =>
        materialsAdapter.setAll(folders, 
          { ...state, 
            status: 'loaded' as const 
          })
    ),
    on(MaterialActions.loadFoldersFailed, 
      (state) => ({
        ...state,
        status: 'error' as const
      })),
    on(MaterialActions.addFolder, 
      (state) => ({
        ...state,
        status:'loading' as const
      })),
    on(MaterialActions.addFolderSuccess, 
      (state, {newFolder}) => 
        materialsAdapter.addOne(
          {...newFolder},
          {
            ...state,
            status:'loaded' as const
          })
      ),
    on(MaterialActions.addFolder, 
      (state) => ({
        ...state,
        status:'error' as const
      })),

    on(MaterialActions.deleteFolder, 
      (state) => ({
        ...state,
        status:'loading' as const
      })),
    on(MaterialActions.deleteFolderSuccess, 
      (state, {id}) => 
        materialsAdapter.removeOne(
          id,
          {
            ...state,
            status:'loaded' as const
          })
      ),
    on(MaterialActions.deleteFolderFailed, 
      (state) => ({
        ...state,
        status:'error' as const
      })),
    on(MaterialActions.loadMaterials, 
      (state) => (
        {
          ...state, 
          status:'loading' as const
        })
      ),
    on(MaterialActions.loadMaterialsSuccess, 
      (state, {materials}) => (
        {
          ...state, 
          materials, 
          status:'loaded' as const
        })
      ),
    on(MaterialActions.loadMaterialsFailed, 
      (state) => (
        {
          ...state,
          status:'error' as const
        })
      )
  )
});
