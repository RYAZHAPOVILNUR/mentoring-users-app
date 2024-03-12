import { createFeature, createReducer, on } from '@ngrx/store';
import { Folder, Material } from '../model/folder.interface';
import { FoldersActions, MaterialsActions } from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';
import { EntityState } from "@ngrx/entity";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { combineReducers } from '@ngrx/store';
export const materialsFeatureKey = 'materials';

export interface combinedState {
  folderFeature: FoldersState;
  materialFeature: MaterialsState;
}
export interface MaterialsState extends EntityState<Material> {
  selectedMaterialId: null | number;
  status: LoadingStatus
}
export interface FoldersState extends EntityState<Folder> {
  selectedFolderId: null | number;
  status: LoadingStatus
}

export const folderAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>()
export const materialAdapter: EntityAdapter<Material> = createEntityAdapter<Material>()

export const materialInitialState: MaterialsState = materialAdapter.getInitialState({
  selectedMaterialId: null,
  status: 'init'
})
export const folderInitialState: FoldersState = folderAdapter.getInitialState({
  selectedFolderId: null,
  status: 'init'
})
export const folderReducer = createReducer(
  folderInitialState,
  on(FoldersActions.loadFolders, state => ({
    ...state,
    status: 'loading'
  })),
  on(FoldersActions.loadFoldersSuccess, (state, { data }) =>
    folderAdapter.setAll(data, { ...state, status: 'loaded' })
  ),
  on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(FoldersActions.createNewFolderSuccess, (state, { createdFolder }) =>
    folderAdapter.addOne({ ...createdFolder }, { ...state })
  ),
  on(FoldersActions.deleteFolderSuccess, (state, { id }) =>
    folderAdapter.removeOne(id, { ...state })
  ),
  on(FoldersActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    error
  })),
);

export const materialReducer = createReducer(
  materialInitialState,
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading'
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { data }) =>
    materialAdapter.setAll(data, { ...state, status: 'loaded' })
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(MaterialsActions.createMaterialSuccess, (state, { createdMaterial }) =>
    materialAdapter.addOne({ ...createdMaterial }, { ...state })
  ),
  on(MaterialsActions.createMaterialFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) =>
    materialAdapter.removeOne(id, { ...state })
  )
)


export const reducer = combineReducers({
  folderFeature: folderReducer,
  materialFeature: materialReducer,
}
)

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});

