import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { IFolder, IMaterial } from '../models/models';

export const materialsFeatureKey = 'materials';

export interface MaterialPartialState {
  readonly [materialsFeatureKey]: MaterialState;
}

export interface MaterialState {
  isLoadingFolders: boolean;
  isLoadingMaterials: boolean;
  folders: IFolder [];
  errors: string;
  materials: IMaterial[];
}

export const initialState: MaterialState = {
  isLoadingFolders: true,
  isLoadingMaterials: true,
  folders: [],
  errors: '',
  materials: []
};

export const materialsFeature = createFeature({
    name: materialsFeatureKey,
    reducer: createReducer(
      initialState,
      on(MaterialsActions.loadMaterialsFoldersSuccess, (state, { folders }) =>
        ({ ...state, isLoadingFolders: false, folders })),
      on(MaterialsActions.loadMaterialsFoldersFailure, state => ({
        ...state,
        isLoadingFolders: true,
        errors: 'Error Load Materials Folders'
      })),
      on(MaterialsActions.addMaterialsFolder, state => ({ ...state, isLoadingFolders: true })),
      on(MaterialsActions.addMaterialsFolderSuccess, (state, { folder }) =>
        ({
          ...state, isLoadingFolders: false, folders: [...state.folders, folder]
        })),
      on(MaterialsActions.deleteMaterialsFolder, (state, { folder }) => ({
        ...state,
        folders: state.folders.filter(folderEl => +folderEl.id !== folder.deleteId
        )
      })),
      on(MaterialsActions.loadMaterialssSuccess, (state, { materials }) =>
        ({ ...state, isLoadingMaterials: false, materials })),
      on(MaterialsActions.loadMaterialssFailure, state => ({
        ...state,
        isLoadingMaterials: true,
        errors: 'Error Load Materials'
      })),
      on(MaterialsActions.deleteMaterial, state => ({
        ...state,
        isLoadingMaterials: true,
      })),
      on(MaterialsActions.deleteMaterialSuccess, state => ({
        ...state,
        isLoadingMaterials: false,
      })),
    )
  }
);
