import { createFeature, createReducer, on } from '@ngrx/store';
import { MaterialsActions } from './materials.actions';
import { FolderDTO, FolderEntity, LoadingStatus } from '@users/core/data-access';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action } from '@ngrx/store';

export const MATERIALS_FEATURE_KEY = 'materials';

export type FoldersError = {
  status: number;
  [key: string]: unknown;
}

export interface FoldersState extends EntityState<FolderEntity> {
  selectedId?: string | number;
  status: LoadingStatus;
  error: FoldersError | null;
}

export interface FoldersPartialState {
  readonly [MATERIALS_FEATURE_KEY]: FoldersState;
}

export const foldersAdapter: EntityAdapter<FolderEntity> = createEntityAdapter<FolderEntity>();

export const initialFoldersState: FoldersState = foldersAdapter.getInitialState({
  status: 'init',
  error: null,
});

export const reducer = createReducer(
  initialFoldersState,
  on(MaterialsActions.initFolders, (state) => ({
    ...state,
    status: 'loading' as const,
  })),
  on(MaterialsActions.loadFoldersSuccess, (state, {folders}) => ({
    ...state,
    status: 'loaded' as const,
    folders,
  })),
  on(MaterialsActions.loadFoldersFailure, (state, {error}) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.editFolderSuccess, (state, { folderData }) =>
    foldersAdapter.updateOne(
      {
        id: folderData.id,
        changes: folderData,
      },
      state
    )
  ),
  on(MaterialsActions.editFolderFailure, (state, { error }) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.deleteFolderSuccess, (state, {id}) => foldersAdapter.removeOne(id, {...state})),
  on(MaterialsActions.deleteFolderFailure, (state, {error}) => ({
    ...state,
    status: 'error' as const,
    error,
  })),
  on(MaterialsActions.addFolderSuccess, (state, {folderData}) => foldersAdapter.addOne({...folderData}, {...state})),
);

export function materialsReducer(state: FoldersState| undefined, action: Action){
  return reducer(state, action);
};
