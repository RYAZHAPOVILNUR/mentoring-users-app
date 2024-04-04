import { createFeature, createReducer, on } from '@ngrx/store';

import { Folder } from '../models/folder.interface';
import { folderActions } from './materials.actions';

export const materialsFeatureKey = 'materials';

export interface State {
  folders: Folder[];
  isLoading: boolean;
  error: unknown;
}

export const initialState: State = {
  folders: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(folderActions.loadFolders, (state) => ({ ...state, isLoading: true })),
  on(folderActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders,
    isLoading: false,
  })),
  on(folderActions.loadFoldersFailure, (state, { error }) => ({ ...state, error, isLoading: false }))
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
