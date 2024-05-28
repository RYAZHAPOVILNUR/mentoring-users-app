import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { FolderErrors, Material } from '../../models/folders.interface';
import { LoadingStatus } from '@users/core/data-access';
import { createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<Material> {
  status: LoadingStatus;
  error: FolderErrors | null;
}
export const materialsAdapter: EntityAdapter<Material> = createEntityAdapter<Material>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  error: null,
  status: 'init',
});

export const materialsReduser = createReducer(
  initialMaterialsState,
  on(MaterialsActions.loadMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) =>
    materialsAdapter.setAll(materials, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
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
  on(MaterialsActions.createMaterialFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.deleteMaterialSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state }))
);
