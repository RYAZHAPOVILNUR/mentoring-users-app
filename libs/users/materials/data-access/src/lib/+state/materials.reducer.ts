import { FolderInterface } from '../interfaces/folder.interface';
import { createReducer, on } from '@ngrx/store';
import * as FoldersAction from './materials.actions';
import { MaterialInterface } from '../interfaces/material.interface';

export interface State {
  folders: FolderInterface[];
  error: any;
}

export interface MaterialState {
  materialsFolders: MaterialInterface[];
  materialError: any
}

export const initialState: State = {
  folders: [],
  error: null,
};

export const initialMaterialState: MaterialState = {
  materialsFolders: [],
  materialError: null
}

export const foldersReducer = createReducer(
  initialState,
  on(FoldersAction.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders
  })),
  on(FoldersAction.loadFoldersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(FoldersAction.addFolderSuccess, (state, { newFolderData }) => {
    return {
      ...state,
      folders: [...state.folders, newFolderData]
    };
  }),
  on(FoldersAction.deleteFolderSuccess, (state, { folderId }) => ({
    ...state,
    folders: state.folders.filter(folder => folder.id !== folderId)
  }))
);

export const materialsReducer = createReducer(
  initialMaterialState,
  on(FoldersAction.loadMaterialsFoldersSuccess, (state, {materialFolders}) => ({
    ...state,
    materialFolders
  })),
  on(FoldersAction.loadMaterialsFoldersFailure, (state, {error}) => ({
    ...state,
    error
  }))
)

