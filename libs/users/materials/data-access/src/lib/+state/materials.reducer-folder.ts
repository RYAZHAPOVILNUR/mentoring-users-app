import { createReducer, on } from '@ngrx/store';
import *as MaterialsActions from './materials.actions';
import { Folder } from './models/folders.interface';

export const foldersFeatureKey = 'folders';

export interface FoldersState {
    folders: Folder[],
    status: 'init' | 'loading' | 'success' | 'error',
    error: Error | null ,
}

export const initialState: FoldersState = {
    folders: [],
    status: 'init',
    error: null, 
};

export const reducerFolders = createReducer(
  initialState,
  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const 
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, {folders}) => ({
    ...state,
    folders,
    status: 'success' as const
  })),
  on(MaterialsActions.loadFoldersFailure, (state, {error}) => ({
    ...state, 
    error: error,
    status: 'error' as const
  })),
  on(MaterialsActions.deleteFolders, (state, {id}) => ({
   ...state,
   status: 'loading' as const 
  })),
  on(MaterialsActions.deleteFoldersSuccess, (state, {id}) => ({
    ...state,
    folders: state.folders.filter(folder => folder.id !== id),
    status: 'success' as const 
   })),
  on(MaterialsActions.deleteFoldersFailure, (state, {error}) => ({
    ...state,
    status: 'error' as const 
   })),
   on(MaterialsActions.addFolder, (state, {folder}) => ({
    ...state,
    status: 'loading' as const 
   })),
   on(MaterialsActions.addFolderSuccess, (state, {folder}) => ({
     ...state,
     folders: [...state.folders, folder],
     status: 'success' as const 
    })),
   on(MaterialsActions.addFolderFailure, (state, {error}) => ({
     ...state,
     status: 'error' as const 
    })),
);
