import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { IFolder } from '../models/models';

export const materialsFeatureKey = 'materials';

export interface MaterialPartialState {
  readonly [materialsFeatureKey]: MaterialState;
}

export interface MaterialState {
  isLoading: boolean;
  folders: IFolder [];
}

export const initialState: MaterialState = {
  isLoading: false,
  folders: []
};

export const materialsFeature = createFeature({
    name: materialsFeatureKey,
    reducer: createReducer(
      initialState,
      on(MaterialsActions.loadMaterialss, state => state),
      on(MaterialsActions.loadMaterialssSuccess, (state, { folders }) =>
        ({ ...state, isLoading: false, folders })),
      on(MaterialsActions.loadMaterialssFailure, state => state),
      on(MaterialsActions.addMaterialsFolder, state => ({ ...state, isLoading: true })),
      on(MaterialsActions.addMaterialsFolderSuccess, (state, { folder }) =>
        ({
          ...state, isLoading: false, folders: [...state.folders, folder]
        })),
      on(MaterialsActions.deleteMaterialsFolder, (state, { folderId }) => ({
        ...state,
        folders: state.folders.filter(folder => +folder.id !== folderId
        )
      }))
    )
  }
);
