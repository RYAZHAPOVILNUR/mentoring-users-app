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
        
    })),
    on(FoldersActions.deleteFolderSuccess, (state, { FolderId }) => ({
        ...state,

    }))
)
