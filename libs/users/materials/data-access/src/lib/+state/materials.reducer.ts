import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folders.interface';
import { Material } from '../models/materials.interface';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState {
  folders: Folder[];
  materials: Material[];
  selectedFolderId: number | null;
  loading: boolean;
  error: string | null;
}

export const initialMaterialsState: MaterialsState = {
  folders: [],
  materials: [],
  selectedFolderId: null,
  loading: false,
  error: null
};

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(MaterialsActions.loadFolders, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
      ...state,
      folders,
      loading: false
    })),
    on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: String(error)
    })),
    on(MaterialsActions.createFolderSuccess, (state, {folder}) => ({
      ...state,
      folders: [...state.folders, folder],
      loading: false,
      error: null
    })),
    on(MaterialsActions.createFolderFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: String(error)
    })),
    on(MaterialsActions.deleteFolder, (state, { folderId }) => ({
      ...state,
      folders: state.folders.filter(folder => folder.id !== folderId),
      loading:false
    })),
    on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: String(error)
    })),
    on(MaterialsActions.openFolder, (state, {folderId}) =>({
      ...state,
      selectedFolderId: folderId,
      loading: true
    })),
    on(MaterialsActions.loadMaterials, (state) => ({
      ...state,
      loading: true,
      error: null
    })),
    on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
      ...state,
      materials,
      loading: false
    })),
    on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error: String(error)
    })),
  ),
});
