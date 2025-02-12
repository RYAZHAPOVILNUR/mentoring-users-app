import { createFeature, createReducer, on } from '@ngrx/store';
import { FoldersActions, MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState {
  folders: Folder[];
  loading: 'init' | 'loading' | 'success' | 'failure';
  error: unknown; // или конкретный тип ошибки
}

export const initialState: MaterialsState = {
  folders: [],
  loading: 'init',
  error: null, // или конкретный тип ошибки
};

export const materialsReducer = createReducer(
  initialState,
  on(FoldersActions.loadFolder, (state) => state),
  on(FoldersActions.loadFolderSuccess, (state,{ folder }) => ({
    ...state,
    folders: [...state.folders, folder],
  })),
  on(FoldersActions.loadFolderFailure, (state, {error}) => ({
    ...state,
    loading: 'failure' as const,
    error,
  })),
  
  // on(MaterialsActions.loadMaterialss, (state) => state),
  // on(MaterialsActions.loadMaterialssSuccess, (state, action) => state),
  // on(MaterialsActions.loadMaterialssFailure, (state, action) => state),

  on(FoldersActions.loadFoldersSuccess, (state, {folders}) => ({
    ...state,
    folders,
    loading: 'success' as const,
  })),
  on(FoldersActions.loadFoldersFailure, (state, {error}) => ({
    ...state,
    loading: 'failure' as const,
    error,
  })),
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: materialsReducer,
});
