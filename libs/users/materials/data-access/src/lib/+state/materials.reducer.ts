import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { FolderDTO, LoadingStatus, MaterialsDTO } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export interface MaterialsState extends EntityState<FolderDTO> {
  materials: MaterialsDTO[];
  status: LoadingStatus;
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<FolderDTO> =
  createEntityAdapter<FolderDTO>();

export const initialMaterialsState: MaterialsState =
  materialsAdapter.getInitialState({
    materials: [],
    status: 'init',
  });

const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.initFolders, (state) => ({
    ...state,
    status: false,
    error: null,
  })),
  on(MaterialsActions.loadMaterialsFoldersSuccess, (state, { folders }) =>
    materialsAdapter.setAll(folders, { ...state, status: true })
  ),
  on(MaterialsActions.loadMaterialsFoldersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
