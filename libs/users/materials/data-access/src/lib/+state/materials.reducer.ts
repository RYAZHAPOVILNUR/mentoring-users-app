import { createFeature, createReducer, on } from '@ngrx/store';
import * as materialsAction from './materials.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Folder } from './interfaces';

export const materialsFeatureKey = 'materials';

export const folderAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export interface initState {
  folders: Folder[]
}

export const initialState: initState = {
  folders: []
}

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer:  createReducer(
    initialState,
    on(materialsAction.getFolders, (state: initState, {folder}) => ({
        ...state,
        folders: folder
    })),
    on(materialsAction.deleteFolderSucces, (state: initState, {id}) => ({
        ...state,
        folders: state.folders.filter((item) => item.id !== id)
    })),
    on(materialsAction.addFolderSucces, (state: initState, {folder}) => ({
      ...state,
      folders: [...state.folders, folder]
    }))
  ),
});
