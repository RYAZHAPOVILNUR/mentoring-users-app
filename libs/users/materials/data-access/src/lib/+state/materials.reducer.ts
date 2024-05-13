import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { FolderDTO, LoadingStatus, MaterialsDTO } from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number,
  [key: string]: unknown
}

export interface MaterialsState extends EntityState<FolderDTO> {
  selectedId?: string | number; // which Users record has been selected
  status: LoadingStatus;
  error: MaterialsErrors | null;
  materials: MaterialsDTO[];
}

export interface MaterialsPartialState {
  readonly [MATERIALS_FEATURE_KEY]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<FolderDTO> =
  createEntityAdapter<FolderDTO>();

export const initialMaterialsState: MaterialsState = materialsAdapter.getInitialState({
    materials: [],
    error: null,
    status: 'init',
  });

const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
    error: null,
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
    materialsAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadFoldersFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error
  }))
);

export function materialsReducer(state: MaterialsState | undefined, action: Action) {
  return reducer(state, action);
}
