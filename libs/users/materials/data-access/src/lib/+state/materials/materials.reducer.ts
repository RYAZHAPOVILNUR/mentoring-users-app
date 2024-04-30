import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { LoadingStatus } from '@users/core/data-access';
import { MaterialsActions } from './materials.actions';
export const MATERIAL_FEATURE_KEY = 'materials';
type PostMaterial = 'title' | 'material_link';
export interface Material {
  id: number;
  created_at: string;
  title: string;
  material_link: string;
  folder_id: 0;
}

export type CreateMaterial = Pick<Material, PostMaterial>;

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<Material> {
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  error: null,
  status: 'init',
});

export const materialsReducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadMaterialsFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialsActions.createMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.createMaterialSuccess, (state, { material }) =>
    materialsAdapter.addOne(material, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.createMaterialFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),

  on(MaterialsActions.deleteMaterial, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) =>
    materialsAdapter.removeOne(id, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.deleteMaterialFailed, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  }))
);
