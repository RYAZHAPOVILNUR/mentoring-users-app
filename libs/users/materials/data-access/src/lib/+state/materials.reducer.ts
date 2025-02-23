import { createFeature, createReducer, on } from '@ngrx/store';
import { FoldersActions, MaterialsActions } from './materials.actions';
import { Folder } from '../models/folder.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Material } from '../models/material.model';

export const materialsAdapter: EntityAdapter<Folder> = createEntityAdapter<Folder>()

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<Folder> {
  materials: Material[];
  loading: 'init' | 'loading' | 'success' | 'failure';
  error: unknown; // или конкретный тип ошибки
}

export const initialState: MaterialsState = materialsAdapter.getInitialState({
  materials: [],
  loading: 'init',
  error: null, // или конкретный тип ошибки
});

export const materialsReducer = createReducer(
  initialState,
  on(FoldersActions.loadFolder, (state) => state),
  on(FoldersActions.loadFolderSuccess, (state,{ folder }) => 
    materialsAdapter.addOne(folder, {...state, loading: 'success' as const})
  ),
  on(FoldersActions.loadFolderFailure, (state, {error}) => ({
    ...state,
    loading: 'failure' as const,
    error,
  })),

  on(FoldersActions.loadFoldersSuccess, (state, {folders}) =>
    materialsAdapter.setAll(folders, {...state, loading: 'success' as const})
   ),
  on(FoldersActions.loadFoldersFailure, (state, {error}) => ({
    ...state,
    loading: 'failure' as const,
    error,
  })),

  on(FoldersActions.deleteFolderSuccess, (state, {id}) => 
    materialsAdapter.removeOne(id, {...state, loading: 'success' as const,})
  ),
  on(FoldersActions.deleteFolderFailure, (state, {error}) => ({
    ...state,
    loading: 'failure' as const,
    error,
  })),

  on(MaterialsActions.loadMaterialsSuccess, (state, {materials}) =>({
    ...state,
    loading: 'success' as const,
    materials: materials,
  })),
  on(MaterialsActions.loadMaterialsFailure, (state, {error}) => ({
    ...state,
    loading: 'failure' as const,
    error,
  })),

  on(MaterialsActions.loadMaterialSuccess, (state, {material}) => ({
    ...state,
    materials: [...state.materials, material],
    loading: 'success' as const,
  })),
  on(MaterialsActions.loadMaterialFailure, (state, {error}) => ({
    ...state,
    loading: 'failure' as const,
    error,
  })),

  on(MaterialsActions.deleteMaterialSuccess, (state, {id}) => ({
    ...state,
    materials: state.materials.filter(material => material.id !== id)
  })
  ),
  on(MaterialsActions.deleteMaterialFailure, (state, {error}) => ({
    ...state,
    loading: 'failure' as const,
    error,
  })),
);

export const materialsFeature = createFeature({
  name: MATERIALS_FEATURE_KEY,
  reducer: materialsReducer,
});
