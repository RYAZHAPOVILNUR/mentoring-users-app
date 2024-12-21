import { createFeature, createReducer, on, State } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';
import { IFolder } from '../models/folder.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { tap } from 'rxjs';
import { state } from '@angular/animations';
import { IMaterial } from '../models/material.model';

export const materialsFeatureKey = 'materials';

export interface MaterialsState  extends EntityState<IFolder> {
  status: LoadingStatus;
  materials: IMaterial[];
}
export  const materialsAdapter: EntityAdapter<IFolder> = createEntityAdapter<IFolder>()

export const initialState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  materials: [],
});

export const reducer = createReducer(
  initialState,
  on(MaterialsActions.loadMaterialsFolders, (state) => ({
    ...state, status: 'loading'
  })),
  on(MaterialsActions.loadMaterialsFoldersSuccess, (state, { folders }) =>
    materialsAdapter.setAll(folders, {...state, status: 'loaded'})),

  on(MaterialsActions.addMaterialsFolderSuccess, (state, {folder}) => materialsAdapter.addOne({...folder}, {...state})),

  on(MaterialsActions.deleteMaterialsFolderSuccess, (state, {folder_id}) => materialsAdapter.removeOne(folder_id, {...state})),

  on(MaterialsActions.loadMaterials, (state) =>({
    ...state, status: 'loading',
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({...state, materials, status: 'loaded' })),
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});

