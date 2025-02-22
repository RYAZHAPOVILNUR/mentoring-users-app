import { createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { MaterialsEntity } from '../../materials-dto/materials.entity';
import { LoadingStatus } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<MaterialsEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  errors: MaterialsErrors | null;
  materialsFilter: { title: string };
}

export interface MaterialsPortailState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<MaterialsEntity> = createEntityAdapter<MaterialsEntity>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  errors: null,
  materialsFilter: { title: '' },
});

export const materialsReducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.initMaterials, (state) => ({
    ...state,
    status: 'loading' as const,
  }))
);
