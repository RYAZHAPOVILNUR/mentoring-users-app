import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface IFolder {
  id: string;
  name: string;
  title?: string;
}

export interface IAddFolder {
  name: string;
  title?: string;
}

export interface MaterialsError {
  message: string;
  statusCode?: number;
  error?: string;
}

export interface State {
  folders: IFolder[];
  selectedFolder: IFolder | null;
  error: MaterialsError | null;
  status: 'init' | 'loading' | 'loaded' | 'error';
}

export const initialState: State = {
  folders: [],
  selectedFolder: null,
  error: null,
  status: 'init',
};

export const materialsReducer = createReducer(
  initialState,
  
  // Load Folders
  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders,
    error: null,
    status: 'loaded' as const,
  })),
  
  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  // Add Folder
  on(MaterialsActions.addFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialsActions.addFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: [...state.folders, folder],
    error: null,
    status: 'loaded' as const,
  })),

  on(MaterialsActions.addFolderFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  })),

  // Delete Folder
  on(MaterialsActions.deleteFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialsActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: state.folders.filter(folder => folder.id !== id),
    error: null,
    status: 'loaded' as const,
  })),

  on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    error,
    status: 'error' as const,
  }))
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: materialsReducer,
});