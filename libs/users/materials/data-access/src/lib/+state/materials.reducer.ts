import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import {
  FolderDTO,
  LoadingStatus,
  MaterialsDTO,
} from '@users/core/data-access';

export const MATERIALS_FEATURE_KEY = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

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

export const initialMaterialsState: MaterialsState =
  materialsAdapter.getInitialState({
    materials: [],
    error: null,
    status: 'init',
  });

const reducer = createReducer(
  initialMaterialsState,
  on(MaterialsActions.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) =>
    materialsAdapter.setAll(folders, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.loadFoldersFailure, (state) => ({
    ...state,
    status: 'error' as const,
  })),

  on(MaterialsActions.addFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.addFolderSuccess, (state, { folder }) =>
    materialsAdapter.addOne(folder, { ...state, status: 'loaded' as const })
  ),
  on(MaterialsActions.addFolderFailure, (state) => ({
    ...state,
    status: 'error' as const,
  })),

  on(MaterialsActions.removeFolder, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.removeFolderSuccess, (state, { id }) =>
    materialsAdapter.removeOne(id, {
      ...state,
      status: 'loaded' as const,
    })
  ),
  on(MaterialsActions.removeFolderFailure, (state) => ({
    ...state,
    status: 'error' as const,
  }))
);

export function materialsReducer(
  state: MaterialsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
