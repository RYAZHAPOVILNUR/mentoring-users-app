import { LoadingStatus,  } from '@users/core/data-access';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createFeature, createReducer, on } from '@ngrx/store';
import * as FoldersActions from './folders.actions';
import { FoldersModel, FoldersSecondModel } from '../../../../folders-model';

export const FOLDERS_FEATURE_KEY = 'folders';

export interface FoldersState extends EntityState<FoldersSecondModel>{
  folders: FoldersSecondModel[];
  status: LoadingStatus;
  error: FoldersErrors | null;
}

export interface FoldersPartialState {
  readonly [FOLDERS_FEATURE_KEY]: FoldersState;
}

export type FoldersErrors = {
  status: number;
  message: string;
  [key: string]: unknown;
}

export const FoldersAdapter: EntityAdapter<FoldersSecondModel> = createEntityAdapter<FoldersSecondModel>();

export const initialFoldersState: FoldersState = FoldersAdapter.getInitialState({
  // set initial required properties
  folders: [],
  status: 'init',
  error: null,
});

const foldersReducer  = createReducer(
    initialFoldersState,
    on(FoldersActions.loadFolders, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(FoldersActions.loadFoldersSuccess, (state, { folders }) =>
      FoldersAdapter.setAll(folders, {
        ...state,
        status: 'loaded' as const })
    ),
    on(FoldersActions.loadFoldersFailure, (state) => ({
      ...state,
      status: 'error' as const,
    })),
    on(FoldersActions.deleteFolder, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(FoldersActions.deleteFolderSuccess, (state, { id }) =>
    FoldersAdapter.removeOne(id, {
      ...state,
      status: 'loaded' as const,})
    ),
    on(FoldersActions.deleteFolderFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),
    on(FoldersActions.addFolder, (state) => ({
      ...state,
      status: 'loading' as const,
    })),
    on(FoldersActions.addFolderSuccess, (state , { folder }) =>
    FoldersAdapter.addOne(folder , {
      ...state,
      status: 'loaded' as const })
    ),
    on(FoldersActions.addFolderFailed, (state) => ({
      ...state,
      status: 'error' as const,
    })),

)

export function FoldersReducer(state: FoldersState | undefined, action: Action) {
  return foldersReducer(state, action);
}
