import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { Folder } from '../models/folder.model';

export const materialsFeatureKey = 'materials';

export interface MaterialsState extends EntityState<Folder> {
  status: LoadingStatus;
}

export const materialsAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export const initialState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
});

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadMaterials, (state) => state),
  on(MaterialsActions.loadMaterialsSuccess, (state, action) => state),
  on(MaterialsActions.loadMaterialsFailure, (state, action) => state),
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
  on(MaterialsActions.addFolderSuccess, (state, { folder }) =>
    materialsAdapter.addOne(folder, {
      ...state,
    })
  ),
  on(MaterialsActions.addFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, { id }) =>
    materialsAdapter.removeOne(id, {
      ...state,
    })
  ),
  on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
