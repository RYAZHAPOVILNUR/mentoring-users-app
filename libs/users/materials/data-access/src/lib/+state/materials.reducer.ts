import { FolderType } from './folder.materials.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as MaterialsActions from './materials.actions';
import { LoadingStatus } from '@users/core/data-access';

export const materialsFeatureKey = 'materials';

export type MaterialsErrors = {
  status: number;
  [key: string]: unknown;
};

export interface MaterialsState extends EntityState<FolderType> {
  selectedId?: string | number; // which Users record has been selected
  status: LoadingStatus;
  error: MaterialsErrors | null;
}

export interface UsersPartialState {
  readonly [materialsFeatureKey]: MaterialsState;
}

export const materialsAdapter: EntityAdapter<FolderType> = createEntityAdapter<FolderType>();

export const initialState: MaterialsState = materialsAdapter.getInitialState({
  status: 'init',
  error: null
});

export const MaterialsReducer = createReducer(
  initialState,
  on(MaterialsActions.loadFolders, (state) => ({
    ...state,
    status: 'loading' as const
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, { folders }) => ({
    ...state,
    folders: folders,
    status: 'loaded' as const
  })),
  on(MaterialsActions.loadFoldersFailed, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error' as const
  }))
)
