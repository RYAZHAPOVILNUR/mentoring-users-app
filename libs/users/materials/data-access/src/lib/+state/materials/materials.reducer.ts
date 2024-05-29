import { createReducer, on } from '@ngrx/store';
import { materialsActions } from './materials.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { TMaterialDTO } from '../../models/materials/material-data.models';
import { LoadingStatus } from '@users/core/data-access';

export type TMaterialsError = {
  status: number;
  [key: string]: unknown;
};

export interface IMatreialsState extends EntityState<TMaterialDTO> {
  status: LoadingStatus;
  error: TMaterialsError | null;
}

export const materialsAdapter: EntityAdapter<TMaterialDTO> = createEntityAdapter<TMaterialDTO>();

export const initialMaterialsState: IMatreialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialMaterialsState,
  // Load Materials
  on(materialsActions.loadMaterials, (state) => ({ ...state, status: 'loading' as const })),
  on(materialsActions.loadMaterialsSuccess, (state, { materials }) => materialsAdapter.addMany(materials, { ...state, status: 'loaded' as const })),
  on(materialsActions.loadMaterialsFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  // Create Material
  on(materialsActions.createMaterial, (state) => ({ ...state, status: 'loading' as const })),
  on(materialsActions.createMaterialSuccess, (state, { material }) => materialsAdapter.addOne(material, { ...state, status: 'loaded' as const })),
  on(materialsActions.createMaterialFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
  // Delete Material
  on(materialsActions.deleteMaterial, (state) => ({ ...state, status: 'loading' as const })),
  on(materialsActions.deleteMaterialSuccess, (state, { id }) => materialsAdapter.removeOne(id, { ...state, status: 'loaded' as const })),
  on(materialsActions.deleteMaterialFailure, (state, { error }) => ({ ...state, status: 'error' as const, error })),
);

