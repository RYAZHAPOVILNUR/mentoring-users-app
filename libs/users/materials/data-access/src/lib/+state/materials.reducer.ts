import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';
import { FolderDTO, MaterialDTO } from '../models/interfaces';

export const materialsFeatureKey = 'materials';

export interface State {
  folders: FolderDTO[],
  files: MaterialDTO[],
  status: LoadingStatus | null,
  error: unknown | null
}

export const initialState: State = {
  folders: [],
  files: [],
  status: 'init',
  error: null
};

export const reducer = createReducer(
  initialState,

  on(MaterialsActions.initFolders, (state) => ({
    ...state,
    status: "loading" as const
  })),
  on(MaterialsActions.initFoldersSuccess, (state, { folders }: { folders: FolderDTO[] }) => ({
    ...state,
    status: "loaded" as const,
    folders
  })),
  on(MaterialsActions.initFoldersFailure, (state, { error }: { error: unknown }) => ({
    ...state,
    status: 'error' as const,
    error
  })),

  on(MaterialsActions.loadFolderSuccess, (state, { folder }: { folder: FolderDTO }) => ({
    ...state,
    folders: [...state.folders, folder]
  })),

  on(MaterialsActions.deleteFolderSuccess, (state: State, { folder }: { folder: FolderDTO }) => ({
    ...state,
    folders: state.folders.filter((CurrentFolder: { id: number }) => CurrentFolder.id !== folder.id)
  })),

  on(MaterialsActions.initFiles, (state) => ({
    ...state,
    status: "loading" as const
  })),
  on(MaterialsActions.initFilesSuccess, (state: State, { files }: { files: MaterialDTO[] }) => ({
    ...state,
    status: "loaded" as const,
    files
  })),
  on(MaterialsActions.initFilesFailure, (state: State, { error }: { error: unknown }) => ({
    ...state,
    status: "error" as const,
    error
  })),

  on(MaterialsActions.loadFileSuccess, (state, { file }: { file: MaterialDTO }) => ({
    ...state,
    files: state.files.concat(file)
  })),

  on(MaterialsActions.deleteFileSuccess, (state, { file }: { file: MaterialDTO }) => ({
    ...state,
    files: state.files.filter((v: any) => v.id !== file.id)
  })),
);

export const materialsFeature = createFeature({
  name: materialsFeatureKey,
  reducer,
});
