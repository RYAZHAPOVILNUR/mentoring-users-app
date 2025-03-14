import { createReducer, on } from "@ngrx/store";
import { Folder } from "../interfaces/folder.interface";
import { Material } from "../interfaces/material.interface";

import * as FoldersActions from './materials.actions';
import { state } from "@angular/animations";

export interface FolderState {
    folder: Folder[];
    FolderError: any;
}

export interface MaterialState {
    materials: Material[];
    MaterialError: any;
}

export const initialFolderState: FolderState = {
    folder: [],
    FolderError: null
}

export const initialMaterialState: MaterialState = {
    materials: [],
    MaterialError: null
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
    on(FoldersActions.deleteFolderSuccess, (state, { FolderId }) => ({
        ...state,
        folders: state.folder.filter(folder => folder.id !== FolderId)
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
    on(FoldersActions.deleteMaterialSuccess, (state, { MaterialId }) => ({
        ...state,
        material: state.materials.filter(material => material.id !== MaterialId)
    }))
)

