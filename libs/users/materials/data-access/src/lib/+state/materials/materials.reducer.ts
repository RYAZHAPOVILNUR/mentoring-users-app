import { Action, createReducer, on } from '@ngrx/store';
import * as MaterialsActions from '../materials/materials.actions';
import * as FoldersActions from '../folders/folders.actions';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { LoadingStatus } from '@users/core/data-access';
import { FoldersEntity } from '../../models/folders.entity';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<FoldersEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

// export const materialsAdapter: EntityAdapter<FoldersEntity> = createEntityAdapter<FoldersEntity>()

// export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
//   status: 'init',
//   error: null,

// })

  // const reducer = createReducer(
  //   initialMaterialsState,

  //   on(MaterialsActions.loadMaterials, (state) => ({
  //     ...state, status: 'loading' as const
  //   })
  //   ),
  //   on(MaterialsActions.loadMaterialsSuccess, (state, { materials }) => ({
  //     ...state, materials, status: 'loaded' as const
  //   })
  //   ),
  //   on(MaterialsActions.loadMaterialsFailure, (state, { error }) => ({
  //     ...state, status: 'error' as const, error
  //   })
  //   ),

  //   on(MaterialsActions.deleteMaterialSuccess, (state, { id }) =>
  //   materialsAdapter.removeOne(id, { ...state })
  //   ),
  //   on(MaterialsActions.deleteMaterialFailure, (state, { error }) => ({
  //     ...state, status: 'error' as const, error
  //   })
  //   ),

    // on(MaterialsActions.addMaterialSuccess, (state, { material }) => ({
    //   ...state, materials: [...state.materials, material]
    // })
    // ),

  //   on(MaterialsActions.addMaterialFailure, (state, { error }) => ({
  //     ...state, status: 'error' as const, error
  //   })
  //   ),
  // )

  // export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  //   return reducer(state, action);
  // }

