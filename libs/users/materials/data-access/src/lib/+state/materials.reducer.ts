import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { Folder } from '../models/folders.interface';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState {
  folders: Folder[];
  loading: boolean;
  error: string | null;
}

export const initialMaterialsState: MaterialsState = {
  folders: [],
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
  }))
  ),
});
