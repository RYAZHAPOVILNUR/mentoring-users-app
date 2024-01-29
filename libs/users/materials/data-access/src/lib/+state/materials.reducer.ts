import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IFolder } from '../models/folder.interface';
import { LoadingStatus } from '@users/core/data-access';


export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<IFolder>{
  status: LoadingStatus
  error: null
}

export const materialsAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>()

export const initialState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null
})

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(MaterialsActions.loadFolders, (state) => ({ ...state,
      status: 'loading' as const
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, {folders}) =>
      materialsAdapter.setAll(folders, {...state, status: 'loaded' as const})
    ),
    on(MaterialsActions.loadFoldersFailure, (state, action) => ({
      ...state, status: 'error' as const
    })),

    on(MaterialsActions.addFolderSuccess, (state, {newFolder}) => {
      return materialsAdapter.addOne(newFolder, state)
    }),
    on(MaterialsActions.addFolderFailure, (state, action) => ({
      ...state, status: 'error' as const
    })),

    on(MaterialsActions.deleteFolderSuccess, (state, {id}) => {
      return materialsAdapter.removeOne(id, state)
    }),
    on(MaterialsActions.deleteFolderFailure, (state, action) => ({
      ...state, status: 'error' as const
    })),
  )
});

