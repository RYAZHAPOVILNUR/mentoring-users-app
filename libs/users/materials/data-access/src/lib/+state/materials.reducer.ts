import {FolderInterface } from '../interfaces/folder.interface';
import { createReducer, on } from '@ngrx/store';
import * as FoldersAction from './materials.actions';

export interface State {
  folders: FolderInterface[];
  error: any;
}

export const initialState: State = {
  folders: [],
  error: null
};

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
})
);
