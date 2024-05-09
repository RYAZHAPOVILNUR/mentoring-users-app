import { createFeature, createReducer, on } from '@ngrx/store';
import * as materialsAction from './materials.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Folder, Mat } from './interfaces';

export const materialsFeatureKey = 'materials';

export const folderAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>();

export interface initState {
  folders: Folder[],
  folder: Folder,
  status: string,
  mats: Mat[]
}

export const initialState: initState = {
  folders: [],
  folder: {id: 0, created_at: 0, title: ''},
  status: 'init',
  mats: []
}

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer:  createReducer(
    initialState,
    on(materialsAction.initFolders, (state: initState) => ({
      ...state,
      status: 'loading'
    })),
    on(materialsAction.getFolders, (state: initState, {folder}) => ({
        ...state,
        folders: folder,
        status: 'init'
    })),
    on(materialsAction.deleteFolderSucces, (state: initState, {id}) => ({
        ...state,
        folders: state.folders.filter((item) => item.id !== id)
    })),
    on(materialsAction.deleteMatSucces, (state: initState, {id}) => ({
        ...state,
        mats: state.mats.filter((item) => item.id !== id)
    })),
    on(materialsAction.addFolderSucces, (state: initState, {folder}) => ({
      ...state,
      folders: [...state.folders, folder]
    })),
    on(materialsAction.getFolderId, (state: initState) => ({
      ...state,
      status: 'loading'
    })),
    on(materialsAction.getFolderIdSucces, (state: initState, {folder}) =>({
      ...state,
      folder: folder,
      status: 'init'
    })),
    on(materialsAction.getMat, (state: initState) => ({
      ...state,
      status: 'loading'
    })),
    on(materialsAction.getMatSucces,(state: initState, {mats}) => ({
      ...state,
      status: 'init',
      mats: mats
    })),
    on(materialsAction.addMatSucces, (state: initState, {mat}) => ({
      ...state,
      mats: [...state.mats, mat]
    }))
  ),
});
