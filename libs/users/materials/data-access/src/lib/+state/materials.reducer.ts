import { createFeature, createReducer, on } from '@ngrx/store';
import { FoldersActions } from './materials.actions';
import { IFolder } from '../models/folders.model';
import { LoadingStatus } from '@users/core/data-access';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { IMaterial } from '../models/materials.model';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<IFolder> {
  materials: IMaterial[];
  openedFolder: IFolder | null;
  status: LoadingStatus;
  error: string | null;
}

export const materialsAdapter: EntityAdapter<IFolder> =
  createEntityAdapter<IFolder>();

export const initialMaterialsState: MaterialsState =
  materialsAdapter.getInitialState({
    materials: [],
    openedFolder: null,
    status: 'init',
    error: null,
  });

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: createReducer(
    initialMaterialsState,
    on(FoldersActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) => {
      return materialsAdapter.setAll(folders, {
        ...state,
        status: 'loaded' as const,
      });
    }),
    on(FoldersActions.loadFoldersFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error: error,
    })),
    on(FoldersActions.addFoldersSuccess, (state, { foldersData }) =>
      materialsAdapter.addOne({ ...foldersData }, { ...state })
    ),
    on(FoldersActions.addFoldersFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error: error,
    })),
    on(FoldersActions.deleteFoldersSuccess, (state, { id }) =>
      materialsAdapter.removeOne(id, { ...state })
    ),
    on(FoldersActions.deleteFoldersFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error: error,
    })),
    on(FoldersActions.openFolderSuccess, (state, { folder }) => ({
      ...state,
      openedFolder: folder,
    })),
    on(FoldersActions.openFolderFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error: error,
    })),
    on(FoldersActions.loadMaterials, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(FoldersActions.loadMaterialsSuccess, (state, { materials }) => ({
      ...state,
      materials: materials,
      status: 'loaded' as const,
    })),
    on(FoldersActions.loadMaterialsFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error: error,
    })),
    on(FoldersActions.deleteMaterialsSuccess, (state, { id }) => ({
      ...state,
      materials: state.materials.filter((material) => material.id !== id),
    })),
    on(FoldersActions.deleteMaterialsFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error: error,
    })),
    on(FoldersActions.addMaterialsSuccess, (state, { material }) => ({
      ...state,
      materials: [...state.materials, material],
    })),
    on(FoldersActions.addMaterialsFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error: error,
    })),
    on(FoldersActions.addMaterialsPDFSuccess, (state, { material }) => ({
      ...state,
      materials: [...state.materials, material],
    })),
    on(FoldersActions.addMaterialsPDFFailed, (state, { error }) => ({
      ...state,
      status: 'error' as const,
      error: error,
    }))
  ),
});
