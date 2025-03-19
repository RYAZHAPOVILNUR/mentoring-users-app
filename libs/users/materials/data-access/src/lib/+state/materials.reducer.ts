import { createReducer, on } from "@ngrx/store";
import { Folder } from "../interfaces/folder.interface";
import { Material } from "../interfaces/material.interface";

import * as FoldersActions from './materials.actions';

export interface FolderState {
    folder: Folder[];
    folderError: any;
    status: string;
}

export interface MaterialState {
    materials: Material[];
    MaterialError: any;
    status: string;
}

export const initialFolderState: FolderState = {
    folder: [],
    folderError: null,
    status: 'loading'
}

export const initialMaterialState: MaterialState = {
    materials: [],
    MaterialError: null,
    status: 'loading'
}

export const FolderReducer = createReducer(
    initialFolderState,
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) => ({
        ...state,
        folder: folders,
        status: 'loaded' as const
    })),
    on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
        ...state,
        FolderError: error,
        status: 'error' as const
    })),
    on(FoldersActions.addFolderSuccess, (state, { NewFolderData }) => ({
        ...state,
        NewFolder: [...state.folder, NewFolderData]
    })),
    on(FoldersActions.deleteFolderSuccess, (state, { id }) => ({
        ...state,
        folders: state.folder.filter(folder => folder.id !== id)
    }))
)
export const MaterialReducer = createReducer(
    initialMaterialState,
    on(FoldersActions.loadMaterialsSuccess, (state, { materials }) => ({
        ...state,
        material: materials,
        status: 'loaded' as const
    })),
    on(FoldersActions.loadFoldersFailure, (state, { error }) => ({
        ...state,
        MaterialError: error,
        status: 'error' as const
    })),
    on(FoldersActions.addMaterialSuccess, (state, { NewMaterialData }) => ({
        ...state,
        NewMaterial: [...state.materials, NewMaterialData]
    })),
    on(FoldersActions.deleteMaterialSuccess, (state, { id }) => ({
        ...state,
        material: state.materials.filter(material => material.id !== id)
    }))
)

