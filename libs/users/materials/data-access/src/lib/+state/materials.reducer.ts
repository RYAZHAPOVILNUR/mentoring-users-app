import { createFeature, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface IFolder {
  id: string;
  name: string;
  title?: string;
}

export interface IAddFolder {
  name: string;
  title?: string;
}

export interface MaterialsError {
  message: string;
  statusCode?: number;
  error?: string;
}

export enum MaterialType {
  VIDEO = 'video',
  PDF = 'pdf',
  PODCAST = 'podcast',
}

export interface IMaterial {
  id: string;
  title: string;
  material_link: string;
  type: MaterialType;
  folder_id: number;
  created_at: string;
}

export interface State {
  folders: IFolder[];
  materials: IMaterial[];
  selectedFolder: IFolder | null;
  error: MaterialsError | null;
  status: 'init' | 'loading' | 'loaded' | 'error';
}

export const MATERIAL_PLACEHOLDERS: Record<MaterialType, string> = {
  [MaterialType.VIDEO]: 'Вставьте ссылку на YouTube видео',
  [MaterialType.PDF]: 'Вставьте ссылку на PDF файл',
  [MaterialType.PODCAST]: 'Вставьте ссылку на аудио файл',
};

export const initialState: State = {
  folders: [],
  materials: [],
  selectedFolder: null,
  error: null,
  status: 'init',
};

export const materialsReducer = createReducer(
  initialState,

  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders,
    error: null,
    status: 'loaded' as const,
  })),

  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    error: { message: String(error) } as MaterialsError,
    status: 'error' as const,
  })),

  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
    ...state,
    materials,
    status: 'loaded' as const,
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
    ...state,
    error: { message: String(error) } as MaterialsError,
    status: 'error' as const,
  })),

  on(MaterialsActions.addFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialsActions.addFolderSuccess, (state, { folder }) => ({
    ...state,
    folders: [...state.folders, folder],
    error: null,
    status: 'loaded' as const,
  })),

  on(MaterialsActions.addFolderFailure, (state, { error }) => ({
    ...state,
    error: { message: String(error) } as MaterialsError,
    status: 'error' as const,
  })),

  on(MaterialsActions.deleteFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialsActions.deleteFolderSuccess, (state, { id }) => ({
    ...state,
    folders: state.folders.filter((folder) => folder.id !== id),
    error: null,
    status: 'loaded' as const,
  })),

  on(MaterialsActions.deleteFolderFailure, (state, { error }) => ({
    ...state,
    error: { message: String(error) } as MaterialsError,
    status: 'error' as const,
  })),

  on(MaterialsActions.openFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialsActions.openFolderSuccess, (state, { folder }) => ({
    ...state,
    selectedFolder: folder,
    error: null,
    status: 'loaded' as const,
  })),

  on(MaterialsActions.openFolderFailure, (state, { error }) => ({
    ...state,
    error: { message: String(error) } as MaterialsError,
    status: 'error' as const,
  })),

  on(MaterialsActions.resetState, (state) => ({
    ...state,
    selectedFolder: null,
    materials: [],
  })),

  on(MaterialsActions.addMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialsActions.addMaterialSuccess, (state, { material }) => ({
    ...state,
    materials: [...state.materials, material],
    status: 'loaded' as const,
  })),

  on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
    ...state,
    error: { message: String(error) } as MaterialsError,
    status: 'error' as const,
  })),

  on(MaterialsActions.deleteMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),

  on(MaterialsActions.deleteMaterialSuccess, (state, { materialId }) => ({
    ...state,
    materials: state.materials.filter((material) => material.id !== materialId),
    status: 'loaded' as const,
  })),

  on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
    ...state,
    error: { message: String(error) } as MaterialsError,
    status: 'error' as const,
  }))
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: materialsReducer,
});
